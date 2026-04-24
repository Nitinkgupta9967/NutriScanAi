import { connectDB } from "@/lib/db";
import MealAnalysis from "@/models/MealAnalysis";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function endOfDay(date) {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

function average(values) {
  if (!values.length) {
    return null;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function roundToOne(value) {
  return Math.round(value * 10) / 10;
}

function parseNumber(value) {
  const match = String(value || "").match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function groupMealsByDay(meals, dayStarts) {
  return dayStarts.map((dayStart) => {
    const dayEnd = new Date(dayStart.getTime() + DAY_IN_MS);
    const items = meals.filter((meal) => {
      const createdAt = new Date(meal.createdAt);
      return createdAt >= dayStart && createdAt < dayEnd;
    });

    const calories = items.reduce((sum, meal) => {
      const parsed = parseNumber(meal.nutrition?.calories);
      return sum + (parsed || 0);
    }, 0);

    return {
      label: new Intl.DateTimeFormat("en-US", { weekday: "short" })
        .format(dayStart)
        .toUpperCase(),
      count: items.length,
      totalCalories: calories,
      averageScore: items.length
        ? roundToOne(items.reduce((sum, meal) => sum + meal.score, 0) / items.length)
        : null,
    };
  });
}

function buildTopFoods(meals) {
  const grouped = meals.reduce((map, meal) => {
    const key = String(meal.food || "Unknown Meal").trim();
    const existing = map.get(key) || {
      name: key,
      count: 0,
      latestAt: 0,
      averageScore: 0,
    };

    existing.count += 1;
    existing.latestAt = Math.max(existing.latestAt, new Date(meal.createdAt).getTime());
    existing.averageScore += meal.score;
    map.set(key, existing);
    return map;
  }, new Map());

  return Array.from(grouped.values())
    .map((item) => ({
      ...item,
      averageScore: roundToOne(item.averageScore / item.count),
    }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }

      return b.latestAt - a.latestAt;
    })
    .slice(0, 5);
}

function buildMacroBalance(meals) {
  const totals = meals.reduce(
    (sum, meal) => {
      sum.protein += parseNumber(meal.nutrition?.protein) || 0;
      sum.carbs += parseNumber(meal.nutrition?.carbs) || 0;
      sum.fat += parseNumber(meal.nutrition?.fat) || 0;
      return sum;
    },
    { protein: 0, carbs: 0, fat: 0 }
  );

  const combined = totals.protein + totals.carbs + totals.fat;

  if (!combined) {
    return [];
  }

  return [
    {
      label: "Carbs",
      value: Math.round((totals.carbs / combined) * 100),
      accent: "#0f766e",
    },
    {
      label: "Protein",
      value: Math.round((totals.protein / combined) * 100),
      accent: "#15803d",
    },
    {
      label: "Fats",
      value: Math.round((totals.fat / combined) * 100),
      accent: "#a16207",
    },
  ];
}

function buildCoachMessage({
  totalMeals,
  currentWeekMeals,
  currentAverage,
  previousAverage,
  topFoods,
}) {
  if (!totalMeals) {
    return "Upload your first meal and NutriScan AI will start building personalized weekly insights for you.";
  }

  if (currentWeekMeals.length === 1) {
    return "You have 1 scan this week so far. Add a few more meals and we will start spotting meaningful nutrition patterns.";
  }

  if (previousAverage !== null && currentAverage !== null) {
    if (currentAverage > previousAverage) {
      return `Your weekly score is up ${roundToOne(
        currentAverage - previousAverage
      )} points from the previous week. Keep repeating the choices that are working for your health context.`;
    }

    if (currentAverage < previousAverage) {
      return `Your weekly score is down ${roundToOne(
        previousAverage - currentAverage
      )} points from the previous week. Review recent meals and look for easier swaps on lower-scoring scans.`;
    }
  }

  if (topFoods.length) {
    return `${topFoods[0].name} is your most repeated meal recently. Its average score is ${topFoods[0].averageScore}/10 across ${topFoods[0].count} scan${
      topFoods[0].count === 1 ? "" : "s"
    }.`;
  }

  return "Keep scanning meals consistently so NutriScan AI can learn your food patterns and surface stronger recommendations.";
}

function buildInsightSummary({
  totalMeals,
  currentAverage,
  previousAverage,
  currentWeekMeals,
}) {
  if (!totalMeals) {
    return "No meal history yet";
  }

  if (currentWeekMeals.length === 1) {
    return "1 meal analyzed this week";
  }

  if (previousAverage === null || currentAverage === null) {
    return `${currentWeekMeals.length} meals analyzed this week`;
  }

  const delta = roundToOne(currentAverage - previousAverage);

  if (delta > 0) {
    return `${delta} points better than last week`;
  }

  if (delta < 0) {
    return `${Math.abs(delta)} points below last week`;
  }

  return "Steady compared with last week";
}

export async function getInsightsForUser(userId) {
  if (!userId) {
    return {
      totalMeals: 0,
      weeklyAverageScore: null,
      weeklyAverageLabel: "No meals yet",
      improvementPercent: null,
      improvementLabel: "Not enough data yet",
      coachMessage:
        "Upload your first meal and NutriScan AI will start building personalized weekly insights for you.",
      chartMode: "Calories",
      dailySeries: [],
      topFoods: [],
      macroBalance: [],
      summary: "No meal history yet",
    };
  }

  await connectDB();

  const now = new Date();
  const today = startOfDay(now);
  const startCurrentWeek = new Date(today.getTime() - 6 * DAY_IN_MS);
  const startPreviousWeek = new Date(today.getTime() - 13 * DAY_IN_MS);
  const endCurrentDay = endOfDay(now);
  const startThirtyDays = new Date(today.getTime() - 29 * DAY_IN_MS);

  const meals = await MealAnalysis.find({
    userId,
    createdAt: {
      $gte: startThirtyDays,
      $lte: endCurrentDay,
    },
  })
    .sort({ createdAt: -1 })
    .lean();

  const thirtyDayMeals = meals;
  const currentWeekMeals = meals.filter(
    (meal) => new Date(meal.createdAt) >= startCurrentWeek
  );
  const previousWeekMeals = meals.filter((meal) => {
    const createdAt = new Date(meal.createdAt);
    return createdAt >= startPreviousWeek && createdAt < startCurrentWeek;
  });

  const currentAverage = average(currentWeekMeals.map((meal) => meal.score));
  const previousAverage = average(previousWeekMeals.map((meal) => meal.score));
  const weeklyAverageScore = currentAverage === null ? null : roundToOne(currentAverage);

  let improvementPercent = null;
  let improvementLabel = "Not enough data yet";

  if (weeklyAverageScore !== null && previousAverage !== null && previousAverage > 0) {
    improvementPercent = Math.round(
      ((weeklyAverageScore - previousAverage) / previousAverage) * 100
    );
    improvementLabel =
      improvementPercent === 0
        ? "Flat versus previous week"
        : improvementPercent > 0
          ? `${improvementPercent}% better than previous week`
          : `${Math.abs(improvementPercent)}% below previous week`;
  } else if (currentWeekMeals.length > 0) {
    improvementLabel = "Need another week of scans";
  }

  const dayStarts = Array.from({ length: 7 }, (_, index) =>
    new Date(startCurrentWeek.getTime() + index * DAY_IN_MS)
  );
  const topFoods = buildTopFoods(thirtyDayMeals);

  return {
    totalMeals: meals.length,
    weeklyAverageScore,
    weeklyAverageLabel:
      weeklyAverageScore === null
        ? "No meals yet"
        : `${currentWeekMeals.length} meal${currentWeekMeals.length === 1 ? "" : "s"} this week`,
    improvementPercent,
    improvementLabel,
    coachMessage: buildCoachMessage({
      totalMeals: meals.length,
      currentWeekMeals,
      currentAverage: weeklyAverageScore,
      previousAverage,
      topFoods,
    }),
    chartMode: "Calories",
    dailySeries: groupMealsByDay(currentWeekMeals, dayStarts),
    topFoods,
    macroBalance: buildMacroBalance(thirtyDayMeals),
    summary: buildInsightSummary({
      totalMeals: meals.length,
      currentAverage: weeklyAverageScore,
      previousAverage,
      currentWeekMeals,
    }),
  };
}

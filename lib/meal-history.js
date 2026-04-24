import { connectDB } from "@/lib/db";
import MealAnalysis from "@/models/MealAnalysis";

function formatMealRecord(record) {
  return {
    id: String(record._id),
    name: record.food,
    score: record.score,
    condition: record.condition,
    activeHealthContexts: record.activeHealthContexts || [],
    calories: record.nutrition?.calories || "",
    createdAt: record.createdAt instanceof Date
      ? record.createdAt.toISOString()
      : record.createdAt,
  };
}

export async function saveMealAnalysis({ userId, analysis }) {
  await connectDB();

  const savedRecord = await MealAnalysis.create({
    userId,
    food: analysis.food,
    score: analysis.score,
    condition: analysis.condition,
    activeHealthContexts: analysis.activeHealthContexts || [],
    verdict: analysis.verdict,
    alternative: analysis.alternative,
    suggestion: analysis.suggestion,
    provider: analysis.provider || "mock",
    nutrition: analysis.nutrition,
  });

  return formatMealRecord(savedRecord);
}

export async function getRecentMealsForUser(userId, limit = 8) {
  if (!userId) {
    return [];
  }

  await connectDB();

  const records = await MealAnalysis.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return records.map(formatMealRecord);
}

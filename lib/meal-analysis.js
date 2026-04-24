import { dedupeHealthContexts, normalizeHealthContext } from "@/lib/health-contexts";

const mockAnalyses = {
  general: {
    food: "Balanced Meal",
    score: 8,
    verdict:
      "A generally solid meal with a balanced mix of protein, carbohydrates, and fats for everyday wellness.",
    alternative: "Salmon quinoa bowl",
    suggestion:
      "It adds more omega-3 fats and lean protein while keeping the meal filling and nutrient-dense.",
    nutrition: {
      calories: "410 kcal",
      protein: "24 g",
      carbs: "34 g",
      fat: "18 g",
    },
  },
  herpes: {
    food: "Peanut Butter",
    score: 6,
    verdict:
      "Not recommended for herpes in larger portions due to higher arginine content, which may be less ideal for people managing flare triggers.",
    alternative: "Greek yogurt with berries",
    suggestion:
      "It offers more protein support with a better lysine-to-arginine balance and less added sugar when kept plain.",
    nutrition: {
      calories: "190 kcal",
      protein: "8 g",
      carbs: "7 g",
      fat: "16 g",
    },
  },
  diabetes: {
    food: 'Peanut Butter Toast',
    score: 7,
    verdict:
      "Moderately safe for diabetes because the fat and protein can slow glucose spikes, but the bread portion still adds a noticeable carb load.",
    alternative: "Egg and avocado toast on seeded bread",
    suggestion:
      "It gives steadier satiety and typically supports a more balanced blood sugar response with higher protein.",
    nutrition: {
      calories: "260 kcal",
      protein: "11 g",
      carbs: "20 g",
      fat: "15 g",
    },
  },
  "high cholesterol": {
    food: "Cheesy Burger",
    score: 4,
    verdict:
      "Not ideal for high cholesterol because it combines saturated fat and sodium in a way that can work against heart-healthy goals.",
    alternative: "Grilled salmon quinoa bowl",
    suggestion:
      "It replaces heavier saturated fats with leaner protein and heart-friendlier fats while keeping the meal filling.",
    nutrition: {
      calories: "540 kcal",
      protein: "29 g",
      carbs: "34 g",
      fat: "31 g",
    },
  },
};

function normalizeCondition(condition) {
  return normalizeHealthContext(condition).toLowerCase();
}

function resolvePrimaryContext(healthContexts = []) {
  const normalized = dedupeHealthContexts(healthContexts);
  const matched = normalized.find(
    (context) => mockAnalyses[normalizeCondition(context)]
  );

  return matched || "General Wellness";
}

function normalizeDescription(description) {
  return String(description || "").trim();
}

function extractImageParts(image) {
  const match = String(image || "").match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (!match) {
    throw new Error("Please upload a valid meal image to continue.");
  }

  return {
    mediaType: match[1],
    data: match[2],
  };
}

function extractTextContent(payload) {
  if (!payload?.content || !Array.isArray(payload.content)) {
    return "";
  }

  return payload.content
    .filter((item) => item?.type === "text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n")
    .trim();
}

function parseAnalysisJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("We couldn't read the AI response for this meal.");
    }

    return JSON.parse(match[0]);
  }
}

function validateAnalysisShape(result, condition) {
  if (
    !result ||
    typeof result.food !== "string" ||
    typeof result.score !== "number" ||
    typeof result.verdict !== "string" ||
    typeof result.suggestion !== "string" ||
    typeof result.alternative !== "string" ||
    !result.nutrition ||
    typeof result.nutrition.calories !== "string" ||
    typeof result.nutrition.protein !== "string" ||
    typeof result.nutrition.carbs !== "string" ||
    typeof result.nutrition.fat !== "string"
  ) {
    throw new Error("We couldn't finish this analysis because the AI response was incomplete.");
  }

  return {
    food: result.food.trim(),
    score: Math.min(10, Math.max(0, Math.round(result.score))),
    verdict: result.verdict.trim(),
    suggestion: result.suggestion.trim(),
    alternative: result.alternative.trim(),
    nutrition: {
      calories: result.nutrition.calories.trim(),
      protein: result.nutrition.protein.trim(),
      carbs: result.nutrition.carbs.trim(),
      fat: result.nutrition.fat.trim(),
    },
    condition,
    provider: "claude",
  };
}

async function analyzeWithMock({ image, description, condition, healthContexts = [] }) {
  const normalizedDescription = normalizeDescription(description);

  if (!image && !normalizedDescription) {
    throw new Error("Please upload a meal image or describe the food first.");
  }

  const activeHealthContexts = dedupeHealthContexts(healthContexts);
  const primaryContext = condition || resolvePrimaryContext(activeHealthContexts);
  const normalizedCondition = normalizeCondition(primaryContext);
  const result = mockAnalyses[normalizedCondition];

  if (!result) {
    throw new Error("Please choose a supported health condition.");
  }

  return {
    ...result,
    food: normalizedDescription || result.food,
    condition: normalizedCondition,
    activeHealthContexts,
    provider: "mock",
  };
}

async function analyzeWithOpenAI() {
  throw new Error(
    "OpenAI analysis isn't configured yet. Please try again later."
  );
}

async function analyzeWithGemini() {
  throw new Error(
    "Gemini analysis isn't configured yet. Please try again later."
  );
}

async function analyzeWithClaude({ image, description, condition, healthContexts = [] }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest";

  if (!apiKey) {
    throw new Error("AI analysis is not configured yet. Please add your Claude API key and try again.");
  }

  const activeHealthContexts = dedupeHealthContexts(healthContexts);
  const primaryContext = condition || resolvePrimaryContext(activeHealthContexts);
  const normalizedCondition = normalizeCondition(primaryContext);
  const normalizedDescription = normalizeDescription(description);

  if (!image && !normalizedDescription) {
    throw new Error("Please upload a meal image or describe the food first.");
  }

  const content = [
    {
      type: "text",
      text:
        `Analyze this food for someone with primary context ${normalizedCondition}. ` +
        `Active health contexts at scan time: ${
          activeHealthContexts.join(", ") || "General Wellness"
        }. ` +
        (normalizedDescription
          ? `User description of the food: "${normalizedDescription}". `
          : "Identify the meal from the image. ") +
        'Return strict JSON with this exact shape: ' +
        '{"food":"string","score":0,"verdict":"string","suggestion":"string","alternative":"string","nutrition":{"calories":"string","protein":"string","carbs":"string","fat":"string"}}. ' +
        "Score must be a number from 0 to 10. Keep nutrition values short like '220 kcal' or '18 g'.",
    },
  ];

  if (image) {
    const { mediaType, data } = extractImageParts(image);
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: mediaType,
        data,
      },
    });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 700,
      temperature: 0.2,
      system:
        "You are a health food analysis assistant. Analyze the food in the uploaded image and return JSON only. Do not include markdown fences or extra commentary.",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    const apiMessage =
      payload?.error?.message ||
      payload?.message ||
      "Claude request failed.";
    throw new Error(
      apiMessage.includes("credit") || apiMessage.includes("billing")
        ? "Your Claude account needs available credits before analysis can run."
        : "AI analysis is temporarily unavailable. Please try again in a moment."
    );
  }

  const text = extractTextContent(payload);

  if (!text) {
    throw new Error("The AI returned an empty response. Please try another meal photo.");
  }

  const parsed = parseAnalysisJson(text);
  return {
    ...validateAnalysisShape(parsed, normalizedCondition),
    activeHealthContexts,
  };
}

export async function analyzeMeal(input) {
  const provider = String(process.env.AI_PROVIDER || "mock").toLowerCase();

  switch (provider) {
    case "mock":
      return analyzeWithMock(input);
    case "claude":
      return analyzeWithClaude(input);
    case "openai":
      return analyzeWithOpenAI(input);
    case "gemini":
      return analyzeWithGemini(input);
    default:
      throw new Error("The selected AI provider is not supported right now.");
  }
}

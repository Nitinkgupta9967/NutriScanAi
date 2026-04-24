import mongoose from "mongoose";

const NutritionSchema = new mongoose.Schema(
  {
    calories: { type: String, default: "" },
    protein: { type: String, default: "" },
    carbs: { type: String, default: "" },
    fat: { type: String, default: "" },
  },
  { _id: false }
);

const MealAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    food: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0, max: 10 },
    condition: { type: String, required: true, trim: true },
    activeHealthContexts: {
      type: [String],
      default: [],
    },
    verdict: { type: String, default: "" },
    alternative: { type: String, default: "" },
    suggestion: { type: String, default: "" },
    provider: { type: String, default: "mock" },
    nutrition: { type: NutritionSchema, default: () => ({}) },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MealAnalysis ||
  mongoose.model("MealAnalysis", MealAnalysisSchema);

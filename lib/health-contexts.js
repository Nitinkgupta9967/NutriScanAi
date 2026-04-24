export const HEALTH_CONTEXT_OPTIONS = [
  "General Wellness",
  "Diabetes",
  "Prediabetes",
  "High Cholesterol",
  "High Blood Pressure",
  "Heart Disease",
  "Kidney Disease",
  "Fatty Liver",
  "PCOS",
  "Thyroid Support",
  "Herpes",
  "GERD",
  "Acid Reflux",
  "IBS",
  "Crohn's Disease",
  "Ulcerative Colitis",
  "Celiac Disease",
  "Gluten Sensitivity",
  "Lactose Intolerance",
  "Nut Allergy",
  "Peanut Allergy",
  "Shellfish Allergy",
  "Egg Allergy",
  "Soy Allergy",
  "Low Iron",
  "Anemia",
  "Weight Loss",
  "Weight Gain",
  "Pregnancy",
  "Postpartum",
  "Migraine Support",
  "Arthritis",
  "Gout",
  "Fever Recovery",
  "Cold Recovery",
  "Low Sodium Diet",
  "High Protein Diet",
  "Low Carb Diet",
  "Vegetarian",
  "Vegan",
];

export function normalizeHealthContext(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ");
}

export function dedupeHealthContexts(values) {
  const seen = new Set();

  return values
    .map(normalizeHealthContext)
    .filter(Boolean)
    .filter((value) => {
      const key = value.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}

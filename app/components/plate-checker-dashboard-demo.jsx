"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const conditions = [
  { value: "general", label: "General" },
  { value: "herpes", label: "Herpes" },
  { value: "diabetes", label: "Diabetes" },
  { value: "high cholesterol", label: "High Cholesterol" },
];

const mockResults = {
  general: {
    food: "Mediterranean Grain Bowl",
    score: 9,
    verdict:
      "A balanced meal with fiber, lean protein, and steady energy-supporting carbs.",
    alternative: "Salmon quinoa salad",
    suggestion:
      "It keeps the same balanced feel while increasing omega-3 fats and protein.",
    nutrition: {
      calories: "430 kcal",
      protein: "24 g",
      carbs: "38 g",
      fat: "18 g",
    },
  },
  herpes: {
    food: "Peanut Butter Toast",
    score: 4,
    verdict:
      "Not recommended for herpes due to higher arginine content in nuts, which may be less ideal during flare-sensitive periods.",
    alternative: "Greek yogurt berry bowl",
    suggestion:
      "It offers more lysine-forward protein with a lighter ingredient profile.",
    nutrition: {
      calories: "260 kcal",
      protein: "11 g",
      carbs: "22 g",
      fat: "14 g",
    },
  },
  diabetes: {
    food: "Chicken Rice Bowl",
    score: 7,
    verdict:
      "Reasonably safe for diabetes, but the rice portion could raise blood sugar more quickly without extra fiber.",
    alternative: "Grilled chicken quinoa bowl",
    suggestion:
      "Quinoa and extra greens can help create a steadier glucose response.",
    nutrition: {
      calories: "390 kcal",
      protein: "29 g",
      carbs: "34 g",
      fat: "11 g",
    },
  },
  "high cholesterol": {
    food: "Cheeseburger Combo",
    score: 3,
    verdict:
      "Not ideal for high cholesterol because it combines higher saturated fat with a heavier sodium load.",
    alternative: "Turkey avocado wrap",
    suggestion:
      "It lowers saturated fat while keeping the meal filling and protein-rich.",
    nutrition: {
      calories: "610 kcal",
      protein: "27 g",
      carbs: "42 g",
      fat: "35 g",
    },
  },
};

const starterMeals = [
  {
    id: "meal-1",
    food: "Berry Oat Smoothie",
    score: 8,
    timestamp: "Today, 8:40 AM",
  },
  {
    id: "meal-2",
    food: "Avocado Egg Toast",
    score: 7,
    timestamp: "Yesterday, 1:15 PM",
  },
  {
    id: "meal-3",
    food: "Peanut Noodle Bowl",
    score: 4,
    timestamp: "Apr 23, 7:30 PM",
  },
];

function getScoreClasses(score) {
  if (score >= 8) {
    return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
  }

  if (score >= 5) {
    return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
  }

  return "bg-rose-100 text-rose-700 ring-1 ring-rose-200";
}

function UploadCard({
  condition,
  onConditionChange,
  isDragging,
  isLoading,
  selectedFileName,
  previewUrl,
  onPickFile,
  onFileChange,
  onDrop,
  onDragOver,
  onDragLeave,
}) {
  const inputRef = useRef(null);

  return (
    <section className="space-y-5 rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.22)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-700">NutriScan AI</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Snap Your Plate <span aria-hidden="true">&#128248;</span>
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Upload or capture your meal photo
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="condition"
          className="text-sm font-medium text-slate-700"
        >
          Your Condition
        </label>
        <select
          id="condition"
          value={condition}
          onChange={(event) => onConditionChange(event.target.value)}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
        >
          {conditions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`rounded-[2rem] border border-dashed p-5 transition ${
          isDragging
            ? "border-emerald-400 bg-emerald-50"
            : "border-emerald-200 bg-emerald-50/60"
        }`}
      >
        <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-[1.75rem] bg-white/80 px-5 py-10 text-center">
          <div className="flex h-18 w-18 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-700">
            UP
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-slate-900">
              Drag and drop your meal photo
            </p>
            <p className="text-sm leading-6 text-slate-500">
              Use a clear top-down shot for the best analysis preview
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onPickFile();
              inputRef.current?.click();
            }}
            disabled={isLoading}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {isLoading ? "Uploading..." : "Choose File"}
          </button>
          {selectedFileName ? (
            <p className="text-sm text-slate-500">{selectedFileName}</p>
          ) : null}
        </div>
      </div>

      {previewUrl ? (
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50">
          <Image
            src={previewUrl}
            alt="Meal preview"
            width={1200}
            height={800}
            unoptimized
            className="h-52 w-full object-cover"
          />
        </div>
      ) : null}
    </section>
  );
}

function LoadingCard() {
  return (
    <section className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.22)]">
      <div className="w-full max-w-sm space-y-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-slate-900">
            Analyzing your meal...
          </p>
          <p className="text-sm leading-6 text-slate-500">
            Reviewing ingredients, nutrition, and condition fit.
          </p>
        </div>
        <div className="space-y-2">
          <div className="h-3 animate-pulse rounded-full bg-slate-200" />
          <div className="mx-auto h-3 w-4/5 animate-pulse rounded-full bg-slate-200" />
          <div className="mx-auto h-3 w-3/5 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </section>
  );
}

function ResultCard({ result }) {
  const nutritionItems = [
    { label: "Calories", value: result.nutrition.calories },
    { label: "Protein", value: result.nutrition.protein },
    { label: "Carbs", value: result.nutrition.carbs },
    { label: "Fat", value: result.nutrition.fat },
  ];

  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.22)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold tracking-tight text-slate-900">
            {result.food}
          </h3>
          <span className="mt-3 inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-cyan-700 uppercase">
            IDENTIFIED
          </span>
        </div>
        <span
          className={`shrink-0 rounded-full px-4 py-2 text-lg font-semibold ${getScoreClasses(
            result.score
          )}`}
        >
          {result.score}/10
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {nutritionItems.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-slate-50 px-4 py-4 text-center"
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-[1.75rem] bg-amber-50 p-5">
          <p className="text-sm font-semibold text-slate-900">AI Verdict</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {result.verdict}
          </p>
        </div>

        <div className="rounded-[1.75rem] bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-800">
            ⚡ Try this instead
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {result.alternative}
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {result.suggestion}
          </p>
        </div>
      </div>
    </section>
  );
}

function EmptyStateCard() {
  return (
    <section className="rounded-[2rem] border border-dashed border-slate-200 bg-white/85 p-8 text-center shadow-[0_24px_80px_-36px_rgba(15,23,42,0.18)]">
      <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-700">
        AI
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-900">
        No meals analyzed yet
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Upload your first meal photo to see a health score, AI verdict, and a
        better alternative.
      </p>
    </section>
  );
}

function ErrorCard({ onRetry }) {
  return (
    <section className="rounded-[2rem] border border-rose-100 bg-white/90 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.22)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-xl font-semibold text-rose-600">
          !
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">
            Something went wrong
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            We couldn&apos;t finish that analysis preview. Try again with another
            meal photo.
          </p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-rose-500 px-5 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          Retry
        </button>
      </div>
    </section>
  );
}

function RecentMealsCard({ meals }) {
  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.22)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">Recent Meals</p>
          <h3 className="text-xl font-semibold text-slate-900">
            Analysis history
          </h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
          Scroll
        </span>
      </div>

      {meals.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 px-4 py-6 text-sm leading-6 text-slate-500">
          No meals analyzed yet
        </p>
      ) : (
        <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
          {meals.map((meal) => (
            <article
              key={meal.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">
                  {meal.food}
                </p>
                <p className="text-sm text-slate-500">{meal.timestamp}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${getScoreClasses(
                  meal.score
                )}`}
              >
                {meal.score}/10
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default function NutriScanAIDashboardDemo() {
  const [condition, setCondition] = useState("general");
  const [status, setStatus] = useState("empty");
  const [result, setResult] = useState(null);
  const [recentMeals, setRecentMeals] = useState(starterMeals);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const previewUrlRef = useRef("");

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const selectedFileName = useMemo(() => {
    if (!selectedFile) {
      return "";
    }

    return `${selectedFile.name} • ${Math.max(
      1,
      Math.round(selectedFile.size / 1024)
    )} KB`;
  }, [selectedFile]);

  const finishAnalysis = () => {
    const nextResult = mockResults[condition];

    setResult(nextResult);
    setRecentMeals((current) => [
      {
        id: `meal-${Date.now()}`,
        food: nextResult.food,
        score: nextResult.score,
        timestamp: "Just now",
      },
      ...current,
    ]);
    setStatus("result");
  };

  const startAnalysis = () => {
    setStatus("loading");

    window.setTimeout(() => {
      finishAnalysis();
    }, 1400);
  };

  const applyFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setStatus("error");
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextPreviewUrl;

    setSelectedFile(file);
    setPreviewUrl(nextPreviewUrl);
    startAnalysis();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      applyFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      applyFile(file);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.18)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">
              Health-focused AI
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              NutriScan AI
            </h1>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
              NK
            </div>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <UploadCard
            condition={condition}
            onConditionChange={setCondition}
            isDragging={isDragging}
            isLoading={status === "loading"}
            selectedFileName={selectedFileName}
            previewUrl={previewUrl}
            onPickFile={() => {
              setStatus("empty");
            }}
            onFileChange={handleFileChange}
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          />

          {status === "loading" ? (
            <LoadingCard />
          ) : status === "error" ? (
            <ErrorCard onRetry={() => setStatus("empty")} />
          ) : status === "result" && result ? (
            <ResultCard result={result} />
          ) : (
            <EmptyStateCard />
          )}
        </div>

        <RecentMealsCard meals={recentMeals} />
      </div>
    </main>
  );
}

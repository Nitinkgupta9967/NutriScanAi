"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { dedupeHealthContexts } from "@/lib/health-contexts";
import { MobileBottomNav, MobileTopBar } from "./mobile-app-shell";

const MAX_UPLOAD_SIZE_BYTES = 4 * 1024 * 1024;

function getScoreStyles(score) {
  if (score >= 8) {
    return "bg-emerald-100 text-emerald-700";
  }

  if (score >= 5) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-rose-100 text-rose-700";
}

function formatMealTime(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("We couldn't read that file. Please choose another meal photo."));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () =>
      reject(new Error("We couldn't read that file. Please choose another meal photo."));
    reader.readAsDataURL(file);
  });
}

function UploadCard({
  previewUrl,
  selectedFileName,
  description,
  isDragging,
  isLoading,
  onDescriptionChange,
  onAnalyzeDescription,
  onFileChange,
  onDrop,
  onDragOver,
  onDragLeave,
  onChooseFile,
}) {
  const inputRef = useRef(null);

  return (
    <section
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`rounded-[2rem] border-2 border-dashed bg-white px-6 py-8 text-center shadow-[0_20px_60px_-40px_rgba(15,23,42,0.3)] transition ${
        isDragging ? "border-teal-500 bg-teal-50/60" : "border-teal-500/90"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-3xl text-teal-700">
        📷
      </div>
      <h3 className="mt-6 text-[1.65rem] font-medium tracking-tight text-teal-700">
        Snap Your Plate <span aria-hidden="true">&#128248;</span>
      </h3>
      <p className="mt-2 text-[1rem] text-slate-500">
        AI will analyze nutrition &amp; suitability
      </p>

      <button
        type="button"
        onClick={() => {
          onChooseFile();
          inputRef.current?.click();
        }}
        disabled={isLoading}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-teal-600 px-5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-teal-300"
      >
        {isLoading ? "Uploading..." : "Upload Meal Photo"}
      </button>

      {selectedFileName ? (
        <p className="mt-3 text-sm text-slate-400">{selectedFileName}</p>
      ) : null}

      {previewUrl ? (
        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-100">
          <Image
            src={previewUrl}
            alt="Selected meal preview"
            width={1200}
            height={800}
            unoptimized
            className="h-44 w-full object-cover"
          />
        </div>
      ) : null}

      <div className="mt-6 text-left">
        <div className="relative flex items-center">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="px-3 text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
            Or describe it
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Describe the food if you don&apos;t have a photo
        </label>
        <textarea
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder='Example: "Marie Gold biscuit 5 rs wala"'
          className="mt-3 min-h-28 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-300 focus:ring-4 focus:ring-teal-100"
        />
        <button
          type="button"
          onClick={onAnalyzeDescription}
          disabled={isLoading}
          className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl border border-teal-200 bg-white px-5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300"
        >
          Analyze Description
        </button>
      </div>
    </section>
  );
}

function HealthContextSummary({ healthContexts, onOpenProfile, saving }) {
  return (
    <section className="rounded-[1.8rem] bg-white px-5 py-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.22)] ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-slate-700">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-teal-700">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2 5 5v6c0 5 3.4 9.7 7 11 3.6-1.3 7-6 7-11V5l-7-3Zm1 12h-2v-2H9v-2h2V8h2v2h2v2h-2v2Z" />
              </svg>
            </div>
            <h2 className="text-[15px] font-medium">Your Health Context</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            These selected contexts are used for the next scan. Edit them from your profile.
          </p>
        </div>

        <a
          href="/profile"
          onClick={onOpenProfile}
          className="shrink-0 rounded-2xl border border-teal-200 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
        >
          Manage
        </a>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {healthContexts.length > 0 ? (
          healthContexts.map((context) => (
            <span
              key={context}
              className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-teal-700"
            >
              {context}
            </span>
          ))
        ) : (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
            No active health context selected
          </span>
        )}
      </div>

      {saving ? (
        <p className="mt-3 text-xs font-medium text-teal-600">Updating health context...</p>
      ) : null}
    </section>
  );
}

export function LoadingAnalysisCard() {
  return (
    <section className="rounded-[2.3rem] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-200 border-t-teal-700" />
        </div>
        <p className="mt-5 text-xl font-semibold text-slate-900">
          Analyzing your meal...
        </p>
        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
          We&apos;re checking ingredients, nutrition, and how well this fits your
          health context.
        </p>
      </div>
    </section>
  );
}

export function AnalysisErrorCard({ message, onRetry }) {
  return (
    <section className="rounded-[2.3rem] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-2xl text-rose-600">
          !
        </div>
        <p className="mt-5 text-xl font-semibold text-slate-900">
          We hit a small issue
        </p>
        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
          {message || "We couldn't analyze that meal right now. Please try again."}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-rose-500 px-5 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          Retry
        </button>
      </div>
    </section>
  );
}

export function EmptyResultCard() {
  return (
    <section className="rounded-[2.3rem] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
        <div className="flex h-18 w-18 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-700">
          AI
        </div>
        <p className="mt-5 text-2xl font-medium text-slate-900">
          No meals analyzed yet
        </p>
        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
          Upload your first meal photo or describe a food to see a score, verdict, and a better alternative.
        </p>
      </div>
    </section>
  );
}

function ResultCard({ result, previewUrl }) {
  const nutritionItems = [
    { label: "KCAL", value: result.nutrition.calories, tone: "bg-blue-50 text-teal-700" },
    { label: "PROT", value: result.nutrition.protein, tone: "bg-emerald-100/70 text-emerald-700" },
    { label: "CARB", value: result.nutrition.carbs, tone: "bg-amber-50 text-amber-700" },
    { label: "FAT", value: result.nutrition.fat, tone: "bg-blue-100/70 text-slate-800" },
  ];

  return (
    <section className="overflow-hidden rounded-[2.3rem] bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <div className="relative">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt={result.food}
            width={1200}
            height={800}
            unoptimized
            className="h-56 w-full object-cover"
          />
        ) : (
          <div className="h-56 w-full bg-[linear-gradient(135deg,#d7f3ef,#f4f6fb)]" />
        )}
        <div
          className={`absolute right-5 top-5 rounded-full px-5 py-3 text-xl font-semibold shadow-lg ${getScoreStyles(
            result.score
          )}`}
        >
          ★ {result.score}/10
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <h3 className="text-[2rem] font-medium tracking-tight text-slate-900">
            {result.food}
          </h3>
          <p className="mt-1 text-sm text-slate-500">Analyzed: Just now</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {nutritionItems.map((item) => (
            <div
              key={item.label}
              className={`rounded-[1.35rem] px-4 py-4 text-center ${item.tone}`}
            >
              <p className="text-[1.65rem] font-semibold">{item.value}</p>
              <p className="mt-2 text-xs tracking-[0.18em] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-[1.75rem] bg-teal-50 px-5 py-5">
          <div className="flex items-center gap-3 text-teal-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-sm text-white">
              ✿
            </div>
            <h4 className="text-[1.6rem] font-medium">AI Verdict</h4>
          </div>
          <p className="mt-4 text-[1.06rem] leading-8 text-slate-700">
            {result.verdict}
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-emerald-300 bg-white px-5 py-5">
          <p className="text-sm font-semibold tracking-[0.14em] text-emerald-500 uppercase">
            ⚡ Try This Instead
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-700">
                🍽
              </div>
              <div>
                <p className="text-[1.7rem] font-medium tracking-tight text-slate-900">
                  {result.alternative}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {result.suggestion}
                </p>
              </div>
            </div>
            <span className="text-3xl text-slate-300">›</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RecentMealsList({ meals }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-medium tracking-tight text-slate-900">
          Recent Meals
        </h2>
        <a
          href="/history"
          className="text-lg font-medium text-teal-700 transition hover:text-teal-800"
        >
          View All
        </a>
      </div>

      {meals.length === 0 ? (
        <div className="rounded-[1.9rem] bg-white px-6 py-8 text-center text-sm text-slate-500 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)]">
          No meals analyzed yet
        </div>
      ) : (
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <article
              key={meal.id}
              className="flex items-center gap-4 rounded-[1.9rem] bg-white px-4 py-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)]"
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100 text-3xl">
                {index % 2 === 0 ? "🥗" : "🍔"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[1.35rem] font-medium text-slate-900">
                  {meal.name}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {formatMealTime(meal.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getScoreStyles(
                    meal.score
                  )}`}
                >
                  {meal.score}/10
                </span>
                <p className="mt-2 text-sm text-slate-400">
                  {meal.calories || meal.condition}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function MainAnalysisDashboard({
  initialMeals = [],
  initialHealthContexts = [],
  userName,
  userImage,
}) {
  const [healthContexts] = useState(() => dedupeHealthContexts(initialHealthContexts));
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(initialMeals);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastInput, setLastInput] = useState(null);
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

  const handleAnalyze = async ({ fileOverride, descriptionOverride, useTextOnly = false } = {}) => {
    const file = useTextOnly ? null : fileOverride || selectedFile;
    const textDescription = String(
      descriptionOverride !== undefined ? descriptionOverride : description
    ).trim();

    if (!file && !textDescription) {
      setError("Choose a meal image or describe the food first so we can analyze it.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const image = file ? await fileToBase64(file) : "";

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          description: textDescription,
          condition: healthContexts[0] || "General Wellness",
          healthContexts,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "We couldn't analyze that meal right now. Please try again."
        );
      }

      setResult(data.analysis);
      setLastInput(
        file
          ? { type: "image", file }
          : { type: "description", description: textDescription }
      );
      setHistory((current) => {
        const filtered = current.filter((meal) => meal.id !== data.recentMeal.id);
        return [data.recentMeal, ...filtered].slice(0, 8);
      });
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "We couldn't analyze that meal right now. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const applyFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload a valid image file so we can analyze your meal.");
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setError("That image is too large. Please upload a photo under 4 MB.");
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    previewUrlRef.current = nextPreviewUrl;

    setSelectedFile(file);
    setPreviewUrl(nextPreviewUrl);
    setResult(null);

    await handleAnalyze({ fileOverride: file });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (file) {
      await applyFile(file);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      await applyFile(file);
    }
  };

  const retryAnalysis = () => {
    if (lastInput?.type === "image") {
      handleAnalyze({ fileOverride: lastInput.file });
      return;
    }

    if (lastInput?.type === "description") {
      handleAnalyze({ descriptionOverride: lastInput.description, useTextOnly: true });
      return;
    }

    handleAnalyze();
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7fb_0%,#eef2f9_100%)] text-slate-900">
      <MobileTopBar userName={userName} userImage={userImage} />

      <main className="mx-auto flex w-full max-w-xl flex-col gap-7 px-4 py-6 sm:px-6">
        <HealthContextSummary healthContexts={healthContexts} />

        <UploadCard
          previewUrl={previewUrl}
          selectedFileName={selectedFileName}
          description={description}
          isDragging={isDragging}
          isLoading={isLoading}
          onDescriptionChange={setDescription}
          onAnalyzeDescription={() => {
            if (previewUrlRef.current) {
              URL.revokeObjectURL(previewUrlRef.current);
              previewUrlRef.current = "";
            }
            setSelectedFile(null);
            setPreviewUrl("");
            setResult(null);
            handleAnalyze({ descriptionOverride: description, useTextOnly: true });
          }}
          onChooseFile={() => setError("")}
          onFileChange={handleFileChange}
          onDrop={handleDrop}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
        />

        {isLoading ? (
          <LoadingAnalysisCard />
        ) : error ? (
          <AnalysisErrorCard message={error} onRetry={retryAnalysis} />
        ) : result ? (
          <ResultCard result={result} previewUrl={previewUrl} />
        ) : (
          <EmptyResultCard />
        )}

        <RecentMealsList meals={history} />
      </main>

      <MobileBottomNav active="home" />
    </div>
  );
}

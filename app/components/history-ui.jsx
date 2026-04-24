"use client";

import { MobileBottomNav, MobileTopBar } from "./mobile-app-shell";

export function HistoryScreen({ meals, userName, userImage }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7fb_0%,#eef2f9_100%)] text-slate-900">
      <MobileTopBar userName={userName} userImage={userImage} />

      <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-6 sm:px-6">
        <section>
          <h2 className="text-[1.9rem] font-semibold tracking-tight text-slate-900">
            History
          </h2>
          <p className="mt-1 text-[1.05rem] text-slate-500">
            Your saved meal analyses and scores.
          </p>
        </section>

        {meals.length === 0 ? (
          <section className="rounded-[2.3rem] bg-white p-10 text-center shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
            <p className="text-[1.4rem] font-medium text-slate-900">
              No meals analyzed yet
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Upload a meal from Home and it will appear here.
            </p>
          </section>
        ) : (
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <article
                key={meal.id}
                className="flex items-center gap-4 rounded-[1.9rem] bg-white px-4 py-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)]"
              >
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100 text-3xl">
                  {index % 2 === 0 ? "🥗" : "🍽️"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[1.35rem] font-medium text-slate-900">
                    {meal.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    }).format(new Date(meal.createdAt))}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                    {meal.score}/10
                  </span>
                  <p className="mt-2 text-sm text-slate-400">{meal.calories || meal.condition}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <MobileBottomNav active="history" />
    </div>
  );
}

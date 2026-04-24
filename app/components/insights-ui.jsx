"use client";

import { MobileBottomNav, MobileTopBar } from "./mobile-app-shell";

function MetricCard({ title, value, suffix, chip, bordered = false, subtitle }) {
  return (
    <section
      className={`rounded-[2.3rem] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)] ${
        bordered ? "border-t-4 border-teal-800" : ""
      }`}
    >
      <p className="text-[1rem] tracking-[0.12em] text-slate-600 uppercase">{title}</p>
      <div className="mt-5 flex items-end gap-2">
        <span className="text-[3.6rem] font-semibold tracking-tight text-teal-800">
          {value}
        </span>
        {suffix ? <span className="mb-2 text-[1.8rem] text-slate-900">{suffix}</span> : null}
      </div>
      {subtitle ? <p className="mt-3 text-[1rem] text-slate-500">{subtitle}</p> : null}
      {chip ? (
        <div className="mt-5 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-[1.02rem] text-emerald-700">
          {chip}
        </div>
      ) : null}
    </section>
  );
}

function EmptyInsightsCard() {
  return (
    <section className="rounded-[2.3rem] bg-white p-8 text-center shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </div>
      <h3 className="mt-5 text-[1.8rem] font-medium tracking-tight text-slate-900">
        No insights yet
      </h3>
      <p className="mt-3 text-[1.05rem] leading-7 text-slate-500">
        Scan a few meals from Home and this page will turn into real trends, top foods,
        and score changes based on your own history.
      </p>
    </section>
  );
}

function CoachCard({ message }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-teal-700 p-6 text-white shadow-[0_24px_80px_-36px_rgba(13,148,136,0.45)]">
      <p className="text-[1.05rem] font-medium">AI Nutritionist</p>
      <p className="mt-3 max-w-md text-[1.15rem] leading-8 text-white/95">{message}</p>
      <div className="pointer-events-none absolute -right-2 bottom-0 text-[6rem] text-white/10">
        ✿
      </div>
    </section>
  );
}

function BarChartCard({ bars, mode }) {
  const maxCalories = Math.max(...bars.map((bar) => bar.totalCalories), 0);

  return (
    <section className="rounded-[2.3rem] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[1.5rem] font-medium tracking-tight text-slate-900">
          {mode} Consistency
        </h3>
        <div className="rounded-full bg-teal-700 px-4 py-2 text-sm text-white">Weekly</div>
      </div>

      {bars.some((bar) => bar.totalCalories > 0) ? (
        <>
          <div className="mt-8 flex h-52 items-end justify-between gap-2">
            {bars.map((bar) => {
              const height = maxCalories > 0 ? Math.max(18, (bar.totalCalories / maxCalories) * 100) : 18;
              const active = bar.count > 0;

              return (
                <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className={`w-full rounded-t-xl ${
                      active ? "bg-teal-700" : "bg-blue-100"
                    }`}
                    style={{ height: `${height}%` }}
                    title={`${bar.label}: ${bar.totalCalories} kcal`}
                  />
                  <span className="text-xs tracking-[0.12em] text-slate-500">{bar.label}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Total calories from scanned meals each day this week.
          </p>
        </>
      ) : (
        <div className="mt-8 rounded-[1.5rem] bg-slate-50 px-5 py-8 text-center text-sm leading-6 text-slate-500">
          We need calorie data from a few scans before this weekly chart becomes useful.
        </div>
      )}
    </section>
  );
}

function MostConsumedCard({ items }) {
  return (
    <section className="rounded-[2.3rem] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <h3 className="text-[1.5rem] font-medium tracking-tight text-slate-900">
        Most Consumed
      </h3>

      {items.length ? (
        <div className="mt-6 space-y-5">
          {items.map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100 text-lg font-semibold text-teal-700">
                {item.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[1.2rem] font-medium text-slate-900">{item.name}</p>
                <div className="mt-2 h-1.5 rounded-full bg-blue-100">
                  <div
                    className="h-1.5 rounded-full bg-teal-700"
                    style={{ width: `${Math.max(20, (item.count / items[0].count) * 100)}%` }}
                  />
                </div>
              </div>
              <span className="text-[1.1rem] text-slate-500">{item.count}x</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[1.5rem] bg-slate-50 px-5 py-8 text-center text-sm leading-6 text-slate-500">
          Your repeated foods will appear here after a few more scans.
        </div>
      )}
    </section>
  );
}

function RingStat({ value, label, accent }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex h-24 w-24 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(${accent} ${value}%, #dfe8fb ${value}% 100%)`,
        }}
      >
        <div className="flex h-18 w-18 items-center justify-center rounded-full bg-white text-[1.45rem] font-semibold text-slate-900">
          {value}%
        </div>
      </div>
      <span className="text-[1.2rem] font-medium text-slate-900">{label}</span>
    </div>
  );
}

function BalanceCard({ macros }) {
  return (
    <section className="rounded-[2.3rem] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <h3 className="text-[1.5rem] font-medium tracking-tight text-slate-900">
        Nutritional Balance
      </h3>

      {macros.length ? (
        <>
          <p className="mt-3 text-[1.1rem] leading-8 text-slate-500">
            These percentages are based on the protein, carb, and fat grams detected in your
            recent meal scans.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {macros.map((macro) => (
              <RingStat
                key={macro.label}
                value={macro.value}
                label={macro.label}
                accent={macro.accent}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-6 rounded-[1.5rem] bg-slate-50 px-5 py-8 text-center text-sm leading-6 text-slate-500">
          Macro balance will appear once enough scans include nutrition data.
        </div>
      )}
    </section>
  );
}

export function InsightsScreen({ insights, userName, userImage }) {
  const hasData = insights.totalMeals > 0;
  const averageValue = insights.weeklyAverageScore === null ? "—" : insights.weeklyAverageScore;
  const improvementValue =
    insights.improvementPercent === null
      ? "—"
      : `${insights.improvementPercent > 0 ? "+" : ""}${insights.improvementPercent}%`;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7fb_0%,#eef2f9_100%)] text-slate-900">
      <MobileTopBar userName={userName} userImage={userImage} showAvatarOnRight />

      <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-5 sm:px-6">
        <section className="space-y-1">
          <h2 className="text-[1.7rem] font-medium tracking-tight text-slate-900">
            Health Insights
          </h2>
          <p className="text-[1.08rem] text-slate-500">
            {hasData
              ? insights.summary
              : "Your nutrition trends will appear here once you scan a few meals."}
          </p>
        </section>

        {!hasData ? (
          <EmptyInsightsCard />
        ) : (
          <>
            <MetricCard
              title="Weekly Average Score"
              value={averageValue}
              suffix={insights.weeklyAverageScore === null ? "" : "/10"}
              chip={insights.weeklyAverageLabel}
            />
            <MetricCard
              title="Improvement"
              value={improvementValue}
              subtitle={insights.improvementLabel}
              bordered
            />
            <CoachCard message={insights.coachMessage} />
            <BarChartCard bars={insights.dailySeries} mode={insights.chartMode} />
            <MostConsumedCard items={insights.topFoods} />
            <BalanceCard macros={insights.macroBalance} />
          </>
        )}
      </main>

      <MobileBottomNav active="insights" />
    </div>
  );
}

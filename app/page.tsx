import Link from "next/link";

const howItWorks = [
  {
    icon: "📸",
    title: "Step 1: Upload photo",
    description:
      "Take a quick picture of your meal or ingredients before you start eating.",
  },
  {
    icon: "🔍",
    title: "Step 2: AI analysis",
    description:
      "Our AI instantly breaks down ingredients and cross-references your health profile.",
  },
  {
    icon: "◎",
    title: "Step 3: Get score",
    description:
      "Receive a health score and personalized suggestions in under 5 seconds.",
  },
];

const features = [
  {
    icon: "★",
    title: "Personalized Scoring",
    description:
      "AI is tuned to your health context and nutritional goals, not generic food rules.",
  },
  {
    icon: "🔒",
    title: "Condition-Based",
    description:
      "Support for herpes, diabetes, high cholesterol, and general wellness.",
  },
  {
    icon: "🍃",
    title: "Smart Alternatives",
    description:
      "We suggest what to swap next, not just what to avoid.",
  },
  {
    icon: "⚡",
    title: "Fast AI Results",
    description:
      "Get meal analysis quickly enough to make a decision before your next bite.",
  },
];

const benefits = [
  {
    title: "Universal Health Context",
    description:
      "Whether your goal is symptom control or better long-term nutrition, NutriScan AI adapts.",
  },
  {
    title: "Personalized Nutrition",
    description:
      "Our AI blends food recognition, user condition, and nutrition logic into practical advice.",
  },
  {
    title: "Empowered Decisions",
    description:
      "Know what works for your body and stop guessing at every meal.",
  },
];

const testimonials = [
  {
    quote:
      "Managing my herpes outbreaks was a nightmare until I found NutriScan AI. I had no idea my healthy peanut snacks were the trigger.",
    name: "Sarah Jenkins",
    role: "Lifestyle User",
  },
  {
    quote:
      "As a diabetic, I thought I'd never enjoy eating out again. NutriScan AI helped me stay in control in seconds.",
    name: "Mark Thompson",
    role: "Health-Conscious User",
  },
  {
    quote:
      "The alternative suggestions are a game-changer. I don't feel restricted anymore, just better informed.",
    name: "Elena Rodriguez",
    role: "Fitness Enthusiast",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fafc_0%,#eef3fb_40%,#f7fafc_100%)] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-tight text-teal-700">
            NutriScan AI
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-500 md:flex">
            <a href="#features" className="transition hover:text-teal-700">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-teal-700">
              How It Works
            </a>
            <a href="#testimonials" className="transition hover:text-teal-700">
              Testimonials
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-2xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:inline-flex"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center rounded-full bg-teal-700 px-5 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(15,118,110,0.7)] transition hover:bg-teal-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase">
            AI-Powered Nutritional Safety
          </span>
          <h1 className="mt-6 max-w-xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Know If Your Food Is Safe <span className="text-teal-700">Instantly</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Upload your meal and get AI-powered health insights based on your
            specific medical condition or dietary needs.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-teal-700 px-6 text-sm font-semibold text-white shadow-[0_14px_30px_-20px_rgba(15,118,110,0.7)] transition hover:bg-teal-800"
            >
              Get Started
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Try Demo
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-[2.4rem] bg-white p-4 shadow-[0_40px_90px_-42px_rgba(15,23,42,0.42)]">
            <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#8fd2c8,#165f56)] p-5">
              <div className="flex items-center justify-center rounded-[1.8rem] bg-white/20 p-4">
                <div className="flex h-[22rem] w-full items-center justify-center rounded-[1.7rem] bg-[radial-gradient(circle_at_center,#f5faf9_0%,#d7eee8_58%,#97d0c4_100%)]">
                  <div className="relative h-72 w-72 rounded-full bg-white shadow-inner">
                    <div className="absolute inset-6 rounded-full bg-[#d4ebc3]" />
                    <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff9f6e]" />
                    <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2">
                      {Array.from({ length: 8 }).map((_, index) => (
                        <span
                          key={index}
                          className="absolute left-1/2 top-1/2 h-16 w-8 origin-bottom rounded-full bg-[#ffb18a]"
                          style={{
                            transform: `translate(-50%, -100%) rotate(${index * 45}deg)`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="absolute left-8 top-16 grid grid-cols-4 gap-2">
                      {Array.from({ length: 16 }).map((_, index) => (
                        <span
                          key={index}
                          className="h-3 w-3 rounded-full bg-[#7eaf49]"
                        />
                      ))}
                    </div>
                    <div className="absolute right-8 top-14 flex flex-col gap-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className="h-7 w-20 rounded-full bg-[#86c88f]"
                          style={{
                            transform: `rotate(${index * 16 - 18}deg)`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bd2130]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 left-8 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  ✓
                </span>
                Analysis Done
              </div>
              <div className="mt-2 h-1.5 w-24 rounded-full bg-slate-100">
                <div className="h-1.5 w-18 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm tracking-[0.16em] text-slate-400 uppercase">How It Works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Simple steps to nutritional confidence
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {howItWorks.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] bg-white/80 p-6 text-center shadow-[0_24px_60px_-42px_rgba(15,23,42,0.26)]"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-teal-700">
                {item.icon}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-white/60 bg-white/40 py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm tracking-[0.16em] text-slate-400 uppercase">
              Engineered for your health
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.7rem] bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.18)]"
              >
                <div className="text-2xl text-teal-700">{item.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm tracking-[0.16em] text-slate-400 uppercase">Real Analysis</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            See it in action
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[2.2rem] bg-white p-5 shadow-[0_36px_80px_-48px_rgba(15,23,42,0.35)]">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,#fdf8ef,#f4f9ff)] p-4">
              <div className="flex h-full min-h-[20rem] items-center justify-center rounded-[1.5rem] bg-white">
                <div className="relative h-64 w-44 rounded-[2rem] bg-gradient-to-b from-[#f3c98a] via-[#c88d47] to-[#8b572d] shadow-xl">
                  <div className="absolute left-0 right-0 top-6 text-center text-sm font-semibold text-slate-700">
                    Peanut Butter
                  </div>
                  <div className="absolute left-5 right-5 top-16 rounded-2xl bg-[#6ec7d1] px-4 py-6 text-center shadow-inner">
                    <div className="rounded-xl bg-white/85 px-4 py-5">
                      <p className="text-xl font-semibold text-teal-700">Safe Butter</p>
                      <p className="mt-1 text-xs tracking-[0.2em] text-slate-500 uppercase">
                        Jar Mockup
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Detected Food</p>
                  <h3 className="text-2xl font-semibold text-slate-900">Peanut Butter</h3>
                  <p className="text-sm text-slate-500">Creamy, 100% roasted peanuts</p>
                </div>
                <div className="rounded-full bg-amber-100 px-4 py-2 text-lg font-semibold text-amber-700">
                  6/10
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-rose-50 p-4">
                <p className="text-sm font-semibold text-rose-600">Condition Alert: Herpes</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Peanuts are high in arginine, which may trigger outbreaks. Current lysine-to-arginine ratio is not ideal.
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-700">Safe Alternative</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Try almond butter or sunflower seed butter for a better amino acid balance.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View Detailed Breakdown
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div className="grid gap-5 sm:grid-cols-[0.9fr_1fr]">
          <div className="flex min-h-[16rem] items-end rounded-[2rem] bg-[radial-gradient(circle_at_top,#d6f2dd,#0f172a)] p-5 shadow-[0_28px_60px_-42px_rgba(15,23,42,0.4)]">
            <div className="text-6xl">🥗</div>
          </div>
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#18a999,#0f766e)] p-8 text-white shadow-[0_28px_60px_-42px_rgba(15,118,110,0.5)]">
            <p className="text-sm tracking-[0.16em] text-white/70 uppercase">Safe Nutrition</p>
            <h3 className="mt-6 text-4xl font-semibold tracking-tight">
              Safe Nutrition
              <br />
              Safe Work
            </h3>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm tracking-[0.16em] text-slate-400 uppercase">
            Because “healthy” is personal
          </p>
          <div className="mt-8 space-y-7">
            {benefits.map((item, index) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-teal-700">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm tracking-[0.16em] text-slate-400 uppercase">
            Real Stories from Real Users
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className="rounded-[1.8rem] bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22)]"
            >
              <p className="text-sm leading-7 text-slate-500">&quot;{item.quote}&quot;</p>
              <div className="mt-8 flex items-center gap-3">
                <div
                  className={`h-4 w-4 rounded-full ${
                    index === 0
                      ? "bg-emerald-300"
                      : index === 1
                        ? "bg-teal-300"
                        : "bg-amber-300"
                  }`}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.4rem] bg-[linear-gradient(135deg,#0f766e,#0b8a81)] px-6 py-14 text-center text-white shadow-[0_36px_80px_-48px_rgba(15,118,110,0.7)]">
          <div className="absolute inset-0 opacity-10" />
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Start Eating Smarter Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/80">
            Join 50,000+ users who have taken control of their nutrition. Scan your first meal and see the difference data makes.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-6 text-sm font-semibold text-teal-700 transition hover:bg-slate-100"
            >
              Upload Your First Meal
            </Link>
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-white/60 bg-white/70">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">NutriScan AI</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Personalized AI nutrition analysis for a healthier, safer you.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Product</h4>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <a href="#features" className="block transition hover:text-teal-700">
                Features
              </a>
              <Link href="/dashboard" className="block transition hover:text-teal-700">
                Dashboard
              </Link>
              <Link href="/insights" className="block transition hover:text-teal-700">
                Insights
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Company</h4>
            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <a href="#testimonials" className="block transition hover:text-teal-700">
                About Us
              </a>
              <Link href="/signup" className="block transition hover:text-teal-700">
                Contact
              </Link>
              <Link href="/login" className="block transition hover:text-teal-700">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Questions? We&apos;re here to help.
            </p>
            <a
              href="mailto:support@nutriscanai.com"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl bg-slate-100 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Email Support
            </a>
          </div>
        </div>

        <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
          © 2024 NutriScan AI. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

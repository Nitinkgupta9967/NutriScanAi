"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";

const inputClassName =
  "h-12 w-full rounded-2xl border border-emerald-100 bg-white/90 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({
    error: "",
    loading: false,
  });
  const registered = searchParams.get("registered") === "1";

  const handleLogin = async (event) => {
    event.preventDefault();

    if (status.loading) {
      return;
    }

    setStatus({ error: "", loading: true });

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setStatus({
        error: "Incorrect email or password. Please try again.",
        loading: false,
      });
      return;
    }

    router.push(result?.url || "/dashboard");
  };

  return (
    <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
      <div className="mb-8 space-y-2 text-center">
        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium tracking-[0.24em] text-emerald-700 uppercase">
          Health AI Portal
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Welcome Back
        </h1>
        <p className="text-sm leading-6 text-slate-500">
          Sign in to review meal insights, nutrition trends, and AI-backed
          recommendations.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            className={inputClassName}
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            className={inputClassName}
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {registered ? (
          <p className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Your account is ready. Sign in to continue.
          </p>
        ) : null}

        {status.error ? (
          <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {status.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status.loading}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-emerald-300"
        >
          {status.loading ? "Signing in..." : "Login"}
        </button>

        <button
          type="button"
          disabled={status.loading}
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:ring-4 focus:ring-slate-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="text-base">G</span>
          Sign in with Google
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-emerald-700 transition hover:text-emerald-800"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f0fdf4,_#f8fafc_45%,_#e5e7eb)] px-4 py-10">
      <Suspense
        fallback={
          <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
            <div className="space-y-4">
              <div className="h-6 w-36 animate-pulse rounded-full bg-slate-200" />
              <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
              <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
              <div className="h-12 animate-pulse rounded-2xl bg-emerald-100" />
            </div>
          </section>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}

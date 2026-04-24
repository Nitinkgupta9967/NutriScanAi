"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
  "h-12 w-full rounded-2xl border border-emerald-100 bg-white/90 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100";

export default function SignupPage() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({
    error: "",
    success: "",
    loading: false,
  });

  const handleSignup = async (event) => {
    event.preventDefault();

    if (status.loading) {
      return;
    }

    setStatus({ error: "", success: "", loading: true });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const payload = await response.json();

      if (!response.ok) {
        setStatus({
          error: payload.message || "Unable to create your account right now.",
          success: "",
          loading: false,
        });
        return;
      }

      setStatus({
        error: "",
        success: "Account created successfully. Redirecting to login...",
        loading: false,
      });

      setData({ name: "", email: "", password: "" });
      router.push("/login?registered=1");
    } catch {
      setStatus({
        error: "We couldn't reach the server. Please try again.",
        success: "",
        loading: false,
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#ecfeff,_#f8fafc_48%,_#e5e7eb)] px-4 py-10">
      <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
        <div className="mb-8 space-y-2 text-center">
          <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium tracking-[0.24em] text-cyan-700 uppercase">
            Personalized Nutrition
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Create Account
          </h1>
          <p className="text-sm leading-6 text-slate-500">
            Set up your profile to start analyzing meals and getting
            health-focused AI guidance.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              className={inputClassName}
              required
              placeholder="Your name"
              value={data.name}
              onChange={(event) =>
                setData({ ...data, name: event.target.value })
              }
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              className={inputClassName}
              required
              type="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(event) =>
                setData({ ...data, email: event.target.value })
              }
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              className={inputClassName}
              required
              type="password"
              minLength={6}
              placeholder="Create a secure password"
              value={data.password}
              onChange={(event) =>
                setData({ ...data, password: event.target.value })
              }
            />
          </label>

          {status.error ? (
            <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {status.error}
            </p>
          ) : null}

          {status.success ? (
            <p className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {status.success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status.loading}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-cyan-600 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-cyan-300"
          >
            {status.loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-cyan-700 transition hover:text-cyan-800"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

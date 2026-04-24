"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

function iconClassName(active) {
  return active ? "text-teal-700" : "text-slate-400";
}

function HomeIcon({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${iconClassName(active)}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 3.5 4 9.7v10.3c0 .6.4 1 1 1h4.8v-6h4.4v6H19c.6 0 1-.4 1-1V9.7l-8-6.2Z" />
    </svg>
  );
}

function HistoryIcon({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${iconClassName(active)}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v4h4" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}

function InsightsIcon({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${iconClassName(active)}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5 20h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14c0 .6.4 1 1 1Zm2-3v-4h2v4H7Zm4 0V9h2v8h-2Zm4 0v-6h2v6h-2Z" />
    </svg>
  );
}

function ProfileIcon({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${iconClassName(active)}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 12a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6Zm0 2.2c-4.1 0-7.5 2.4-7.5 5.4 0 .6.4 1 1 1h13c.6 0 1-.4 1-1 0-3-3.4-5.4-7.5-5.4Z" />
    </svg>
  );
}

function LogoutIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

function AppIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-800 text-white">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 4h2v16H8zM14 4h2v16h-2zM5 8h14v2H5zM5 14h14v2H5z" />
      </svg>
    </div>
  );
}

export function LogoutConfirmDialog({ open, onCancel, onConfirm }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_-32px_rgba(15,23,42,0.45)]">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          Confirm logout?
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          You will be signed out of NutriScan AI and returned to the login screen.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Confirm Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export function MobileTopBar({ userName, userImage, showAvatarOnRight = false }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur sm:px-6">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between">
          <div className="flex items-center gap-3">
            {showAvatarOnRight ? (
              <AppIcon />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-teal-500 bg-slate-100">
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={userName || "User"}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-lg">U</span>
                )}
              </div>
            )}
            <h1 className="text-[1.95rem] font-semibold tracking-tight text-teal-700">
              NutriScan AI
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-teal-700 transition hover:bg-teal-50"
              aria-label="Logout"
            >
              <LogoutIcon />
            </button>

            {showAvatarOnRight ? (
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-teal-300 bg-slate-100">
                {userImage ? (
                  <Image
                    src={userImage}
                    alt={userName || "User"}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm">U</span>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <LogoutConfirmDialog
        open={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={() => signOut({ callbackUrl: "/login" })}
      />
    </>
  );
}

export function MobileBottomNav({ active }) {
  const items = [
    { href: "/dashboard", label: "Home", key: "home", icon: HomeIcon },
    { href: "/history", label: "History", key: "history", icon: HistoryIcon },
    { href: "/insights", label: "Insights", key: "insights", icon: InsightsIcon },
    { href: "/profile", label: "Profile", key: "profile", icon: ProfileIcon },
  ];

  return (
    <nav className="sticky bottom-0 z-20 mt-6 rounded-t-[2rem] bg-white px-5 py-4 shadow-[0_-12px_30px_-24px_rgba(15,23,42,0.25)]">
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-sm transition ${
                isActive
                  ? "bg-emerald-50 text-teal-700"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <Icon active={isActive} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function UnauthorizedScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f0fdf4,_#f8fafc_50%,_#e5e7eb)] px-4 py-10">
      <section className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-8 text-center shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)]">
        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-amber-700 uppercase">
          Session Required
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
          Please sign in to continue
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Your health dashboard, insights, and profile are available after login.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Go to Login
        </Link>
      </section>
    </main>
  );
}

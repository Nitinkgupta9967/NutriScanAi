"use client";

import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";

import HealthContextManager from "./health-context-manager";
import { LogoutConfirmDialog, MobileBottomNav, MobileTopBar } from "./mobile-app-shell";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M12 22a2.3 2.3 0 0 0 2.3-2.3H9.7A2.3 2.3 0 0 0 12 22Zm6-6V11a6 6 0 1 0-12 0v5L4 18v1h16v-1l-2-2Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M17 9h-1V7a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-6 6.7V17h2v-1.3a2 2 0 1 0-2 0ZM10 9V7a2 2 0 1 1 4 0v2h-4Z" />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M20 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM6 9h2v4H6V9Zm4 0h1v2h-1V9Zm3 0h1v4h-1V9Zm3 0h1v2h-1V9Z" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="m3 17.3 9.9-9.9 3.7 3.7L6.7 21H3v-3.7Zm16.7-9.7a1.7 1.7 0 0 0 0-2.4l-.9-.9a1.7 1.7 0 0 0-2.4 0l-1.4 1.4 3.7 3.7 1-1.8Z" />
    </svg>
  );
}

function ProfileAvatarCard({ userName, userEmail, userImage }) {
  return (
    <section className="px-2 text-center">
      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-white bg-[linear-gradient(180deg,#313a44,#1d242d)] shadow-[0_18px_40px_-20px_rgba(15,23,42,0.5)]">
        {userImage ? (
          <Image
            src={userImage}
            alt={userName || "User"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-slate-300">
            {(userName || "U").slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="absolute bottom-2 left-0 right-0 bg-black/20 py-1 text-[0.5rem] tracking-[0.24em] text-slate-100 uppercase">
          User Profile
        </div>
        <div className="absolute -bottom-2 -right-2 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-white bg-teal-600 text-white shadow-lg">
          <PencilIcon />
        </div>
      </div>

      <h2 className="mt-8 text-[2.2rem] font-semibold tracking-tight text-slate-900">
        {userName || "Alex Thompson"}
      </h2>
      <p className="mt-2 text-[1.12rem] text-slate-500">
        {userEmail || "alex.thompson@healthmail.com"}
      </p>
    </section>
  );
}

function HealthFocusCard({
  healthContexts,
  saving,
  onHealthContextsChange,
  message,
}) {
  return (
    <section className="rounded-[2.3rem] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <h3 className="text-[2rem] font-semibold tracking-tight text-slate-900">
        Health Focus
      </h3>

      <p className="mt-4 text-[1.05rem] leading-7 text-slate-500">
        Manage the same active health contexts used on your dashboard. These stay active for future scans until you update or remove them.
      </p>

      <div className="mt-6">
        <HealthContextManager
          contexts={healthContexts}
          onChange={onHealthContextsChange}
          saving={saving}
          helperText="Choose every active condition or health goal that should affect future meal analysis. Add custom statuses when needed and remove them later when they no longer apply."
        />
      </div>

      {message ? (
        <div className="mt-5 rounded-[1.5rem] border border-teal-200 bg-teal-50/60 px-5 py-4 text-sm leading-6 text-slate-700">
          {message}
        </div>
      ) : null}
    </section>
  );
}

function SettingRow({ icon, title, subtitle, trailing, onClick }) {
  const content = (
    <>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[1.35rem] font-medium tracking-tight text-slate-900">
          {title}
        </p>
        <p className="mt-1 text-[1.02rem] text-slate-500">{subtitle}</p>
      </div>
      {trailing}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-4 rounded-[1.5rem] px-2 py-3 text-left transition hover:bg-slate-50"
      >
        {content}
      </button>
    );
  }

  return <div className="flex w-full items-center gap-4 rounded-[1.5rem] px-2 py-3">{content}</div>;
}

function Toggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex h-11 w-16 items-center rounded-full px-1 transition ${
        enabled ? "bg-teal-600" : "bg-slate-200"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`h-9 w-9 rounded-full bg-white shadow transition ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function AccountSettingsCard() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <section className="rounded-[2.3rem] bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.24)]">
      <h3 className="text-[1.8rem] font-medium tracking-tight text-slate-500">
        Account Settings
      </h3>

      <div className="mt-6 space-y-2">
        <SettingRow
          icon={<BellIcon />}
          title="Notifications"
          subtitle="Meal reminders & AI alerts"
          trailing={
            <Toggle
              enabled={notificationsEnabled}
              onToggle={() => setNotificationsEnabled((current) => !current)}
            />
          }
        />

        <SettingRow
          icon={<LockIcon />}
          title="Privacy & Data"
          subtitle="Manage your health data"
          trailing={<span className="text-4xl text-slate-400">›</span>}
        />

        <SettingRow
          icon={<RulerIcon />}
          title="Measurement Units"
          subtitle="Grams, oz, calories"
          trailing={<span className="text-[1.9rem] font-medium text-teal-600">Metric</span>}
        />
      </div>
    </section>
  );
}

export function ProfileScreen({
  userName,
  userEmail,
  userImage,
  initialHealthContexts = [],
}) {
  const [healthContexts, setHealthContexts] = useState(initialHealthContexts);
  const [healthContextMessage, setHealthContextMessage] = useState("");
  const [isSavingHealthContexts, setIsSavingHealthContexts] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const updateHealthContexts = async (nextContexts) => {
    const previousHealthContexts = healthContexts;

    setHealthContexts(nextContexts);
    setHealthContextMessage("");
    setIsSavingHealthContexts(true);

    try {
      const response = await fetch("/api/health-contexts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          healthContexts: nextContexts,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload.message || "We couldn't update your health contexts right now."
        );
      }

      setHealthContexts(payload.healthContexts || nextContexts);
      setHealthContextMessage("Health contexts updated for future meal analysis.");
    } catch (error) {
      setHealthContexts(previousHealthContexts);
      setHealthContextMessage(
        error instanceof Error
          ? error.message
          : "We couldn't update your health contexts right now."
      );
    } finally {
      setIsSavingHealthContexts(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7fb_0%,#eef2f9_100%)] text-slate-900">
        <MobileTopBar userName={userName} userImage={userImage} />

        <main className="mx-auto flex w-full max-w-xl flex-col gap-7 px-4 py-8 sm:px-6">
          <ProfileAvatarCard
            userName={userName}
            userEmail={userEmail}
            userImage={userImage}
          />

          <HealthFocusCard
            healthContexts={healthContexts}
            saving={isSavingHealthContexts}
            onHealthContextsChange={updateHealthContexts}
            message={healthContextMessage}
          />

          <AccountSettingsCard />

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="mx-6 inline-flex h-20 items-center justify-center gap-3 rounded-[1.8rem] border border-rose-200 bg-white text-[1.8rem] font-medium text-rose-600 shadow-[0_18px_40px_-30px_rgba(244,63,94,0.28)] transition hover:bg-rose-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
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
            Logout
          </button>

          <p className="pb-6 text-center text-[1.05rem] italic text-slate-400">
            Version 2.4.0 (AI Engine: Healthy-V1)
          </p>
        </main>

        <MobileBottomNav active="profile" />
      </div>

      <LogoutConfirmDialog
        open={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={() => signOut({ callbackUrl: "/login" })}
      />
    </>
  );
}

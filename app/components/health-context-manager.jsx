"use client";

import { useMemo, useState } from "react";

import {
  HEALTH_CONTEXT_OPTIONS,
  dedupeHealthContexts,
  normalizeHealthContext,
} from "@/lib/health-contexts";

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2 5 5v6c0 5 3.4 9.7 7 11 3.6-1.3 7-6 7-11V5l-7-3Zm1 12h-2v-2H9v-2h2V8h2v2h2v2h-2v2Z" />
    </svg>
  );
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  confirmTone = "bg-teal-600 hover:bg-teal-700",
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_-32px_rgba(15,23,42,0.45)]">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-500">{message}</p>

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
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${confirmTone}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HealthContextManager({
  contexts,
  onChange,
  saving = false,
  helperText,
}) {
  const [query, setQuery] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [pendingAction, setPendingAction] = useState(null);

  const filteredOptions = useMemo(() => {
    const selectedSet = new Set(contexts.map((item) => item.toLowerCase()));

    return HEALTH_CONTEXT_OPTIONS.filter((option) => {
      if (selectedSet.has(option.toLowerCase())) {
        return false;
      }

      if (!query.trim()) {
        return true;
      }

      return option.toLowerCase().includes(query.trim().toLowerCase());
    }).slice(0, 18);
  }, [contexts, query]);

  const closeDialog = () => setPendingAction(null);

  const requestAddContext = (value) => {
    const normalized = normalizeHealthContext(value);

    if (!normalized) {
      return;
    }

    setPendingAction({
      type: "add",
      value: normalized,
    });
  };

  const requestRemoveContext = (value) => {
    setPendingAction({
      type: "remove",
      value,
    });
  };

  const confirmPendingAction = () => {
    if (!pendingAction) {
      return;
    }

    if (pendingAction.type === "add") {
      onChange(dedupeHealthContexts([...contexts, pendingAction.value]));
      setCustomValue("");
      setQuery("");
      closeDialog();
      return;
    }

    const nextValues = contexts.filter(
      (item) => item.toLowerCase() !== pendingAction.value.toLowerCase()
    );

    onChange(nextValues);
    closeDialog();
  };

  const dialogTitle =
    pendingAction?.type === "add"
      ? "Add health context?"
      : "Remove health context?";
  const dialogMessage =
    pendingAction?.type === "add"
      ? `"${pendingAction.value}" will become part of the active health context used for future meal analysis.`
      : `"${pendingAction?.value}" will be removed from the active health context for future scans. Past saved scans will keep the context that was active at that time.`;

  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-teal-700">
            <ShieldIcon />
          </div>
          <h2 className="text-[15px] font-medium">Your Health Context</h2>
        </div>

        <div className="rounded-[1.8rem] bg-white p-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.22)] ring-1 ring-slate-200">
          <div className="flex flex-wrap gap-2">
            {contexts.map((context) => (
              <span
                key={context}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-teal-700"
              >
                {context}
                <button
                  type="button"
                  onClick={() => requestRemoveContext(context)}
                  className="text-base leading-none text-teal-500 transition hover:text-rose-500"
                  aria-label={`Remove ${context}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search health contexts"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-teal-300 focus:ring-4 focus:ring-teal-100"
            />

            <div className="max-h-52 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-2">
              <div className="grid gap-2 sm:grid-cols-2">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => requestAddContext(option)}
                      className="rounded-2xl bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-teal-700"
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-4 text-sm text-slate-400 sm:col-span-2">
                    No matching preset found. Add your own below.
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <input
                value={customValue}
                onChange={(event) => setCustomValue(event.target.value)}
                placeholder="Add custom condition or status"
                className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-teal-300 focus:ring-4 focus:ring-teal-100"
              />
              <button
                type="button"
                onClick={() => requestAddContext(customValue)}
                disabled={saving}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-teal-600 px-5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-teal-300"
              >
                Add
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            {helperText ||
              "Pick multiple active health contexts. Add your own if needed, and remove one later when it no longer applies."}
          </p>
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(pendingAction)}
        title={dialogTitle}
        message={dialogMessage}
        confirmLabel={pendingAction?.type === "add" ? "Confirm Add" : "Confirm Remove"}
        confirmTone={
          pendingAction?.type === "add"
            ? "bg-teal-600 hover:bg-teal-700"
            : "bg-rose-600 hover:bg-rose-700"
        }
        onConfirm={confirmPendingAction}
        onCancel={closeDialog}
      />
    </>
  );
}

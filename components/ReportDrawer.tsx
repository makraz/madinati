"use client";

import { useState } from "react";
import { Camera, CheckCircle2, MapPin, Send, X } from "lucide-react";
import { CATEGORIES, CATEGORY_LIST } from "@/lib/categories";
import { EXAMPLE_PHOTOS } from "@/lib/examplePhotos";
import { useLoc, useT } from "@/lib/hooks";
import { LANDMARKS } from "@/lib/landmarks";
import { useStore } from "@/lib/store";

export default function ReportDrawer() {
  const t = useT();
  const L = useLoc();
  const draft = useStore((s) => s.draft);
  const setDraft = useStore((s) => s.setDraft);
  const submitIssue = useStore((s) => s.submitIssue);
  const closeReport = useStore((s) => s.closeReport);
  const [error, setError] = useState(false);

  const landmark = LANDMARKS.find((l) => l.id === draft.landmarkId) ?? LANDMARKS[0];
  const canSubmit = draft.description.trim().length >= 5;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      setError(true);
      return;
    }
    setError(false);
    submitIssue();
  };

  return (
    <aside className="panel-scroll absolute bottom-4 right-4 top-4 z-20 flex w-[400px] flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{t("reportTitle")}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">{t("reportSubtitle")}</p>
        </div>
        <button
          onClick={closeReport}
          className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="panel-scroll flex flex-col gap-4 overflow-y-auto p-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t("stepWhere")}
            </label>
            <select
              value={draft.landmarkId}
              onChange={(e) => setDraft({ landmarkId: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {LANDMARKS.map((l) => (
                <option key={l.id} value={l.id}>
                  {L(l.name)}
                </option>
              ))}
            </select>
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={12} />
              {t("locConfirmed", {
                name: L(landmark.name),
                lat: landmark.lat.toFixed(4),
                lng: landmark.lng.toFixed(4),
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t("stepCat")}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_LIST.map((c) => {
                const cat = CATEGORIES[c];
                const active = draft.category === c;
                return (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setDraft({ category: c })}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                      active
                        ? "border-orange-600 bg-orange-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    <cat.Icon size={13} />
                    {L(cat.label)}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Camera size={12} /> {t("stepPhoto")}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {EXAMPLE_PHOTOS.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setDraft({ photoId: p.id })}
                  className={`overflow-hidden rounded-lg border-2 text-start transition ${
                    draft.photoId === p.id
                      ? "border-orange-600 ring-2 ring-orange-100 dark:ring-orange-500/30"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <img src={p.src} alt={L(p.label)} className="h-16 w-full object-cover" />
                  <div className="px-1.5 py-1 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                    {L(p.label)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t("stepDesc")}
            </label>
            <textarea
              value={draft.description}
              onChange={(e) => {
                setDraft({ description: e.target.value });
                if (error) setError(false);
              }}
              rows={4}
              placeholder={t("descPlaceholder")}
              className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 dark:text-slate-100 ${
                error
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100 dark:border-red-500/60"
                  : "border-slate-200 focus:border-orange-400 focus:ring-orange-100 dark:border-slate-700 dark:bg-slate-800"
              }`}
            />
            {error && <p className="mt-1 text-[11px] font-semibold text-red-500">{t("descError")}</p>}
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2.5 text-[10px] leading-snug text-slate-400 dark:bg-slate-800/70 dark:text-slate-500">
            <MapPin size={12} className="shrink-0" />
            {t("demoNote")}
          </div>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4 dark:border-slate-800">
          <button
            type="submit"
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
              canSubmit
                ? "bg-orange-600 text-white shadow-sm hover:bg-orange-700"
                : "bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700"
            }`}
          >
            <Send size={15} />
            {t("submit")}
          </button>
        </div>
      </form>
    </aside>
  );
}

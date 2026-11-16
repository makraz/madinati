"use client";

import { Landmark, Moon, Plus, RotateCcw, Sun, CircleHelp } from "lucide-react";
import { LANGS } from "@/lib/i18n";
import { useT } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import type { Lang } from "@/lib/types";

export default function TopBar() {
  const t = useT();
  const lang = useStore((s) => s.lang);
  const theme = useStore((s) => s.theme);
  const openReport = useStore((s) => s.openReport);
  const reset = useStore((s) => s.reset);
  const setLang = useStore((s) => s.setLang);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const openOnboarding = useStore((s) => s.openOnboarding);

  return (
    <header className="z-30 flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-orange-600 text-white">
          <Landmark size={19} />
        </div>
        <div className="leading-tight">
          <div className="text-[17px] font-bold tracking-tight text-slate-900 dark:text-white">
            Madinati
          </div>
          <div className="-mt-0.5 hidden text-[10px] font-medium text-slate-400 dark:text-slate-500 min-[420px]:block">
            {t("tagline")}
          </div>
        </div>
      </div>

      <span className="ml-3 hidden rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 sm:block">
        {t("badge")}
      </span>

      <div className="flex-1" />

      {/* Sélecteur de langue */}
      <div className="flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code as Lang)}
            className={`px-2.5 py-1.5 text-[11px] font-bold transition ${
              lang === l.code
                ? "bg-orange-600 text-white"
                : "bg-white text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Aide / onboarding */}
      <button
        onClick={openOnboarding}
        title={t("help")}
        className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        <CircleHelp size={16} />
      </button>

      {/* Dark mode */}
      <button
        onClick={toggleTheme}
        title="Dark mode"
        className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-amber-300 dark:hover:bg-slate-800"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <button
        onClick={reset}
        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 sm:px-3"
        title={t("reset")}
      >
        <RotateCcw size={14} />
        <span className="hidden sm:inline">{t("reset")}</span>
      </button>
      <button
        onClick={openReport}
        className="flex items-center gap-1.5 rounded-lg bg-orange-600 px-2.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-orange-700 sm:px-3.5"
      >
        <Plus size={16} strokeWidth={3} />
        <span className="hidden sm:inline">{t("reportFab")}</span>
      </button>
    </header>
  );
}

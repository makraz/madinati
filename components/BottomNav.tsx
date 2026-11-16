"use client";

import { Lightbulb, Map as MapIcon, Plus } from "lucide-react";
import { useT } from "@/lib/hooks";
import { useStore } from "@/lib/store";

// Barre de navigation mobile (en bas), remplacée par la sidebar sur desktop
export default function BottomNav() {
  const t = useT();
  const view = useStore((s) => s.view);
  const setView = useStore((s) => s.setView);
  const openReport = useStore((s) => s.openReport);
  const nProposals = useStore((s) => s.proposals.length);

  const base = "flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-bold";
  const active = "text-orange-600 dark:text-orange-400";
  const idle = "text-slate-500 dark:text-slate-400";

  return (
    <nav
      className="z-30 flex h-16 shrink-0 items-stretch border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <button className={`${base} ${view === "map" ? active : idle}`} onClick={() => setView("map")}>
        <MapIcon size={20} />
        {t("navMap")}
      </button>

      <button
        className="relative flex flex-1 flex-col items-center justify-center"
        onClick={openReport}
        aria-label={t("reportFab")}
      >
        <span className="grid h-12 w-12 -translate-y-4 place-items-center rounded-full bg-orange-600 text-white shadow-lg shadow-orange-600/30 transition active:scale-95">
          <Plus size={24} strokeWidth={3} />
        </span>
        <span className="-mt-3 text-[10px] font-bold text-slate-500 dark:text-slate-400">
          {t("reportFab")}
        </span>
      </button>

      <button
        className={`${base} ${view === "proposals" ? active : idle}`}
        onClick={() => setView("proposals")}
      >
        <span className="relative">
          <Lightbulb size={20} />
          <span className="absolute -right-2.5 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-purple-600 px-1 text-[9px] font-bold text-white">
            {nProposals}
          </span>
        </span>
        {t("navProposals")}
      </button>
    </nav>
  );
}

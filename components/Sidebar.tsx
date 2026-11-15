"use client";

import { Lightbulb, Map as MapIcon } from "lucide-react";
import { useT } from "@/lib/hooks";
import { useStore } from "@/lib/store";

export default function Sidebar() {
  const t = useT();
  const view = useStore((s) => s.view);
  const setView = useStore((s) => s.setView);
  const nIssues = useStore((s) => s.issues.length);
  const nProposals = useStore((s) => s.proposals.length);
  const nProjects = useStore((s) => s.projects.length);

  const item =
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition";
  const active = "bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300";
  const idle = "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800";

  return (
    <aside className="z-20 flex w-52 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <nav className="flex flex-col gap-1 p-3">
        <button className={`${item} ${view === "map" ? active : idle}`} onClick={() => setView("map")}>
          <MapIcon size={17} />
          {t("navMap")}
        </button>
        <button
          className={`${item} ${view === "proposals" ? active : idle}`}
          onClick={() => setView("proposals")}
        >
          <Lightbulb size={17} />
          {t("navProposals")}
          <span className="ms-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {nProposals}
          </span>
        </button>
      </nav>

      <div className="mx-3 rounded-xl bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
        <div className="mb-1.5 font-bold text-slate-600 dark:text-slate-300">{t("legend")}</div>
        <div className="flex items-center gap-2 py-0.5">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-white bg-orange-500 shadow" />
          {t("legendIssue")} ({nIssues})
        </div>
        <div className="flex items-center gap-2 py-0.5">
          <span className="h-3.5 w-3.5 rotate-45 rounded-[4px] border-2 border-white bg-purple-600 shadow" />
          {t("legendProposal")} ({nProposals})
        </div>
        <div className="flex items-center gap-2 py-0.5">
          <span className="h-3.5 w-3.5 rounded-[4px] border-2 border-white bg-blue-600 shadow" />
          {t("legendProject")} ({nProjects})
        </div>
      </div>

      <div className="mt-auto p-3 text-[10px] leading-relaxed text-slate-400 dark:text-slate-500">
        {t("sidebarNote")}
      </div>
    </aside>
  );
}

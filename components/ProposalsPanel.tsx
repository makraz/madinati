"use client";

import { Lightbulb, MapPin, ThumbsUp, X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { useLoc, useT } from "@/lib/hooks";
import { landmarkName } from "@/lib/landmarks";
import { useStore } from "@/lib/store";

export default function ProposalsPanel() {
  const t = useT();
  const L = useLoc();
  const lang = useStore((s) => s.lang);
  const proposals = useStore((s) => s.proposals);
  const setView = useStore((s) => s.setView);
  const toggleVote = useStore((s) => s.toggleVote);
  const openDetails = useStore((s) => s.openDetails);

  const sorted = [...proposals].sort((a, b) => b.votes - a.votes);

  return (
    <aside className="panel-scroll absolute bottom-4 right-4 top-4 z-10 flex w-[380px] flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{t("propsTitle")}</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">{t("propsSubtitle")}</p>
        </div>
        <button
          onClick={() => setView("map")}
          className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {sorted.map((p) => {
          const cat = CATEGORIES[p.category];
          return (
            <div
              key={p.id}
              className="cursor-pointer rounded-xl border border-slate-200 p-3.5 transition hover:border-purple-300 hover:shadow-md dark:border-slate-700 dark:hover:border-purple-500/50"
              onClick={() => openDetails("proposal", p.id)}
            >
              <div className="flex items-start gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                  <Lightbulb size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${cat.chip}`}>
                      {L(cat.label)}
                    </span>
                    {p.status === "retenue" && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                        {t("status.retenue")}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-sm font-bold leading-snug text-slate-900 dark:text-white">
                    {L(p.title)}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {L(p.description)}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                    <MapPin size={11} /> {landmarkName(p.landmarkId, lang)} · {t("by")} {p.author}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVote(p.id);
                }}
                className={`mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition ${
                  p.votedByMe
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <ThumbsUp size={14} />
                {p.votedByMe ? t("voteRecorded") : t("vote")} · {p.votes} {t("votes")}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

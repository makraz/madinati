"use client";

import { MapPin, ThumbsUp, Vote, HardHat } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { useLoc, useT } from "@/lib/hooks";
import { landmarkName } from "@/lib/landmarks";
import { useStore } from "@/lib/store";
import type { Issue, MarkerType, Project, Proposal } from "@/lib/types";

const issueStatusKey = {
  ouvert: "status.ouvert",
  "en-cours": "status.en-cours",
  resolu: "status.resolu",
} as const;
const projectStatusKey = {
  planifie: "status.planifie",
  "en-cours": "status.en-cours",
  termine: "status.termine",
} as const;

export default function PopupCard({
  type,
  item,
}: {
  type: MarkerType;
  item: Issue | Proposal | Project;
}) {
  const t = useT();
  const L = useLoc();
  const lang = useStore((s) => s.lang);
  const openDetails = useStore((s) => s.openDetails);
  const cat = CATEGORIES[item.category];
  const lm = landmarkName(item.landmarkId, lang);

  return (
    <div className="w-[270px] text-slate-900 dark:text-slate-100">
      {type === "issue" && (item as Issue).photo && (
        <img src={(item as Issue).photo} alt="" className="h-28 w-full object-cover" />
      )}
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${cat.chip}`}>
            {L(cat.label)}
          </span>
          {type === "issue" && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {t(issueStatusKey[(item as Issue).status])}
            </span>
          )}
          {type === "project" && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {t(projectStatusKey[(item as Project).status])}
            </span>
          )}
          {type === "issue" && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-500 dark:bg-slate-700 dark:text-slate-300">
              {(item as Issue).ref}
            </span>
          )}
        </div>

        <div className="text-[13px] font-bold leading-snug">{L(item.title)}</div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
          <MapPin size={11} className="shrink-0" /> {lm}
        </div>
        <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
          {L(item.description)}
        </p>

        {type === "project" && (
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className={`h-full rounded-full ${(item as Project).status === "termine" ? "bg-emerald-500" : "bg-blue-600"}`}
              style={{ width: `${(item as Project).progress}%` }}
            />
          </div>
        )}

        <div className="mt-1 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            {type === "issue" && (
              <>
                <ThumbsUp size={11} /> {(item as Issue).upvotes}
              </>
            )}
            {type === "proposal" && (
              <>
                <Vote size={11} /> {(item as Proposal).votes} {t("votes")}
              </>
            )}
            {type === "project" && (
              <>
                <HardHat size={11} /> {(item as Project).progress}%
              </>
            )}
          </span>
          <button
            onClick={() => openDetails(type, item.id)}
            className="rounded-lg bg-orange-600 px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-orange-700"
          >
            {t("details")} →
          </button>
        </div>
      </div>
    </div>
  );
}

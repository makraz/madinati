"use client";

import { CalendarDays, CheckCircle2, Clock, Coins, MapPin, ThumbsUp, Vote, X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { useLoc, useT } from "@/lib/hooks";
import { landmarkName } from "@/lib/landmarks";
import { useStore } from "@/lib/store";
import type { IssueStatus, ProjectStatus } from "@/lib/types";

const issueStatusBadge: Record<IssueStatus, { key: string; cls: string }> = {
  ouvert: { key: "status.ouvert", cls: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300" },
  "en-cours": { key: "status.en-cours", cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" },
  resolu: { key: "status.resolu", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" },
};

const projectStatusBadge: Record<ProjectStatus, { key: string; cls: string }> = {
  planifie: { key: "status.planifie", cls: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300" },
  "en-cours": { key: "status.en-cours", cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300" },
  termine: { key: "status.termine", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" },
};

export default function DetailPanel() {
  const t = useT();
  const L = useLoc();
  const lang = useStore((s) => s.lang);
  const selected = useStore((s) => s.selected);
  const clearSelection = useStore((s) => s.clearSelection);
  const issues = useStore((s) => s.issues);
  const proposals = useStore((s) => s.proposals);
  const projects = useStore((s) => s.projects);
  const toggleSupport = useStore((s) => s.toggleSupport);
  const toggleVote = useStore((s) => s.toggleVote);
  const simulateUpdate = useStore((s) => s.simulateUpdate);

  if (!selected) return null;

  const issue = selected.type === "issue" ? issues.find((i) => i.id === selected.id) : null;
  const proposal = selected.type === "proposal" ? proposals.find((p) => p.id === selected.id) : null;
  const project = selected.type === "project" ? projects.find((p) => p.id === selected.id) : null;

  if (!issue && !proposal && !project) return null;

  const cat = CATEGORIES[(issue ?? proposal ?? project)!.category];
  const lm = landmarkName((issue ?? proposal ?? project)!.landmarkId, lang);
  const reporter = issue ? (issue.reporter === "you" ? t("you") : issue.reporter) : "";

  return (
    <aside className="panel-scroll absolute inset-x-0 bottom-0 z-10 flex max-h-[75dvh] w-full flex-col overflow-y-auto rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:top-4 sm:max-h-none sm:w-[380px] sm:rounded-2xl">
      <div className="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 sm:hidden" />
      <button
        onClick={clearSelection}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-slate-500 shadow hover:text-slate-900 dark:bg-slate-800/90 dark:text-slate-400 dark:hover:text-white"
      >
        <X size={16} />
      </button>

      {issue && (
        <>
          {issue.photo && (
            <img src={issue.photo} alt="" className="h-44 w-full shrink-0 object-cover" />
          )}
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-wrap items-center gap-2 pe-8">
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${cat.chip}`}>
                {L(cat.label)}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${issueStatusBadge[issue.status].cls}`}
              >
                {t(issueStatusBadge[issue.status].key)}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {issue.ref}
              </span>
            </div>
            <h2 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
              {L(issue.title)}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <MapPin size={13} /> {lm}
              <span className="mx-1">·</span>
              <CalendarDays size={13} /> {issue.createdAt} · {t("by")} {reporter}
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {L(issue.description)}
            </p>

            <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3 dark:border-slate-800">
              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {t("history")}
              </div>
              {issue.updates.map((u, idx) => (
                <div key={idx} className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock size={13} className="mt-0.5 shrink-0 text-slate-300 dark:text-slate-600" />
                  <span>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">{u.date}</span> —{" "}
                    {L(u.text)}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => toggleSupport(issue.id)}
              className={`mt-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                issue.supportedByMe
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <ThumbsUp size={16} />
              {issue.supportedByMe ? t("supported") : t("support")} · {issue.upvotes}
            </button>
          </div>
        </>
      )}

      {proposal && (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-2 pe-8">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
              <cat.Icon size={17} />
            </span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${cat.chip}`}>
              {L(cat.label)}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                proposal.status === "retenue"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {t(proposal.status === "retenue" ? "status.retenue" : "status.proposee")}
            </span>
          </div>
          <h2 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
            {L(proposal.title)}
          </h2>
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin size={13} /> {lm}
            <span className="mx-1">·</span> {t("by")} {proposal.author} · {proposal.createdAt}
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {L(proposal.description)}
          </p>
          <button
            onClick={() => toggleVote(proposal.id)}
            className={`mt-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              proposal.votedByMe
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <Vote size={16} />
            {proposal.votedByMe ? t("voteRecorded") : t("voteFor")} · {proposal.votes}
          </button>
        </div>
      )}

      {project && (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-wrap items-center gap-2 pe-8">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
              <cat.Icon size={17} />
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${projectStatusBadge[project.status].cls}`}
            >
              {t(projectStatusBadge[project.status].key)}
            </span>
          </div>
          <h2 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
            {L(project.title)}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin size={13} /> {lm}
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {L(project.description)}
          </p>

          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Coins size={13} /> {project.budget}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} /> {project.startDate} → {project.endDate}
            </span>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>{t("progress")}</span>
              <span className="text-slate-800 dark:text-slate-100">{project.progress}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  project.status === "termine" ? "bg-emerald-500" : "bg-blue-600"
                }`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-0 border-t border-slate-100 pt-3 dark:border-slate-800">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {t("milestones")}
            </div>
            {project.milestones.map((m, idx) => (
              <div key={idx} className="relative flex gap-3 pb-3 pl-1 last:pb-0">
                {idx < project.milestones.length - 1 && (
                  <span className="absolute left-[9px] top-5 h-full w-0.5 bg-slate-200 dark:bg-slate-700" />
                )}
                <span
                  className={`z-10 mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-2 ${
                    m.done
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-slate-300 bg-white text-transparent dark:border-slate-600 dark:bg-slate-800"
                  }`}
                >
                  <CheckCircle2 size={11} />
                </span>
                <span className="text-xs leading-snug">
                  <span
                    className={`block font-semibold ${m.done ? "text-slate-800 dark:text-slate-100" : "text-slate-600 dark:text-slate-300"}`}
                  >
                    {L(m.label)}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">{m.date}</span>
                </span>
              </div>
            ))}
          </div>

          {project.status === "en-cours" && (
            <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-3 dark:border-amber-500/40 dark:bg-amber-500/10">
              <button
                onClick={() => simulateUpdate(project.id)}
                className="w-full rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-600"
              >
                {t("simulateBtn")}
              </button>
              <p className="mt-1.5 text-[10px] leading-snug text-amber-700 dark:text-amber-300">
                {t("simulateNote")}
              </p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

"use client";

import { useState } from "react";
import { Landmark, Map as MapIcon, Plus, Vote, X } from "lucide-react";
import { useT } from "@/lib/hooks";
import { useStore } from "@/lib/store";

const STEPS = [
  { icon: MapIcon, titleKey: "onb1t", descKey: "onb1d", color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300" },
  { icon: Plus, titleKey: "onb2t", descKey: "onb2d", color: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300" },
  { icon: Vote, titleKey: "onb3t", descKey: "onb3d", color: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300" },
];

export default function Onboarding() {
  const t = useT();
  const closeOnboarding = useStore((s) => s.closeOnboarding);
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const Icon = s.icon;
  const last = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <button
          onClick={closeOnboarding}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X size={16} />
        </button>

        <div className="mb-6 flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-white">
            <Landmark size={20} />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">Madinati</div>
            <div className="text-[11px] font-medium text-slate-400">{t("tagline")}</div>
          </div>
        </div>

        <div className={`mb-4 grid h-16 w-16 place-items-center rounded-2xl ${s.color}`}>
          <Icon size={28} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t(s.titleKey)}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {t(s.descKey)}
        </p>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-orange-600" : "w-1.5 bg-slate-200 dark:bg-slate-700"}`}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={closeOnboarding}
            className="rounded-lg px-3 py-2 text-xs font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            {t("onbSkip")}
          </button>
          <button
            onClick={() => (last ? closeOnboarding() : setStep(step + 1))}
            className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700"
          >
            {last ? t("onbStart") : t("onbNext")}
          </button>
        </div>

        <p className="mt-4 text-center text-[10px] text-slate-400 dark:text-slate-500">{t("badge")}</p>
      </div>
    </div>
  );
}

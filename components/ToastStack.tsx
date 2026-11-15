"use client";

import { CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ToastStack() {
  const toasts = useStore((s) => s.toasts);
  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-xl dark:bg-slate-100 dark:text-slate-900"
        >
          <CheckCircle2 size={16} className="shrink-0 text-emerald-400 dark:text-emerald-600" />
          {t.msg}
        </div>
      ))}
    </div>
  );
}

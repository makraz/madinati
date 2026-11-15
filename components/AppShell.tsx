"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import DetailPanel from "@/components/DetailPanel";
import Onboarding from "@/components/Onboarding";
import ProposalsPanel from "@/components/ProposalsPanel";
import ReportDrawer from "@/components/ReportDrawer";
import Sidebar from "@/components/Sidebar";
import ToastStack from "@/components/ToastStack";
import TopBar from "@/components/TopBar";
import { useT } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import type { Lang } from "@/lib/types";

// Leaflet ne supporte pas le SSR : chargement client uniquement
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 grid place-items-center bg-slate-200 dark:bg-slate-800">
      <span className="text-sm font-semibold text-slate-400">Chargement de la carte…</span>
    </div>
  ),
});

export default function AppShell() {
  const t = useT();
  const view = useStore((s) => s.view);
  const selected = useStore((s) => s.selected);
  const reportOpen = useStore((s) => s.reportOpen);
  const showOnboarding = useStore((s) => s.showOnboarding);

  // Restaure les préférences persistées (langue, thème, onboarding déjà vu)
  useEffect(() => {
    const lang = (localStorage.getItem("madinati:lang") as Lang) || "fr";
    const theme = (localStorage.getItem("madinati:theme") as "light" | "dark") || "light";
    const onboarded = localStorage.getItem("madinati:onboarded") === "1";
    useStore.getState().initPrefs(lang, theme, onboarded);
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100 dark:bg-slate-950">
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="relative min-w-0 flex-1">
          <MapView />
          {view === "proposals" ? <ProposalsPanel /> : selected ? <DetailPanel /> : null}
          {reportOpen && <ReportDrawer />}
          <ToastStack />
        </main>
      </div>
      <footer className="z-30 flex h-6 shrink-0 items-center justify-center border-t border-slate-200 bg-white text-[10px] font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500">
        {t("footer")}
      </footer>
      {showOnboarding && <Onboarding />}
    </div>
  );
}

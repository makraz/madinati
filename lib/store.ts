import { create } from "zustand";
import { CATEGORIES } from "./categories";
import { EXAMPLE_PHOTOS } from "./examplePhotos";
import { tr } from "./i18n";
import { LANDMARKS } from "./landmarks";
import { initialIssues, initialProposals, initialProjects } from "./mock";
import type { Draft, Issue, Lang, MarkerType, Project, Selected, Toast, View } from "./types";

let toastId = 0;

const defaultDraft = (): Draft => ({
  landmarkId: LANDMARKS[2].id, // Bab Doukkala, Médina (chemin de démo)
  category: "eclairage",
  description: "",
  photoId: EXAMPLE_PHOTOS[1].id,
});

const applyDomPrefs = (lang: Lang, theme: "light" | "dark") => {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.classList.toggle("dark", theme === "dark");
};

interface Store {
  issues: Issue[];
  proposals: import("./types").Proposal[];
  projects: Project[];
  selected: Selected | null;
  view: View;
  reportOpen: boolean;
  draft: Draft;
  toasts: Toast[];

  // préférences
  lang: Lang;
  theme: "light" | "dark";
  onboarded: boolean;
  showOnboarding: boolean;
  resetCount: number;

  initPrefs: (lang: Lang, theme: "light" | "dark", onboarded: boolean) => void;
  setLang: (lang: Lang) => void;
  toggleTheme: () => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;

  openDetails: (type: MarkerType, id: string) => void;
  clearSelection: () => void;
  setView: (view: View) => void;
  openReport: () => void;
  closeReport: () => void;
  setDraft: (patch: Partial<Draft>) => void;
  submitIssue: () => void;
  toggleSupport: (id: string) => void;
  toggleVote: (id: string) => void;
  simulateUpdate: (id: string) => void;
  reset: () => void;
  toast: (msg: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  issues: initialIssues(),
  proposals: initialProposals(),
  projects: initialProjects(),
  selected: null,
  view: "map",
  reportOpen: false,
  draft: defaultDraft(),
  toasts: [],

  lang: "fr",
  theme: "light",
  onboarded: false,
  showOnboarding: false,
  resetCount: 0,

  initPrefs: (lang, theme, onboarded) => {
    applyDomPrefs(lang, theme);
    set({ lang, theme, onboarded, showOnboarding: !onboarded });
  },
  setLang: (lang) => {
    localStorage.setItem("madinati:lang", lang);
    applyDomPrefs(lang, get().theme);
    set({ lang });
  },
  toggleTheme: () => {
    const theme = get().theme === "dark" ? "light" : "dark";
    localStorage.setItem("madinati:theme", theme);
    applyDomPrefs(get().lang, theme);
    set({ theme });
  },
  openOnboarding: () => set({ showOnboarding: true }),
  closeOnboarding: () => {
    localStorage.setItem("madinati:onboarded", "1");
    set({ showOnboarding: false, onboarded: true });
  },

  openDetails: (type, id) => set({ selected: { type, id }, view: "map" }),
  clearSelection: () => set({ selected: null }),
  setView: (view) => set({ view }),
  openReport: () => set({ reportOpen: true }),
  closeReport: () => set({ reportOpen: false }),
  setDraft: (patch) => set({ draft: { ...get().draft, ...patch } }),

  toast: (msg) => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts, { id, msg }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 4500);
  },

  submitIssue: () => {
    const { draft, issues, lang } = get();
    const desc = draft.description.trim();
    if (desc.length < 5) return; // validation côté composant (message inline)
    const lm = LANDMARKS.find((l) => l.id === draft.landmarkId) ?? LANDMARKS[0];
    const photo = EXAMPLE_PHOTOS.find((p) => p.id === draft.photoId)?.src ?? "";
    const ref = `MRK-${Math.floor(10000 + Math.random() * 89999)}`;
    const catLabel = CATEGORIES[draft.category].label;
    const issue: Issue = {
      id: `i${Date.now()}`,
      ref,
      title: {
        fr: `${catLabel.fr} — ${lm.name.fr}`,
        en: `${catLabel.en} — ${lm.name.en}`,
        ar: `${catLabel.ar} — ${lm.name.ar}`,
      },
      description: { fr: desc, en: desc, ar: desc },
      category: draft.category,
      status: "ouvert",
      lat: lm.lat,
      lng: lm.lng,
      landmarkId: lm.id,
      photo,
      upvotes: 1,
      supportedByMe: true,
      reporter: "you",
      createdAt: "15 nov. 2026",
      updates: [
        {
          date: "15 nov. 2026",
          text: { fr: "Signalement créé (démo).", en: "Report created (demo).", ar: "تم إنشاء البلاغ (تجريبي)." },
        },
      ],
    };
    set({
      issues: [issue, ...issues],
      reportOpen: false,
      view: "map",
      selected: { type: "issue", id: issue.id },
      draft: defaultDraft(),
    });
    get().toast(tr(lang, "toastSubmitted", { ref }));
  },

  toggleSupport: (id) =>
    set((s) => ({
      issues: s.issues.map((i) =>
        i.id === id
          ? { ...i, upvotes: i.upvotes + (i.supportedByMe ? -1 : 1), supportedByMe: !i.supportedByMe }
          : i
      ),
    })),

  toggleVote: (id) =>
    set((s) => ({
      proposals: s.proposals.map((p) =>
        p.id === id
          ? { ...p, votes: p.votes + (p.votedByMe ? -1 : 1), votedByMe: !p.votedByMe }
          : p
      ),
    })),

  simulateUpdate: (id) => {
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id && p.status === "en-cours"
          ? {
              ...p,
              status: "termine",
              progress: 100,
              milestones: p.milestones.map((m) => ({ ...m, done: true })),
            }
          : p
      ),
    }));
    get().toast(tr(get().lang, "toastSimulated"));
  },

  reset: () =>
    set((s) => ({
      issues: initialIssues(),
      proposals: initialProposals(),
      projects: initialProjects(),
      selected: null,
      view: "map",
      reportOpen: false,
      draft: defaultDraft(),
      toasts: [],
      resetCount: s.resetCount + 1,
    })),
}));

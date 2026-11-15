"use client";

import { loc, tr } from "./i18n";
import { useStore } from "./store";
import type { Lang, Localized } from "./types";

/** Hook de traduction : t("reportFab") -> chaîne localisée */
export function useT() {
  const lang = useStore((s) => s.lang);
  return (key: string, params?: Record<string, string>) => tr(lang, key, params);
}

export function useLang(): Lang {
  return useStore((s) => s.lang);
}

export function useLoc() {
  const lang = useStore((s) => s.lang);
  return (l: Localized) => loc(l, lang);
}

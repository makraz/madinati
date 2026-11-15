import { Cone, Lightbulb, ShieldAlert, Trash2, Trees, type LucideIcon } from "lucide-react";
import type { Category, Localized } from "./types";

export const CATEGORIES: Record<
  Category,
  { label: Localized; Icon: LucideIcon; chip: string; chipDark: string; dot: string }
> = {
  route: {
    label: { fr: "Voirie", en: "Roadworks", ar: "الطرقات" },
    Icon: Cone,
    chip: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
    chipDark: "",
    dot: "bg-orange-500",
  },
  eclairage: {
    label: { fr: "Éclairage public", en: "Public lighting", ar: "الإنارة العمومية" },
    Icon: Lightbulb,
    chip: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
    chipDark: "",
    dot: "bg-yellow-500",
  },
  proprete: {
    label: { fr: "Propreté", en: "Cleanliness", ar: "النظافة" },
    Icon: Trash2,
    chip: "bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300",
    chipDark: "",
    dot: "bg-lime-500",
  },
  "espaces-verts": {
    label: { fr: "Espaces verts", en: "Green spaces", ar: "المساحات الخضراء" },
    Icon: Trees,
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    chipDark: "",
    dot: "bg-emerald-500",
  },
  securite: {
    label: { fr: "Sécurité", en: "Safety", ar: "الأمن" },
    Icon: ShieldAlert,
    chip: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
    chipDark: "",
    dot: "bg-red-500",
  },
};

export const CATEGORY_LIST = Object.keys(CATEGORIES) as Category[];

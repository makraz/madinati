import type { Landmark } from "./types";

// Repères prédéfinis à Marrakech (démo : la localisation se fait via cette liste)
export const LANDMARKS: Landmark[] = [
  {
    id: "jemaa-el-fnaa",
    name: { fr: "Place Jemaa el-Fnaa", en: "Jemaa el-Fnaa Square", ar: "ساحة جامع الفنا" },
    lat: 31.6259,
    lng: -7.9891,
  },
  {
    id: "independance",
    name: {
      fr: "Avenue Mohammed V — Place de l'Indépendance",
      en: "Avenue Mohammed V — Independence Square",
      ar: "شارع محمد الخامس — ساحة الاستقلال",
    },
    lat: 31.6295,
    lng: -7.9889,
  },
  {
    id: "bab-doukkala",
    name: { fr: "Bab Doukkala, Médina", en: "Bab Doukkala, Medina", ar: "باب دكال، المدينة" },
    lat: 31.6328,
    lng: -8.0075,
  },
  {
    id: "guelliz-market",
    name: { fr: "Marché Central, Guéliz", en: "Central Market, Guéliz", ar: "السوق المركزي، جيليز" },
    lat: 31.6342,
    lng: -7.9901,
  },
  {
    id: "mohammed-vi",
    name: { fr: "Boulevard Mohammed VI", en: "Boulevard Mohammed VI", ar: "جادة محمد السادس" },
    lat: 31.6274,
    lng: -7.982,
  },
  {
    id: "hivernage-school",
    name: {
      fr: "Lycée Omar Ibn Khattab, Hivernage",
      en: "Omar Ibn Khattab High School, Hivernage",
      ar: "ثانوية عمر ابن الخطاب، Hivernage",
    },
    lat: 31.6246,
    lng: -7.9536,
  },
  {
    id: "menara",
    name: { fr: "Parc de la Menara", en: "Menara Park", ar: "منتزه المنارة" },
    lat: 31.6183,
    lng: -8.0163,
  },
  {
    id: "gare",
    name: { fr: "Gare de Marrakech", en: "Marrakech Train Station", ar: "محطة قطار مراكش" },
    lat: 31.6266,
    lng: -7.9929,
  },
  {
    id: "koutoubia",
    name: { fr: "Mosquée Koutoubia", en: "Koutoubia Mosque", ar: "مسجد الكتبية" },
    lat: 31.6245,
    lng: -7.9887,
  },
  {
    id: "majorelle",
    name: { fr: "Jardin Majorelle", en: "Majorelle Garden", ar: "حديقة ماجوريل" },
    lat: 31.6373,
    lng: -8.0138,
  },
];

export const landmarkName = (id: string, lang: "fr" | "en" | "ar") =>
  (LANDMARKS.find((l) => l.id === id) ?? LANDMARKS[0]).name[lang];

import type { ExamplePhoto } from "./types";

// Photos d'exemple en SVG inline : aucun accès réseau nécessaire.
const svg = (inner: string, bg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="${bg}"/>${inner}</svg>`
  )}`;

const pothole = svg(
  `<rect y="300" width="640" height="100" fill="#374151"/>
   <rect y="300" width="640" height="8" fill="#4b5563"/>
   <ellipse cx="320" cy="345" rx="95" ry="30" fill="#111827"/>
   <ellipse cx="320" cy="342" rx="70" ry="20" fill="#1f2937"/>
   <path d="M180 340 l40 -12 M460 352 l50 10 M250 320 l30 -16" stroke="#6b7280" stroke-width="5" stroke-linecap="round"/>
   <circle cx="90" cy="70" r="34" fill="#fbbf24" opacity="0.9"/>
   <text x="24" y="380" font-family="sans-serif" font-size="22" fill="#9ca3af">Chaussée dégradée — exemple</text>`,
  "#6b7280"
);

const lamp = svg(
  `<rect width="640" height="400" fill="#0f172a"/>
   <rect x="300" y="120" width="14" height="260" fill="#475569"/>
   <path d="M307 120 q60 -10 80 30" stroke="#475569" stroke-width="12" fill="none"/>
   <circle cx="392" cy="156" r="20" fill="#334155" stroke="#64748b" stroke-width="4"/>
   <path d="M380 150 l24 14 M404 146 l-20 16" stroke="#f87171" stroke-width="4" stroke-linecap="round"/>
   <rect y="380" width="640" height="20" fill="#1e293b"/>
   <text x="24" y="60" font-family="sans-serif" font-size="22" fill="#94a3b8">Lampadaire hors service — exemple</text>`,
  "#0f172a"
);

const litter = svg(
  `<rect width="640" height="400" fill="#d6d3d1"/>
   <rect x="250" y="180" width="140" height="170" rx="10" fill="#78716c"/>
   <rect x="238" y="160" width="164" height="26" rx="8" fill="#57534e"/>
   <ellipse cx="180" cy="350" rx="42" ry="22" fill="#a8a29e"/>
   <ellipse cx="450" cy="352" rx="50" ry="24" fill="#a8a29e"/>
   <ellipse cx="330" cy="362" rx="36" ry="18" fill="#8b8680"/>
   <text x="24" y="60" font-family="sans-serif" font-size="22" fill="#57534e">Poubelles débordantes — exemple</text>`,
  "#d6d3d1"
);

export const EXAMPLE_PHOTOS: ExamplePhoto[] = [
  {
    id: "pothole",
    label: { fr: "Nid-de-poule", en: "Pothole", ar: "حفرة في الطريق" },
    src: pothole,
  },
  {
    id: "lamp",
    label: { fr: "Lampadaire cassé", en: "Broken streetlight", ar: "عمود إنارة مكسور" },
    src: lamp,
  },
  {
    id: "litter",
    label: { fr: "Déchets / propreté", en: "Litter / cleanliness", ar: "قمامة / نظافة" },
    src: litter,
  },
];

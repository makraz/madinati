// Carte 100% locale : tuiles téléchargées dans public/tiles (aucune dépendance réseau en démo)
export const MAP_CENTER: [number, number] = [31.6278, -7.985];
// zone élargie couverte par les tuiles (limite de panoramique) — assez grande pour remplir
// la fenêtre au zoom minimum (évite que Leaflet ne relève le zoom min à cause de maxBounds)
export const MAX_BOUNDS: [[number, number], [number, number]] = [
  [31.565, -8.085],
  [31.695, -7.845],
];
export const TILE_URL = "/tiles/{z}/{x}/{y}.png";
export const MIN_ZOOM = 13;
export const MAX_ZOOM = 16;
export const START_ZOOM = 14;

"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { AlertTriangle, HardHat, Lightbulb, type LucideIcon } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import PopupCard from "@/components/PopupCard";
import { MAP_CENTER, MAX_BOUNDS, MAX_ZOOM, MIN_ZOOM, START_ZOOM, TILE_URL } from "@/lib/mapImage";
import { useStore } from "@/lib/store";
import type { Issue, MarkerType, Project, Proposal } from "@/lib/types";

const ICONS: Record<MarkerType, LucideIcon> = {
  issue: AlertTriangle,
  proposal: Lightbulb,
  project: HardHat,
};

const COLORS: Record<MarkerType, string> = {
  issue: "#ea580c", // orange-600
  proposal: "#9333ea", // purple-600
  project: "#2563eb", // blue-600
};

function makeIcon(type: MarkerType, selected: boolean): L.DivIcon {
  const Icon = ICONS[type];
  const shape =
    type === "issue"
      ? "border-radius:50%;"
      : type === "proposal"
        ? "border-radius:7px;transform:rotate(45deg);"
        : "border-radius:7px;";
  const inner = type === "proposal" ? "transform:rotate(-45deg);" : "";
  const html = `<div class="mk ${selected ? "mk-sel" : ""}" style="background:${COLORS[type]};${shape}"><span style="display:flex;${inner}">${renderToStaticMarkup(
    <Icon size={15} strokeWidth={2.6} color="#ffffff" />
  )}</span></div>`;
  return L.divIcon({ className: `mkpin-${type}`, html, iconSize: [30, 30], iconAnchor: [15, 15] });
}

function ClickAway() {
  useMapEvents({
    click: () => useStore.getState().clearSelection(),
  });
  return null;
}

// La carte vole vers le marqueur sélectionné (ex: nouveau signalement, détails ouverts)
function FlyToSelected() {
  const map = useMap();
  const selected = useStore((s) => s.selected);
  const resetCount = useStore((s) => s.resetCount);
  const issues = useStore((s) => s.issues);
  const proposals = useStore((s) => s.proposals);
  const projects = useStore((s) => s.projects);

  // handle de debug/test
  useEffect(() => {
    (window as unknown as { __map: L.Map }).__map = map;
  }, [map]);

  // après un reset de la démo : fermer les popups et revenir à la vue d'ensemble
  useEffect(() => {
    map.closePopup();
    map.setView(MAP_CENTER, START_ZOOM, { animate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCount, map]);

  useEffect(() => {
    if (!selected) return;
    const item = [...issues, ...proposals, ...projects].find((x) => x.id === selected.id);
    if (item) {
      map.closePopup();
      map.flyTo([item.lat, item.lng], undefined, { duration: 0.8 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, map]);

  return null;
}

interface MapItem {
  type: MarkerType;
  item: Issue | Proposal | Project;
}

export default function MapView() {
  const issues = useStore((s) => s.issues);
  const proposals = useStore((s) => s.proposals);
  const projects = useStore((s) => s.projects);
  const selected = useStore((s) => s.selected);

  const items: MapItem[] = useMemo(
    () => [
      ...issues.map((i) => ({ type: "issue" as const, item: i })),
      ...proposals.map((p) => ({ type: "proposal" as const, item: p })),
      ...projects.map((p) => ({ type: "project" as const, item: p })),
    ],
    [issues, proposals, projects]
  );

  const icons = useMemo(() => {
    const cache = new Map<string, L.DivIcon>();
    for (const it of items) {
      const isSel = selected?.type === it.type && selected?.id === it.item.id;
      const key = `${it.type}-${isSel}`;
      if (!cache.has(key)) cache.set(key, makeIcon(it.type, isSel));
    }
    return cache;
  }, [items, selected]);

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer
        center={MAP_CENTER}
        zoom={START_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        maxBounds={MAX_BOUNDS}
        maxBoundsViscosity={0}
        className="h-full w-full"
        zoomControl={true}
        attributionControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer url={TILE_URL} maxZoom={MAX_ZOOM} minZoom={MIN_ZOOM} />
        <ClickAway />
        <FlyToSelected />
        {items.map((it) => {
          const isSel = selected?.type === it.type && selected?.id === it.item.id;
          return (
            <Marker
              key={`${it.type}-${it.item.id}`}
              position={[it.item.lat, it.item.lng]}
              icon={icons.get(`${it.type}-${isSel}`)!}
              bubblingMouseEvents={false}
            >
              <Popup maxWidth={300} className="madinati-popup" closeButton={true}>
                <PopupCard type={it.type} item={it.item} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

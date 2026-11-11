"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  INDIAN_RIVERS,
  INDIAN_MOUNTAINS,
  INDIAN_SOILS,
  TECTONIC_PLATES,
  OCEAN_CURRENTS,
  CBSE_MAP_ITEMS,
} from "@/data/geo-features";
import { HEADQUARTERS_DATA, HeadquartersFeature } from "@/data/headquarters-data";
import {
  Layers,
  MapPin,
  Crosshair,
  Compass,
  CheckCircle2,
  PlusCircle,
  Eye,
  Info,
  GripHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface InteractiveMapProps {
  onSelectFeature: (feature: any) => void;
  activeLayers: {
    rivers: boolean;
    mountains: boolean;
    soils: boolean;
    tectonics: boolean;
    climate: boolean;
    mapItems: boolean;
    userAnnotations: boolean;
  };
  focusLocation?: { lat: number; lng: number; zoom?: number } | null;
  userAnnotations: any[];
  onAddAnnotationAt?: (coords: { lat: number; lng: number }) => void;
  isPinDroppingMode?: boolean;
  highlightedHq?: HeadquartersFeature | null;
  highlightAllCategory?: string | null;
  onSelectHq?: (hq: HeadquartersFeature | null) => void;
  onMapClickInspect?: (coords: { lat: number; lng: number }) => void;
  clickedPointCoords?: { lat: number; lng: number } | null;
}

export default function InteractiveMap({
  onSelectFeature,
  activeLayers,
  focusLocation,
  userAnnotations,
  onAddAnnotationAt,
  isPinDroppingMode = false,
  highlightedHq,
  highlightAllCategory,
  onSelectHq,
  onMapClickInspect,
  clickedPointCoords,
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layerGroupsRef = useRef<{ [key: string]: any }>({});
  const [basemap, setBasemap] = useState<"dark" | "topo" | "satellite">("dark");
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tileLayerRef = useRef<any>(null);

  // Draggable Basemap Switcher HUD
  const [basemapPos, setBasemapPos] = useState({ x: 0, y: 0 });
  const [isDraggingBasemap, setIsDraggingBasemap] = useState(false);
  const basemapDragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

  // Draggable & Collapsible Quick Fly-To Console
  const [flyToPos, setFlyToPos] = useState({ x: 0, y: 0 });
  const [isDraggingFlyTo, setIsDraggingFlyTo] = useState(false);
  const [isFlyToCollapsed, setIsFlyToCollapsed] = useState(false);
  const flyToDragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

  // Basemap drag listeners
  useEffect(() => {
    if (!isDraggingBasemap) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - basemapDragStartRef.current.mouseX;
      const dy = e.clientY - basemapDragStartRef.current.mouseY;
      setBasemapPos({
        x: basemapDragStartRef.current.startX + dx,
        y: basemapDragStartRef.current.startY + dy,
      });
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const dx = e.touches[0].clientX - basemapDragStartRef.current.mouseX;
        const dy = e.touches[0].clientY - basemapDragStartRef.current.mouseY;
        setBasemapPos({
          x: basemapDragStartRef.current.startX + dx,
          y: basemapDragStartRef.current.startY + dy,
        });
      }
    };
    const onUp = () => setIsDraggingBasemap(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDraggingBasemap]);

  // Quick Fly-To drag listeners
  useEffect(() => {
    if (!isDraggingFlyTo) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - flyToDragStartRef.current.mouseX;
      const dy = e.clientY - flyToDragStartRef.current.mouseY;
      setFlyToPos({
        x: flyToDragStartRef.current.startX + dx,
        y: flyToDragStartRef.current.startY + dy,
      });
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const dx = e.touches[0].clientX - flyToDragStartRef.current.mouseX;
        const dy = e.touches[0].clientY - flyToDragStartRef.current.mouseY;
        setFlyToPos({
          x: flyToDragStartRef.current.startX + dx,
          y: flyToDragStartRef.current.startY + dy,
        });
      }
    };
    const onUp = () => setIsDraggingFlyTo(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDraggingFlyTo]);

  // Basemap Tile URLs
  const basemapUrls = {
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    topo: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  // Initialize Leaflet Map
  useEffect(() => {
    let isSubscribed = true;

    async function initMap() {
      if (typeof window === "undefined" || !mapContainerRef.current) return;
      const L = (await import("leaflet")).default;

      if (mapInstanceRef.current) return; // already initialized

      const map = L.map(mapContainerRef.current, {
        center: [22.5, 79.0], // Center of India
        zoom: 5,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Add Zoom Control top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Add Base Tile Layer
      const baseTile = L.tileLayer(basemapUrls[basemap], {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);
      tileLayerRef.current = baseTile;

      // Create Layer Groups
      layerGroupsRef.current = {
        rivers: L.layerGroup().addTo(map),
        mountains: L.layerGroup().addTo(map),
        soils: L.layerGroup().addTo(map),
        tectonics: L.layerGroup().addTo(map),
        currents: L.layerGroup().addTo(map),
        mapItems: L.layerGroup().addTo(map),
        userAnnotations: L.layerGroup().addTo(map),
        headquarters: L.layerGroup().addTo(map),
        clickHighlight: L.layerGroup().addTo(map),
      };

      // Mousemove coordinate tracking
      map.on("mousemove", (e: any) => {
        if (isSubscribed) {
          setCursorCoords({
            lat: parseFloat(e.latlng.lat.toFixed(4)),
            lng: parseFloat(e.latlng.lng.toFixed(4)),
          });
        }
      });

      // Click event
      map.on("click", (e: any) => {
        if (isPinDroppingMode && onAddAnnotationAt) {
          onAddAnnotationAt({ lat: e.latlng.lat, lng: e.latlng.lng });
        } else if (onMapClickInspect) {
          onMapClickInspect({ lat: e.latlng.lat, lng: e.latlng.lng });
        }
      });

      setIsLoaded(true);
    }

    initMap();

    return () => {
      isSubscribed = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Basemap Tiles
  useEffect(() => {
    if (!mapInstanceRef.current || typeof window === "undefined") return;
    import("leaflet").then((module) => {
      const L = module.default;
      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }
      const newTile = L.tileLayer(basemapUrls[basemap], {
        attribution: basemap === "satellite" ? "Esri World Imagery" : '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = newTile;
    });
  }, [basemap]);

  // Sync Focus Location
  useEffect(() => {
    if (mapInstanceRef.current && focusLocation) {
      mapInstanceRef.current.flyTo(
        [focusLocation.lat, focusLocation.lng],
        focusLocation.zoom || 7,
        { duration: 1.5 }
      );
    }
  }, [focusLocation]);

  // Populate Layers
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || typeof window === "undefined") return;

    import("leaflet").then((module) => {
      const L = module.default;
      const groups = layerGroupsRef.current;

      // 1. RIVERS LAYER
      groups.rivers.clearLayers();
      if (activeLayers.rivers) {
        INDIAN_RIVERS.forEach((river) => {
          // River Path Polyline
          const polyline = L.polyline(river.path, {
            color: river.color,
            weight: 3.5,
            opacity: 0.85,
            smoothFactor: 1.2,
          });

          polyline.bindTooltip(
            `<div class="font-bold text-sky-400">${river.name}</div>
             <div class="text-xs text-slate-300">Length: ${river.lengthKm} km</div>
             <div class="text-[11px] text-slate-400 italic">Click for NCERT facts</div>`,
            { sticky: true }
          );

          polyline.on("click", () => {
            onSelectFeature({
              title: river.name,
              category: "Drainage / River System",
              hindiName: river.hindiName,
              length: `${river.lengthKm} km`,
              origin: river.origin,
              outflow: river.outflow,
              basinArea: `${river.basinAreaSqKm.toLocaleString()} sq km`,
              tributaries: river.majorTributaries.join(", "),
              description: river.description,
              ncertChapter: river.ncertChapter,
              classGrade: "11",
            });
          });

          polyline.addTo(groups.rivers);

          // Origin Marker
          const originPoint = river.path[0];
          const originIcon = L.divIcon({
            className: "custom-source-pin",
            html: `<div style="background-color: ${river.color}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 0 8px ${river.color};"></div>`,
            iconSize: [10, 10],
          });
          L.marker(originPoint, { icon: originIcon })
            .bindTooltip(`<div class="text-xs font-semibold">Source: ${river.origin}</div>`)
            .addTo(groups.rivers);
        });
      }

      // 2. MOUNTAINS & PEAKS LAYER
      groups.mountains.clearLayers();
      if (activeLayers.mountains) {
        // Mountain Ranges
        INDIAN_MOUNTAINS.filter((m) => m.type === "range").forEach((range) => {
          if (range.polyline) {
            const poly = L.polyline(range.polyline, {
              color: "#10b981",
              weight: 5,
              opacity: 0.7,
              dashArray: "6, 4",
            });
            poly.bindTooltip(
              `<div class="font-bold text-emerald-400">${range.name}</div>
               <div class="text-xs text-slate-300">Age: ${range.geologicalAge}</div>`,
              { sticky: true }
            );
            poly.on("click", () => onSelectFeature({
              title: range.name,
              category: "Mountain Range",
              elevation: `Avg. ${range.elevationM} m`,
              highestPeak: range.highestPeak,
              geologicalAge: range.geologicalAge,
              description: range.description,
              significance: range.significance,
              ncertChapter: range.ncertChapter,
            }));
            poly.addTo(groups.mountains);
          }
        });

        // Mountain Peaks
        INDIAN_MOUNTAINS.filter((m) => m.type === "peak").forEach((peak) => {
          const peakIcon = L.divIcon({
            className: "custom-peak-pin",
            html: `
              <div class="flex items-center gap-1 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div class="w-6 h-6 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-lg text-[10px] font-bold">
                  ▲
                </div>
                <div class="bg-slate-900/90 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shadow">
                  ${peak.name.split(" ")[0]} (${peak.elevationM}m)
                </div>
              </div>`,
            iconSize: [0, 0],
          });

          const marker = L.marker(peak.coordinates, { icon: peakIcon });
          marker.on("click", () => {
            onSelectFeature({
              title: peak.name,
              category: "Mountain Peak",
              elevation: `${peak.elevationM} m`,
              geologicalAge: peak.geologicalAge,
              description: peak.description,
              significance: peak.significance,
              ncertChapter: peak.ncertChapter,
            });
          });
          marker.addTo(groups.mountains);
        });
      }

      // 3. SOILS LAYER (ICAR)
      groups.soils.clearLayers();
      if (activeLayers.soils) {
        INDIAN_SOILS.forEach((soil) => {
          const poly = L.polygon(soil.polygon, {
            color: soil.color,
            fillColor: soil.color,
            fillOpacity: soil.fillOpacity,
            weight: 1.5,
          });

          poly.bindTooltip(
            `<div class="font-bold text-amber-300">${soil.name}</div>
             <div class="text-xs text-slate-300">${soil.areaPercentage}</div>
             <div class="text-[11px] text-slate-400">Click to inspect characteristics</div>`,
            { sticky: true }
          );

          poly.on("click", () => {
            onSelectFeature({
              title: `${soil.name} (${soil.hindiName})`,
              category: "Soil Type (ICAR)",
              areaPercentage: soil.areaPercentage,
              description: soil.description,
              characteristics: soil.characteristics,
              cropsGrown: soil.cropsGrown.join(", "),
              distributionStates: soil.distributionStates.join(", "),
              ncertChapter: soil.ncertChapter,
            });
          });

          poly.addTo(groups.soils);
        });
      }

      // 4. TECTONIC BOUNDARIES LAYER
      groups.tectonics.clearLayers();
      if (activeLayers.tectonics) {
        TECTONIC_PLATES.forEach((feat) => {
          if (feat.polyline) {
            const poly = L.polyline(feat.polyline, {
              color: feat.color,
              weight: 4,
              opacity: 0.85,
              dashArray: feat.boundaryType === "divergent" ? "8, 6" : undefined,
            });

            poly.bindTooltip(
              `<div class="font-bold text-red-400">${feat.name}</div>
               <div class="text-xs text-slate-300">Type: ${feat.boundaryType?.toUpperCase() || "BOUNDARY"}</div>`,
              { sticky: true }
            );

            poly.on("click", () => {
              onSelectFeature({
                title: feat.name,
                category: "Plate Tectonics",
                boundaryType: feat.boundaryType,
                speed: feat.speedMmPerYear ? `${feat.speedMmPerYear} mm/year` : undefined,
                associatedFeatures: feat.associatedFeatures,
                description: feat.description,
                ncertChapter: feat.ncertChapter,
              });
            });

            poly.addTo(groups.tectonics);
          }
        });
      }

      // 5. OCEAN CURRENTS
      groups.currents.clearLayers();
      if (activeLayers.climate) {
        OCEAN_CURRENTS.forEach((current) => {
          const poly = L.polyline(current.path, {
            color: current.color,
            weight: 3.5,
            opacity: 0.8,
            dashArray: "4, 4",
          });

          poly.bindTooltip(
            `<div class="font-bold ${current.type === 'warm' ? 'text-red-400' : 'text-blue-400'}">${current.name}</div>
             <div class="text-xs text-slate-300">${current.ocean}</div>`,
            { sticky: true }
          );

          poly.on("click", () => {
            onSelectFeature({
              title: current.name,
              category: "Ocean Current",
              ocean: current.ocean,
              type: current.type,
              influence: current.influence,
              description: `A major ${current.type} ocean current influencing regional coastal climate and marine ecology.`,
              ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 13",
            });
          });

          poly.addTo(groups.currents);
        });
      }

      // 6. CBSE CLASS 12 BOARD EXAM MAP ITEMS (MINES, PORTS)
      groups.mapItems.clearLayers();
      if (activeLayers.mapItems) {
        CBSE_MAP_ITEMS.forEach((item) => {
          const badgeColor =
            item.category === "iron_ore"
              ? "bg-amber-600 border-amber-300"
              : item.category === "coal"
              ? "bg-slate-700 border-slate-300"
              : item.category === "petroleum"
              ? "bg-purple-600 border-purple-300"
              : item.category === "port"
              ? "bg-cyan-600 border-cyan-300"
              : "bg-blue-600 border-blue-300";

          const categorySymbol =
            item.category === "iron_ore"
              ? "⛏️"
              : item.category === "coal"
              ? "🪨"
              : item.category === "petroleum"
              ? "🛢️"
              : item.category === "port"
              ? "⚓"
              : "✈️";

          const icon = L.divIcon({
            className: "cbse-exam-pin",
            html: `
              <div class="flex items-center gap-1 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                <div class="w-6 h-6 rounded-full ${badgeColor} border-2 flex items-center justify-center text-xs shadow-lg group-hover:scale-125 transition">
                  ${categorySymbol}
                </div>
                <div class="bg-slate-900/90 text-slate-200 border border-slate-700 px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shadow">
                  ${item.name}
                </div>
              </div>`,
            iconSize: [0, 0],
          });

          const marker = L.marker(item.coordinates, { icon });
          marker.on("click", () => {
            onSelectFeature({
              title: item.name,
              category: `CBSE Board Exam Map Item (${item.category.toUpperCase().replace("_", " ")})`,
              state: item.state,
              cbseExamFrequency: item.cbseExamFrequency,
              significance: item.significance,
              description: `${item.significance} Highly frequent question in CBSE Class 12 board map section.`,
              ncertChapter: "Class 12 - India: People and Economy, Ch 5 & 8",
            });
          });
          marker.addTo(groups.mapItems);
        });
      }

      // 7. USER FIELD NOTES & ANNOTATIONS
      groups.userAnnotations.clearLayers();
      if (activeLayers.userAnnotations && userAnnotations) {
        userAnnotations.forEach((annot) => {
          const lat = parseFloat(annot.latitude);
          const lng = parseFloat(annot.longitude);
          if (isNaN(lat) || isNaN(lng)) return;

          const color = annot.markerColor || "#3b82f6";
          const icon = L.divIcon({
            className: "user-annot-pin",
            html: `
              <div class="flex items-center gap-1 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-white border-2 border-white shadow-xl" style="background-color: ${color}">
                  📌
                </div>
                <div class="bg-slate-900/95 text-slate-100 border border-slate-700 px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap shadow-md">
                  ${annot.title}
                </div>
              </div>`,
            iconSize: [0, 0],
          });

          const marker = L.marker([lat, lng], { icon });
          marker.on("click", () => {
            onSelectFeature({
              id: annot.id,
              isUserAnnotation: true,
              title: annot.title,
              category: `Student Field Note (${annot.category})`,
              description: annot.description,
              elevation: annot.elevation,
              classGrade: annot.classGrade,
              chapterRef: annot.chapterRef,
              tags: annot.tags,
              markerColor: annot.markerColor,
              createdAt: annot.createdAt,
            });
          });
          marker.addTo(groups.userAnnotations);
        });
      }
    });
  }, [activeLayers, userAnnotations, isLoaded]);

  // 8. RENDER HEADQUARTERS & HIGH-VISIBILITY MAP HIGHLIGHTER BEACONS
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || typeof window === "undefined") return;

    import("leaflet").then((module) => {
      const L = module.default;
      const hqGroup = layerGroupsRef.current?.headquarters;
      if (!hqGroup) return;

      hqGroup.clearLayers();

      // Collect items to display:
      // If a specific HQ is highlighted, or if a category is batch-highlighted, or default show prominent HQs
      const itemsToHighlight: { hq: HeadquartersFeature; isPrimary: boolean }[] = [];

      if (highlightedHq) {
        itemsToHighlight.push({ hq: highlightedHq, isPrimary: true });
      }

      if (highlightAllCategory) {
        HEADQUARTERS_DATA.filter((h) => h.category === highlightAllCategory).forEach((h) => {
          if (!itemsToHighlight.some((item) => item.hq.id === h.id)) {
            itemsToHighlight.push({ hq: h, isPrimary: false });
          }
        });
      }

      itemsToHighlight.forEach(({ hq, isPrimary }) => {
        // High-visibility animated pulse beacon
        const icon = L.divIcon({
          className: "hq-highlight-marker",
          html: `
            <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
              <!-- Pulsing radar wave -->
              <div class="absolute w-12 h-12 rounded-full ${
                isPrimary ? "bg-emerald-400/40 animate-ping" : "bg-sky-400/30 animate-pulse"
              }"></div>
              <div class="absolute w-8 h-8 rounded-full ${
                isPrimary ? "bg-emerald-500/60" : "bg-sky-500/50"
              } blur-xs"></div>
              
              <!-- Core Icon Badge -->
              <div class="relative z-10 w-9 h-9 rounded-2xl ${
                isPrimary
                  ? "bg-emerald-600 border-2 border-white shadow-2xl scale-110"
                  : "bg-slate-900 border-2 border-emerald-400 shadow-xl"
              } flex items-center justify-center text-sm shadow-emerald-500/50 group-hover:scale-125 transition">
                <span>${hq.icon}</span>
              </div>

              <!-- Floating Label Tag -->
              <div class="absolute top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap bg-slate-900/95 text-white border ${
                isPrimary ? "border-emerald-400 font-bold" : "border-slate-700 font-medium"
              } px-2.5 py-1 rounded-xl shadow-2xl text-[11px] flex flex-col items-center">
                <span class="${isPrimary ? "text-emerald-300" : "text-slate-200"}">${hq.shortName}</span>
                <span class="text-[9px] text-slate-400">HQ: ${hq.city}</span>
              </div>
            </div>`,
          iconSize: [0, 0],
        });

        const marker = L.marker(hq.coordinates, { icon, zIndexOffset: isPrimary ? 2000 : 1000 });

        marker.on("click", () => {
          if (onSelectHq) onSelectHq(hq);
          onSelectFeature({
            id: hq.id,
            title: hq.name,
            category: hq.categoryLabel,
            state: `${hq.city}, ${hq.state}`,
            headquartersCity: hq.city,
            parentMinistry: hq.parentMinistryOrBody,
            establishedYear: hq.establishedYear,
            jurisdictionOrScope: hq.jurisdictionOrScope,
            cbseExamRelevance: hq.cbseExamRelevance,
            description: hq.significance,
            ncertChapter: hq.ncertChapterRef,
            classGrade: hq.classGrade,
            isHeadquarters: true,
          });
        });

        marker.addTo(hqGroup);

        // If primary highlighted HQ, also add an animated radar circle
        if (isPrimary) {
          const radarCircle = L.circle(hq.coordinates, {
            radius: 45000, // 45 km radius
            color: "#10b981",
            fillColor: "#10b981",
            fillOpacity: 0.15,
            weight: 2,
            dashArray: "6, 6",
          }).addTo(hqGroup);
        }
      });
    });
  }, [highlightedHq, highlightAllCategory, isLoaded]);

  // 9. RENDER DYNAMIC CLICK HIGHLIGHTER BEACON (Anywhere clicked on the map)
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || typeof window === "undefined") return;

    import("leaflet").then((module) => {
      const L = module.default;
      const highlightGroup = layerGroupsRef.current?.clickHighlight;
      if (!highlightGroup) return;

      highlightGroup.clearLayers();

      if (!clickedPointCoords) return;

      const { lat, lng } = clickedPointCoords;

      // Concentric pulsating waves
      const waveCircleOuter = L.circle([lat, lng], {
        radius: 35000,
        color: "#10b981",
        fillColor: "#10b981",
        fillOpacity: 0.15,
        weight: 2,
        dashArray: "4, 6",
      }).addTo(highlightGroup);

      const waveCircleInner = L.circle([lat, lng], {
        radius: 12000,
        color: "#34d399",
        fillColor: "#34d399",
        fillOpacity: 0.35,
        weight: 2,
      }).addTo(highlightGroup);

      // Radar Crosshair Pin Marker
      const crosshairIcon = L.divIcon({
        className: "live-click-highlighter-marker",
        html: `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-none">
            <!-- Pulsing outer radar glow -->
            <div class="absolute w-16 h-16 rounded-full bg-emerald-400/30 animate-ping"></div>
            <div class="absolute w-10 h-10 rounded-full bg-emerald-500/50 blur-xs"></div>
            
            <!-- High-precision target reticle -->
            <div class="relative z-20 w-8 h-8 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-2xl font-bold text-xs">
              ✛
            </div>

            <!-- Coordinate Tag -->
            <div class="absolute top-9 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap bg-slate-900/95 text-emerald-300 border border-emerald-500/60 px-2.5 py-0.5 rounded-full text-[10px] font-mono shadow-xl flex items-center gap-1 font-bold">
              <span>${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E</span>
            </div>
          </div>`,
        iconSize: [0, 0],
      });

      L.marker([lat, lng], { icon: crosshairIcon, zIndexOffset: 3000 }).addTo(highlightGroup);
    });
  }, [clickedPointCoords, isLoaded]);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-slate-950 overflow-hidden select-none">
      {/* Map DOM Element */}
      <div
        ref={mapContainerRef}
        className={`w-full h-full ${
          isPinDroppingMode ? "cursor-crosshair" : "cursor-grab active:cursor-grabbing"
        }`}
      />

      {/* Pin Dropping Mode Banner */}
      {isPinDroppingMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-1000 bg-emerald-600 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 font-medium text-sm border-2 border-white animate-bounce">
          <Crosshair className="w-5 h-5 animate-spin" />
          <span>Click anywhere on the map to place your CBSE field note!</span>
        </div>
      )}

      {/* Draggable Basemap Switcher HUD */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-1000 flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-2xl select-none"
        style={{
          transform: `translate3d(calc(-50% + ${basemapPos.x}px), ${basemapPos.y}px, 0)`,
          touchAction: isDraggingBasemap ? "none" : "auto",
        }}
      >
        {/* Grip Handle */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDraggingBasemap(true);
            basemapDragStartRef.current = {
              mouseX: e.clientX,
              mouseY: e.clientY,
              startX: basemapPos.x,
              startY: basemapPos.y,
            };
          }}
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              setIsDraggingBasemap(true);
              basemapDragStartRef.current = {
                mouseX: e.touches[0].clientX,
                mouseY: e.touches[0].clientY,
                startX: basemapPos.x,
                startY: basemapPos.y,
              };
            }
          }}
          onDoubleClick={() => setBasemapPos({ x: 0, y: 0 })}
          className="px-1.5 py-1 text-slate-400 hover:text-emerald-400 cursor-grab active:cursor-grabbing rounded-lg hover:bg-slate-800 transition"
          title="Drag basemap console anywhere (Double-click to reset)"
        >
          <GripHorizontal className="w-3.5 h-3.5" />
        </div>

        <button
          onClick={() => setBasemap("dark")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            basemap === "dark"
              ? "bg-emerald-500 text-white shadow-xs"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          Geo Dark
        </button>
        <button
          onClick={() => setBasemap("topo")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            basemap === "topo"
              ? "bg-emerald-500 text-white shadow-xs"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          Topographic Relief
        </button>
        <button
          onClick={() => setBasemap("satellite")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            basemap === "satellite"
              ? "bg-emerald-500 text-white shadow-xs"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          Satellite Terrain
        </button>

        {(basemapPos.x !== 0 || basemapPos.y !== 0) && (
          <button
            onClick={() => setBasemapPos({ x: 0, y: 0 })}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-[10px]"
            title="Reset position"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Draggable & Collapsible Quick Fly-To Console */}
      <div
        className="absolute bottom-6 left-4 z-1000 select-none max-w-sm"
        style={{
          transform: `translate3d(${flyToPos.x}px, ${flyToPos.y}px, 0)`,
          touchAction: isDraggingFlyTo ? "none" : "auto",
        }}
      >
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 overflow-hidden">
          {/* Header Bar with Drag Handle & Collapse */}
          <div className="flex items-center justify-between pb-1 px-1 border-b border-slate-800/80 text-[10px] text-slate-400">
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingFlyTo(true);
                flyToDragStartRef.current = {
                  mouseX: e.clientX,
                  mouseY: e.clientY,
                  startX: flyToPos.x,
                  startY: flyToPos.y,
                };
              }}
              onTouchStart={(e) => {
                if (e.touches.length > 0) {
                  setIsDraggingFlyTo(true);
                  flyToDragStartRef.current = {
                    mouseX: e.touches[0].clientX,
                    mouseY: e.touches[0].clientY,
                    startX: flyToPos.x,
                    startY: flyToPos.y,
                  };
                }
              }}
              onDoubleClick={() => setFlyToPos({ x: 0, y: 0 })}
              className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing hover:text-emerald-400 transition"
              title="Drag quick-fly console anywhere (Double-click to reset)"
            >
              <GripHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-slate-300">Quick Regional Fly</span>
            </div>

            <div className="flex items-center gap-1">
              {(flyToPos.x !== 0 || flyToPos.y !== 0) && (
                <button
                  onClick={() => setFlyToPos({ x: 0, y: 0 })}
                  className="p-1 hover:text-white rounded hover:bg-slate-800"
                  title="Reset position"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                </button>
              )}
              <button
                onClick={() => setIsFlyToCollapsed(!isFlyToCollapsed)}
                className="p-1 hover:text-white rounded hover:bg-slate-800"
                title={isFlyToCollapsed ? "Expand" : "Collapse"}
              >
                {isFlyToCollapsed ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {!isFlyToCollapsed && (
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              <button
                onClick={() =>
                  mapInstanceRef.current?.flyTo([28.6, 77.2], 6, { duration: 1.2 })
                }
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 shadow-xs flex items-center gap-1"
              >
                <span>🇮🇳 Northern Plains</span>
              </button>
              <button
                onClick={() =>
                  mapInstanceRef.current?.flyTo([13.5, 75.5], 6, { duration: 1.2 })
                }
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 shadow-xs flex items-center gap-1"
              >
                <span>⛰️ Western Ghats</span>
              </button>
              <button
                onClick={() =>
                  mapInstanceRef.current?.flyTo([22.5, 87.5], 6, { duration: 1.2 })
                }
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 shadow-xs flex items-center gap-1"
              >
                <span>⛏️ Chota Nagpur</span>
              </button>
              <button
                onClick={() =>
                  mapInstanceRef.current?.flyTo([26.5, 93.5], 6, { duration: 1.2 })
                }
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 shadow-xs flex items-center gap-1"
              >
                <span>🌊 Brahmaputra</span>
              </button>
              <button
                onClick={() => {
                  mapInstanceRef.current?.flyTo([25.0, -45.0], 4, { duration: 1.5 });
                  onSelectFeature({
                    title: "Mid-Atlantic Ridge",
                    category: "Tectonic Divergent Boundary",
                    boundaryType: "divergent",
                    speed: "25 mm/year",
                    elevation: "-2,500m (submarine rift)",
                    associatedFeatures: "Iceland volcanic rift, hydrothermal vents, symmetric magnetic striping",
                    description: "Continuous submarine mountain chain extending ~16,000 km along the floor of the Atlantic Ocean where North American and Eurasian plates pull apart as basalt magma wells up from the asthenosphere (Sea Floor Spreading).",
                    ncertChapter: "Class 11 - Fundamentals of Physical Geography, Ch 4: Plate Tectonics",
                    classGrade: "11",
                  });
                }}
                className="px-2 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-medium border border-rose-500/40 shadow-xs flex items-center gap-1"
              >
                <span>🌋 Mid-Atlantic Ridge</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Live Coordinate HUD */}
      <div className="absolute bottom-6 right-4 z-1000 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono shadow-xl flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Crosshair className="w-3.5 h-3.5" />
          <span>
            {cursorCoords
              ? `${cursorCoords.lat > 0 ? `${cursorCoords.lat}°N` : `${Math.abs(cursorCoords.lat)}°S`}, ${
                  cursorCoords.lng > 0 ? `${cursorCoords.lng}°E` : `${Math.abs(cursorCoords.lng)}°W`
                }`
              : "Move mouse to inspect coordinates"}
          </span>
        </div>
      </div>
    </div>
  );
}

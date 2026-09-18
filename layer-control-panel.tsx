"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Layers,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckSquare,
  Square,
  Sparkles,
  GripHorizontal,
  RotateCcw,
} from "lucide-react";

export interface LayerState {
  rivers: boolean;
  mountains: boolean;
  soils: boolean;
  tectonics: boolean;
  climate: boolean;
  mapItems: boolean;
  userAnnotations: boolean;
}

interface LayerControlPanelProps {
  layers: LayerState;
  onChangeLayers: (updater: (prev: LayerState) => LayerState) => void;
  userAnnotationCount: number;
}

export default function LayerControlPanel({
  layers,
  onChangeLayers,
  userAnnotationCount,
}: LayerControlPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Draggable position state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

  const startDrag = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      startX: pos.x,
      startY: pos.y,
    };
  }, [pos]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;
      setPos({
        x: dragStartRef.current.startX + dx,
        y: dragStartRef.current.startY + dy,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const dx = e.touches[0].clientX - dragStartRef.current.mouseX;
        const dy = e.touches[0].clientY - dragStartRef.current.mouseY;
        setPos({
          x: dragStartRef.current.startX + dx,
          y: dragStartRef.current.startY + dy,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const resetPos = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPos({ x: 0, y: 0 });
  };

  const toggleLayer = (key: keyof LayerState) => {
    onChangeLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Quick syllabus presets
  const applyPreset = (preset: "class11_drainage" | "class11_relief" | "class12_board" | "all" | "clear") => {
    if (preset === "class11_drainage") {
      onChangeLayers(() => ({
        rivers: true,
        mountains: false,
        soils: true,
        tectonics: false,
        climate: false,
        mapItems: false,
        userAnnotations: true,
      }));
    } else if (preset === "class11_relief") {
      onChangeLayers(() => ({
        rivers: true,
        mountains: true,
        soils: false,
        tectonics: true,
        climate: false,
        mapItems: false,
        userAnnotations: true,
      }));
    } else if (preset === "class12_board") {
      onChangeLayers(() => ({
        rivers: false,
        mountains: false,
        soils: false,
        tectonics: false,
        climate: false,
        mapItems: true,
        userAnnotations: true,
      }));
    } else if (preset === "all") {
      onChangeLayers(() => ({
        rivers: true,
        mountains: true,
        soils: true,
        tectonics: true,
        climate: true,
        mapItems: true,
        userAnnotations: true,
      }));
    } else if (preset === "clear") {
      onChangeLayers(() => ({
        rivers: false,
        mountains: false,
        soils: false,
        tectonics: false,
        climate: false,
        mapItems: false,
        userAnnotations: false,
      }));
    }
  };

  const layerItems: {
    key: keyof LayerState;
    label: string;
    subtext: string;
    icon: string;
    colorClass: string;
  }[] = [
    {
      key: "rivers",
      label: "Indian Rivers & Drainage",
      subtext: "Ganga, Indus, Brahmaputra & Peninsular",
      icon: "🏞️",
      colorClass: "text-sky-400",
    },
    {
      key: "mountains",
      label: "Relief & Mountains",
      subtext: "Himalayas, Ghats, Aravalli & Peaks",
      icon: "⛰️",
      colorClass: "text-emerald-400",
    },
    {
      key: "soils",
      label: "Soils of India (ICAR)",
      subtext: "Alluvial, Regur, Laterite, Arid, Red",
      icon: "🌾",
      colorClass: "text-amber-400",
    },
    {
      key: "tectonics",
      label: "Tectonic Plates & Faults",
      subtext: "Mid-Atlantic, Ring of Fire, Himalayas",
      icon: "🌋",
      colorClass: "text-rose-400",
    },
    {
      key: "climate",
      label: "Climate Zones & Currents",
      subtext: "Köppen zones, Warm & Cold ocean gyres",
      icon: "⛅",
      colorClass: "text-blue-400",
    },
    {
      key: "mapItems",
      label: "Class 12 Board Map Items",
      subtext: "Bailadila, Jharia, Digboi, Ports, Airports",
      icon: "🏭",
      colorClass: "text-purple-400",
    },
    {
      key: "userAnnotations",
      label: `My Field Notes (${userAnnotationCount})`,
      subtext: "Saved student pins and observations",
      icon: "📌",
      colorClass: "text-yellow-400",
    },
  ];

  return (
    <div
      className={`absolute top-4 right-4 z-1000 select-none transition-shadow ${
        isDragging ? "opacity-95 shadow-2xl" : ""
      }`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        touchAction: isDragging ? "none" : "auto",
      }}
    >
      {/* Sleek Mini-Pill when Collapsed (leaves full canvas space & is Draggable) */}
      {isCollapsed ? (
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 shadow-2xl">
          {/* Drag Handle */}
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              startDrag(e.clientX, e.clientY);
            }}
            onTouchStart={(e) => {
              if (e.touches.length > 0) {
                startDrag(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onDoubleClick={resetPos}
            className="p-1.5 text-slate-400 hover:text-emerald-400 cursor-grab active:cursor-grabbing rounded-xl hover:bg-slate-800 transition"
            title="Drag layers panel anywhere (Double-click to reset)"
          >
            <GripHorizontal className="w-4 h-4" />
          </div>

          <button
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition group hover:text-white"
            title="Open Physical Layers Panel"
          >
            <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span>Layers</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
              {Object.values(layers).filter(Boolean).length}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
          </button>

          {/* Reset button if moved */}
          {(pos.x !== 0 || pos.y !== 0) && (
            <button
              onClick={resetPos}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition text-[10px]"
              title="Reset position to default"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      ) : (
        <div className="w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header with Drag Handle */}
          <div
            onMouseDown={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest("button") || target.closest("input")) return;
              e.preventDefault();
              startDrag(e.clientX, e.clientY);
            }}
            onTouchStart={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest("button") || target.closest("input")) return;
              if (e.touches.length > 0) {
                startDrag(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onDoubleClick={resetPos}
            className="p-2.5 bg-slate-800/90 border-b border-slate-700/60 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
            title="Drag layers panel anywhere • Double-click to reset position"
          >
            <div className="flex items-center gap-2">
              <GripHorizontal className="w-4 h-4 text-emerald-400 shrink-0" />
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs text-slate-100">Physical Layers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] bg-slate-700/60 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                {Object.values(layers).filter(Boolean).length} Active
              </span>
              {(pos.x !== 0 || pos.y !== 0) && (
                <button
                  onClick={resetPos}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition"
                  title="Reset position"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition"
                title="Collapse panel for more map space"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-3 space-y-3 max-h-[75vh] overflow-y-auto">
          {/* Quick Syllabus Presets */}
          <div>
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>NCERT Exam Presets</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => applyPreset("class11_drainage")}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-medium text-left border border-slate-700 transition"
              >
                💧 Ch 3 Drainage
              </button>
              <button
                onClick={() => applyPreset("class11_relief")}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-medium text-left border border-slate-700 transition"
              >
                🏔️ Ch 2 Relief & Plates
              </button>
              <button
                onClick={() => applyPreset("class12_board")}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-amber-300 font-medium text-left border border-slate-700 transition"
              >
                🎯 Class 12 Board
              </button>
              <button
                onClick={() => applyPreset("all")}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-emerald-300 font-medium text-left border border-slate-700 transition"
              >
                ✨ Show All Layers
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-800" />

          {/* Layer Checkboxes */}
          <div className="space-y-1.5">
            {layerItems.map((item) => {
              const active = layers[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleLayer(item.key)}
                  className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    active
                      ? "bg-slate-800/80 border-slate-600/80 text-white"
                      : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-xs leading-snug">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[170px]">
                        {item.subtext}
                      </div>
                    </div>
                  </div>

                  <div>
                    {active ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

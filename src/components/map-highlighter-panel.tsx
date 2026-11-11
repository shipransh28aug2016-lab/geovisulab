"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Highlighter,
  ChevronDown,
  ChevronUp,
  Search,
  Crosshair,
  Compass,
  X,
  Sparkles,
  Building2,
  Train,
  Anchor,
  Flame,
  Globe2,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Filter,
  GripHorizontal,
  RotateCcw,
} from "lucide-react";
import { HEADQUARTERS_DATA, HeadquartersFeature } from "@/data/headquarters-data";

interface MapHighlighterPanelProps {
  highlightedHq: HeadquartersFeature | null;
  onSelectHq: (hq: HeadquartersFeature | null) => void;
  onFlyToLocation: (coords: { lat: number; lng: number; zoom?: number }) => void;
  highlightAllCategory: string | null;
  onToggleHighlightAllCategory: (category: string | null) => void;
}

export default function MapHighlighterPanel({
  highlightedHq,
  onSelectHq,
  onFlyToLocation,
  highlightAllCategory,
  onToggleHighlightAllCategory,
}: MapHighlighterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  const categories = [
    { id: "all", label: "All HQs", icon: "🇮🇳" },
    { id: "railway_hq", label: "Railway Zones (10)", icon: "🚆" },
    { id: "geo_institute", label: "National Geo Institutes (5)", icon: "🗺️" },
    { id: "resource_hq", label: "Resources & Energy (4)", icon: "⚡" },
    { id: "port_authority", label: "Major Port Trusts (5)", icon: "⚓" },
  ];

  const filteredHqs = useMemo(() => {
    return HEADQUARTERS_DATA.filter((hq) => {
      const matchesCategory =
        selectedCategory === "all" || hq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        hq.name.toLowerCase().includes(q) ||
        hq.shortName.toLowerCase().includes(q) ||
        hq.city.toLowerCase().includes(q) ||
        hq.state.toLowerCase().includes(q) ||
        hq.significance.toLowerCase().includes(q) ||
        hq.jurisdictionOrScope.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleHighlight = (hq: HeadquartersFeature) => {
    onSelectHq(hq);
    onFlyToLocation({ lat: hq.coordinates[0], lng: hq.coordinates[1], zoom: 8 });
  };

  const handleClearHighlight = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectHq(null);
    onToggleHighlightAllCategory(null);
  };

  return (
    <div
      className={`absolute top-4 left-4 z-1000 select-none max-w-sm transition-shadow ${
        isDragging ? "opacity-95 shadow-2xl" : ""
      }`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        touchAction: isDragging ? "none" : "auto",
      }}
    >
      {/* Collapsed Pill / Launcher (Provides maximum visualization space & is Draggable) */}
      {!isExpanded ? (
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-emerald-500/50 shadow-2xl">
          {/* Drag Grip Handle */}
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
            title="Drag panel anywhere (Double-click to reset)"
          >
            <GripHorizontal className="w-4 h-4" />
          </div>

          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-slate-100 group"
          >
            <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
              <Highlighter className="w-3.5 h-3.5" />
            </div>
            <span>Highlighter & HQs</span>
            {highlightedHq && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                {highlightedHq.shortName.split("-")[0].trim()}
              </span>
            )}
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition" />
          </button>

          {/* Reset position icon if moved */}
          {(pos.x !== 0 || pos.y !== 0) && (
            <button
              onClick={resetPos}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition text-[10px]"
              title="Reset position to default"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}

          {/* Quick Clear Button if item active */}
          {(highlightedHq || highlightAllCategory) && (
            <button
              onClick={handleClearHighlight}
              className="p-1.5 rounded-xl hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition text-xs"
              title="Clear active highlighter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        /* Expanded Interactive Pan with Top Drag Bar */
        <div className="w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh] animate-in fade-in zoom-in-95 duration-200">
          {/* Draggable Title Bar */}
          <div
            onMouseDown={(e) => {
              // Only drag if clicking the bar itself or grip handle
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
            className="p-2.5 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
            title="Drag panel anywhere • Double-click to reset position"
          >
            <div className="flex items-center gap-2">
              <GripHorizontal className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Highlighter className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-white leading-tight">
                  CBSE Geography Map Highlighter
                </h3>
                <p className="text-[10px] text-slate-400">
                  Railway Zones, Institutes & Resource HQs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {(pos.x !== 0 || pos.y !== 0) && (
                <button
                  onClick={resetPos}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
                  title="Reset position"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
                title="Collapse panel to enlarge visualizer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-slate-800 bg-slate-950/40 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Railway zone, SOI Dehradun, CIL, Port..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition flex items-center gap-1 ${
                    selectedCategory === c.id
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>

            {/* Multi-Highlight Bar */}
            <div className="flex items-center justify-between pt-1 text-[11px]">
              <span className="text-slate-400">
                {filteredHqs.length} locations found
              </span>

              <div className="flex items-center gap-1.5">
                {selectedCategory !== "all" && (
                  <button
                    onClick={() =>
                      onToggleHighlightAllCategory(
                        highlightAllCategory === selectedCategory
                          ? null
                          : selectedCategory
                      )
                    }
                    className={`px-2 py-0.5 rounded-md font-medium text-[10px] border transition ${
                      highlightAllCategory === selectedCategory
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                    }`}
                  >
                    {highlightAllCategory === selectedCategory
                      ? "✓ Highlighting Category"
                      : "Highlight All in Category"}
                  </button>
                )}

                {(highlightedHq || highlightAllCategory) && (
                  <button
                    onClick={handleClearHighlight}
                    className="text-rose-400 hover:underline text-[10px]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* List of Headquarters */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
            {filteredHqs.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No headquarters match your search.
              </div>
            ) : (
              filteredHqs.map((hq) => {
                const isSelected = highlightedHq?.id === hq.id;
                return (
                  <div
                    key={hq.id}
                    onClick={() => handleHighlight(hq)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                        : "bg-slate-950/60 border-slate-800/90 hover:border-slate-700 text-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{hq.icon}</span>
                        <div>
                          <div className="font-bold text-xs text-white leading-tight">
                            {hq.shortName}
                          </div>
                          <div className="text-[10px] text-emerald-400 font-medium">
                            HQ: {hq.city}, {hq.state} • Est. {hq.establishedYear}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHighlight(hq);
                        }}
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 shrink-0 transition ${
                          isSelected
                            ? "bg-emerald-500 text-white shadow-xs"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        }`}
                      >
                        <Crosshair className="w-3 h-3" />
                        <span>{isSelected ? "Active" : "Highlight"}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {hq.significance}
                    </p>

                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800/80 text-slate-400">
                      <span className="truncate max-w-[210px] text-amber-300/90">
                        🎯 {hq.cbseExamRelevance}
                      </span>
                      <span className="text-slate-500">
                        {hq.parentMinistryOrBody.split(",")[0]}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Dock Tip */}
          <div className="p-2.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Click to highlight & fly to location</span>
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white underline text-[10px]"
            >
              Minimize Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Crosshair,
  MapPin,
  Mountain,
  Compass,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  CheckCircle2,
  X,
  Languages,
  PlusCircle,
  Share2,
  Droplets,
  CloudSun,
  ShieldAlert,
} from "lucide-react";
import { GeoLocationAnalysis } from "@/data/spatial-inspector-engine";

interface ClickHighlighterInspectorProps {
  analysis: GeoLocationAnalysis | null;
  onClose: () => void;
  lang?: "en" | "hi";
  onAddNoteAt?: (coords: { lat: number; lng: number }) => void;
  onFlyToNearestLandmark?: (coords: { lat: number; lng: number; zoom?: number }) => void;
}

export default function ClickHighlighterInspector({
  analysis,
  onClose,
  lang = "en",
  onAddNoteAt,
  onFlyToNearestLandmark,
}: ClickHighlighterInspectorProps) {
  const [activeLang, setActiveLang] = useState<"en" | "hi">(lang);

  if (!analysis) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[1150] w-full sm:w-[460px] bg-slate-950/95 backdrop-blur-xl border-l border-emerald-500/50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 select-none">
      {/* Header with High-Tech Coordinate Radar Banner */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 shrink-0 mt-0.5">
            <Crosshair className="w-5 h-5 animate-spin-slow" />
            <div className="absolute -inset-1 rounded-2xl bg-emerald-400/20 animate-ping -z-10" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeLang === "hi" ? "सक्रिय स्थान विश्लेषण" : "Live Location Highlighted"}</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                {analysis.lat.toFixed(4)}°N, {analysis.lng.toFixed(4)}°E
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white leading-snug">
              {activeLang === "hi" ? analysis.locationNameHi : analysis.locationName}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setActiveLang((l) => (l === "en" ? "hi" : "en"))}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-200 border border-slate-700 transition flex items-center gap-1"
            title="Toggle English / हिन्दी"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeLang === "en" ? "हिन्दी" : "EN"}</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Inspection Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
        {/* 1. Physiographic Division & Geological Terrane */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
            <Mountain className="w-4 h-4 text-emerald-400" />
            <span>{activeLang === "hi" ? "भू-आकृतिक प्रदेश एवं भूगर्भीय संरचना" : "Physiography & Geological Division"}</span>
          </div>

          <div className="space-y-1.5 text-slate-200">
            <div className="font-bold text-sm text-white">
              {activeLang === "hi" ? analysis.physiographicDivisionHi : analysis.physiographicDivision}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              <strong>Geology:</strong> {analysis.geologicalFormation}
            </p>
          </div>
        </div>

        {/* 2. ICAR Soil Order & Diagnostic Agronomy */}
        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>{activeLang === "hi" ? "आईसीएआर मृदा वर्ग" : "ICAR Soil Classification"}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
              ICAR 1953
            </span>
          </div>

          <div className="font-bold text-white text-xs">
            {activeLang === "hi" ? analysis.soilOrderHi : analysis.soilOrder}
          </div>

          <ul className="space-y-1 text-slate-300 text-[11px]">
            {analysis.soilCharacteristics.map((char, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Drainage System & River Basin */}
        <div className="p-3.5 rounded-2xl bg-sky-950/20 border border-sky-500/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-sky-400 font-bold uppercase tracking-wider text-[11px]">
            <Droplets className="w-4 h-4 text-sky-400" />
            <span>{activeLang === "hi" ? "अपवाह द्रोणी एवं नदी तंत्र" : "Drainage Basin & River System"}</span>
          </div>
          <div className="font-bold text-white text-xs">
            {activeLang === "hi" ? analysis.drainageBasinHi : analysis.drainageBasin}
          </div>
          {analysis.nearestRiver && (
            <div className="text-[11px] text-slate-300 pt-1 border-t border-sky-500/20 flex items-center justify-between">
              <span>
                Nearest River: <strong className="text-sky-300">{analysis.nearestRiver.name}</strong> (~{analysis.nearestRiver.distanceKm} km away)
              </span>
              <span className="text-[10px] text-slate-400">Outflow: {analysis.nearestRiver.flowTo}</span>
            </div>
          )}
        </div>

        {/* 4. Climate Regime & Rainfall */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
              <CloudSun className="w-4 h-4" />
              <span>{activeLang === "hi" ? "जलवायु एवं वर्षा प्रतिरूप" : "Climate Regime & Köppen Code"}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">
              {analysis.koppenCode}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div>
              <span className="text-slate-500 block">Climate Type:</span>
              <span className="font-semibold text-white">{analysis.climateType}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Annual Rainfall Est.:</span>
              <span className="font-semibold text-white">{analysis.annualRainfallEst}</span>
            </div>
          </div>
        </div>

        {/* 5. Nearest Spatial Landmarks (Mountains, Board Exam Items, HQs) */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {activeLang === "hi" ? "समीपवर्ती प्रमुख सीबीएसई स्थल" : "Nearest Prescribed CBSE Landmarks"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Nearest Peak */}
            {analysis.nearestMountain && (
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Nearest Peak / Relief
                </span>
                <div className="font-bold text-white text-xs truncate">
                  {analysis.nearestMountain.name}
                </div>
                <div className="text-[10px] text-slate-400">
                  {analysis.nearestMountain.elevationM}m • {analysis.nearestMountain.distanceKm} km ({analysis.nearestMountain.direction})
                </div>
              </div>
            )}

            {/* Nearest Board Exam Item */}
            {analysis.nearestBoardExamItem && (
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Board Exam Landmark
                </span>
                <div className="font-bold text-white text-xs truncate">
                  {analysis.nearestBoardExamItem.name}
                </div>
                <div className="text-[10px] text-slate-400">
                  {analysis.nearestBoardExamItem.category} • ~{analysis.nearestBoardExamItem.distanceKm} km
                </div>
              </div>
            )}
          </div>

          {/* Nearest Headquarters */}
          {analysis.nearestHeadquarters && (
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                  Nearest Institution / Railway HQ
                </span>
                <div className="font-bold text-white text-xs">
                  {analysis.nearestHeadquarters.name} ({analysis.nearestHeadquarters.city})
                </div>
                <div className="text-[10px] text-slate-400">
                  {analysis.nearestHeadquarters.category} • ~{analysis.nearestHeadquarters.distanceKm} km away
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 6. CBSE Board Exam Rationale & Syllabus Reference */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px] uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{activeLang === "hi" ? "सीबीएसई बोर्ड परीक्षा महत्व" : "CBSE Board Examination Focus"}</span>
          </div>
          <p className="text-amber-100 leading-relaxed text-xs font-medium">
            {activeLang === "hi" ? analysis.cbseExamRelevanceHi : analysis.cbseExamRelevance}
          </p>
          {analysis.ncertChapters.length > 0 && (
            <div className="pt-1.5 border-t border-amber-500/20 text-[10px] text-amber-200/90 font-mono">
              <strong>NCERT Chapters:</strong> {analysis.ncertChapters.join(" • ")}
            </div>
          )}
        </div>
      </div>

      {/* Footer Quick Actions */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            if (onAddNoteAt) {
              onAddNoteAt({ lat: analysis.lat, lng: analysis.lng });
            }
          }}
          className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{activeLang === "hi" ? "यहां फील्ड नोट पिन जोड़ें" : "Drop Field Note Pin Here"}</span>
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
        >
          {activeLang === "hi" ? "बंद करें" : "Close"}
        </button>
      </div>
    </div>
  );
}

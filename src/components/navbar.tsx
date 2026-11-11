"use client";

import React from "react";
import {
  Globe2,
  Map,
  Layers,
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  PlusCircle,
  Bookmark,
  User,
  Activity,
  Mountain,
  Maximize2,
  Minimize2,
  Languages,
  Sun,
  Ruler,
  Compass,
} from "lucide-react";

interface NavbarProps {
  currentMode: "globe" | "map" | "profile";
  onModeChange: (mode: "globe" | "map" | "profile") => void;
  selectedGrade: "11" | "12" | "all";
  onGradeChange: (grade: "11" | "12" | "all") => void;
  currentUser: any;
  onOpenAuth: () => void;
  onOpenQuiz: () => void;
  onOpenAddAnnotation: () => void;
  onOpenBookmarks: () => void;
  onToggleElevationModal: () => void;
  onOpenEarthInterior: () => void;
  onOpenHeatBudget: () => void;
  onOpenPracticalLab: () => void;
  onOpenMapPractice: () => void;
  activeAnnotationCount: number;
  isPinDroppingMode: boolean;
  onTogglePinDropping: () => void;
  isZenMode: boolean;
  onToggleZenMode: () => void;
  lang: "en" | "hi";
  onToggleLang: () => void;
}

export default function Navbar({
  currentMode,
  onModeChange,
  selectedGrade,
  onGradeChange,
  currentUser,
  onOpenAuth,
  onOpenQuiz,
  onOpenAddAnnotation,
  onOpenBookmarks,
  onToggleElevationModal,
  onOpenEarthInterior,
  onOpenHeatBudget,
  onOpenPracticalLab,
  onOpenMapPractice,
  activeAnnotationCount,
  isPinDroppingMode,
  onTogglePinDropping,
  isZenMode,
  onToggleZenMode,
  lang,
  onToggleLang,
}: NavbarProps) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Branding & Syllabus Grade Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Globe2 className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                GeoSphere<span className="text-emerald-400">3D</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                CBSE NCERT
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden xl:block">
              NCERT Visual Learning System (Classes XI & XII)
            </p>
          </div>
        </div>

        {/* Grade Pills */}
        <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs">
          <button
            onClick={() => onGradeChange("11")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              selectedGrade === "11"
                ? "bg-emerald-500 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {lang === "hi" ? "कक्षा 11" : "Class 11"}
          </button>
          <button
            onClick={() => onGradeChange("12")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              selectedGrade === "12"
                ? "bg-emerald-500 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {lang === "hi" ? "कक्षा 12" : "Class 12"}
          </button>
          <button
            onClick={() => onGradeChange("all")}
            className={`px-2.5 py-1 rounded-lg font-semibold transition ${
              selectedGrade === "all"
                ? "bg-emerald-500 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {lang === "hi" ? "संपूर्ण पाठ्यक्रम" : "All Syllabus"}
          </button>
        </div>
      </div>

      {/* Center: Primary View & Visual Labs Navigation */}
      <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
        <button
          onClick={() => onModeChange("globe")}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold transition ${
            currentMode === "globe"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">3D Globe</span>
        </button>

        <button
          onClick={() => onModeChange("map")}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold transition ${
            currentMode === "map"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">2D Map</span>
        </button>

        <div className="h-4 w-px bg-slate-800 mx-0.5" />

        {/* Visual Labs Dropdown/Buttons */}
        <button
          onClick={onOpenEarthInterior}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
          title="Earth's Interior & Seismic Wave Shadow Zones (Class 11 Ch 3)"
        >
          <Activity className="w-3.5 h-3.5 text-rose-400" />
          <span className="hidden lg:inline">{lang === "hi" ? "भूकंपीय छाया" : "Earth Interior"}</span>
        </button>

        <button
          onClick={onOpenHeatBudget}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
          title="Insolation & Global Heat Budget Simulator (Class 11 Ch 8)"
        >
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden lg:inline">{lang === "hi" ? "ऊष्मा बजट" : "Heat Budget"}</span>
        </button>

        <button
          onClick={onOpenPracticalLab}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
          title="Practical Geography & GIS Lab (Scale, Time, Contours, GIS Buffers)"
        >
          <Ruler className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden md:inline">{lang === "hi" ? "प्रयोगात्मक लैब" : "Practical Lab"}</span>
        </button>
      </div>

      {/* Right: Map Practice, Language, Zen & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* CBSE Map Practice Engine Button */}
        <button
          onClick={onOpenMapPractice}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-semibold transition shadow-sm"
          title="Prescribed CBSE Board Map Practice Engine"
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">{lang === "hi" ? "मानचित्र परीक्षा" : "Map Practice"}</span>
        </button>

        {/* English / Hindi Language Toggle */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white transition"
          title="Toggle Language (English / हिन्दी)"
        >
          <Languages className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lang === "en" ? "हिन्दी" : "EN"}</span>
        </button>

        {/* Add Pin / Field Note */}
        <button
          onClick={onTogglePinDropping}
          className={`flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-semibold border transition ${
            isPinDroppingMode
              ? "bg-rose-500 text-white border-rose-400 animate-pulse"
              : "bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700"
          }`}
          title="Drop field note on map"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span className="hidden xl:inline">
            {isPinDroppingMode ? "Cancel" : "Add Note Pin"}
          </span>
        </button>

        {/* Bookmarks */}
        <button
          onClick={onOpenBookmarks}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
          title="My Bookmarked Features"
        >
          <Bookmark className="w-4 h-4 text-sky-400" />
        </button>

        {/* Maximize / Zen Visualization Mode */}
        <button
          onClick={onToggleZenMode}
          className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-semibold ${
            isZenMode
              ? "bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/30"
              : "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700"
          }`}
          title={isZenMode ? "Exit Zen Mode" : "Zen Mode (Maximize Visualization Space)"}
        >
          {isZenMode ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4 text-emerald-400" />
          )}
        </button>

        {/* User Account / Profile Switcher */}
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs transition"
        >
          <div className="w-7 h-7 rounded-lg overflow-hidden bg-emerald-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              currentUser?.name?.charAt(0) || "U"
            )}
          </div>
        </button>
      </div>
    </header>
  );
}

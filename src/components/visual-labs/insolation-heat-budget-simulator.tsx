"use client";

import React, { useState } from "react";
import {
  Sun,
  Flame,
  Globe2,
  Wind,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Sliders,
  CheckCircle2,
} from "lucide-react";

interface InsolationHeatBudgetSimulatorProps {
  onClose?: () => void;
  lang?: "en" | "hi";
}

export default function InsolationHeatBudgetSimulator({
  onClose,
  lang = "en",
}: InsolationHeatBudgetSimulatorProps) {
  const [activeTab, setActiveTab] = useState<"insolation" | "budget" | "winds">("budget");
  const [latitude, setLatitude] = useState<number>(28.6); // New Delhi ~28.6°N
  const [season, setSeason] = useState<"equinox" | "summer_solstice" | "winter_solstice">("summer_solstice");

  // Heat Budget Interactive Tweaks (simulating greenhouse trap)
  const [greenhouseCo2, setGreenhouseCo2] = useState<number>(1.0); // 1.0 = normal baseline

  // Solar Declination by Season
  const declinationMap = {
    equinox: 0,
    summer_solstice: 23.5, // Tropic of Cancer
    winter_solstice: -23.5, // Tropic of Capricorn
  };

  const declination = declinationMap[season];
  // Angle of incidence = 90 - |lat - declination|
  const incidenceAngle = Math.max(0, 90 - Math.abs(latitude - declination));
  const beamSpread = incidenceAngle > 0 ? (1 / Math.sin((incidenceAngle * Math.PI) / 180)).toFixed(2) : "0 (Polar Night)";
  const relativeInsolation = Math.round(100 * Math.sin((incidenceAngle * Math.PI) / 180));

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg">
            <Sun className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-white">
                {lang === "hi"
                  ? "सौर विकिरण, ऊष्मा संतुलन एवं वायुदाब पेटियां"
                  : "Solar Radiation, Heat Budget & Planetary Circulation"}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                NCERT Class 11 Ch 8 & 9
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Insolation incidence angle, 100-unit global heat balance sheet, and three-cell general circulation
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("budget")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "budget" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            ⚖️ {lang === "hi" ? "ऊष्मा बजट संतुलन" : "Global Heat Budget"}
          </button>
          <button
            onClick={() => setActiveTab("insolation")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "insolation" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            ☀️ {lang === "hi" ? "सूर्य किरण कोण व आपतन" : "Insolation Angle"}
          </button>
          <button
            onClick={() => setActiveTab("winds")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "winds" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🌪️ {lang === "hi" ? "वायुदाब पेटियां एवं पवनें" : "Planetary Winds"}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Interactive Diagram */}
        <div className="flex-1 relative flex items-center justify-center p-4 bg-radial from-slate-900 via-slate-950 to-black overflow-hidden">
          {activeTab === "budget" && (
            <div className="relative w-full max-w-2xl aspect-[16/10] flex items-center justify-center">
              {/* Comprehensive 100-Unit Heat Budget Flow Chart SVG */}
              <svg viewBox="0 0 680 400" className="w-full h-full">
                {/* Background Regions */}
                {/* Space (Top) */}
                <rect x="0" y="0" width="680" height="80" fill="#090d16" />
                <text x="340" y="24" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                  TOP OF ATMOSPHERE / SPACE (100 UNITS INCOMING)
                </text>

                {/* Atmosphere Layer (Middle) */}
                <rect x="0" y="80" width="680" height="200" fill="rgba(30, 58, 95, 0.4)" stroke="#1e3a5f" />
                <text x="30" y="110" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  ATMOSPHERE (Absorbs 14 + Traps 34 = 48)
                </text>

                {/* Earth's Surface (Bottom) */}
                <rect x="0" y="280" width="680" height="120" fill="#14342b" stroke="#10b981" />
                <text x="30" y="310" fill="#34d399" fontSize="11" fontWeight="bold">
                  EARTH&apos;S SURFACE (Absorbs 51 units)
                </text>

                {/* INCOMING SOLAR RADIATION (Gold Beam 100 Units) */}
                <path d="M 120,40 L 120,80" stroke="#facc15" strokeWidth="16" strokeLinecap="round" />
                <text x="120" y="60" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">100</text>

                {/* 1. Albedo Reflected into Space (35 Units) */}
                {/* 27 reflected by Clouds */}
                <path d="M 120,80 Q 140,130 180,40" fill="none" stroke="#e2e8f0" strokeWidth="6" strokeDasharray="3,3" />
                <text x="195" y="50" fill="#e2e8f0" fontSize="10" fontWeight="bold">27 (Clouds)</text>

                {/* 6 scattered by Dust */}
                <path d="M 120,80 Q 210,120 250,40" fill="none" stroke="#94a3b8" strokeWidth="3" />
                <text x="260" y="50" fill="#94a3b8" fontSize="10">6 (Dust)</text>

                {/* 2 reflected by Earth Snow/Ice */}
                <path d="M 120,280 Q 280,260 310,40" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                <text x="320" y="50" fill="#cbd5e1" fontSize="10">2 (Snow/Ice)</text>

                {/* Total Albedo Badge */}
                <rect x="180" y="65" width="160" height="20" rx="5" fill="#334155" />
                <text x="260" y="79" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">
                  ALBEDO = 35 UNITS (Reflected)
                </text>

                {/* 2. Absorbed by Atmosphere (14 Units) */}
                <path d="M 120,80 L 120,160" stroke="#f59e0b" strokeWidth="10" />
                <path d="M 120,160 Q 160,170 180,180" fill="none" stroke="#f59e0b" strokeWidth="4" />
                <text x="190" y="185" fill="#f59e0b" fontSize="10" fontWeight="bold">
                  14 Units (Ozone, Vapor, Dust)
                </text>

                {/* 3. Absorbed by Earth's Surface (51 Units) */}
                <path d="M 120,160 L 120,280" stroke="#facc15" strokeWidth="8" />
                <rect x="70" y="270" width="100" height="24" rx="6" fill="#047857" stroke="#34d399" />
                <text x="120" y="286" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  51 Absorbed
                </text>
                <text x="120" y="325" fill="#a7f3d0" fontSize="9" textAnchor="middle">
                  (34 Direct + 17 Diffuse)
                </text>

                {/* TERRESTRIAL RE-RADIATION (51 Units Leaving Surface) */}
                {/* 1. Direct Radiation to Space (17 Units) */}
                <path d="M 420,280 L 420,40" stroke="#f43f5e" strokeWidth="4" />
                <text x="420" y="35" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">
                  17 to Space
                </text>

                {/* 2. Latent Heat of Condensation (23 Units to Atmosphere) */}
                <path d="M 480,280 L 480,180" stroke="#38bdf8" strokeWidth="5" />
                <text x="480" y="210" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  23 Latent Heat
                </text>

                {/* 3. Convection & Turbulence (9 Units to Atmosphere) */}
                <path d="M 540,280 L 540,195" stroke="#a855f7" strokeWidth="3" />
                <text x="540" y="235" fill="#c084fc" fontSize="10">
                  9 Convection
                </text>

                {/* 4. Radiation Absorbed by Atmosphere (2 Units) */}
                <path d="M 600,280 L 600,210" stroke="#f97316" strokeWidth="2" />
                <text x="600" y="255" fill="#fb923c" fontSize="9">
                  2 Radiation
                </text>

                {/* Atmosphere Radiating to Space (48 Units) */}
                {/* 14 (solar) + 34 (terrestrial) = 48 units */}
                <path d="M 520,160 L 520,40" stroke="#38bdf8" strokeWidth="8" />
                <rect x="470" y="65" width="130" height="22" rx="6" fill="#0369a1" />
                <text x="535" y="80" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  48 from Atmosphere
                </text>

                {/* Final Net Equation Box at Right Bottom */}
                <rect x="360" y="330" width="300" height="50" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" />
                <text x="375" y="350" fill="#34d399" fontSize="10" fontWeight="bold">
                  Total Radiated to Space = 35 (Albedo) + 17 + 48 = 100
                </text>
                <text x="375" y="368" fill="#e2e8f0" fontSize="10">
                  Net Balance: 100 In = 100 Out (Thermal Equilibrium)
                </text>
              </svg>
            </div>
          )}

          {activeTab === "insolation" && (
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              <svg viewBox="0 0 500 500" className="w-full h-full">
                {/* Sun (Left) */}
                <circle cx="50" cy="250" r="35" fill="#facc15" className="animate-pulse" />
                <text x="50" y="255" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">SUN</text>

                {/* Earth Sphere (Center 320, 250, radius 140) */}
                <circle cx="320" cy="250" r="140" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />

                {/* Axis of rotation tilted 23.5° */}
                <line x1="320" y1="80" x2="320" y2="420" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />

                {/* Equator (0°) */}
                <line x1="180" y1="250" x2="460" y2="250" stroke="#facc15" strokeWidth="1.5" />
                <text x="468" y="254" fill="#facc15" fontSize="10">0° Equator</text>

                {/* Tropic of Cancer 23.5°N */}
                <line x1="195" y1="195" x2="445" y2="195" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="452" y="198" fill="#f43f5e" fontSize="9">23°30&apos;N Cancer</text>

                {/* Tropic of Capricorn 23.5°S */}
                <line x1="195" y1="305" x2="445" y2="305" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="452" y="308" fill="#38bdf8" fontSize="9">23°30&apos;S Capricorn</text>

                {/* Parallel Solar Radiation Rays arriving horizontally from Left */}
                {/* Ray to Equator */}
                <line x1="90" y1="250" x2="180" y2="250" stroke="#facc15" strokeWidth="3" />
                {/* Ray to Tropic of Cancer */}
                <line x1="90" y1="195" x2="195" y2="195" stroke="#facc15" strokeWidth="3" />
                {/* Ray to High Latitude 60°N */}
                <line x1="90" y1="140" x2="245" y2="140" stroke="#facc15" strokeWidth="2" strokeDasharray="4,2" />

                {/* Selected Latitude Indicator */}
                {(() => {
                  const latRad = ((latitude) * Math.PI) / 180;
                  const targetY = 250 - 140 * Math.sin(latRad);
                  const targetX = 320 - 140 * Math.cos(latRad);
                  return (
                    <g>
                      <circle cx={targetX} cy={targetY} r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                      <line x1="90" y1={targetY} x2={targetX} y2={targetY} stroke="#10b981" strokeWidth="2" />
                      <text x={targetX + 10} y={targetY - 5} fill="#34d399" fontSize="10" fontWeight="bold">
                        {latitude}° Lat ({incidenceAngle}° angle)
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          )}

          {activeTab === "winds" && (
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              {/* Planetary Circulation Pressure Belts & Cells SVG */}
              <svg viewBox="0 0 500 500" className="w-full h-full">
                {/* Earth Sphere */}
                <circle cx="250" cy="250" r="180" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                {/* Equatorial Low (ITCZ / Doldrums) */}
                <rect x="70" y="235" width="360" height="30" fill="rgba(239, 68, 68, 0.25)" />
                <text x="250" y="254" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Equatorial Low Pressure Belt (ITCZ / Doldrums 0°-5°)
                </text>

                {/* Subtropical Highs (Horse Latitudes 30°-35°N & S) */}
                <rect x="90" y="150" width="320" height="24" fill="rgba(56, 189, 248, 0.25)" />
                <text x="250" y="166" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Sub-Tropical High Pressure (Horse Latitudes 30°N)
                </text>

                <rect x="90" y="326" width="320" height="24" fill="rgba(56, 189, 248, 0.25)" />
                <text x="250" y="342" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Sub-Tropical High Pressure (Horse Latitudes 30°S)
                </text>

                {/* Subpolar Lows (60°N & S) */}
                <rect x="135" y="100" width="230" height="20" fill="rgba(239, 68, 68, 0.2)" />
                <text x="250" y="114" fill="#f87171" fontSize="9" textAnchor="middle">
                  Sub-Polar Low Pressure Belt (60°N)
                </text>

                {/* Planetary Wind Vectors */}
                {/* Northeast Trades (curving to right) */}
                <path d="M 280,180 Q 240,210 220,235" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="260" y="210" fill="#facc15" fontSize="10" fontWeight="bold">Northeast Trades</text>

                {/* Prevailing Westerlies (curving towards subpolar low) */}
                <path d="M 210,145 Q 260,130 280,122" fill="none" stroke="#10b981" strokeWidth="3" />
                <text x="270" y="135" fill="#34d399" fontSize="10" fontWeight="bold">Westerlies</text>

                {/* Polar High (90°N) */}
                <circle cx="250" cy="70" r="12" fill="#38bdf8" />
                <text x="250" y="60" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">North Pole High</text>
              </svg>
            </div>
          )}
        </div>

        {/* Right: Controls & Syllabus Analysis */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/80 p-4 overflow-y-auto space-y-4 text-xs">
          {activeTab === "budget" && (
            <div className="space-y-3.5">
              <div>
                <h3 className="font-bold text-sm text-white">
                  {lang === "hi" ? "ऊष्मा बजट संतुलन विश्लेषण" : "Heat Balance Sheet Analysis"}
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Earth maintains an exact thermodynamic equilibrium. 100 units of solar insolation received equals 100 units returned.
                </p>
              </div>

              {/* Three Component Breakdown */}
              <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-slate-400 font-semibold">1. Planetary Albedo (Reflected):</span>
                  <span className="font-bold text-slate-200">35 Units (35%)</span>
                </div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-slate-400 font-semibold">2. Absorbed by Atmosphere:</span>
                  <span className="font-bold text-amber-400">14 Units (14%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">3. Absorbed by Earth Surface:</span>
                  <span className="font-bold text-emerald-400">51 Units (51%)</span>
                </div>
              </div>

              {/* NCERT Board Question Callout */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>CBSE Exam Core Question</span>
                </div>
                <p className="text-amber-100/90 leading-relaxed text-[11px]">
                  <strong>&quot;Explain the Greenhouse Effect using the Heat Budget.&quot;</strong>
                  The atmosphere is largely transparent to incoming shortwave solar rays (absorbs only 14 units) but is almost opaque to outgoing longwave terrestrial radiation (absorbs 34 of 51 surface units), warming the lower troposphere before re-radiating into space.
                </p>
              </div>
            </div>
          )}

          {activeTab === "insolation" && (
            <div className="space-y-3.5">
              <div>
                <h3 className="font-bold text-sm text-white">
                  {lang === "hi" ? "आपतन कोण एवं सौर तीव्रता" : "Solar Angle & Insolation Calculator"}
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Calculate solar angle of incidence and relative insolation intensity for any latitude on Earth.
                </p>
              </div>

              {/* Season Selection */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">Select Season / Solar Position:</label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setSeason("summer_solstice")}
                    className={`p-2 rounded-xl text-[10px] font-bold border transition ${
                      season === "summer_solstice" ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-950 border-slate-800 text-slate-300"
                    }`}
                  >
                    Summer Solstice (23.5°N)
                  </button>
                  <button
                    onClick={() => setSeason("equinox")}
                    className={`p-2 rounded-xl text-[10px] font-bold border transition ${
                      season === "equinox" ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-950 border-slate-800 text-slate-300"
                    }`}
                  >
                    Equinox (0° Equator)
                  </button>
                  <button
                    onClick={() => setSeason("winter_solstice")}
                    className={`p-2 rounded-xl text-[10px] font-bold border transition ${
                      season === "winter_solstice" ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-slate-950 border-slate-800 text-slate-300"
                    }`}
                  >
                    Winter Solstice (23.5°S)
                  </button>
                </div>
              </div>

              {/* Latitude Slider */}
              <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-300">Observer Latitude:</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">{latitude}° N</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="0.5"
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0° Equator</span>
                  <span>23.5° Tropic</span>
                  <span>66.5° Arctic</span>
                  <span>90° Pole</span>
                </div>
              </div>

              {/* Live Calculations */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Incidence Angle</span>
                  <span className="text-base font-bold text-amber-400">{incidenceAngle}°</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Insolation Power</span>
                  <span className="text-base font-bold text-emerald-400">{relativeInsolation}%</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "winds" && (
            <div className="space-y-3.5">
              <div>
                <h3 className="font-bold text-sm text-white">
                  {lang === "hi" ? "भूमंडलीय पवन परिसंचरण" : "General Atmospheric Circulation"}
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Three-cell model (Hadley, Ferrel, Polar) driven by thermal gradient and Coriolis deflection.
                </p>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2 text-[11px]">
                <div className="font-bold text-emerald-400">1. Hadley Cell (0° to 30°):</div>
                <p className="text-slate-300">
                  Air rises at the warm Equatorial Low (ITCZ), flows poleward aloft, sinks at 30° Subtropical Highs (Horse Latitudes), and returns as Trade Winds.
                </p>

                <div className="font-bold text-sky-400">2. Ferrel Cell (30° to 60°):</div>
                <p className="text-slate-300">
                  Indirect thermally driven cell where sinking air at 30° moves poleward and is deflected by Coriolis force into Prevailing Westerlies.
                </p>

                <div className="font-bold text-indigo-400">3. Polar Cell (60° to 90°):</div>
                <p className="text-slate-300">
                  Dense cold air subsides over Polar High and spreads equator-ward as Polar Easterlies.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

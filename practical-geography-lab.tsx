"use client";

import React, { useState } from "react";
import {
  Compass,
  Ruler,
  Clock,
  Layers,
  BarChart3,
  Globe2,
  Sparkles,
  Calculator,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Database,
} from "lucide-react";

interface PracticalGeographyLabProps {
  onClose?: () => void;
  lang?: "en" | "hi";
}

export default function PracticalGeographyLab({
  onClose,
  lang = "en",
}: PracticalGeographyLabProps) {
  const [activeModule, setActiveModule] = useState<
    "scale" | "time" | "projection" | "contour" | "stats" | "gis"
  >("contour");

  // Module 1: Scale Converter State
  const [rfDenominator, setRfDenominator] = useState<number>(50000);
  const [mapDistanceCm, setMapDistanceCm] = useState<number>(6.4);

  // Module 2: Time Calculator State
  const [baseTimeHour, setBaseTimeHour] = useState<number>(12); // 12:00 PM GMT
  const [targetLongitude, setTargetLongitude] = useState<number>(82.5); // 82°30'E IST
  const [targetDirection, setTargetDirection] = useState<"E" | "W">("E");

  // Module 3: Map Projections
  const [selectedProjection, setSelectedProjection] = useState<"conic" | "mercator">("conic");

  // Module 4: Contour Cross-Section Generator
  const [selectedContourLandform, setSelectedContourLandform] = useState<
    "conical_hill" | "plateau" | "v_valley" | "u_valley" | "cliff" | "ridge"
  >("v_valley");

  // Module 5: Statistics & Thematic Maps
  const [statNumbers, setStatNumbers] = useState<string>("24, 38, 42, 55, 61, 74, 85");

  // Module 6: GIS Buffer & Overlay
  const [gisBufferRadius, setGisBufferRadius] = useState<number>(5); // 5 km buffer
  const [isOverlayActive, setIsOverlayActive] = useState<boolean>(true);

  // Scale Calculations: 1 cm on map = (rfDenominator / 100,000) km
  const groundDistanceKm = ((mapDistanceCm * rfDenominator) / 100000).toFixed(2);
  const groundDistanceMeters = ((mapDistanceCm * rfDenominator) / 100).toFixed(0);

  // Time Calculations: 1 degree = 4 minutes
  const timeDifferenceMins = targetLongitude * 4;
  const timeDiffHours = (timeDifferenceMins / 60).toFixed(1);
  const calculatedTimeMinsTotal =
    targetDirection === "E"
      ? baseTimeHour * 60 + timeDifferenceMins
      : baseTimeHour * 60 - timeDifferenceMins;
  const normalizedHour = Math.floor(((calculatedTimeMinsTotal % 1440) + 1440) % 1440 / 60);
  const normalizedMin = Math.round((((calculatedTimeMinsTotal % 1440) + 1440) % 1440) % 60);

  // Statistics calculation helper
  const parsedNumbers = statNumbers
    .split(",")
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));

  const calcMean =
    parsedNumbers.length > 0
      ? (parsedNumbers.reduce((a, b) => a + b, 0) / parsedNumbers.length).toFixed(2)
      : "0";

  const sortedNumbers = [...parsedNumbers].sort((a, b) => a - b);
  const calcMedian =
    sortedNumbers.length > 0
      ? sortedNumbers.length % 2 === 0
        ? ((sortedNumbers[sortedNumbers.length / 2 - 1] + sortedNumbers[sortedNumbers.length / 2]) / 2).toFixed(2)
        : sortedNumbers[Math.floor(sortedNumbers.length / 2)].toFixed(2)
      : "0";

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-none">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-white">
                {lang === "hi"
                  ? "सीबीएसई भूगोल प्रयोगात्मक कार्य एवं जीआईएस प्रयोगशाला"
                  : "CBSE Practical Geography Lab & Spatial GIS System"}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Class XI & XII Practical
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive scale converter, local time finder, contour cross-sections, and vector GIS buffer analysis
            </p>
          </div>
        </div>

        {/* Module Selector Pills */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveModule("contour")}
            className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
              activeModule === "contour" ? "bg-emerald-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🏔️ {lang === "hi" ? "समोच्च रेखाएं" : "Contour Profiles"}
          </button>
          <button
            onClick={() => setActiveModule("scale")}
            className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
              activeModule === "scale" ? "bg-emerald-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📏 {lang === "hi" ? "मापनी रूपांतरण" : "Scale Lab"}
          </button>
          <button
            onClick={() => setActiveModule("time")}
            className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
              activeModule === "time" ? "bg-emerald-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            ⏰ {lang === "hi" ? "देशांतर व समय" : "Time Calc"}
          </button>
          <button
            onClick={() => setActiveModule("projection")}
            className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
              activeModule === "projection" ? "bg-emerald-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🌐 {lang === "hi" ? "मानचित्र प्रक्षेप" : "Projections"}
          </button>
          <button
            onClick={() => setActiveModule("gis")}
            className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
              activeModule === "gis" ? "bg-emerald-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🛰️ {lang === "hi" ? "जीआईएस बफर व ओवरले" : "GIS Lab"}
          </button>
          <button
            onClick={() => setActiveModule("stats")}
            className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
              activeModule === "stats" ? "bg-emerald-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📊 {lang === "hi" ? "सांख्यिकी माध्य" : "Stats Lab"}
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Dynamic Visualizer */}
        <div className="flex-1 relative flex items-center justify-center p-4 bg-radial from-slate-900 via-slate-950 to-black overflow-hidden">
          {activeModule === "contour" && (
            <div className="relative w-full max-w-xl aspect-[16/11] flex flex-col items-center justify-center">
              {/* Interactive Contour + Elevation Profile Cross-Section SVG */}
              <svg viewBox="0 0 540 360" className="w-full h-full">
                {/* Background */}
                <rect width="540" height="360" fill="#0f172a" rx="10" />

                {/* Top Half: 2D Contour Topographic Map (0 to 180 Y) */}
                <rect x="20" y="20" width="500" height="150" fill="#1e293b" rx="8" stroke="#334155" />
                <text x="35" y="42" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  Topographic Contour Pattern (Plan View)
                </text>

                {/* Section Line A-B */}
                <line x1="50" y1="100" x2="490" y2="100" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,3" />
                <text x="40" y="104" fill="#f43f5e" fontSize="12" fontWeight="bold">A</text>
                <text x="495" y="104" fill="#f43f5e" fontSize="12" fontWeight="bold">B</text>

                {/* Bottom Half: Generated Elevation Cross-Section Profile (200 to 340 Y) */}
                <rect x="20" y="190" width="500" height="150" fill="#1e293b" rx="8" stroke="#334155" />
                <text x="35" y="210" fill="#34d399" fontSize="10" fontWeight="bold">
                  Generated Profile along Section A-B (Elevation in Meters)
                </text>

                {/* Elevation Baseline Grid Lines */}
                <line x1="50" y1="320" x2="490" y2="320" stroke="#475569" strokeWidth="1" />
                <text x="495" y="324" fill="#64748b" fontSize="8">100m</text>

                <line x1="50" y1="280" x2="490" y2="280" stroke="#334155" strokeDasharray="3,3" />
                <text x="495" y="284" fill="#64748b" fontSize="8">200m</text>

                <line x1="50" y1="240" x2="490" y2="240" stroke="#334155" strokeDasharray="3,3" />
                <text x="495" y="244" fill="#64748b" fontSize="8">300m</text>

                {/* Landform Specific Contours & Profile */}
                {selectedContourLandform === "v_valley" && (
                  <g>
                    {/* V-shaped Valley Contours (V pointing upstream to the right) */}
                    <path d="M 120,40 Q 230,100 120,160" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <text x="110" y="45" fill="#f59e0b" fontSize="8">100m</text>
                    <path d="M 180,45 Q 260,100 180,155" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <text x="170" y="50" fill="#f59e0b" fontSize="8">200m</text>
                    <path d="M 240,50 Q 290,100 240,150" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <text x="230" y="55" fill="#f59e0b" fontSize="8">300m</text>

                    {/* River Stream Flow Line (Cyan) */}
                    <line x1="100" y1="100" x2="450" y2="100" stroke="#06b6d4" strokeWidth="3" />
                    <text x="350" y="90" fill="#06b6d4" fontSize="9" fontWeight="bold">River Flow →</text>

                    {/* V-profile in Cross-Section */}
                    <path
                      d="M 50,230 L 270,320 L 490,230 L 490,320 L 50,320 Z"
                      fill="rgba(16, 185, 129, 0.3)"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />
                    <text x="270" y="300" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Deep V-Shaped Valley Floor
                    </text>
                  </g>
                )}

                {selectedContourLandform === "conical_hill" && (
                  <g>
                    {/* Concentric Circles for Conical Hill */}
                    <circle cx="270" cy="100" r="60" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="270" cy="100" r="40" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="270" cy="100" r="20" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <text x="270" y="104" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">400m</text>

                    {/* Symmetrical Bell-shaped Profile */}
                    <path
                      d="M 120,320 Q 270,200 420,320 Z"
                      fill="rgba(245, 158, 11, 0.3)"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />
                    <text x="270" y="250" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Conical Hill Summit
                    </text>
                  </g>
                )}

                {selectedContourLandform === "plateau" && (
                  <g>
                    {/* Concentric Oval with Flat Top */}
                    <ellipse cx="270" cy="100" rx="90" ry="50" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <ellipse cx="270" cy="100" rx="60" ry="30" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <text x="270" y="104" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">300m</text>

                    {/* Tableland Profile (Steep slopes, flat summit) */}
                    <path
                      d="M 100,320 L 180,240 L 360,240 L 440,320 Z"
                      fill="rgba(56, 189, 248, 0.3)"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                    <text x="270" y="232" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Flat Tableland Summit
                    </text>
                  </g>
                )}

                {selectedContourLandform === "cliff" && (
                  <g>
                    {/* Merging Contours */}
                    <path d="M 270,40 L 270,160" stroke="#f43f5e" strokeWidth="4" />
                    <text x="280" y="90" fill="#f43f5e" fontSize="9" fontWeight="bold">Merged Contours = Cliff</text>

                    {/* Vertical Precipice Profile */}
                    <path
                      d="M 100,240 L 270,240 L 270,320 L 440,320 Z"
                      fill="rgba(244, 63, 94, 0.25)"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                    />
                  </g>
                )}
              </svg>
            </div>
          )}

          {activeModule === "gis" && (
            <div className="relative w-full max-w-xl aspect-[16/10] flex items-center justify-center">
              {/* Vector Layer & Buffer Analysis Visualizer SVG */}
              <svg viewBox="0 0 540 340" className="w-full h-full">
                <rect width="540" height="340" fill="#0f172a" rx="10" />

                {/* River Line Vector */}
                <path
                  d="M 40,80 Q 180,180 300,120 T 500,220"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="4"
                />

                {/* Buffer Zone Polygon around River (Dotted equidistant ribbon) */}
                <path
                  d="M 40,80 Q 180,180 300,120 T 500,220"
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.4)"
                  strokeWidth={gisBufferRadius * 6}
                  strokeLinecap="round"
                />
                <text x="140" y="80" fill="#34d399" fontSize="11" fontWeight="bold">
                  {gisBufferRadius} km Buffer Zone (Flood Hazard Assessment)
                </text>

                {/* Settlement Points (Vector Points) */}
                <circle cx="160" cy="110" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <text x="172" y="114" fill="#fca5a5" fontSize="9" fontWeight="bold">Town A (Inside Buffer!)</text>

                <circle cx="380" cy="90" r="7" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                <text x="392" y="94" fill="#93c5fd" fontSize="9">Town B (Safe Zone)</text>

                <circle cx="340" cy="220" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <text x="352" y="224" fill="#fca5a5" fontSize="9" fontWeight="bold">Town C (Inside Buffer!)</text>

                {/* Overlay Grid lines */}
                {isOverlayActive && (
                  <g opacity="0.3">
                    <line x1="40" y1="40" x2="500" y2="40" stroke="#94a3b8" strokeDasharray="3,3" />
                    <line x1="40" y1="120" x2="500" y2="120" stroke="#94a3b8" strokeDasharray="3,3" />
                    <line x1="40" y1="200" x2="500" y2="200" stroke="#94a3b8" strokeDasharray="3,3" />
                    <line x1="40" y1="280" x2="500" y2="280" stroke="#94a3b8" strokeDasharray="3,3" />
                  </g>
                )}

                {/* Attribute Table Window (Bottom Right) */}
                <rect x="220" y="240" width="300" height="85" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="#38bdf8" />
                <text x="235" y="258" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  GIS Linked Attribute Table:
                </text>
                <text x="235" y="278" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
                  ID | Name   | Distance | Buffer Status
                </text>
                <text x="235" y="295" fill="#f87171" fontSize="9" fontFamily="monospace">
                  01 | Town A | 2.1 km   | High Risk (Inside)
                </text>
                <text x="235" y="312" fill="#34d399" fontSize="9" fontFamily="monospace">
                  02 | Town B | 7.8 km   | Safe (Outside)
                </text>
              </svg>
            </div>
          )}

          {activeModule === "scale" && (
            <div className="w-full max-w-md bg-slate-900/90 border border-slate-700 p-5 rounded-2xl shadow-xl space-y-4 text-xs">
              <h3 className="font-bold text-sm text-emerald-400">
                Representative Fraction (R.F.) Distance Lab
              </h3>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">Current Cartographic Scale:</span>
                <div className="text-base font-bold text-white font-mono">
                  1 : {rfDenominator.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400">
                  1 cm on map = {(rfDenominator / 100000).toFixed(2)} km on ground
                </div>
              </div>

              {/* Graphic Scale Bar Preview */}
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Linear Graphic Scale:</span>
                <div className="w-full h-8 flex items-center">
                  <div className="flex-1 border-2 border-white flex h-4">
                    <div className="w-1/4 bg-white text-slate-950 text-[9px] font-bold flex items-center justify-center">0</div>
                    <div className="w-1/4 bg-slate-900 text-white text-[9px] flex items-center justify-center">{(rfDenominator / 100000).toFixed(1)}</div>
                    <div className="w-1/4 bg-white text-slate-950 text-[9px] font-bold flex items-center justify-center">{((rfDenominator * 2) / 100000).toFixed(1)}</div>
                    <div className="w-1/4 bg-slate-900 text-white text-[9px] flex items-center justify-center">{((rfDenominator * 3) / 100000).toFixed(1)} km</div>
                  </div>
                </div>
              </div>

              {/* Calculation Output Box */}
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-1">
                <div className="text-[11px] text-emerald-300 font-semibold">
                  Measurement Calculation Result:
                </div>
                <div className="text-base font-bold text-white">
                  {mapDistanceCm} cm on map = <span className="text-emerald-400">{groundDistanceKm} km</span> ({groundDistanceMeters} m)
                </div>
              </div>
            </div>
          )}

          {activeModule === "time" && (
            <div className="w-full max-w-md bg-slate-900/90 border border-slate-700 p-5 rounded-2xl shadow-xl space-y-4 text-xs">
              <h3 className="font-bold text-sm text-sky-400">
                Longitude to Local Time Calculator (1° = 4 mins)
              </h3>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Prime Meridian (0° GMT):</span>
                  <span className="font-bold text-white font-mono">{baseTimeHour}:00 (12:00 PM Noon)</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1">
                  <span className="text-slate-400">Selected Meridian:</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {targetLongitude}° {targetDirection} ({targetDirection === "E" ? "Ahead" : "Behind"})
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1">
                  <span className="text-slate-400">Time Difference:</span>
                  <span className="font-bold text-amber-400 font-mono">
                    {timeDiffHours} Hours ({timeDifferenceMins} minutes)
                  </span>
                </div>
              </div>

              {/* Final Local Time Result */}
              <div className="p-3.5 bg-sky-500/10 border border-sky-500/30 rounded-xl">
                <span className="text-[11px] text-sky-300 font-semibold block">Calculated Local Time:</span>
                <div className="text-xl font-bold text-white font-mono mt-0.5">
                  {String(normalizedHour).padStart(2, "0")}:{String(normalizedMin).padStart(2, "0")}{" "}
                  {normalizedHour >= 12 ? "PM" : "AM"}
                </div>
                {targetLongitude === 82.5 && targetDirection === "E" && (
                  <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                    ✓ Matches Indian Standard Time (IST = GMT + 5:30)
                  </span>
                )}
              </div>
            </div>
          )}

          {activeModule === "projection" && (
            <div className="w-full max-w-md bg-slate-900/90 border border-slate-700 p-5 rounded-2xl shadow-xl space-y-3 text-xs">
              <h3 className="font-bold text-sm text-indigo-400">
                Map Projection Mathematical Characteristics
              </h3>

              {selectedProjection === "conic" ? (
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="font-bold text-amber-400 text-xs block">Conical with One Standard Parallel (45°N)</span>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      Constructed using a cone tangent to the globe along the standard parallel. Parallels are concentric arcs of circles; meridians are straight lines radiating from the apex.
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <div>• <strong>Standard Parallel:</strong> True to scale (zero distortion).</div>
                    <div>• <strong>Best Suited:</strong> Mid-latitude countries with east-west extent (e.g. Trans-Siberian Railway corridor, USA).</div>
                    <div>• <strong>Limitations:</strong> Not suitable for world maps; extreme distortion at poles and equator.</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="font-bold text-sky-400 text-xs block">Mercator&apos;s Cylindrical Projection</span>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      Conformal cylindrical projection where meridians and parallels intersect at 90°. Preserves true shapes (orthomorphic) but enormously inflates area at high latitudes.
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <div>• <strong>Rhumb Line / Loxodrome:</strong> Straight line of constant compass bearing.</div>
                    <div>• <strong>Best Suited:</strong> Standard global marine navigation charts worldwide.</div>
                    <div>• <strong>Greenland Paradox:</strong> Appears larger than South America on map, whereas South America is actually 8 times larger in reality!</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeModule === "stats" && (
            <div className="w-full max-w-md bg-slate-900/90 border border-slate-700 p-5 rounded-2xl shadow-xl space-y-3 text-xs">
              <h3 className="font-bold text-sm text-amber-400">
                Class XII Statistical Processing Lab
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Arithmetic Mean</span>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{calcMean}</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Median</span>
                  <div className="text-lg font-bold text-sky-400 font-mono mt-0.5">{calcMedian}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <span className="font-semibold text-white block">Thematic Mapping Rules:</span>
                <div>• <strong>Choropleth:</strong> Used for density, ratios, and percentages (e.g. Literacy % or Population Density).</div>
                <div>• <strong>Dot Map:</strong> Used for absolute quantities (1 dot = 100,000 rural residents).</div>
                <div>• <strong>Isopleth:</strong> Used for continuous lines of equal quantity (Isotherms, Isohyets).</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Interactive Controls Panel */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/80 p-4 overflow-y-auto space-y-4 text-xs">
          {activeModule === "contour" && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white">Select Relief Landform:</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "v_valley", label: "V-Shaped Valley" },
                  { id: "conical_hill", label: "Conical Hill" },
                  { id: "plateau", label: "Plateau" },
                  { id: "cliff", label: "Cliff / Precipice" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedContourLandform(item.id as any)}
                    className={`p-2 rounded-xl text-left border text-[11px] font-semibold transition ${
                      selectedContourLandform === item.id
                        ? "bg-emerald-500 text-white border-emerald-400"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <strong className="text-amber-400 block">CBSE Practical Rule:</strong>
                When contours are close together, slope is steep; when far apart, slope is gentle. In river valleys, contours form a V pointing UPSTREAM.
              </div>
            </div>
          )}

          {activeModule === "scale" && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white">Adjust Scale Parameters:</h3>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Standard SOI Toposheet Scale:</label>
                <select
                  value={rfDenominator}
                  onChange={(e) => setRfDenominator(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white"
                >
                  <option value="50000">1:50,000 (Standard SOI Toposheet)</option>
                  <option value="25000">1:25,000 (Special SOI Quadrangle)</option>
                  <option value="250000">1:250,000 (Degree Sheet)</option>
                  <option value="1000000">1:1,000,000 (Million Sheet)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-300 mb-1">
                  <span>Map Measurement:</span>
                  <span className="text-emerald-400 font-mono">{mapDistanceCm} cm</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.1"
                  value={mapDistanceCm}
                  onChange={(e) => setMapDistanceCm(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeModule === "time" && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white">Adjust Longitude Coordinates:</h3>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Target Longitude (°):</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="180"
                    step="0.5"
                    value={targetLongitude}
                    onChange={(e) => setTargetLongitude(Number(e.target.value))}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono"
                  />
                  <select
                    value={targetDirection}
                    onChange={(e) => setTargetDirection(e.target.value as any)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 text-white font-bold"
                  >
                    <option value="E">East (Ahead)</option>
                    <option value="W">West (Behind)</option>
                  </select>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  onClick={() => {
                    setTargetLongitude(82.5);
                    setTargetDirection("E");
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[10px] font-semibold border border-slate-700"
                >
                  🇮🇳 Mirzapur IST (82°30&apos;E)
                </button>
                <button
                  onClick={() => {
                    setTargetLongitude(74);
                    setTargetDirection("W");
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-[10px] font-semibold border border-slate-700"
                >
                  🇺🇸 New York (74°W)
                </button>
                <button
                  onClick={() => {
                    setTargetLongitude(139);
                    setTargetDirection("E");
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-semibold border border-slate-700"
                >
                  🇯🇵 Tokyo (139°E)
                </button>
                <button
                  onClick={() => {
                    setTargetLongitude(180);
                    setTargetDirection("E");
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 text-[10px] font-semibold border border-slate-700"
                >
                  🌐 Date Line (180°)
                </button>
              </div>
            </div>
          )}

          {activeModule === "projection" && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white">Compare Projection Type:</h3>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedProjection("conic")}
                  className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition ${
                    selectedProjection === "conic" ? "bg-indigo-600 text-white border-indigo-400" : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  Conical Projection with 1 Standard Parallel
                </button>
                <button
                  onClick={() => setSelectedProjection("mercator")}
                  className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition ${
                    selectedProjection === "mercator" ? "bg-indigo-600 text-white border-indigo-400" : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  Mercator&apos;s Cylindrical Projection
                </button>
              </div>
            </div>
          )}

          {activeModule === "gis" && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white">GIS Proximity & Overlay Controls:</h3>

              <div>
                <div className="flex justify-between font-semibold text-slate-300 mb-1">
                  <span>River Flood Buffer Distance:</span>
                  <span className="text-emerald-400 font-mono">{gisBufferRadius} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={gisBufferRadius}
                  onChange={(e) => setGisBufferRadius(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-slate-300">Spatial Overlay Grid:</span>
                <button
                  onClick={() => setIsOverlayActive(!isOverlayActive)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition ${
                    isOverlayActive ? "bg-emerald-500 text-slate-950 border-emerald-400" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {isOverlayActive ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          )}

          {activeModule === "stats" && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-white">Input Frequency Data:</h3>
              <input
                type="text"
                value={statNumbers}
                onChange={(e) => setStatNumbers(e.target.value)}
                placeholder="24, 38, 42, 55, 61"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs"
              />
              <p className="text-[10px] text-slate-400">
                Comma-separated values of state crop yields or district population counts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { X, Mountain, Info, Compass, Sparkles } from "lucide-react";

interface ElevationProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ElevationProfileModal({
  isOpen,
  onClose,
}: ElevationProfileModalProps) {
  const [selectedZone, setSelectedZone] = useState<number>(0);

  if (!isOpen) return null;

  const physiographicZones = [
    {
      name: "Greater Himalayas (Himadri)",
      elevation: "6,000 m+",
      width: "25 km",
      rocks: "Crystalline Granite Core",
      color: "#38bdf8",
      ncertDescription:
        "The highest and most continuous range. Perennially snowbound with prominent glaciers (Gangotri, Yamunotri) feeding perennial antecedent rivers.",
      keyFeatures: ["Asymmetrical folds", "Permafrost", "Highest peaks: Everest, Kanchenjunga", "Zoji La & Shipki La passes"],
      examTip: "Himadri is composed of archaean granites and gneisses covered by sedimentary rocks.",
    },
    {
      name: "Lesser Himalayas (Himachal)",
      elevation: "3,700 - 4,500 m",
      width: "60 - 80 km",
      rocks: "Highly compressed & altered rocks",
      color: "#0ea5e9",
      ncertDescription:
        "Rugged mountain system with longitudinal valleys called 'Duns' (Dehradun, Kotli Dun, Patli Dun) between Lesser Himalayas and Shiwaliks.",
      keyFeatures: ["Pir Panjal range (longest)", "Dhauladhar & Mahabharat ranges", "Famous hill stations: Shimla, Mussoorie, Nainital"],
      examTip: "Duns are longitudinal structural valleys formed when rivers were temporarily dammed.",
    },
    {
      name: "Shiwalik Range (Outer Himalayas)",
      elevation: "900 - 1,100 m",
      width: "10 - 50 km",
      rocks: "Unconsolidated fluvial sediments",
      color: "#0284c7",
      ncertDescription:
        "Outermost range formed of unconsolidated river sediments brought down by rivers from main ranges. Highly prone to earthquakes and landslides.",
      keyFeatures: ["Prone to soil erosion and chos (seasonal torrents)", "Thick gravel and alluvium cover", "Southern steep slope"],
      examTip: "Shiwaliks are absent in eastern India (east of Tista river).",
    },
    {
      name: "Bhabar Belt",
      elevation: "300 m",
      width: "8 - 10 km narrow strip",
      rocks: "Pebbles, gravels & boulders",
      color: "#f59e0b",
      ncertDescription:
        "Porous alluvial fans deposited by Himalayan streams at the foothills. The porosity of pebble beds is so high that all small streams disappear underground here.",
      keyFeatures: ["Streams flow underground", "Unfit for agriculture (too rocky/dry surface)", "Runs parallel to Shiwalik foothills"],
      examTip: "Guaranteed 2-mark CBSE question: Why do Himalayan rivers disappear in the Bhabar zone?",
    },
    {
      name: "Terai Belt",
      elevation: "200 m",
      width: "15 - 30 km marshy tract",
      rocks: "Fine silt & clay alluvium",
      color: "#10b981",
      ncertDescription:
        "Lies south of Bhabar where underground streams re-emerge creating a marshy, damp, waterlogged tract with luxurious natural vegetation and rich wildlife (Jim Corbett / Dudhwa).",
      keyFeatures: ["Streams re-emerge on surface", "Waterlogged / marshy conditions", "Cleared for sugarcane, rice and wheat farming post-partition"],
      examTip: "Differentiate between Bhabar (porous/pebbly) and Terai (marshy/fine-grained).",
    },
    {
      name: "Bhangar (Old Alluvium)",
      elevation: "150 m",
      width: "Vast upper terraces",
      rocks: "Clayey loam with Kankar nodules",
      color: "#d97706",
      ncertDescription:
        "Older alluvium lying above the flood limits of rivers forming terraces. Contains calcareous deposits known locally as 'Kankar'. Darker, less fertile than Khadar.",
      keyFeatures: ["Terrace-like features above flood levels", "Calcareous Kankar concretions", "Less prone to annual flooding"],
      examTip: "Bhangar represents the old alluvium, while Khadar represents the new active flood plain.",
    },
    {
      name: "Khadar (New Active Floodplain)",
      elevation: "80 - 120 m",
      width: "Active river valleys & deltas",
      rocks: "Fine silt, mud & sand",
      color: "#eab308",
      ncertDescription:
        "Newer alluvium deposited by annual river floods. Extremely fine, soft, and naturally replenished every year, making it the most fertile agricultural soil in India.",
      keyFeatures: ["Renewed annually by monsoon floods", "Intensive multi-cropping (paddy, jute)", "High water table"],
      examTip: "Ideal for high-yield agriculture in Bihar, Bengal, and eastern UP.",
    },
    {
      name: "Peninsular Plateau / Deccan Trap",
      elevation: "600 - 900 m",
      width: "1,600,000 sq km",
      rocks: "Cretaceous Basaltic Lava",
      color: "#64748b",
      ncertDescription:
        "Triangular tableland composed of old crystalline, igneous, and metamorphic rocks. Formed during breaking and drifting of Gondwana land. Slopes gently eastward.",
      keyFeatures: ["Black regur soil (cotton realm)", "Mineral treasurehouse (Chota Nagpur)", "Bounded by Western & Eastern Ghats"],
      examTip: "Peninsular block is the oldest and most stable geological landmass of India.",
    },
  ];

  const current = physiographicZones[selectedZone];

  return (
    <div className="fixed inset-0 z-1100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <Mountain className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-bold text-base text-white">
                CBSE 3D Terrain Profile: North-South Physiographic Cross-Section of India
              </h2>
              <p className="text-xs text-slate-400">
                NCERT Class XI - India: Physical Environment, Chapter 2 (Structure & Physiography)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive SVG Elevation Cross-Section */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 overflow-x-auto">
          <div className="min-w-[700px] select-none">
            <svg viewBox="0 0 800 240" className="w-full h-56">
              {/* Sky background */}
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#081b2e" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <rect width="800" height="240" fill="url(#skyGrad)" rx="8" />

              {/* Elevation Reference Grid Lines */}
              <line x1="40" y1="30" x2="780" y2="30" stroke="#334155" strokeDasharray="3,3" />
              <text x="10" y="34" fill="#64748b" fontSize="9" fontFamily="monospace">6000m</text>

              <line x1="40" y1="80" x2="780" y2="80" stroke="#334155" strokeDasharray="3,3" />
              <text x="10" y="84" fill="#64748b" fontSize="9" fontFamily="monospace">3500m</text>

              <line x1="40" y1="140" x2="780" y2="140" stroke="#334155" strokeDasharray="3,3" />
              <text x="10" y="144" fill="#64748b" fontSize="9" fontFamily="monospace">1000m</text>

              <line x1="40" y1="190" x2="780" y2="190" stroke="#334155" strokeDasharray="3,3" />
              <text x="15" y="194" fill="#64748b" fontSize="9" fontFamily="monospace">200m</text>

              {/* Shaded Terrain Profile Polygon */}
              <path
                d="
                  M 40,220
                  L 50,30
                  L 90,65
                  L 130,40
                  L 170,95
                  L 210,85
                  L 250,145
                  L 280,140
                  L 310,185
                  L 360,195
                  L 430,192
                  L 500,205
                  L 560,200
                  L 620,165
                  L 700,160
                  L 760,190
                  L 780,220
                  Z
                "
                fill="url(#terrainGrad)"
                stroke="#10b981"
                strokeWidth="2"
              />

              <linearGradient id="terrainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
              </linearGradient>

              {/* Zone Highlight Clickable Regions & Badges */}
              {/* 0. Greater Himalayas */}
              <circle
                cx="90"
                cy="45"
                r={selectedZone === 0 ? "10" : "7"}
                fill={selectedZone === 0 ? "#38bdf8" : "#0284c7"}
                className="cursor-pointer transition-all"
                onClick={() => setSelectedZone(0)}
              />
              <text x="90" y="22" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                Himadri
              </text>

              {/* 1. Lesser Himalayas */}
              <circle
                cx="190"
                cy="90"
                r={selectedZone === 1 ? "10" : "7"}
                fill={selectedZone === 1 ? "#38bdf8" : "#0ea5e9"}
                className="cursor-pointer"
                onClick={() => setSelectedZone(1)}
              />
              <text x="190" y="78" fill="#38bdf8" fontSize="10" textAnchor="middle">
                Himachal
              </text>

              {/* 2. Shiwaliks */}
              <circle
                cx="265"
                cy="142"
                r={selectedZone === 2 ? "10" : "7"}
                fill={selectedZone === 2 ? "#38bdf8" : "#0284c7"}
                className="cursor-pointer"
                onClick={() => setSelectedZone(2)}
              />
              <text x="265" y="132" fill="#0284c7" fontSize="10" textAnchor="middle">
                Shiwalik
              </text>

              {/* 3. Bhabar */}
              <circle
                cx="335"
                cy="190"
                r={selectedZone === 3 ? "10" : "7"}
                fill={selectedZone === 3 ? "#f59e0b" : "#d97706"}
                className="cursor-pointer"
                onClick={() => setSelectedZone(3)}
              />
              <text x="335" y="178" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                Bhabar
              </text>

              {/* 4. Terai */}
              <circle
                cx="395"
                cy="194"
                r={selectedZone === 4 ? "10" : "7"}
                fill={selectedZone === 4 ? "#10b981" : "#059669"}
                className="cursor-pointer"
                onClick={() => setSelectedZone(4)}
              />
              <text x="395" y="182" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                Terai
              </text>

              {/* 5. Bhangar */}
              <circle
                cx="465"
                cy="196"
                r={selectedZone === 5 ? "10" : "7"}
                fill={selectedZone === 5 ? "#d97706" : "#b45309"}
                className="cursor-pointer"
                onClick={() => setSelectedZone(5)}
              />
              <text x="465" y="184" fill="#d97706" fontSize="10" textAnchor="middle">
                Bhangar
              </text>

              {/* 6. Khadar */}
              <circle
                cx="530"
                cy="203"
                r={selectedZone === 6 ? "10" : "7"}
                fill={selectedZone === 6 ? "#eab308" : "#ca8a04"}
                className="cursor-pointer"
                onClick={() => setSelectedZone(6)}
              />
              <text x="530" y="192" fill="#eab308" fontSize="10" fontWeight="bold" textAnchor="middle">
                Khadar
              </text>

              {/* 7. Deccan Plateau */}
              <circle
                cx="660"
                cy="162"
                r={selectedZone === 7 ? "10" : "7"}
                fill={selectedZone === 7 ? "#94a3b8" : "#64748b"}
                className="cursor-pointer"
                onClick={() => setSelectedZone(7)}
              />
              <text x="660" y="150" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                Deccan
              </text>

              {/* North to South Arrow */}
              <text x="70" y="234" fill="#10b981" fontSize="10" fontWeight="bold">NORTH (Tibetan Border)</text>
              <text x="650" y="234" fill="#10b981" fontSize="10" fontWeight="bold">SOUTH (Peninsular India)</text>
            </svg>
          </div>
        </div>

        {/* Zone Selector Buttons */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap gap-1.5">
          {physiographicZones.map((z, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedZone(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedZone === idx
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {z.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Selected Zone Deep Dive */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Physiographic Division {selectedZone + 1} of 8
              </span>
              <h3 className="text-base font-bold text-white">{current.name}</h3>
            </div>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-slate-200">
                Alt: {current.elevation}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-slate-200">
                Width: {current.width}
              </span>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            {current.ncertDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                Key Distinctive Features
              </span>
              <ul className="space-y-1 text-slate-300">
                {current.keyFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CBSE Board Exam Takeaway</span>
              </span>
              <p className="text-amber-200 leading-relaxed">{current.examTip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

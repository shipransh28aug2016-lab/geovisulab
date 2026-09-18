"use client";

import React, { useState } from "react";
import {
  Layers,
  Activity,
  Flame,
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  Info,
  Maximize2,
  Sliders,
} from "lucide-react";

interface EarthInteriorSimulatorProps {
  onClose?: () => void;
  lang?: "en" | "hi";
}

export default function EarthInteriorSimulator({
  onClose,
  lang = "en",
}: EarthInteriorSimulatorProps) {
  const [activeTab, setActiveTab] = useState<"layers" | "seismic" | "volcanic">("seismic");
  const [selectedLayer, setSelectedLayer] = useState<number>(2); // Asthenosphere default
  const [epicenterAngle, setEpicenterAngle] = useState<number>(0); // 0 degrees (North Pole)
  const [receiverAngle, setReceiverAngle] = useState<number>(120); // In P/S shadow zone
  const [waveSpeed, setWaveSpeed] = useState<"slow" | "normal">("normal");
  const [selectedVolcanoLandform, setSelectedVolcanoLandform] = useState<string>("batholith");

  // Earth Concentric Shells Data
  const earthLayers = [
    {
      nameEn: "Continental & Oceanic Crust",
      nameHi: "महाद्वीपीय एवं महासागरीय क्रस्ट",
      depth: "0 - 35 km",
      density: "2.7 - 3.0 g/cm³",
      state: "Rigid Solid (SIAL & SIMA)",
      temperature: "Up to 500°C",
      color: "#94a3b8",
      descriptionEn: "The brittle outermost shell. Continental crust (SIAL) is thicker (~30-70 km under mountains like Himalayas) and lighter. Oceanic crust (SIMA) is thin (5 km) and composed of dense basalt.",
      descriptionHi: "पृथ्वी का सबसे ऊपरी भंगुर आवरण। महाद्वीपीय क्रस्ट (सियाल) 30-70 किमी मोटा और हल्का है। महासागरीय क्रस्ट (सिमा) केवल 5 किमी मोटा और भारी बेसाल्ट से निर्मित है।"
    },
    {
      nameEn: "Mohorovičić Discontinuity (Moho)",
      nameHi: "मोहोरोविसिक असांतत्य (मोहो सीमा)",
      depth: "35 km average",
      density: "Jumps from 3.0 to 3.4 g/cm³",
      state: "Transitional Boundary",
      temperature: "~600°C",
      color: "#f59e0b",
      descriptionEn: "Discovered by Andrija Mohorovičić in 1909. Seismic P-wave velocity abruptly accelerates from 6.0 km/s to 8.1 km/s, marking the transition from crustal rock to dense peridotite mantle.",
      descriptionHi: "क्रस्ट और मेंटल के बीच की सीमा। यहां P-तरंगों का वेग अचानक 6.0 से बढ़कर 8.1 किमी/सेकंड हो जाता है, जिससे घने मेंटल का पता चलता है।"
    },
    {
      nameEn: "Asthenosphere (Low Velocity Zone)",
      nameHi: "दुर्बलतामंडल (निम्न गति मंडल)",
      depth: "70 - 250 km",
      density: "3.4 - 3.5 g/cm³",
      state: "Semi-molten / Plastic Ductile",
      temperature: "1,100°C - 1,400°C",
      color: "#ea580c",
      descriptionEn: "Upper ductile mantle. High temperatures near melting point allow rocks to deform plastically over millions of years. Acts as the lubricating layer over which rigid lithospheric plates glide and serves as the primary reservoir of magma for volcanoes.",
      descriptionHi: "ऊपरी मेंटल का अर्ध-पिघला हुआ प्लास्टिक भाग। विवर्तनिक प्लेटें इसी के ऊपर फिसलती हैं और ज्वालामुखियों का मुख्य मैग्मा स्रोत यही है।"
    },
    {
      nameEn: "Mesosphere / Lower Mantle",
      nameHi: "मध्यमंडल / निचला मेंटल",
      depth: "660 - 2,900 km",
      density: "4.4 - 5.6 g/cm³",
      state: "Solid under intense pressure (Bridgmanite)",
      temperature: "1,500°C - 3,000°C",
      color: "#c2410c",
      descriptionEn: "Extends from 660 km down to the Gutenberg discontinuity at 2,900 km. Accounts for nearly 84% of Earth's total volume and 67% of its mass. Generates slow thermal convection currents driving continental drift.",
      descriptionHi: "660 किमी से 2,900 किमी तक। पृथ्वी के कुल आयतन का 84% और द्रव्यमान का 67%। यहां के संवहन प्रवाह महाद्वीपीय विस्थापन को गति देते हैं।"
    },
    {
      nameEn: "Gutenberg Discontinuity & Outer Core",
      nameHi: "गुटेनबर्ग असांतत्य एवं बाह्य क्रोड",
      depth: "2,900 - 5,150 km",
      density: "9.9 - 12.2 g/cm³",
      state: "Liquid Molten Iron & Nickel (NIFE)",
      temperature: "4,000°C - 5,000°C",
      color: "#dc2626",
      descriptionEn: "Discovered by Beno Gutenberg (1914). Because S-waves are transverse shear waves, they CANNOT travel through liquid and abruptly vanish at 2,900 km. Vigorous convection in this molten iron-nickel ocean generates Earth's geomagnetic protective dynamo.",
      descriptionHi: "तरल लौह-निकल से निर्मित। S-तरंगें तरल में नहीं चल सकतीं अतः 2,900 किमी पर पूरी तरह लुप्त हो जाती हैं। यहां का संवहन पृथ्वी का चुंबकीय क्षेत्र उत्पन्न करता है।"
    },
    {
      nameEn: "Inner Core (NIFE)",
      nameHi: "आंतरिक क्रोड (निफे)",
      depth: "5,150 - 6,371 km",
      density: "13.0 - 13.6 g/cm³",
      state: "Solid Metallic Sphere (Extreme Pressure 3.6M atm)",
      temperature: "~6,000°C (Hot as Sun's surface)",
      color: "#facc15",
      descriptionEn: "Solid ball with radius of ~1,220 km. Despite exceeding the melting point of iron, astronomical hydrostatic pressure keeps it crystalline solid. Discovered by Inge Lehmann in 1936 via faint P-wave reflections.",
      descriptionHi: "अत्यधिक दबाव (36 लाख वायुमंडलीय दाब) के कारण 6,000°C पर भी ठोस अवस्था में। 1936 में इंगे लेहमान ने P-तरंग परावर्तन से इसकी खोज की।"
    }
  ];

  // Volcanic Intrusive Landforms (NCERT Ch 3)
  const volcanicLandforms = [
    {
      id: "batholith",
      nameEn: "Batholith",
      nameHi: "बैथोलिथ (पातालीय पिंड)",
      shape: "Huge Granitic Core",
      color: "#ef4444",
      descriptionEn: "Massive plutonic granitic body formed deep within Earth's crust when a large magma chamber cools slowly. Forms the core of major mountain ranges and is exposed only after extensive denudation (e.g. Ranchi batholith).",
      descriptionHi: "विशाल मैग्मा पिंड जो धरातल के अत्यंत नीचे ठंडा होकर ठोस बनता है। यह विशाल पर्वतों का क्रोड बनाता है और अपरदन के बाद ही धरातल पर दिखता है।"
    },
    {
      id: "laccolith",
      nameEn: "Laccolith",
      nameHi: "लैकोलिथ (गुंबदनुमा पिंड)",
      shape: "Mushroom / Dome with Flat Base",
      color: "#f97316",
      descriptionEn: "Large dome-shaped intrusive body with a level base, connected by a pipe-like conduit from below. Resembles an intrusive mushroom pushing up overlying sedimentary strata (e.g. Karnataka plateau granite domes).",
      descriptionHi: "समतल तल और गुंबदनुमा शिखर वाला मैग्मा पिंड। यह नीचे से एक नली द्वारा मैग्मा से जुड़ा होता है और ऊपर की परतों को ऊपर उठा देता है।"
    },
    {
      id: "lopolith",
      nameEn: "Lopolith",
      nameHi: "लोपोलिथ (तश्तरीनुमा पिंड)",
      shape: "Saucer-shaped Shallow Basin",
      color: "#eab308",
      descriptionEn: "Saucer-shaped or concave basin-like intrusive body formed when lava solidifies in a shallow synclinal depression.",
      descriptionHi: "तश्तरी या उथले कटोरे के आकार का मैग्मा जमाव, जो किसी अभिनति या धंसी हुई घाटी में जमने से बनता है।"
    },
    {
      id: "phacolith",
      nameEn: "Phacolith",
      nameHi: "फैकोलिथ (लहरदार पिंड)",
      shape: "Wavy lens along folds",
      color: "#10b981",
      descriptionEn: "Lens-shaped mass of igneous rock occupying the crest of an anticline or the trough of a syncline in folded mountain regions.",
      descriptionHi: "वलित पर्वतीय क्षेत्रों में अपनति (उभार) के शिखर अथवा अभिनति (गर्त) के तल में लेंस के आकार का मैग्मा जमाव।"
    },
    {
      id: "sill",
      nameEn: "Sill / Sheet",
      nameHi: "सिल / पत्र",
      shape: "Concordant Horizontal Sheet",
      color: "#06b6d4",
      descriptionEn: "Near-horizontal intrusive sheet of solidified lava parallel to the bedding planes of sedimentary strata. Thinner layers (<1m) are called sheets.",
      descriptionHi: "अवसादी शैलों की परतों के समानांतर क्षैतिज रूप से जमा हुआ मैग्मा पत्र। पतली परतों को 'शीट' कहते हैं।"
    },
    {
      id: "dyke",
      nameEn: "Dyke (Dike)",
      nameHi: "डाइक (दीवारनुमा पिंड)",
      shape: "Discordant Vertical Wall",
      color: "#8b5cf6",
      descriptionEn: "Vertical or steeply inclined wall-like intrusive body formed when magma forces its way into fractures and fissures cutting across bedding planes (e.g. western Maharashtra Deccan fissures).",
      descriptionHi: "दरारों में लंबवत दीवार की भांति जमा हुआ मैग्मा, जो शैलों के संस्तरों को आर-पार काटता है (उदा. महाराष्ट्र दक्कन ट्रैप)।"
    }
  ];

  // Calculate Seismic Wave Zone based on angular distance from Epicenter
  const angularDistance = Math.abs((receiverAngle - epicenterAngle + 360) % 360);
  const normalizedDistance = angularDistance > 180 ? 360 - angularDistance : angularDistance;

  let waveStatus: "BOTH" | "P_SHADOW" | "S_SHADOW" | "P_ONLY" = "BOTH";
  if (normalizedDistance <= 105) {
    waveStatus = "BOTH"; // Both P and S waves arrive
  } else if (normalizedDistance > 105 && normalizedDistance <= 142) {
    waveStatus = "P_SHADOW"; // Complete shadow zone: neither P nor S
  } else {
    waveStatus = "P_ONLY"; // P-waves re-emerge refracted; S-waves never arrive
  }

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-none">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center text-white shadow-lg">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-white">
                {lang === "hi"
                  ? "पृथ्वी की आंतरिक संरचना एवं भूकंपीय तरंग सिमुलेटर"
                  : "Earth's Interior & Seismic Wave Shadow Zone Simulator"}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                NCERT Class 11 Ch 3
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive cutaway Earth, seismic P & S ray tracing, Mohorovičić & Gutenberg discontinuities
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("seismic")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "seismic"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            〰️ {lang === "hi" ? "भूकंपीय छाया क्षेत्र" : "Seismic Shadow Zones"}
          </button>
          <button
            onClick={() => setActiveTab("layers")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "layers"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🌍 {lang === "hi" ? "क्रस्ट-मेंटल-क्रोड" : "Concentric Shells"}
          </button>
          <button
            onClick={() => setActiveTab("volcanic")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === "volcanic"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🌋 {lang === "hi" ? "ज्वालामुखी स्थलरूप" : "Intrusive Volcanics"}
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Interactive Canvas Visualization */}
        <div className="flex-1 relative flex items-center justify-center p-4 bg-radial from-slate-900 via-slate-950 to-black overflow-hidden">
          {activeTab === "seismic" && (
            <div className="relative w-full max-w-xl aspect-square flex items-center justify-center">
              <svg viewBox="0 0 500 500" className="w-full h-full max-h-[480px]">
                {/* Background Shadow Zone Wedges */}
                <defs>
                  {/* Radial gradient for glowing liquid outer core */}
                  <radialGradient id="coreLiquidGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="70%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </radialGradient>
                  {/* Solid inner core */}
                  <radialGradient id="coreSolidGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#facc15" />
                  </radialGradient>
                </defs>

                {/* 1. Earth Crust Outer Circle (Radius 200, center 250, 250) */}
                <circle cx="250" cy="250" r="200" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />

                {/* Shadow Zone Wedges from Epicenter (Top 250, 50) */}
                {/* Left Shadow Zone: 105° to 142° */}
                <path
                  d="M 250,250 L 57,302 A 200,200 0 0,0 92,374 Z"
                  fill="rgba(244, 63, 94, 0.25)"
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                {/* Right Shadow Zone: 105° to 142° */}
                <path
                  d="M 250,250 L 443,302 A 200,200 0 0,1 408,374 Z"
                  fill="rgba(244, 63, 94, 0.25)"
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />

                {/* Solid Mantle (Radius 195) */}
                <circle cx="250" cy="250" r="192" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />

                {/* Liquid Outer Core (Radius 110 at 2,900 km depth) - STOPS S-WAVES */}
                <circle cx="250" cy="250" r="108" fill="url(#coreLiquidGrad)" stroke="#ef4444" strokeWidth="2" />

                {/* Solid Inner Core (Radius 45 at 5,150 km depth) */}
                <circle cx="250" cy="250" r="42" fill="url(#coreSolidGrad)" stroke="#facc15" strokeWidth="2" />

                {/* Seismic Ray Traces from Epicenter (Top: 250, 58) */}
                {/* P-waves in Direct Zone (Green lines curving in mantle 0° to 105°) */}
                {[-100, -80, -60, -40, -20, 20, 40, 60, 80, 100].map((angle, i) => {
                  const rad = ((angle + 90) * Math.PI) / 180;
                  const endX = 250 + 196 * Math.cos(rad);
                  const endY = 250 - 196 * Math.sin(rad);
                  const cpX = 250 + 115 * Math.cos(rad);
                  const cpY = 250 - 115 * Math.sin(rad);
                  return (
                    <path
                      key={i}
                      d={`M 250,54 Q ${cpX},${cpY} ${endX},${endY}`}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.8"
                      opacity="0.85"
                    />
                  );
                })}

                {/* Refracted P-waves passing through Core to 142°-180° */}
                {[-170, -155, 180, 155, 170].map((angle, i) => {
                  const rad = ((angle + 90) * Math.PI) / 180;
                  const endX = 250 + 196 * Math.cos(rad);
                  const endY = 250 - 196 * Math.sin(rad);
                  return (
                    <path
                      key={`core-${i}`}
                      d={`M 250,54 L 250,142 L ${250 + 40 * Math.sin(rad)},${250 + 40 * Math.cos(rad)} L ${endX},${endY}`}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      opacity="0.9"
                    />
                  );
                })}

                {/* S-waves (Red dashed lines blocked at 2,900 km core boundary) */}
                {[-75, -45, 0, 45, 75].map((angle, i) => {
                  const rad = ((angle + 90) * Math.PI) / 180;
                  const midX = 250 + 108 * Math.cos(rad);
                  const midY = 250 - 108 * Math.sin(rad);
                  return (
                    <line
                      key={`swave-${i}`}
                      x1="250"
                      y1="54"
                      x2={midX}
                      y2={midY}
                      stroke="#f43f5e"
                      strokeWidth="2"
                      strokeDasharray="5,3"
                    />
                  );
                })}

                {/* Epicenter Marker (Top) */}
                <circle cx="250" cy="54" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" className="animate-ping" />
                <circle cx="250" cy="54" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                <text x="250" y="38" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">
                  EPICENTER 0°
                </text>

                {/* Shadow Zone Degree Text Labels */}
                <text x="40" y="330" fill="#f43f5e" fontSize="10" fontWeight="bold">105°</text>
                <text x="75" y="405" fill="#f43f5e" fontSize="10" fontWeight="bold">142°</text>
                <text x="460" y="330" fill="#f43f5e" fontSize="10" fontWeight="bold">105°</text>
                <text x="420" y="405" fill="#f43f5e" fontSize="10" fontWeight="bold">142°</text>
                <text x="250" y="475" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  180° (P-waves arrive)
                </text>

                {/* Receiver Indicator Pin */}
                {(() => {
                  const recRad = ((receiverAngle - 90) * Math.PI) / 180;
                  const rx = 250 + 200 * Math.cos(recRad);
                  const ry = 250 + 200 * Math.sin(recRad);
                  return (
                    <g>
                      <circle cx={rx} cy={ry} r="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                      <text x={rx} y={ry > 250 ? ry + 18 : ry - 12} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                        Receiver {receiverAngle}°
                      </text>
                    </g>
                  );
                })()}

                {/* Center Labels */}
                <text x="250" y="246" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Solid Inner
                </text>
                <text x="250" y="258" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Core (NIFE)
                </text>
                <text x="250" y="195" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Liquid Outer Core (2,900 km)
                </text>
              </svg>

              {/* Live Wave Status Floating Badge */}
              <div className="absolute top-2 left-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Receiver Seismograph at {receiverAngle}°:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {waveStatus === "BOTH" && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Both P-waves and S-waves detected (0°-105°)
                    </span>
                  )}
                  {waveStatus === "P_SHADOW" && (
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      ⚠️ Inside Shadow Zone (105°-142°): No waves detected!
                    </span>
                  )}
                  {waveStatus === "P_ONLY" && (
                    <span className="text-sky-400 font-bold flex items-center gap-1">
                      🔵 Refracted P-waves only (142°-180°); S-waves blocked by liquid outer core
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "layers" && (
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              {/* Interactive Cutaway Concentric Shells SVG */}
              <svg viewBox="0 0 450 450" className="w-full h-full max-h-[440px]">
                {/* 1. Crust Outer Rim */}
                <circle
                  cx="225" cy="225" r="210"
                  fill="#1e293b" stroke="#64748b" strokeWidth="4"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedLayer(0)}
                />
                {/* 2. Moho Boundary */}
                <circle
                  cx="225" cy="225" r="198"
                  fill="#475569" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedLayer(1)}
                />
                {/* 3. Asthenosphere */}
                <circle
                  cx="225" cy="225" r="185"
                  fill="#ea580c" stroke="#fb923c" strokeWidth="2"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedLayer(2)}
                />
                {/* 4. Lower Mantle / Mesosphere */}
                <circle
                  cx="225" cy="225" r="150"
                  fill="#9a3412" stroke="#ea580c" strokeWidth="2"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedLayer(3)}
                />
                {/* 5. Liquid Outer Core */}
                <circle
                  cx="225" cy="225" r="95"
                  fill="#dc2626" stroke="#f87171" strokeWidth="2"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedLayer(4)}
                />
                {/* 6. Solid Inner Core */}
                <circle
                  cx="225" cy="225" r="42"
                  fill="#facc15" stroke="#ffffff" strokeWidth="2"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedLayer(5)}
                />

                {/* Cutaway Wedge (showing depth ladder) */}
                <path
                  d="M 225,225 L 435,225 A 210,210 0 0,0 225,15 Z"
                  fill="rgba(15, 23, 42, 0.85)"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />

                {/* Depth Callouts */}
                <line x1="225" y1="225" x2="435" y2="225" stroke="#38bdf8" strokeWidth="1" />
                <line x1="225" y1="225" x2="225" y2="15" stroke="#38bdf8" strokeWidth="1" />

                <text x="360" y="240" fill="#cbd5e1" fontSize="9" fontWeight="bold">Crust (0-35km)</text>
                <text x="330" y="195" fill="#f59e0b" fontSize="9" fontWeight="bold">Asthenosphere (100-250km)</text>
                <text x="270" y="140" fill="#ea580c" fontSize="9" fontWeight="bold">Mantle (2,900km)</text>
                <text x="245" y="90" fill="#ef4444" fontSize="9" fontWeight="bold">Liquid Outer Core (5,150km)</text>
                <text x="240" y="45" fill="#facc15" fontSize="9" fontWeight="bold">Inner Core (6,371km)</text>
              </svg>
            </div>
          )}

          {activeTab === "volcanic" && (
            <div className="relative w-full max-w-xl aspect-video flex items-center justify-center">
              {/* Intrusive Volcanic Landforms Cross-Section Diagram */}
              <svg viewBox="0 0 600 320" className="w-full h-full">
                {/* Sky and Ground */}
                <rect width="600" height="320" fill="#0f172a" rx="10" />

                {/* Surface relief and Volcano Cone */}
                <path
                  d="M 20,120 Q 80,115 150,110 L 220,60 L 250,70 L 280,60 L 350,115 Q 450,110 580,120 L 580,310 L 20,310 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2"
                />

                {/* Sedimentary Horizontal Strata Lines */}
                <line x1="20" y1="160" x2="580" y2="160" stroke="#334155" strokeDasharray="4,4" />
                <line x1="20" y1="200" x2="580" y2="200" stroke="#334155" strokeDasharray="4,4" />
                <line x1="20" y1="240" x2="580" y2="240" stroke="#334155" strokeDasharray="4,4" />

                {/* 1. Batholith (Deep huge granitic chamber at bottom) */}
                <path
                  d="M 120,310 Q 150,230 260,225 Q 380,225 440,310 Z"
                  fill={selectedVolcanoLandform === "batholith" ? "#ef4444" : "#b91c1c"}
                  stroke="#f87171"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedVolcanoLandform("batholith")}
                />
                <text x="270" y="275" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  BATHOLITH
                </text>

                {/* 2. Main Pipe / Feeder Conduit */}
                <rect x="242" y="65" width="16" height="165" fill="#dc2626" />

                {/* 3. Laccolith (Mushroom dome pushing strata up) */}
                <path
                  d="M 80,180 Q 130,135 180,180 Z"
                  fill={selectedVolcanoLandform === "laccolith" ? "#f97316" : "#c2410c"}
                  stroke="#fb923c"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedVolcanoLandform("laccolith")}
                />
                <text x="130" y="172" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Laccolith
                </text>
                {/* Feeder to laccolith */}
                <line x1="130" y1="180" x2="160" y2="250" stroke="#f97316" strokeWidth="4" />

                {/* 4. Sill (Horizontal sheet) */}
                <rect
                  x="300" y="155" width="160" height="12"
                  fill={selectedVolcanoLandform === "sill" ? "#06b6d4" : "#0891b2"}
                  stroke="#22d3ee" strokeWidth="1.5"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedVolcanoLandform("sill")}
                />
                <text x="380" y="150" fill="#22d3ee" fontSize="10" fontWeight="bold" textAnchor="middle">
                  SILL (Horizontal)
                </text>

                {/* 5. Dyke (Vertical wall cutting strata) */}
                <rect
                  x="450" y="110" width="12" height="110"
                  fill={selectedVolcanoLandform === "dyke" ? "#8b5cf6" : "#6d28d9"}
                  stroke="#a78bfa" strokeWidth="1.5"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedVolcanoLandform("dyke")}
                />
                <text x="495" y="165" fill="#a78bfa" fontSize="10" fontWeight="bold">
                  DYKE (Vertical)
                </text>

                {/* 6. Lopolith (Saucer-shaped basin) */}
                <path
                  d="M 330,205 Q 400,230 470,205 Q 400,215 330,205 Z"
                  fill={selectedVolcanoLandform === "lopolith" ? "#eab308" : "#ca8a04"}
                  stroke="#fde047" strokeWidth="1.5"
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => setSelectedVolcanoLandform("lopolith")}
                />
                <text x="400" y="210" fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Lopolith
                </text>
              </svg>
            </div>
          )}
        </div>

        {/* Right: Controls & Pedagogical Explanations */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/80 p-4 overflow-y-auto space-y-4">
          {activeTab === "seismic" && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="font-bold text-sm text-white">
                  {lang === "hi" ? "भूकंपीय छाया क्षेत्र सिमुलेशन" : "Seismic Shadow Zone Controls"}
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Adjust the seismograph receiver position around Earth's surface to discover shadow zones.
                </p>
              </div>

              {/* Slider for Receiver Angle */}
              <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-300">Seismograph Position:</span>
                  <span className="text-sky-400 font-mono font-bold text-sm">{receiverAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="1"
                  value={receiverAngle}
                  onChange={(e) => setReceiverAngle(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0° (Epicenter)</span>
                  <span>105° (Shadow start)</span>
                  <span>142° (P re-emerge)</span>
                  <span>180°</span>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setReceiverAngle(60)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-[11px] border border-slate-700"
                >
                  60° (Direct Zone)
                </button>
                <button
                  onClick={() => setReceiverAngle(125)}
                  className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-[11px] border border-rose-500/40"
                >
                  125° (Shadow Zone)
                </button>
                <button
                  onClick={() => setReceiverAngle(160)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold text-[11px] border border-slate-700"
                >
                  160° (P-wave Core)
                </button>
              </div>

              {/* NCERT Board Exam Concept Box */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>NCERT Board Exam Takeaway</span>
                </div>
                <p className="text-amber-100/90 leading-relaxed text-[11px]">
                  <strong>Why does the S-wave shadow zone cover over 40% of Earth?</strong> S-waves cannot propagate through fluids. Because Earth's outer core is liquid iron-nickel at 2,900 km, S-waves vanish completely beyond 105°, proving the core is molten.
                </p>
              </div>
            </div>
          )}

          {activeTab === "layers" && (
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-sm text-white">
                {lang === "hi" ? "पृथ्वी के संकेंद्री मंडल" : "Concentric Shells of Earth"}
              </h3>
              <p className="text-slate-400 text-[11px]">
                Click on any layer to inspect its depth, mineral composition, and temperature.
              </p>

              <div className="space-y-1.5">
                {earthLayers.map((l, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedLayer(i)}
                    className={`w-full p-2.5 rounded-xl text-left border transition flex items-center justify-between ${
                      selectedLayer === i
                        ? "bg-slate-800 border-amber-500 text-white shadow-md"
                        : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs leading-snug">
                        {lang === "hi" ? l.nameHi : l.nameEn}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{l.depth}</div>
                    </div>
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white"
                      style={{ backgroundColor: l.color }}
                    />
                  </button>
                ))}
              </div>

              {/* Selected Layer Card */}
              {earthLayers[selectedLayer] && (
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 text-xs">
                      {lang === "hi"
                        ? earthLayers[selectedLayer].nameHi
                        : earthLayers[selectedLayer].nameEn}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {earthLayers[selectedLayer].depth}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                    <div>
                      <span className="text-slate-500 block">Density:</span>
                      <span className="font-semibold text-slate-200">{earthLayers[selectedLayer].density}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Temperature:</span>
                      <span className="font-semibold text-slate-200">{earthLayers[selectedLayer].temperature}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                    {lang === "hi"
                      ? earthLayers[selectedLayer].descriptionHi
                      : earthLayers[selectedLayer].descriptionEn}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "volcanic" && (
            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-sm text-white">
                {lang === "hi" ? "आंतरिक आग्नेय स्थलरूप" : "Intrusive Volcanic Landforms"}
              </h3>
              <p className="text-slate-400 text-[11px]">
                Cooling of magma under the crust creates characteristic plutonic bodies classified by structural shape.
              </p>

              <div className="grid grid-cols-2 gap-1.5">
                {volcanicLandforms.map((vl) => (
                  <button
                    key={vl.id}
                    onClick={() => setSelectedVolcanoLandform(vl.id)}
                    className={`p-2 rounded-xl text-left border transition ${
                      selectedVolcanoLandform === vl.id
                        ? "bg-slate-800 border-amber-500 text-white font-bold"
                        : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-xs">{lang === "hi" ? vl.nameHi : vl.nameEn}</div>
                    <div className="text-[10px] text-slate-400">{vl.shape}</div>
                  </button>
                ))}
              </div>

              {/* Selected Volcano Landform Details */}
              {(() => {
                const current = volcanicLandforms.find((v) => v.id === selectedVolcanoLandform);
                if (!current) return null;
                return (
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 mt-2">
                    <div className="font-bold text-amber-400 text-xs">
                      {lang === "hi" ? current.nameHi : current.nameEn} ({current.shape})
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {lang === "hi" ? current.descriptionHi : current.descriptionEn}
                    </p>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

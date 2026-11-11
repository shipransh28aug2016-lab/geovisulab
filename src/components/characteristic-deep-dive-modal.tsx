"use client";

import React, { useState } from "react";
import {
  X,
  Compass,
  Sparkles,
  Award,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Languages,
  Layers,
  MapPin,
} from "lucide-react";
import { CharacteristicDeepDive } from "@/data/ncert-characteristics-deep-dive";

interface CharacteristicDeepDiveModalProps {
  characteristic: CharacteristicDeepDive | null;
  onClose: () => void;
  lang?: "en" | "hi";
}

export default function CharacteristicDeepDiveModal({
  characteristic,
  onClose,
  lang = "en",
}: CharacteristicDeepDiveModalProps) {
  const [activeLang, setActiveLang] = useState<"en" | "hi">(lang);

  if (!characteristic) return null;

  return (
    <div className="fixed inset-0 z-[1250] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in zoom-in-95 duration-200 select-none">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 shadow-lg shrink-0 mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeLang === "hi" ? "विस्तृत लक्षण विश्लेषण" : "Characteristic Deep-Dive"}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {characteristic.ncertBook} • Ch {characteristic.chapterNumber}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white leading-snug">
                {activeLang === "hi" && characteristic.parentConceptHi
                  ? characteristic.parentConceptHi
                  : characteristic.parentConceptEn}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setActiveLang((l) => (l === "en" ? "hi" : "en"))}
              className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition flex items-center gap-1"
              title="Toggle English / हिन्दी"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeLang === "en" ? "हिन्दी" : "EN"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Main Characteristic Banner */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{activeLang === "hi" ? "परीक्षित मुख्य लक्षण" : "Evaluated Key Characteristic"}</span>
            </div>
            <p className="text-white text-sm sm:text-base font-semibold leading-relaxed">
              {activeLang === "hi" ? characteristic.characteristicHi : characteristic.characteristicEn}
            </p>
          </div>

          {/* 1. Scientific & Geographic Mechanism */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>{activeLang === "hi" ? "वैज्ञानिक एवं भौगोलिक क्रियाविधि" : "Scientific & Geographic Mechanism"}</span>
            </div>
            <p className="text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-[12px]">
              {activeLang === "hi" ? characteristic.scientificMechanismHi : characteristic.scientificMechanismEn}
            </p>
          </div>

          {/* 2. Cause and Effect Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>{activeLang === "hi" ? "भू-भौतिकीय कारण" : "Geophysical Cause"}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {activeLang === "hi"
                  ? characteristic.causeAndEffectHi.split("प्रभाव:")[0].replace("कारण:", "").trim()
                  : characteristic.causeAndEffectEn.split("Effect:")[0].replace("Cause:", "").trim()}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold text-[11px] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>{activeLang === "hi" ? "भौगोलिक प्रभाव व परिणाम" : "Geographical Effect"}</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {activeLang === "hi"
                  ? (characteristic.causeAndEffectHi.split("प्रभाव:")[1] || characteristic.causeAndEffectHi).trim()
                  : (characteristic.causeAndEffectEn.split("Effect:")[1] || characteristic.causeAndEffectEn).trim()}
              </p>
            </div>
          </div>

          {/* 3. Real-World Case Study / Example */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>{activeLang === "hi" ? "प्रामाणिक एनसीईआरटी भौगोलिक उदाहरण" : "Authentic NCERT Geographic Case Study"}</span>
            </div>
            <p className="text-emerald-100 leading-relaxed text-[11px]">
              {activeLang === "hi" ? characteristic.realWorldExampleHi : characteristic.realWorldExampleEn}
            </p>
          </div>

          {/* 4. Common Misconception vs Scientific Fact */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px] uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>{activeLang === "hi" ? "सामान्य भ्रांति बनाम वैज्ञानिक तथ्य" : "Common Misconception vs Scientific Fact"}</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200 flex items-start gap-2">
                <span className="font-bold text-rose-400 shrink-0">❌ Misconception:</span>
                <span>
                  {activeLang === "hi"
                    ? characteristic.commonMisconceptionVsFactHi.misconception
                    : characteristic.commonMisconceptionVsFactEn.misconception}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 flex items-start gap-2">
                <span className="font-bold text-emerald-400 shrink-0">✓ NCERT Fact:</span>
                <span>
                  {activeLang === "hi"
                    ? characteristic.commonMisconceptionVsFactHi.fact
                    : characteristic.commonMisconceptionVsFactEn.fact}
                </span>
              </div>
            </div>
          </div>

          {/* 5. CBSE Board Exam Marking Scheme */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{activeLang === "hi" ? "सीबीएसई बोर्ड मूल्यांकन एवं अंकन योजना" : "CBSE Board Evaluation & Marking Scheme"}</span>
            </div>
            <p className="text-amber-100 leading-relaxed text-[11px]">
              {activeLang === "hi" ? characteristic.cbseMarkingCriteriaHi : characteristic.cbseMarkingCriteriaEn}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-mono text-slate-500">
            {characteristic.chapterTitleEn}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow"
          >
            {activeLang === "hi" ? "बंद करें" : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}

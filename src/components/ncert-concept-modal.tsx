"use client";

import React, { useState } from "react";
import {
  X,
  BookOpen,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  Bookmark,
  Share2,
  ExternalLink,
  Languages,
  Compass,
} from "lucide-react";
import { ConceptExplanation } from "@/data/ncert-concept-explanations";

interface NcertConceptModalProps {
  concept: ConceptExplanation | null;
  onClose: () => void;
  lang?: "en" | "hi";
  onFlyToLocation?: (name: string) => void;
  onOpenCharacteristicDeepDive?: (charText: string, parentConcept?: string) => void;
}

export default function NcertConceptModal({
  concept,
  onClose,
  lang = "en",
  onFlyToLocation,
  onOpenCharacteristicDeepDive,
}: NcertConceptModalProps) {
  const [activeLang, setActiveLang] = useState<"en" | "hi">(lang);

  if (!concept) return null;

  return (
    <div className="fixed inset-0 z-[1200] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  NCERT Official Concept
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Ch {concept.chapterNumber}: {concept.chapterTitle}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {activeLang === "hi" && concept.termHindi ? concept.termHindi : concept.term}
              </h2>
              {activeLang === "hi" && concept.term !== concept.termHindi && (
                <div className="text-xs text-emerald-400 font-medium">{concept.term}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Language Switcher */}
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
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* NCERT Definition Box */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{activeLang === "hi" ? "एनसीईआरटी मानक परिभाषा" : "NCERT Textbook Definition"}</span>
            </div>
            <p className="text-slate-100 text-sm leading-relaxed font-medium">
              {activeLang === "hi" ? concept.definitionHi || concept.definitionHindi : concept.definition}
            </p>
          </div>

          {/* Detailed Authentic Geographical Explanation */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-xs text-slate-300 uppercase tracking-wider">
              {activeLang === "hi" ? "विस्तृत भौगोलिक विश्लेषण" : "Detailed Geographic Explanation"}
            </h3>
            <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
              {activeLang === "hi" ? concept.detailedExplanationHindi : concept.detailedExplanation}
            </p>
          </div>

          {/* Key Salient Characteristics with Deep-Dive Interaction */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
              <span>{activeLang === "hi" ? "प्रमुख लक्षण एवं विशेषताएं (गहन विश्लेषण हेतु क्लिक करें)" : "Key Salient Characteristics (Click for Deep Analysis)"}</span>
              <span className="text-[10px] text-amber-400 font-normal">Deep Pedagogical Proofs</span>
            </div>
            <div className="space-y-2">
              {(activeLang === "hi" ? concept.keyCharacteristicsHindi : concept.keyCharacteristics).map((char, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (onOpenCharacteristicDeepDive) {
                      onOpenCharacteristicDeepDive(char, concept.term);
                    }
                  }}
                  className="w-full p-3 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/60 text-slate-200 hover:text-white transition flex items-start justify-between gap-3 text-left group cursor-pointer shadow-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:text-amber-400 transition" />
                    <span className="leading-relaxed font-medium text-xs">{char}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-semibold shrink-0 group-hover:bg-amber-500/20 transition whitespace-nowrap">
                    {activeLang === "hi" ? "गहन व्याख्या →" : "Deep Analysis →"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Pedagogical & Examination Significance */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{activeLang === "hi" ? "सीबीएसई बोर्ड परीक्षा महत्व" : "CBSE Board Examination Relevance"}</span>
            </div>
            <p className="text-amber-100 leading-relaxed text-xs">
              {activeLang === "hi" ? concept.ncertSignificanceHindi : concept.ncertSignificance}
            </p>
            {concept.cbseExamKeyword && (
              <div className="pt-1.5 border-t border-amber-500/20 text-[11px] text-amber-200/90 font-mono">
                <strong>Essential Keywords:</strong> {concept.cbseExamKeyword}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-mono">{concept.ncertBook}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow"
          >
            {activeLang === "hi" ? "समझ लिया" : "Got it"}
          </button>
        </div>
      </div>
    </div>
  );
}

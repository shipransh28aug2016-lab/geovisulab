"use client";

import React from "react";
import { X, Sparkles, BookOpen, AlertTriangle, CheckCircle, MapPin, Info } from "lucide-react";
import { SyllabusTopic } from "@/data/cbse-syllabus";

interface ExamTipsModalProps {
  topic: SyllabusTopic | null;
  onClose: () => void;
  onFlyToMap?: (location: any) => void;
  onOpenConceptExplanation?: (conceptTerm: string) => void;
}

export default function ExamTipsModal({
  topic,
  onClose,
  onFlyToMap,
  onOpenConceptExplanation,
}: ExamTipsModalProps) {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-1100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-sm text-white">
                CBSE Board Exam Tips & Scoring Guidelines
              </h2>
              <p className="text-[11px] text-slate-400">
                Ch {topic.chapterNumber}: {topic.chapterTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Main Tip */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Examiner's Advice for Full Marks</span>
            </div>
            <p className="text-amber-100 leading-relaxed font-medium">
              {topic.examTips}
            </p>
          </div>

          {/* Chapter Summary */}
          <div className="space-y-1.5">
            <span className="font-bold text-slate-300 uppercase tracking-wider block text-[10px]">
              NCERT Core Concept Summary
            </span>
            <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {topic.summary}
            </p>
          </div>

          {/* Mandatory Map Items */}
          {topic.ncertMapItems && topic.ncertMapItems.length > 0 && (
            <div className="space-y-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider block text-[10px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Compulsory Map Pointing Practice for this Chapter</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                {topic.ncertMapItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-200 font-semibold flex items-center gap-2"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Syllabus Terms with Authentic NCERT Explanations */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>High-Value NCERT Keywords (Click for full explanation)</span>
              <span className="text-emerald-400 font-normal">Authentic Text</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {topic.keyConcepts.map((kc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (onOpenConceptExplanation) {
                      onOpenConceptExplanation(kc);
                    }
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-emerald-950/60 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/50 font-mono text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>{kc}</span>
                  <Info className="w-3 h-3 text-emerald-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Class {topic.classGrade} CBSE Syllabus</span>
          <button
            onClick={() => {
              if (topic.targetLocation && onFlyToMap) {
                onFlyToMap(topic.targetLocation);
              }
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow"
          >
            Locate Chapter on Visualizer →
          </button>
        </div>
      </div>
    </div>
  );
}

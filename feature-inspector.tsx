"use client";

import React from "react";
import {
  X,
  Bookmark,
  Share2,
  BookOpen,
  Award,
  MapPin,
  TrendingUp,
  Compass,
  Layers,
  Trash2,
  Edit,
} from "lucide-react";

interface FeatureInspectorProps {
  feature: any | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (feature: any) => void;
  onEditAnnotation?: (annotation: any) => void;
  onDeleteAnnotation?: (id: string) => void;
}

export default function FeatureInspector({
  feature,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onEditAnnotation,
  onDeleteAnnotation,
}: FeatureInspectorProps) {
  if (!feature) return null;

  const isUserAnnotation = feature.isUserAnnotation;

  return (
    <div className="fixed inset-y-0 right-0 z-1050 w-full sm:w-[420px] bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-start justify-between bg-slate-900/60">
        <div className="space-y-1 pr-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {feature.category || "NCERT Physical Geography"}
            </span>
            {feature.hindiName && (
              <span className="text-xs text-slate-400 font-medium">
                {feature.hindiName}
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-white leading-snug">
            {feature.title}
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Physical Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {feature.length && (
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Total Length
              </span>
              <span className="text-sm font-bold text-sky-400">{feature.length}</span>
            </div>
          )}

          {feature.elevation && (
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Elevation
              </span>
              <span className="text-sm font-bold text-emerald-400">{feature.elevation}</span>
            </div>
          )}

          {feature.basinArea && (
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Basin Catchment
              </span>
              <span className="text-sm font-bold text-indigo-400">{feature.basinArea}</span>
            </div>
          )}

          {feature.areaPercentage && (
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                India Area Share
              </span>
              <span className="text-sm font-bold text-amber-400">{feature.areaPercentage}</span>
            </div>
          )}

          {feature.speed && (
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Plate Velocity
              </span>
              <span className="text-sm font-bold text-rose-400">{feature.speed}</span>
            </div>
          )}

          {feature.state && (
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                State / Location
              </span>
              <span className="text-sm font-bold text-slate-200">{feature.state}</span>
            </div>
          )}
        </div>

        {/* Headquarters Specific Profile */}
        {(feature.isHeadquarters || feature.headquartersCity) && (
          <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-2xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                🏛️ Institutional Headquarters
              </span>
              {feature.establishedYear && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                  Est. {feature.establishedYear}
                </span>
              )}
            </div>

            <div className="space-y-1.5 text-slate-200">
              <div className="flex items-start gap-2">
                <span className="text-slate-400 shrink-0 font-medium">Headquarters City:</span>
                <span className="font-bold text-white">{feature.headquartersCity || feature.state}</span>
              </div>
              {feature.parentMinistry && (
                <div className="flex items-start gap-2">
                  <span className="text-slate-400 shrink-0 font-medium">Parent Authority:</span>
                  <span className="text-emerald-300">{feature.parentMinistry}</span>
                </div>
              )}
              {feature.jurisdictionOrScope && (
                <div className="flex items-start gap-2 pt-1 border-t border-emerald-500/20">
                  <span className="text-slate-400 shrink-0 font-medium">Jurisdiction / Scope:</span>
                  <span className="text-slate-300 leading-snug">{feature.jurisdictionOrScope}</span>
                </div>
              )}
            </div>

            {feature.cbseExamRelevance && (
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-[11px] leading-relaxed font-medium">
                🎯 <strong className="text-amber-400">CBSE Exam Key Point:</strong> {feature.cbseExamRelevance}
              </div>
            )}
          </div>
        )}

        {/* Origin & Outflow (for rivers) */}
        {feature.origin && (
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <span className="text-sky-400 font-bold shrink-0">Source / Origin:</span>
              <span className="text-slate-300">{feature.origin}</span>
            </div>
            {feature.outflow && (
              <div className="flex items-start gap-2">
                <span className="text-sky-400 font-bold shrink-0">Outflow / Mouth:</span>
                <span className="text-slate-300">{feature.outflow}</span>
              </div>
            )}
            {feature.tributaries && (
              <div className="flex items-start gap-2 pt-1 border-t border-slate-800">
                <span className="text-slate-400 font-semibold shrink-0">Tributaries:</span>
                <span className="text-slate-300">{feature.tributaries}</span>
              </div>
            )}
          </div>
        )}

        {/* Description & Formation */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>NCERT Description & Physical Geography</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80">
            {feature.description}
          </p>
        </div>

        {/* Characteristics for soils */}
        {feature.characteristics && Array.isArray(feature.characteristics) && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Diagnostic Soil Properties
            </h3>
            <ul className="space-y-1.5">
              {feature.characteristics.map((c: string, idx: number) => (
                <li
                  key={idx}
                  className="text-xs text-slate-300 bg-slate-900/70 p-2 rounded-lg border border-slate-800 flex items-start gap-2"
                >
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Crops grown */}
        {feature.cropsGrown && (
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1 text-xs">
            <span className="text-amber-400 font-bold block">Major Crops Supported:</span>
            <span className="text-slate-200">{feature.cropsGrown}</span>
          </div>
        )}

        {/* Geological Significance */}
        {feature.significance && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Syllabus & Exam Significance</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              {feature.significance}
            </p>
          </div>
        )}

        {/* NCERT Chapter Reference */}
        {feature.ncertChapter && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center gap-2">
            <span className="text-emerald-400 font-bold">NCERT Reference:</span>
            <span className="text-emerald-200">{feature.ncertChapter}</span>
          </div>
        )}

        {/* Tags if user annotation */}
        {isUserAnnotation && feature.tags && (
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 font-semibold block">Field Tags</span>
            <div className="flex flex-wrap gap-1">
              {feature.tags.map((t: string, i: number) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center gap-2">
        {isUserAnnotation ? (
          <>
            <button
              onClick={() => onEditAnnotation && onEditAnnotation(feature)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <Edit className="w-4 h-4 text-emerald-400" />
              <span>Edit Field Note</span>
            </button>
            <button
              onClick={() => onDeleteAnnotation && onDeleteAnnotation(feature.id)}
              className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition"
              title="Delete Note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => onToggleBookmark(feature)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition shadow-md ${
              isBookmarked
                ? "bg-amber-500 text-slate-950 shadow-amber-500/20"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
            <span>{isBookmarked ? "Bookmarked in My Notes" : "Bookmark for Revision"}</span>
          </button>
        )}
      </div>
    </div>
  );
}

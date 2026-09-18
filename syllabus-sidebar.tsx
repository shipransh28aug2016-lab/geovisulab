"use client";

import React, { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Crosshair,
  FileText,
  MapPin,
  ExternalLink,
  HelpCircle,
  Award,
  Activity,
  Sun,
  Ruler,
  Info,
} from "lucide-react";
import { CBSE_SYLLABUS, SyllabusTopic } from "@/data/cbse-syllabus";

interface SyllabusSidebarProps {
  selectedGrade: "11" | "12" | "all";
  onSelectTopicLocation: (location: { lat: number; lng: number; zoom: number }, associatedLayers: string[]) => void;
  studyProgress: { [topicId: string]: any };
  onUpdateProgress: (topicId: string, status: "not_started" | "in_progress" | "mastered", notes?: string) => void;
  onOpenExamTips: (topic: SyllabusTopic) => void;
  onOpenSimulator?: (type: "earth_interior" | "heat_budget" | "practical" | "map_practice") => void;
  onOpenConceptExplanation?: (conceptTerm: string) => void;
  onOpenCharacteristicDeepDive?: (charText: string, parentConcept?: string) => void;
  lang?: "en" | "hi";
}

export default function SyllabusSidebar({
  selectedGrade,
  onSelectTopicLocation,
  studyProgress,
  onUpdateProgress,
  onOpenExamTips,
  onOpenSimulator,
  onOpenConceptExplanation,
  onOpenCharacteristicDeepDive,
  lang = "en",
}: SyllabusSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTopics, setExpandedTopics] = useState<{ [id: string]: boolean }>({
    "c11-phys-ch3": true,
    "c11-ind-ch3": true,
  });
  const [editingNoteTopicId, setEditingNoteTopicId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  // Filter topics based on grade & search query
  const filteredTopics = CBSE_SYLLABUS.filter((t) => {
    const matchesGrade = selectedGrade === "all" || t.classGrade === selectedGrade;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      t.chapterTitle.toLowerCase().includes(query) ||
      (t.chapterTitleHindi && t.chapterTitleHindi.includes(query)) ||
      t.book.toLowerCase().includes(query) ||
      t.unit.toLowerCase().includes(query) ||
      t.keyConcepts.some((c) => c.toLowerCase().includes(query)) ||
      t.ncertMapItems.some((m) => m.toLowerCase().includes(query));
    return matchesGrade && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate syllabus stats
  const totalInScope = filteredTopics.length;
  const masteredCount = filteredTopics.filter(
    (t) => studyProgress[t.id]?.status === "mastered"
  ).length;
  const inProgressCount = filteredTopics.filter(
    (t) => studyProgress[t.id]?.status === "in_progress"
  ).length;
  const progressPercent =
    totalInScope > 0 ? Math.round((masteredCount / totalInScope) * 100) : 0;

  return (
    <aside className="w-80 md:w-96 h-full flex flex-col bg-slate-950/90 border-r border-slate-800 shrink-0 select-none">
      {/* Header & Stats */}
      <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-sm text-slate-100">
              {lang === "hi" ? "सीबीएसई पाठ्यक्रम ट्रैकर" : "CBSE Syllabus Tracker"}
            </h2>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {progressPercent}% {lang === "hi" ? "पूर्ण" : "Mastered"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="bg-amber-500 transition-all duration-500"
            style={{
              width: `${
                totalInScope > 0 ? Math.round((inProgressCount / totalInScope) * 100) : 0
              }%`,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> {masteredCount} {lang === "hi" ? "कंठस्थ" : "Mastered"}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> {inProgressCount} {lang === "hi" ? "प्रगति पर" : "In Progress"}
          </span>
          <span>{totalInScope} {lang === "hi" ? "अध्याय" : "Chapters"}</span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={
              lang === "hi"
                ? "अध्याय, नदी, पर्वत, समोच्च, शैल खोजें..."
                : "Search chapters, rivers, rocks, soil, contours..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 px-4 text-slate-500">
            <p className="text-sm">No chapters match your search.</p>
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isExpanded = !!expandedTopics[topic.id];
            const currentStatus = studyProgress[topic.id]?.status || "not_started";

            return (
              <div
                key={topic.id}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-xl transition overflow-hidden shadow-xs"
              >
                {/* Topic Header Accordion */}
                <div
                  onClick={() => toggleExpand(topic.id)}
                  className="p-3 cursor-pointer flex items-start justify-between gap-2 select-none"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                        Ch {topic.chapterNumber}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium truncate max-w-[160px]">
                        Class {topic.classGrade} • {lang === "hi" ? topic.bookHindi || topic.book : topic.book.split(" ")[0]}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-200 leading-snug">
                      {lang === "hi" && topic.chapterTitleHindi ? topic.chapterTitleHindi : topic.chapterTitle}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    {/* Status badge */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        currentStatus === "mastered"
                          ? "bg-emerald-500 ring-2 ring-emerald-500/30"
                          : currentStatus === "in_progress"
                          ? "bg-amber-500"
                          : "bg-slate-700"
                      }`}
                      title={`Status: ${currentStatus.replace("_", " ")}`}
                    />
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 border-t border-slate-800/60 space-y-3 bg-slate-950/40 text-xs">
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {lang === "hi" && topic.summaryHindi ? topic.summaryHindi : topic.summary}
                    </p>

                    {/* Key Concepts Pills with Authentic NCERT Explanations */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        <span>{lang === "hi" ? "प्रमुख एनसीईआरटी संकल्पनाएं (क्लिक करें)" : "Key NCERT Concepts (Click to explain)"}</span>
                        <span className="text-[9px] text-emerald-400 font-normal">Authentic NCERT Notes</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {topic.keyConcepts.map((concept, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenConceptExplanation) {
                                onOpenConceptExplanation(concept);
                              }
                            }}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/90 hover:bg-emerald-950/60 text-slate-300 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/50 transition flex items-center gap-1 group text-left cursor-pointer"
                            title="Click for authentic NCERT definition and CBSE exam rationale"
                          >
                            <span>{concept}</span>
                            <Info className="w-2.5 h-2.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Key Salient Characteristics of this Lesson (Interactive Deep-Dive) */}
                    {topic.keyCharacteristics && topic.keyCharacteristics.length > 0 && (
                      <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
                        <div className="flex items-center justify-between text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                          <span>{lang === "hi" ? "प्रमुख मुख्य लक्षण (गहन अध्ययन)" : "Key Salient Characteristics (Deep Dive)"}</span>
                          <span className="text-[9px] text-slate-400 font-normal">Click any point</span>
                        </div>
                        <div className="space-y-1">
                          {topic.keyCharacteristics.map((charText, cIdx) => (
                            <button
                              key={cIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenCharacteristicDeepDive) {
                                  onOpenCharacteristicDeepDive(charText, topic.chapterTitle);
                                }
                              }}
                              className="w-full text-left p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition flex items-start gap-1.5 text-[11px] text-slate-300 hover:text-amber-200 group cursor-pointer"
                              title="Click for deep authentic scientific explanation and CBSE marking scheme"
                            >
                              <span className="text-amber-400 text-xs font-bold leading-none mt-0.5 shrink-0">▸</span>
                              <span className="leading-snug line-clamp-2">{charText}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dedicated Visual Simulator Shortcuts */}
                    {(topic.visualizationType === "cutaway_earth" ||
                      topic.id === "c11-phys-ch3" ||
                      topic.id === "c11-phys-u2-ch3") &&
                      onOpenSimulator && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenSimulator("earth_interior");
                          }}
                          className="w-full flex items-center justify-center gap-1.5 p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-[11px] transition"
                        >
                          <Activity className="w-3.5 h-3.5 animate-pulse" />
                          <span>{lang === "hi" ? "भूकंपीय छाया सिमुलेटर चलाएं" : "Launch Seismic Wave Simulator"}</span>
                        </button>
                      )}

                    {(topic.visualizationType === "radiation_model" ||
                      topic.id === "c11-phys-ch8") &&
                      onOpenSimulator && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenSimulator("heat_budget");
                          }}
                          className="w-full flex items-center justify-center gap-1.5 p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-[11px] transition"
                        >
                          <Sun className="w-3.5 h-3.5" />
                          <span>{lang === "hi" ? "ऊष्मा बजट मॉडल चलाएं" : "Launch Solar Radiation Model"}</span>
                        </button>
                      )}

                    {(topic.visualizationType === "contour_lab" ||
                      topic.visualizationType === "gis_lab" ||
                      topic.book.includes("Practical")) &&
                      onOpenSimulator && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenSimulator("practical");
                          }}
                          className="w-full flex items-center justify-center gap-1.5 p-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-bold text-[11px] transition"
                        >
                          <Ruler className="w-3.5 h-3.5" />
                          <span>{lang === "hi" ? "प्रयोगात्मक व जीआईएस लैब खोलें" : "Launch Practical & GIS Lab"}</span>
                        </button>
                      )}

                    {/* NCERT Board Exam Map Items */}
                    {topic.ncertMapItems && topic.ncertMapItems.length > 0 && (
                      <div>
                        <div className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            <span>{lang === "hi" ? "बोर्ड परीक्षा मानचित्र बिंदु" : "Board Exam Map Items"}</span>
                          </span>

                          {onOpenSimulator && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenSimulator("map_practice");
                              }}
                              className="text-amber-400 hover:underline text-[10px] font-bold"
                            >
                              Practice →
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {topic.ncertMapItems.map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-800/60">
                      {topic.targetLocation && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTopicLocation(topic.targetLocation!, topic.associatedLayers);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition shadow"
                        >
                          <Crosshair className="w-3.5 h-3.5" />
                          <span>{lang === "hi" ? "मानचित्र पर देखें" : "Fly to on Map"}</span>
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenExamTips(topic);
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700 transition"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{lang === "hi" ? "परीक्षा टिप्स" : "Exam Tips"}</span>
                      </button>

                      {/* Status Selector Dropdown */}
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          onUpdateProgress(
                            topic.id,
                            e.target.value as any,
                            studyProgress[topic.id]?.notes
                          )
                        }
                        className="ml-auto bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-hidden"
                      >
                        <option value="not_started">⚪ Unstudied</option>
                        <option value="in_progress">🟡 In Progress</option>
                        <option value="mastered">🟢 Mastered</option>
                      </select>
                    </div>

                    {/* Study Notes input */}
                    <div className="pt-1">
                      {editingNoteTopicId === topic.id ? (
                        <div className="space-y-1.5">
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add your revision note or mnemonics here..."
                            rows={2}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500"
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setEditingNoteTopicId(null)}
                              className="px-2 py-1 rounded text-[11px] text-slate-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                onUpdateProgress(topic.id, currentStatus, noteText);
                                setEditingNoteTopicId(null);
                              }}
                              className="px-2.5 py-1 rounded bg-emerald-600 text-white font-semibold text-[11px]"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                          <span className="truncate max-w-[200px]">
                            {studyProgress[topic.id]?.notes || "No revision notes yet."}
                          </span>
                          <button
                            onClick={() => {
                              setEditingNoteTopicId(topic.id);
                              setNoteText(studyProgress[topic.id]?.notes || "");
                            }}
                            className="text-emerald-400 hover:underline shrink-0 ml-2"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}

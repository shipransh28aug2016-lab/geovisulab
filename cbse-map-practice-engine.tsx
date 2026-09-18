"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  Clock,
  Compass,
  ArrowRight,
  Crosshair,
  Filter,
} from "lucide-react";
import confetti from "canvas-confetti";
import { CBSE_MAP_PRACTICE_ITEMS, MapPracticeItem } from "@/data/cbse-map-practice-data";

interface CbseMapPracticeEngineProps {
  onFlyToLocation?: (coords: { lat: number; lng: number; zoom?: number }) => void;
  onClose?: () => void;
  lang?: "en" | "hi";
}

export default function CbseMapPracticeEngine({
  onFlyToLocation,
  onClose,
  lang = "en",
}: CbseMapPracticeEngineProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "CLASS_XI_WORLD" | "CLASS_XI_INDIA" | "CLASS_XII_WORLD" | "CLASS_XII_INDIA"
  >("CLASS_XII_INDIA");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mistakes, setMistakes] = useState<MapPracticeItem[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Filter items for current category
  const currentItems = CBSE_MAP_PRACTICE_ITEMS.filter(
    (item) => item.category === selectedCategory
  );
  const currentItem = currentItems[currentIndex] || currentItems[0];

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || completed || isAnswerRevealed) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsAnswerRevealed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive, completed, isAnswerRevealed, currentIndex]);

  const handleSelectOption = (option: string) => {
    if (isAnswerRevealed) return;
    setSelectedAnswer(option);
    setIsAnswerRevealed(true);

    const isCorrect =
      option === currentItem.nameEn || option === currentItem.nameHi;

    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      setMistakes((prev) => [...prev, currentItem]);
    }

    if (onFlyToLocation && currentItem.coordinates) {
      onFlyToLocation({
        lat: currentItem.coordinates[0],
        lng: currentItem.coordinates[1],
        zoom: currentItem.category.includes("INDIA") ? 7 : 4,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < currentItems.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
      setTimerSeconds(30);
    } else {
      setCompleted(true);
      if (score + (selectedAnswer === currentItem.nameEn ? 1 : 0) >= currentItems.length * 0.7) {
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {
          // ignore
        }
      }
    }
  };

  const handleReset = (cat = selectedCategory) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setCompleted(false);
    setMistakes([]);
    setTimerSeconds(30);
  };

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-none">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-white">
                {lang === "hi"
                  ? "सीबीएसई बोर्ड अनिवार्य मानचित्र अभ्यास इंजन"
                  : "CBSE Board Prescribed Map Practice Engine"}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Official Syllabus 2026-27
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Un-mixed map pointing testing: Class XI World, Class XI India, Class XII World, Class XII India
            </p>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => handleReset("CLASS_XII_INDIA")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedCategory === "CLASS_XII_INDIA"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🇮🇳 Class 12 India (Mines/Ports)
          </button>
          <button
            onClick={() => handleReset("CLASS_XI_INDIA")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedCategory === "CLASS_XI_INDIA"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🇮🇳 Class 11 India (Relief/Rivers)
          </button>
          <button
            onClick={() => handleReset("CLASS_XII_WORLD")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedCategory === "CLASS_XII_WORLD"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🌐 Class 12 World (Transport)
          </button>
          <button
            onClick={() => handleReset("CLASS_XI_WORLD")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              selectedCategory === "CLASS_XI_WORLD"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🌐 Class 11 World (Plates/Currents)
          </button>
        </div>
      </div>

      {/* Main Practice Container */}
      <div className="flex-1 overflow-y-auto p-5 flex items-center justify-center">
        {!completed ? (
          <div className="w-full max-w-xl bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5">
            {/* Question Progress & Timer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-bold font-mono">
                  {currentIndex + 1} / {currentItems.length}
                </span>
                <span className="text-slate-400">Score: <strong className="text-white">{score}</strong></span>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className={`font-bold ${timerSeconds <= 5 ? "text-rose-400 animate-pulse" : "text-amber-300"}`}>
                  00:{String(timerSeconds).padStart(2, "0")}s
                </span>
              </div>
            </div>

            {/* Prompt Card */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {currentItem.subCategory}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Coords: {currentItem.coordinates[0]}°N, {currentItem.coordinates[1]}°E
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-relaxed">
                {lang === "hi"
                  ? `मानचित्र पर दिए गए स्थान की पहचान करें: ${currentItem.descriptionHi}`
                  : `Identify the prescribed CBSE map landmark: ${currentItem.descriptionEn}`}
              </h3>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2">
              {(currentItem.options || [currentItem.nameEn, "Alternative Location A", "Alternative Location B", "Alternative Location C"]).map((opt, i) => {
                const isCorrect = opt === currentItem.nameEn;
                const isUserChoice = selectedAnswer === opt;

                let btnClass = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                if (isAnswerRevealed) {
                  if (isCorrect) {
                    btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                  } else if (isUserChoice && !isCorrect) {
                    btnClass = "bg-rose-500/20 border-rose-500 text-rose-300";
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswerRevealed}
                    className={`w-full p-3.5 rounded-xl border text-xs text-left transition flex items-center justify-between ${btnClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswerRevealed && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {isAnswerRevealed && isUserChoice && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Rationale */}
            {isAnswerRevealed && (
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>NCERT Prescribed Answer: {currentItem.nameEn} ({currentItem.nameHi})</span>
                  </span>

                  {onFlyToLocation && (
                    <button
                      onClick={() =>
                        onFlyToLocation({
                          lat: currentItem.coordinates[0],
                          lng: currentItem.coordinates[1],
                          zoom: 7,
                        })
                      }
                      className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Crosshair className="w-3 h-3" />
                      <span>Fly on Map</span>
                    </button>
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {lang === "hi" ? currentItem.descriptionHi : currentItem.descriptionEn}
                </p>
                <div className="text-[10px] text-slate-400">
                  {currentItem.ncertChapter}
                </div>
              </div>
            )}

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <button
                onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
                className="text-slate-400 hover:text-white flex items-center gap-1"
              >
                {isAnswerRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{isAnswerRevealed ? "Hide Answer" : "Reveal Answer"}</span>
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center gap-1.5 shadow"
              >
                <span>{currentIndex + 1 === currentItems.length ? "Finish Test" : "Next Landmark"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Test Complete Results Card */
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Map Skill Challenge Completed!</h3>
              <p className="text-xs text-slate-400">
                Score: <span className="text-emerald-400 font-bold text-base">{score}</span> / {currentItems.length}
              </p>
            </div>

            {/* Mistakes Review */}
            {mistakes.length > 0 && (
              <div className="text-left bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-rose-400 text-[11px] block uppercase">
                  Landmarks to Revise ({mistakes.length}):
                </span>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {mistakes.map((m) => (
                    <div key={m.id} className="flex items-center justify-between text-[11px] text-slate-300 py-0.5">
                      <span>• {m.nameEn}</span>
                      <span className="text-slate-500 text-[10px]">{m.subCategory}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={() => handleReset()}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Category</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

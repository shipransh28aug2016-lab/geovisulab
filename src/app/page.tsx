"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Globe3D from "@/components/globe-3d";
import InteractiveMap from "@/components/interactive-map";
import SyllabusSidebar from "@/components/syllabus-sidebar";
import LayerControlPanel, { LayerState } from "@/components/layer-control-panel";
import FeatureInspector from "@/components/feature-inspector";
import MapHighlighterPanel from "@/components/map-highlighter-panel";
import { HeadquartersFeature } from "@/data/headquarters-data";
import ElevationProfileModal from "@/components/elevation-profile-modal";
import QuizModal from "@/components/quiz-modal";
import AnnotationModal from "@/components/annotation-modal";
import BookmarksModal from "@/components/bookmarks-modal";
import AuthModal from "@/components/auth-modal";
import ExamTipsModal from "@/components/exam-tips-modal";
import EarthInteriorSimulator from "@/components/visual-labs/earth-interior-simulator";
import InsolationHeatBudgetSimulator from "@/components/visual-labs/insolation-heat-budget-simulator";
import PracticalGeographyLab from "@/components/visual-labs/practical-geography-lab";
import CbseMapPracticeEngine from "@/components/map-practice/cbse-map-practice-engine";
import NcertConceptModal from "@/components/ncert-concept-modal";
import CharacteristicDeepDiveModal from "@/components/characteristic-deep-dive-modal";
import ClickHighlighterInspector from "@/components/click-highlighter-inspector";
import { getConceptExplanation, ConceptExplanation } from "@/data/ncert-concept-explanations";
import { getCharacteristicDeepDive, CharacteristicDeepDive } from "@/data/ncert-characteristics-deep-dive";
import { inspectGeographicPoint, GeoLocationAnalysis } from "@/data/spatial-inspector-engine";
import { useStudySession } from "@/hooks/use-study-session";
import { SyllabusTopic } from "@/data/cbse-syllabus";
import {
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  RefreshCw,
  X,
} from "lucide-react";

export default function HomePage() {
  // Navigation & View Mode
  const [currentMode, setCurrentMode] = useState<"globe" | "map" | "profile">("globe");
  const [selectedGrade, setSelectedGrade] = useState<"11" | "12" | "all">("11");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);

  // Map Highlighter & Headquarters State
  const [highlightedHq, setHighlightedHq] = useState<HeadquartersFeature | null>(null);
  const [highlightAllCategory, setHighlightAllCategory] = useState<string | null>(null);

  // Active Map Layers
  const [activeLayers, setActiveLayers] = useState<LayerState>({
    rivers: true,
    mountains: true,
    soils: true,
    tectonics: false,
    climate: false,
    mapItems: false,
    userAnnotations: true,
  });

  // Focus & Inspector Targets
  const [focusLocation, setFocusLocation] = useState<{
    lat: number;
    lng: number;
    zoom?: number;
  } | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);

  // Pin Dropping Mode
  const [isPinDroppingMode, setIsPinDroppingMode] = useState(false);
  const [droppedCoords, setDroppedCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Language (English / Hindi academic)
  const [lang, setLang] = useState<"en" | "hi">("en");

  // Modals
  const [isElevationModalOpen, setIsElevationModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isAnnotationModalOpen, setIsAnnotationModalOpen] = useState(false);
  const [annotationToEdit, setAnnotationToEdit] = useState<any | null>(null);
  const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [examTipsTopic, setExamTipsTopic] = useState<SyllabusTopic | null>(null);

  // Curriculum Visual Labs Modals
  const [isEarthInteriorOpen, setIsEarthInteriorOpen] = useState(false);
  const [isHeatBudgetOpen, setIsHeatBudgetOpen] = useState(false);
  const [isPracticalLabOpen, setIsPracticalLabOpen] = useState(false);
  const [isMapPracticeOpen, setIsMapPracticeOpen] = useState(false);

  // NCERT Key Concept Detailed Modal
  const [selectedNcertConcept, setSelectedNcertConcept] = useState<ConceptExplanation | null>(null);

  // NCERT Salient Characteristic Deep-Dive Modal
  const [selectedCharacteristic, setSelectedCharacteristic] = useState<CharacteristicDeepDive | null>(null);

  // Dynamic Map Click Highlighter Analysis State
  const [clickedMapLocation, setClickedMapLocation] = useState<GeoLocationAnalysis | null>(null);
  const [clickedPointCoords, setClickedPointCoords] = useState<{ lat: number; lng: number } | null>(null);

  // USER SESSION — server-backed state and every mutation that touches it.
  //
  // Extracted from this file, which previously held 35 useState hooks, nine `any` payloads and a
  // copy-pasted fetch per mutation. use-study-session.ts documents three behaviour fixes that came with
  // the move: an empty collection returned by the bootstrap trip is now assigned rather than ignored
  // (switching to a user with no field notes used to leave the previous user's notes on the map),
  // optimistic updates are reconciled with the server response and rolled back on failure, and bookmark
  // removal has one path instead of two.
  const {
    currentUser,
    annotations,
    bookmarks,
    quizzes,
    studyProgress,
    toastMessage,
    showToast,
    switchUser: handleSwitchUser,
    registerUser: handleRegisterUser,
    updateProgress: handleUpdateProgress,
    saveAnnotation: handleSaveAnnotation,
    deleteAnnotation: handleDeleteAnnotation,
    toggleBookmark: handleToggleBookmark,
    recordQuizAttempt: handleAttemptComplete,
    createQuiz: handleCreateQuiz,
    isFeatureBookmarked,
    removeBookmark,
  } = useStudySession({
    classGrade: selectedGrade,
    // The hook keeps these callbacks in a ref that it refreshes on every render, so they always close
    // over the current `selectedFeature` rather than a stale one.
    onAnnotationChanged: (annotation) => {
      if (selectedFeature?.id === annotation.id) {
        setSelectedFeature({ ...annotation, isUserAnnotation: true });
      }
    },
    onAnnotationRemoved: (id) => {
      if (selectedFeature?.id === id) setSelectedFeature(null);
    },
  });

  // When clicking on syllabus chapter "Fly to on Map"
  const handleSelectTopicLocation = (
    location: { lat: number; lng: number; zoom: number },
    associatedLayers: string[]
  ) => {
    setFocusLocation(location);

    // Turn on relevant layers for this chapter
    if (associatedLayers && associatedLayers.length > 0) {
      setActiveLayers((prev) => {
        const next = { ...prev };
        if (associatedLayers.includes("rivers")) next.rivers = true;
        if (associatedLayers.includes("mountains")) next.mountains = true;
        if (associatedLayers.includes("soils")) next.soils = true;
        if (associatedLayers.includes("tectonics")) next.tectonics = true;
        if (associatedLayers.includes("climate")) next.climate = true;
        if (associatedLayers.includes("minerals") || associatedLayers.includes("ports")) {
          next.mapItems = true;
        }
        return next;
      });
    }

    showToast(`Focused on ${location.lat.toFixed(1)}°N, ${location.lng.toFixed(1)}°E`);
  };

  // Click on map to drop pin
  const handleAddAnnotationAt = (coords: { lat: number; lng: number }) => {
    setIsPinDroppingMode(false);
    setDroppedCoords(coords);
    setAnnotationToEdit(null);
    setIsAnnotationModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Navbar */}
      <Navbar
        currentMode={currentMode}
        onModeChange={(mode) => {
          if (mode === "profile") {
            setIsElevationModalOpen(true);
          } else {
            setCurrentMode(mode);
          }
        }}
        selectedGrade={selectedGrade}
        onGradeChange={(grade) => {
          setSelectedGrade(grade);
          if (grade === "12") {
            setActiveLayers((prev) => ({ ...prev, mapItems: true }));
          }
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        onOpenAddAnnotation={() => {
          setDroppedCoords({ lat: 22.5, lng: 79.0 });
          setAnnotationToEdit(null);
          setIsAnnotationModalOpen(true);
        }}
        onOpenBookmarks={() => setIsBookmarksModalOpen(true)}
        onToggleElevationModal={() => setIsElevationModalOpen(true)}
        onOpenEarthInterior={() => setIsEarthInteriorOpen(true)}
        onOpenHeatBudget={() => setIsHeatBudgetOpen(true)}
        onOpenPracticalLab={() => setIsPracticalLabOpen(true)}
        onOpenMapPractice={() => setIsMapPracticeOpen(true)}
        activeAnnotationCount={annotations.length}
        isPinDroppingMode={isPinDroppingMode}
        onTogglePinDropping={() => {
          if (currentMode !== "map") {
            setCurrentMode("map");
          }
          setIsPinDroppingMode(!isPinDroppingMode);
          if (!isPinDroppingMode) {
            showToast("Pin dropping mode active: click anywhere on the map!");
          }
        }}
        isZenMode={isZenMode}
        onToggleZenMode={() => {
          setIsZenMode((z) => {
            const next = !z;
            setIsSidebarOpen(!next);
            showToast(next ? "Zen Mode enabled: Maximum visualizer space" : "Standard mode restored");
            return next;
          });
        }}
        lang={lang}
        onToggleLang={() => {
          setLang((l) => {
            const next = l === "en" ? "hi" : "en";
            showToast(next === "hi" ? "हिन्दी माध्यम सक्रिय" : "Switched to English");
            return next;
          });
        }}
      />

      {/* Main Body: Sidebar + Visualizer Viewport */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Syllabus Sidebar */}
        <div
          className={`transition-all duration-300 relative z-30 shrink-0 ${
            isSidebarOpen ? "w-80 md:w-96" : "w-0 overflow-hidden"
          }`}
        >
          <SyllabusSidebar
            selectedGrade={selectedGrade}
            onSelectTopicLocation={handleSelectTopicLocation}
            studyProgress={studyProgress}
            onUpdateProgress={handleUpdateProgress}
            onOpenExamTips={(topic) => setExamTipsTopic(topic)}
            onOpenSimulator={(type) => {
              if (type === "earth_interior") setIsEarthInteriorOpen(true);
              else if (type === "heat_budget") setIsHeatBudgetOpen(true);
              else if (type === "practical") setIsPracticalLabOpen(true);
              else if (type === "map_practice") setIsMapPracticeOpen(true);
            }}
            onOpenConceptExplanation={(term) => {
              const explanation = getConceptExplanation(term);
              setSelectedNcertConcept(explanation);
            }}
            onOpenCharacteristicDeepDive={(charText, parentConcept) => {
              const deepDive = getCharacteristicDeepDive(charText, parentConcept);
              setSelectedCharacteristic(deepDive);
            }}
            lang={lang}
          />
        </div>

        {/* Sidebar Toggle Handle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-2 z-40 p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 shadow-xl transition"
          style={{ left: isSidebarOpen ? "calc(min(24rem, 20rem) + 8px)" : "8px" }}
          title={isSidebarOpen ? "Collapse Syllabus" : "Expand Syllabus"}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Visualizer Canvas Area (Globe or Map) */}
        <main className="flex-1 relative h-full w-full overflow-hidden bg-slate-950">
          {currentMode === "globe" ? (
            <Globe3D
              onSelectFeature={(feat) => setSelectedFeature(feat)}
              activeLayers={activeLayers}
              focusCoords={focusLocation}
              highlightedHq={highlightedHq}
              highlightAllCategory={highlightAllCategory}
            />
          ) : (
            <InteractiveMap
              onSelectFeature={(feat) => {
                setSelectedFeature(feat);
                setClickedMapLocation(null);
              }}
              activeLayers={activeLayers}
              focusLocation={focusLocation}
              userAnnotations={annotations}
              onAddAnnotationAt={handleAddAnnotationAt}
              isPinDroppingMode={isPinDroppingMode}
              highlightedHq={highlightedHq}
              highlightAllCategory={highlightAllCategory}
              onSelectHq={(hq) => {
                setHighlightedHq(hq);
                if (hq) {
                  setSelectedFeature({
                    id: hq.id,
                    title: hq.name,
                    category: hq.categoryLabel,
                    headquartersCity: hq.city,
                    state: `${hq.city}, ${hq.state}`,
                    parentMinistry: hq.parentMinistryOrBody,
                    establishedYear: hq.establishedYear,
                    jurisdictionOrScope: hq.jurisdictionOrScope,
                    cbseExamRelevance: hq.cbseExamRelevance,
                    description: hq.significance,
                    ncertChapter: hq.ncertChapterRef,
                    classGrade: hq.classGrade,
                    isHeadquarters: true,
                  });
                }
              }}
              clickedPointCoords={clickedPointCoords}
              onMapClickInspect={(coords) => {
                setClickedPointCoords(coords);
                const analysis = inspectGeographicPoint(coords.lat, coords.lng);
                setClickedMapLocation(analysis);
                setSelectedFeature(null); // Close other feature drawer to show click analysis
                showToast(`Highlighted point: ${coords.lat.toFixed(2)}°N, ${coords.lng.toFixed(2)}°E`);
              }}
            />
          )}

          {/* Collapsible Map Highlighter & Headquarters Pan */}
          <MapHighlighterPanel
            highlightedHq={highlightedHq}
            onSelectHq={(hq) => {
              setHighlightedHq(hq);
              if (hq) {
                setFocusLocation({ lat: hq.coordinates[0], lng: hq.coordinates[1], zoom: 8 });
                setSelectedFeature({
                  id: hq.id,
                  title: hq.name,
                  category: hq.categoryLabel,
                  headquartersCity: hq.city,
                  state: `${hq.city}, ${hq.state}`,
                  parentMinistry: hq.parentMinistryOrBody,
                  establishedYear: hq.establishedYear,
                  jurisdictionOrScope: hq.jurisdictionOrScope,
                  cbseExamRelevance: hq.cbseExamRelevance,
                  description: hq.significance,
                  ncertChapter: hq.ncertChapterRef,
                  classGrade: hq.classGrade,
                  isHeadquarters: true,
                });
                showToast(`Highlighted: ${hq.shortName} in ${hq.city}`);
              }
            }}
            onFlyToLocation={(coords) => {
              setFocusLocation(coords);
            }}
            highlightAllCategory={highlightAllCategory}
            onToggleHighlightAllCategory={(cat) => {
              setHighlightAllCategory(cat);
              if (cat) {
                showToast(`Highlighting all ${cat.replace("_", " ")} locations`);
              }
            }}
          />

          {/* Toggleable Layer Floating Panel (Collapsible to pill) */}
          <LayerControlPanel
            layers={activeLayers}
            onChangeLayers={setActiveLayers}
            userAnnotationCount={annotations.length}
          />

          {/* Feature Inspector Side Drawer */}
          <FeatureInspector
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
            isBookmarked={isFeatureBookmarked(selectedFeature)}
            onToggleBookmark={handleToggleBookmark}
            onEditAnnotation={(annot) => {
              setAnnotationToEdit(annot);
              setIsAnnotationModalOpen(true);
            }}
            onDeleteAnnotation={handleDeleteAnnotation}
          />

          {/* Dynamic Click Location Highlighter & NCERT Spatial Inspector Drawer */}
          <ClickHighlighterInspector
            analysis={clickedMapLocation}
            onClose={() => {
              setClickedMapLocation(null);
              setClickedPointCoords(null);
            }}
            lang={lang}
            onAddNoteAt={(coords) => {
              setDroppedCoords(coords);
              setAnnotationToEdit(null);
              setIsAnnotationModalOpen(true);
            }}
            onFlyToNearestLandmark={(coords) => {
              setFocusLocation(coords);
            }}
          />

          {/* Floating Zen Mode Indicator Banner (Collapsible / Expandable) */}
          {isZenMode && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-1000 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/40 shadow-2xl flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Zen Visualization Mode Active</span>
              </span>
              <span className="text-slate-500">•</span>
              <button
                onClick={() => {
                  setIsZenMode(false);
                  setIsSidebarOpen(true);
                }}
                className="text-xs text-slate-300 hover:text-white underline font-medium"
              >
                Restore Standard Layout
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Elevation Cross-Section Modal */}
      <ElevationProfileModal
        isOpen={isElevationModalOpen}
        onClose={() => setIsElevationModalOpen(false)}
      />

      {/* Map Skill Quiz Challenge Modal */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        quizzes={quizzes}
        currentUser={currentUser}
        onAttemptComplete={handleAttemptComplete}
        onCreateQuiz={handleCreateQuiz}
        onFlyToLocation={(coords) => {
          setIsQuizModalOpen(false);
          setFocusLocation({ ...coords, zoom: 7 });
          if (currentMode !== "map") setCurrentMode("map");
        }}
      />

      {/* Add / Edit Student Field Note Modal */}
      <AnnotationModal
        // Keyed on the target and on open/close so the form remounts with fresh values instead of being
        // patched by an effect. The isOpen term matters: without it, reopening the SAME note after a
        // cancelled edit would still show the abandoned edits.
        key={`${isAnnotationModalOpen}-${annotationToEdit?.id ?? ""}-${droppedCoords ? `${droppedCoords.lat},${droppedCoords.lng}` : ""}`}
        isOpen={isAnnotationModalOpen}
        onClose={() => {
          setIsAnnotationModalOpen(false);
          setAnnotationToEdit(null);
          setDroppedCoords(null);
        }}
        initialCoords={droppedCoords}
        annotationToEdit={annotationToEdit}
        onSave={handleSaveAnnotation}
        currentUser={currentUser}
      />

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={isBookmarksModalOpen}
        onClose={() => setIsBookmarksModalOpen(false)}
        bookmarks={bookmarks}
        onSelectBookmark={(bm) => {
          if (bm.coordinates) {
            setFocusLocation(bm.coordinates);
          }
          setSelectedFeature(bm);
        }}
        onRemoveBookmark={(featureId) => {
          // Was a bare fetch here: no idempotency key, no error handling, no rollback, no toast. It now
          // goes through the same operation the map's bookmark button uses.
          void removeBookmark(featureId);
        }}
      />

      {/* Profile & Switcher Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        onRegisterUser={handleRegisterUser}
      />

      {/* Exam Tips Modal */}
      <ExamTipsModal
        topic={examTipsTopic}
        onClose={() => setExamTipsTopic(null)}
        onFlyToMap={(loc) => {
          setFocusLocation(loc);
          if (examTipsTopic?.associatedLayers) {
            handleSelectTopicLocation(loc, examTipsTopic.associatedLayers);
          }
        }}
        onOpenConceptExplanation={(term) => {
          const explanation = getConceptExplanation(term);
          setSelectedNcertConcept(explanation);
        }}
      />

      {/* NCERT Concept Explanation Modal */}
      <NcertConceptModal
        concept={selectedNcertConcept}
        onClose={() => setSelectedNcertConcept(null)}
        onOpenCharacteristicDeepDive={(charText, parentConcept) => {
          const deepDive = getCharacteristicDeepDive(charText, parentConcept);
          setSelectedCharacteristic(deepDive);
        }}
        lang={lang}
      />

      {/* NCERT Salient Characteristic Deep-Dive Modal */}
      <CharacteristicDeepDiveModal
        characteristic={selectedCharacteristic}
        onClose={() => setSelectedCharacteristic(null)}
        lang={lang}
      />

      {/* 1. Earth Interior & Seismic Wave Shadow Zone Simulator Modal */}
      {isEarthInteriorOpen && (
        <div className="fixed inset-0 z-[1150] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <button
              onClick={() => setIsEarthInteriorOpen(false)}
              className="absolute top-3 right-3 z-50 p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 transition"
              title="Close Simulator"
            >
              <X className="w-5 h-5" />
            </button>
            <EarthInteriorSimulator onClose={() => setIsEarthInteriorOpen(false)} lang={lang} />
          </div>
        </div>
      )}

      {/* 2. Insolation & Global Heat Budget Simulator Modal */}
      {isHeatBudgetOpen && (
        <div className="fixed inset-0 z-[1150] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <button
              onClick={() => setIsHeatBudgetOpen(false)}
              className="absolute top-3 right-3 z-50 p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 transition"
              title="Close Simulator"
            >
              <X className="w-5 h-5" />
            </button>
            <InsolationHeatBudgetSimulator onClose={() => setIsHeatBudgetOpen(false)} lang={lang} />
          </div>
        </div>
      )}

      {/* 3. Practical Geography & GIS Lab Modal */}
      {isPracticalLabOpen && (
        <div className="fixed inset-0 z-[1150] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <button
              onClick={() => setIsPracticalLabOpen(false)}
              className="absolute top-3 right-3 z-50 p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 transition"
              title="Close Lab"
            >
              <X className="w-5 h-5" />
            </button>
            <PracticalGeographyLab onClose={() => setIsPracticalLabOpen(false)} lang={lang} />
          </div>
        </div>
      )}

      {/* 4. CBSE Prescribed Map Practice Engine Modal */}
      {isMapPracticeOpen && (
        <div className="fixed inset-0 z-[1150] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <button
              onClick={() => setIsMapPracticeOpen(false)}
              className="absolute top-3 right-3 z-50 p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 transition"
              title="Close Map Engine"
            >
              <X className="w-5 h-5" />
            </button>
            <CbseMapPracticeEngine
              onFlyToLocation={(coords) => {
                setFocusLocation(coords);
                setIsMapPracticeOpen(false);
                if (currentMode !== "map") setCurrentMode("map");
                showToast(`Focused on ${coords.lat.toFixed(2)}°N, ${coords.lng.toFixed(2)}°E`);
              }}
              onClose={() => setIsMapPracticeOpen(false)}
              lang={lang}
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-2000 bg-slate-900/95 text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

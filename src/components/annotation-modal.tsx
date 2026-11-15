"use client";

import React, { useState } from "react";
import { X, MapPin, Tag, Compass, Layers, Sparkles } from "lucide-react";

interface AnnotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCoords?: { lat: number; lng: number } | null;
  annotationToEdit?: any | null;
  onSave: (annotation: any) => Promise<void>;
  currentUser: any;
}

/** The form's starting values, derived from what the modal was opened for. */
interface FormSeed {
  title: string;
  description: string;
  category: string;
  lat: string;
  lng: string;
  elevation: string;
  classGrade: string;
  chapterRef: string;
  markerColor: string;
  tags: string[];
}

/**
 * Editing an existing note fills the form from it; dropping a pin pre-fills coordinates and sensible
 * defaults; otherwise the form starts empty. The empty branch reproduces the original `useState`
 * defaults exactly, so opening the modal with nothing selected behaves as it did before.
 */
function seedFormValues(
  annotationToEdit: AnnotationModalProps["annotationToEdit"],
  initialCoords: AnnotationModalProps["initialCoords"],
  currentUser: AnnotationModalProps["currentUser"],
): FormSeed {
  if (annotationToEdit) {
    return {
      title: annotationToEdit.title || "",
      description: annotationToEdit.description || "",
      category: annotationToEdit.category || "rivers",
      lat: String(annotationToEdit.latitude || ""),
      lng: String(annotationToEdit.longitude || ""),
      elevation: annotationToEdit.elevation || "",
      classGrade: annotationToEdit.classGrade || "11",
      chapterRef: annotationToEdit.chapterRef || "",
      markerColor: annotationToEdit.markerColor || "#3b82f6",
      tags: annotationToEdit.tags || [],
    };
  }
  if (initialCoords) {
    return {
      title: "",
      description: "",
      category: "rivers",
      lat: initialCoords.lat.toFixed(4),
      lng: initialCoords.lng.toFixed(4),
      elevation: "",
      classGrade: currentUser?.classGrade || "11",
      chapterRef: "Class 11 - Physiography & Drainage",
      markerColor: "#10b981",
      tags: ["CBSE Board Prep"],
    };
  }
  return {
    title: "",
    description: "",
    category: "rivers",
    lat: "",
    lng: "",
    elevation: "",
    classGrade: "11",
    chapterRef: "Class 11 - India: Physical Environment, Ch 3",
    markerColor: "#3b82f6",
    tags: [],
  };
}

export default function AnnotationModal({
  isOpen,
  onClose,
  initialCoords,
  annotationToEdit,
  onSave,
  currentUser,
}: AnnotationModalProps) {
  // Form values are derived from props ONCE, at mount, instead of being pushed in by an effect. The
  // parent keys this component on the target note and on open/close, so opening a different note
  // remounts it with fresh values. That replaces an effect firing eleven setState calls in a row on
  // every prop change — a render cascade, and the reason the form could briefly render the previous
  // note's contents before the effect caught up.
  const seed = seedFormValues(annotationToEdit, initialCoords, currentUser);

  const [title, setTitle] = useState(seed.title);
  const [description, setDescription] = useState(seed.description);
  const [category, setCategory] = useState(seed.category);
  const [lat, setLat] = useState(seed.lat);
  const [lng, setLng] = useState(seed.lng);
  const [elevation, setElevation] = useState(seed.elevation);
  const [classGrade, setClassGrade] = useState(seed.classGrade);
  const [chapterRef, setChapterRef] = useState(seed.chapterRef);
  const [markerColor, setMarkerColor] = useState(seed.markerColor);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(seed.tags);
  const [isSubmitting, setIsSubmitting] = useState(false);


  if (!isOpen) return null;

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !lat || !lng) return;

    setIsSubmitting(true);
    try {
      await onSave({
        id: annotationToEdit?.id,
        title: title.trim(),
        description: description.trim(),
        category,
        latitude: lat,
        longitude: lng,
        elevation: elevation.trim() || "Not specified",
        classGrade,
        chapterRef,
        markerColor,
        tags,
        userId: currentUser?.id || "user-aarav-11",
      });
      onClose();
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-1100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-sm text-white">
              {annotationToEdit ? "Edit Student Field Note" : "Add New Geography Field Note"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Feature / Note Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Majuli River Island - Fluvial Deposition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Coordinates & Elevation */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Latitude (°N/S) *</label>
              <input
                type="text"
                required
                placeholder="26.95"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Longitude (°E/W) *</label>
              <input
                type="text"
                required
                placeholder="94.20"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Elevation</label>
              <input
                type="text"
                placeholder="85m"
                value={elevation}
                onChange={(e) => setElevation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
              />
            </div>
          </div>

          {/* Category & Grade */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
              >
                <option value="rivers">Rivers & Drainage</option>
                <option value="mountains">Mountains & Relief</option>
                <option value="soils">Soils & Agriculture</option>
                <option value="tectonics">Tectonic Plates & Faults</option>
                <option value="climate">Climate & Atmosphere</option>
                <option value="minerals">Minerals & Energy (Class 12)</option>
                <option value="ports">Ports & Transport (Class 12)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">CBSE Class Grade</label>
              <select
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100"
              >
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                <option value="both">Both Classes</option>
              </select>
            </div>
          </div>

          {/* NCERT Chapter */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">NCERT Chapter Reference</label>
            <input
              type="text"
              placeholder="e.g. Class 11 - India: Physical Environment, Ch 3 Drainage"
              value={chapterRef}
              onChange={(e) => setChapterRef(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Detailed Observations */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Field Observations & Key Facts</label>
            <textarea
              rows={3}
              placeholder="Record geomorphic origin, antecedent characteristics, economic value, or NCERT exam tips..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Marker Color */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">Pin Marker Color</label>
            <div className="flex items-center gap-3">
              {["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#ef4444"].map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setMarkerColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition ${
                    markerColor === c ? "scale-125 border-white shadow-lg" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Keywords / Revision Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-100"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] flex items-center gap-1 border border-slate-700"
                >
                  <span>#{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="text-slate-400 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold transition shadow-md"
            >
              {isSubmitting ? "Saving..." : annotationToEdit ? "Update Note" : "Save Field Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

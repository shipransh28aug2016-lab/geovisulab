"use client";

import React from "react";
import { X, Bookmark, ExternalLink, Trash2, MapPin, Sparkles } from "lucide-react";

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: any[];
  onSelectBookmark: (bookmark: any) => void;
  onRemoveBookmark: (featureId: string) => void;
}

export default function BookmarksModal({
  isOpen,
  onClose,
  bookmarks,
  onSelectBookmark,
  onRemoveBookmark,
}: BookmarksModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-current" />
            <h2 className="font-bold text-sm text-white">
              My Saved CBSE Geography Bookmarks ({bookmarks.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-sm font-semibold text-slate-400">No bookmarks saved yet</p>
              <p className="text-xs max-w-xs mx-auto">
                Click any river, mountain peak, or soil region on the 3D globe or map and hit "Bookmark for Revision".
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                      Class {bm.classGrade || "11"}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase">
                      {bm.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white leading-tight">
                    {bm.title}
                  </h4>
                  {bm.notes && (
                    <p className="text-xs text-slate-400 line-clamp-1">{bm.notes}</p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onSelectBookmark(bm);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition text-xs font-semibold flex items-center gap-1"
                    title="View on Map"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(bm.featureId)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

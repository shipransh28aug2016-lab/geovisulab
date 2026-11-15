"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Globe2, Landmark } from "lucide-react";

const GeosphereApp = dynamic(() => import("@/components/geosphere-app"), {
  ssr: false,
  loading: () => <Loading label="Loading GeoSphere 3D…" />,
});
const AtlasView = dynamic(() => import("@/components/atlas/atlas-view"), {
  ssr: false,
  loading: () => <Loading label="Loading Historical Atlas…" />,
});

type View = "geosphere" | "atlas";
const KEY = "geovisulab:view";

function Loading({ label }: { label: string }) {
  return <div className="h-[calc(100vh-44px)] grid place-items-center text-sm text-slate-400">{label}</div>;
}

/** Single entry point: one toggle switches between the CBSE visualiser and the historical atlas. */
export default function AppShell() {
  const [view, setView] = useState<View>("geosphere");

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("view");
      const saved = q ?? window.localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "atlas" || saved === "geosphere") setView(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const choose = (v: View) => {
    setView(v);
    try {
      window.localStorage.setItem(KEY, v);
      const url = new URL(window.location.href);
      url.searchParams.set("view", v);
      window.history.replaceState(null, "", url);
    } catch {
      /* ignore */
    }
  };

  const tab = (v: View, label: string, Icon: typeof Globe2) => (
    <button
      role="tab"
      aria-selected={view === v}
      onClick={() => choose(v)}
      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
        view === v ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"
      }`}
    >
      <Icon size={14} /> {label}
    </button>
  );

  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="h-11 flex items-center gap-3 px-3 border-b border-slate-800 bg-slate-950">
        <span className="text-sm font-bold tracking-tight">GeoVisuLab</span>
        <div role="tablist" aria-label="Application mode" className="flex gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          {tab("geosphere", "GeoSphere 3D · CBSE", Globe2)}
          {tab("atlas", "Historical Atlas · Ganga–Magadha", Landmark)}
        </div>
      </div>
      {view === "geosphere" ? <GeosphereApp /> : <AtlasView />}
    </div>
  );
}

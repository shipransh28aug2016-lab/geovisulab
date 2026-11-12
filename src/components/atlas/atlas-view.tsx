"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Feature, FeatureCollection, Geometry, Position } from "geojson";
import { Play, Pause, Info, MapPin, X, AlertTriangle } from "lucide-react";
import { resolveText, type LanguageMode, type LocalisedText } from "@/lib/atlas/model";

/* ---------- API payload shapes (narrow, client-side) ---------- */
interface TimelineEvent {
  id: string;
  date: string;
  dateCertainty: string;
  title: LocalisedText;
  importance: number;
  eventType: string;
  placeId?: string;
  geometry?: { type: "Point"; coordinates: [number, number] };
  displayDate: LocalisedText;
}
interface SnapEntity { id: string; names: { text: string; lang: string }[]; entityType: string }
interface SnapPlace { id: string; canonicalName: LocalisedText; geometry: { coordinates: [number, number] } }
interface Snapshot {
  displayYear: LocalisedText;
  century: LocalisedText;
  entities: SnapEntity[];
  places: SnapPlace[];
  counts: { entities: number; assertions: number; events: number; places: number; shapes: number };
  shapeTier: string;
  bounds: [number, number, number, number];
}
interface SnapResponse {
  snapshot: Snapshot;
  shapes: { tier: string; requested: number; found: number; features: Feature<Geometry>[]; missing: string[]; note?: string };
  shapeEntity: Record<string, string>;
  error?: string;
}
interface Basemap {
  clipWindow: { west: number; south: number; east: number; north: number };
  corridor: { west: number; south: number; east: number; north: number };
  attribution: string;
  layers: Record<string, FeatureCollection<Geometry>>;
}
interface EventDetail {
  event: {
    title: LocalisedText; summary: LocalisedText; significance?: LocalisedText; dateCertainty: string;
    competingAccounts?: { account: LocalisedText }[];
    sources: { source: string; locator: string }[];
  };
  sources: { id: string; title: LocalisedText; author?: string; url?: string }[];
}

const MIN_Y = -600;
const MAX_Y = 2000;
const HUES = [18, 48, 142, 190, 262, 330, 90, 220, 4, 168];
const hueFor = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return HUES[h % HUES.length];
};

function histLabel(y: number): string {
  // astronomical -> historical: 0 = 1 BCE
  return y <= 0 ? `${1 - y} BCE` : `${y} CE`;
}
function toQuery(y: number): string {
  return `astronomical=${y}`;
}

export default function AtlasView() {
  const [lang, setLang] = useState<LanguageMode>("en");
  const [year, setYear] = useState(-260);
  const [playing, setPlaying] = useState(false);
  const [basemap, setBasemap] = useState<Basemap | null>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [snap, setSnap] = useState<SnapResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<TimelineEvent | null>(null);
  const [detail, setDetail] = useState<EventDetail | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [size, setSize] = useState({ w: 800, h: 500 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hitRef = useRef<Array<{ x: number; y: number; id: string }>>([]);

  /* static data */
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const [b, t] = await Promise.all([
          fetch("/api/atlas/basemap", { signal: ac.signal }).then((r) => r.json()),
          fetch("/api/atlas/timeline", { signal: ac.signal }).then((r) => r.json()),
        ]);
        if (b.error) throw new Error(b.error);
        if (t.error) throw new Error(t.error);
        setBasemap(b);
        setEvents(t.events);
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError((e as Error).message);
      }
    })();
    return () => ac.abort();
  }, []);

  /* snapshot per year (debounced) */
  useEffect(() => {
    const ac = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const r = await fetch(`/api/atlas/snapshot?${toQuery(year)}`, { signal: ac.signal });
        const j = (await r.json()) as SnapResponse;
        if (!r.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
        setSnap(j);
        setError(null);
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }, 120);
    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [year]);

  /* play */
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setYear((y) => (y >= MAX_Y ? MIN_Y : Math.min(MAX_Y, y + 10))), 450);
    return () => clearInterval(id);
  }, [playing]);

  /* resize */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  /* event detail */
  useEffect(() => {
    if (!selected) {
      setDetail(null);
      return;
    }
    const ac = new AbortController();
    fetch(`/api/atlas/event?event=${encodeURIComponent(selected.id)}`, { signal: ac.signal })
      .then((r) => r.json())
      .then((j) => !j.error && setDetail(j))
      .catch(() => {});
    return () => ac.abort();
  }, [selected]);

  const entityName = useMemo(() => {
    const m = new Map<string, string>();
    snap?.snapshot.entities.forEach((e) => m.set(e.id, e.names.find((n) => n.lang === "en")?.text ?? e.names[0]?.text ?? e.id));
    return m;
  }, [snap]);

  const visibleEvents = useMemo(() => {
    // events whose date year is within +-25 of slider, plus all importance>=4 as faint context
    return events.filter((e) => !!e.geometry);
  }, [events]);

  const eventYear = useCallback((e: TimelineEvent) => {
    const m = /^(-?\d{1,6})/.exec(e.date);
    return m ? parseInt(m[1], 10) : null;
  }, []);

  /* draw */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !basemap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { west, south, east, north } = basemap.corridor;
    const pad = 1.2;
    const w0 = west - pad, e0 = east + pad, s0 = south - pad, n0 = north + pad;
    const midLat = ((s0 + n0) / 2) * (Math.PI / 180);
    const kx = Math.cos(midLat);
    const scale = Math.min(size.w / ((e0 - w0) * kx), size.h / (n0 - s0));
    const ox = (size.w - (e0 - w0) * kx * scale) / 2;
    const oy = (size.h - (n0 - s0) * scale) / 2;
    const px = (lon: number) => ox + (lon - w0) * kx * scale;
    const py = (lat: number) => oy + (n0 - lat) * scale;

    ctx.fillStyle = "#06121f";
    ctx.fillRect(0, 0, size.w, size.h);

    const path = (geom: Geometry | null) => {
      if (!geom) return;
      const ring = (r: Position[]) => {
        r.forEach((p, i) => (i ? ctx.lineTo(px(p[0]), py(p[1])) : ctx.moveTo(px(p[0]), py(p[1]))));
      };
      if (geom.type === "Polygon") geom.coordinates.forEach((r) => { ring(r); ctx.closePath(); });
      else if (geom.type === "MultiPolygon") geom.coordinates.forEach((poly) => poly.forEach((r) => { ring(r); ctx.closePath(); }));
      else if (geom.type === "LineString") ring(geom.coordinates);
      else if (geom.type === "MultiLineString") geom.coordinates.forEach(ring);
    };
    const drawFC = (fc: FeatureCollection<Geometry> | undefined, fill?: string, stroke?: string, lw = 1) => {
      if (!fc) return;
      ctx.beginPath();
      fc.features.forEach((f) => path(f.geometry));
      if (fill) { ctx.fillStyle = fill; ctx.fill("evenodd"); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    };

    drawFC(basemap.layers.land, "#142a22");
    drawFC(basemap.layers.graticule, undefined, "rgba(148,163,184,0.12)", 0.5);
    drawFC(basemap.layers.lakes, "#0b3a5c");

    // polities
    snap?.shapes.features.forEach((f) => {
      const id = String((f.properties as { id?: string } | null)?.id ?? f.id ?? "");
      const ent = snap.shapeEntity[id] ?? id;
      const hue = hueFor(ent);
      ctx.beginPath();
      path(f.geometry);
      ctx.fillStyle = `hsla(${hue},65%,55%,${hover === ent ? 0.55 : 0.32})`;
      ctx.fill("evenodd");
      ctx.strokeStyle = `hsla(${hue},75%,70%,0.9)`;
      ctx.lineWidth = hover === ent ? 2 : 1;
      ctx.setLineDash([4, 3]); // approximate boundaries are dashed on purpose
      ctx.stroke();
      ctx.setLineDash([]);
    });

    drawFC(basemap.layers.rivers, undefined, "rgba(56,189,248,0.75)", 1.1);
    drawFC(basemap.layers.coastline, undefined, "rgba(148,163,184,0.5)", 0.8);

    // places named by events in this year
    ctx.fillStyle = "rgba(226,232,240,0.9)";
    ctx.font = "11px system-ui, sans-serif";
    snap?.snapshot.places.forEach((p) => {
      const [lon, lat] = p.geometry.coordinates;
      ctx.beginPath();
      ctx.arc(px(lon), py(lat), 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(resolveText(p.canonicalName, lang === "bilingual" ? "en" : lang), px(lon) + 5, py(lat) - 4);
    });

    // events
    const hits: typeof hitRef.current = [];
    visibleEvents.forEach((e) => {
      const y = eventYear(e);
      const near = y !== null && Math.abs(y - year) <= 30;
      if (!near && e.importance < 5) return;
      const [lon, lat] = e.geometry!.coordinates;
      const x = px(lon), yy = py(lat);
      ctx.beginPath();
      ctx.arc(x, yy, near ? 6 : 3, 0, Math.PI * 2);
      ctx.fillStyle = near ? "#f59e0b" : "rgba(245,158,11,0.35)";
      ctx.fill();
      ctx.strokeStyle = selected?.id === e.id ? "#fff" : "rgba(0,0,0,0.5)";
      ctx.lineWidth = selected?.id === e.id ? 2 : 1;
      ctx.stroke();
      hits.push({ x, y: yy, id: e.id });
    });
    hitRef.current = hits;
  }, [basemap, snap, size, visibleEvents, year, selected, hover, lang, eventYear]);

  const onCanvasClick = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    const r = ev.currentTarget.getBoundingClientRect();
    const x = ev.clientX - r.left, y = ev.clientY - r.top;
    let best: { id: string; d: number } | null = null;
    for (const h of hitRef.current) {
      const d = Math.hypot(h.x - x, h.y - y);
      if (d < 12 && (!best || d < best.d)) best = { id: h.id, d };
    }
    setSelected(best ? (events.find((e) => e.id === best!.id) ?? null) : null);
  };

  const nearEvents = useMemo(
    () => events.filter((e) => { const y = eventYear(e); return y !== null && Math.abs(y - year) <= 30; }).slice(0, 12),
    [events, year, eventYear],
  );

  const shapeEntities = useMemo(() => {
    if (!snap) return [] as { id: string; name: string }[];
    return [...new Set(Object.values(snap.shapeEntity))].map((id) => ({ id, name: entityName.get(id) ?? id }));
  }, [snap, entityName]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-44px)] bg-slate-950 text-slate-100">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex flex-wrap items-center gap-3 px-4 py-2 border-b border-slate-800 bg-slate-900/80">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-semibold"
            aria-label={playing ? "Pause timeline" : "Play timeline"}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "Pause" : "Play"}
          </button>
          <div className="text-lg font-bold tabular-nums">{histLabel(year)}</div>
          <div className="text-xs text-slate-400">{snap ? resolveText(snap.snapshot.century, lang) : ""}</div>
          {loading && <span className="text-xs text-slate-500">loading…</span>}
          <div className="ml-auto flex gap-1 text-xs bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            {(["en", "hi", "bilingual"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setLang(m)}
                className={`px-2 py-1 rounded-md font-semibold ${lang === m ? "bg-emerald-500 text-white" : "text-slate-400"}`}
              >
                {m === "en" ? "EN" : m === "hi" ? "हिं" : "EN+हिं"}
              </button>
            ))}
          </div>
          <input
            type="range"
            min={MIN_Y}
            max={MAX_Y}
            step={1}
            value={year}
            onChange={(e) => { setPlaying(false); setYear(Number(e.target.value)); }}
            className="w-full accent-emerald-500"
            aria-label="Year"
          />
        </div>

        <div ref={wrapRef} className="relative flex-1 min-h-[320px]">
          <canvas ref={canvasRef} onClick={onCanvasClick} style={{ width: "100%", height: "100%" }} className="cursor-pointer block" />
          {error && (
            <div className="absolute top-3 left-3 right-3 flex gap-2 items-start rounded-lg border border-amber-500/40 bg-amber-950/80 p-3 text-xs text-amber-200">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" /> <span>{error}</span>
            </div>
          )}
          {snap && snap.shapes.missing.length > 0 && (
            <div className="absolute bottom-2 left-2 max-w-md rounded-lg bg-slate-900/90 border border-slate-700 p-2 text-[11px] text-slate-300 flex gap-1.5">
              <Info size={12} className="mt-0.5 shrink-0" />
              Showing {snap.shapes.found} of {snap.shapes.requested} asserted boundaries (&ldquo;{snap.shapes.tier}&rdquo; tier). Boundaries are approximate.
            </div>
          )}
          {basemap && <div className="absolute bottom-2 right-2 max-w-xs text-[10px] text-slate-500 text-right">{basemap.attribution}</div>}
        </div>
      </div>

      <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/60 overflow-y-auto p-4 space-y-4 max-h-[45vh] lg:max-h-none">
        {selected ? (
          <section>
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-bold text-base">{resolveText(selected.title, lang)}</h2>
              <button onClick={() => setSelected(null)} aria-label="Close"><X size={16} /></button>
            </div>
            <p className="text-xs text-emerald-400 mt-0.5">{resolveText(selected.displayDate, lang)} · {selected.dateCertainty}</p>
            {detail ? (
              <div className="mt-2 space-y-2 text-sm text-slate-300">
                <p>{resolveText(detail.event.summary, lang)}</p>
                {detail.event.significance && <p className="text-slate-400"><b>Why it matters:</b> {resolveText(detail.event.significance, lang)}</p>}
                {detail.event.competingAccounts?.length ? (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-950/30 p-2 text-xs">
                    <b>Historians differ:</b>
                    <ul className="list-disc ml-4 mt-1">{detail.event.competingAccounts.map((c, i) => <li key={i}>{resolveText(c.account, lang)}</li>)}</ul>
                  </div>
                ) : null}
                <div className="text-xs text-slate-500">
                  <b>Sources:</b>{" "}
                  {detail.sources.map((s) => resolveText(s.title, "en")).join("; ") || "—"}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-2">Loading evidence…</p>
            )}
          </section>
        ) : (
          <p className="text-xs text-slate-500 flex gap-1.5"><MapPin size={12} className="mt-0.5" /> Click an amber marker to read the evidence for that event.</p>
        )}

        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Polities in {histLabel(year)}</h3>
          {shapeEntities.length === 0 ? (
            <p className="text-xs text-slate-500">No boundary geometry for this year in the loaded dataset — this means “not in this dataset”, not “no state existed”.</p>
          ) : (
            <ul className="space-y-1">
              {shapeEntities.map((s) => (
                <li
                  key={s.id}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                  className="flex items-center gap-2 text-xs"
                >
                  <span className="w-3 h-3 rounded-sm" style={{ background: `hsl(${hueFor(s.id)},65%,55%)` }} />
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Events near this year</h3>
          {nearEvents.length === 0 ? (
            <p className="text-xs text-slate-500">No curated events within ±30 years.</p>
          ) : (
            <ul className="space-y-1">
              {nearEvents.map((e) => (
                <li key={e.id}>
                  <button onClick={() => setSelected(e)} className="text-left text-xs hover:text-emerald-400">
                    <span className="text-slate-500">{resolveText(e.displayDate, "en")}</span> — {resolveText(e.title, lang)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <p className="text-[10px] text-slate-600">
          Polity boundaries: Cliopatria (Seshat), CC BY 4.0 — generalised, imported-unreviewed. Dashed outlines mark approximate edges.
        </p>
      </aside>
    </div>
  );
}

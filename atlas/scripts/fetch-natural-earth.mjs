/**
 * atlas:basemap — download Natural Earth (PUBLIC DOMAIN) physical layers and clip them to the pilot
 * corridor, producing a small committed basemap.
 *
 * WHY A PHYSICAL BASEMAP AND NO OSM/SATELLITE BASEMAP.
 * A modern basemap under an ancient map is not neutral decoration — it teaches the wrong thing. It
 * puts India's post-1947 state boundaries, Pakistan, Bangladesh, Nepal and the current road and rail
 * network underneath a viewer who is looking at the Mahajanapadas of 600 BCE, and the directive for
 * this platform is explicit: do not use contemporary political borders as if they existed unchanged
 * in the past. So the Atlas basemap is deliberately *pre-political*: land, coastline, rivers, lakes
 * and graticule only. No country outlines, no state lines, no modern cities.
 *
 * Natural Earth is public domain, which removes any redistribution question for the base layers.
 * See docs/LICENCE_AUDIT.md.
 *
 * WHY CLIP. `ne_50m_land.geojson` is the whole world (1.6 MB). The pilot is one corridor. Clipping to
 * the corridor plus a margin gives a ~200 KB committed file that is also what the browser needs.
 *
 * Usage: node atlas/scripts/fetch-natural-earth.mjs [--force]
 */

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { downloadBuffer } from "./lib/download.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ATLAS_ROOT = path.resolve(HERE, "..");
const OUT_DIR = path.join(ATLAS_ROOT, "data", "pilot", "basemap");

/** Must match the corridor in import-cliopatria.ts, plus a margin so the edges are not obviously cut. */
const CORRIDOR = { west: 76.5, south: 19.8, east: 91.5, north: 31.5 };
const MARGIN = 4.0;
const WINDOW = {
  west: CORRIDOR.west - MARGIN,
  south: CORRIDOR.south - MARGIN,
  east: CORRIDOR.east + MARGIN,
  north: CORRIDOR.north + MARGIN,
};

/** Natural Earth releases live in the GitHub mirror, which is reachable and pin-able. */
const LAYERS = [
  // 10m resolution, not 50m. Measured reason: at 50m Natural Earth carries only the trunk rivers
  // (Ganges, Yamuna, Brahmaputra, Indus, Sutlej, Chenab) and none of the Ganga's major tributaries.
  // For a corridor whose entire subject is the Ganga system and the settlements on it, that is not
  // good enough - Ghaghara, Gandak, Kosi, Son, Damodar, Gomti and Punpun are all syllabus content and
  // all physically decisive for Magadha. 10m has them.
  {
    file: "ne_10m_land.geojson",
    url: "https://api.github.com/repos/nvkelso/natural-earth-vector/contents/geojson/ne_10m_land.geojson?ref=master",
    out: "land.geojson",
    keep: [],
    note: "Land polygons only - deliberately no admin_0 countries or boundary lines.",
  },
  {
    file: "ne_10m_coastline.geojson",
    url: "https://api.github.com/repos/nvkelso/natural-earth-vector/contents/geojson/ne_10m_coastline.geojson?ref=master",
    out: "coastline.geojson",
    keep: [],
    note: "Coastline, for the delta and port discussion.",
  },
  {
    file: "ne_10m_rivers_lake_centerlines.geojson",
    url: "https://api.github.com/repos/nvkelso/natural-earth-vector/contents/geojson/ne_10m_rivers_lake_centerlines.geojson?ref=master",
    out: "rivers.geojson",
    keep: ["name", "name_en", "name_hi", "name_alt", "featurecla", "scalerank", "stroke", "note"],
    note: "River centre-lines at 10m. The Ganga system is the physical spine of the whole pilot.",
  },
  {
    file: "ne_10m_lakes.geojson",
    url: "https://api.github.com/repos/nvkelso/natural-earth-vector/contents/geojson/ne_10m_lakes.geojson?ref=master",
    out: "lakes.geojson",
    keep: ["name", "name_en", "featurecla", "scalerank"],
    note: "Lakes and reservoirs.",
  },
];

const force = process.argv.includes("--force");

// ---------------------------------------------------------------------------
// Clipping. A bounding box is convex, so Sutherland-Hodgman is exactly correct
// for polygons and needs no external clipping library.
// ---------------------------------------------------------------------------

const INSIDE = {
  left: (p) => p[0] >= WINDOW.west,
  right: (p) => p[0] <= WINDOW.east,
  bottom: (p) => p[1] >= WINDOW.south,
  top: (p) => p[1] <= WINDOW.north,
};

function intersectEdge(a, b, edge) {
  const t =
    edge === "left" || edge === "right"
      ? ((edge === "left" ? WINDOW.west : WINDOW.east) - a[0]) / (b[0] - a[0])
      : ((edge === "bottom" ? WINDOW.south : WINDOW.north) - a[1]) / (b[1] - a[1]);
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}

function clipRing(ring) {
  let output = ring.map((p) => [p[0], p[1]]);
  for (const edge of ["left", "right", "bottom", "top"]) {
    if (output.length === 0) break;
    const input = output;
    output = [];
    for (let i = 0; i < input.length; i++) {
      const current = input[i];
      const previous = input[(i + input.length - 1) % input.length];
      const curIn = INSIDE[edge](current);
      const prevIn = INSIDE[edge](previous);
      if (curIn) {
        if (!prevIn) output.push(intersectEdge(previous, current, edge));
        output.push(current);
      } else if (prevIn) {
        output.push(intersectEdge(previous, current, edge));
      }
    }
  }
  return output;
}

function clipLine(line) {
  // Split a line string into the runs that fall inside the window.
  const runs = [];
  let run = [];
  for (let i = 0; i < line.length; i++) {
    const p = line[i];
    const inside = INSIDE.left(p) && INSIDE.right(p) && INSIDE.bottom(p) && INSIDE.top(p);
    if (inside) {
      if (run.length === 0 && i > 0) {
        const prev = line[i - 1];
        // Walk the entering edge so the clipped line starts on the window boundary.
        run.push(intersectEdge(prev, p, prev[0] < WINDOW.west ? "left" : prev[0] > WINDOW.east ? "right" : prev[1] < WINDOW.south ? "bottom" : "top"));
      }
      run.push([p[0], p[1]]);
    } else if (run.length > 0) {
      const prev = line[i - 1];
      run.push(intersectEdge(prev, p, p[0] < WINDOW.west ? "left" : p[0] > WINDOW.east ? "right" : p[1] < WINDOW.south ? "bottom" : "top"));
      if (run.length >= 2) runs.push(run);
      run = [];
    }
  }
  if (run.length >= 2) runs.push(run);
  return runs;
}

const r4 = (n) => Math.round(n * 1e4) / 1e4;

function clipGeometry(geometry) {
  if (!geometry) return null;
  const { type, coordinates } = geometry;
  if (type === "Point") {
    const p = coordinates;
    return INSIDE.left(p) && INSIDE.right(p) && INSIDE.bottom(p) && INSIDE.top(p)
      ? { type, coordinates: [r4(p[0]), r4(p[1])] }
      : null;
  }
  if (type === "MultiPoint") {
    const pts = coordinates
      .filter((p) => INSIDE.left(p) && INSIDE.right(p) && INSIDE.bottom(p) && INSIDE.top(p))
      .map((p) => [r4(p[0]), r4(p[1])]);
    return pts.length ? { type, coordinates: pts } : null;
  }
  if (type === "LineString") {
    const runs = clipLine(coordinates);
    if (runs.length === 0) return null;
    if (runs.length === 1) return { type, coordinates: runs[0].map((p) => [r4(p[0]), r4(p[1])]) };
    return { type: "MultiLineString", coordinates: runs.map((r) => r.map((p) => [r4(p[0]), r4(p[1])])) };
  }
  if (type === "MultiLineString") {
    const runs = coordinates.flatMap(clipLine);
    return runs.length ? { type: "MultiLineString", coordinates: runs.map((r) => r.map((p) => [r4(p[0]), r4(p[1])])) } : null;
  }
  if (type === "Polygon") {
    const rings = coordinates.map(clipRing).filter((r) => r.length >= 4);
    return rings.length ? { type, coordinates: rings.map((r) => r.map((p) => [r4(p[0]), r4(p[1])])) } : null;
  }
  if (type === "MultiPolygon") {
    const polys = coordinates
      .map((rings) => rings.map(clipRing).filter((r) => r.length >= 4))
      .filter((rings) => rings.length > 0)
      .map((rings) => rings.map((r) => r.map((p) => [r4(p[0]), r4(p[1])])));
    return polys.length ? { type, coordinates: polys } : null;
  }
  return null;
}

function projectProps(props, keep) {
  if (!keep || keep.length === 0) return {};
  const out = {};
  for (const key of keep) {
    const value = props?.[key];
    if (value !== undefined && value !== null && value !== "") out[key] = value;
  }
  return out;
}

/** Graticule generated locally — a 10 degree grid is a teaching aid, not a dataset. */
function buildGraticule(stepDeg = 5) {
  const features = [];
  for (let lon = Math.ceil(WINDOW.west / stepDeg) * stepDeg; lon <= WINDOW.east; lon += stepDeg) {
    features.push({
      type: "Feature",
      properties: { kind: "meridian", degrees: lon },
      geometry: { type: "LineString", coordinates: [[lon, WINDOW.south], [lon, WINDOW.north]] },
    });
  }
  for (let lat = Math.ceil(WINDOW.south / stepDeg) * stepDeg; lat <= WINDOW.north; lat += stepDeg) {
    features.push({
      type: "Feature",
      properties: { kind: "parallel", degrees: lat },
      geometry: { type: "LineString", coordinates: [[WINDOW.west, lat], [WINDOW.east, lat]] },
    });
  }
  // The Tropic of Cancer (23.4368 N) crosses this corridor and matters to the monsoon and
  // insolation material in the Class XI syllabus.
  features.push({
    type: "Feature",
    properties: { kind: "tropic-of-cancer", degrees: 23.4368 },
    geometry: { type: "LineString", coordinates: [[WINDOW.west, 23.4368], [WINDOW.east, 23.4368]] },
  });
  return { type: "FeatureCollection", features };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // A CACHED RUN MUST NOT SILENTLY DOWNGRADE THE MANIFEST. Re-running without --force used to write
  // layer entries carrying a feature count and nothing else, which destroyed the upstream sha256 that
  // the downloading run had recorded. That is the worst kind of bug for this project: the output looks
  // fine, the pipeline reports success, and the reproducibility record is quietly gone. So the cached
  // path now carries the recorded provenance forward and fails loudly when there is none to carry.
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  const previous = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, "utf8")) : null;
  const previousByOut = new Map((previous?.layers ?? []).map((l) => [l.out, l]));

  const manifest = {
    source: "Natural Earth (nvkelso/natural-earth-vector, master)",
    license: "Public Domain",
    attribution:
      "Base layers made with Natural Earth, a public domain map dataset. No modern political " +
      "boundaries are included by design — see docs/LICENCE_AUDIT.md.",
    corridor: CORRIDOR,
    clipWindow: WINDOW,
    layers: [],
    generatedAt: new Date().toISOString(),
  };

  for (const layer of LAYERS) {
    const outPath = path.join(OUT_DIR, layer.out);
    if (existsSync(outPath) && !force) {
      const existing = JSON.parse(await readFile(outPath, "utf8"));
      const prior = previousByOut.get(layer.out);
      if (!prior || !/^[0-9a-f]{64}$/.test(prior.upstreamSha256 ?? "")) {
        throw new Error(
          `${layer.out} is present but no upstream sha256 is recorded for it, so this run cannot ` +
          `show what it was built from. Run with --force to download and record it.`,
        );
      }
      if (existing.features.length !== prior.features) {
        throw new Error(
          `${layer.out} holds ${existing.features.length} features but the manifest records ` +
          `${prior.features}: the cached output and its provenance disagree. Run with --force.`,
        );
      }
      console.log(
        `[atlas:basemap] cached ${layer.out} — ${existing.features.length} features, upstream sha256 carried forward`,
      );
      manifest.layers.push({ ...prior, cached: true });
      continue;
    }
    process.stdout.write(`[atlas:basemap] downloading ${layer.file}…`);
    const buf = await downloadBuffer(layer.url);
    const parsed = JSON.parse(buf.toString("utf8"));
    const features = [];
    for (const f of parsed.features ?? []) {
      const clipped = clipGeometry(f.geometry);
      if (clipped) features.push({ type: "Feature", properties: projectProps(f.properties, layer.keep), geometry: clipped });
    }
    await writeFile(outPath, JSON.stringify({ type: "FeatureCollection", features }));
    const { statSync } = await import("node:fs");
    const kb = statSync(outPath).size / 1024;
    console.log(` ${features.length} features kept, ${kb.toFixed(0)} KB`);
    manifest.layers.push({
      out: layer.out,
      file: layer.file,
      upstreamBytes: buf.length,
      upstreamSha256: createHash("sha256").update(buf).digest("hex"),
      features: features.length,
      origin: "downloaded",
      note: layer.note,
    });
  }

  const graticule = buildGraticule(5);
  await writeFile(path.join(OUT_DIR, "graticule.geojson"), JSON.stringify(graticule));
  console.log(`[atlas:basemap] graticule: ${graticule.features.length} lines`);
  // `origin` distinguishes a layer we generated from one we downloaded. The validator requires a
  // valid upstream sha256 for every downloaded layer and forbids pretending a generated one has an
  // upstream — a locally built graticule has no upstream to pin, and saying so is the honest record.
  manifest.layers.push({
    out: "graticule.geojson",
    file: "generated locally",
    features: graticule.features.length,
    origin: "generated",
    note: "5-degree graticule plus the Tropic of Cancer, built locally rather than imported.",
  });

  await writeFile(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`[atlas:basemap] manifest written`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});

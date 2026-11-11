/**
 * BASEMAP RESOLVER — turns a `geometryRef` string into actual geometry, or into an honest failure.
 *
 * `GeographicalFeature.geometryRef` uses the scheme `<layer>.geojson#name=<feature name>` (or
 * `#all`), documented in atlas/data/pilot/curated/features.ts and CHECKED at build time by
 * atlas/scripts/validate.ts (E010). This module is the runtime half of that contract: the validator
 * proves every reference resolves when the corpus is built; this resolves them when the app runs.
 *
 * TWO THINGS THIS MODULE REFUSES TO DO QUIETLY.
 *
 * 1. IT NEVER RETURNS "THE FIRST MATCH". Several Natural Earth river names are recorded as more than
 *    one feature: in the pilot's rivers.geojson, Sutlej, Chambal, Indus, Krishna, Jhelum, Beas,
 *    Balak, Mahäna Nadï and Qumar each appear as TWO separate features, while Ganges is a single
 *    MultiLineString of fifteen disconnected parts. A resolver that stopped at the first match would
 *    report the Sutlej as a fraction of its mapped length and nothing would look wrong — the number
 *    would simply be false. So every match is returned, and the split is reported in `featureCount`
 *    and `parts` so a caller cannot mistake a partial answer for a complete one.
 *
 * 2. IT NEVER RENAMES UPSTREAM DATA. Natural Earth's names are anglicised and carry upstream
 *    diacritics ("Ganges", "Ghäghara", "Mahäna Nadï", "Sapt" for the Kosi system). `matchedName`
 *    returns that string verbatim. Localising it for display is a separate, explicit step; silently
 *    rewriting the name a measurement was computed from would break the link between the number and
 *    the geometry it came from.
 *
 * SERVER ONLY — see paths.ts for why, and for the production deployment caveat.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import type { Feature, FeatureCollection, Geometry } from "geojson";

import { BASEMAP_DIR, assertServerOnly } from "./paths";

// ---------------------------------------------------------------------------
// The reference scheme
// ---------------------------------------------------------------------------

/** The selector half of a `geometryRef`: either one named feature, or the whole layer. */
export type GeometryRefSelector = { kind: "all" } | { kind: "name"; value: string };

export interface GeometryRef {
  /** Exactly the string that was parsed, for error messages and provenance. */
  raw: string;
  /** Layer file name, e.g. "rivers.geojson". */
  file: string;
  selector: GeometryRefSelector;
}

export class GeometryRefError extends Error {
  constructor(
    message: string,
    readonly ref: string,
  ) {
    super(message);
    this.name = "GeometryRefError";
  }
}

/**
 * Parses `<layer>.geojson#name=<x>` or `<layer>.geojson#all`.
 *
 * Throws rather than returning null: a malformed reference is a bug in authored data, not a runtime
 * condition to branch on, and the validator already rejects these at build time (E010). Throwing here
 * means a reference that slips through cannot be quietly ignored.
 */
export function parseGeometryRef(raw: string): GeometryRef {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    throw new GeometryRefError("geometryRef is empty", String(raw));
  }
  const hash = raw.indexOf("#");
  if (hash === -1) {
    throw new GeometryRefError(
      `expected "<layer>.geojson#name=<x>" or "<layer>.geojson#all", got no "#" selector`,
      raw,
    );
  }
  const file = raw.slice(0, hash);
  const selector = raw.slice(hash + 1);
  if (!file.endsWith(".geojson")) {
    throw new GeometryRefError(`layer "${file}" is not a .geojson file`, raw);
  }
  if (selector === "all") return { raw, file, selector: { kind: "all" } };
  // `(.*)` rather than `(.+)` so that an EMPTY name reaches the check below instead of being reported
  // as an "unsupported selector". A guard that the pattern above can never satisfy is dead code, and
  // the wrong error message for `#name=` sends whoever hits it looking at the selector syntax rather
  // than at the missing value.
  const m = /^name=(.*)$/.exec(selector);
  if (!m) {
    throw new GeometryRefError(
      `unsupported selector "${selector}" (expected "name=<x>" or "all")`,
      raw,
    );
  }
  if (m[1].trim().length === 0) {
    throw new GeometryRefError(`selector "name=" has an empty feature name`, raw);
  }
  return { raw, file, selector: { kind: "name", value: m[1] } };
}

// ---------------------------------------------------------------------------
// Loading and caching
// ---------------------------------------------------------------------------

/** One layer as recorded in manifest.json. `origin` distinguishes fetched data from data we built. */
export interface BasemapLayer {
  out: string;
  file: string;
  upstreamBytes?: number;
  upstreamSha256?: string;
  features: number;
  origin: "downloaded" | "generated";
  note?: string;
  cached?: boolean;
}

export interface BasemapManifest {
  source: string;
  license: string;
  attribution: string;
  corridor: Record<string, number>;
  clipWindow: Record<string, number>;
  layers: BasemapLayer[];
  generatedAt: string;
}

export class BasemapError extends Error {
  constructor(
    message: string,
    readonly file?: string,
  ) {
    super(message);
    this.name = "BasemapError";
  }
}

const manifestCache = { value: null as BasemapManifest | null };
const layerCache = new Map<string, FeatureCollection<Geometry>>();

function readJsonFile<T>(file: string, label: string): T {
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch (err) {
    throw new BasemapError(
      `cannot read ${label} at ${file}: ${(err as Error).message}. ` +
        `Run \`npm run atlas:build\` to generate the basemap.`,
      file,
    );
  }
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    throw new BasemapError(`${label} at ${file} is not valid JSON: ${(err as Error).message}`, file);
  }
}

/** The basemap manifest, read once per process. */
export function loadBasemapManifest(): BasemapManifest {
  assertServerOnly("src/lib/atlas/basemap.ts");
  if (!manifestCache.value) {
    manifestCache.value = readJsonFile<BasemapManifest>(
      path.join(BASEMAP_DIR, "manifest.json"),
      "basemap manifest",
    );
  }
  return manifestCache.value;
}

/**
 * A basemap layer's features, read once per process and cached.
 *
 * Layers are small by design — the largest in the pilot is rivers.geojson at about 256 KB — because
 * they are clipped to the corridor. The corridor shape file, which is NOT small, is handled separately
 * in corpus.ts and never loaded wholesale.
 */
export function loadBasemapLayer(fileName: string): FeatureCollection<Geometry> {
  assertServerOnly("src/lib/atlas/basemap.ts");
  const cached = layerCache.get(fileName);
  if (cached) return cached;
  // Refuse to read an unlisted file. This keeps `geometryRef` from becoming an arbitrary file-read
  // primitive if a reference is ever derived from user input.
  const listed = loadBasemapManifest().layers.some((l) => l.out === fileName);
  if (!listed) {
    throw new BasemapError(
      `"${fileName}" is not a layer recorded in the basemap manifest. Recorded layers: ` +
        loadBasemapManifest()
          .layers.map((l) => l.out)
          .join(", "),
      fileName,
    );
  }
  const fc = readJsonFile<FeatureCollection<Geometry>>(
    path.join(BASEMAP_DIR, fileName),
    `basemap layer ${fileName}`,
  );
  layerCache.set(fileName, fc);
  return fc;
}

/** Every layer name recorded in the manifest, in manifest order. */
export function basemapLayerNames(): string[] {
  return loadBasemapManifest().layers.map((l) => l.out);
}

/**
 * Attribution string for rendering on any map that shows these layers.
 *
 * Natural Earth is public domain, so attribution is not a licence obligation — it is kept because the
 * manifest records it and because a map that does not say what it is built on is a map a learner
 * cannot evaluate.
 */
export function basemapAttribution(): string {
  const m = loadBasemapManifest();
  return `${m.attribution} Source: ${m.source}. Licence: ${m.license}.`;
}

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

/** The upstream name of a matched feature, read exactly as the dataset records it. */
function upstreamName(feature: Feature<Geometry>): string | null {
  const props = (feature.properties ?? {}) as Record<string, unknown>;
  const name = props.name ?? props.name_en;
  return typeof name === "string" && name.length > 0 ? name : null;
}

/**
 * How many disconnected coordinate sequences a geometry holds.
 *
 * This is the count that makes measurements interpretable. Natural Earth's "Ganges" is ONE feature
 * whose MultiLineString holds fifteen parts — trunk, distributaries and anabranches clipped to our
 * window. Summing all fifteen gives 3,642 km; the longest single part is 2,106 km; the river's
 * commonly published length is about 2,525 km. All three are true statements about different things,
 * so any length derived from this geometry must name which one it is (see features.ts). A caller that
 * cannot see the part count cannot make that distinction.
 */
export function geometryPartCount(geometry: Geometry | null): number {
  if (!geometry) return 0;
  switch (geometry.type) {
    case "GeometryCollection":
      return geometry.geometries.reduce((n, g) => n + geometryPartCount(g), 0);
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
      return geometry.coordinates.length;
    case "Point":
    case "LineString":
    case "Polygon":
      return 1;
    default:
      return 0;
  }
}

export type BasemapResolution =
  | {
      status: "resolved";
      ref: string;
      file: string;
      selector: GeometryRefSelector;
      /** Upstream name verbatim, or null when the whole layer was requested. */
      matchedName: string | null;
      features: Array<Feature<Geometry>>;
      /** Number of GeoJSON features matched. More than one is normal — see the module header. */
      featureCount: number;
      /** Total disconnected coordinate sequences across all matched features. */
      parts: number;
      /** True when the result is not a single connected geometry. */
      multipart: boolean;
      /** Present whenever the result needs a caveat before it is shown to a learner. */
      note?: string;
    }
  | { status: "unknown-layer"; ref: string; file: string; reason: string; availableLayers: string[] }
  | {
      status: "no-match";
      ref: string;
      file: string;
      name: string;
      reason: string;
      /** Named features in that layer, so a near-miss is diagnosable instead of mysterious. */
      availableNames: string[];
    }
  | { status: "malformed-ref"; ref: string; reason: string };

/** Stated once so every caller inherits it rather than rediscovering it. */
export const UPSTREAM_NAME_CAVEAT =
  "Names are Natural Earth's, anglicised and carrying upstream diacritics. Localise for display " +
  "without renaming the feature the measurement was computed from.";

/**
 * Resolves a `geometryRef` against the basemap.
 *
 * Returns a discriminated union rather than throwing, because "this reference does not resolve" is a
 * state the interface must be able to render: a feature whose geometry is missing should appear as a
 * documented gap (the corpus already carries two such records — feature-damodar and
 * feature-uttarapathy), not as a crash and not as a silently blank map.
 */
export function resolveGeometryRef(raw: string): BasemapResolution {
  assertServerOnly("src/lib/atlas/basemap.ts");

  let parsed: GeometryRef;
  try {
    parsed = parseGeometryRef(raw);
  } catch (err) {
    return { status: "malformed-ref", ref: raw, reason: (err as Error).message };
  }

  const manifest = loadBasemapManifest();
  if (!manifest.layers.some((l) => l.out === parsed.file)) {
    return {
      status: "unknown-layer",
      ref: raw,
      file: parsed.file,
      reason: `"${parsed.file}" is not recorded in the basemap manifest`,
      availableLayers: manifest.layers.map((l) => l.out),
    };
  }

  const layer = loadBasemapLayer(parsed.file);

  if (parsed.selector.kind === "all") {
    const parts = layer.features.reduce((n, f) => n + geometryPartCount(f.geometry), 0);
    return {
      status: "resolved",
      ref: raw,
      file: parsed.file,
      selector: parsed.selector,
      matchedName: null,
      features: layer.features,
      featureCount: layer.features.length,
      parts,
      multipart: parts > 1,
      note: UPSTREAM_NAME_CAVEAT,
    };
  }

  const wanted = parsed.selector.value;
  const matched = layer.features.filter((f) => upstreamName(f) === wanted);

  if (matched.length === 0) {
    const names = Array.from(
      new Set(layer.features.map(upstreamName).filter((n): n is string => n !== null)),
    ).sort();
    return {
      status: "no-match",
      ref: raw,
      file: parsed.file,
      name: wanted,
      reason: `no feature in ${parsed.file} is named "${wanted}"`,
      availableNames: names,
    };
  }

  const parts = matched.reduce((n, f) => n + geometryPartCount(f.geometry), 0);
  const notes: string[] = [UPSTREAM_NAME_CAVEAT];
  if (matched.length > 1) {
    notes.push(
      `"${wanted}" is recorded as ${matched.length} separate features in ${parsed.file} ` +
        `(${parts} disconnected parts in total). All are returned; lengths derived from them must say ` +
        `whether they sum every part or take the longest.`,
    );
  } else if (parts > 1) {
    notes.push(
      `"${wanted}" is one feature holding ${parts} disconnected parts. A length summed over all of ` +
        `them is larger than the longest single part, and neither is necessarily the published length.`,
    );
  }

  return {
    status: "resolved",
    ref: raw,
    file: parsed.file,
    selector: parsed.selector,
    matchedName: wanted,
    features: matched,
    featureCount: matched.length,
    parts,
    multipart: parts > 1,
    note: notes.join(" "),
  };
}

/**
 * Resolves every `geometryRef` in the corpus and reports what did not resolve.
 *
 * This is the runtime mirror of validator rule E010, exposed so a health endpoint can answer "is the
 * basemap intact right now?" without re-running the build. It reads the curated features directly
 * rather than the assembled corpus to avoid pulling in the imported collections.
 */
export function auditGeometryRefs(refs: Iterable<string>): {
  checked: number;
  resolved: number;
  failures: Array<{ ref: string; status: string; reason: string }>;
} {
  const failures: Array<{ ref: string; status: string; reason: string }> = [];
  let checked = 0;
  let resolved = 0;
  for (const ref of refs) {
    checked += 1;
    const result = resolveGeometryRef(ref);
    if (result.status === "resolved") resolved += 1;
    else failures.push({ ref, status: result.status, reason: result.reason });
  }
  return { checked, resolved, failures };
}

/**
 * CORPUS LOADER — assembles the atlas corpus on the server and answers "what was true in year X?".
 *
 * This is the module `atlas/data/pilot/curated/index.ts` names as the consumer of the two large
 * imported collections. It exists for one reason: those collections must never reach a browser.
 *
 *   entities.json    154 entities    ~149 KB
 *   assertions.json  1,764 assertions ~920 KB
 *   shapes-corridor.geojson  1,764 shapes  24.6 MB
 *
 * Together that is about a megabyte of JSON plus twenty-five megabytes of geometry. Inlining any of it
 * in a data module would put it in the frontend bundle, which is precisely what this project's rules
 * forbid. So the corpus is loaded here, in a server process, and reduced to a snapshot before anything
 * crosses the network. The measured worst case for a single year in the pilot corridor is 12 shapes
 * and about 0.36 MB — which is also why vector tiling was evaluated and rejected as unnecessary.
 *
 * THREE DECISIONS THAT SHAPE THE API.
 *
 * 1. NO AMBIGUOUS YEAR ARGUMENT. There is no `snapshotAt(year: number)`. A bare number cannot say
 *    whether it means astronomical or historical notation, and the two differ by one for every year at
 *    or before 1 BCE — so `-260` could silently mean 261 BCE or 260 BCE. Callers must choose
 *    `snapshotAtHistoricalYear(261, "BCE")` or `snapshotAtAstronomicalYear(-260)`, and the conversion
 *    is done by the tested temporal engine, never by arithmetic in this file (D-2).
 *
 * 2. UNCERTAINTY IS CARRIED, NOT FILTERED. A record whose date is `approximate` and spans the queried
 *    year MATCHES, because that is what the source supports. It is not quietly treated as exact: every
 *    snapshot reports how many of its records are approximate, uncertain or unknown, so an interface
 *    can render the difference instead of flattening it.
 *
 * 3. NOTHING IS DROPPED SILENTLY. A date the temporal engine cannot parse excludes that record from
 *    the year filter and reports it in `exclusions`. A shape absent from the available tier is
 *    reported in `missing`, and the tier itself is named in the result. Serving a partial answer
 *    without saying it is partial is the one failure mode this project treats as worse than serving
 *    nothing.
 *
 * SERVER ONLY — see paths.ts for why, and for the production deployment caveat.
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Feature, FeatureCollection, Geometry } from "geojson";

import {
  CORRIDOR_BOUNDS,
  CORRIDOR_TEMPORAL_EXTENT,
  CURATED_COUNTS,
  curatedCorpus,
} from "../../../atlas/data/pilot/curated";
import type {
  AtlasCorpus,
  BBox,
  CoverageRecord,
  DateCertainty,
  HistoricalAssertion,
  HistoricalEntity,
  HistoricalEvent,
  Interpretation,
  LearningContent,
  LocalisedText,
  Place,
  SourceRecord,
} from "./model";
import { CLIOPATRIA_DIR, assertServerOnly, atlasDataPresent } from "./paths";
import {
  astronomicalToHistorical,
  centuryLabel,
  formatTemporal,
  formatYear,
  historicalToAstronomical,
  isActiveInYear,
  isActiveOn,
  jdnRange,
  jdnToCivil,
  parseEdtf,
} from "./temporal";
import type { Era, TemporalValue } from "./temporal";

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class CorpusError extends Error {
  constructor(
    message: string,
    readonly file?: string,
  ) {
    super(message);
    this.name = "CorpusError";
  }
}

/**
 * Thrown when the generated corpus is absent.
 *
 * Kept distinct from CorpusError so a route can tell "this deployment was not built" apart from "the
 * build is corrupt" and answer 503 and 500 respectively. Neither may render as an empty map.
 */
export class CorpusNotBuiltError extends CorpusError {
  constructor(readonly dataRoot: string) {
    super(
      `No atlas corpus at ${dataRoot}. Run \`npm run atlas:build\` (fetch, import, basemap, validate) ` +
        `to generate it. An empty map is not an acceptable substitute for missing data.`,
      dataRoot,
    );
    this.name = "CorpusNotBuiltError";
  }
}

// ---------------------------------------------------------------------------
// Reading the generated collections
// ---------------------------------------------------------------------------

function readJson<T>(file: string, label: string): T {
  if (!existsSync(file)) throw new CorpusNotBuiltError(CLIOPATRIA_DIR);
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch (err) {
    throw new CorpusError(`cannot read ${label} at ${file}: ${(err as Error).message}`, file);
  }
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    throw new CorpusError(`${label} at ${file} is not valid JSON: ${(err as Error).message}`, file);
  }
}

/** Shape of atlas/data/pilot/cliopatria/anomalies.json — a record, not a bare list. */
interface AnomalyFile {
  generatedAt: string;
  policy: string;
  corridor: Record<string, number>;
  rowsInCorridor: number;
  anomalies: Array<{
    kind: string;
    rowsAffected: number;
    action: string;
    policy?: string;
    note?: string;
    examples?: string[];
  }>;
}

/** Shape of atlas/data/pilot/cliopatria/import.json. */
interface ImportManifest {
  id: string;
  name: string;
  version: string;
  license: string;
  attribution: string;
  modifications: string;
  yearConvention: string;
  corridor: Record<string, number>;
  recordsImported: number;
  entitiesImported: number;
  relationRowsExcluded: number;
  focusNames: string[];
  importedAt?: string;
}

/** Which geometry file is available. Named in every result that depends on it. */
export type ShapeTier = "corridor" | "focus" | "none";

export interface ImportedCollections {
  entities: HistoricalEntity[];
  assertions: HistoricalAssertion[];
  sources: SourceRecord[];
  importManifest: ImportManifest;
  anomalies: AnomalyFile;
  shapeTier: ShapeTier;
  /** Where the corpus says it came from and when — never invented here. */
  generatedAt: string;
}

const cache: {
  imported: ImportedCollections | null;
  corpus: { generatedAt: string; value: AtlasCorpus } | null;
  shapes: { tier: ShapeTier; index: Map<string, Feature<Geometry>> } | null;
  parsed: Map<string, TemporalValue | CorpusError>;
} = { imported: null, corpus: null, shapes: null, parsed: new Map() };

function detectShapeTier(): ShapeTier {
  if (existsSync(path.join(CLIOPATRIA_DIR, "shapes-corridor.geojson"))) return "corridor";
  if (existsSync(path.join(CLIOPATRIA_DIR, "shapes-focus.geojson"))) return "focus";
  return "none";
}

/**
 * Reads the imported collections once per process.
 *
 * The corridor shape file is deliberately NOT read here. At 24.6 MB it is the single most expensive
 * thing in the corpus, and most requests need a dozen shapes from it, not all of them. It is indexed
 * lazily by `shapesForSnapshot()`.
 */
export function loadImportedCollections(): ImportedCollections {
  assertServerOnly("src/lib/atlas/corpus.ts");
  if (cache.imported) return cache.imported;
  if (!atlasDataPresent()) throw new CorpusNotBuiltError(CLIOPATRIA_DIR);

  const entities = readJson<HistoricalEntity[]>(
    path.join(CLIOPATRIA_DIR, "entities.json"),
    "imported entities",
  );
  const assertions = readJson<HistoricalAssertion[]>(
    path.join(CLIOPATRIA_DIR, "assertions.json"),
    "imported assertions",
  );
  const sources = readJson<SourceRecord[]>(
    path.join(CLIOPATRIA_DIR, "sources.json"),
    "imported sources",
  );
  const importManifest = readJson<ImportManifest>(
    path.join(CLIOPATRIA_DIR, "import.json"),
    "import manifest",
  );
  const anomalies = readJson<AnomalyFile>(
    path.join(CLIOPATRIA_DIR, "anomalies.json"),
    "anomaly register",
  );

  // `generatedAt` is taken from the build, never defaulted to "now". A timestamp fabricated at read
  // time would claim the corpus was generated when the request arrived, which is a small lie that is
  // very hard to notice and would make a stale corpus look fresh.
  const generatedAt = importManifest.importedAt ?? anomalies.generatedAt;
  if (!generatedAt) {
    throw new CorpusError(
      "Neither import.json nor anomalies.json records when the corpus was generated, so loadCorpus() " +
        "cannot state a truthful generatedAt. Re-run `npm run atlas:build`, or pass generatedAt " +
        "explicitly.",
      path.join(CLIOPATRIA_DIR, "import.json"),
    );
  }

  cache.imported = {
    entities,
    assertions,
    sources,
    importManifest,
    anomalies,
    shapeTier: detectShapeTier(),
    generatedAt,
  };
  return cache.imported;
}

// ---------------------------------------------------------------------------
// Assembling the whole corpus
// ---------------------------------------------------------------------------

/**
 * The complete corpus: curated TypeScript content plus the imported JSON collections.
 *
 * Roughly a megabyte in memory. This is a SERVER-SIDE object and must not be returned from a route
 * handler as-is — project a snapshot or a narrow selection instead.
 *
 * @param generatedAt Overrides the build's own timestamp. Passing a fabricated one defeats the point.
 */
export function loadCorpus(generatedAt?: string): AtlasCorpus {
  const imported = loadImportedCollections();
  const stamp = generatedAt ?? imported.generatedAt;
  if (cache.corpus && cache.corpus.generatedAt === stamp) return cache.corpus.value;

  const curated = curatedCorpus(stamp);

  // Sources are merged from both halves because citations in the curated files legitimately point at
  // imported source records (notably cliopatria-v0-2-1) and vice versa. A collision between two
  // DIFFERENT records sharing one id is a genuine integrity defect and must not be resolved by
  // silently preferring one of them.
  const sources: SourceRecord[] = [...curated.sources];
  const byId = new Map(sources.map((s) => [s.id, s]));
  for (const s of imported.sources) {
    const existing = byId.get(s.id);
    if (!existing) {
      sources.push(s);
      byId.set(s.id, s);
    } else if (JSON.stringify(existing) !== JSON.stringify(s)) {
      throw new CorpusError(
        `source id "${s.id}" is defined differently in the curated corpus and in the imported ` +
          `sources.json. Two records cannot share one id; fix the corpus rather than choosing one.`,
        path.join(CLIOPATRIA_DIR, "sources.json"),
      );
    }
  }

  const corpus: AtlasCorpus = { ...curated, sources, entities: imported.entities, assertions: imported.assertions };
  cache.corpus = { generatedAt: stamp, value: corpus };
  return corpus;
}

/**
 * A small, safe-to-serialise description of corpus state, for a health or status endpoint.
 *
 * Reports what is present and what is missing without exposing the collections themselves.
 */
export function corpusStatus(): {
  present: boolean;
  dataRoot: string;
  corridor: BBox;
  temporalExtent: [string, string];
  curated: typeof CURATED_COUNTS;
  shapeTier: ShapeTier;
  generatedAt: string | null;
  imported: { entities: number; assertions: number; sources: number; anomalyKinds: number } | null;
  missing: string[];
} {
  assertServerOnly("src/lib/atlas/corpus.ts");
  const present = atlasDataPresent();
  const missing: string[] = [];
  if (!present) {
    missing.push("atlas/data/pilot/cliopatria", "atlas/data/pilot/basemap");
  }
  if (detectShapeTier() === "none") missing.push("cliopatria/shapes-corridor.geojson or shapes-focus.geojson");

  let imported: ImportedCollections | null = null;
  if (present) {
    try {
      imported = loadImportedCollections();
    } catch {
      missing.push("cliopatria/entities.json, assertions.json, sources.json, import.json, anomalies.json");
    }
  }

  return {
    present,
    dataRoot: CLIOPATRIA_DIR,
    corridor: CORRIDOR_BOUNDS,
    temporalExtent: CORRIDOR_TEMPORAL_EXTENT,
    curated: CURATED_COUNTS,
    shapeTier: detectShapeTier(),
    generatedAt: imported?.generatedAt ?? null,
    imported: imported
      ? {
          entities: imported.entities.length,
          assertions: imported.assertions.length,
          sources: imported.sources.length,
          anomalyKinds: imported.anomalies.anomalies.length,
        }
      : null,
    missing,
  };
}

// ---------------------------------------------------------------------------
// Temporal filtering
// ---------------------------------------------------------------------------

/**
 * Parses an EDTF string once per distinct value and remembers failures.
 *
 * The validator (E007) already proves every date in the corpus parses at build time, so a failure
 * here means the corpus on disk is not the corpus that was validated. That is worth surfacing, not
 * swallowing — but it must not take down an otherwise valid snapshot either.
 */
function parsedDate(edtf: string): TemporalValue | CorpusError {
  const hit = cache.parsed.get(edtf);
  if (hit) return hit;
  let result: TemporalValue | CorpusError;
  try {
    result = parseEdtf(edtf);
  } catch (err) {
    result = new CorpusError(`unparseable EDTF "${edtf}": ${(err as Error).message}`);
  }
  cache.parsed.set(edtf, result);
  return result;
}

function isActive(edtf: string, astronomicalYear: number): boolean {
  const parsed = parsedDate(edtf);
  if (parsed instanceof CorpusError) return false;
  return isActiveInYear(parsed, astronomicalYear);
}

function isActiveOnJdn(edtf: string, jdn: number): boolean {
  const parsed = parsedDate(edtf);
  if (parsed instanceof CorpusError) return false;
  return isActiveOn(parsed, jdn);
}

const CERTAINTY_KINDS: DateCertainty[] = ["exact", "approximate", "uncertain", "unknown"];

function blankBreakdown(): Record<DateCertainty, number> {
  return { exact: 0, approximate: 0, uncertain: 0, unknown: 0 };
}

function tally(target: Record<DateCertainty, number>, certainty: DateCertainty): void {
  target[certainty] = (target[certainty] ?? 0) + 1;
}

// ---------------------------------------------------------------------------
// Snapshots
// ---------------------------------------------------------------------------

/** What was asked for, echoed into the result so a response can be checked against its request. */
export type SnapshotQuery =
  | { kind: "historical-year"; year: number; era: Era }
  | { kind: "astronomical-year"; year: number }
  | { kind: "edtf-date"; value: string };

export interface CorpusSnapshot {
  query: SnapshotQuery;
  /** Astronomical numbering — what the corpus stores. 0 means 1 BCE. */
  astronomicalYear: number;
  /** The same year as a learner writes it. Never contains a year zero (D-2). */
  displayYear: LocalisedText;
  /** Coarse orientation only; never a substitute for a recorded date. */
  century: LocalisedText;
  entities: HistoricalEntity[];
  assertions: HistoricalAssertion[];
  events: HistoricalEvent[];
  /** Places named by the matched events, de-duplicated, so a map can locate them. */
  places: Place[];
  /** Shape ids asserted for this year. Geometry comes from `shapesForSnapshot()`. */
  shapeIds: string[];
  /** How many matched records carry each kind of date certainty. Render this; do not flatten it. */
  certainty: {
    entities: Record<DateCertainty, number>;
    assertions: Record<DateCertainty, number>;
    events: Record<DateCertainty, number>;
    total: Record<DateCertainty, number>;
  };
  counts: { entities: number; assertions: number; events: number; places: number; shapes: number };
  /**
   * Records considered and NOT included, with reasons. Empty is the normal case; a non-empty value
   * means something in the corpus could not be dated or could not be resolved, and hiding that would
   * make a partial answer indistinguishable from a complete one.
   */
  exclusions: {
    /** Corpus records whose EDTF the temporal engine rejected. Should always be empty post-build. */
    unparseableDates: Array<{ collection: string; id: string; date: string; reason: string }>;
    /** Assertions active this year whose subject entity's own existence does not span it. */
    assertionsWithInactiveSubject: number;
    /** Matched events naming a place the corpus does not contain. */
    unresolvedPlaceIds: string[];
  };
  shapeTier: ShapeTier;
  bounds: BBox;
  generatedAt: string;
  /** The year in historical notation. Provided so no caller has to redo the BCE conversion. */
  historicalNotation: { year: number; era: Era };
}

function buildSnapshot(query: SnapshotQuery, astronomicalYear: number, jdn: number | null): CorpusSnapshot {
  const corpus = loadCorpus();
  const exclusions: CorpusSnapshot["exclusions"] = {
    unparseableDates: [],
    assertionsWithInactiveSubject: 0,
    unresolvedPlaceIds: [],
  };

  /** Dates a record and records any parse failure against it, so nothing is dropped quietly. */
  const matches = (collection: string, id: string, edtf: string): boolean => {
    const parsed = parsedDate(edtf);
    if (parsed instanceof CorpusError) {
      exclusions.unparseableDates.push({ collection, id, date: edtf, reason: parsed.message });
      return false;
    }
    return jdn === null ? isActiveInYear(parsed, astronomicalYear) : isActiveOn(parsed, jdn);
  };

  const entities = corpus.entities.filter((e) => matches("entities", e.id, e.existence));
  const assertions = corpus.assertions.filter((a) => matches("assertions", a.id, a.validTime));
  const events = corpus.events.filter((e) => matches("events", e.id, e.date));

  const entityIds = new Set(entities.map((e) => e.id));
  for (const a of assertions) if (!entityIds.has(a.subject)) exclusions.assertionsWithInactiveSubject += 1;

  // Places come from the matched events rather than from every place in the corpus: a snapshot is
  // about what was happening, and the corridor's 46 places are mostly not doing anything in a given
  // year. Places the corpus does not contain are reported, not invented.
  const placeById = new Map(corpus.places.map((p) => [p.id, p]));
  const wantedPlaceIds = new Set<string>();
  for (const e of events) {
    if (e.location?.placeId) wantedPlaceIds.add(e.location.placeId);
    for (const id of e.places) wantedPlaceIds.add(id);
  }
  const places: Place[] = [];
  for (const id of wantedPlaceIds) {
    const place = placeById.get(id);
    if (place) places.push(place);
    else exclusions.unresolvedPlaceIds.push(id);
  }
  places.sort((a, b) => a.id.localeCompare(b.id));

  const shapeIds = Array.from(
    new Set(assertions.map((a) => a.shape).filter((s): s is string => typeof s === "string")),
  ).sort();

  const certainty = {
    entities: blankBreakdown(),
    assertions: blankBreakdown(),
    events: blankBreakdown(),
    total: blankBreakdown(),
  };
  for (const e of entities) {
    tally(certainty.entities, e.dateCertainty);
    tally(certainty.total, e.dateCertainty);
  }
  for (const a of assertions) {
    tally(certainty.assertions, a.dateCertainty);
    tally(certainty.total, a.dateCertainty);
  }
  for (const e of events) {
    tally(certainty.events, e.dateCertainty);
    tally(certainty.total, e.dateCertainty);
  }
  // Defensive: a certainty value outside the union would otherwise vanish from every bucket, making
  // the total silently smaller than the record count.
  for (const bucket of [certainty.entities, certainty.assertions, certainty.events, certainty.total]) {
    for (const kind of CERTAINTY_KINDS) bucket[kind] = bucket[kind] ?? 0;
  }

  return {
    query,
    astronomicalYear,
    displayYear: { en: formatYear(astronomicalYear, "en"), hi: formatYear(astronomicalYear, "hi") },
    century: { en: centuryLabel(astronomicalYear, "en"), hi: centuryLabel(astronomicalYear, "hi") },
    entities,
    assertions,
    events,
    places,
    shapeIds,
    certainty,
    counts: {
      entities: entities.length,
      assertions: assertions.length,
      events: events.length,
      places: places.length,
      shapes: shapeIds.length,
    },
    exclusions,
    shapeTier: loadImportedCollections().shapeTier,
    bounds: CORRIDOR_BOUNDS,
    generatedAt: corpus.generatedAt,
    // Computed here so the BCE conversion happens in exactly one place, by the tested temporal engine.
    historicalNotation: astronomicalToHistorical(astronomicalYear),
  };
}

/**
 * Everything the corpus holds for one year, in HISTORICAL notation.
 *
 * `snapshotAtHistoricalYear(261, "BCE")` is the year a learner means by "261 BCE"; it resolves to
 * astronomical year -260. The temporal engine performs the conversion and rejects a year zero,
 * because historical notation has no year zero to reject.
 */
export function snapshotAtHistoricalYear(year: number, era: Era): CorpusSnapshot {
  assertServerOnly("src/lib/atlas/corpus.ts");
  const astronomicalYear = historicalToAstronomical(year, era);
  return buildSnapshot({ kind: "historical-year", year, era }, astronomicalYear, null);
}

/**
 * Everything the corpus holds for one year, in ASTRONOMICAL numbering.
 *
 * Use this when the year already came from corpus data (which is stored astronomically). Use the
 * historical variant when it came from a human being. Mixing them up is the classic BCE off-by-one,
 * which is why there is no overload accepting a bare number.
 */
export function snapshotAtAstronomicalYear(astronomicalYear: number): CorpusSnapshot {
  assertServerOnly("src/lib/atlas/corpus.ts");
  if (!Number.isInteger(astronomicalYear)) {
    throw new CorpusError(`Astronomical years must be integers, got ${astronomicalYear}`);
  }
  return buildSnapshot({ kind: "astronomical-year", year: astronomicalYear }, astronomicalYear, null);
}

/**
 * Everything the corpus holds on one exact EDTF date, e.g. "1765-08-12" (the grant of the diwani).
 *
 * Day precision only makes sense for dates the sources actually pin to a day. For a whole year use one
 * of the year variants — passing "1765" here is legitimate and resolves to that year's span.
 */
export function snapshotOnEdtf(value: string): CorpusSnapshot {
  assertServerOnly("src/lib/atlas/corpus.ts");
  const parsed = parsedDate(value);
  if (parsed instanceof CorpusError) throw parsed;
  const range = jdnRange(parsed);
  if (!range) {
    throw new CorpusError(
      `"${value}" has no resolvable Julian day range, so it cannot select a moment in time`,
    );
  }
  // An open interval ("1947/..") has an earliest JDN but no latest; filtering at its start is the
  // only defensible reading, and the caller can see the original EDTF echoed in `query`.
  return buildSnapshot({ kind: "edtf-date", value }, yearOfJdn(range.earliest), range.earliest);
}

/** Astronomical year containing a Julian day number, via the tested civil-calendar inverse. */
function yearOfJdn(jdn: number): number {
  return jdnToCivil(jdn).year;
}

/**
 * Parses a year from request parameters into a snapshot query.
 *
 * Accepts `?year=261&era=BCE`, `?astronomical=-260`, or `?edtf=1765-08-12`. Returns a discriminated
 * result rather than throwing so a route can answer 400 with the reason. Rejects a bare `year` with no
 * `era` for non-positive values, because that is exactly the ambiguous case the API refuses to guess.
 */
export function parseSnapshotQuery(params: Record<string, string | undefined>):
  | { ok: true; snapshot: CorpusSnapshot }
  | { ok: false; status: 400; reason: string } {
  assertServerOnly("src/lib/atlas/corpus.ts");
  try {
    if (params.edtf && params.edtf.trim().length > 0) {
      return { ok: true, snapshot: snapshotOnEdtf(params.edtf.trim()) };
    }
    if (params.astronomical && params.astronomical.trim().length > 0) {
      const n = Number(params.astronomical);
      if (!Number.isInteger(n)) {
        return { ok: false, status: 400, reason: `astronomical must be an integer, got "${params.astronomical}"` };
      }
      return { ok: true, snapshot: snapshotAtAstronomicalYear(n) };
    }
    if (params.year && params.year.trim().length > 0) {
      const n = Number(params.year);
      if (!Number.isInteger(n)) {
        return { ok: false, status: 400, reason: `year must be an integer, got "${params.year}"` };
      }
      const rawEra = (params.era ?? "").trim().toUpperCase();
      if (rawEra === "BCE" || rawEra === "BC") {
        return { ok: true, snapshot: snapshotAtHistoricalYear(n, "BCE") };
      }
      if (rawEra === "CE" || rawEra === "AD" || rawEra === "") {
        if (n < 1) {
          return {
            ok: false,
            status: 400,
            reason:
              `year=${n} with no era is ambiguous: historical and astronomical numbering differ by one ` +
              `for every year at or before 1 BCE. Pass era=BCE or era=CE, or use astronomical=${n}.`,
          };
        }
        return { ok: true, snapshot: snapshotAtHistoricalYear(n, "CE") };
      }
      return { ok: false, status: 400, reason: `era must be BCE or CE, got "${params.era}"` };
    }
    return {
      ok: false,
      status: 400,
      reason: "provide one of ?year=261&era=BCE, ?astronomical=-260, or ?edtf=1765-08-12",
    };
  } catch (err) {
    if (err instanceof CorpusError) return { ok: false, status: 400, reason: err.message };
    if (err instanceof RangeError) return { ok: false, status: 400, reason: err.message };
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Shapes for a snapshot
// ---------------------------------------------------------------------------

export interface ShapeBundle {
  /** Which geometry file was used. "focus" is a 145-shape subset and must never pass as complete. */
  tier: ShapeTier;
  requested: number;
  found: number;
  features: Array<Feature<Geometry>>;
  /** Shape ids the snapshot asserted but this tier cannot supply. */
  missing: string[];
  /** Approximate serialised size in bytes, so the cost of a view is visible rather than assumed. */
  approxBytes: number;
  note?: string;
}

function loadShapeIndex(): { tier: ShapeTier; index: Map<string, Feature<Geometry>> } {
  if (cache.shapes) return cache.shapes;
  const tier = detectShapeTier();
  const index = new Map<string, Feature<Geometry>>();
  if (tier !== "none") {
    const file = path.join(CLIOPATRIA_DIR, tier === "corridor" ? "shapes-corridor.geojson" : "shapes-focus.geojson");
    const fc = readJson<FeatureCollection<Geometry>>(file, `shape tier "${tier}"`);
    for (const f of fc.features) {
      // Shape ids live at properties.id in this corpus, not at the top level.
      const id = (f.properties as Record<string, unknown> | null)?.id;
      if (typeof id === "string" && id.length > 0 && !index.has(id)) index.set(id, f);
    }
  }
  cache.shapes = { tier, index };
  return cache.shapes;
}

/**
 * Geometry for a snapshot's asserted shapes.
 *
 * This is where the 24.6 MB corridor file is finally read — once per process, and only when a caller
 * actually asks for geometry. The measured worst case for a single year in the pilot is 12 shapes and
 * about 0.36 MB, which is small enough to send directly and is why this project has no tile server.
 */
export function shapesForSnapshot(snapshot: CorpusSnapshot): ShapeBundle {
  assertServerOnly("src/lib/atlas/corpus.ts");
  const { tier, index } = loadShapeIndex();
  const features: Array<Feature<Geometry>> = [];
  const missing: string[] = [];
  for (const id of snapshot.shapeIds) {
    const hit = index.get(id);
    if (hit) features.push(hit);
    else missing.push(id);
  }

  const approxBytes = features.reduce((n, f) => n + JSON.stringify(f).length, 0);
  const notes: string[] = [];
  if (tier === "focus") {
    notes.push(
      `Only the focus tier (145 shapes) is present; shapes-corridor.geojson is a gitignored build ` +
        `artifact. ${missing.length} of ${snapshot.shapeIds.length} asserted shapes could not be ` +
        `supplied. Run \`npm run atlas:build\` for complete coverage.`,
    );
  } else if (tier === "none") {
    notes.push("No shape file is present, so no geometry could be returned.");
  } else if (missing.length > 0) {
    notes.push(
      `${missing.length} asserted shape id(s) are absent from shapes-corridor.geojson, which should ` +
        `not happen after a successful \`atlas:validate\` (E003 checks exactly this).`,
    );
  }
  notes.push(
    "Cliopatria boundaries are generalised and dated approximately; every shape carries " +
    "spatialPrecision \"boundary-approximate\" and reviewStatus \"imported-unreviewed\". Render them " +
    "as approximate, never as treaty lines.",
  );

  return {
    tier,
    requested: snapshot.shapeIds.length,
    found: features.length,
    features,
    missing,
    approxBytes,
    note: notes.join(" "),
  };
}

// ---------------------------------------------------------------------------
// Narrow projections (safe to serialise to a client)
// ---------------------------------------------------------------------------

/**
 * A timeline-ready summary of the corpus's curated events.
 *
 * Deliberately small: id, date, title, importance and place. A timeline needs to position events, not
 * carry their full evidence records — those are fetched for one event at a time.
 */
export function eventTimeline(): Array<{
  id: string;
  date: string;
  dateCertainty: DateCertainty;
  title: LocalisedText;
  importance: number;
  eventType: HistoricalEvent["eventType"];
  placeId?: string;
  geometry?: { type: "Point"; coordinates: [number, number] };
  displayDate: LocalisedText;
  parseError?: string;
}> {
  const corpus = loadCorpus();
  return corpus.events
    .map((e) => {
      const parsed = parsedDate(e.date);
      return {
        id: e.id,
        date: e.date,
        dateCertainty: e.dateCertainty,
        title: e.title,
        importance: e.importance,
        eventType: e.eventType,
        placeId: e.location?.placeId,
        geometry: e.location?.geometry,
        // Rendering the date through the temporal engine keeps BCE display correct everywhere, and
        // keeps the no-year-zero rule from depending on each caller remembering it.
        displayDate:
          parsed instanceof CorpusError
            ? { en: e.date, hi: e.date }
            : { en: displayTemporal(parsed, "en"), hi: displayTemporal(parsed, "hi") },
        parseError: parsed instanceof CorpusError ? parsed.message : undefined,
      };
    })
    .sort((a, b) => dateSortKey(a.date) - dateSortKey(b.date));
}

/** Sort key for an EDTF value: its earliest JDN, or 0 if it cannot be dated. */
function dateSortKey(edtf: string): number {
  const parsed = parsedDate(edtf);
  if (parsed instanceof CorpusError) return Number.MAX_SAFE_INTEGER;
  return jdnRange(parsed)?.earliest ?? Number.MAX_SAFE_INTEGER;
}

function displayTemporal(value: TemporalValue, lang: "en" | "hi"): string {
  // `formatTemporal` is the temporal engine's own renderer: it honours day and month precision,
  // collapses a coarse closed interval ("-0500/-0405" -> "501-406 BCE"), and never emits a year zero.
  // Reimplementing that here would be a second, less-tested copy of a rule this project cares about.
  return formatTemporal(value, lang);
}

/**
 * One place with everything a detail panel needs, or null.
 *
 * Includes the coverage records and interpretations that mention the place, so "what do we not know
 * about Pataliputra?" and "what do historians disagree about?" are answerable in one request.
 */
export function placeDetail(placeId: string): {
  place: Place;
  events: HistoricalEvent[];
  interpretations: Interpretation[];
  coverage: CoverageRecord[];
  learning: LearningContent[];
} | null {
  const corpus = loadCorpus();
  const place = corpus.places.find((p) => p.id === placeId);
  if (!place) return null;
  const mentions = (ids: string[] | undefined): boolean => (ids ?? []).includes(placeId);
  return {
    place,
    events: corpus.events.filter((e) => mentions(e.places) || e.location?.placeId === placeId),
    interpretations: corpus.interpretations.filter((i) => i.concerns.includes(placeId)),
    // A CoverageRecord describes a SOURCE's coverage of a bounding box and interval — it carries no
    // list of place ids. So the link is made the way the model actually supports: does this place fall
    // inside the area the record is talking about? That is a real spatial question with a real answer,
    // unlike inventing an `affects` field the schema does not have.
    coverage: corpus.coverage.filter((c) => placeWithinArea(place, c.area)),
    learning: corpus.learning.filter((l) => l.subject === placeId),
    // GeographicalFeature deliberately has no `relatedPlaces`: features are linked to the basemap by
    // `geometryRef`, not to places by id, so there is no honest way to list them here. Fetch features
    // by their own id instead of implying a relationship the corpus does not record.
  };
}

/** True when a place's point falls inside a bounding box. Inclusive on all four edges. */
function placeWithinArea(place: Place, area: BBox): boolean {
  const [west, south, east, north] = area;
  const [lon, lat] = place.geometry.coordinates;
  return lon >= west && lon <= east && lat >= south && lat <= north;
}

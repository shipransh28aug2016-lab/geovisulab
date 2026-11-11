/**
 * `npm run atlas:validate` — the data-integrity gate for the pilot corpus.
 *
 * WHY THIS EXISTS. Every rule in docs/DATA_MODEL.md and docs/DATA_GOVERNANCE.md is a rule about not
 * lying. A rule that is only written down gets broken the first time someone is in a hurry, so each
 * one is encoded here as a check with an id. Errors fail the build; warnings are counted and reported
 * because some of them are editorial debt that must be VISIBLE rather than silently zero.
 *
 * The distinction between error and warning is deliberate:
 *   ERROR   the corpus is inconsistent or asserts something unsupported. Cannot ship.
 *   WARNING the corpus is honest but incomplete. Ships, and the number is published so it can only
 *           fall as real work is done.
 *
 * Run: `npm run atlas:validate` (also runs as the last step of `npm run atlas:build`).
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { EdtfError, formatTemporal, formatYear, parseEdtf } from "../../src/lib/atlas/temporal";
import type {
  AtlasCorpus,
  Citation,
  CoverageRecord,
  CurriculumLink,
  HistoricalAssertion,
  HistoricalEntity,
  LearningContent,
  LocalisedText,
  SourceRecord,
} from "../../src/lib/atlas/model";
import { DEPTH_ORDER } from "../../src/lib/atlas/model";
import { CURATED_COVERAGE, CURATED_LEARNING, curatedCorpus } from "../data/pilot/curated";

// ---------------------------------------------------------------------------
// Result collection
// ---------------------------------------------------------------------------

type Severity = "error" | "warning";
interface Finding {
  id: string;
  severity: Severity;
  message: string;
}
const findings: Finding[] = [];
const seen = new Set<string>();

function report(id: string, severity: Severity, message: string): void {
  // Deduplicate: the same defect across 400 records is one finding with a count, not 400 lines.
  const key = `${id}|${message}`;
  if (seen.has(key)) return;
  seen.add(key);
  findings.push({ id, severity, message });
}
function count(id: string, severity: Severity, noun: string, ids: string[], detail = ""): void {
  if (ids.length === 0) return;
  const sample = ids.slice(0, 6).join(", ");
  report(
    id,
    severity,
    `${ids.length} ${noun}${ids.length === 1 ? "" : "s"}${detail ? ` ${detail}` : ""}: ${sample}` +
      (ids.length > 6 ? `, …` : ""),
  );
}

// ---------------------------------------------------------------------------
// Load
// ---------------------------------------------------------------------------

const ROOT = path.resolve(import.meta.dirname, "../..");
const CLIOPATRIA = path.join(ROOT, "atlas/data/pilot/cliopatria");
const BASEMAP = path.join(ROOT, "atlas/data/pilot/basemap");

function readJson<T>(file: string, id: string): T | null {
  if (!existsSync(file)) {
    report(id, "error", `missing generated file ${path.relative(ROOT, file)} — run \`npm run atlas:build\``);
    return null;
  }
  try {
    return JSON.parse(readFileSync(file, "utf8")) as T;
  } catch (err) {
    report(id, "error", `unparseable JSON in ${path.relative(ROOT, file)}: ${(err as Error).message}`);
    return null;
  }
}

interface AnomalyFile {
  generatedAt: string;
  policy: string;
  corridor: Record<string, number>;
  rowsInCorridor: number;
  anomalies: Array<{ kind: string; entity: string; detail: string; rowsAffected: number; action?: string }>;
}
interface BasemapManifest {
  source: string;
  license: string;
  attribution: string;
  corridor: Record<string, number>;
  clipWindow: Record<string, number>;
  layers: Array<{ out: string; file: string; upstreamBytes: number; upstreamSha256: string; features: number; note?: string }>;
  generatedAt: string;
}
interface FeatureCollection {
  type: string;
  features: Array<{ type: string; geometry?: { type: string; coordinates?: unknown }; properties: Record<string, unknown> }>;
}

const corpus: Omit<AtlasCorpus, "entities" | "assertions"> = curatedCorpus("validating");
const entities = readJson<HistoricalEntity[]>(path.join(CLIOPATRIA, "entities.json"), "E000");
const assertions = readJson<HistoricalAssertion[]>(path.join(CLIOPATRIA, "assertions.json"), "E000");
const anomalyFile = readJson<AnomalyFile>(path.join(CLIOPATRIA, "anomalies.json"), "E000");
const importManifest = readJson<{ corridor: Record<string, number>; importedAt?: string }>(
  path.join(CLIOPATRIA, "import.json"),
  "E000",
);
const basemapManifest = readJson<BasemapManifest>(path.join(BASEMAP, "manifest.json"), "E000");

// ---------------------------------------------------------------------------
// E001 — every record id unique, within and across collections
// ---------------------------------------------------------------------------

const idOwners = new Map<string, string>();
function registerIds(collection: string, records: Array<{ id: string }>): void {
  for (const r of records) {
    const owner = idOwners.get(r.id);
    if (owner) {
      report("E001", "error", `id "${r.id}" used by both ${owner} and ${collection}`);
    } else {
      idOwners.set(r.id, collection);
    }
  }
}
registerIds("sources", corpus.sources);
registerIds("places", corpus.places);
registerIds("events", corpus.events);
registerIds("features", corpus.features);
registerIds("interpretations", corpus.interpretations);
registerIds("coverage", corpus.coverage);
registerIds("learning", corpus.learning);
registerIds("entities", entities ?? []);
registerIds("assertions", assertions ?? []);

// ---------------------------------------------------------------------------
// E005/E004/E006 — citations: resolvable source, non-empty locator, no not-consulted claims
// ---------------------------------------------------------------------------

const sourceById = new Map<string, SourceRecord>(corpus.sources.map((s) => [s.id, s]));
for (const s of entities ?? []) {
  for (const c of s.sources ?? []) {
    if (!sourceById.has(c.source)) {
      const imported = readJson<SourceRecord[]>(path.join(CLIOPATRIA, "sources.json"), "E005");
      for (const i of imported ?? []) sourceById.set(i.id, i);
      break;
    }
  }
}

const NOT_CONSULTED = "not-consulted";
let citationCount = 0;
const emptyLocator: string[] = [];
const unknownSource: string[] = [];
const notConsultedClaims: string[] = [];

function checkCitations(owner: string, citations: Citation[] | undefined): void {
  for (const c of citations ?? []) {
    citationCount++;
    if (!c.locator || c.locator.trim().length === 0) emptyLocator.push(`${owner} -> ${c.source}`);
    const src = sourceById.get(c.source);
    if (!src) unknownSource.push(`${owner} -> ${c.source}`);
    else if (src.verification === NOT_CONSULTED && src.id !== "atlas-editorial-unsourced") {
      // A source we never consulted may be LISTED, but no claim may REST on it. The distinction is
      // not guesswork: the citation must say so itself. A bare citation of an unconsulted work looks
      // exactly like reliance, so it fails; one carrying an explicit disclaimer is the honest form and
      // is what this corpus uses for the 1912 gazette notification and the 1793 regulation.
      const disclaimed = /not consulted|no claim|listed for reference|not read/i.test(c.note ?? "");
      if (!disclaimed) notConsultedClaims.push(`${owner} -> ${c.source} (citation carries no disclaimer)`);
    }
  }
}

function walkTexts(owner: string, value: unknown, cites: (o: string, c: Citation[]) => void): void {
  if (value === null || value === undefined) return;
  if (Array.isArray(value)) {
    for (const v of value) walkTexts(owner, v, cites);
    return;
  }
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.source === "string" && "locator" in o) cites(owner, [o as unknown as Citation]);
    for (const [k, v] of Object.entries(o)) walkTexts(k === "sources" ? owner : `${owner}.${k}`, v, cites);
  }
}

walkTexts("places", corpus.places, checkCitations);
walkTexts("events", corpus.events, checkCitations);
walkTexts("features", corpus.features, checkCitations);
walkTexts("interpretations", corpus.interpretations, checkCitations);
walkTexts("sources", corpus.sources, checkCitations);
walkTexts("learning", corpus.learning, checkCitations);
walkTexts("entities", entities ?? [], checkCitations);
walkTexts("assertions", assertions ?? [], checkCitations);

count("E004", "error", "citation with an empty or missing locator", emptyLocator, "(D-4: a citation without a locator is not a citation)");
count("E005", "error", "citation naming a source id that does not exist", unknownSource);
count(
  "E006",
  "error",
  "claim resting on a source whose verification is 'not-consulted'",
  notConsultedClaims,
  "(such a source may be listed for study but may not carry a claim)",
);

// ---------------------------------------------------------------------------
// E002/E003/E018 — referential integrity of the imported territory data
// ---------------------------------------------------------------------------

const entityIds = new Set((entities ?? []).map((e) => e.id));
const focusShapes = readJson<FeatureCollection>(path.join(CLIOPATRIA, "shapes-focus.geojson"), "E003");
const corridorShapes = existsSync(path.join(CLIOPATRIA, "shapes-corridor.geojson"))
  ? (readJson<FeatureCollection>(path.join(CLIOPATRIA, "shapes-corridor.geojson"), "E003") ?? null)
  : null;

const focusIds = new Set<string>();
for (const f of focusShapes?.features ?? []) {
  const id = f.properties?.id;
  if (typeof id === "string") focusIds.add(id);
}
const corridorIds = new Set<string>();
for (const f of corridorShapes?.features ?? []) {
  const id = f.properties?.id;
  if (typeof id === "string") corridorIds.add(id);
}
if (corridorShapes && focusIds.size > 0 && corridorIds.size > 0) {
  const notInCorridor = [...focusIds].filter((id) => !corridorIds.has(id));
  count("E018", "error", "focus shape absent from the corridor tier", notInCorridor, "(the focus tier must be a subset)");
}

if (assertions) {
  const badSubject = assertions.filter((a) => !entityIds.has(a.subject)).map((a) => `${a.id}->${a.subject}`);
  // `shape` is optional because relational predicates (part-of, traded-with, …) need no geometry.
  // A TERRITORIAL predicate without one is a defect: the claim is about land and there is no land.
  const TERRITORIAL = new Set(["controls", "administers", "occupies", "claims"]);
  const territorialWithoutShape = assertions
    .filter((a) => TERRITORIAL.has(a.relation) && !a.shape)
    .map((a) => `${a.id} (${a.relation})`);
  const badShape = assertions
    .filter((a) => a.shape !== undefined && !focusIds.has(a.shape) && !corridorIds.has(a.shape))
    .map((a) => `${a.id}->${a.shape}`);
  count(
    "E003",
    "error",
    "territorial assertion carrying no shape",
    territorialWithoutShape,
    "(a claim about land needs the land)",
  );
  count("E002", "error", "assertion whose subject is not an imported entity", badSubject);
  count("E003", "error", "assertion whose shape is not in either shape tier", badShape);

  // Every focus shape should be the geometry of some assertion; an orphan shape is undisplayable
  // provenance — it has no claim, no date and no source attached.
  const assertedShapes = new Set(assertions.map((a) => a.shape).filter((x): x is string => x !== undefined));
  const orphanShapes = [...focusIds].filter((id) => !assertedShapes.has(id));
  count("E018", "error", "focus shape referenced by no assertion", orphanShapes, "(a shape with no claim has no provenance)");
}

// Unresolved relations must carry an explanation, not dangle silently.
const danglingUnexplained: string[] = [];
for (const e of entities ?? []) {
  for (const r of e.relations ?? []) {
    if (entityIds.has(r.object)) continue;
    const explained = r.resolvedInCorridor === false && (r.sources ?? []).some((c) => (c.note ?? "").length > 0);
    if (!explained) danglingUnexplained.push(`${e.id}->${r.object}`);
  }
}
count("E017", "error", "relation object that does not resolve and carries no explanation", danglingUnexplained);

// ---------------------------------------------------------------------------
// E007/E016 — temporal: every EDTF string parses, and no year zero reaches a learner
// ---------------------------------------------------------------------------

const edtfFailures: string[] = [];
function checkEdtf(owner: string, value: unknown): void {
  if (typeof value !== "string") return;
  // Only strings that look like EDTF are parsed; free text is not a date field.
  if (!/^-?\d{4}(-\d{2}(-\d{2})?)?[~?%]|^\d{4}(-\d{2}(-\d{2})?)?[~?%]?\s*$|\.\./.test(value) && !/^-?\d{4}/.test(value)) {
    return;
  }
  try {
    parseEdtf(value);
  } catch (err) {
    if (err instanceof EdtfError) edtfFailures.push(`${owner}: "${value}" — ${err.message}`);
  }
}

const DATE_FIELDS = new Set([
  "date",
  "validTime",
  "existence",
  "publicationDate",
  "accessDate",
  "from",
  "until",
  "temporalExtent",
]);
function walkDates(owner: string, value: unknown): void {
  if (value === null || value === undefined) return;
  if (Array.isArray(value)) {
    value.forEach((v, i) => walkDates(`${owner}[${i}]`, v));
    return;
  }
  if (typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (DATE_FIELDS.has(k) && typeof v === "string") checkEdtf(`${owner}.${k}`, v);
      walkDates(`${owner}.${k}`, v);
    }
  }
}
walkDates("corpus", corpus);
walkDates("entities", entities ?? []);
walkDates("assertions", assertions ?? []);
count("E007", "error", "EDTF string that the temporal engine rejects", edtfFailures);

/**
 * A year zero in a DISPLAY string. The zero must be standalone: "3400 ईसा पूर्व" ends in the same
 * characters as a hypothetical "0 ईसा पूर्व", so a naive substring test flags 340 correct outputs and
 * drowns the one real defect. Require a non-digit (or string start) before the zero.
 */
const YEAR_ZERO_DISPLAY = /(?:^|[^0-9])0\s*(?:BCE|BC|ईसा पूर्व)\b/i;

// Sweep every year the corpus spans, in both UI languages, and fail if a year zero is ever shown.
const yearZeroLeaks: string[] = [];
for (let y = -3400; y <= 2024; y++) {
  for (const lang of ["en", "hi"] as const) {
    const s = formatYear(y, lang);
    if (YEAR_ZERO_DISPLAY.test(s) || /year\s+0\b/i.test(s)) {
      yearZeroLeaks.push(`formatYear(${y}, "${lang}") = "${s}"`);
    }
  }
}
count("E016", "error", "display string showing a year zero", yearZeroLeaks, "(astronomical 0 must render as 1 BCE)");

// No curated prose may contain a year-zero phrasing either.
const proseLeaks: string[] = [];
function walkProse(owner: string, value: unknown): void {
  if (typeof value === "string") {
    // Only a zero used AS A DATE is a defect. Prose that explains the convention — "there is no year
    // 0 in historical notation", "astronomical 0 = 1 BCE" — is correct and necessary pedagogy at
    // research depth, and flagging it would train authors to delete the explanation instead.
    if (YEAR_ZERO_DISPLAY.test(value)) {
      proseLeaks.push(`${owner}: "${value.slice(0, 60)}…"`);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => walkProse(`${owner}[${i}]`, v));
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) walkProse(`${owner}.${k}`, v);
  }
}
walkProse("corpus", corpus);
count("E016", "error", "authored text containing a year-zero phrasing", proseLeaks);

// ---------------------------------------------------------------------------
// E008 — anomalies are explained
// ---------------------------------------------------------------------------

if (anomalyFile) {
  const unexplained = anomalyFile.anomalies
    .filter((a) => !a.action || a.action.trim().length === 0)
    .map((a) => `${a.kind}/${a.entity}`);
  count("E008", "error", "anomaly with no recorded action", unexplained, "(policy is report-and-explain, never repair silently)");
  const noPolicy = !anomalyFile.policy || anomalyFile.policy.trim().length === 0;
  if (noPolicy) report("E008", "error", "anomalies.json carries no policy statement");
}

// ---------------------------------------------------------------------------
// E009/E019 — basemap manifest agrees with the files on disk, and with the importer
// ---------------------------------------------------------------------------

if (basemapManifest) {
  for (const layer of basemapManifest.layers) {
    const file = path.join(BASEMAP, layer.out);
    if (!existsSync(file)) {
      report("E009", "error", `basemap layer ${layer.out} listed in the manifest but not on disk`);
      continue;
    }
    const fc = readJson<FeatureCollection>(file, "E009");
    if (!fc) continue;
    if (fc.features.length !== layer.features) {
      report("E009", "error", `${layer.out}: manifest says ${layer.features} features, file has ${fc.features.length}`);
    }
    const generated = (layer as { origin?: string }).origin === "generated";
    if (generated) {
      if (/^[0-9a-f]{64}$/.test(layer.upstreamSha256 ?? "")) {
        report("E009", "error", `${layer.out}: marked generated but claims an upstream sha256`);
      }
    } else if (!/^[0-9a-f]{64}$/.test(layer.upstreamSha256 ?? "")) {
      report("E009", "error", `${layer.out}: downloaded layer with no valid upstream sha256, so the fetch is not reproducible`);
    }
  }
  // Two scripts must agree about what the corridor is, or the history and the basemap do not overlap.
  const bc = basemapManifest.corridor;
  const ic = importManifest?.corridor ?? anomalyFile?.corridor;
  if (ic && (bc.west !== ic.west || bc.south !== ic.south || bc.east !== ic.east || bc.north !== ic.north)) {
    report(
      "E019",
      "error",
      `corridor mismatch: basemap ${JSON.stringify(bc)} vs cliopatria import ${JSON.stringify(ic)} — ` +
        `the historical layer and the physical basemap would not line up`,
    );
  }
  // A modern political basemap under an ancient map teaches that present borders are older than they
  // are. The exclusion is a design decision, so it is checked rather than trusted.
  const political = basemapManifest.layers.filter((l) => /admin|countries|boundar|disputed|sovereig/i.test(l.file));
  count(
    "E020",
    "error",
    "political or administrative boundary layer in the basemap",
    political.map((l) => l.out),
    "(deliberately excluded by design — see docs/LICENCE_AUDIT.md)",
  );
}

// ---------------------------------------------------------------------------
// E010/E011 — feature geometry references resolve; measurements carry a reference date
// ---------------------------------------------------------------------------

const basemapFiles = new Map<string, FeatureCollection>();
for (const layer of basemapManifest?.layers ?? []) {
  const fc = readJson<FeatureCollection>(path.join(BASEMAP, layer.out), "E010");
  if (fc) basemapFiles.set(layer.out, fc);
}

const unresolvableRefs: string[] = [];
const missingAsOf: string[] = [];
for (const f of corpus.features) {
  if (f.geometryRef) {
    const [fileName, selector] = f.geometryRef.split("#");
    const fc = basemapFiles.get(fileName);
    if (!fc) {
      unresolvableRefs.push(`${f.id}: "${f.geometryRef}" — no such basemap file`);
    } else if (selector && selector !== "all") {
      const m = /^name=(.+)$/.exec(selector);
      if (!m) unresolvableRefs.push(`${f.id}: unsupported selector "${selector}" (expected "name=<x>" or "all")`);
      else {
        const hit = fc.features.filter((x) => (x.properties?.name ?? x.properties?.name_en) === m[1]);
        if (hit.length === 0) unresolvableRefs.push(`${f.id}: no feature named "${m[1]}" in ${fileName}`);
      }
    }
  }
  if (!f.geometry && !f.geometryRef) {
    // Geometry-less features are legitimate — but only when the absence is documented as a gap.
    const documented = JSON.stringify(f.attributes ?? {}).match(/NO GEOMETRY|GAP|ABSENT/i);
    if (!documented) {
      report("E010", "error", `feature ${f.id} has neither geometry nor geometryRef and does not document why`);
    }
  }
  for (const m of f.measurements ?? []) {
    if (!m.asOf) missingAsOf.push(`${f.id}.${m.metric}`);
    if (!m.method || m.method.trim().length === 0) missingAsOf.push(`${f.id}.${m.metric} (no method)`);
  }
}
count("E010", "error", "feature geometryRef that does not resolve against the basemap", unresolvableRefs);
count(
  "E011",
  "error",
  "measurement without a reference date or a stated method",
  missingAsOf,
  "(a quantitative layer needs source, year, unit, coverage and method)",
);

// ---------------------------------------------------------------------------
// E012/E013/E014 — cross-references from curated records resolve
// ---------------------------------------------------------------------------

const placeIds = new Set(corpus.places.map((p) => p.id));
const eventIds = new Set(corpus.events.map((e) => e.id));
const featureIds = new Set(corpus.features.map((f) => f.id));
const interpIds = new Set(corpus.interpretations.map((i) => i.id));
const resolvable = new Set<string>([...entityIds, ...placeIds, ...eventIds, ...featureIds, ...interpIds]);

const badConcerns: string[] = [];
for (const i of corpus.interpretations) {
  for (const c of i.concerns) if (!resolvable.has(c)) badConcerns.push(`${i.id}->${c}`);
  if (i.positions.length < 2) {
    report("E012", "error", `interpretation ${i.id} has ${i.positions.length} position(s); an interpretation needs at least two readings to compare`);
  }
}
count("E012", "error", "interpretation concern that resolves to nothing", badConcerns);

const badEventRefs: string[] = [];
for (const e of corpus.events) {
  for (const x of e.entities ?? []) if (!entityIds.has(x)) badEventRefs.push(`${e.id}->entity:${x}`);
  for (const x of e.places ?? []) if (!placeIds.has(x)) badEventRefs.push(`${e.id}->place:${x}`);
  if (e.location?.placeId && !placeIds.has(e.location.placeId)) badEventRefs.push(`${e.id}->location.placeId:${e.location.placeId}`);
  if (!e.importance || e.importance < 1 || e.importance > 5) badEventRefs.push(`${e.id}->importance out of 1..5`);
}
count("E013", "error", "event reference that resolves to nothing", badEventRefs);

// E021 — every place outside the corridor bbox must be covered by an explicit context record, or the
// map silently mixes in-corridor and out-of-corridor places and a learner cannot tell them apart.
const [bW, bS, bE, bN] = corpus.bounds;
const CONTEXT_RECORD = "cov-context-places-outside-corridor";
const outside: string[] = [];
for (const p of corpus.places) {
  const [lon, lat] = p.geometry.coordinates as [number, number];
  if (lon < bW || lon > bE || lat < bS || lat > bN) outside.push(`${p.id} (${lon.toFixed(2)}E, ${lat.toFixed(2)}N)`);
}
if (outside.length > 0) {
  const ctx = corpus.coverage.find((c: CoverageRecord) => c.id === CONTEXT_RECORD);
  if (!ctx) {
    report("E021", "error", `${outside.length} place(s) lie outside the corridor and no "${CONTEXT_RECORD}" record accounts for them: ${outside.join(", ")}`);
  } else {
    const text = JSON.stringify(ctx.notes ?? {});
    const unaccounted = outside.filter((o) => !text.includes(o.split(" ")[0]));
    count("E021", "error", "place outside the corridor not named in the context coverage record", unaccounted);
  }
}

const badPlaceRefs: string[] = [];
for (const p of corpus.places) {
  for (const x of p.relatedPlaces ?? []) if (!placeIds.has(x)) badPlaceRefs.push(`${p.id}->${x}`);
  if (p.locationPrecisionKm === undefined) {
    badPlaceRefs.push(`${p.id} has no locationPrecisionKm (a pin must never imply exactness)`);
  }
}
count("E013", "error", "place reference that resolves to nothing, or place with no positional precision", badPlaceRefs);

const badLearningSubject: string[] = [];
for (const l of corpus.learning) if (!resolvable.has(l.subject)) badLearningSubject.push(`${l.id}->${l.subject}`);
count("E014", "error", "learning entry whose subject resolves to nothing", badLearningSubject);

// ---------------------------------------------------------------------------
// E015 — questions are internally consistent
// ---------------------------------------------------------------------------

const badQuestions: string[] = [];
for (const l of corpus.learning) {
  for (const q of l.questions ?? []) {
    const n = q.options?.length ?? 0;
    // A source-evaluation question may be open-ended: "what must a careful historian add to this
    // sentence?" has no option list worth writing, and forcing one would make the exercise worse.
    // Every other option-based kind must actually have options.
    if (q.kind === "multiple-choice" || q.kind === "map-based" || (q.kind === "source-evaluation" && n > 0)) {
      if (n < 2) badQuestions.push(`${q.id}: ${q.kind} with ${n} option(s)`);
      if (q.correctIndex !== undefined && (q.correctIndex < 0 || q.correctIndex >= n)) {
        badQuestions.push(`${q.id}: correctIndex ${q.correctIndex} out of range for ${n} options`);
      }
      if (q.correctIndex === undefined && q.kind !== "source-evaluation") {
        badQuestions.push(`${q.id}: ${q.kind} with no correctIndex`);
      }
    }
    if (q.kind === "sequence") {
      const order = q.correctOrder ?? [];
      const nums = order.map((s) => Number(s));
      const isPermutation =
        nums.length === n && new Set(nums).size === n && nums.every((x) => Number.isInteger(x) && x >= 0 && x < n);
      if (!isPermutation) {
        badQuestions.push(`${q.id}: correctOrder [${order.join(",")}] is not a permutation of ${n} options`);
      }
    }
    if (!q.feedback || Object.keys(q.feedback).length === 0) {
      badQuestions.push(`${q.id}: no feedback (a verdict without reasoning teaches nothing)`);
    }
  }
}
count("E015", "error", "internally inconsistent question", badQuestions);

// ---------------------------------------------------------------------------
// W001-W006 — warnings: honest but incomplete
// ---------------------------------------------------------------------------

const missingHindi: string[] = [];
function walkLocalised(owner: string, value: unknown): void {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const o = value as Record<string, unknown>;
    if (typeof o.en === "string" && !("hi" in o)) missingHindi.push(owner);
    for (const [k, v] of Object.entries(o)) walkLocalised(`${owner}.${k}`, v);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walkLocalised(`${owner}[${i}]`, v));
  }
}
walkLocalised("places", corpus.places);
walkLocalised("events", corpus.events);
walkLocalised("interpretations", corpus.interpretations);
walkLocalised("learning", corpus.learning);
count("W001", "warning", "authored English text with no Hindi value", missingHindi, "(a coverage gap, never machine-translated — see cov-hindi-partial)");

const unverifiedCurriculum: string[] = [];
function walkCurriculum(owner: string, links: CurriculumLink[] | undefined): void {
  for (const l of links ?? []) {
    if (!l.verifiedAgainst || !l.verifiedDate) {
      unverifiedCurriculum.push(`${owner}: ${l.level}${l.class ? ` ${l.class}` : ""}${l.chapterRef ? ` ${l.chapterRef}` : ""}`);
    }
    if (l.level === "upsc" && !l.upscPaper) unverifiedCurriculum.push(`${owner}: UPSC link with no paper named`);
  }
}
for (const p of corpus.places) walkCurriculum(`place:${p.id}`, p.curriculum);
for (const e of corpus.events) walkCurriculum(`event:${e.id}`, e.curriculum);
for (const f of corpus.features) walkCurriculum(`feature:${f.id}`, f.curriculum);
for (const i of corpus.interpretations) walkCurriculum(`interp:${i.id}`, i.curriculum);
count("W002", "warning", "curriculum link not verified against a named syllabus", unverifiedCurriculum);

const coverageIds = new Set(corpus.coverage.map((c) => c.id));
const referencedCoverage = new Set<string>();
function walkForCoverage(value: unknown): void {
  if (typeof value === "string") {
    for (const id of coverageIds) if (value.includes(id)) referencedCoverage.add(id);
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) walkForCoverage(v);
    return;
  }
  if (value && typeof value === "object") {
    for (const v of Object.values(value as Record<string, unknown>)) walkForCoverage(v);
  }
}
walkForCoverage(corpus);
const unreferencedCoverage = [...coverageIds].filter((id) => !referencedCoverage.has(id));
count(
  "W003",
  "warning",
  "coverage record nothing refers to",
  unreferencedCoverage,
  "(a gap nobody can reach is a gap nobody will read)",
);

// Depth modes must add STRUCTURE, not prose. Check that empirically.
const bySubject = new Map<string, LearningContent[]>();
for (const l of corpus.learning) {
  const list = bySubject.get(l.subject) ?? [];
  list.push(l);
  bySubject.set(l.subject, list);
}
const thinHigherDepth: string[] = [];
for (const [subject, list] of bySubject) {
  for (const l of list) {
    const idx = DEPTH_ORDER.indexOf(l.depthMode);
    if (idx <= 0) continue; // discover has nothing to add structure over
    const hasFocus = Boolean(l.analyticalFocus && Object.keys(l.analyticalFocus).length > 0);
    const hasQuestions = (l.questions ?? []).length > 0;
    if (!hasFocus || !hasQuestions) {
      thinHigherDepth.push(`${l.id} (${subject} @ ${l.depthMode}): analyticalFocus=${hasFocus} questions=${(l.questions ?? []).length}`);
    }
  }
  // And the higher mode must not merely be longer prose.
  const sorted = [...list].sort((a, b) => DEPTH_ORDER.indexOf(a.depthMode) - DEPTH_ORDER.indexOf(b.depthMode));
  for (let i = 1; i < sorted.length; i++) {
    const lower = sorted[i - 1];
    const higher = sorted[i];
    const len = (t: LocalisedText) => (t?.en ?? "").length;
    if (len(higher.body) > len(lower.body) * 4) {
      thinHigherDepth.push(`${higher.id}: body is ${(len(higher.body) / Math.max(len(lower.body), 1)).toFixed(1)}x the ${lower.depthMode} entry — depth modes must add analysis, not length`);
    }
  }
}
count("W004", "warning", "higher depth mode without added analytical structure", thinHigherDepth);

const unsourcedCitations: string[] = [];
function walkForUnsourced(owner: string, value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach((v, i) => walkForUnsourced(`${owner}[${i}]`, v));
    return;
  }
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (o.source === "atlas-editorial-unsourced") unsourcedCitations.push(owner);
    for (const [k, v] of Object.entries(o)) walkForUnsourced(`${owner}.${k}`, v);
  }
}
walkForUnsourced("corpus", corpus);
count(
  "W005",
  "warning",
  "citation pointing at the NOT-YET-SOURCED marker",
  unsourcedCitations,
  "(editorial debt: the interface must show an unsourced badge, and this number can only fall)",
);

const referenceIdentified = corpus.sources.filter((s) => s.verification === "reference-identified");
const consulted = corpus.sources.filter((s) => s.verification === "consulted");
report(
  "W006",
  "warning",
  `source verification: ${consulted.length} consulted, ${referenceIdentified.length} reference-identified, ` +
    `${corpus.sources.length - consulted.length - referenceIdentified.length} not-consulted — only a consulted ` +
    `source's locators were checked against the text`,
);

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

const errors = findings.filter((f) => f.severity === "error");
const warnings = findings.filter((f) => f.severity === "warning");

console.log(`[atlas:validate] corpus "${corpus.id}" — ${corpus.bounds.join(", ")}`);
console.log(
  `[atlas:validate] curated: ${corpus.sources.length} sources, ${corpus.places.length} places, ` +
    `${corpus.events.length} events, ${corpus.features.length} features, ` +
    `${corpus.interpretations.length} interpretations, ${corpus.coverage.length} coverage records, ` +
    `${corpus.learning.length} learning entries`,
);
console.log(
  `[atlas:validate] imported: ${entities?.length ?? 0} entities, ${assertions?.length ?? 0} assertions, ` +
    `${focusIds.size} focus shapes, ${corridorIds.size} corridor shapes, ` +
    `${anomalyFile?.anomalies.length ?? 0} anomaly classes`,
);
console.log(`[atlas:validate] ${citationCount} citations checked across all collections`);
console.log("");

for (const f of [...errors, ...warnings].sort((a, b) => a.id.localeCompare(b.id))) {
  console.log(`  ${f.severity === "error" ? "ERROR " : "warn  "} ${f.id}  ${f.message}`);
}
console.log("");
console.log(`[atlas:validate] ${errors.length} error(s), ${warnings.length} warning(s)`);

if (errors.length > 0) {
  console.error("[atlas:validate] FAILED — the corpus is inconsistent or asserts something unsupported.");
  process.exit(1);
}
console.log("[atlas:validate] passed.");

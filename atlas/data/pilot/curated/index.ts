/**
 * PILOT CORPUS — Ganga-Magadha-Eastern India knowledge corridor.
 *
 * This module is PURE DATA: no fs, no fetch, no Node APIs. It is therefore safe to import from
 * anywhere, including client components, without dragging a server-only dependency into a browser
 * bundle.
 *
 * WHAT IS HERE AND WHAT IS NOT. The curated content (sources, places, events, features,
 * interpretations, coverage records, learning content) and the dataset import manifest live in
 * TypeScript so they are type-checked at build time — a malformed citation fails `tsc`, which is the
 * cheapest possible place to catch it. The two LARGE imported collections do not:
 *
 *   atlas/data/pilot/cliopatria/entities.json     154 entities   (~149 KB)
 *   atlas/data/pilot/cliopatria/assertions.json   1,764 assertions (~920 KB)
 *
 * Those are read from disk by the server-side loader (src/lib/atlas/corpus.ts) and filtered by date
 * before anything reaches a browser. Inlining them here would put about a megabyte of JSON into the
 * frontend bundle, which is precisely what this project's rules forbid.
 *
 * `generatedAt` is a PARAMETER, not a constant. A hardcoded timestamp in a data module goes stale the
 * moment the corpus is rebuilt, and a stale "generated" date is a small lie that is very hard to
 * notice. The build passes the real one.
 */

import type { AtlasCorpus, DatasetImport } from "../../../../src/lib/atlas/model";
import { CURATED_SOURCES } from "./sources";
import { CURATED_PLACES } from "./places";
import { CURATED_EVENTS } from "./events";
import { CURATED_FEATURES } from "./features";
import { CURATED_INTERPRETATIONS } from "./interpretations";
import { CURATED_COVERAGE } from "./coverage";
import { CURATED_LEARNING } from "./learning";

/**
 * The pilot corridor: 76.5-91.5 E, 19.8-31.5 N.
 *
 * The southern edge was extended from 21.0 to 19.8 specifically to include KALINGA. Ashoka's
 * conquest of Kalinga is the pivot of the whole Mauryan narrative and the reference event of this
 * pilot; a corridor that stops north of it would exclude the single best-documented event in the
 * region. Everything outside this bbox is OUT OF SCOPE, not absent — see coverage record
 * cov-corridor-scope.
 */
export const CORRIDOR_BOUNDS: AtlasCorpus["bounds"] = [76.5, 19.8, 91.5, 31.5];

/**
 * Temporal extent of the curated corpus. -0599 astronomical = 600 BCE, the second urbanisation;
 * 2024 CE matches the end of the Cliopatria record. Stated as the span the CONTENT covers, which is
 * wider than the span any single source covers.
 */
export const CORRIDOR_TEMPORAL_EXTENT: AtlasCorpus["temporalExtent"] = ["-0599", "2024"];

export const CURATED_IMPORTS: DatasetImport[] = [
  {
    id: "import-cliopatria",
    name: "Cliopatria — a geospatial dataset of worldwide polities",
    publisher: "Seshat Global History Databank",
    url: "https://github.com/Seshat-Global-History-Databank/cliopatra",
    version: "v0.2.1 (Zenodo 13363121, DOI 10.5281/zenodo.13363121); upstream archive sha256 e10a4e42 (cliopatra.geojson.zip, 46,005,176 B) -> inner cliopatria_polities_only_v021.geojson sha256 fc6f0d1e (172,854,269 B)",
    license: "CC-BY-4.0",
    attribution:
      "Cliopatria: a geospatial dataset of worldwide polities from 3400 BCE to 2024 CE, Seshat Global " +
      "History Databank, licensed CC BY 4.0. Boundaries reflect only one version of the territory held " +
      "by past polities. Wikidata identifiers derive from Charles de Dampierre (Bunka.ai) and Nicolas " +
      "Baumard (IJN/ENS/PSL/EHESS/CNRS).",
    modifications:
      "Corridor filter (76.5-91.5E, 19.8-31.5N): 13,797 upstream rows -> 1,846 in-corridor. " +
      "Coordinates rounded to 4 decimal places (~11 m) — the source's own positional accuracy for " +
      "ancient polities is tens of kilometres, so nothing real is lost, and it roughly halves the " +
      "bytes. Integer years re-expressed as EDTF over astronomical integers (upstream already numbers " +
      "astronomically; no value shifted). 82 rows of Type=RELATION excluded from territorial " +
      "assertions: a relationship's spatial extent is not a sovereign border. Entity ids " +
      "disambiguated where upstream names slug identically ('(Mahajanapadas)' vs 'Mahajanapadas') by " +
      "appending -2, -3 in sorted-name order. NO geometry was merged, smoothed, simplified or " +
      "editorially altered. Every modification is recorded in atlas/data/pilot/cliopatria/import.json " +
      "and every upstream anomaly in anomalies.json.",
    yearConvention: "astronomical",
    recordsImported: 1846,
    importedAt: "2026-11-11",
  },
  {
    id: "import-natural-earth",
    name: "Natural Earth — 10m physical layers",
    publisher: "Natural Earth (nvkelso/natural-earth-vector)",
    url: "https://github.com/nvkelso/natural-earth-vector",
    version:
      "master, fetched 2026-11-11. Pinned per layer by upstream sha256 recorded in " +
      "atlas/data/pilot/basemap/manifest.json: land 1ac90796 (10,157,965 B), coastline 6f75ae0e " +
      "(10,110,735 B), rivers_lake_centerlines bb854a90 (7,307,743 B), lakes (ne_10m_lakes).",
    license: "Public Domain",
    attribution:
      "Base layers made with Natural Earth, a public domain map dataset. Modern political boundaries " +
      "are excluded by design.",
    modifications:
      "Clipped to the corridor plus a 4-degree margin (72.5-95.5E, 15.8-35.5N) using an exact convex " +
      "Sutherland-Hodgman clip for polygons and a run-splitting clip for lines. A 5-degree graticule " +
      "and the Tropic of Cancer (23.4368 N) are generated locally rather than imported. LAYERS " +
      "DELIBERATELY EXCLUDED: admin_0 countries, admin_1 provinces and all boundary/disputed lines — a " +
      "modern political basemap under an ancient map teaches that present borders are older than they " +
      "are. 50m layers were tried first and rejected: at 50m only ten rivers survive in this corridor " +
      "and the Son, Ghaghara, Gandak and Kosi are absent entirely, which for a Ganga pilot is " +
      "unusable. No geometry altered beyond clipping.",
    yearConvention: "historical",
    recordsImported: 174,
    importedAt: "2026-11-11",
  },
];

/**
 * Everything in the corpus except the two large imported collections, which the server-side loader
 * reads from JSON. Use `Omit` so the relationship to AtlasCorpus is enforced by the compiler: if a
 * field is added to AtlasCorpus, this stops compiling until the curated corpus supplies it.
 */
export type CuratedCorpus = Omit<AtlasCorpus, "entities" | "assertions">;

export function curatedCorpus(generatedAt: string): CuratedCorpus {
  return {
    id: "pilot-ganga-magadha",
    title: {
      en: "Ganga-Magadha-Eastern India Knowledge Corridor (pilot)",
      hi: "गंगा-मगध-पूर्वी भारत ज्ञान क्षेत्र (पायलट)",
    },
    bounds: CORRIDOR_BOUNDS,
    temporalExtent: CORRIDOR_TEMPORAL_EXTENT,
    generatedAt,
    sources: CURATED_SOURCES,
    places: CURATED_PLACES,
    events: CURATED_EVENTS,
    features: CURATED_FEATURES,
    interpretations: CURATED_INTERPRETATIONS,
    coverage: CURATED_COVERAGE,
    learning: CURATED_LEARNING,
    imports: CURATED_IMPORTS,
  };
}

export {
  CURATED_SOURCES,
  CURATED_PLACES,
  CURATED_EVENTS,
  CURATED_FEATURES,
  CURATED_INTERPRETATIONS,
  CURATED_COVERAGE,
  CURATED_LEARNING,
};

/**
 * Counts, for the health endpoint and for the validator's summary line. Derived rather than
 * hardcoded so they cannot drift from the data.
 */
export const CURATED_COUNTS = {
  sources: CURATED_SOURCES.length,
  places: CURATED_PLACES.length,
  events: CURATED_EVENTS.length,
  features: CURATED_FEATURES.length,
  interpretations: CURATED_INTERPRETATIONS.length,
  coverage: CURATED_COVERAGE.length,
  learning: CURATED_LEARNING.length,
  imports: CURATED_IMPORTS.length,
} as const;

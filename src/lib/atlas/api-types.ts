/**
 * ATLAS API CONTRACT — the single definition of what the atlas routes return and what the client
 * components consume.
 *
 * This module exists because the two halves cannot share an implementation. `src/lib/atlas/corpus.ts`
 * imports `node:fs` and must never reach a browser bundle; the components run in the browser. What they
 * CAN share is the shape of the data crossing between them.
 *
 * So the routes annotate their responses with these types and the components parse into them. Without
 * that, a field renamed on the server fails silently in the client — the map simply stops drawing a
 * layer, which looks like missing data rather than a broken contract.
 *
 * Pure types plus `./model` imports only: nothing here touches the filesystem, so it is safe on both
 * sides of the boundary.
 */

import type { FeatureCollection, Geometry } from "geojson";

import type {
  BBox,
  DateCertainty,
  HistoricalAssertion,
  HistoricalEntity,
  HistoricalEvent,
  LocalisedText,
  Place,
} from "./model";

// ---------------------------------------------------------------------------
// Shared vocabulary
// ---------------------------------------------------------------------------

/** Which geometry file a snapshot's shapes came from. "focus" is partial and must be declared. */
export type ShapeTier = "corridor" | "focus" | "none";

/** Counts per date-certainty class, so an interface can render uncertainty instead of flattening it. */
export type CertaintyBreakdown = Record<DateCertainty, number>;

/** The year in both numbering systems, with display strings already rendered server-side. */
export interface SnapshotYear {
  /** Astronomical numbering, as the corpus stores it. 0 means 1 BCE. */
  astronomical: number;
  /** Historical notation. Never contains a year zero. */
  historical: { year: number; era: "BCE" | "CE" };
  display: LocalisedText;
  century: LocalisedText;
  query:
    | { kind: "historical-year"; year: number; era: "BCE" | "CE" }
    | { kind: "astronomical-year"; year: number }
    | { kind: "edtf-date"; value: string };
}

// ---------------------------------------------------------------------------
// Response envelopes
//
// The four types below are `type` aliases rather than `interface` on purpose. `api-client.ts` declares
// `request<T extends Json>` where `Json = Record<string, unknown>`, and TypeScript only infers an
// implicit index signature for object-literal type aliases — an interface fails that constraint with
// TS2344 "Index signature for type 'string' is missing". Nested types are unaffected, because `unknown`
// absorbs any property value, so only these top-level response shapes need the distinction.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// GET /api/atlas/meta
// ---------------------------------------------------------------------------

/** One curated event, reduced to what a timeline needs. */
export interface TimelineEvent {
  id: string;
  date: string;
  dateCertainty: DateCertainty;
  title: LocalisedText;
  importance: number;
  eventType: HistoricalEvent["eventType"];
  placeId?: string;
  geometry?: { type: "Point"; coordinates: [number, number] };
  /** Rendered by the temporal engine, so the client never reimplements BCE display. */
  displayDate: LocalisedText;
  parseError?: string;
}

export interface AtlasCorpusStatus {
  present: boolean;
  dataRoot: string;
  corridor: BBox;
  temporalExtent: [string, string];
  curated: Record<string, number>;
  shapeTier: ShapeTier;
  generatedAt: string | null;
  imported: { entities: number; assertions: number; sources: number; anomalyKinds: number } | null;
  missing: string[];
}

export type AtlasMetaResponse = {
  success: true;
  status: AtlasCorpusStatus;
  timeline: TimelineEvent[];
};

// ---------------------------------------------------------------------------
// GET /api/atlas/basemap
// ---------------------------------------------------------------------------

/** A basemap layer plus the manifest entry that records where it came from. */
export interface BasemapLayerDto {
  provenance: {
    out: string;
    file: string;
    upstreamBytes?: number;
    upstreamSha256?: string;
    features: number;
    origin: "downloaded" | "generated";
    note?: string;
    cached?: boolean;
  };
  data: FeatureCollection;
}

export type AtlasBasemapResponse = {
  success: true;
  attribution: string;
  source: string;
  license: string;
  corridor: Record<string, number>;
  generatedAt: string;
  layers: string[];
  data: Record<string, BasemapLayerDto>;
};

// ---------------------------------------------------------------------------
// GET /api/atlas/snapshot
// ---------------------------------------------------------------------------

export interface SnapshotShapesDto {
  tier: ShapeTier;
  requested: number;
  found: number;
  /** Asserted shape ids this deployment could not supply. Must be surfaced, never dropped. */
  missing: string[];
  approxBytes: number;
  note?: string;
  data: FeatureCollection<Geometry | null>;
}

export type AtlasSnapshotResponse = {
  success: true;
  year: SnapshotYear;
  counts: { entities: number; assertions: number; events: number; places: number; shapes: number };
  certainty: {
    entities: CertaintyBreakdown;
    assertions: CertaintyBreakdown;
    events: CertaintyBreakdown;
    total: CertaintyBreakdown;
  };
  entities: HistoricalEntity[];
  assertions: HistoricalAssertion[];
  events: HistoricalEvent[];
  places: Place[];
  shapes: SnapshotShapesDto;
  exclusions: {
    unparseableDates: Array<{ collection: string; id: string; date: string; reason: string }>;
    assertionsWithInactiveSubject: number;
    unresolvedPlaceIds: string[];
  };
  bounds: BBox;
  generatedAt: string;
};

/** Shape of every error response these routes can return. */
export type AtlasErrorResponse = {
  success: false;
  error: string;
  status?: AtlasCorpusStatus;
};

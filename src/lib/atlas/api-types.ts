/**
 * ATLAS API CONTRACT — what the atlas routes return, in one place.
 *
 * WHY THIS EXISTS. `corpus.ts` imports `node:fs` and must never reach a browser bundle, so the server and
 * the client cannot share an implementation. What they CAN share is the shape of the data crossing between
 * them. Every type below is DERIVED from the corpus functions with `ReturnType` rather than restated, so
 * the contract cannot drift from what the server actually produces: if a corpus function changes shape,
 * these types change with it and any client that relied on the old shape fails to compile.
 *
 * The derivations are `import type`, which TypeScript erases — so nothing here pulls `node:fs` into a
 * client bundle despite referring to a server-only module.
 *
 * WHY THEY ARE `type` ALIASES, NOT `interface`. `api-client.ts` declares `request<T extends Json>` where
 * `Json = Record<string, unknown>`, and TypeScript only infers an implicit index signature for
 * object-literal type aliases. An interface fails that constraint with TS2344 "Index signature for type
 * 'string' is missing". Nested types are unaffected, because `unknown` absorbs any property value.
 */

import type { FeatureCollection } from "geojson";

import type {
  corpusStatus,
  eventTimeline,
  loadCorpus,
  shapesForSnapshot,
  snapshotAtAstronomicalYear,
} from "./corpus";

// ---------------------------------------------------------------------------
// Derived building blocks
// ---------------------------------------------------------------------------

/** One curated event as the timeline endpoint returns it. */
export type TimelineEvent = ReturnType<typeof eventTimeline>[number];

/**
 * Corpus status as published over HTTP.
 *
 * `dataRoot` is REMOVED. It is an absolute server filesystem path, and publishing it tells an attacker
 * where the deployment lives and how it is laid out. `/api/atlas/timeline` strips it before responding;
 * this type makes that stripping part of the contract rather than a detail of one route, so a new route
 * cannot reintroduce the leak by returning `corpusStatus()` directly.
 */
export type CorpusStatusDto = Omit<ReturnType<typeof corpusStatus>, "dataRoot">;

/** Everything the corpus holds, for the single-event evidence endpoint. */
export type Corpus = ReturnType<typeof loadCorpus>;

/** One year of the corridor: entities, assertions, events, places, certainty and exclusions. */
export type YearSnapshot = ReturnType<typeof snapshotAtAstronomicalYear>;

/**
 * Geometry for a snapshot, WITH an explicit statement of how complete it is.
 *
 * `tier` is `"focus"` when only the committed 145-shape subset is available, and `missing` lists the
 * asserted shapes that could not be supplied. Both must reach the client: a map with one polity missing
 * at the moment of a war fought there is worse than a map that says it is incomplete.
 */
export type ShapesResult = ReturnType<typeof shapesForSnapshot>;

/** Which geometry tier the deployment can serve. Named in every result that depends on it. */
export type ShapeTier = ShapesResult["tier"];

// ---------------------------------------------------------------------------
// Response envelopes
// ---------------------------------------------------------------------------

/** `GET /api/atlas/timeline` — the event timeline plus corpus status, in one trip. */
export type AtlasTimelineResponse = {
  events: TimelineEvent[];
  status: CorpusStatusDto;
};

/**
 * `GET /api/atlas/basemap` — the five physical layers as GeoJSON, with provenance.
 *
 * Each layer is the raw FeatureCollection, keyed by name, NOT wrapped in a metadata object. That is
 * deliberate: it is what the atlas renderer draws from, and wrapping it would force every consumer to
 * unwrap before use. Attribution is returned alongside so a consumer can credit Natural Earth without a
 * second request.
 */
export type AtlasBasemapResponse = {
  corridor: Record<string, number>;
  clipWindow: Record<string, number>;
  attribution: string;
  layers: Record<string, FeatureCollection>;
};

/**
 * `GET /api/atlas/snapshot` — one year of the corridor.
 *
 * `shapeEntity` maps shape id to the entity id that asserted it. The renderer needs it to colour an
 * outline by polity and to build the legend, and deriving it client-side would mean re-walking every
 * assertion to rebuild a mapping the server already has.
 */
export type AtlasSnapshotResponse = {
  snapshot: YearSnapshot;
  shapes: ShapesResult;
  shapeEntity: Record<string, string>;
};

/** `GET /api/atlas/event?event=<id>` — the full evidence record behind one event. */
export type AtlasEventResponse = {
  event: Corpus["events"][number];
  /** Only the sources this event actually cites, not the whole register. */
  sources: Corpus["sources"];
  entities: Array<{ id: string; names: Corpus["entities"][number]["names"] }>;
};

/** Every error these routes can return. Note `error`, not `message` — matching the routes. */
export type AtlasErrorResponse = {
  error: string;
};

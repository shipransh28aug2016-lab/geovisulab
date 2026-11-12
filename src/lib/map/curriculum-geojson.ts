/**
 * CURRICULUM DATA -> GEOJSON
 *
 * Converts the typed TypeScript arrays in `src/data/geo-features.ts` and `src/data/headquarters-data.ts`
 * into GeoJSON FeatureCollections that MapLibre can render from a style specification.
 *
 * WHY THIS MODULE EXISTS. Under Leaflet, every feature became its own layer object with its own
 * `bindTooltip` string and its own `on("click")` closure — 991 lines of imperative construction, and the
 * styling could not be inspected or tested apart from the component. Converting to GeoJSON once means
 * the map is data plus a declarative style: colours, widths and visibility become expressions that can
 * be unit-tested and changed without touching the render loop.
 *
 * THE COORDINATE ORDER TRAP. This is the one mistake that silently destroys the map, so it is stated
 * plainly here and covered by a test:
 *
 *     source data      [latitude, longitude]   — e.g. Ganga at Gangotri is [30.99, 78.94]
 *     GeoJSON          [longitude, latitude]   — the same point must be written [78.94, 30.99]
 *
 * Both are "a pair of numbers near 30 and 79", so a swap does not throw and does not look wrong in a
 * diff. It renders India's rivers in the Arabian Sea and the Himalaya off the coast of Somalia. Every
 * conversion below goes through `toLngLat` / `toLngLatPath` so the flip happens in exactly one place.
 *
 * Client-safe: no filesystem, no Node APIs.
 */

import type { Feature, FeatureCollection, LineString, Point, Polygon } from "geojson";

import {
  CBSE_MAP_ITEMS,
  CLIMATE_ZONES,
  INDIAN_MOUNTAINS,
  INDIAN_RIVERS,
  INDIAN_SOILS,
  OCEAN_CURRENTS,
  TECTONIC_PLATES,
} from "@/data/geo-features";
import { HEADQUARTERS_DATA } from "@/data/headquarters-data";

/** A `[latitude, longitude]` pair as the source data stores it. */
type LatLng = [number, number];

/** Flips one point from the source's `[lat, lng]` to GeoJSON's `[lng, lat]`. */
function toLngLat(pair: LatLng): [number, number] {
  return [pair[1], pair[0]];
}

/** Flips a whole path, preserving order. */
function toLngLatPath(path: LatLng[]): [number, number][] {
  return path.map(toLngLat);
}

/**
 * Closes a polygon ring if the source left it open.
 *
 * GeoJSON requires a LinearRing: at least four positions, first and last identical. Several soil and
 * climate polygons in the source data are written as open rings. MapLibre will not render an unclosed
 * ring, and the failure is a silently missing fill rather than an error — so close them here.
 */
function toLinearRing(path: LatLng[]): [number, number][] {
  const ring = toLngLatPath(path);
  if (ring.length < 3) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) ring.push([first[0], first[1]]);
  return ring;
}

/**
 * Parses a coordinate that may arrive as a number, a numeric string, or nothing at all.
 *
 * Returns `null` for absent or unusable input. This exists because the obvious implementation —
 * `Number(value)` guarded by `Number.isFinite` — accepts `""`, `"   "` and `null` as 0, and 0 is a real
 * latitude and longitude. `AnnotationRow` stores its coordinates as strings, so an empty field is a
 * live possibility rather than a hypothetical.
 */
function toFiniteCoordinate(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" && value.trim().length === 0) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

const fc = <G extends Point | LineString | Polygon, P>(features: Feature<G, P>[]): FeatureCollection<G, P> => ({
  type: "FeatureCollection",
  features,
});

// ---------------------------------------------------------------------------
// Rivers
// ---------------------------------------------------------------------------

export interface RiverProps {
  id: string;
  name: string;
  hindiName: string;
  kind: "river";
  lengthKm: number;
  origin: string;
  outflow: string;
  basinAreaSqKm: number;
  classGrade: string;
  ncertChapter: string;
  color: string;
  majorTributaries: string;
  description: string;
  vertexCount: number;
}

/**
 * The eight curated river systems as LineStrings.
 *
 * These are the NCERT-aligned schematic paths used for teaching drainage, NOT surveyed centrelines. The
 * Natural Earth rivers in the basemap are a separate, measured layer; conflating the two would put a
 * hand-drawn teaching path behind a "length in km" claim. `vertexCount` is carried so an interface can
 * say how coarse a path is instead of implying survey precision.
 */
export function riversToGeoJson(): FeatureCollection<LineString, RiverProps> {
  return fc(
    INDIAN_RIVERS.map((r) => ({
      type: "Feature" as const,
      properties: {
        id: r.id,
        name: r.name,
        hindiName: r.hindiName ?? "",
        kind: "river" as const,
        lengthKm: r.lengthKm,
        origin: r.origin,
        outflow: r.outflow,
        basinAreaSqKm: r.basinAreaSqKm,
        classGrade: r.classGrade,
        ncertChapter: r.ncertChapter,
        color: r.color,
        majorTributaries: r.majorTributaries.join(", "),
        description: r.description,
        vertexCount: r.path.length,
      },
      geometry: { type: "LineString" as const, coordinates: toLngLatPath(r.path) },
    })),
  );
}

// ---------------------------------------------------------------------------
// Mountains
// ---------------------------------------------------------------------------

export interface MountainProps {
  id: string;
  name: string;
  kind: "range" | "peak";
  elevationM: number;
  classGrade: string;
  ncertChapter: string;
  geologicalAge: string;
  highestPeak: string;
  description: string;
  significance: string;
  /** True when this feature also carries a range outline, so the label can be placed at the centroid. */
  hasOutline: boolean;
}

/** Points for peaks/range labels, plus LineStrings for range outlines where the data provides one. */
export function mountainsToGeoJson(): {
  points: FeatureCollection<Point, MountainProps>;
  outlines: FeatureCollection<LineString, MountainProps>;
} {
  const toProps = (m: (typeof INDIAN_MOUNTAINS)[number]): MountainProps => ({
    id: m.id,
    name: m.name,
    kind: m.type,
    elevationM: m.elevationM,
    classGrade: m.classGrade,
    ncertChapter: m.ncertChapter,
    geologicalAge: m.geologicalAge,
    highestPeak: m.highestPeak ?? "",
    description: m.description,
    significance: m.significance,
    hasOutline: Boolean(m.polyline && m.polyline.length > 1),
  });

  return {
    points: fc(INDIAN_MOUNTAINS.map((m) => ({
      type: "Feature" as const,
      properties: toProps(m),
      geometry: { type: "Point" as const, coordinates: toLngLat(m.coordinates) },
    }))),
    outlines: fc(
      INDIAN_MOUNTAINS.filter((m) => m.polyline && m.polyline.length > 1).map((m) => ({
        type: "Feature" as const,
        properties: toProps(m),
        geometry: { type: "LineString" as const, coordinates: toLngLatPath(m.polyline!) },
      })),
    ),
  };
}

// ---------------------------------------------------------------------------
// Soils and climate zones (polygons)
// ---------------------------------------------------------------------------

export interface SoilProps {
  id: string;
  name: string;
  hindiName: string;
  kind: "soil";
  color: string;
  /** 0..1 as authored. Kept as authored so the style does not invent an opacity. */
  fillOpacity: number;
  areaPercentage: string;
  characteristics: string;
  cropsGrown: string;
  distributionStates: string;
  ncertChapter: string;
  description: string;
}

/**
 * Soil regions as Polygons.
 *
 * These are schematic teaching regions, not a soil survey: the boundaries are generalised to the level a
 * Class 11 textbook shows. `areaPercentage` is the authored textbook figure and is labelled as such by
 * the style — it is not measured from this geometry, and deriving an area from a schematic polygon would
 * produce a number that looks measured but is not.
 */
export function soilsToGeoJson(): FeatureCollection<Polygon, SoilProps> {
  return fc(
    INDIAN_SOILS.map((s) => ({
      type: "Feature" as const,
      properties: {
        id: s.id,
        name: s.name,
        hindiName: s.hindiName,
        kind: "soil" as const,
        color: s.color,
        fillOpacity: s.fillOpacity,
        areaPercentage: s.areaPercentage,
        characteristics: s.characteristics.join(", "),
        cropsGrown: s.cropsGrown.join(", "),
        distributionStates: s.distributionStates.join(", "),
        ncertChapter: s.ncertChapter,
        description: s.description,
      },
      geometry: { type: "Polygon" as const, coordinates: [toLinearRing(s.polygon)] },
    })),
  );
}

export interface ClimateProps {
  id: string;
  name: string;
  koppenCode: string;
  color: string;
  avgTempRange: string;
  annualRainfall: string;
  vegetation: string;
  worldRegions: string;
  description: string;
  kind: "climate";
}

/** Köppen climate zones as Polygons. Same schematic caveat as soils. */
export function climateToGeoJson(): FeatureCollection<Polygon, ClimateProps> {
  return fc(
    CLIMATE_ZONES.map((c) => ({
      type: "Feature" as const,
      properties: {
        id: c.id,
        name: c.name,
        koppenCode: c.koppenCode,
        color: c.color,
        avgTempRange: c.avgTempRange,
        annualRainfall: c.annualRainfall,
        vegetation: c.vegetation,
        worldRegions: c.worldRegions.join(", "),
        description: c.description,
        kind: "climate" as const,
      },
      geometry: { type: "Polygon" as const, coordinates: [toLinearRing(c.polygon)] },
    })),
  );
}

// ---------------------------------------------------------------------------
// Tectonics
// ---------------------------------------------------------------------------

export interface TectonicProps {
  id: string;
  name: string;
  kind: "plate" | "boundary";
  boundaryType: string;
  speedMmPerYear: number | null;
  associatedFeatures: string;
  ncertChapter: string;
  description: string;
  color: string;
  /** "point" | "line" — the style needs one source, so geometry type is carried as data. */
  geometryKind: "point" | "line";
}

/**
 * Plate boundaries as LineStrings and plate reference points as Points, merged into ONE collection.
 *
 * Merged because MapLibre filters a source by geometry type at the layer level: a single source with two
 * layers (`["==", ["geometry-type"], "LineString"]`) is simpler than two sources that must be kept in
 * step. `geometryKind` duplicates that test as a property so labels and tooltips can branch on it.
 */
export function tectonicsToGeoJson(): FeatureCollection<Point | LineString, TectonicProps> {
  const features: Feature<Point | LineString, TectonicProps>[] = [];

  for (const t of TECTONIC_PLATES) {
    const props: TectonicProps = {
      id: t.id,
      name: t.name,
      kind: t.type,
      boundaryType: t.boundaryType ?? "",
      speedMmPerYear: t.speedMmPerYear ?? null,
      associatedFeatures: t.associatedFeatures,
      ncertChapter: t.ncertChapter,
      description: t.description,
      color: t.color,
      geometryKind: t.polyline && t.polyline.length > 1 ? "line" : "point",
    };

    if (t.polyline && t.polyline.length > 1) {
      features.push({
        type: "Feature",
        properties: props,
        geometry: { type: "LineString", coordinates: toLngLatPath(t.polyline) },
      });
    } else if (t.coordinates) {
      features.push({
        type: "Feature",
        properties: props,
        geometry: { type: "Point", coordinates: toLngLat(t.coordinates) },
      });
    }
    // A record with neither is dropped rather than rendered at [0,0]. Off the coast of Africa there is
    // a null island where missing coordinates pile up, and a learner cannot tell that from real data.
  }

  return fc(features);
}

// ---------------------------------------------------------------------------
// Ocean currents
// ---------------------------------------------------------------------------

export interface CurrentProps {
  id: string;
  name: string;
  kind: "warm" | "cold";
  ocean: string;
  influence: string;
  color: string;
}

/** Ocean currents as LineStrings, coloured by warm/cold in the style. */
export function currentsToGeoJson(): FeatureCollection<LineString, CurrentProps> {
  return fc(
    OCEAN_CURRENTS.map((c) => ({
      type: "Feature" as const,
      properties: {
        id: c.id,
        name: c.name,
        kind: c.type,
        ocean: c.ocean,
        influence: c.influence,
        color: c.color,
      },
      geometry: { type: "LineString" as const, coordinates: toLngLatPath(c.path) },
    })),
  );
}

// ---------------------------------------------------------------------------
// CBSE map-practice items and headquarters
// ---------------------------------------------------------------------------

export interface MapItemProps {
  id: string;
  name: string;
  category: string;
  state: string;
  significance: string;
  cbseExamFrequency: string;
  kind: "mapItem";
}

/** The twenty CBSE map-practice locations as Points. */
export function mapItemsToGeoJson(): FeatureCollection<Point, MapItemProps> {
  return fc(
    CBSE_MAP_ITEMS.map((m) => ({
      type: "Feature" as const,
      properties: {
        id: m.id,
        name: m.name,
        category: m.category,
        state: m.state,
        significance: m.significance,
        cbseExamFrequency: m.cbseExamFrequency,
        kind: "mapItem" as const,
      },
      geometry: { type: "Point" as const, coordinates: toLngLat(m.coordinates) },
    })),
  );
}

export interface HeadquartersProps {
  id: string;
  name: string;
  shortName: string;
  category: string;
  categoryLabel: string;
  city: string;
  state: string;
  establishedYear: number;
  parentMinistryOrBody: string;
  significance: string;
  ncertChapterRef: string;
  classGrade: string;
  cbseExamRelevance: string;
  jurisdictionOrScope: string;
  color: string;
  icon: string;
  kind: "headquarters";
}

/** The twenty-six institutional headquarters as Points. */
export function headquartersToGeoJson(): FeatureCollection<Point, HeadquartersProps> {
  return fc(
    HEADQUARTERS_DATA.map((h) => ({
      type: "Feature" as const,
      properties: { ...h, kind: "headquarters" as const },
      geometry: { type: "Point" as const, coordinates: toLngLat(h.coordinates) },
    })),
  );
}

// ---------------------------------------------------------------------------
// User annotations
// ---------------------------------------------------------------------------

export interface AnnotationProps {
  id: string;
  title: string;
  description: string;
  authorName: string;
  kind: "annotation";
}

/**
 * Learner annotations as Points.
 *
 * Built from a parameter rather than imported state because annotations arrive from the API at runtime
 * and their latitude/longitude are stored as STRINGS (see `AnnotationRow` in `db/store.ts`). `Number()`
 * plus an `isFinite` check means a malformed row is skipped instead of drawing a marker at NaN, which
 * MapLibre renders at [0,0].
 */
export function annotationsToGeoJson(
  annotations: Array<{
    id: string;
    title?: string | null;
    description?: string | null;
    latitude?: string | number | null;
    longitude?: string | number | null;
    userName?: string | null;
    user?: { name?: string | null } | null;
  }>,
): FeatureCollection<Point, AnnotationProps> {
  const features: Feature<Point, AnnotationProps>[] = [];

  for (const a of annotations) {
    const lat = toFiniteCoordinate(a.latitude);
    const lng = toFiniteCoordinate(a.longitude);
    // Skip, do not default. `Number("")` and `Number(null)` are both 0, which is a perfectly valid
    // coordinate — so a row with an empty latitude would otherwise render at null island, off the coast
    // of West Africa, indistinguishable from real data. Absent must stay absent.
    if (lat === null || lng === null) continue;

    features.push({
      type: "Feature",
      properties: {
        id: a.id,
        title: a.title ?? "",
        description: a.description ?? "",
        authorName: a.userName ?? a.user?.name ?? "",
        kind: "annotation",
      },
      // Annotations come from the API, which already stores [lat, lng] separately rather than as a
      // pair — so they are assembled directly in GeoJSON order here, not run through toLngLat.
      geometry: { type: "Point", coordinates: [lng, lat] },
    });
  }

  return fc(features);
}

/** Everything above, keyed by the layer id the style uses. Convenient for tests and for the map init. */
export function allCurriculumLayers(annotations: Parameters<typeof annotationsToGeoJson>[0] = []) {
  const mountains = mountainsToGeoJson();
  return {
    rivers: riversToGeoJson(),
    mountainPoints: mountains.points,
    mountainOutlines: mountains.outlines,
    soils: soilsToGeoJson(),
    climate: climateToGeoJson(),
    tectonics: tectonicsToGeoJson(),
    currents: currentsToGeoJson(),
    mapItems: mapItemsToGeoJson(),
    headquarters: headquartersToGeoJson(),
    annotations: annotationsToGeoJson(annotations),
  };
}

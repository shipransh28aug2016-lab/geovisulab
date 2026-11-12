/**
 * MAPLIBRE STYLE BUILDER — the declarative description of the 2D map.
 *
 * WHY THE MAP IS BUILT THIS WAY
 *
 * 1. No third-party tiles for the base map. The Leaflet version pointed at CARTO, OpenTopoMap and Esri.
 *    All three are unreachable from any environment without outbound network — including the sandboxed
 *    preview frame this app is reviewed in and CI — so the 2D map rendered as an empty grey pane there.
 *    The base map here is our own committed Natural Earth extract, served by `/api/atlas/basemap`, so it
 *    is complete offline and every layer carries an upstream sha256 and a licence. Satellite imagery is
 *    still offered, but as an OPTIONAL raster drawn on top of the vector land, so when it fails to load
 *    the learner sees a correct map rather than nothing.
 *
 * 2. No symbol layers, therefore no `glyphs` endpoint. MapLibre renders `text-field` from glyph PBFs
 *    fetched over the network, and none are bundled or obtainable offline. A style that declared text
 *    layers would show no labels at all in a sandboxed frame, and Devanagari would depend on whatever
 *    the glyph server happened to carry. Labels are therefore HTML overlays — which is also what the
 *    Leaflet version did (`divIcon`, `bindTooltip`), so this is parity rather than a downgrade, and it
 *    renders Hindi with the system fonts the rest of the app already uses.
 *
 * 3. One style, mutated in place. Layer and source ids are fixed constants (below) so the component can
 *    toggle `layout.visibility` and call `setData` on a source without rebuilding the style. Rebuilding
 *    would flash the canvas and reset the camera on every checkbox click.
 *
 * 4. Data-driven paint. Colours come from feature properties rather than being restated per layer, so
 *    the authored colour in `geo-features.ts` is the single source of truth and cannot drift from what
 *    is drawn.
 *
 * Client-safe: types only from the style-spec package, no filesystem, no MapLibre runtime import.
 */

import type { FeatureCollection } from "geojson";
import type {
  ExpressionSpecification,
  FilterSpecification,
  LayerSpecification,
  SourceSpecification,
  StyleSpecification,
} from "@maplibre/maplibre-gl-style-spec";

// ---------------------------------------------------------------------------
// Stable ids
// ---------------------------------------------------------------------------

/**
 * Source ids. Fixed so the component can address a source by name and call `setData` on it.
 */
export const SOURCE_IDS = {
  basemapLand: "basemap-land",
  basemapLakes: "basemap-lakes",
  basemapCoastline: "basemap-coastline",
  basemapRivers: "basemap-rivers",
  basemapGraticule: "basemap-graticule",
  satellite: "satellite-raster",
  climate: "curriculum-climate",
  soils: "curriculum-soils",
  tectonics: "curriculum-tectonics",
  currents: "curriculum-currents",
  rivers: "curriculum-rivers",
  mountainOutlines: "curriculum-mountain-outlines",
  mountainPoints: "curriculum-mountain-points",
  mapItems: "curriculum-map-items",
  headquarters: "curriculum-headquarters",
  annotations: "curriculum-annotations",
  highlight: "highlight-point",
} as const;

export type SourceId = (typeof SOURCE_IDS)[keyof typeof SOURCE_IDS];

/**
 * Layer ids, in the order they are pushed into the style — which IS the draw order, since MapLibre draws
 * the array front to back. Fills first, then lines, then points, so a river is never hidden by a soil
 * polygon and a marker is never hidden by a line.
 */
export const LAYER_IDS = {
  background: "background",
  land: "basemap-land-fill",
  satellite: "satellite-raster",
  lakes: "basemap-lakes-fill",
  climate: "curriculum-climate-fill",
  climateStroke: "curriculum-climate-stroke",
  soils: "curriculum-soils-fill",
  soilsStroke: "curriculum-soils-stroke",
  coastline: "basemap-coastline",
  basemapRivers: "basemap-rivers-line",
  currentsWarm: "curriculum-currents-line-warm",
  currentsCold: "curriculum-currents-line-cold",
  rivers: "curriculum-rivers-line",
  riversCasing: "curriculum-rivers-casing",
  tectonicsConvergent: "curriculum-tectonics-convergent-line",
  tectonicsOther: "curriculum-tectonics-other-line",
  graticule: "basemap-graticule-line",
  tropicOfCancer: "basemap-tropic-of-cancer",
  mountainOutlines: "curriculum-mountain-outlines-line",
  tectonicsPoint: "curriculum-tectonics-point",
  mountainPoints: "curriculum-mountain-points",
  mapItems: "curriculum-map-items-point",
  headquarters: "curriculum-headquarters-point",
  headquartersHighlight: "curriculum-headquarters-highlight",
  annotations: "curriculum-annotations-point",
  selected: "selected-point-ring",
} as const;

export type LayerId = (typeof LAYER_IDS)[keyof typeof LAYER_IDS];

// ---------------------------------------------------------------------------
// Themes
// ---------------------------------------------------------------------------

export type MapTheme = "dark" | "light" | "satellite";

interface ThemeTokens {
  /** Ocean and anything not covered by land. */
  background: string;
  land: string;
  landStroke: string;
  lake: string;
  /** Natural Earth rivers — measured centrelines, distinct from the schematic teaching paths. */
  river: string;
  graticule: string;
  tropicOfCancer: string;
  /** Casing drawn under a line to separate it from the base map at low contrast. */
  casing: string;
  annotation: string;
  selected: string;
}

export const MAP_THEMES: Record<MapTheme, ThemeTokens> = {
  // Matches the app's existing slate palette so the map does not look like a different product from the
  // panels around it.
  dark: {
    background: "#020617",
    land: "#0f172a",
    landStroke: "#334155",
    lake: "#0c3349",
    river: "#0369a1",
    graticule: "#1e293b",
    tropicOfCancer: "#b45309",
    casing: "#020617",
    annotation: "#f59e0b",
    selected: "#22d3ee",
  },
  // A light theme for printing and for projector use in a classroom, where a dark map washes out.
  light: {
    background: "#dbeafe",
    land: "#f8fafc",
    landStroke: "#94a3b8",
    lake: "#bfdbfe",
    river: "#2563eb",
    graticule: "#e2e8f0",
    tropicOfCancer: "#d97706",
    casing: "#f8fafc",
    annotation: "#b45309",
    selected: "#0891b2",
  },
  // Imagery is fetched from the network and may not arrive; the tokens describe the vector base that
  // remains visible underneath it either way.
  satellite: {
    background: "#020617",
    land: "#0b1220",
    landStroke: "#475569",
    lake: "#0c3349",
    river: "#38bdf8",
    graticule: "#334155",
    tropicOfCancer: "#fbbf24",
    casing: "#020617",
    annotation: "#fbbf24",
    selected: "#22d3ee",
  },
};

/**
 * Raster tile URLs for the satellite theme.
 *
 * Kept in one place and named explicitly because this is the ONLY external network dependency the map
 * has, and a test asserts that no other layer or source references a remote URL. Esri World Imagery is
 * used as the Leaflet version did; its terms require the attribution string in `SATELLITE_ATTRIBUTION`.
 */
export const SATELLITE_TILES = [
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
];

export const SATELLITE_ATTRIBUTION = "Esri, Maxar, Earthstar Geographics, and the GIS User Community";

/** Attribution for the vector base map, which is what is actually on screen most of the time. */
export const VECTOR_BASE_ATTRIBUTION =
  "Base map: Natural Earth (public domain), served by GeoVisuLab";

// ---------------------------------------------------------------------------
// Layer visibility groups
// ---------------------------------------------------------------------------

/**
 * Which layers each toggle in the layer panel controls.
 *
 * Grouped rather than one-to-one because a learner thinks in terms of "rivers" or "tectonics", while the
 * style needs several layers to draw one of those legibly: a river needs its casing and its line, a soil
 * region needs its fill and its outline. Toggling only one of the pair is the classic half-visible-layer
 * bug.
 */
export const VISIBILITY_GROUPS: Record<string, LayerId[]> = {
  rivers: [LAYER_IDS.riversCasing, LAYER_IDS.rivers],
  mountains: [LAYER_IDS.mountainOutlines, LAYER_IDS.mountainPoints],
  soils: [LAYER_IDS.soils, LAYER_IDS.soilsStroke],
  tectonics: [LAYER_IDS.tectonicsConvergent, LAYER_IDS.tectonicsOther, LAYER_IDS.tectonicsPoint],
  climate: [LAYER_IDS.climate, LAYER_IDS.climateStroke],
  mapItems: [LAYER_IDS.mapItems],
  userAnnotations: [LAYER_IDS.annotations],
  headquarters: [LAYER_IDS.headquarters, LAYER_IDS.headquartersHighlight],
  currents: [LAYER_IDS.currentsWarm, LAYER_IDS.currentsCold],
  // The physical base map is not a curriculum toggle: it is always drawn, because without it there is no
  // map to read the curriculum layers against.
  basemap: [LAYER_IDS.land, LAYER_IDS.lakes, LAYER_IDS.coastline, LAYER_IDS.basemapRivers],
  graticule: [LAYER_IDS.graticule, LAYER_IDS.tropicOfCancer],
};

export type ActiveLayerKeys = Record<string, boolean>;

// ---------------------------------------------------------------------------
// Style construction
// ---------------------------------------------------------------------------

export interface BuildStyleInput {
  theme: MapTheme;
  /**
   * Basemap layers from `/api/atlas/basemap`, keyed by name. `null` (or a missing key) means the corpus
   * has not been built in this deployment — the style still renders the curriculum layers over a plain
   * background rather than failing, and the component is expected to say why the base map is absent.
   */
  basemap: Record<string, FeatureCollection> | null;
  /** Curriculum FeatureCollections from `curriculum-geojson.ts`. */
  curriculum: Record<string, FeatureCollection>;
  activeLayers: ActiveLayerKeys;
  /** When true the satellite raster source and layer are included. */
  includeSatellite?: boolean;
}

const EMPTY: FeatureCollection = { type: "FeatureCollection", features: [] };

/**
 * `["to-number", ...]` around Natural Earth's `scalerank`.
 *
 * In the committed extract scalerank is an integer, so this coercion is currently a no-op. It stays
 * because a MapLibre expression comparing a string to a number does not throw — it simply never matches,
 * and the layer silently draws nothing. Natural Earth publishes some variants of these attributes as
 * strings, and a future re-import could change the type without any error anywhere. Coercing costs
 * nothing and converts a silent blank layer into a working one.
 *
 * The `coalesce` to 12 is the part that matters: a feature with no scalerank at all is treated as least
 * important rather than most, which is the safe direction — an unranked feature appears only once the
 * learner has zoomed in, instead of crowding the world view.
 */
const scalerank: ExpressionSpecification = ["to-number", ["coalesce", ["get", "scalerank"], 12]];

/**
 * Zoom-dependent importance threshold for Natural Earth layers.
 *
 * scalerank is inverse: 1 is the most significant. At world zoom only the largest rivers should draw, and
 * more should appear as the learner zooms in. Interpolating the threshold against zoom gives that
 * progressive disclosure without any client-side filtering.
 */
const importanceThreshold: ExpressionSpecification = [
  "interpolate",
  ["linear"],
  ["zoom"],
  0, 2,
  3, 4,
  5, 7,
  7, 10,
  9, 12,
];

const isVisible = (activeLayers: ActiveLayerKeys, group: string): "visible" | "none" =>
  activeLayers[group] === false ? "none" : "visible";

/** The paint block of a line layer, taken from the spec rather than restated here. */
type LinePaint = NonNullable<Extract<LayerSpecification, { type: "line" }>["paint"]>;

const geojsonSource = (data: FeatureCollection | undefined): SourceSpecification => ({
  type: "geojson",
  data: data ?? EMPTY,
});

/** Builds the complete style. See the module comment for why it contains no glyphs or sprite keys. */
export function buildAtlasStyle(input: BuildStyleInput): StyleSpecification {
  const { theme, basemap, curriculum, activeLayers } = input;
  const t = MAP_THEMES[theme];
  const includeSatellite = input.includeSatellite ?? theme === "satellite";

  const sources: Record<string, SourceSpecification> = {
    [SOURCE_IDS.basemapLand]: geojsonSource(basemap?.land),
    [SOURCE_IDS.basemapLakes]: geojsonSource(basemap?.lakes),
    [SOURCE_IDS.basemapCoastline]: geojsonSource(basemap?.coastline),
    [SOURCE_IDS.basemapRivers]: geojsonSource(basemap?.rivers),
    [SOURCE_IDS.basemapGraticule]: geojsonSource(basemap?.graticule),
    [SOURCE_IDS.climate]: geojsonSource(curriculum.climate),
    [SOURCE_IDS.soils]: geojsonSource(curriculum.soils),
    [SOURCE_IDS.tectonics]: geojsonSource(curriculum.tectonics),
    [SOURCE_IDS.currents]: geojsonSource(curriculum.currents),
    [SOURCE_IDS.rivers]: geojsonSource(curriculum.rivers),
    [SOURCE_IDS.mountainOutlines]: geojsonSource(curriculum.mountainOutlines),
    [SOURCE_IDS.mountainPoints]: geojsonSource(curriculum.mountainPoints),
    [SOURCE_IDS.mapItems]: geojsonSource(curriculum.mapItems),
    [SOURCE_IDS.headquarters]: geojsonSource(curriculum.headquarters),
    [SOURCE_IDS.annotations]: geojsonSource(curriculum.annotations),
    // A single point source drives both the "selected feature" ring and the dropped-pin marker, so the
    // component updates one source for either.
    [SOURCE_IDS.highlight]: geojsonSource(EMPTY),
  };

  if (includeSatellite) {
    sources[SOURCE_IDS.satellite] = {
      type: "raster",
      tiles: SATELLITE_TILES,
      tileSize: 256,
      attribution: SATELLITE_ATTRIBUTION,
      // Capped below the vector layers' useful range: past z18 Esri returns 404s that would otherwise
      // render as grey squares the learner cannot distinguish from missing data.
      maxzoom: 19,
    };
  }

  const layers: LayerSpecification[] = [];

  // --- 1. Ocean / background -------------------------------------------------
  layers.push({
    id: LAYER_IDS.background,
    type: "background",
    paint: { "background-color": t.background },
  });

  // --- 2. Land ---------------------------------------------------------------
  layers.push({
    id: LAYER_IDS.land,
    type: "fill",
    source: SOURCE_IDS.basemapLand,
    layout: { visibility: "visible" },
    paint: { "fill-color": t.land },
  });

  // --- 3. Satellite imagery (optional, above land so failure degrades safely) --
  if (includeSatellite) {
    layers.push({
      id: LAYER_IDS.satellite,
      type: "raster",
      source: SOURCE_IDS.satellite,
      layout: { visibility: theme === "satellite" ? "visible" : "none" },
      // Slightly transparent so coastline and graticule stay readable over imagery.
      paint: { "raster-opacity": 0.92, "raster-fade-duration": 200 },
    });
  }

  // --- 4. Lakes --------------------------------------------------------------
  layers.push({
    id: LAYER_IDS.lakes,
    type: "fill",
    source: SOURCE_IDS.basemapLakes,
    layout: { visibility: "visible" },
    paint: { "fill-color": t.lake, "fill-opacity": 0.9 },
  });

  // --- 5. Climate zones (largest areas first, under everything else) ----------
  layers.push({
    id: LAYER_IDS.climate,
    type: "fill",
    source: SOURCE_IDS.climate,
    layout: { visibility: isVisible(activeLayers, "climate") },
    paint: {
      "fill-color": ["get", "color"],
      // Köppen zones cover whole regions; a strong fill would hide the base map entirely.
      "fill-opacity": 0.22,
    },
  });
  layers.push({
    id: LAYER_IDS.climateStroke,
    type: "line",
    source: SOURCE_IDS.climate,
    layout: { visibility: isVisible(activeLayers, "climate") },
    paint: { "line-color": ["get", "color"], "line-width": 1, "line-opacity": 0.55, "line-dasharray": [3, 2] },
  });

  // --- 6. Soils --------------------------------------------------------------
  layers.push({
    id: LAYER_IDS.soils,
    type: "fill",
    source: SOURCE_IDS.soils,
    layout: { visibility: isVisible(activeLayers, "soils") },
    paint: {
      "fill-color": ["get", "color"],
      // Authored per soil type in geo-features.ts, so the data decides how opaque each region is.
      "fill-opacity": ["get", "fillOpacity"],
    },
  });
  layers.push({
    id: LAYER_IDS.soilsStroke,
    type: "line",
    source: SOURCE_IDS.soils,
    layout: { visibility: isVisible(activeLayers, "soils") },
    paint: { "line-color": ["get", "color"], "line-width": 1.4, "line-opacity": 0.8 },
  });

  // --- 7. Coastline ----------------------------------------------------------
  layers.push({
    id: LAYER_IDS.coastline,
    type: "line",
    source: SOURCE_IDS.basemapCoastline,
    layout: { visibility: "visible" },
    paint: { "line-color": t.landStroke, "line-width": ["interpolate", ["linear"], ["zoom"], 0, 0.6, 8, 1.6] },
  });

  // --- 8. Natural Earth rivers (measured) ------------------------------------
  // Filtered by scalerank so world zoom shows only the great rivers; see `scalerank` above.
  layers.push({
    id: LAYER_IDS.basemapRivers,
    type: "line",
    source: SOURCE_IDS.basemapRivers,
    layout: { visibility: "visible" },
    filter: ["<=", scalerank, importanceThreshold],
    paint: {
      "line-color": t.river,
      "line-width": ["interpolate", ["linear"], ["zoom"], 0, 0.4, 6, 1.2, 10, 2.4],
      "line-opacity": 0.75,
    },
  });

  // --- 9. Ocean currents -----------------------------------------------------
  // Warm and cold currents are separate layers rather than one layer with a `match` on `line-dasharray`.
  // A match returning two different dash arrays needs `["literal", ...]` wrappers, and expressing "solid"
  // as a dash array means inventing a zero-length gap, which the renderer treats inconsistently. Two
  // filtered layers are unambiguous, and the warm/cold distinction the syllabus asks for is carried by
  // the rendering itself rather than by a legend the learner must cross-reference.
  const currentPaintBase: LinePaint = {
    "line-color": ["get", "color"],
    "line-width": ["interpolate", ["linear"], ["zoom"], 1, 1.4, 6, 3],
    "line-opacity": 0.85,
  };
  layers.push({
    id: LAYER_IDS.currentsWarm,
    type: "line",
    source: SOURCE_IDS.currents,
    filter: ["!=", ["get", "kind"], "cold"] as FilterSpecification,
    layout: { visibility: isVisible(activeLayers, "currents"), "line-cap": "round" },
    paint: currentPaintBase,
  });
  layers.push({
    id: LAYER_IDS.currentsCold,
    type: "line",
    source: SOURCE_IDS.currents,
    layout: { visibility: isVisible(activeLayers, "currents") },
    filter: ["==", ["get", "kind"], "cold"] as FilterSpecification,
    paint: { ...currentPaintBase, "line-dasharray": [2.5, 2] },
  });

  // --- 10. Curriculum rivers (schematic teaching paths) ----------------------
  // A casing under the line keeps it legible where it crosses a soil polygon or imagery.
  layers.push({
    id: LAYER_IDS.riversCasing,
    type: "line",
    source: SOURCE_IDS.rivers,
    layout: { visibility: isVisible(activeLayers, "rivers"), "line-cap": "round", "line-join": "round" },
    paint: {
      "line-color": t.casing,
      "line-width": ["interpolate", ["linear"], ["zoom"], 2, 3.4, 8, 6.5],
      "line-opacity": 0.55,
    },
  });
  layers.push({
    id: LAYER_IDS.rivers,
    type: "line",
    source: SOURCE_IDS.rivers,
    layout: { visibility: isVisible(activeLayers, "rivers"), "line-cap": "round", "line-join": "round" },
    paint: {
      "line-color": ["get", "color"],
      "line-width": ["interpolate", ["linear"], ["zoom"], 2, 2, 8, 4],
      "line-opacity": 0.9,
    },
  });

  // --- 11. Tectonic boundaries ----------------------------------------------
  // One source holds both points and lines, so each layer selects its own geometry type. Convergent
  // boundaries are dashed and drawn as their own layer for the same reason as the currents above.
  const tectonicLineBase: LinePaint = {
    "line-color": ["get", "color"],
    "line-width": ["interpolate", ["linear"], ["zoom"], 1, 1.6, 6, 3.2],
    "line-opacity": 0.85,
  };
  layers.push({
    id: LAYER_IDS.tectonicsConvergent,
    type: "line",
    source: SOURCE_IDS.tectonics,
    layout: { visibility: isVisible(activeLayers, "tectonics") },
    filter: [
      "all",
      ["==", ["geometry-type"], "LineString"],
      ["==", ["get", "boundaryType"], "convergent"],
    ] as FilterSpecification,
    paint: { ...tectonicLineBase, "line-dasharray": [2.5, 1.5] },
  });
  layers.push({
    id: LAYER_IDS.tectonicsOther,
    type: "line",
    source: SOURCE_IDS.tectonics,
    layout: { visibility: isVisible(activeLayers, "tectonics") },
    filter: [
      "all",
      ["==", ["geometry-type"], "LineString"],
      ["!=", ["get", "boundaryType"], "convergent"],
    ] as FilterSpecification,
    paint: tectonicLineBase,
  });

  // --- 12. Graticule and the Tropic of Cancer --------------------------------
  layers.push({
    id: LAYER_IDS.graticule,
    type: "line",
    source: SOURCE_IDS.basemapGraticule,
    layout: { visibility: isVisible(activeLayers, "graticule") },
    filter: ["!=", ["get", "kind"], "tropic-of-cancer"],
    paint: { "line-color": t.graticule, "line-width": 0.6, "line-opacity": 0.8 },
  });
  // The Tropic of Cancer is the one graticule line the CBSE syllabus names explicitly (it runs through
  // eight Indian states), so it is drawn separately and more strongly.
  layers.push({
    id: LAYER_IDS.tropicOfCancer,
    type: "line",
    source: SOURCE_IDS.basemapGraticule,
    layout: { visibility: isVisible(activeLayers, "graticule") },
    filter: ["==", ["get", "kind"], "tropic-of-cancer"],
    paint: {
      "line-color": t.tropicOfCancer,
      "line-width": 1.4,
      "line-opacity": 0.9,
      "line-dasharray": [4, 2],
    },
  });

  // --- 13. Mountain range outlines -------------------------------------------
  layers.push({
    id: LAYER_IDS.mountainOutlines,
    type: "line",
    source: SOURCE_IDS.mountainOutlines,
    layout: { visibility: isVisible(activeLayers, "mountains") },
    paint: {
      "line-color": "#a78bfa",
      "line-width": ["interpolate", ["linear"], ["zoom"], 2, 2, 8, 4],
      "line-opacity": 0.7,
      "line-dasharray": [2, 1.5],
    },
  });

  // --- 14. Points: tectonics, mountains, map items, HQ, annotations ----------
  layers.push({
    id: LAYER_IDS.tectonicsPoint,
    type: "circle",
    source: SOURCE_IDS.tectonics,
    layout: { visibility: isVisible(activeLayers, "tectonics") },
    filter: ["==", ["geometry-type"], "Point"],
    paint: {
      "circle-radius": 5,
      "circle-color": ["get", "color"],
      "circle-stroke-color": t.background,
      "circle-stroke-width": 1.5,
    },
  });

  layers.push({
    id: LAYER_IDS.mountainPoints,
    type: "circle",
    source: SOURCE_IDS.mountainPoints,
    layout: { visibility: isVisible(activeLayers, "mountains") },
    paint: {
      // Radius scales with elevation so Kanchenjunga is visibly larger than a 1,000 m range. The floor
      // keeps small peaks clickable rather than sub-pixel.
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "elevationM"],
        0, 4,
        4000, 7,
        8849, 10,
      ],
      "circle-color": "#8b5cf6",
      "circle-stroke-color": "#ede9fe",
      "circle-stroke-width": 1.5,
      "circle-opacity": 0.9,
    },
  });

  layers.push({
    id: LAYER_IDS.mapItems,
    type: "circle",
    source: SOURCE_IDS.mapItems,
    layout: { visibility: isVisible(activeLayers, "mapItems") },
    paint: {
      // "Guaranteed" exam items are larger than "High": frequency is in the data, so it can be encoded
      // rather than hidden behind a uniform marker.
      "circle-radius": ["match", ["get", "cbseExamFrequency"], "Guaranteed", 8, "Very High", 7, 6],
      "circle-color": "#10b981",
      "circle-stroke-color": "#ecfdf5",
      "circle-stroke-width": 1.5,
    },
  });

  layers.push({
    id: LAYER_IDS.headquarters,
    type: "circle",
    source: SOURCE_IDS.headquarters,
    layout: { visibility: isVisible(activeLayers, "headquarters") },
    paint: {
      "circle-radius": 6,
      "circle-color": ["get", "color"],
      "circle-stroke-color": "#f8fafc",
      "circle-stroke-width": 1.6,
    },
  });

  // Drawn above the ordinary headquarters so a highlight is unmistakable.
  layers.push({
    id: LAYER_IDS.headquartersHighlight,
    type: "circle",
    source: SOURCE_IDS.headquarters,
    layout: { visibility: isVisible(activeLayers, "headquarters") },
    // No filter here: the component sets one when a headquarters or a category is highlighted, and
    // clears it otherwise. Keeping the filter mutable means highlighting does not rebuild the style.
    paint: {
      "circle-radius": 13,
      "circle-color": "#facc15",
      "circle-opacity": 0.25,
      "circle-stroke-color": "#facc15",
      "circle-stroke-width": 2.5,
    },
  });

  layers.push({
    id: LAYER_IDS.annotations,
    type: "circle",
    source: SOURCE_IDS.annotations,
    layout: { visibility: isVisible(activeLayers, "userAnnotations") },
    paint: {
      "circle-radius": 7,
      "circle-color": t.annotation,
      "circle-stroke-color": "#fffbeb",
      "circle-stroke-width": 2,
    },
  });

  // --- 15. Selection / dropped-pin ring (always topmost) ----------------------
  layers.push({
    id: LAYER_IDS.selected,
    type: "circle",
    source: SOURCE_IDS.highlight,
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 12, 10, 20],
      "circle-color": t.selected,
      "circle-opacity": 0.18,
      "circle-stroke-color": t.selected,
      "circle-stroke-width": 2.5,
    },
  });

  return {
    version: 8,
    // No `glyphs` and no `sprite`: both would be network fetches that fail silently offline. See the
    // module comment — labels are HTML overlays instead.
    name: `GeoVisuLab Atlas — ${theme}`,
    sources,
    layers,
  };
}

/**
 * The layer ids a given toggle must switch, resolved from `VISIBILITY_GROUPS`.
 *
 * Exported so the component and the tests read the same mapping instead of each keeping a list.
 */
export function layersForGroup(group: string): LayerId[] {
  return VISIBILITY_GROUPS[group] ?? [];
}

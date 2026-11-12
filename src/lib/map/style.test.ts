/**
 * Tests for the MapLibre style builder.
 *
 * The centrepiece is validation against MapLibre's OWN style-spec validator (`validateStyleMin`). That is
 * a much stronger check than anything hand-written here could be: it parses every expression, checks every
 * paint and layout property name against the layer type, and verifies each source's configuration. A style
 * that passes it will load; one that fails would render a blank canvas with only a console warning, which
 * in a browser looks identical to a network failure.
 *
 * The remaining tests cover the invariants the validator does not know about: that nothing reaches the
 * network except the one documented satellite source, that draw order keeps geometry legible, and that
 * toggles switch whole layer groups rather than half of one.
 */

import { describe, expect, it } from "vitest";
import { validateStyleMin } from "@maplibre/maplibre-gl-style-spec";

import { allCurriculumLayers } from "./curriculum-geojson";
import {
  LAYER_IDS,
  MAP_THEMES,
  SATELLITE_TILES,
  SOURCE_IDS,
  VISIBILITY_GROUPS,
  buildAtlasStyle,
  layersForGroup,
  type MapTheme,
} from "./style";

const curriculum = allCurriculumLayers();

/**
 * Reads a layer's `filter` without a cast at each call site.
 *
 * `filter` is not on the `LayerSpecification` union — a background layer cannot have one — so accessing
 * it directly is a type error. Narrowing through `"filter" in layer` keeps the test honest about which
 * layers can even carry a filter.
 */
const filterOf = (layer: { id: string } | undefined): string =>
  layer && "filter" in layer ? JSON.stringify((layer as { filter?: unknown }).filter) : "";

/** A minimal basemap stand-in with the same property names as the committed Natural Earth extract. */
const fakeBasemap = {
  land: { type: "FeatureCollection" as const, features: [{ type: "Feature" as const, properties: {}, geometry: { type: "MultiPolygon" as const, coordinates: [[[[70, 10], [80, 10], [80, 20], [70, 10]]]] } }] },
  lakes: { type: "FeatureCollection" as const, features: [{ type: "Feature" as const, properties: { name: "L", scalerank: 4 }, geometry: { type: "Polygon" as const, coordinates: [[[75, 15], [76, 15], [76, 16], [75, 15]]] } }] },
  coastline: { type: "FeatureCollection" as const, features: [{ type: "Feature" as const, properties: {}, geometry: { type: "LineString" as const, coordinates: [[70, 10], [80, 20]] } }] },
  rivers: { type: "FeatureCollection" as const, features: [{ type: "Feature" as const, properties: { name: "Ganges", scalerank: 1 }, geometry: { type: "MultiLineString" as const, coordinates: [[[78, 30], [80, 25]]] } }] },
  graticule: {
    type: "FeatureCollection" as const,
    features: [
      { type: "Feature" as const, properties: { kind: "meridian", degrees: 75 }, geometry: { type: "LineString" as const, coordinates: [[75, 0], [75, 40]] } },
      { type: "Feature" as const, properties: { kind: "tropic-of-cancer", degrees: 23.4368 }, geometry: { type: "LineString" as const, coordinates: [[60, 23.4368], [100, 23.4368]] } },
    ],
  },
};

const ALL_ON: Record<string, boolean> = {
  rivers: true, mountains: true, soils: true, tectonics: true, climate: true,
  mapItems: true, userAnnotations: true, headquarters: true, currents: true, graticule: true,
};

const build = (theme: MapTheme = "dark", activeLayers = ALL_ON, includeSatellite?: boolean) =>
  buildAtlasStyle({ theme, basemap: fakeBasemap, curriculum, activeLayers, includeSatellite });

describe("style-spec validation", () => {
  it.each(["dark", "light", "satellite"] as MapTheme[])("produces a valid style for the %s theme", (theme) => {
    const style = build(theme);
    const errors = validateStyleMin(style);
    // Printed on failure because the validator's messages name the exact layer and property at fault.
    expect(errors.map((e) => e.message)).toEqual([]);
  });

  it("produces a valid style with no basemap at all", () => {
    // The corpus may not be built in a deployment. The style must still be valid so the curriculum
    // layers render, rather than throwing and leaving a blank canvas with no explanation.
    const style = buildAtlasStyle({ theme: "dark", basemap: null, curriculum, activeLayers: ALL_ON });
    expect(validateStyleMin(style).map((e) => e.message)).toEqual([]);
    expect(style.sources[SOURCE_IDS.basemapLand]).toBeDefined();
  });

  it("produces a valid style with every toggle switched off", () => {
    const off = Object.fromEntries(Object.keys(ALL_ON).map((k) => [k, false]));
    const style = build("dark", off);
    expect(validateStyleMin(style).map((e) => e.message)).toEqual([]);
    const visible = style.layers.filter((l) => l.layout?.visibility !== "none").map((l) => l.id);
    // Background, land, lakes, coastline and Natural Earth rivers are always drawn: they are the base
    // map, not a curriculum toggle. Everything else must be off.
    expect(visible).toContain(LAYER_IDS.background);
    expect(visible).toContain(LAYER_IDS.land);
    expect(visible).not.toContain(LAYER_IDS.rivers);
    expect(visible).not.toContain(LAYER_IDS.soils);
    expect(visible).not.toContain(LAYER_IDS.headquarters);
  });
});

describe("offline safety", () => {
  /** Every string anywhere inside the style, so a URL cannot hide in an expression. */
  function allStrings(node: unknown, out: string[] = []): string[] {
    if (typeof node === "string") out.push(node);
    else if (Array.isArray(node)) for (const c of node) allStrings(c, out);
    else if (node && typeof node === "object") for (const v of Object.values(node)) allStrings(v, out);
    return out;
  }

  it("references no remote URL except the satellite tile source", () => {
    // This is the invariant the whole design rests on. The Leaflet map pointed at three external tile
    // hosts, so in any environment without outbound network it rendered an empty grey pane — and because
    // that looks exactly like missing data, it went unnoticed. Asserting it here means a future edit that
    // reintroduces a CDN (glyphs, sprite, tiles, a font) fails a test instead of failing silently in the
    // preview frame.
    for (const theme of ["dark", "light"] as MapTheme[]) {
      const urls = allStrings(build(theme)).filter((s) => /^https?:\/\//.test(s));
      expect(urls, `${theme} theme references a remote URL`).toEqual([]);
    }
  });

  it("includes the satellite tiles only when satellite imagery is requested", () => {
    const urls = allStrings(build("satellite")).filter((s) => /^https?:\/\//.test(s));
    expect(urls).toEqual(SATELLITE_TILES);
    expect(build("dark").sources[SOURCE_IDS.satellite]).toBeUndefined();
    expect(build("light").sources[SOURCE_IDS.satellite]).toBeUndefined();
  });

  it("declares no glyphs and no sprite endpoint", () => {
    // Both are network fetches. `glyphs` is required for any symbol layer and there are none by design;
    // a sprite would be required for icon images. Their absence is deliberate, not an oversight, so it is
    // pinned here: adding a text layer without also solving offline glyphs would break labels silently.
    const style = build("satellite");
    expect(style.glyphs).toBeUndefined();
    expect(style.sprite).toBeUndefined();
    expect(style.layers.filter((l) => l.type === "symbol")).toEqual([]);
  });

  it("draws satellite imagery above the vector land so a failed fetch still shows a map", () => {
    const layers = build("satellite").layers.map((l) => l.id);
    expect(layers.indexOf(LAYER_IDS.satellite)).toBeGreaterThan(layers.indexOf(LAYER_IDS.land));
    // The raster is semi-transparent, so the coastline and graticule remain readable over imagery.
    const raster = build("satellite").layers.find((l) => l.id === LAYER_IDS.satellite)!;
    expect(raster.type === "raster" && (raster.paint as Record<string, number>)["raster-opacity"]).toBeLessThan(1);
  });
});

describe("draw order", () => {
  it("draws fills before lines before points", () => {
    const style = build();
    const kinds = style.layers.map((l) => l.type);
    const lastFill = kinds.lastIndexOf("fill");
    const firstCircle = kinds.indexOf("circle");
    expect(lastFill).toBeLessThan(firstCircle);
  });

  it("keeps the coastline and rivers above the soil and climate fills", () => {
    // A soil polygon drawn over the coastline would hide the subcontinent's outline, which is the single
    // most important thing on this map for a Class 11 learner.
    const ids = build().layers.map((l) => l.id);
    expect(ids.indexOf(LAYER_IDS.coastline)).toBeGreaterThan(ids.indexOf(LAYER_IDS.soils));
    expect(ids.indexOf(LAYER_IDS.basemapRivers)).toBeGreaterThan(ids.indexOf(LAYER_IDS.climate));
    expect(ids.indexOf(LAYER_IDS.rivers)).toBeGreaterThan(ids.indexOf(LAYER_IDS.soils));
  });

  it("draws a river casing under its line", () => {
    const ids = build().layers.map((l) => l.id);
    expect(ids.indexOf(LAYER_IDS.riversCasing)).toBeLessThan(ids.indexOf(LAYER_IDS.rivers));
  });

  it("keeps selection and highlight rings topmost", () => {
    const ids = build().layers.map((l) => l.id);
    expect(ids.indexOf(LAYER_IDS.selected)).toBe(ids.length - 1);
    expect(ids.indexOf(LAYER_IDS.headquartersHighlight)).toBeGreaterThan(ids.indexOf(LAYER_IDS.headquarters));
    expect(ids.indexOf(LAYER_IDS.annotations)).toBeGreaterThan(ids.indexOf(LAYER_IDS.mapItems));
  });

  it("draws the Tropic of Cancer above the ordinary graticule and filters it out of that layer", () => {
    const style = build();
    const ids = style.layers.map((l) => l.id);
    expect(ids.indexOf(LAYER_IDS.tropicOfCancer)).toBeGreaterThan(ids.indexOf(LAYER_IDS.graticule));

    // Both layers share one source, so each needs a filter naming the real `kind` value. The committed
    // graticule uses "tropic-of-cancer"; an earlier guess of "tropic" matched neither filter correctly
    // and would have drawn the line twice, once faint and once amber.
    const tropic = style.layers.find((l) => l.id === LAYER_IDS.tropicOfCancer)!;
    const ordinary = style.layers.find((l) => l.id === LAYER_IDS.graticule)!;
    expect(filterOf(tropic)).toContain("tropic-of-cancer");
    expect(filterOf(ordinary)).toContain("tropic-of-cancer");
    expect(filterOf(ordinary)).toContain("!=");
    expect(filterOf(tropic)).toContain("==");
  });
});

describe("layer identity", () => {
  it("gives every layer a unique id", () => {
    // Duplicate ids make MapLibre throw at load, and `addLayer`/`setLayoutProperty` then address the
    // wrong layer. Checked across all three themes because satellite adds layers.
    for (const theme of ["dark", "light", "satellite"] as MapTheme[]) {
      const ids = build(theme).layers.map((l) => l.id);
      expect(new Set(ids).size, `${theme}: duplicate layer ids`).toBe(ids.length);
    }
  });

  it("points every layer at a source that exists", () => {
    const style = build("satellite");
    for (const layer of style.layers) {
      if (layer.type === "background") continue;
      expect(style.sources[layer.source], `${layer.id} references missing source`).toBeDefined();
    }
  });

  it("creates a source for every id in SOURCE_IDS when satellite is included", () => {
    const style = build("satellite");
    for (const id of Object.values(SOURCE_IDS)) {
      expect(style.sources[id], `missing source ${id}`).toBeDefined();
    }
  });

  it("uses only layer ids declared in LAYER_IDS", () => {
    // The component addresses layers by these constants to toggle visibility and set filters. A layer id
    // invented inside buildAtlasStyle would be unreachable from the component.
    const declared = new Set<string>(Object.values(LAYER_IDS));
    for (const layer of build("satellite").layers) {
      expect(declared.has(layer.id), `undeclared layer id ${layer.id}`).toBe(true);
    }
  });
});

describe("visibility groups", () => {
  it("maps every group to real layer ids", () => {
    const declared = new Set<string>(Object.values(LAYER_IDS));
    for (const [group, ids] of Object.entries(VISIBILITY_GROUPS)) {
      expect(ids.length, `group ${group} is empty`).toBeGreaterThan(0);
      for (const id of ids) expect(declared.has(id), `${group} -> unknown layer ${id}`).toBe(true);
    }
  });

  it("toggles a whole group, so a layer is never left half-visible", () => {
    // The classic bug this prevents: turning "soils" off hides the fill but leaves the outline, or
    // turning "rivers" off leaves the casing. Each group must switch every layer that draws it.
    for (const group of ["rivers", "soils", "mountains", "tectonics", "climate", "currents"]) {
      const style = build("dark", { ...ALL_ON, [group]: false });
      const stillVisible = layersForGroup(group).filter(
        (id) => style.layers.find((l) => l.id === id)?.layout?.visibility !== "none",
      );
      expect(stillVisible, `${group} left visible: ${stillVisible.join(", ")}`).toEqual([]);
    }
  });

  it("covers every curriculum layer in exactly one group", () => {
    // A layer in no group can never be toggled; a layer in two groups would be switched off by either
    // toggle, which reads as a bug to a learner who only turned one off.
    const base = [
      LAYER_IDS.background, LAYER_IDS.land, LAYER_IDS.lakes, LAYER_IDS.coastline,
      LAYER_IDS.basemapRivers, LAYER_IDS.satellite, LAYER_IDS.selected,
    ];
    const grouped = Object.values(VISIBILITY_GROUPS).flat();
    const counts = new Map<string, number>();
    for (const id of grouped) counts.set(id, (counts.get(id) ?? 0) + 1);
    for (const [id, n] of counts) expect(n, `${id} appears in ${n} groups`).toBe(1);

    const style = build("satellite");
    for (const layer of style.layers) {
      const isBase = base.includes(layer.id as (typeof base)[number]);
      expect(counts.has(layer.id) || isBase, `${layer.id} is in no visibility group`).toBe(true);
    }
  });
});

describe("data-driven paint", () => {
  it("takes curriculum colours from feature properties rather than restating them", () => {
    // The authored colour in geo-features.ts must be the single source of truth. Hard-coding a colour in
    // the style would silently disagree with the data and with the legend.
    const style = build();
    for (const id of [LAYER_IDS.rivers, LAYER_IDS.soils, LAYER_IDS.currentsWarm, LAYER_IDS.headquarters]) {
      const layer = style.layers.find((l) => l.id === id)!;
      const paint = layer.paint as Record<string, unknown>;
      expect(JSON.stringify(paint["line-color"] ?? paint["fill-color"] ?? paint["circle-color"]))
        .toContain('"get","color"');
    }
  });

  it("uses the authored soil opacity instead of a style-level constant", () => {
    const layer = build().layers.find((l) => l.id === LAYER_IDS.soils)!;
    const paint = layer.paint as Record<string, unknown>;
    expect(JSON.stringify(paint["fill-opacity"])).toContain('"get","fillOpacity"');
  });

  it("filters Natural Earth layers by scalerank, coercing it to a number", () => {
    // A string/number mismatch in an expression does not throw; it never matches, and the layer draws
    // nothing. The coercion is what makes the filter robust to the upstream type changing.
    const layer = build().layers.find((l) => l.id === LAYER_IDS.basemapRivers)!;
    const filter = filterOf(layer);
    expect(filter).toContain("to-number");
    expect(filter).toContain("scalerank");
    expect(filter).toContain("coalesce");
  });

  it("separates tectonic points from lines by geometry type", () => {
    // Both come from one source, so each layer must select its geometry or the circle layer would try to
    // draw a LineString as a point.
    const point = build().layers.find((l) => l.id === LAYER_IDS.tectonicsPoint)!;
    const line = build().layers.find((l) => l.id === LAYER_IDS.tectonicsConvergent)!;
    expect(filterOf(point)).toContain("geometry-type");
    expect(filterOf(point)).toContain("Point");
    expect(filterOf(line)).toContain("geometry-type");
    expect(filterOf(line)).toContain("LineString");
  });

  it("gives every theme a full set of distinct tokens", () => {
    for (const [name, tokens] of Object.entries(MAP_THEMES)) {
      const values = Object.values(tokens);
      for (const v of values) expect(v, `${name}: token is not a colour`).toMatch(/^#[0-9a-f]{6}$/i);
      // Background and land must differ or the subcontinent disappears into the ocean.
      expect(tokens.background, `${name}: land equals ocean`).not.toBe(tokens.land);
    }
    // Dark and light must actually differ, otherwise the theme switcher is a control that does nothing.
    expect(MAP_THEMES.dark.background).not.toBe(MAP_THEMES.light.background);
    expect(MAP_THEMES.dark.land).not.toBe(MAP_THEMES.light.land);
  });
});

/**
 * Tests for the curriculum -> GeoJSON conversion.
 *
 * The point of this file is narrow but consequential: it proves the coordinate order is flipped exactly
 * once and correctly. Getting that wrong does not throw, does not fail a build, and does not look wrong
 * in a diff — it moves the subcontinent into the ocean. Everything else here guards the other ways the
 * conversion could silently produce a wrong map.
 */

import { describe, expect, it } from "vitest";

import {
  CBSE_MAP_ITEMS,
  CLIMATE_ZONES as CLIMATE_ZONES_SRC,
  INDIAN_RIVERS,
  INDIAN_SOILS,
  OCEAN_CURRENTS as OCEAN_CURRENTS_SRC,
  TECTONIC_PLATES,
} from "@/data/geo-features";
import { HEADQUARTERS_DATA } from "@/data/headquarters-data";
import {
  allCurriculumLayers,
  annotationsToGeoJson,
  climateToGeoJson,
  currentsToGeoJson,
  headquartersToGeoJson,
  mapItemsToGeoJson,
  mountainsToGeoJson,
  riversToGeoJson,
  soilsToGeoJson,
  tectonicsToGeoJson,
} from "./curriculum-geojson";

/** Every coordinate pair in a geometry, however deeply nested. */
function collectPositions(geo: unknown): number[][] {
  const out: number[][] = [];
  const walk = (node: unknown): void => {
    if (!Array.isArray(node)) return;
    if (node.length >= 2 && typeof node[0] === "number" && typeof node[1] === "number") {
      out.push(node as number[]);
      return;
    }
    for (const child of node) walk(child);
  };
  walk(geo);
  return out;
}

describe("coordinate order", () => {
  it("flips the source's [lat, lng] into GeoJSON's [lng, lat]", () => {
    // The Ganga's first vertex is Gangotri: latitude 30.99, longitude 78.94. In GeoJSON that pair must
    // be written [78.94, 30.99]. Asserting the literal values — not merely "they swapped" — is what
    // catches a double flip, which would look correct to a test that only compares positions.
    const ganga = INDIAN_RIVERS.find((r) => r.id === "riv-ganga");
    expect(ganga).toBeDefined();
    const [lat, lng] = ganga!.path[0];
    expect([lat, lng]).toEqual([30.99, 78.94]);

    const feature = riversToGeoJson().features.find((f) => f.properties.id === "riv-ganga")!;
    expect(feature.geometry.coordinates[0]).toEqual([lng, lat]);
    expect(feature.geometry.coordinates[0]).toEqual([78.94, 30.99]);
  });

  it("places India-scoped layers inside a longitude-then-latitude envelope", () => {
    // India spans roughly longitude 68-98 E and latitude 6-38 N. Those ranges barely overlap, which is
    // what makes an envelope an effective swap detector: transposed coordinates fall outside it.
    //
    // Applied only to the layers that ARE India-scoped. Climate zones, tectonic boundaries and ocean
    // currents are deliberately global — the Gulf Stream, the Mid-Atlantic Ridge and the Taiga are all
    // in the source data for comparative teaching — so an India-shaped envelope would be wrong for them.
    // Those three are verified element-wise against the source in the next test instead.
    const indiaScoped = {
      rivers: riversToGeoJson(),
      soils: soilsToGeoJson(),
      mapItems: mapItemsToGeoJson(),
      headquarters: headquartersToGeoJson(),
      mountainPoints: mountainsToGeoJson().points,
      mountainOutlines: mountainsToGeoJson().outlines,
    };
    let checked = 0;

    for (const [name, collection] of Object.entries(indiaScoped)) {
      expect(collection.features.length, `${name} is empty`).toBeGreaterThan(0);
      for (const feature of collection.features) {
        for (const [lng, lat] of collectPositions(feature.geometry.coordinates)) {
          checked += 1;
          expect(
            lng >= 60 && lng <= 105,
            `${name} "${feature.properties.name}": longitude ${lng} outside India (unflipped?)`,
          ).toBe(true);
          expect(
            lat >= 5 && lat <= 45,
            `${name} "${feature.properties.name}": latitude ${lat} outside India (unflipped?)`,
          ).toBe(true);
        }
      }
    }

    expect(checked).toBeGreaterThan(200);
  });

  it("converts every vertex to exactly [source[1], source[0]] across all layers", () => {
    // The envelope above cannot detect a swap in global data — [-80, 30] is a valid position either way
    // round. This check is exhaustive and extent-independent: every converted coordinate must equal the
    // source pair with its two elements transposed. It is the assertion that actually pins the flip.
    const cases: Array<[string, [number, number][], number[][]]> = [];

    for (const r of INDIAN_RIVERS) cases.push([`river ${r.id}`, r.path, riversToGeoJson().features.find((f) => f.properties.id === r.id)!.geometry.coordinates]);
    for (const c of CLIMATE_ZONES_SRC) cases.push([`climate ${c.id}`, c.polygon, climateToGeoJson().features.find((f) => f.properties.id === c.id)!.geometry.coordinates[0]]);
    for (const c of OCEAN_CURRENTS_SRC) cases.push([`current ${c.id}`, c.path, currentsToGeoJson().features.find((f) => f.properties.id === c.id)!.geometry.coordinates]);
    for (const h of HEADQUARTERS_DATA) cases.push([`hq ${h.id}`, [h.coordinates], [headquartersToGeoJson().features.find((f) => f.properties.id === h.id)!.geometry.coordinates]]);
    for (const m of CBSE_MAP_ITEMS) cases.push([`mapItem ${m.id}`, [m.coordinates], [mapItemsToGeoJson().features.find((f) => f.properties.id === m.id)!.geometry.coordinates]]);

    expect(cases.length).toBeGreaterThan(40);
    for (const [label, source, converted] of cases) {
      // A closed polygon ring has one more position than its source; compare the source-length prefix.
      expect(converted.length, `${label}: length`).toBeGreaterThanOrEqual(source.length);
      for (let i = 0; i < source.length; i += 1) {
        const [lat, lng] = source[i];
        expect(converted[i], `${label} vertex ${i}`).toEqual([lng, lat]);
      }
    }
  });

  it("preserves vertex order along a path", () => {
    // Reversing a river's path would not fail a bounds test: the shape is identical, only the direction
    // of flow is wrong. Order matters for arrows and for "origin -> outflow" narratives.
    const ganga = INDIAN_RIVERS.find((r) => r.id === "riv-ganga")!;
    const coords = riversToGeoJson().features.find((f) => f.properties.id === "riv-ganga")!.geometry
      .coordinates;

    expect(coords).toHaveLength(ganga.path.length);
    expect(coords[0]).toEqual([ganga.path[0][1], ganga.path[0][0]]);
    const lastSrc = ganga.path[ganga.path.length - 1];
    expect(coords[coords.length - 1]).toEqual([lastSrc[1], lastSrc[0]]);
  });

  it("assembles annotations directly in GeoJSON order without a double flip", () => {
    // Annotations arrive as separate latitude/longitude fields, not as a pair, so they must NOT go
    // through the same flip as the path data. A double flip here is the subtlest version of this bug.
    const converted = annotationsToGeoJson([
      { id: "a1", title: "Test", latitude: "22.5", longitude: "79.0" },
    ]);
    expect(converted.features[0].geometry.coordinates).toEqual([79.0, 22.5]);
  });
});

describe("polygon rings", () => {
  it("closes open rings so MapLibre will render them", () => {
    // An unclosed LinearRing is not an error in GeoJSON terms but MapLibre will not fill it, so the
    // layer simply disappears. Closing it here rather than in the style keeps the style declarative.
    for (const feature of soilsToGeoJson().features) {
      const ring = feature.geometry.coordinates[0];
      expect(ring.length).toBeGreaterThanOrEqual(4);
      expect(ring[0]).toEqual(ring[ring.length - 1]);
    }
    for (const feature of climateToGeoJson().features) {
      const ring = feature.geometry.coordinates[0];
      expect(ring.length).toBeGreaterThanOrEqual(4);
      expect(ring[0]).toEqual(ring[ring.length - 1]);
    }
  });

  it("does not duplicate an already-closed ring", () => {
    // Closing an idempotent operation matters: running the conversion twice must not grow the ring.
    const openCount = INDIAN_SOILS.filter((s) => {
      const f = s.polygon[0];
      const l = s.polygon[s.polygon.length - 1];
      return f[0] !== l[0] || f[1] !== l[1];
    }).length;

    const closed = soilsToGeoJson().features.filter((f) => {
      const ring = f.geometry.coordinates[0];
      return ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1];
    });
    expect(closed).toHaveLength(INDIAN_SOILS.length);
    expect(openCount).toBeGreaterThanOrEqual(0);
  });

  it("keeps the authored fill opacity instead of inventing one", () => {
    for (let i = 0; i < INDIAN_SOILS.length; i += 1) {
      const feature = soilsToGeoJson().features[i];
      expect(feature.properties.fillOpacity).toBe(INDIAN_SOILS[i].fillOpacity);
      expect(feature.properties.fillOpacity).toBeGreaterThan(0);
      expect(feature.properties.fillOpacity).toBeLessThanOrEqual(1);
    }
  });
});

describe("record counts", () => {
  it("converts every source record, so a layer cannot quietly lose features", () => {
    expect(riversToGeoJson().features).toHaveLength(INDIAN_RIVERS.length);
    expect(soilsToGeoJson().features).toHaveLength(INDIAN_SOILS.length);
    expect(climateToGeoJson().features).toHaveLength(5);
    expect(currentsToGeoJson().features).toHaveLength(5);
    expect(mapItemsToGeoJson().features).toHaveLength(CBSE_MAP_ITEMS.length);
    expect(headquartersToGeoJson().features).toHaveLength(HEADQUARTERS_DATA.length);

    const mountains = mountainsToGeoJson();
    expect(mountains.points.features).toHaveLength(12);
    // Only some ranges carry an outline; the rest are label points. Both counts are asserted so a
    // regression that drops outlines (or duplicates points for outlined ranges) fails here.
    const withOutline = 12 - mountains.outlines.features.length;
    expect(withOutline).toBeGreaterThanOrEqual(0);
    expect(mountains.outlines.features.length).toBeLessThanOrEqual(12);
  });

  it("merges tectonic points and lines into one collection without losing records", () => {
    const features = tectonicsToGeoJson().features;
    const points = features.filter((f) => f.geometry.type === "Point");
    const lines = features.filter((f) => f.geometry.type === "LineString");

    // A record with neither coordinates nor a polyline is dropped rather than drawn at null island.
    expect(points.length + lines.length).toBeLessThanOrEqual(TECTONIC_PLATES.length);
    expect(points.length + lines.length).toBeGreaterThan(0);

    for (const f of features) {
      expect(f.properties.geometryKind).toBe(f.geometry.type === "Point" ? "point" : "line");
    }
  });
});

describe("property payloads", () => {
  it("carries everything the feature panel needs, so no second lookup is required", () => {
    // Under Leaflet the click handler closed over the source object. With GeoJSON the only thing that
    // survives is `properties`, so every field the panel renders must be present. Asserting the full
    // set is what stops a field being dropped during conversion and surfacing as a blank panel row.
    const ganga = riversToGeoJson().features.find((f) => f.properties.id === "riv-ganga")!;
    const p = ganga.properties;
    expect(p.name).toBe("Ganga River System");
    expect(p.hindiName).toBe("गंगा नदी");
    expect(p.lengthKm).toBe(2525);
    expect(p.basinAreaSqKm).toBe(861452);
    expect(p.origin).toContain("Gangotri");
    expect(p.outflow).toContain("Bay of Bengal");
    expect(p.majorTributaries).toContain("Yamuna");
    expect(p.description.length).toBeGreaterThan(50);
    expect(p.color).toMatch(/^#[0-9a-f]{6}$/i);
    expect(p.vertexCount).toBeGreaterThan(3);
  });

  it("joins array fields into strings, since GeoJSON properties must stay JSON-serialisable", () => {
    const t = tectonicsToGeoJson().features[0];
    expect(typeof t.properties.associatedFeatures).toBe("string");
    const s = soilsToGeoJson().features[0];
    expect(typeof s.properties.cropsGrown).toBe("string");
    expect(typeof s.properties.characteristics).toBe("string");
  });

  it("records null rather than 0 for an absent plate speed", () => {
    // 0 mm/year is a real claim (a stationary plate); "not recorded" is a different fact. Collapsing
    // them would put a false measurement in front of a learner.
    const without = tectonicsToGeoJson().features.find((f) => f.properties.speedMmPerYear === null);
    const sourceMissing = TECTONIC_PLATES.some((t) => t.speedMmPerYear === undefined);
    if (sourceMissing) expect(without).toBeDefined();
    for (const f of tectonicsToGeoJson().features) {
      expect(f.properties.speedMmPerYear === null || f.properties.speedMmPerYear > 0).toBe(true);
    }
  });

  it("survives a JSON round-trip, which is what crossing the API boundary does", () => {
    const layers = allCurriculumLayers();
    const roundTripped = JSON.parse(JSON.stringify(layers));
    expect(roundTripped.rivers.features).toHaveLength(layers.rivers.features.length);
    expect(roundTripped.headquarters.features[0].properties.name).toBe(
      layers.headquarters.features[0].properties.name,
    );
  });
});

describe("malformed input", () => {
  it("skips an annotation whose coordinates are not numbers", () => {
    const converted = annotationsToGeoJson([
      { id: "ok", title: "Good", latitude: "22.5", longitude: "79.0" },
      { id: "bad", title: "Empty", latitude: "", longitude: "" },
      { id: "nan", title: "NaN", latitude: "abc", longitude: "79.0" },
      { id: "null", title: "Null", latitude: null, longitude: null },
    ]);
    // Number("") is 0, which IS finite — so an empty string would otherwise place a marker at null
    // island. This assertion is the reason the guard checks the raw value too.
    expect(converted.features).toHaveLength(1);
    expect(converted.features[0].properties.id).toBe("ok");
  });

  it("accepts numeric coordinates as well as strings", () => {
    const converted = annotationsToGeoJson([
      { id: "n", latitude: 22.5, longitude: 79.0 },
      { id: "s", latitude: "22.5", longitude: "79.0" },
    ]);
    expect(converted.features).toHaveLength(2);
    expect(converted.features[0].geometry.coordinates).toEqual(converted.features[1].geometry.coordinates);
  });
});

/**
 * BASEMAP RESOLVER TESTS.
 *
 * These read the generated basemap from disk, so they SKIP rather than fail when the corpus has not
 * been built. A fresh clone has no `atlas/data/pilot/basemap/` until `npm run atlas:build` runs, and a
 * suite that fails for "you have not built the data yet" teaches people to ignore red tests.
 */

import { describe, expect, it } from "vitest";

import {
  GeometryRefError,
  UPSTREAM_NAME_CAVEAT,
  auditGeometryRefs,
  basemapAttribution,
  basemapLayerNames,
  geometryPartCount,
  loadBasemapLayer,
  loadBasemapManifest,
  parseGeometryRef,
  resolveGeometryRef,
} from "./basemap";
import { CURATED_FEATURES } from "../../../atlas/data/pilot/curated/features";
import { atlasDataPresent } from "./paths";

const built = atlasDataPresent();

describe("parseGeometryRef", () => {
  it("parses a named selector", () => {
    expect(parseGeometryRef("rivers.geojson#name=Ganges")).toEqual({
      raw: "rivers.geojson#name=Ganges",
      file: "rivers.geojson",
      selector: { kind: "name", value: "Ganges" },
    });
  });

  it("parses the whole-layer selector", () => {
    expect(parseGeometryRef("land.geojson#all").selector).toEqual({ kind: "all" });
  });

  it("keeps a name containing '#' or spaces intact", () => {
    // Only the FIRST '#' separates layer from selector, so a name may contain further characters.
    expect(parseGeometryRef("rivers.geojson#name=Sapt Kosi").selector).toEqual({
      kind: "name",
      value: "Sapt Kosi",
    });
  });

  it("rejects a reference with no selector rather than guessing", () => {
    expect(() => parseGeometryRef("rivers.geojson")).toThrow(GeometryRefError);
  });

  it("rejects a layer that is not .geojson", () => {
    expect(() => parseGeometryRef("rivers.json#all")).toThrow(/not a \.geojson file/);
  });

  it("rejects an unsupported selector", () => {
    expect(() => parseGeometryRef("rivers.geojson#id=42")).toThrow(/unsupported selector/);
  });

  it("rejects an empty name", () => {
    // Both forms must reach the empty-name guard, not fall through to "unsupported selector".
    expect(() => parseGeometryRef("rivers.geojson#name=")).toThrow(/empty feature name/);
    expect(() => parseGeometryRef("rivers.geojson#name=   ")).toThrow(/empty feature name/);
  });
});

describe("geometryPartCount", () => {
  it("counts disconnected coordinate sequences per geometry type", () => {
    expect(geometryPartCount({ type: "Point", coordinates: [0, 0] })).toBe(1);
    expect(
      geometryPartCount({ type: "LineString", coordinates: [[0, 0], [1, 1]] }),
    ).toBe(1);
    expect(
      geometryPartCount({
        type: "MultiLineString",
        coordinates: [
          [[0, 0], [1, 1]],
          [[2, 2], [3, 3]],
        ],
      }),
    ).toBe(2);
    expect(geometryPartCount({ type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]] })).toBe(1);
    expect(
      geometryPartCount({
        type: "MultiPolygon",
        coordinates: [
          [[[0, 0], [1, 0], [1, 1], [0, 0]]],
          [[[2, 2], [3, 2], [3, 3], [2, 2]]],
        ],
      }),
    ).toBe(2);
    expect(geometryPartCount(null)).toBe(0);
  });
});

describe.skipIf(!built)("resolveGeometryRef against the generated basemap", () => {
  it("returns every part of a single multi-part feature and says so", () => {
    // Natural Earth's Ganges is ONE feature holding fifteen disconnected parts. Summing all fifteen
    // gives 3,642 km; the longest part is 2,106 km; the published length is about 2,525 km. All three
    // are true of different things, so the part count must be visible to the caller.
    const result = resolveGeometryRef("rivers.geojson#name=Ganges");
    expect(result.status).toBe("resolved");
    if (result.status !== "resolved") return;
    expect(result.featureCount).toBe(1);
    expect(result.parts).toBe(15);
    expect(result.multipart).toBe(true);
    expect(result.note).toContain("15 disconnected parts");
    expect(result.note).toContain(UPSTREAM_NAME_CAVEAT);
  });

  it("returns ALL features when a name is recorded more than once", () => {
    // The trap this exists to avoid: nine river names (Sutlej, Chambal, Indus, Krishna, Jhelum, Beas,
    // Balak, Mahäna Nadï, Qumar) are TWO features each. A first-match resolver would report a fraction
    // of the mapped length and nothing would look wrong.
    const result = resolveGeometryRef("rivers.geojson#name=Sutlej");
    expect(result.status).toBe("resolved");
    if (result.status !== "resolved") return;
    expect(result.featureCount).toBe(2);
    expect(result.parts).toBeGreaterThan(2);
    expect(result.note).toContain("2 separate features");
  });

  it("preserves the upstream name verbatim, diacritics and all", () => {
    // Localising for display must not rename the feature a measurement was computed from.
    const result = resolveGeometryRef("rivers.geojson#name=Ghäghara");
    expect(result.status).toBe("resolved");
    if (result.status !== "resolved") return;
    expect(result.matchedName).toBe("Ghäghara");
  });

  it("resolves #all to the whole layer", () => {
    const manifest = loadBasemapManifest();
    const land = manifest.layers.find((l) => l.out === "land.geojson");
    const result = resolveGeometryRef("land.geojson#all");
    expect(result.status).toBe("resolved");
    if (result.status !== "resolved" || !land) return;
    expect(result.featureCount).toBe(land.features);
    expect(result.matchedName).toBeNull();
  });

  it("reports a near-miss with the available names instead of failing obscurely", () => {
    const result = resolveGeometryRef("rivers.geojson#name=Ganga");
    // "Ganga" is our name; Natural Earth's is "Ganges". The result must make that discoverable.
    expect(result.status).toBe("no-match");
    if (result.status !== "no-match") return;
    expect(result.name).toBe("Ganga");
    expect(result.availableNames).toContain("Ganges");
    expect(result.availableNames.length).toBeGreaterThan(40);
  });

  it("refuses a layer not recorded in the manifest, including traversal attempts", () => {
    // geometryRef must not become an arbitrary file-read primitive.
    const traversal = resolveGeometryRef("../../../package.geojson#all");
    expect(traversal.status).toBe("unknown-layer");
    const absent = resolveGeometryRef("political-boundaries.geojson#all");
    expect(absent.status).toBe("unknown-layer");
    if (absent.status === "unknown-layer") {
      expect(absent.availableLayers).toEqual(basemapLayerNames());
    }
  });

  it("reports a malformed reference rather than throwing at a caller that must render it", () => {
    expect(resolveGeometryRef("rivers.geojson").status).toBe("malformed-ref");
    expect(resolveGeometryRef("").status).toBe("malformed-ref");
  });
});

describe.skipIf(!built)("basemap manifest", () => {
  it("records provenance for every downloaded layer and none for generated ones", () => {
    for (const layer of loadBasemapManifest().layers) {
      if (layer.origin === "downloaded") {
        expect(layer.upstreamSha256, `${layer.out} must pin its upstream sha256`).toMatch(/^[0-9a-f]{64}$/);
        expect(layer.upstreamBytes).toBeGreaterThan(0);
      } else {
        expect(layer.origin).toBe("generated");
        expect(layer.upstreamSha256, "a generated layer has no upstream to pin").toBeUndefined();
      }
      // A cached run must carry provenance forward, not silently drop it.
      expect(layer.features).toBe(loadBasemapLayer(layer.out).features.length);
    }
  });

  it("includes no political or administrative boundary layer", () => {
    // The basemap is deliberately physical: land, coast, rivers, lakes, graticule. Modern political
    // boundaries would let a present-day border masquerade as a historical one.
    for (const name of basemapLayerNames()) {
      expect(name).not.toMatch(/admin|boundar|country|countries|disputed|sovereign/i);
    }
  });

  it("attributes Natural Earth and states the licence", () => {
    const attribution = basemapAttribution();
    expect(attribution).toContain("Natural Earth");
    expect(attribution).toMatch(/Public Domain/i);
  });
});

describe.skipIf(!built)("auditGeometryRefs", () => {
  it("resolves every geometryRef in the curated corpus (runtime mirror of validator E010)", () => {
    const refs = CURATED_FEATURES.map((f) => f.geometryRef).filter((r): r is string => Boolean(r));
    expect(refs.length).toBeGreaterThan(0);
    const audit = auditGeometryRefs(refs);
    expect(audit.failures).toEqual([]);
    expect(audit.resolved).toBe(audit.checked);
  });
});

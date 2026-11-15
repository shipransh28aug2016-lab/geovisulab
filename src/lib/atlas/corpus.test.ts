/**
 * CORPUS LOADER TESTS.
 *
 * These read the generated corpus from disk, so they SKIP rather than fail when it has not been built
 * (`npm run atlas:build`). Failing a fresh clone for "you have not generated the data yet" would teach
 * people to ignore red tests, which is worse than not having the tests.
 *
 * The most important test in this file is the first one. Historical and astronomical year numbering
 * differ by exactly one for every year at or before 1 BCE, so an off-by-one at this boundary is
 * silent, plausible-looking, and wrong for the whole of ancient Indian history — the period this pilot
 * is about. It is checked from both directions and against a real dated event.
 */

import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";

// shapes-corridor.geojson (24.6 MB) is a gitignored build artifact (`npm run atlas:build`). Tests that
// need complete geometry run only where it exists; the committed focus tier is always checked.
const HAS_CORRIDOR = existsSync(
  path.join(process.cwd(), "atlas", "data", "pilot", "cliopatria", "shapes-corridor.geojson"),
);

import {
  CorpusError,
  CorpusNotBuiltError,
  eventTimeline,
  loadCorpus,
  loadImportedCollections,
  parseSnapshotQuery,
  placeDetail,
  shapesForSnapshot,
  snapshotAtAstronomicalYear,
  snapshotAtHistoricalYear,
  snapshotOnEdtf,
} from "./corpus";
import { atlasDataPresent } from "./paths";

const built = atlasDataPresent();

/** The validator's E016 pattern: a zero year rendered with an era marker, in either language. */
const YEAR_ZERO = /(?:^|[^0-9])0\s*(?:BCE|BC|ईसा पूर्व)\b/i;

describe.skipIf(!built)("BCE numbering at the API boundary", () => {
  it("converts 261 BCE to astronomical -260, not -261", () => {
    const snapshot = snapshotAtHistoricalYear(261, "BCE");
    expect(snapshot.astronomicalYear).toBe(-260);
    expect(snapshot.historicalNotation).toEqual({ year: 261, era: "BCE" });
    expect(snapshot.displayYear.en).toBe("261 BCE");
    expect(snapshot.displayYear.hi).toBe("261 ईसा पूर्व");
  });

  it("agrees with the astronomical entry point for the same year", () => {
    const viaHistorical = snapshotAtHistoricalYear(261, "BCE");
    const viaAstronomical = snapshotAtAstronomicalYear(-260);
    expect(viaAstronomical.counts).toEqual(viaHistorical.counts);
    expect(viaAstronomical.shapeIds).toEqual(viaHistorical.shapeIds);
    // The two entry points must differ in what they echo, or the distinction is meaningless.
    expect(viaHistorical.query).toEqual({ kind: "historical-year", year: 261, era: "BCE" });
    expect(viaAstronomical.query).toEqual({ kind: "astronomical-year", year: -260 });
  });

  it("treats 1 BCE as astronomical 0 and never emits a year zero", () => {
    const snapshot = snapshotAtHistoricalYear(1, "BCE");
    expect(snapshot.astronomicalYear).toBe(0);
    expect(snapshot.displayYear.en).toBe("1 BCE");
    expect(snapshot.displayYear.en).not.toMatch(YEAR_ZERO);
    expect(snapshot.displayYear.hi).not.toMatch(YEAR_ZERO);
  });

  it("refuses a historical year zero, because historical notation has none", () => {
    expect(() => snapshotAtHistoricalYear(0, "BCE")).toThrow(RangeError);
    expect(() => snapshotAtHistoricalYear(-260, "BCE")).toThrow(RangeError);
    expect(() => snapshotAtAstronomicalYear(1.5)).toThrow(CorpusError);
  });

  it("places the Kalinga war in 262 and 261 BCE and not in 260 BCE", () => {
    // Dated "-0261~/-0260~", i.e. astronomical -261 to -260, inclusive at both ends.
    const ids = (year: number, era: "BCE" | "CE") =>
      snapshotAtHistoricalYear(year, era).events.map((e) => e.id);
    expect(ids(262, "BCE")).toContain("event-kalinga-war");
    expect(ids(261, "BCE")).toContain("event-kalinga-war");
    expect(ids(260, "BCE")).not.toContain("event-kalinga-war");
    expect(ids(263, "BCE")).not.toContain("event-kalinga-war");
  });
});

describe.skipIf(!built)("snapshot contents", () => {
  it("carries date uncertainty instead of flattening it", () => {
    const snapshot = snapshotAtAstronomicalYear(-260);
    const { certainty, counts } = snapshot;
    // Every bucket sums to the collection size, so no record silently vanishes from the breakdown.
    const sum = (b: Record<string, number>) => Object.values(b).reduce((n, v) => n + v, 0);
    expect(sum(certainty.entities)).toBe(counts.entities);
    expect(sum(certainty.assertions)).toBe(counts.assertions);
    expect(sum(certainty.events)).toBe(counts.events);
    expect(sum(certainty.total)).toBe(counts.entities + counts.assertions + counts.events);
    // Cliopatria's imported dates are approximate; a snapshot that reported them all as exact would be
    // claiming precision the source does not have.
    expect(certainty.assertions.approximate).toBeGreaterThan(0);
    expect(certainty.assertions.exact).toBe(0);
  });

  it("varies by year, so the filter is really filtering", () => {
    const ancient = snapshotAtHistoricalYear(261, "BCE");
    const colonial = snapshotAtAstronomicalYear(1918);
    expect(colonial.counts.shapes).toBeGreaterThan(ancient.counts.shapes);
    expect(colonial.shapeIds).not.toEqual(ancient.shapeIds);
    // The measured worst case for the pilot corridor: 12 shapes in 1918.
    expect(colonial.counts.shapes).toBe(12);
  });

  it("reports nothing undatable and no dangling subject", () => {
    for (const year of [-599, -260, 320, 1000, 1765, 1918, 2000]) {
      const snapshot = snapshotAtAstronomicalYear(year);
      expect(snapshot.exclusions.unparseableDates, `year ${year}`).toEqual([]);
      expect(snapshot.exclusions.unresolvedPlaceIds, `year ${year}`).toEqual([]);
    }
  });

  it("selects an event on its exact day", () => {
    const snapshot = snapshotOnEdtf("1765-08-12");
    expect(snapshot.astronomicalYear).toBe(1765);
    expect(snapshot.events.map((e) => e.id)).toContain("event-diwani-grant");
    expect(snapshot.query).toEqual({ kind: "edtf-date", value: "1765-08-12" });
  });

  it("rejects an EDTF value it cannot resolve to a moment", () => {
    expect(() => snapshotOnEdtf("not a date")).toThrow(CorpusError);
  });

  it("never renders a year zero anywhere in a snapshot", () => {
    for (const year of [-3400, -600, -260, -1, 0, 1, 320, 1918, 2024]) {
      const snapshot = snapshotAtAstronomicalYear(year);
      expect(snapshot.displayYear.en, `astro ${year}`).not.toMatch(YEAR_ZERO);
      expect(snapshot.displayYear.hi, `astro ${year}`).not.toMatch(YEAR_ZERO);
      expect(snapshot.century.en, `astro ${year}`).not.toMatch(YEAR_ZERO);
    }
  });
});

describe.skipIf(!built)("shapes for a snapshot", () => {
  it.skipIf(!HAS_CORRIDOR)("supplies geometry for every asserted shape in the corridor tier", () => {
    const snapshot = snapshotAtHistoricalYear(261, "BCE");
    const bundle = shapesForSnapshot(snapshot);
    expect(bundle.tier).toBe("corridor");
    expect(bundle.missing).toEqual([]);
    expect(bundle.found).toBe(bundle.requested);
    expect(bundle.requested).toBe(snapshot.counts.shapes);
    expect(bundle.approxBytes).toBeGreaterThan(0);
    // Boundary honesty: these are generalised dataset boundaries, never treaty lines.
    expect(bundle.note).toContain("boundary-approximate");
    expect(bundle.note).toContain("imported-unreviewed");
  });

  it.skipIf(!HAS_CORRIDOR)("keeps a single-year payload small enough to send without tiling", () => {
    // The measurement that retired the tile server: the worst year is about 0.36 MB.
    const worst = shapesForSnapshot(snapshotAtAstronomicalYear(1918));
    expect(worst.found).toBe(12);
    expect(worst.approxBytes).toBeLessThan(1_500_000);
  });
});

describe.skipIf(!built)("parseSnapshotQuery", () => {
  it("refuses a bare negative year, because it cannot tell the two numbering systems apart", () => {
    const result = parseSnapshotQuery({ year: "-260" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(400);
      expect(result.reason).toMatch(/ambiguous/i);
      expect(result.reason).toContain("era=BCE");
    }
  });

  it("accepts an explicit era, an astronomical year, and an EDTF date", () => {
    const bce = parseSnapshotQuery({ year: "261", era: "BCE" });
    expect(bce.ok).toBe(true);
    if (bce.ok) expect(bce.snapshot.astronomicalYear).toBe(-260);

    // "BC" and "AD" are common in curriculum text and must not be rejected as typos.
    expect(parseSnapshotQuery({ year: "261", era: "bc" }).ok).toBe(true);
    expect(parseSnapshotQuery({ year: "1765", era: "AD" }).ok).toBe(true);
    expect(parseSnapshotQuery({ astronomical: "-260" }).ok).toBe(true);
    expect(parseSnapshotQuery({ edtf: "1765-08-12" }).ok).toBe(true);
  });

  it("answers 400 with a usable reason for bad input, and never throws", () => {
    for (const params of [{}, { year: "abc" }, { year: "261", era: "BP" }, { astronomical: "1.5" }]) {
      const result = parseSnapshotQuery(params);
      expect(result.ok, JSON.stringify(params)).toBe(false);
      if (!result.ok) {
        expect(result.status).toBe(400);
        expect(result.reason.length).toBeGreaterThan(10);
      }
    }
    // With no parameters at all the reason must say what to send instead.
    const empty = parseSnapshotQuery({});
    if (!empty.ok) expect(empty.reason).toContain("?year=");
  });
});

describe.skipIf(!built)("loadCorpus", () => {
  it("merges curated and imported source records so citations resolve", () => {
    const corpus = loadCorpus();
    expect(corpus.entities).toHaveLength(154);
    expect(corpus.assertions).toHaveLength(1764);
    expect(corpus.sources.length).toBeGreaterThan(26);
    expect(corpus.sources.map((s) => s.id)).toContain("cliopatria-v0-2-1");
    // Every citation in the assembled corpus must name a source the corpus actually holds.
    const ids = new Set(corpus.sources.map((s) => s.id));
    for (const assertion of corpus.assertions) {
      for (const citation of assertion.sources) {
        expect(ids.has(citation.source), `assertion ${assertion.id} cites ${citation.source}`).toBe(true);
      }
    }
  });

  it("takes generatedAt from the build rather than from the current time", () => {
    const imported = loadImportedCollections();
    expect(imported.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(loadCorpus().generatedAt).toBe(imported.generatedAt);
    // A caller may override it, and the override is what the corpus reports.
    expect(loadCorpus("2020-01-01T00:00:00.000Z").generatedAt).toBe("2020-01-01T00:00:00.000Z");
  });

  it("has no duplicate source ids after merging", () => {
    const ids = loadCorpus().sources.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("names the shape tier it found instead of implying completeness", () => {
    expect(loadImportedCollections().shapeTier).toBe(HAS_CORRIDOR ? "corridor" : "focus");
  });
});

describe.skipIf(!built)("projections safe to serialise", () => {
  it("returns the whole timeline sorted, dated and free of year zeros", () => {
    const timeline = eventTimeline();
    expect(timeline).toHaveLength(30);
    expect(timeline.every((e) => !e.parseError)).toBe(true);
    for (const event of timeline) {
      expect(event.displayDate.en).not.toMatch(YEAR_ZERO);
      expect(event.displayDate.hi).not.toMatch(YEAR_ZERO);
      expect(event.displayDate.en.length).toBeGreaterThan(0);
    }
    // Sorted by the earliest resolvable instant, which for BCE runs backwards in historical notation.
    expect(timeline[0].id).toBe("event-second-urbanisation");
    expect(timeline[timeline.length - 1].id).toBe("event-jharkhand-formation");
    expect(timeline[0].displayDate.en).toContain("BCE");
    expect(timeline[timeline.length - 1].displayDate.en).toBe("15 November 2000 CE");
  });

  it("links a place to the events, interpretations, coverage and learning about it", () => {
    const detail = placeDetail("place-pataliputra");
    expect(detail).not.toBeNull();
    if (!detail) return;
    expect(detail.events.length).toBeGreaterThan(0);
    expect(detail.interpretations.length).toBeGreaterThan(0);
    expect(detail.learning.length).toBeGreaterThan(0);
    expect(detail.events.every((e) => e.places.includes("place-pataliputra") || e.location?.placeId === "place-pataliputra")).toBe(true);
    expect(detail.interpretations.every((i) => i.concerns.includes("place-pataliputra"))).toBe(true);
    expect(detail.learning.every((l) => l.subject === "place-pataliputra")).toBe(true);
    // Coverage records are linked spatially, because the model records no list of affected places.
    const [lon, lat] = detail.place.geometry.coordinates;
    for (const record of detail.coverage) {
      const [west, south, east, north] = record.area;
      expect(lon >= west && lon <= east && lat >= south && lat <= north).toBe(true);
    }
  });

  it("returns null for an unknown place rather than throwing", () => {
    expect(placeDetail("place-not-in-corpus")).toBeNull();
  });
});

describe("loaders fail loudly when the corpus is absent", () => {
  it("distinguishes 'not built' from 'built but empty'", () => {
    // This runs whether or not the data is present, because it tests the error type itself.
    const err = new CorpusNotBuiltError("/nowhere");
    expect(err).toBeInstanceOf(CorpusError);
    expect(err.name).toBe("CorpusNotBuiltError");
    expect(err.message).toContain("atlas:build");
    // An empty map must never be served as a substitute for missing data.
    expect(err.message).toContain("not an acceptable substitute");
  });
});

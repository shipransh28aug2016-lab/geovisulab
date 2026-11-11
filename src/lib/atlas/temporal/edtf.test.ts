import { describe, expect, it } from "vitest";
import { civilToJdn } from "./jdn";
import {
  EdtfError,
  edtfIntervalFromYears,
  formatTemporal,
  isActiveInYear,
  isActiveOn,
  isQualified,
  jdnRange,
  overlaps,
  overallPrecision,
  parseEdtf,
  parseEdtfDate,
} from "./edtf";

describe("EDTF level 0: day, month, year", () => {
  it("parses an exact day as a one-day range", () => {
    const d = parseEdtfDate("1937-07-07");
    expect(d.precision).toBe("day");
    expect(d.earliest).toBe(civilToJdn(1937, 7, 7));
    expect(d.latest).toBe(d.earliest);
    expect(d.yearStart).toBe(1937);
    expect(d.month).toBe(7);
    expect(d.day).toBe(7);
  });

  it("parses a month as the whole month", () => {
    const d = parseEdtfDate("1937-07");
    expect(d.precision).toBe("month");
    expect(d.earliest).toBe(civilToJdn(1937, 7, 1));
    expect(d.latest).toBe(civilToJdn(1937, 7, 31));
    expect(d.latest - d.earliest + 1).toBe(31);
  });

  it("handles February in leap and non-leap years", () => {
    expect(parseEdtfDate("2024-02").latest - parseEdtfDate("2024-02").earliest + 1).toBe(29);
    expect(parseEdtfDate("2023-02").latest - parseEdtfDate("2023-02").earliest + 1).toBe(28);
  });

  it("parses a year as 365 or 366 days", () => {
    const d = parseEdtfDate("1857");
    expect(d.precision).toBe("year");
    expect(d.earliest).toBe(civilToJdn(1857, 1, 1));
    expect(d.latest).toBe(civilToJdn(1857, 12, 31));
    expect(parseEdtfDate("2024").latest - parseEdtfDate("2024").earliest + 1).toBe(366);
  });
});

describe("EDTF BCE years — astronomical numbering", () => {
  it("reads -0600 as 601 BCE and spans that whole year", () => {
    const d = parseEdtfDate("-0600");
    expect(d.yearStart).toBe(-600);
    expect(d.earliest).toBe(civilToJdn(-600, 1, 1));
    expect(d.latest).toBe(civilToJdn(-600, 12, 31));
  });

  it("reads 0000 as 1 BCE", () => {
    const d = parseEdtfDate("0000");
    expect(d.yearStart).toBe(0);
    expect(formatTemporal(d, "en")).toBe("1 BCE");
  });

  it("orders BCE intervals correctly: 601 BCE comes before 501 BCE", () => {
    const early = parseEdtfDate("-0600");
    const late = parseEdtfDate("-0500");
    expect(early.latest).toBeLessThan(late.earliest);
  });

  it("supports Y-prefixed years beyond four digits", () => {
    const d = parseEdtfDate("Y170000002");
    expect(d.yearStart).toBe(170000002);
    expect(d.precision).toBe("year");
  });
});

describe("EDTF level 1: qualifiers", () => {
  it("records uncertainty and approximation as flags", () => {
    expect(parseEdtfDate("1932?").uncertain).toBe(true);
    expect(parseEdtfDate("1932?").approximate).toBe(false);
    expect(parseEdtfDate("1932~").approximate).toBe(true);
    expect(parseEdtfDate("1932~").uncertain).toBe(false);
    const both = parseEdtfDate("1932%");
    expect(both.uncertain).toBe(true);
    expect(both.approximate).toBe(true);
  });

  it("does NOT widen the range for a circa date — that would fabricate precision", () => {
    const exact = parseEdtfDate("1932");
    const circa = parseEdtfDate("1932~");
    expect(circa.earliest).toBe(exact.earliest);
    expect(circa.latest).toBe(exact.latest);
    // The difference must be visible to the reader instead.
    expect(formatTemporal(circa, "en")).toContain("c.");
    expect(formatTemporal(exact, "en")).not.toContain("c.");
  });

  it("reports qualification for intervals from either end", () => {
    expect(isQualified(parseEdtf("1932~/1940")).approximate).toBe(true);
    expect(isQualified(parseEdtf("1932/1940?")).uncertain).toBe(true);
    expect(isQualified(parseEdtf("1932/1940"))).toEqual({ uncertain: false, approximate: false });
  });
});

describe("EDTF level 1: unspecified digits", () => {
  it("reads 193X as the decade 1930-1939", () => {
    const d = parseEdtfDate("193X");
    expect(d.precision).toBe("decade");
    expect(d.yearStart).toBe(1930);
    expect(d.yearEnd).toBe(1939);
    expect(d.earliest).toBe(civilToJdn(1930, 1, 1));
    expect(d.latest).toBe(civilToJdn(1939, 12, 31));
  });

  it("reads 19XX as the century and 1XXX as the millennium", () => {
    expect(parseEdtfDate("19XX").precision).toBe("century");
    expect(parseEdtfDate("19XX").yearEnd).toBe(1999);
    expect(parseEdtfDate("1XXX").precision).toBe("millennium");
    expect(parseEdtfDate("1XXX").yearStart).toBe(1000);
    expect(parseEdtfDate("1XXX").yearEnd).toBe(1999);
  });

  it("reads an unspecified month as the whole year, and an unspecified day as the whole month", () => {
    expect(parseEdtfDate("1985-XX").precision).toBe("year");
    const d = parseEdtfDate("1985-04-XX");
    expect(d.precision).toBe("month");
    expect(d.earliest).toBe(civilToJdn(1985, 4, 1));
    expect(d.latest).toBe(civilToJdn(1985, 4, 30));
  });

  it("rejects ambiguous combinations rather than guessing", () => {
    expect(() => parseEdtfDate("193X-05")).toThrow(EdtfError);
    expect(() => parseEdtfDate("1985-XX-12")).toThrow(EdtfError);
    expect(() => parseEdtfDate("-19XX")).toThrow(EdtfError);
  });
});

describe("EDTF intervals", () => {
  it("parses a closed interval", () => {
    const iv = parseEdtf("1901/1947");
    expect(iv.kind).toBe("interval");
    if (iv.kind !== "interval") return;
    expect(iv.start.kind).toBe("date");
    expect(iv.end.kind).toBe("date");
    const range = jdnRange(iv);
    expect(range?.earliest).toBe(civilToJdn(1901, 1, 1));
    expect(range?.latest).toBe(civilToJdn(1947, 12, 31));
  });

  it("parses open and unknown ends", () => {
    const open = parseEdtf("1947/..");
    expect(open.kind === "interval" && open.end.kind === "open").toBe(true);
    const unknown = parseEdtf("/1947");
    expect(unknown.kind === "interval" && unknown.start.kind === "unknown").toBe(true);
    expect(jdnRange(parseEdtf("1947/.."))?.latest).toBe(Number.MAX_SAFE_INTEGER);
  });

  it("mixes precisions across an interval", () => {
    const iv = parseEdtf("-0326/-0322-06");
    const range = jdnRange(iv);
    expect(range?.earliest).toBe(civilToJdn(-326, 1, 1));
    expect(range?.latest).toBe(civilToJdn(-322, 6, 30));
    // The span as a whole is only known to the YEAR, because its start is year-precision.
    expect(overallPrecision(iv)).toBe("year");
    if (iv.kind === "interval" && iv.start.kind === "date" && iv.end.kind === "date") {
      expect(iv.start.precision).toBe("year");
      expect(iv.end.precision).toBe("month");
    }
  });

  it("rejects impossible intervals", () => {
    expect(() => parseEdtf("1947/1901")).toThrow(EdtfError);
    expect(() => parseEdtf("../..")).toThrow(EdtfError);
    expect(() => parseEdtf("1901/1920/1930")).toThrow(EdtfError);
  });

  it("reports unknown precision honestly", () => {
    expect(overallPrecision(parseEdtf("/1947"))).toBe("unknown");
    expect(overallPrecision(parseEdtf("1901/.."))).toBe("year");
  });
});

describe("EDTF rejects what it cannot represent", () => {
  it("rejects seasons, because level 1 does not define their months or hemisphere", () => {
    for (const text of ["2001-21", "2001-22", "2001-23", "2001-24", "-0600-21", "2001-21~"]) {
      let err: unknown = null;
      try {
        parseEdtfDate(text);
      } catch (e) {
        err = e;
      }
      expect(err, `expected ${text} to be rejected`).toBeInstanceOf(EdtfError);
      expect((err as EdtfError).message).toMatch(/season/i);
    }
  });

  it("rejects times of day", () => {
    expect(() => parseEdtfDate("1985-04-12T10:00")).toThrow(EdtfError);
  });

  it("rejects impossible calendar dates", () => {
    expect(() => parseEdtfDate("2023-02-29")).toThrow(EdtfError);
    expect(() => parseEdtfDate("2023-13-01")).toThrow(EdtfError);
    expect(() => parseEdtfDate("2023-04-31")).toThrow(EdtfError);
  });

  it("rejects free text with a helpful message", () => {
    expect(() => parseEdtfDate("600 BCE")).toThrow(EdtfError);
    expect(() => parseEdtfDate("c. 600")).toThrow(EdtfError);
    expect(() => parseEdtfDate("")).toThrow(EdtfError);
  });
});

describe("isActiveOn / isActiveInYear — the question the timeline asks", () => {
  const magadhaHaryanka = parseEdtf("-0500/-0405"); // Cliopatria -500..-405, i.e. 501-406 BCE

  it("is true inside the range and false outside", () => {
    expect(isActiveOn(magadhaHaryanka, civilToJdn(-450, 6, 15))).toBe(true);
    expect(isActiveOn(magadhaHaryanka, civilToJdn(-501, 1, 1))).toBe(false);
    expect(isActiveOn(magadhaHaryanka, civilToJdn(-404, 12, 31))).toBe(false);
  });

  it("treats the boundary as inclusive at both ends", () => {
    expect(isActiveOn(magadhaHaryanka, civilToJdn(-500, 1, 1))).toBe(true);
    expect(isActiveOn(magadhaHaryanka, civilToJdn(-405, 12, 31))).toBe(true);
  });

  it("answers year-level queries, which is all ancient history can support", () => {
    expect(isActiveInYear(magadhaHaryanka, -450)).toBe(true);
    expect(isActiveInYear(magadhaHaryanka, -320)).toBe(false);
  });

  it("treats an open end as still in force", () => {
    expect(isActiveOn(parseEdtf("1947/.."), civilToJdn(2026, 11, 11))).toBe(true);
  });

  it("treats an unknown start as already begun", () => {
    expect(isActiveOn(parseEdtf("/-0321"), civilToJdn(-400, 1, 1))).toBe(true);
  });

  it("handles a single exact day", () => {
    const mutiny = parseEdtf("1857-05-10");
    expect(isActiveOn(mutiny, civilToJdn(1857, 5, 10))).toBe(true);
    expect(isActiveOn(mutiny, civilToJdn(1857, 5, 11))).toBe(false);
    expect(isActiveInYear(mutiny, 1857)).toBe(true);
  });
});

describe("overlaps — detecting competing claims", () => {
  it("finds overlapping and disjoint ranges", () => {
    expect(overlaps(parseEdtf("-0400/-0300"), parseEdtf("-0350/-0250"))).toBe(true);
    expect(overlaps(parseEdtf("-0400/-0350"), parseEdtf("-0300/-0250"))).toBe(false);
    expect(overlaps(parseEdtf("1857-05-10"), parseEdtf("1857"))).toBe(true);
  });

  it("assumes overlap for unbounded values rather than asserting independence", () => {
    expect(overlaps(parseEdtf("1947/.."), parseEdtf("1800/.."))).toBe(true);
  });
});

describe("formatTemporal — what a learner sees", () => {
  it("never exposes an astronomical year zero", () => {
    for (const text of ["0000", "-0001", "-0600", "0000/0001"]) {
      for (const lang of ["en", "hi"] as const) {
        const out = formatTemporal(parseEdtf(text), lang);
        expect(out).not.toMatch(/0 (BCE|CE)/);
        expect(out).not.toContain("year 0");
      }
    }
  });

  it("writes English and Hindi consistently for the same instant", () => {
    expect(formatTemporal(parseEdtf("-0600"), "en")).toBe("601 BCE");
    expect(formatTemporal(parseEdtf("-0600"), "hi")).toBe("601 ईसा पूर्व");
    expect(formatTemporal(parseEdtf("1857-05-10"), "en")).toBe("10 May 1857 CE");
    expect(formatTemporal(parseEdtf("1857-05-10"), "hi")).toBe("10 मई 1857 ईसवी");
  });

  it("writes intervals in both languages", () => {
    expect(formatTemporal(parseEdtf("-0500/-0405"), "en")).toBe("501–406 BCE");
    expect(formatTemporal(parseEdtf("1947/.."), "en")).toBe("1947 CE to ongoing");
    expect(formatTemporal(parseEdtf("1947/.."), "hi")).toContain("जारी");
  });

  it("can suppress qualifiers for compact UI such as timeline ticks", () => {
    expect(formatTemporal(parseEdtf("1932~"), "en", { withQualifiers: false })).toBe("1932 CE");
    expect(formatTemporal(parseEdtf("1932~"), "en")).toBe("1932 CE (c.)");
  });
});

describe("edtfIntervalFromYears — building intervals from year integers", () => {
  it("produces text that parses back to the same range", () => {
    const text = edtfIntervalFromYears(-600, -501);
    expect(text).toBe("-0600/-0501");
    const iv = parseEdtf(text);
    const range = jdnRange(iv);
    expect(range?.earliest).toBe(civilToJdn(-600, 1, 1));
    expect(range?.latest).toBe(civilToJdn(-501, 12, 31));
  });
});

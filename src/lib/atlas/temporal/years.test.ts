import { describe, expect, it } from "vitest";
import {
  astronomicalToHistorical,
  centuryLabel,
  formatYear,
  formatYearSpan,
  fromEdtfYear,
  historicalToAstronomical,
  numberingDiverges,
  toEdtfYear,
} from "./years";

describe("astronomical <-> historical year numbering", () => {
  it("has no year zero on the historical side", () => {
    // Astronomical 0 IS 1 BCE. The historical side must never produce a year 0.
    expect(astronomicalToHistorical(0)).toEqual({ year: 1, era: "BCE" });
    expect(astronomicalToHistorical(-1)).toEqual({ year: 2, era: "BCE" });
    expect(astronomicalToHistorical(-600)).toEqual({ year: 601, era: "BCE" });
    expect(astronomicalToHistorical(1)).toEqual({ year: 1, era: "CE" });
    expect(astronomicalToHistorical(2024)).toEqual({ year: 2024, era: "CE" });
  });

  it("round-trips in both directions across the zero boundary", () => {
    for (const astronomical of [-3400, -601, -600, -45, -1, 0, 1, 2, 324, 1857, 2024]) {
      const historical = astronomicalToHistorical(astronomical);
      expect(historicalToAstronomical(historical.year, historical.era)).toBe(astronomical);
    }
  });

  it("adjacent historical years are adjacent astronomical years, with no gap at the boundary", () => {
    // 2 BCE -> 1 BCE -> 1 CE must be three consecutive astronomical years: -1, 0, 1.
    expect(historicalToAstronomical(2, "BCE")).toBe(-1);
    expect(historicalToAstronomical(1, "BCE")).toBe(0);
    expect(historicalToAstronomical(1, "CE")).toBe(1);
  });

  it("rejects a historical year zero instead of inventing one", () => {
    expect(() => historicalToAstronomical(0, "BCE")).toThrow(RangeError);
    expect(() => historicalToAstronomical(0, "CE")).toThrow(RangeError);
    expect(() => historicalToAstronomical(-5, "CE")).toThrow(RangeError);
  });

  it("rejects non-integer years", () => {
    expect(() => astronomicalToHistorical(3.5)).toThrow(RangeError);
    expect(() => toEdtfYear(NaN)).toThrow(RangeError);
  });

  it("knows where the two systems diverge", () => {
    expect(numberingDiverges(0)).toBe(true);
    expect(numberingDiverges(-600)).toBe(true);
    expect(numberingDiverges(1)).toBe(false);
    expect(numberingDiverges(1857)).toBe(false);
  });
});

describe("THE CLIOPATRIA YEAR-ZERO TRAP", () => {
  /**
   * Cliopatria v0.2.1 numbers years astronomically. Six rows end at year 0 and each is followed by
   * a row starting at year 1, which is only contiguous under astronomical numbering. So the
   * Janapada of Magadha row `FromYear: -600` is 601 BCE, NOT 600 BCE. Treating the dataset as
   * historical notation shifts every BCE date in the pilot by one year.
   */
  it("reads Cliopatria -600 as 601 BCE, not 600 BCE", () => {
    expect(astronomicalToHistorical(-600)).toEqual({ year: 601, era: "BCE" });
    expect(formatYear(-600, "en")).toBe("601 BCE");
  });

  it("reads the Maurya Empire's Cliopatria start (-318) as 319 BCE", () => {
    expect(formatYear(-318, "en")).toBe("319 BCE");
  });

  it("treats Cliopatria year 0 as 1 BCE, keeping the zero boundary contiguous", () => {
    // Yuezhi: FromYear -50 ToYear 0, then FromYear 1 ToYear 13. No year is skipped or duplicated.
    expect(formatYear(0, "en")).toBe("1 BCE");
    expect(formatYear(1, "en")).toBe("1 CE");
    expect(formatYearSpan(-50, 0, "en")).toBe("51–1 BCE");
    expect(formatYearSpan(-50, 1, "en")).toBe("51 BCE – 1 CE");
  });
});

describe("human-facing year formatting", () => {
  it("writes English BCE/CE", () => {
    expect(formatYear(-600, "en")).toBe("601 BCE");
    expect(formatYear(324, "en")).toBe("324 CE");
    expect(formatYear(0, "en")).toBe("1 BCE");
  });

  it("writes Hindi इस्वी-पूर्व / ईसवी", () => {
    expect(formatYear(-600, "hi")).toBe("601 ईसा पूर्व");
    expect(formatYear(324, "hi")).toBe("324 ईसवी");
  });

  it("never emits the string 'year 0' or '0 BCE' to a learner", () => {
    for (let y = -3400; y <= 2024; y += 7) {
      for (const lang of ["en", "hi"] as const) {
        const text = formatYear(y, lang);
        expect(text).not.toMatch(/\b0 (BCE|CE)\b/);
        expect(text).not.toMatch(/^0\b/);
        expect(text).not.toContain("ईसा पूर्व 0");
      }
    }
  });

  it("collapses single-year spans and writes era-crossing spans in full", () => {
    expect(formatYearSpan(324, 324, "en")).toBe("324 CE");
    expect(formatYearSpan(-601, -501, "en")).toBe("602–502 BCE");
    expect(formatYearSpan(-1, 1, "en")).toBe("2 BCE – 1 CE");
    expect(formatYearSpan(-601, -501, "hi")).toBe("602–502 ईसा पूर्व");
  });

  it("normalises reversed spans rather than printing nonsense", () => {
    expect(formatYearSpan(500, 400, "en")).toBe(formatYearSpan(400, 500, "en"));
  });

  it("labels centuries from an astronomical year", () => {
    // 601 BCE falls in the 7th century BCE (600-501 BCE).
    expect(centuryLabel(-600, "en")).toBe("7th century BCE");
    expect(centuryLabel(324, "en")).toBe("4th century CE");
    expect(centuryLabel(-600, "hi")).toBe("7वीं सदी ईसा पूर्व");
  });
});

describe("EDTF year text", () => {
  it("pads to four digits and signs BCE years", () => {
    expect(toEdtfYear(1937)).toBe("1937");
    expect(toEdtfYear(5)).toBe("0005");
    expect(toEdtfYear(0)).toBe("0000");
    expect(toEdtfYear(-600)).toBe("-0600");
    expect(toEdtfYear(-3400)).toBe("-3400");
  });

  it("round-trips", () => {
    for (const y of [-3400, -601, -1, 0, 1, 324, 1857, 2024]) {
      expect(fromEdtfYear(toEdtfYear(y))).toBe(y);
    }
  });

  it("rejects malformed year text", () => {
    expect(() => fromEdtfYear("600 BCE")).toThrow(RangeError);
    expect(() => fromEdtfYear("32")).toThrow(RangeError);
    expect(() => fromEdtfYear("")).toThrow(RangeError);
  });
});

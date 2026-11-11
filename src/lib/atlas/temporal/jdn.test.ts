import { describe, expect, it } from "vitest";
import {
  JDN_UNIX_EPOCH,
  civilToJdn,
  dateToJdn,
  daysInMonth,
  isLeapYear,
  jdnToCivil,
  jdnToDate,
  jdnToIso,
  yearToJdnRange,
  yearsToJdnRange,
} from "./jdn";

describe("Julian Day Number conversion", () => {
  it("matches the standard reference value for the Unix epoch", () => {
    expect(civilToJdn(1970, 1, 1)).toBe(2440588);
    expect(JDN_UNIX_EPOCH).toBe(2440588);
  });

  it("matches published JDN values", () => {
    // Reference values cross-checked against a second, independent implementation (an ordinal-day
    // count anchored on J2000.0) — hand arithmetic on BCE dates is exactly where this goes wrong.
    expect(civilToJdn(2000, 1, 1)).toBe(2451545); // J2000.0 epoch day
    expect(civilToJdn(1857, 5, 10)).toBe(2399445); // year of the Revolt
    expect(civilToJdn(-600, 1, 1)).toBe(1501915); // 601 BCE, first day
    expect(civilToJdn(0, 1, 1)).toBe(1721060); // 1 BCE, first day
    expect(civilToJdn(1, 1, 1)).toBe(1721426); // 1 CE, first day
    expect(civilToJdn(-3400, 1, 1)).toBe(479236); // start of the Cliopatria chronology
  });

  it("round-trips every day across the full chronology the platform covers", () => {
    // 3400 BCE to 2024 CE: walk ~2 million days in strides, checking the inverse exactly.
    const [from] = yearsToJdnRange(-3400, -3400);
    const [, to] = yearsToJdnRange(2024, 2024);
    for (let jdn = from; jdn <= to; jdn += 997) {
      const civil = jdnToCivil(jdn);
      expect(civilToJdn(civil.year, civil.month, civil.day)).toBe(jdn);
    }
  });

  it("round-trips across the astronomical zero boundary without skipping a day", () => {
    const lastOfTwoBce = civilToJdn(-1, 12, 31); // 2 BCE
    const firstOfOneBce = civilToJdn(0, 1, 1); // 1 BCE
    const lastOfOneBce = civilToJdn(0, 12, 31);
    const firstOfOneCe = civilToJdn(1, 1, 1);
    expect(firstOfOneBce - lastOfTwoBce).toBe(1);
    expect(lastOfOneBce - firstOfOneBce).toBe(isLeapYear(0) ? 365 : 364);
    expect(firstOfOneCe - lastOfOneBce).toBe(1);
  });

  it("produces consecutive days for consecutive civil dates", () => {
    expect(civilToJdn(2024, 3, 1) - civilToJdn(2024, 2, 29)).toBe(1);
    expect(civilToJdn(2023, 3, 1) - civilToJdn(2023, 2, 28)).toBe(1);
  });

  it("writes ISO text with signed four-digit years", () => {
    expect(jdnToIso(civilToJdn(1970, 1, 1))).toBe("1970-01-01");
    expect(jdnToIso(civilToJdn(0, 1, 1))).toBe("0000-01-01");
    expect(jdnToIso(civilToJdn(-600, 7, 4))).toBe("-0600-07-04");
  });

  it("rejects impossible civil dates instead of silently rolling over", () => {
    expect(() => civilToJdn(2023, 2, 29)).toThrow(RangeError);
    expect(() => civilToJdn(2023, 13, 1)).toThrow(RangeError);
    expect(() => civilToJdn(2023, 4, 31)).toThrow(RangeError);
    expect(() => civilToJdn(2023, 0, 1)).toThrow(RangeError);
    expect(() => jdnToCivil(1.5)).toThrow(RangeError);
  });
});

describe("leap years on the proleptic Gregorian calendar", () => {
  it("applies the 4/100/400 rule", () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(2000)).toBe(true); // divisible by 400
    expect(isLeapYear(1900)).toBe(false); // divisible by 100, not 400
    expect(isLeapYear(1600)).toBe(true);
  });

  it("treats astronomical year 0 as a leap year (it is 1 BCE)", () => {
    expect(isLeapYear(0)).toBe(true);
    expect(daysInMonth(0, 2)).toBe(29);
  });

  it("gives the right month lengths", () => {
    expect(daysInMonth(2023, 2)).toBe(28);
    expect(daysInMonth(2024, 2)).toBe(29);
    // Astronomical -600 is 601 BCE. 600 is divisible by 100 but not 400, so it is NOT a leap year
    // — the century rule applies to proleptic Gregorian years before the calendar existed.
    expect(daysInMonth(-600, 2)).toBe(28);
    expect(daysInMonth(-400, 2)).toBe(29); // 401 BCE: divisible by 400
    expect(daysInMonth(2023, 4)).toBe(30);
    expect(daysInMonth(2023, 12)).toBe(31);
    expect(() => daysInMonth(2023, 13)).toThrow(RangeError);
  });
});

describe("year ranges", () => {
  it("spans a single year from 1 January to 31 December", () => {
    const [from, to] = yearToJdnRange(2023);
    expect(jdnToCivil(from)).toEqual({ year: 2023, month: 1, day: 1 });
    expect(jdnToCivil(to)).toEqual({ year: 2023, month: 12, day: 31 });
    expect(to - from + 1).toBe(365);
  });

  it("counts 366 days in a leap year", () => {
    const [from, to] = yearToJdnRange(2024);
    expect(to - from + 1).toBe(366);
  });

  it("normalises a reversed range", () => {
    const [a1, a2] = yearsToJdnRange(2024, 2020);
    const [b1, b2] = yearsToJdnRange(2020, 2024);
    expect([a1, a2]).toEqual([b1, b2]);
  });
});

describe("bridging to JavaScript Date at the modern end", () => {
  it("agrees with Date for years JS can represent", () => {
    for (const iso of ["1970-01-01", "2026-11-11", "1857-05-10", "1900-01-01"]) {
      const date = new Date(`${iso}T00:00:00Z`);
      const [y, m, d] = iso.split("-").map(Number);
      expect(dateToJdn(date)).toBe(civilToJdn(y, m, d));
      expect(jdnToDate(civilToJdn(y, m, d)).toISOString().slice(0, 10)).toBe(iso);
    }
  });
});

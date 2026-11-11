/**
 * Year numbering for the Atlas.
 *
 * THE CENTRAL TRAP (see docs/DATA_MODEL.md §"Temporal representation"):
 *
 *   Conventional historical notation has NO year zero — 1 BCE is followed immediately by 1 CE.
 *   Astronomical / ISO-8601 / EDTF numbering DOES have a year zero — year 0 is 1 BCE,
 *   year -1 is 2 BCE, and in general astronomical year A <= 0 is historical year (1 - A) BCE.
 *
 * Every dataset we ingest states its convention, or must be probed for it. Getting this wrong
 * shifts the whole chronology by one year and silently corrupts every BCE date in the platform.
 *
 * Recorded findings (docs/DATA_SOURCE_REGISTER.md):
 *   - Cliopatria v0.2.1: ASTRONOMICAL. Its README says only "negative for BCE, positive for CE",
 *     which is ambiguous, but six rows end at year 0 and each is immediately followed by a row
 *     starting at year 1. That is only contiguous under astronomical numbering, and matches the
 *     convention reported by other projects that import the same release. We therefore treat
 *     Cliopatria `-600` as 601 BCE, not 600 BCE.
 *   - EDTF: ASTRONOMICAL by definition.
 *   - Our own curated records: ASTRONOMICAL internally, HISTORICAL in every user-facing string.
 */

export type Era = "BCE" | "CE";

export interface HistoricalYear {
  /** The year as a reader writes it: 601 BCE -> { year: 601, era: "BCE" }. Never zero. */
  year: number;
  era: Era;
}

/** Astronomical year -> the year a historian writes. Astronomical 0 -> 1 BCE. */
export function astronomicalToHistorical(astronomical: number): HistoricalYear {
  if (!Number.isInteger(astronomical)) {
    throw new RangeError(`Astronomical years must be integers, got ${astronomical}`);
  }
  return astronomical <= 0
    ? { year: 1 - astronomical, era: "BCE" }
    : { year: astronomical, era: "CE" };
}

/** The year a historian writes -> astronomical year. 1 BCE -> 0. There is no historical year 0. */
export function historicalToAstronomical(year: number, era: Era): number {
  if (!Number.isInteger(year) || year < 1) {
    throw new RangeError(`Historical years must be positive integers, got ${year}`);
  }
  return era === "BCE" ? 1 - year : year;
}

/** True when the two numbering systems differ for this year, i.e. every year at or before 1 BCE. */
export function numberingDiverges(astronomical: number): boolean {
  return astronomical <= 0;
}

/**
 * Render a year for a human being, in the requested language.
 * `astronomical` is what is stored; the output is always historical notation.
 */
export function formatYear(astronomical: number, lang: "en" | "hi" = "en"): string {
  const { year, era } = astronomicalToHistorical(astronomical);
  if (lang === "hi") {
    return era === "BCE" ? `${year} ईसा पूर्व` : `${year} ईसवी`;
  }
  return era === "BCE" ? `${year} BCE` : `${year} CE`;
}

/**
 * Render a span of years, collapsing it to a single year when both ends are the same.
 * Both arguments are astronomical. Order is normalised, so `formatYearSpan(-300, -400)` is fine.
 */
export function formatYearSpan(fromAstronomical: number, toAstronomical: number, lang: "en" | "hi" = "en"): string {
  const lo = Math.min(fromAstronomical, toAstronomical);
  const hi = Math.max(fromAstronomical, toAstronomical);
  if (lo === hi) return formatYear(lo, lang);
  const a = astronomicalToHistorical(lo);
  const b = astronomicalToHistorical(hi);
  if (lang === "hi") {
    // Same era: write the suffix once. Crossing the era boundary: write both, and never a year 0.
    return a.era === b.era
      ? `${a.year}–${b.year} ${a.era === "BCE" ? "ईसा पूर्व" : "ईसवी"}`
      : `${a.year} ईसा पूर्व – ${b.year} ईसवी`;
  }
  return a.era === b.era ? `${a.year}–${b.year} ${a.era}` : `${a.year} BCE – ${b.year} CE`;
}

/**
 * EDTF year text for an astronomical year: at least four digits, signed for BCE.
 * Astronomical 0 -> "0000" (which EDTF reads as 1 BCE); -600 -> "-0600" (601 BCE).
 */
export function toEdtfYear(astronomical: number): string {
  if (!Number.isInteger(astronomical)) {
    throw new RangeError(`Astronomical years must be integers, got ${astronomical}`);
  }
  const sign = astronomical < 0 ? "-" : "";
  return `${sign}${String(Math.abs(astronomical)).padStart(4, "0")}`;
}

/** Parse an EDTF year field ("1937", "-0600", "0000") back to an astronomical year. */
export function fromEdtfYear(text: string): number {
  const match = /^([+-]?)(\d{4,})$/.exec(text.trim());
  if (!match) throw new RangeError(`Not an EDTF year: "${text}"`);
  const value = Number(match[2]);
  return match[1] === "-" ? -value : value;
}

/**
 * Label a named period the way the curriculum does, from an astronomical year.
 * Used for coarse orientation only — never as a substitute for a recorded date.
 */
export function centuryLabel(astronomical: number, lang: "en" | "hi" = "en"): string {
  const { year, era } = astronomicalToHistorical(astronomical);
  const ordinal = Math.floor((year - 1) / 100) + 1;
  if (lang === "hi") {
    return era === "BCE" ? `${ordinal}वीं सदी ईसा पूर्व` : `${ordinal}वीं सदी ईसवी`;
  }
  return era === "BCE" ? `${ordinalNum(ordinal)} century BCE` : `${ordinalNum(ordinal)} century CE`;
}

function ordinalNum(n: number): string {
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  const mod100 = n % 100;
  const suffix = mod100 >= 11 && mod100 <= 13 ? "th" : (suffixes[n % 10] ?? "th");
  return `${n}${suffix}`;
}

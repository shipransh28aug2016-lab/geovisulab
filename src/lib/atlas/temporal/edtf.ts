/**
 * EDTF — Extended Date/Time Format (https://www.loc.gov/standards/datetime/), level 0 plus the
 * parts of level 1 that historical data actually needs.
 *
 * Design rule that makes mixed precision tractable: EVERY date becomes an inclusive range of Julian
 * Day Numbers from the first day it could mean to the last. "1937-07-07" is a one-day range,
 * "1937-07" is 31 days, "-0600" is a whole year, "193X" is ten years. Comparisons, "was this true
 * on that date", and timeline rendering then all use the same arithmetic.
 *
 * `uncertain` (?) and `approximate` (~) are RECORDED AS FLAGS and deliberately do NOT widen the
 * range: EDTF does not say by how much a circa date might be out, so inventing a widening would be
 * fabricating precision. Whoever renders the date decides how to show the flag — the UI draws
 * approximate and uncertain dates differently and says so in words.
 *
 * Years are astronomical (year 0 = 1 BCE). See ./years.ts for why this matters.
 */

import { civilToJdn, daysInMonth, jdnToCivil, yearsToJdnRange } from "./jdn";
import { astronomicalToHistorical, formatYear, formatYearSpan, toEdtfYear } from "./years";

export type DatePrecision = "day" | "month" | "year" | "decade" | "century" | "millennium";

export interface HistoricalDate {
  kind: "date";
  /** The EDTF text this was parsed from. Kept so nothing is silently normalised away. */
  edtf: string;
  /** First possible day, inclusive, as a Julian Day Number. */
  earliest: number;
  /** Last possible day, inclusive, as a Julian Day Number. */
  latest: number;
  precision: DatePrecision;
  /** Source marked the date with ? or %: it is not sure of this date. */
  uncertain: boolean;
  /** Source marked the date with ~ or %: the date is "circa". */
  approximate: boolean;
  /** Astronomical years covered — equal unless year digits were unspecified. */
  yearStart: number;
  yearEnd: number;
  month?: number;
  day?: number;
}

/** An interval end EDTF marks open (".."): continues indefinitely in that direction. */
export interface OpenEnd {
  kind: "open";
}
/** An interval end EDTF leaves empty: something happened, but the date is unknown. */
export interface UnknownEnd {
  kind: "unknown";
}

export type IntervalEnd = HistoricalDate | OpenEnd | UnknownEnd;

export interface HistoricalInterval {
  kind: "interval";
  edtf: string;
  start: IntervalEnd;
  end: IntervalEnd;
}

export type TemporalValue = HistoricalDate | HistoricalInterval;

export class EdtfError extends Error {
  readonly input: string;
  constructor(input: string, reason: string) {
    super(`Invalid date "${input}": ${reason}`);
    this.name = "EdtfError";
    this.input = input;
  }
}

// Year: optional sign, then four digits with optional trailing X runs (1985, 198X, 19XX, 1XXX),
// or a Y-prefixed year of five or more digits. Then optional month and day (digits or XX), then an
// optional qualifier.
// Positional groups (the project targets ES2017, which has no named capture groups):
// 1 = Y-prefixed big year, 2 = sign, 3 = year, 4 = month, 5 = day, 6 = qualifier.
const DATE_PATTERN =
  /^(?:Y(-?\d{5,})|(-?)(\d{4}|\d{3}X|\d{2}XX|\dXXX))(?:-(\d{2}|XX))?(?:-(\d{2}|XX))?([?~%])?$/;

const PRECISION_BY_UNSPECIFIED_YEAR_DIGITS: DatePrecision[] = ["year", "decade", "century", "millennium"];

/** Parse a single EDTF date (not an interval). Throws `EdtfError` with a readable reason. */
export function parseEdtfDate(text: string): HistoricalDate {
  const raw = String(text).trim();
  if (raw.includes("/")) throw new EdtfError(raw, "this is an interval, not a single date");
  if (raw.includes("T")) {
    throw new EdtfError(raw, "times of day are not supported; give the date only (YYYY-MM-DD)");
  }

  // Seasons must be rejected BEFORE the general pattern is tried: EDTF writes them as month
  // numbers 21-24, which the month group would otherwise accept and then fail as "month 21".
  const season = /^(Y?-?\d{4,})-(2[1-4])(?:-(\d{2}|XX))?([?~%])?$/.exec(raw);
  if (season) {
    throw new EdtfError(
      raw,
      "seasons are not supported (EDTF level 1 does not define their months or hemisphere); " +
        "use a month interval such as 1938-03/1938-05"
    );
  }

  const match = DATE_PATTERN.exec(raw);
  if (!match) {
    throw new EdtfError(raw, "expected a form like 1937-07-07, 1937-07, 1937, -0220, or 193X");
  }

  const [bigYear, sign, year, month, day, qualifier] = [match[1], match[2], match[3], match[4], match[5], match[6]];
  const uncertain = qualifier === "?" || qualifier === "%";
  const approximate = qualifier === "~" || qualifier === "%";

  // Y-prefixed years (Y170000002) are year-only in EDTF level 1.
  if (bigYear !== undefined) {
    if (month !== undefined || day !== undefined) {
      throw new EdtfError(raw, "a Y-prefixed year cannot carry a month or day");
    }
    const y = Number(bigYear);
    const [earliest, latest] = yearsToJdnRange(y, y);
    return {
      kind: "date",
      edtf: raw,
      earliest,
      latest,
      precision: "year",
      uncertain,
      approximate,
      yearStart: y,
      yearEnd: y,
    };
  }

  const yearText = year as string;
  const unspecifiedDigits = (yearText.match(/X/g) ?? []).length;
  if (unspecifiedDigits > 0 && (month !== undefined || day !== undefined)) {
    throw new EdtfError(raw, "unspecified year digits cannot be combined with a month or day");
  }
  if (sign === "-" && unspecifiedDigits > 0) {
    // "-19XX" would be ambiguous about which end of the range is earlier; reject rather than guess.
    throw new EdtfError(raw, "unspecified digits are not supported on negative (BCE) years");
  }

  const digits = yearText.replace(/X/g, "");
  const base = Number(digits) * 10 ** unspecifiedDigits;
  const yearStart = sign === "-" ? -base : base;
  // For BCE years the digits count DOWN towards zero, so the span runs the other way.
  const yearEnd = sign === "-" ? -(base - (10 ** unspecifiedDigits - 1)) : base + (10 ** unspecifiedDigits - 1);

  const monthUnspecified = month === "XX";
  const dayUnspecified = day === "XX";
  if (monthUnspecified && day !== undefined) {
    throw new EdtfError(raw, "a day cannot be given when the month is unspecified");
  }
  if (monthUnspecified && dayUnspecified) {
    // "1985-XX-XX" is the same span as "1985": the year, and nothing finer.
    return build({ raw, yearStart, yearEnd, uncertain, approximate, precision: "year" });
  }

  const monthValue = month === undefined || monthUnspecified ? undefined : Number(month);
  if (monthValue !== undefined && (monthValue < 1 || monthValue > 12)) {
    throw new EdtfError(raw, `month ${monthValue} is not in 1-12`);
  }

  const dayValue = day === undefined || dayUnspecified ? undefined : Number(day);
  if (dayValue !== undefined) {
    if (monthValue === undefined) throw new EdtfError(raw, "a day requires a month");
    if (dayValue < 1 || dayValue > daysInMonth(yearStart, monthValue)) {
      throw new EdtfError(raw, `day ${dayValue} does not exist in ${toEdtfYear(yearStart)}-${String(monthValue).padStart(2, "0")}`);
    }
  }

  const precision: DatePrecision =
    unspecifiedDigits > 0
      ? PRECISION_BY_UNSPECIFIED_YEAR_DIGITS[unspecifiedDigits]
      : dayValue !== undefined
        ? "day"
        : monthValue !== undefined
          ? "month"
          : "year";

  return build({
    raw,
    yearStart,
    yearEnd,
    month: monthValue,
    day: dayValue,
    dayUnspecified: dayUnspecified,
    monthKnown: monthValue !== undefined,
    uncertain,
    approximate,
    precision,
  });
}

interface BuildInput {
  raw: string;
  yearStart: number;
  yearEnd: number;
  month?: number;
  day?: number;
  dayUnspecified?: boolean;
  monthKnown?: boolean;
  uncertain: boolean;
  approximate: boolean;
  precision: DatePrecision;
}

function build(input: BuildInput): HistoricalDate {
  const { yearStart, yearEnd } = input;
  let earliest: number;
  let latest: number;

  if (input.month !== undefined && input.monthKnown) {
    const month = input.month;
    if (input.day !== undefined) {
      earliest = civilToJdn(yearStart, month, input.day);
      latest = earliest;
    } else {
      // Day absent or unspecified: the whole month.
      earliest = civilToJdn(yearStart, month, 1);
      latest = civilToJdn(yearEnd, month, daysInMonth(yearEnd, month));
    }
  } else {
    // Year, decade, century or millennium: from 1 January of the first year to 31 December of the last.
    earliest = civilToJdn(yearStart, 1, 1);
    latest = civilToJdn(yearEnd, 12, 31);
  }

  return {
    kind: "date",
    edtf: input.raw,
    earliest,
    latest,
    precision: input.precision,
    uncertain: input.uncertain,
    approximate: input.approximate,
    yearStart,
    yearEnd,
    ...(input.monthKnown && input.month !== undefined ? { month: input.month } : {}),
    ...(input.day !== undefined ? { day: input.day } : {}),
  };
}

/** Parse an interval end: a date, ".." (open), "" (unknown). */
function parseEnd(text: string): IntervalEnd {
  if (text === "..") return { kind: "open" };
  if (text === "") return { kind: "unknown" };
  return parseEdtfDate(text);
}

/**
 * Parse any EDTF value: a single date or an interval.
 * Intervals are written `start/end`; either end may be open ("..") or unknown ("").
 */
export function parseEdtf(text: string): TemporalValue {
  const raw = String(text).trim();
  if (!raw.includes("/")) return parseEdtfDate(raw);
  const parts = raw.split("/");
  if (parts.length !== 2) throw new EdtfError(raw, "an interval has exactly one '/', separating start and end");
  const start = parseEnd(parts[0]);
  const end = parseEnd(parts[1]);
  if (start.kind === "open" && end.kind === "open") {
    throw new EdtfError(raw, "an interval cannot be open at both ends");
  }
  if (start.kind === "date" && end.kind === "date" && start.earliest > end.latest) {
    throw new EdtfError(raw, "the interval starts after it ends");
  }
  return { kind: "interval", edtf: raw, start, end };
}

// ---------------------------------------------------------------------------
// Interval algebra — everything the map, timeline and query engine need
// ---------------------------------------------------------------------------

/** The inclusive day range a temporal value covers, or null if it is unbounded/unknown. */
export function jdnRange(value: TemporalValue): { earliest: number; latest: number } | null {
  if (value.kind === "date") return { earliest: value.earliest, latest: value.latest };
  const start = value.start.kind === "date" ? value.start.earliest : null;
  const end = value.end.kind === "date" ? value.end.latest : null;
  if (start === null && end === null) return null;
  return {
    earliest: start ?? Number.MIN_SAFE_INTEGER,
    latest: end ?? Number.MAX_SAFE_INTEGER,
  };
}

/**
 * Was this temporal value in force on a given day?
 * An open or unknown end counts as still in force; an open or unknown start counts as already begun.
 * This is the single question the whole map answers when the user drags the timeline.
 */
export function isActiveOn(value: TemporalValue, jdn: number): boolean {
  if (value.kind === "date") return jdn >= value.earliest && jdn <= value.latest;
  const startOk = value.start.kind === "date" ? jdn >= value.start.earliest : true;
  const endOk = value.end.kind === "date" ? jdn <= value.end.latest : true;
  return startOk && endOk;
}

/**
 * Was this value in force at any point during a year? Year-level queries are the common case for
 * ancient history, where nobody can claim day precision.
 */
export function isActiveInYear(value: TemporalValue, astronomicalYear: number): boolean {
  const [from, to] = yearsToJdnRange(astronomicalYear, astronomicalYear);
  if (value.kind === "date") return value.earliest <= to && value.latest >= from;
  const startOk = value.start.kind === "date" ? value.start.earliest <= to : true;
  const endOk = value.end.kind === "date" ? value.end.latest >= from : true;
  return startOk && endOk;
}

/** Do two temporal values overlap at all? Used to detect competing claims about the same years. */
export function overlaps(a: TemporalValue, b: TemporalValue): boolean {
  const ra = jdnRange(a);
  const rb = jdnRange(b);
  if (!ra || !rb) return true; // Unbounded: assume overlap rather than assert independence.
  return ra.earliest <= rb.latest && rb.earliest <= ra.latest;
}

/**
 * The COARSEST precision mentioned anywhere in a value: what we can honestly claim to know about
 * the whole span. An interval that starts in a known year and ends in a known month is only known
 * to the year overall. Per-end precision stays available on each end for rendering.
 */
export function overallPrecision(value: TemporalValue): DatePrecision | "unknown" {
  const order: DatePrecision[] = ["day", "month", "year", "decade", "century", "millennium"];
  const ends = value.kind === "date" ? [value] : [value.start, value.end];
  let worst: DatePrecision | "unknown" = "day";
  for (const end of ends) {
    if (end.kind === "unknown") return "unknown";
    if (end.kind === "open") continue;
    if (order.indexOf(end.precision) > order.indexOf(worst as DatePrecision)) worst = end.precision;
  }
  return worst;
}

/** Does any part of this value carry an uncertainty or approximation flag? */
export function isQualified(value: TemporalValue): { uncertain: boolean; approximate: boolean } {
  const ends = value.kind === "date" ? [value] : [value.start, value.end];
  let uncertain = false;
  let approximate = false;
  for (const end of ends) {
    if (end.kind === "date") {
      uncertain ||= end.uncertain;
      approximate ||= end.approximate;
    }
  }
  return { uncertain, approximate };
}

/**
 * Format a temporal value for display. ALWAYS historical notation, never astronomical —
 * a learner must never see "year 0".
 */
export function formatTemporal(
  value: TemporalValue,
  lang: "en" | "hi" = "en",
  options: { withQualifiers?: boolean } = {}
): string {
  const withQualifiers = options.withQualifiers !== false;

  const one = (d: HistoricalDate): string => {
    let text: string;
    if (d.precision === "day" || d.precision === "month") {
      const civil = jdnToCivil(d.earliest);
      const { year, era } = astronomicalToHistorical(civil.year);
      const monthNames =
        lang === "hi"
          ? ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर"]
          : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const eraText = lang === "hi" ? (era === "BCE" ? "ईसा पूर्व" : "ईसवी") : era;
      text =
        d.precision === "day"
          ? `${d.day} ${monthNames[civil.month - 1]} ${year} ${eraText}`
          : `${monthNames[civil.month - 1]} ${year} ${eraText}`;
    } else if (d.yearStart !== d.yearEnd) {
      text = formatYearSpan(d.yearStart, d.yearEnd, lang);
    } else {
      text = formatYear(d.yearStart, lang);
    }
    if (!withQualifiers) return text;
    const suffix =
      d.approximate && d.uncertain
        ? lang === "hi" ? " (लगभग, अनिश्चित)" : " (approx., uncertain)"
        : d.approximate
          ? lang === "hi" ? " (लगभग)" : " (c.)"
          : d.uncertain
            ? lang === "hi" ? " (अनिश्चित)" : " (uncertain)"
            : "";
    return `${text}${suffix}`;
  };

  if (value.kind === "date") return one(value);

  // A closed interval whose ends are both plain years reads far better as a span ("501-406 BCE")
  // than as two separate years joined by "to". Only collapse when nothing would be lost: both ends
  // are dates, coarser than a month, and neither carries an uncertainty qualifier.
  if (value.start.kind === "date" && value.end.kind === "date") {
    const a = value.start;
    const b = value.end;
    const coarseEnough = (d: HistoricalDate) => d.precision !== "day" && d.precision !== "month";
    const flags = isQualified(value);
    if (coarseEnough(a) && coarseEnough(b) && !flags.uncertain && !flags.approximate) {
      return formatYearSpan(a.yearStart, b.yearEnd, lang);
    }
  }

  const startText =
    value.start.kind === "date"
      ? one(value.start)
      : value.start.kind === "open"
        ? lang === "hi" ? "अज्ञात आरम्भ" : "from unknown"
        : lang === "hi" ? "आरम्भ अज्ञात" : "start unknown";
  const endText =
    value.end.kind === "date"
      ? one(value.end)
      : value.end.kind === "open"
        ? lang === "hi" ? "जारी" : "ongoing"
        : lang === "hi" ? "अंत अज्ञात" : "end unknown";
  return lang === "hi" ? `${startText} से ${endText}` : `${startText} to ${endText}`;
}

export { formatYear, formatYearSpan };

/** Build an EDTF interval string from two astronomical years, inclusive of the end year. */
export function edtfIntervalFromYears(fromAstronomical: number, toAstronomicalInclusive: number): string {
  return `${toEdtfYear(fromAstronomical)}/${toEdtfYear(toAstronomicalInclusive)}`;
}

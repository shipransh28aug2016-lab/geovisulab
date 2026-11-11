/**
 * Julian Day Number arithmetic on the PROLEPTIC GREGORIAN calendar, with astronomical year
 * numbering (year 0 exists, year -1 is 2 BCE).
 *
 * Why JDN and not `Date`: JavaScript's `Date` cannot represent years outside roughly
 * ±273,000 and, more importantly, its pre-1970 arithmetic is easy to get subtly wrong. Historical
 * chronology in this platform spans 3400 BCE to the present, so every date becomes an integer day
 * count. Mixed precision is then handled uniformly: an exact day is a one-day range, a year is a
 * 365/366-day range, a century is a 100-year range.
 */

import { toEdtfYear } from "./years";

export interface CivilDate {
  year: number; // astronomical
  month: number; // 1-12
  day: number; // 1-31
}

/** Proleptic Gregorian leap rule, applied to astronomical years (year 0 is a leap year). */
export function isLeapYear(astronomicalYear: number): boolean {
  const y = astronomicalYear;
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

export function daysInMonth(astronomicalYear: number, month: number): number {
  if (month < 1 || month > 12) throw new RangeError(`month must be 1-12, got ${month}`);
  if (month === 2) return isLeapYear(astronomicalYear) ? 29 : 28;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

/** Civil date -> Julian Day Number. 1970-01-01 is JDN 2440588. */
export function civilToJdn(year: number, month: number, day: number): number {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    throw new RangeError(`civil date components must be integers: ${year}-${month}-${day}`);
  }
  if (month < 1 || month > 12) throw new RangeError(`month out of range: ${month}`);
  if (day < 1 || day > daysInMonth(year, month)) {
    throw new RangeError(`day ${day} out of range for ${toEdtfYear(year)}-${String(month).padStart(2, "0")}`);
  }
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

/** Julian Day Number -> civil date. Exact inverse of `civilToJdn`. */
export function jdnToCivil(jdn: number): CivilDate {
  if (!Number.isInteger(jdn)) throw new RangeError(`JDN must be an integer, got ${jdn}`);
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: 100 * b + d - 4800 + Math.floor(m / 10),
  };
}

/** First and last day of an inclusive span of astronomical years. */
export function yearsToJdnRange(fromYear: number, toYear: number): [number, number] {
  const lo = Math.min(fromYear, toYear);
  const hi = Math.max(fromYear, toYear);
  return [civilToJdn(lo, 1, 1), civilToJdn(hi, 12, 31)];
}

/** First and last day of a single astronomical year. */
export function yearToJdnRange(year: number): [number, number] {
  return yearsToJdnRange(year, year);
}

/** ISO-8601 style text for a JDN, e.g. "-0600-03-15". */
export function jdnToIso(jdn: number): string {
  const { year, month, day } = jdnToCivil(jdn);
  return `${toEdtfYear(year)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Julian Day Number of the Unix epoch, for converting to and from JS `Date` at the modern end. */
export const JDN_UNIX_EPOCH = 2440588;

export function jdnToDate(jdn: number): Date {
  return new Date(Math.round((jdn - JDN_UNIX_EPOCH) * 86_400_000));
}

export function dateToJdn(date: Date): number {
  return Math.floor(date.getTime() / 86_400_000) + JDN_UNIX_EPOCH;
}

import { DAYS, type Day, type DailyHours, type Resource } from "@/lib/types";

// All resources are in Utah, so "now" is evaluated in Mountain time regardless of server.
const TIME_ZONE = "America/Denver";

/** "HH:MM-HH:MM" for one day, or "" when closed. */
export const DAY_HOURS = /^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/;

/** Days in the order people read a week: Monday first. */
const WEEK: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function localNow(date: Date): { day: Day; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: get("weekday") as Day,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** That day's opening and closing time in minutes, or null when closed. */
function dayRange(hours: DailyHours, day: Day): { opens: number; closes: number } | null {
  const value = hours[`hours${day}`];
  if (!DAY_HOURS.test(value)) return null;
  const [opens, closes] = value.split("-");
  return { opens: toMinutes(opens), closes: toMinutes(closes) };
}

export function isOpenNow(r: Resource, date = new Date()): boolean {
  if (r.open24h) return true;
  if (!r.hoursKnown) return false;
  const { day, minutes } = localNow(date);

  const today = dayRange(r, day);
  if (today) {
    const overnight = today.closes <= today.opens;
    if (minutes >= today.opens && (overnight || minutes < today.closes)) return true;
  }

  // Overnight hours from yesterday, e.g. Fri 6 PM – 8 AM is still open Saturday at 7 AM.
  const yesterday = dayRange(r, DAYS[(DAYS.indexOf(day) + 6) % 7]);
  return Boolean(yesterday && yesterday.closes <= yesterday.opens && minutes < yesterday.closes);
}

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

/** "Mon – Fri", "Tue, Thu", "Mon – Wed, Sat": runs of 3+ days become a range. */
function formatDays(days: Day[]): string {
  const runs: Day[][] = [];
  for (const d of days) {
    const run = runs.at(-1);
    if (run && WEEK.indexOf(d) === WEEK.indexOf(run.at(-1)!) + 1) run.push(d);
    else runs.push([d]);
  }
  return runs.map((run) => (run.length >= 3 ? `${run[0]} – ${run.at(-1)}` : run.join(", "))).join(", ");
}

/**
 * The hours as leaders read them, built from the daily hours so it always agrees with
 * Open/Closed: "Mon 9 AM – 6 PM; Tue – Sat 9 AM – 7 PM".
 */
export function hoursSummary(r: Resource): string {
  if (r.open24h) return "Open 24 hours";
  if (!r.hoursKnown) return "Call for hours";

  const groups = new Map<string, Day[]>();
  for (const d of WEEK) {
    const value = r[`hours${d}`];
    if (!DAY_HOURS.test(value)) continue;
    groups.set(value, [...(groups.get(value) ?? []), d]);
  }
  if (groups.size === 0) return "Call for hours";

  return [...groups]
    .map(([value, days]) => {
      const [opens, closes] = value.split("-");
      const when = days.length === 7 ? "Every day" : formatDays(days);
      return `${when} ${formatTime(opens)} – ${formatTime(closes)}`;
    })
    .join("; ");
}

/** The summary plus the optional note, on one line (cards and Share). */
export function hoursLine(r: Resource): string {
  const summary = hoursSummary(r);
  return r.hoursNote ? `${summary}. ${r.hoursNote}` : summary;
}

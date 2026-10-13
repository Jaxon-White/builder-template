import { DAYS, type Day, type Resource } from "@/lib/types";

// All resources are in Utah, so "now" is evaluated in Mountain time regardless of server.
const TIME_ZONE = "America/Denver";

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

export function isOpenNow(r: Resource, date = new Date()): boolean {
  if (r.open24h) return true;
  if (!r.hoursKnown) return false;
  const { day, minutes } = localNow(date);
  const opens = toMinutes(r.opensAt);
  const closes = toMinutes(r.closesAt);

  if (closes > opens) {
    return r.openDays.includes(day) && minutes >= opens && minutes < closes;
  }

  // Overnight hours, e.g. 6 PM – 8 AM: open late today, or still open from yesterday.
  const yesterday = DAYS[(DAYS.indexOf(day) + 6) % 7];
  return (
    (r.openDays.includes(day) && minutes >= opens) ||
    (r.openDays.includes(yesterday) && minutes < closes)
  );
}

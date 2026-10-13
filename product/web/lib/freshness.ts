import type { Resource } from "@/lib/types";

export const DUE_AFTER_DAYS = 30;
export const OVERDUE_AFTER_DAYS = 60;

export type Freshness = "current" | "due" | "overdue";

/** Days since the last phone check, or Infinity if it has never been confirmed. */
export function daysSinceChecked(r: Resource, now = new Date()): number {
  if (!r.lastVerified) return Infinity;
  const checked = new Date(`${r.lastVerified}T12:00:00`);
  return Math.max(0, Math.floor((now.getTime() - checked.getTime()) / 86_400_000));
}

export function freshness(r: Resource, now = new Date()): Freshness {
  const d = daysSinceChecked(r, now);
  if (d >= OVERDUE_AFTER_DAYS) return "overdue";
  if (d >= DUE_AFTER_DAYS) return "due";
  return "current";
}

export function checkedAgoText(r: Resource, now = new Date()): string {
  const d = daysSinceChecked(r, now);
  if (d === Infinity) return "Not confirmed by phone yet";
  if (d === 0) return "Checked today";
  if (d === 1) return "Checked yesterday";
  return `Checked ${d} days ago`;
}

export type CallAheadReason = "unreachable" | "unconfirmed" | "stale";

/** Why a leader should call ahead before sending someone, or null if the listing is current. */
export function callAheadReason(r: Resource, now = new Date()): CallAheadReason | null {
  if (r.status === "unreachable") return "unreachable";
  if (!r.lastVerified) return "unconfirmed";
  if (freshness(r, now) === "overdue") return "stale";
  return null;
}

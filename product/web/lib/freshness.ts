import type { Resource } from "@/lib/types";

export const DUE_AFTER_DAYS = 30;
export const OVERDUE_AFTER_DAYS = 60;

export type Freshness = "current" | "due" | "overdue";

export function daysSinceChecked(r: Resource, now = new Date()): number {
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
  if (d === 0) return "Checked today";
  if (d === 1) return "Checked yesterday";
  return `Checked ${d} days ago`;
}

/** Whether a leader should be told to call ahead before sending someone. */
export function needsCallAhead(r: Resource, now = new Date()): boolean {
  return r.status === "unreachable" || freshness(r, now) === "overdue";
}

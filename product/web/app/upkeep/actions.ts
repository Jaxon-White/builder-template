"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getResource, saveCheck } from "@/lib/data";
import { DAY_HOURS } from "@/lib/hours";
import {
  DAY_HOURS_FIELDS,
  EDITABLE_FIELDS,
  type CheckOutcome,
  type Day,
  type DayHoursField,
  type ResourceChanges,
} from "@/lib/types";

const OUTCOMES: CheckOutcome[] = ["running", "closed", "unreachable"];

export async function recordCheck(resourceId: string, formData: FormData) {
  const outcome = formData.get("outcome") as CheckOutcome;
  if (!OUTCOMES.includes(outcome)) redirect(`/upkeep/${resourceId}?error=outcome`);

  const current = await getResource(resourceId);
  if (!current) redirect("/upkeep");

  // Only keep fields that actually changed, so the log says what was corrected.
  const changes: ResourceChanges = {};
  const changedFields: string[] = [];
  for (const field of EDITABLE_FIELDS) {
    if (DAY_HOURS_FIELDS.includes(field as DayHoursField)) {
      const day = field.slice("hours".length) as Day;
      const opens = String(formData.get(`opens-${day}`) ?? "");
      const closes = String(formData.get(`closes-${day}`) ?? "");
      const value = formData.get(`open-${day}`) ? `${opens}-${closes}` : "";
      if (value && !DAY_HOURS.test(value)) continue;
      if (value !== current[field as DayHoursField]) {
        changes[field as DayHoursField] = value;
        changedFields.push(field);
      }
      continue;
    }
    const value = String(formData.get(field) ?? "").trim();
    // Shown as a link to leaders, so only allow ordinary web addresses.
    if (field === "website" && value && !/^https?:\/\/[^\s]+$/i.test(value)) continue;
    // The note can be cleared; other fields keep their value if left blank.
    if ((value || field === "hoursNote") && value !== current[field]) {
      changes[field] = value;
      changedFields.push(field);
    }
  }

  if (changedFields.some((f) => DAY_HOURS_FIELDS.includes(f as DayHoursField))) {
    changes.hoursKnown = true;
  }

  const note = String(formData.get("note") ?? "").trim().slice(0, 1000);
  await saveCheck(resourceId, outcome, changes, changedFields, note);

  revalidatePath("/", "layout");
  redirect(`/upkeep?saved=${resourceId}`);
}

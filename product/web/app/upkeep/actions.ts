"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getResource, saveCheck } from "@/lib/data";
import {
  DAYS,
  EDITABLE_FIELDS,
  type CheckOutcome,
  type Day,
  type ResourceChanges,
} from "@/lib/types";

const OUTCOMES: CheckOutcome[] = ["running", "closed", "unreachable"];
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export async function recordCheck(resourceId: string, formData: FormData) {
  const outcome = formData.get("outcome") as CheckOutcome;
  if (!OUTCOMES.includes(outcome)) redirect(`/upkeep/${resourceId}?error=outcome`);

  const current = await getResource(resourceId);
  if (!current) redirect("/upkeep");

  // Only keep fields that actually changed, so the log says what was corrected.
  const changes: ResourceChanges = {};
  const changedFields: string[] = [];
  for (const field of EDITABLE_FIELDS) {
    if (field === "openDays") {
      const days = DAYS.filter((d) => formData.getAll("openDays").includes(d)) as Day[];
      if (days.join() !== current.openDays.join()) {
        changes.openDays = days;
        changedFields.push(field);
      }
      continue;
    }
    const value = String(formData.get(field) ?? "").trim();
    if ((field === "opensAt" || field === "closesAt") && !TIME.test(value)) continue;
    if (value && value !== current[field]) {
      changes[field] = value;
      changedFields.push(field);
    }
  }

  const note = String(formData.get("note") ?? "").trim().slice(0, 1000);
  await saveCheck(resourceId, outcome, changes, changedFields, note);

  revalidatePath("/", "layout");
  redirect(`/upkeep?saved=${resourceId}`);
}

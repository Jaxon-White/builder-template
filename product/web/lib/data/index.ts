import "server-only";
import { requireRole, requireUser } from "@/lib/auth";
import type { CheckLog, Resource, ResourceChanges } from "@/lib/types";
import type { ResourceSource } from "./source";
import { localSource, sampleSource } from "./mock-source";
import { sharepointSource } from "./sharepoint-source";

const DATA_SOURCE = process.env.DATA_SOURCE ?? "local";

// The one place that decides where resource data comes from.
function pickSource(): ResourceSource {
  switch (DATA_SOURCE) {
    case "local":
      return localSource;
    case "sample":
    case "mock": // older name for the sample data
      return sampleSource;
    case "sharepoint":
      return sharepointSource;
    default:
      throw new Error(`Unknown DATA_SOURCE "${DATA_SOURCE}". Use "local", "sample" or "sharepoint".`);
  }
}

const source = pickSource();

/** Banner text explaining what kind of data is showing, or null for none. */
export const dataNotice: string | null =
  DATA_SOURCE === "local"
    ? "Prototype · real places, still being confirmed by phone. Call ahead."
    : DATA_SOURCE === "sharepoint"
      ? null
      : "Prototype · sample data, not real organizations";

// Data access layer: every read and write checks the session here, close to the data, so a
// page or action that forgets to check can't leak anything.

/** Resources a leader can be sent to (closed ones hidden). */
export async function getFinderResources(): Promise<Resource[]> {
  await requireUser();
  return (await source.getResources()).filter((r) => r.status !== "closed");
}

export async function getResource(id: string): Promise<Resource | null> {
  await requireUser();
  return source.getResource(id);
}

export async function getAllResourcesForUpkeep(): Promise<Resource[]> {
  await requireRole("upkeep");
  return source.getResources();
}

export async function getChecks(resourceId: string): Promise<CheckLog[]> {
  await requireRole("upkeep");
  return source.getChecks(resourceId);
}

export async function saveCheck(
  resourceId: string,
  outcome: CheckLog["outcome"],
  changes: ResourceChanges,
  changedFields: string[],
  note: string,
): Promise<void> {
  const user = await requireRole("upkeep");
  const today = new Date().toISOString().slice(0, 10);
  await source.updateResource(resourceId, {
    ...changes,
    status: outcome === "running" ? "active" : outcome,
    // Only a successful call confirms the listing; a failed one leaves the old date.
    ...(outcome === "unreachable" ? {} : { lastVerified: today }),
  });
  await source.logCheck({
    resourceId,
    at: new Date().toISOString(),
    by: user.name,
    outcome,
    note,
    changedFields,
  });
}

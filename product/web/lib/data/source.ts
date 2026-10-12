import type { CheckLog, Resource, ResourceChanges } from "@/lib/types";

/**
 * Everything the app knows about where resources come from. UI and matching code only talk
 * to this interface, so swapping mock data for SharePoint means writing a new implementation,
 * not touching pages.
 */
export interface ResourceSource {
  getResources(): Promise<Resource[]>;
  getResource(id: string): Promise<Resource | null>;

  // Upkeep writes
  updateResource(id: string, changes: ResourceChanges): Promise<Resource>;
  logCheck(entry: Omit<CheckLog, "id">): Promise<CheckLog>;
  /** Newest first. */
  getChecks(resourceId: string): Promise<CheckLog[]>;
}

import "server-only";
import type { ResourceSource } from "./source";
import { mockSource } from "./mock-source";
import { sharepointSource } from "./sharepoint-source";

// The one place that decides where resource data comes from.
function pickSource(): ResourceSource {
  switch (process.env.DATA_SOURCE ?? "mock") {
    case "sharepoint":
      return sharepointSource;
    case "mock":
      return mockSource;
    default:
      throw new Error(`Unknown DATA_SOURCE "${process.env.DATA_SOURCE}". Use "mock" or "sharepoint".`);
  }
}

export const resources = pickSource();
export const isSampleData = (process.env.DATA_SOURCE ?? "mock") === "mock";

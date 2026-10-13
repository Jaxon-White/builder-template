import type { CheckLog, Resource } from "@/lib/types";
import type { ResourceSource } from "./source";
import { MOCK_RESOURCES } from "./mock-resources";
import { PROVO_RESOURCES } from "./provo-resources";

// DEMO ONLY: changes live in server memory and are lost when the server restarts.
// Stored on globalThis so they survive dev-server hot reloads.
type Store = { resources: Resource[]; checks: CheckLog[] };
const g = globalThis as typeof globalThis & { __findHelpStores?: Record<string, Store> };

function memorySource(key: string, seed: Resource[]): ResourceSource {
  g.__findHelpStores ??= {};
  const store: Store = (g.__findHelpStores[key] ??= { resources: structuredClone(seed), checks: [] });

  return {
    async getResources() {
      return store.resources;
    },
    async getResource(id) {
      return store.resources.find((r) => r.id === id) ?? null;
    },
    async updateResource(id, changes) {
      const i = store.resources.findIndex((r) => r.id === id);
      if (i === -1) throw new Error(`No resource "${id}"`);
      store.resources[i] = { ...store.resources[i], ...changes };
      return store.resources[i];
    },
    async logCheck(entry) {
      const check = { ...entry, id: crypto.randomUUID() };
      store.checks.unshift(check);
      return check;
    },
    async getChecks(resourceId) {
      return store.checks.filter((c) => c.resourceId === resourceId);
    },
  };
}

/** Real Provo-area places, kept in code until the real database is connected. */
export const localSource = memorySource("local", PROVO_RESOURCES);
/** The 25 made-up places, for development. */
export const sampleSource = memorySource("sample", MOCK_RESOURCES);

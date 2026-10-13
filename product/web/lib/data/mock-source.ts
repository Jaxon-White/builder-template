import type { CheckLog, Resource } from "@/lib/types";
import type { ResourceSource } from "./source";
import { MOCK_RESOURCES } from "./mock-resources";

// DEMO ONLY: changes live in server memory and are lost when the server restarts.
// Stored on globalThis so they survive dev-server hot reloads.
type Store = { resources: Resource[]; checks: CheckLog[] };
const g = globalThis as typeof globalThis & { __findHelpStore?: Store };
const store: Store = (g.__findHelpStore ??= {
  resources: structuredClone(MOCK_RESOURCES),
  checks: [],
});

export const mockSource: ResourceSource = {
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

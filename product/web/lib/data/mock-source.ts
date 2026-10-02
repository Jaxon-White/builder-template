import type { ResourceSource } from "./source";
import { MOCK_RESOURCES } from "./mock-resources";

export const mockSource: ResourceSource = {
  async getResources() {
    return MOCK_RESOURCES;
  },
  async getResource(id) {
    return MOCK_RESOURCES.find((r) => r.id === id) ?? null;
  },
};

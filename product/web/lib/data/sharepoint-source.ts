import type { ResourceSource } from "./source";

/**
 * Placeholder for the real backend. When the SharePoint lists exist:
 *
 * 1. Register an app in Microsoft Entra ID with the Graph `Sites.Selected` application
 *    permission (read + write), and grant it access to the site.
 * 2. Get a token with the client-credentials flow using SHAREPOINT_TENANT_ID,
 *    SHAREPOINT_CLIENT_ID and SHAREPOINT_CLIENT_SECRET.
 * 3. Two lists:
 *    - Resources (SHAREPOINT_LIST_ID): one item per resource, one column per field in
 *      lib/types.ts (multi-choice columns for the string-array fields).
 *        read:   GET   /sites/{site}/lists/{list}/items?expand=fields
 *        update: PATCH /sites/{site}/lists/{list}/items/{itemId}/fields
 *    - Check Log (SHAREPOINT_CHECKLOG_LIST_ID): one item per upkeep call (see CheckLog).
 *        create: POST  /sites/{site}/lists/{checkLogList}/items
 *        read:   GET   /sites/{site}/lists/{checkLogList}/items?expand=fields&$filter=fields/resourceId eq '{id}'
 *
 * This only ever runs on the server, so the secret never reaches the browser.
 */
function notImplemented(): never {
  throw new Error(
    "SharePoint data source is not implemented yet. Set DATA_SOURCE=mock to use sample data.",
  );
}

export const sharepointSource: ResourceSource = {
  async getResources() {
    notImplemented();
  },
  async getResource() {
    notImplemented();
  },
  async updateResource() {
    notImplemented();
  },
  async logCheck() {
    notImplemented();
  },
  async getChecks() {
    notImplemented();
  },
};

import type { ResourceSource } from "./source";

/**
 * Placeholder for the real backend. When the SharePoint list exists:
 *
 * 1. Register an app in Microsoft Entra ID with the Graph `Sites.Selected` (or
 *    `Sites.Read.All`) application permission, and grant it access to the site.
 * 2. Get a token with the client-credentials flow using SHAREPOINT_TENANT_ID,
 *    SHAREPOINT_CLIENT_ID and SHAREPOINT_CLIENT_SECRET.
 * 3. Read items:
 *      GET https://graph.microsoft.com/v1.0/sites/{SHAREPOINT_SITE_ID}/lists/{SHAREPOINT_LIST_ID}/items?expand=fields
 * 4. Map each item's `fields` to a `Resource` (see lib/types.ts; one column per field,
 *    multi-choice columns for the string-array fields).
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
};

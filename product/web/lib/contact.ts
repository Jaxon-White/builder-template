import type { Resource } from "@/lib/types";

// Shared by the Call / Directions / Share / Print buttons and the printable sheet.

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Confidential places (e.g. abuse shelters) have no street address, only "Call first". */
export function hasStreetAddress(r: Resource) {
  return /\d/.test(r.address);
}

export function mapsHref(r: Resource) {
  const q = encodeURIComponent(`${r.address}, ${r.city}, ${r.state}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/** A maps link short and plain enough to type from paper: maps.google.com/?q=1550+N+200+W,+Provo,+UT */
export function printableMapsLink(r: Resource) {
  const q = `${r.address}, ${r.city}, ${r.state}`.replace(/[#&?]/g, "").replace(/\s+/g, "+");
  return `maps.google.com/?q=${q}`;
}

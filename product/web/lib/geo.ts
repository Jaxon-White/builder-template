// Straight-line distance from one fixed point. The prototype pretends everyone is in central
// Provo; real device location is out of scope (spec 004).

export const PROVO_CENTER = { lat: 40.2338, lng: -111.6585 };

/** Browse-by-need shows places within this many miles of PROVO_CENTER. */
export const NEARBY_RADIUS_MILES = 5;

const EARTH_RADIUS_MILES = 3958.8;

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance in miles between two points. */
export function milesBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h));
}

/** Miles from PROVO_CENTER, or null when the place has no coordinates (confidential address). */
export function milesFromProvo(r: { lat?: number; lng?: number }): number | null {
  if (r.lat === undefined || r.lng === undefined) return null;
  return milesBetween(PROVO_CENTER, { lat: r.lat, lng: r.lng });
}

export function distanceText(miles: number): string {
  return miles < 0.1 ? "Under 0.1 mi away" : `${miles.toFixed(1)} mi away`;
}

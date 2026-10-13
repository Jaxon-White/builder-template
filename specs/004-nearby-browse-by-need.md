# Spec 004: Show only nearby places when browsing by need

**Status:** Building (radius 5 mi, Refuge shown without distance; confirmed by builder)
**Date:** 2026-10-13

## Problem

The home page has an "Or browse by need" section (food, shelter, medical, ...). Each link opens
`/resources?category=...`, which lists every place in the data, including ones across the county.
A bishop or RS president in Provo doesn't need a clinic in Orem or Salt Lake shown first, or at all.

Spec 001 deliberately left out distance sorting. This spec adds it, for browse-by-need only.

## What we're building

- Each place gets approximate coordinates (`lat`, `lng`) in the data, so distance can be computed.
- For the prototype, distance is measured from a fixed reference point: **Provo city center**
  (approx. 40.2338, -111.6585). Real device location is out of scope.
- Browse-by-need results (`/resources?category=...`) show only places within **[RADIUS, to confirm]**
  of the reference point, sorted nearest first.
- Each card shows its distance, e.g. "1.2 mi away".
- Searching or filtering with "Browse all resources" keeps working as it does now, unless the
  decision below says otherwise.
- If a need has no places within the radius, say so and offer "Show places farther away"
  (shows the full list for that need, labeled with distances).

## Open decisions (need the builder's answer)

1. **Radius:** 3 miles, 5 miles, or 10 miles from Provo city center?
2. **The Refuge Utah** has a confidential address (no coordinates). Options:
   a. Hide it from distance-filtered lists (it still appears on "Browse all" and in the
      abuse-survivor path of the intake).
   b. Show it in every list with no distance, labeled "Location confidential, call first."
3. **Scope:** only the browse-by-need links on the home page, or also the `/resources` page filters?

## Out of scope

- Real device geolocation or asking the user for their address.
- Driving or transit time (straight-line distance only).
- Changing the intake flow's matching logic (`lib/match.ts`).
- Geocoding in SharePoint. For now the coordinates live in `lib/data/provo-resources.ts`; the
  SharePoint source needs `lat` and `lng` columns later.

## Definition of done

- [ ] Opening "Food" from the home page shows only places within the radius, nearest first.
- [ ] Each card shows its distance from Provo city center.
- [ ] A need with nothing nearby shows a clear message and a way to see farther places.
- [ ] The confidential-address place is handled per decision 2.
- [ ] Coordinates are approximate and noted as such in the data file.
- [ ] Deployed to the live URL.
- [ ] Success signal: a bishop or RS president says the list felt relevant in a usability session.

# Spec 005: Details missionaries need, vetted mark, county search, Print

**Status:** Shipped
**Date:** 2026-10-16

## Problem

DI workers reviewed the app on 2026-10-15 (design/usability-tests/002-di-workers.md). Compared
with WSRS, which they already use, place pages are too thin to help someone, the SNAP listing's
"Anyone can apply" is wrong, nothing shows whether a place has been vetted, search can't find
places by county or state, and there's no way to print a place's information.

We don't have WSRS access yet, so details come from each program's official pages (decision
005) until it does.

## What we're building

- **Search by county and state.** Each place has a county and state. Search matches them (and
  the address), and every word in the query has to match, so "food utah county" works.
- **Vetted mark.** "Vetted" means a missionary confirmed it by phone in the last 60 days and
  could reach them. Cards and place pages show Vetted or Not vetted next to Open/Closed.
- **Detailed place pages.** New sections: Who qualifies (a list), How to apply, What to bring,
  Languages, County / State, and Sources (links to the official pages the details came from).
  Empty sections say "Call to ask." Missionaries can correct all of them on the upkeep form.
- **Correct, sourced facts.** All 10 Provo places re-researched from official pages. SNAP shows
  the qualifiers from DWS's own pages. "Anyone can apply" is gone.
- **Print.** A Print button next to Directions, on cards and place pages. It prints a one-page
  sheet: name, phone, address and directions link, hours, who qualifies, how to apply, what to
  bring, website, and the date printed.

## Out of scope

- Importing WSRS data (no access yet)
- Saving upkeep edits past a restart (decision 003)
- Places outside Utah County

## Definition of done

- [x] Searching "utah county", "UT" and "food provo" each find places
- [x] A place never confirmed by phone shows Not vetted; after a "Still running" call it shows Vetted
- [x] Workforce Services shows SNAP qualifiers with a jobs.utah.gov source; "Anyone can apply" appears nowhere
- [x] Every Provo place lists at least one official source, and each source link works
- [x] Print from a card and from a place page prints the one-page sheet, without the app's header
- [x] Works at phone width
- [ ] Deployed to live URL
- [ ] Show DI workers the new place page and ask whether it has what they use from WSRS

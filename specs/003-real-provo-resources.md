# Spec 003: Real Provo-area resources

**Status:** Building
**Date:** 2026-10-12

## Problem

The app only has 25 made-up places, so no one can actually use it. Access to the real database
is blocked (Sprint 2 plan update). Sprint 3's goal is to put at least 10 real places in the
live app and get real people using it.

Research finding: Utah County has no year-round general homeless shelter. The sample men's,
women's and family shelters don't exist, so a leader searching for "a place to sleep tonight"
needs to be told what the real options are.

## What we're building

- Replace the sample data with 10 real places near Provo, across different needs:
  - food (2)
  - shelter for abuse survivors
  - medical (2)
  - mental health crisis
  - addiction recovery
  - benefits and documents (2)
  - clothing
- Each place carries the source it came from, because nothing has been confirmed by phone yet.
- Places that haven't been confirmed show "Not confirmed by phone yet. Call ahead." instead of
  "Checked N days ago". They sit at the top of the upkeep call list.
- Where hours aren't reliable, show "Call for hours" instead of a wrong Open / Closed badge.
- If someone needs a place to sleep and nothing matches, show the real options: call 211, ask
  Community Action Services about emergency help, and in winter the county warming center.
- The 25 sample places stay available for development (`DATA_SOURCE=sample`) but are off by
  default.

## Out of scope

- Confirming each place by phone. That's the builder's task; results get written into the
  data file, since upkeep calls don't persist yet.
- Places outside the Provo / Orem area
- The real database or SharePoint connection

## Definition of done

- [ ] The live app shows the 10 real places and no sample places
- [ ] Unconfirmed places say so on the card and detail page
- [ ] A "place to sleep" search with no match shows the real options
- [ ] The prototype banner no longer says "sample data"

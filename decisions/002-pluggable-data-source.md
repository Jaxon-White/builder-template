# Decision 002: Put resource data behind a swappable data source

**Date:** 2026-10-01
**Status:** Active

## Context

Resource data (shelters, food, clinics) will most likely come from a SharePoint list, but
that backend doesn't exist yet. I need a working prototype now for the professor demo.

## Options considered

1. **Hardcode mock data straight into the pages**: pros: fastest / cons: every page would
   need rewriting when SharePoint arrives.
2. **Use the linked Supabase project**: pros: a real database already set up / cons: builds
   on a backend we probably won't use; the data's real home is SharePoint.
3. **A `ResourceSource` interface with a mock version now and a SharePoint version later**:
   pros: UI and matching code never change when the source does; the swap is one file plus
   an env var / cons: a little more structure up front.

## Decision

Option 3. Deciding reason: SharePoint is the likely data home, and this lets me build the
whole front end today without betting on how that integration ends up looking.

## What would change our mind

The church or professor says the data won't live in SharePoint, or we need leaders to write
data (notes, feedback) before SharePoint is ready. In that case, revisit Supabase.

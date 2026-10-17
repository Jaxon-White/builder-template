# Spec 006: A real place for every kind of help, and seasonal hours

**Status:** Shipped
**Date:** 2026-10-16

## Problem

Transportation had no real place, so "A ride or bus pass" stayed hidden, and the
"Immigrant or refugee" option had nothing behind it. For a place to sleep, the app only said
"no year-round shelter," even though Community Action offers motel nights and a winter warming
center. The warming center is only open November to March, which the app couldn't show.

## What we're building

- Four new real places, sourced from official pages (decision 005):
  - **UTA Reduced Fare** (transportation)
  - **Elevate Utah**, formerly Centro Hispano (immigrants and refugees; ID, documents and food)
  - **Community Action Motel Shelter** (shelter, 1–3 nights, case by case)
  - **Brenda's Warming Center** (shelter, nightly Nov 1, 2026 – Mar 15, 2027)
- **Season dates.** A place can have a first and last day it's open. Outside the season it
  shows Closed and "Closed for the season (opens Nov 1)".
- **Single adults.** A new "Single adults and couples (no children)" group, so the warming
  center isn't offered to someone with children (they're pointed to the motel shelter).
- **Season ranking.** Out-of-season places drop to the bottom of results.
- **Cost wording.** Places that aren't free say "Ask about cost; see details" instead of
  "Fees apply," since several new places don't state a cost.

## Out of scope

- Editing season dates on the upkeep form
- More than one place per kind of help beyond these four

## Definition of done

- [x] Every kind of help in the survey has at least one real place, and "A ride or bus pass" shows again
- [x] In October the warming center shows Closed with "opens Nov 1"; on a November night it shows Open
- [x] Picking "Immigrant or refugee" puts Elevate Utah first
- [x] Each new place lists official sources, and each link works
- [ ] Deployed to live URL

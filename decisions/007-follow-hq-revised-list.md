# Decision 007: Followed HQ's revised list, kept organizations whole for now

**Date:** 2026-11-09
**Status:** Active

## Context

HQ's 29 October revision (spec 008) drops Financial Assistance, adds subcategory definitions
and 16 standard For groups, and sets filing rules: file programs, not organizations; one
category per program, two only when both are central; mark a For group only when a program is
restricted to it. Two of the app's groups, "abuse survivors" (The Refuge) and "single adults"
(Brenda's Warming Center), aren't in HQ's list.

## Options considered

1. **Split organizations into programs now**: matches HQ's filing rule / needs a new data model
   and re-sourced hours and eligibility for each program (decision 005).
2. **Split later; keep each place's extra categories for now**: lines up the words now, keeps
   places findable for everything they offer / still breaks HQ's one-or-two-categories rule for
   four places.
3. **Cut every place to two categories**: matches the rule / Food & Care's dental and medical care
   would stop showing up for those needs.

For the two groups:

1. **Use only HQ's 16 groups**: exact match / families would be sent to Brenda's, which turns them
   away.
2. **HQ's 16 plus an app-only "No children" flag**: The Refuge is found through Domestic
   Violence; Brenda's stays hidden from families / one field HQ doesn't have.
3. **Keep both as extra groups**: today's behavior / the group list no longer matches HQ.

## Decision

Option 2 both times. The deciding reason: line up with HQ's words now, without making the app
send anyone somewhere that can't help them.

## What would change our mind

HQ adding a "no children" or similar group (drop the flag), or HQ confirming how it files
multi-program organizations (start the split).

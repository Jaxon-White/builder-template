# Spec 007: Use church HQ's 19 categories

**Status:** Shipped
**Date:** 2026-10-29

## Problem

Church HQ shared the category list its offices use for resources: 19 categories, each with
subcategories. The app had its own 8 categories (shelter, food, medical, mental health,
recovery, documents, transportation, clothing). Using HQ's list makes the app line up with the
app HQ already has (Sprint 4 goal) and covers needs the app had no place for, like housing,
utilities, legal help and reentry.

## What we're building

- **19 categories, named as HQ names them:** Addiction, Clothing/Household, Disability,
  Domestic Violence, Education, Employment, Financial Assistance, Food, Homeless Services,
  Housing, ID Replacement, Legal, Medical/Dental/Vision, Mental Health, Reentry, Seniors,
  Transportation, Utilities, Veterans.
- **Grouped intake.** All 19 at once was too many, so the "What do they need?" step shows 7
  urgent needs in plain words ("A place to sleep, meals, showers or mail"), with 8 more behind a
  "More needs" button. "Help paying a bill" covers Financial Assistance and Utilities.
- **Groups are situations, not needs.** Veterans, Seniors and Reentry move to "Does any of this
  apply?" as Veteran, Older adult and Recently released from jail or prison. Disability is split:
  "Approved for disability benefits (SSI or SSDI)" is a situation, because many programs require
  official approval, not just a disability. "Help applying for disability benefits" is a need.
  Picking a group also searches that group's programs and moves them up. It never hides other
  places; each place's "Who qualifies" says the exact requirement.
- If a need or group has no place in the app yet, results say so instead of a bare
  "No close matches."
- **Home page and Resources chips** still show only categories some place covers.
- **Shelters go under Homeless Services.** The Refuge (abuse shelter) goes under Domestic
  Violence and also offers Homeless Services.
- **Old links keep working:** shelter → Homeless Services, recovery → Addiction,
  documents → ID Replacement, clothing → Clothing/Household.
- **Places re-tagged** from their sourced descriptions (decision 005):
  - Workforce Services → Employment; also Food, Medical/Dental/Vision (SNAP, Medicaid)
  - Elevate Utah → Legal (immigration); also Food, Education (English, citizenship classes)
  - Deseret Industries → Clothing/Household; also Employment (job training)
  - Food & Care Coalition → Food; also Homeless Services, Medical/Dental/Vision, Mental Health
- "Who it serves" groups (veterans, abuse survivors, …) stay. A category is a program built
  for that group; a group is who a place will take.

- **Tags and search.** Each place has tags for what it offers and who it's for, using HQ's
  subcategory names where they fit ("Meals", "Showers and laundry"). Like the other details,
  tags come only from official pages (decision 005). The Resources search matches tags, ignores
  filler words ("someone who is blind" searches "blind"), and shows the matching tag first on
  each card (up to 4 tags; the place page shows all). Upkeep volunteers can edit tags. A tag
  only helps once someone adds it, so "blind" finds nothing until a place for blind people is
  added with that tag. In SharePoint, `tags` is a multi-line text column.

## Out of scope

- Subcategories (next change: a field per place and a second row of filter chips).
- Overlaps in HQ's list to raise with them: Emergency shelter is under both Housing and
  Homeless Services; Meals under Food and Homeless Services; Reentry has no subcategories.
- SharePoint: the `category` and `alsoOffers` choice columns need the new values when the list
  is set up. No code change; the SharePoint source doesn't map categories.

## Definition of done

- [ ] Intake shows 7 needs plus "More needs"; Food + Veteran says no veteran places are in the app yet
- [ ] "A place to sleep…" still ranks shelters first and shows the no-shelter help when none match
- [ ] `/matches?need=shelter` and `/resources?category=documents` still work
- [ ] Searching "someone who needs spanish" finds the three places tagged Spanish
- [ ] Deployed to live URL
- [ ] Shown to HQ contact; ask whether the labels and intake wording read right to them

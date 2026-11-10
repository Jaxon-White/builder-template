# Spec 008: HQ's revised categories, subcategories and For groups

**Status:** Shipped
**Date:** 2026-11-09

## Problem

Church HQ revised its list on 29 October 2026 ("Standard Categories and For Groups for TSO
Resources", revised working draft). The app adopted the earlier 19-category version a few hours
before (spec 007). The revision drops a category, renames two, finishes the subcategories with a
plain-language definition for each, and adds 16 standard "For groups" to replace each office's
own list of who a program serves. To line up with HQ, the app needs the same words.

## What we're building

- **18 categories.** Financial Assistance is gone (work-related costs are now Employment ›
  Financial assistance). Legal is now "Legal and Tax Help"; Utilities is now "Utilities, Phone,
  Internet". Old links with `financial-assistance` go to Utilities. Intake's "Help paying a bill"
  becomes "Help with power, phone or internet bills".
- **Subcategories, with HQ's definitions,** stored as data in `lib/subcategories.ts` along with
  each category's "What it covers".
  - Each place gets a `subcategories` field holding only HQ's approved names. Tags that were
    already HQ subcategory names move there; other tags ("Spanish", "Sliding fee") stay as tags.
    Workforce Services' "Food stamps (SNAP)" and "Medicaid" become HQ's "Food benefits (SNAP,
    WIC)" and "Health coverage (Medicaid, CHIP, Marketplace)".
  - Resources: picking a category shows what it covers and a second row of chips for the
    subcategories some place has. Hovering a chip shows its definition; picking one also shows
    the definition under the chips, since phones can't hover.
  - Cards show subcategories first under "Helps with", then tags. The place page lists each
    subcategory with its definition. Search matches subcategory names.
  - Subcategories aren't editable in upkeep: HQ says new options go through review, not
    office-made labels.
- **HQ's 16 For groups replace "Who it serves".** Following HQ's rule, a group is marked only
  when a program is restricted to it, so an empty list means open to everyone (the old
  "everyone" value is gone).
  - "Under 25" in intake splits into HQ's "Under 18" and "Young adult (18 to 24)". Old
    `also=youth` links mean young adult.
  - Intake answers place the person in groups: man, woman, with children (Families), veteran,
    immigrant, older adult (Seniors), approved for SSI/SSDI (Individual with disability),
    recently released (People with a criminal record), and the two age groups.
  - A place restricted to groups is hidden only when the person is in none of them *and* intake
    asks about all of them. Groups intake doesn't ask about (Pregnant, Uninsured, Students,
    Native Americans, Single parents, Medically vulnerable) never hide a place; "Who qualifies"
    says the requirement.
  - "Fleeing abuse" now searches the Domestic Violence category, the way veteran searches
    Veterans, and The Refuge is found through that category instead of an "abuse survivors"
    group.
  - **One app-only flag:** `noChildren` hides Brenda's Warming Center from people with children,
    as "single adults" did before, so a family isn't sent to a shelter that turns them away.
  - The Resources "Serves" chips become "For" chips: the groups some place is restricted to.
- **Place page and cards:** "Who it serves" becomes "For", with "Open to everyone" when empty.

## Out of scope

- **Filing programs, not organizations,** and HQ's "one category, two only if both are central".
  Food & Care Coalition, The Refuge, Workforce Services and Elevate Utah still list more than
  two. Splitting them needs each program's own sourced hours and eligibility (decision 005), so
  it gets its own spec.
- New intake questions for the groups intake doesn't ask about.
- HQ's open overlaps, still to raise with them: Emergency shelter (Homeless Services) vs
  Emergency sheltering (Housing); Meals under both Food and Homeless Services.
- SharePoint columns: `subcategories` (multi-choice) and `noChildren` (yes/no) to add when the
  list is set up; `serves` choices become the 16 groups.

## Definition of done

- [ ] 18 categories with HQ's labels; `/matches?need=financial-assistance` shows utilities
- [ ] Resources › Food shows "What it covers" and a Food pantries chip with its definition
- [ ] Workforce Services shows Food benefits (SNAP, WIC) on its card and place page
- [ ] With children + "A place to sleep…" doesn't show Brenda's; on their own it does
- [ ] Fleeing abuse + Food ranks The Refuge first
- [ ] Deployed to live URL
- [ ] Shown to HQ contact with the open overlaps

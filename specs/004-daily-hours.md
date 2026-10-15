# Spec 004: Different hours for each day

**Status:** Shipped
**Date:** 2026-10-15

## Problem

A lot of places have different hours on different days, but the app stores one opening time,
one closing time and a list of open days. Upkeep missionaries can't record hours like
"Mon 9 AM – 6 PM; Tue – Sat 9 AM – 7 PM", so the app saves 9 AM – 6 PM for every day and
tells a leader a place is closed at 6:30 on a Tuesday when it is open.

Evidence: 1 of the 10 real Provo places (spec 003) already has hours like this, and 2 more have
different walk-in times on different days and are stored as "Call for hours".

## What we're building

### Hours are stored per day

- Each place has its own hours for each day of the week: an opening time and closing time, or
  closed that day.
- Stored as 7 flat fields (`hoursSun` … `hoursSat`), each `"HH:MM-HH:MM"` or `""` for closed, so
  each maps to one SharePoint text column.
- Overnight hours still work per day (e.g. Fri `"18:00-08:00"` means open Friday night into
  Saturday morning).
- "Open 24 hours" and "Call for hours" (`hoursKnown: false`) stay as they are.
- Replaces `openDays`, `opensAt` and `closesAt`.

### Upkeep form: edit hours day by day (`/upkeep/[id]`)

- The "Fix details" section shows 7 rows, Sun to Sat. Tapping a day's name marks it open or
  closed; open days show opening and closing times, closed days say "Closed". (A separate Closed
  checkbox squeezed the time boxes so AM/PM was cut off at phone width.)
- A "Copy Mon's hours to all open days" button, named for the first open day, so a place with
  the same hours every weekday takes one edit, not five.
- Saving any day's hours marks the hours as known, as now.
- The call history records which days changed (e.g. "Updated Tue hours, Sat hours").

### What leaders see

- **Open now / Closed** uses that day's hours.
- **The hours line** on cards, detail pages and Share is generated from the daily hours, grouping
  days with the same hours: "Mon 9 AM – 6 PM; Tue – Sat 9 AM – 7 PM". It can't disagree with
  Open now any more.
- The free-text hours field becomes an optional **Hours note** for things times can't say
  ("Walk-ins first come, first served; call first"). It shows under the generated hours.

### Data

- The 10 Provo places and the sample data are converted to per-day hours. The one with
  different hours per day gets its real hours; the rest keep their current hours on each open
  day. Their current hours text becomes the hours note only where it says more than the times.

## Out of scope

- More than one time range in a day (e.g. closed for lunch 12 – 1). Use the hours note.
- Holiday hours or one-off closures.
- Different hours for different services at one place (e.g. meals vs. day services).
- Renaming the "Upkeep" role to "Missionary" in the app.

## Definition of done

- [x] On a place's upkeep page, a missionary can give Monday different hours from Tuesday, save,
      and see both on the leader's detail page
- [x] "Copy … to all open days" fills every open day with the first open day's hours
- [x] A place open Mon 9 – 6 and Tue 9 – 7 shows Open at 6:30 PM on Tuesday and Closed at 6:30
      PM on Monday
- [x] Overnight hours on one day show Open the next morning, and not on a day it's closed
- [x] The hours line groups matching days ("Tue – Sat 9 AM – 7 PM")
- [x] All 10 Provo places still show the same Open/Closed as before, except the one that was wrong
- [x] Works at phone width
- [ ] Deployed to live URL
- [ ] Ask the DI workers whether missionaries can keep daily hours up to date on a monthly call

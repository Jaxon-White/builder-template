# Spec 001: Prototype front end (intake, directory, handoff)

**Status:** Draft
**Date:** 2026-10-01

## Problem

A bishop or Relief Society president has a homeless person in front of them and needs to find
somewhere to send them, fast, usually from a phone. Today that likely means asking around or
searching the web. This is an assumption: no leader has confirmed it yet (see CLAUDE.md,
biggest open risk). The prototype exists to put something concrete in front of the professor
and, next, in front of real leaders.

## What we're building

A phone-first Next.js web app with three flows:

1. **Guided intake → matches** (main action on the home screen)
   - 4 to 6 tap-to-answer questions, one per screen:
     1. What do they need most right now? (bed tonight, food, medical, mental health,
        addiction recovery, ID/documents, transportation; multi-select)
     2. Who is with them? (alone, with kids, with partner)
     3. Anything that applies? (veteran, fleeing abuse, has pets, youth under 25; optional)
     4. Gender, for shelters that serve only men or women (optional, can skip)
   - Results ranked by fit, each with a one-line reason ("Serves families · has beds tonight").
   - Nothing that identifies the person is asked for or stored.
2. **Directory search**
   - Text search plus filter chips: category, "open now", and who the resource serves.
   - Resource card: name, category, hours, open/closed now, address, eligibility notes.
   - Resource detail page with everything above.
3. **Handoff** (on every card and detail page)
   - Tap to call (`tel:` link).
   - Directions (opens Google/Apple Maps with the address).
   - Share: the native share sheet when available, otherwise copy a plain-text summary
     (name, phone, address, hours) that a leader can text to the person.

### Data layer: pluggable for SharePoint

The resource data will eventually come from a SharePoint list. That backend doesn't exist
yet, so:

- `lib/types.ts`: `Resource` and `IntakeAnswers`, with flat fields (strings, booleans, string
  arrays) that map cleanly to SharePoint list columns.
- `lib/data/source.ts`: a `ResourceSource` interface with `getResources()` and `getResource(id)`.
- `lib/data/mock-source.ts`: backed by `lib/data/mock-resources.ts`, which holds about 25
  realistic Utah County resources with clearly fake phone numbers (555) and addresses.
- `lib/data/sharepoint-source.ts`: a stub that throws "not implemented", documenting the
  Microsoft Graph call and the env vars it will need.
- `lib/data/index.ts`: picks the source from `DATA_SOURCE` (default `mock`), documented in
  `.env.example`.
- All data is fetched server-side, so SharePoint credentials never reach the browser.
- `lib/match.ts`: a pure function that takes `IntakeAnswers` and `Resource[]` and returns
  ranked results with reasons. It doesn't care where the data came from.

### Stack

- Next.js (App Router), TypeScript, Tailwind CSS, all from `create-next-app` defaults.
- No other dependencies.
- The app lives in `product/web/`.

## Out of scope

- Accounts or login
- Saving or tracking people (case management)
- The real SharePoint integration (stub only)
- Admin screens for editing resources
- Real geolocation or distance sorting (the location question is skipped for now; all mock
  resources are in Utah County)
- Deploying (local only for the professor demo)

## Definition of done

- [ ] `npm run dev` in `product/web` runs the app
- [ ] At phone width (375px), I can go intake → matches → call/directions/share
- [ ] At phone width, I can go search → filter → resource detail → call/directions/share
- [ ] Switching `DATA_SOURCE=sharepoint` fails with a clear "not implemented" message,
      which proves the swap point exists
- [ ] Professor demo done; write down what they reacted to

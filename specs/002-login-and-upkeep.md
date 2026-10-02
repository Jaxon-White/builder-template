# Spec 002: Login and monthly upkeep calls

**Status:** Draft
**Date:** 2026-10-01

## Problem

Two needs:

1. **Only approved people should use the app.** Bishops and Relief Society presidents use it to
   find help; it isn't a public directory.
2. **Listings go stale.** A shelter that closed or changed its hours is worse than no listing,
   because a leader sends someone there at night. Someone needs to call each place about once a
   month and confirm it's still running.

Both are assumptions from the professor conversation; no leader or upkeep volunteer has
confirmed them yet.

## Who

- **Church official** (bishop, Relief Society president): signs in, uses the finder (intake,
  directory, handoff). Same as Spec 001, now behind login.
- **Upkeep person**: everything an official can do, plus the upkeep tools below.

## What we're building

### Login (required for everything)

- Every page except `/login` requires sign-in. Signed-out visitors are redirected to `/login`.
- The goal is **Sign in with Microsoft**. That needs an app registration in the organization's
  Microsoft Entra ID (Azure AD), which an admin of that tenant has to create. Until then:
- **Demo sign-in**: `/login` shows a "Sign in with Microsoft" button styled as it will be,
  which opens a demo picker of sample accounts (e.g. "Bishop (demo)", "Relief Society
  president (demo)", "Upkeep volunteer (demo)"). Picking one signs you in with that role.
- Built behind a swappable auth layer, like the data source:
  - `lib/auth/` exposes `getUser()`, `requireUser()`, `requireRole()`, `signIn()` and
    `signOut()`.
  - `AUTH_MODE=demo` (default) or `AUTH_MODE=microsoft` (stub that throws "not configured",
    documenting the Entra setup and env vars: tenant ID, client ID, client secret).
  - The session is an HTTP-only, signed cookie, checked on the server.
- The header shows who is signed in, their role, and a sign-out link.
- Roles come from a simple allow-list for now (the demo accounts). Real role assignment (which
  Microsoft accounts are officials or upkeep) is decided when Microsoft login is wired up.

### Upkeep: monthly call queue (`/upkeep`, upkeep role only)

- A list of every resource, ordered by most overdue:
  - **Overdue**: not checked in 60+ days
  - **Due**: 30–59 days
  - **Up to date**: checked in the last 30 days
  - plus anything marked closed or unreachable
- Each row: name, city, phone (tap to call), "Last checked N days ago", status.
- Summary at the top: "6 due, 3 overdue".

### Upkeep: record a call (`/upkeep/[id]`)

- Tap to call the place.
- Pick the outcome:
  - **Still running**: sets `lastVerified` to today.
  - **Closed**: hides it from the finder.
  - **Couldn't reach**: stays visible, but leaders see a "Couldn't reach on last check" warning.
- Edit details while on the phone: phone, address, city, hours text, open/close times, open
  days, eligibility, description.
- Leave an optional note (e.g. "beds full on weekends").
- Saves with a server action. History of past calls (date, who, outcome, note) is shown below
  the form.

### What officials see change

- Closed resources no longer appear in intake results or the directory.
- Resource cards and detail pages show "Checked N days ago". Listings over 60 days old, or
  marked couldn't reach, show a "Call ahead, this may be out of date" warning.

### Data

- `Resource` gains `status: "active" | "closed" | "unreachable"`.
- New `CheckLog` record: resource ID, date, who, outcome, note, which fields changed.
- `ResourceSource` gains `updateResource(id, changes)`, `logCheck(entry)` and
  `getChecks(resourceId)`.
- **Storage is faked for the demo**: the mock source keeps changes in server memory. They
  persist while the server is running and are lost on restart. The SharePoint source gets the
  same methods as stubs. (Two SharePoint lists: Resources and Check Log.)
- Mock `lastVerified` dates are spread out so the queue has a realistic mix of due, overdue
  and current listings.

## Out of scope

- Real Microsoft sign-in (needs a tenant admin; stub plus documented setup only)
- Inviting users, managing roles, or an admin screen
- Real saving (database or SharePoint writes)
- Assigning resources to specific upkeep people, reminders or notifications
- Adding brand-new resources (edit existing only)

## Definition of done

- [ ] Visiting any page signed out redirects to `/login`
- [ ] Signing in as an official shows the finder; `/upkeep` is refused
- [ ] Signing in as upkeep shows an "Upkeep" link and the queue, ordered by most overdue
- [ ] Recording "Still running" moves that resource to "up to date" in the queue
- [ ] Recording "Closed" removes it from the finder; "Couldn't reach" shows the warning to officials
- [ ] Editing hours or phone shows the new values in the finder immediately
- [ ] `AUTH_MODE=microsoft` fails with a clear "not configured" message
- [ ] Works at phone width

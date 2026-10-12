# Decision 004: Sign in with Church Account instead of Microsoft

**Date:** 2026-10-12
**Status:** Active

## Context

Spec 002 and decision 003 planned for "Sign in with Microsoft" as the real login. The people
using the app (bishops, Relief Society presidents, and now DI workers) all have a Church
Account, and that is the login they already use for Church tools. Microsoft sign-in would also
need an admin of a Microsoft 365 tenant we don't have access to.

Church Account sign-in is run by the Church. To use it, the Church has to register the app and
issue a client ID and secret. As far as we know there is no public developer sign-up: it needs
a sponsoring Church department and approval from Church IT (ICS). DI is Church-run, so Welfare
/ DI is the likely sponsor. This has not been asked yet.

## Options considered

1. **Sign in with Microsoft** (the previous plan): pros: standard, well documented / cons: not
   the account our users think of as their Church login; still needs a tenant admin we don't
   have.
2. **Sign in with Church Account**: pros: the account every user already has; the login a
   Church-run program would expect / cons: needs Church registration and approval, which we
   don't control and may take a long time or be refused.
3. **Email login with an allow-list (Supabase)**: pros: real logins today with no one's
   approval / cons: another password or link to manage; not the Church login.

## Decision

Option 2, built behind the existing `AUTH_MODE` switch (`AUTH_MODE=church`). Demo sign-in stays
on until the Church approves the app. Deciding reason: our users already have a Church Account,
and asking them to use a different login is a reason a Church program would say no.

The login button says "Sign in with Church Account" in plain text, with no Church logo or
branding, until the app is approved.

## What would change our mind

- The Church says no, or there is no answer after asking the professor and DI: fall back to
  option 3 for real users.
- DI workers need real (not demo) logins before approval comes through: use option 3 in the
  meantime, as decision 003 already allows.

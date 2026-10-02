# Decision 003: Demo Microsoft login and in-memory saving until real backends exist

**Date:** 2026-10-01
**Status:** Active

## Context

The app now needs sign-in (officials and upkeep people) and needs to save upkeep calls and
edits. The goal is Microsoft sign-in, but that requires an app registration by an admin of
the organization's Microsoft 365 tenant, which we don't have. The resource data's long-term
home is SharePoint (decision 002), which also doesn't exist yet.

Decision 002 said to revisit Supabase if leaders needed to write data before SharePoint was
ready. That has happened.

## Options considered

1. **Supabase for auth and saving now**: pros: real logins and real saving today, project
   already linked / cons: email login, not Microsoft; builds data on a backend we expect to
   replace with SharePoint.
2. **Real Microsoft sign-in now**: pros: final login experience / cons: blocked on a tenant
   admin we don't have access to yet.
3. **Demo sign-in and in-memory saving, both behind swappable layers**
   (`AUTH_MODE`, `DATA_SOURCE`): pros: the full flow works for the demo today, and nothing in
   the UI changes when Microsoft and SharePoint arrive / cons: nothing is saved across restarts,
   and the demo login is not secure for real use.

## Decision

Option 3. Deciding reason: the next milestone is a demo, and both real backends are blocked on
access we don't have yet, so we fake the backend but keep the seams real.

## What would change our mind

We need real people using it (not a demo) before the Microsoft tenant admin is available, or
the data turns out not to live in SharePoint. Then use option 1 (Supabase).

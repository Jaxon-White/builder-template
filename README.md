# Homeless help finder for church leaders (working title)

> A tool that helps bishops and Relief Society presidents find help for homeless people who
> come to them. Not yet validated with those leaders.

**Live:** [URL]
**Built by:** Jaxon White, MSB 341 Product Management, BYU

## Context

Fill this in during Sprint 1 and keep it current. Every sprint is read against it.

- **What I am building:** A tool that helps church leaders find help for homeless people.
  The specific product is not decided yet.
- **Who it is for:** Bishops and Relief Society presidents.
- **My role:** Developer. A professor brought me the idea and is helping.
- **My user:** Bishops and Relief Society presidents. I am assuming the church wants this;
  no leader has confirmed the need yet.

**What changed (Sprint 1, 2026-09-28):** This repo started as a billing and time-tracking
tool for consulting companies. After 6 interviews showed little pain there, I pivoted to
this project. See `decisions/001-pivot-to-church-homelessness-help.md`.

If your situation changes, revise this and note what changed. That is normal; a silent
mismatch between this file and your work is not.

## What is in this repo

| Folder | What lives here |
|---|---|
| `sprints/` | One plan and one review per sprint |
| `discovery/` | Interviews, personas, what you learned about your user |
| `design/` | Flows, screens, usability test notes |
| `product/` | The build itself |
| `specs/` | One spec per feature, written before building it |
| `gtm/` | Launch, channels, copy, experiments |
| `metrics/` | What you measure and what it says |
| `decisions/` | Numbered records of what you decided and why |

Non-code work belongs here too. An interview, a pricing model, a landing page draft, and a
usability finding are all artifacts, and they get committed like anything else.

If you build an AI feature, put its eval set in `product/evals/`. A test set is how you know
whether a change to a prompt helped or hurt.

## Running it

[How to run this locally. Fill in once you have a stack.]

## Sprints

Each sprint:

```bash
/sprint-plan     # day one, then commit the plan
# ...build...
/sprint-review   # last day, then commit the report and write your retro
```

## Ground rules

- **Spec before build.** For anything non-trivial, the spec's commit should predate the
  feature's commits.
- **Decisions get recorded.** When you make a real choice, write it in `decisions/` with the
  alternatives you rejected.
- **No real customer contact details anywhere in this repo.** Anonymize people in interview
  notes: "dental office manager, Provo" rather than a name and an email.
- **Keep `CLAUDE.md` current.** It is what your agent knows about your work. Stale context
  produces bad output.

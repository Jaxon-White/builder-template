# Billing and time-tracking tool for consulting companies (working title)

> A tool to reduce billing and time-tracking pain for consulting companies — not yet
> validated. Sprint 1 is talking to 10 consulting companies to find out.

**Live:** [URL]
**Built by:** Jaxon White, MSB 341 Product Management, BYU

## Context

Fill this in during Sprint 1 and keep it current. Every sprint is read against it.

- **What I am building:** A tool aimed at billing and time-tracking pain points for
  consulting companies. The specific product is not decided yet — Sprint 1 is validating
  whether this problem is real before committing to a solution.
- **Who it is for:** Consulting companies, specifically around how they bill and track
  time. Which segment (size, industry, role) is not decided — that is part of what
  Sprint 1's interviews are meant to narrow down.
- **My role:** Not decided. Working solo for now; open to this becoming a team effort
  depending on what Sprint 1 shows.
- **My user:** Not decided. Depends on who Sprint 1's interviews identify as feeling
  this pain most acutely.

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

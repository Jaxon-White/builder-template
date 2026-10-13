# Sprint 2 Plan

**Goal:** Have a working prototype of the app that connects to the real data, has user logins
set up, and is deployed so a simple version is running for real users.

**Why this:** Putting it in front of real users tells me whether the church actually wants
this, which is my biggest open risk.

**Done looks like:** The prototype is deployed at a live URL, pulls resources from the real
data instead of mock data, and requires users to log in. The professor and 3 DI workers (for
when they encounter people with needs) have logged in and used it.

**Predicted difficulty:** 3

---

**Changed 2026-10-03:** Made the plan specific. The original goal was "have a working
prototype of the app," and done was "the basic functions are done, and the prototype can be
used in a presentation to the professor." The original why was the upcoming meeting with the
professor, which has now happened. Now done names the functions (real data, logins, deployed)
and who uses it. For the prototype, only DI workers are the test users, because they are
almost intermediaries: they meet people with needs directly and connect them to help.

---

**Update 2026-10-12: roadblock on real data.** I couldn't get access to the real resource data
this week, so the app still runs on sample data. I'll try again next week.

Why:

- **The professor was out of town for the last 2 weeks**, so we haven't been able to meet and
  regroup. The real data is what the professor's group is using, so getting access depends
  on that meeting.
- **A DI worker with some access to the data** has been in email contact with me, but replies
  have been very slow, so that route hasn't gone anywhere yet.

Where "done" stands:

| Done looks like | Status |
|---|---|
| Deployed at a live URL | Done: https://find-help-sooty.vercel.app, auto-deploys from `main` |
| Requires users to log in | Partly: every page needs sign-in, but it's a demo sign-in until Church Account is approved (decision 004) |
| Pulls resources from the real data | Blocked: no access to the real data yet. The app is wired so it can be swapped in (`DATA_SOURCE`, decision 002) |
| Professor and 3 DI workers have logged in and used it | Not yet: waiting on real data so they're testing real listings |

**Next week:** meet with the professor now that they're back, get access to the real data
and connect it (keep following up with the DI worker by email in parallel), then invite the professor and the
3 DI workers (see `gtm/experiments/001-di-worker-pilot.md`).

# Sprint 2 Review

*Written by `/sprint-review` on the last day of the sprint. Read it before you write your retro.*

**Window:** 2026-09-28 to 2026-10-12
**Sessions reviewed:** 3 across 2 projects (Claude Code 3, Codex 0; 4 sessions excluded at your request)
**Not visible to this review:** a text with the professor (Oct 3), an email thread with the professor and a DI worker (Oct 5–8), and two emails scheduling a demo (Oct 12). Summarized in `gtm/outreach-log.md`.

## Where the work lives

- **Repo:** https://github.com/Jaxon-White/builder-template (public). 18 commits in the window,
  on Sep 28, Sep 29, Oct 1, Oct 3 and Oct 12. The app is in `product/web/`.
- **Live:** https://find-help-sooty.vercel.app (demo sign-in, sample data)

## When you worked

The repo was active on 5 of the 15 days: Sep 28, Sep 29, Oct 1, Oct 3 and Oct 12. All of the
Claude Code sessions were in the evening.

- **Sep 28:** Sprint 1 review and this sprint's plan.
- **Oct 1:** one session that wrote specs 001 and 002 and built the first prototype.
- **Oct 3:** the plan was rewritten.
- **Oct 4 to Oct 11:** nothing. No commits and no sessions for 8 days.
- **Oct 12:** the largest day. 11 of the sprint's 18 commits and 32 of its 76 prompts, ending
  with the app deployed and three pull requests merged.

The work came in bursts, with most of it on the last day.

## Where you got stuck

1. **Real resource data.** This was never resolved. The professor was out of town for the last
   two weeks, so there was no meeting to regroup or get access to the data the professor's
   group uses. A DI worker with some access was contacted by email but was slow to reply. The
   app still runs on 25 sample listings.
2. **Getting the work merged and live (Oct 12).**
   - Vercel couldn't connect to the GitHub repo until the Vercel GitHub app was installed on
     the account. After that, pushes deployed automatically.
   - The first try at merging PR #2 was blocked by the agent's permission check for an
     unreviewed merge.
   - The retry was then refused by GitHub because of a `CLAUDE.md` conflict with the Oct 3
     plan commit on `main`.
   - Merging `main` into the branch cleared the conflict, and the PR merged.
3. **Local preview (Oct 1).** The dev server stopped twice when it hit a background time limit.
   It was restarted by hand once, then run through the app's preview on Oct 12. This one was
   minor.

## What took the most time

Oct 12 had the most prompts and commits. About a third of that day went to the app itself:
- switching the planned login to Church Account
- restyling the app
- three UI fixes (the outreach link for upkeep volunteers, a choice page after sign-in, and
  the share text)

The rest went to hosting and paperwork:
- the Vercel setup and GitHub connection
- opening and merging PRs, including the conflict
- the weekly updates to `design/`, `discovery/`, `gtm/` and `metrics/`

Oct 1 had few prompts (5) but heavy agent work. In about 15 minutes of prompting, that session
wrote two specs and two decision records, built the outreach finder, login and upkeep calls,
and tested them in the browser.

Sep 28 (27 prompts) was mostly the Sprint 1 review and pivot write-up. It falls at the very
start of this window.

## Learning sessions

None logged this sprint.

## Axis

**Application Architecture.** Most of the sprint's work was:
- data access that can be swapped out for SharePoint
- server-side sign-in checks for each role
- in-memory saving for upkeep calls
- deploying to Vercel with automatic deploys from GitHub

## Against your plan

**Goal was:** a working prototype that connects to the real data, has user logins set up, and
is deployed so a simple version is running for real users. The professor and 3 DI workers
have logged in and used it.

The goal was not met. One of the four "done" items is complete:

- **Deployed at a live URL:** done. https://find-help-sooty.vercel.app, auto-deploying from
  `main`.
- **Requires login:** partly done. Every page needs sign-in, but it is a demo picker that
  anyone with the link can use. Church Account sign-in is a stub until the Church approves
  the app.
- **Pulls from the real data:** not done. Access is blocked, and the app is still on sample
  data behind a swappable data source.
- **The professor and 3 DI workers have used it:** not done. No one outside the builder has
  signed in. No interviews or usability tests happened.

The plan was rewritten on Oct 3, partway through the sprint. The original goal was a prototype
to present to the professor. That prototype was built on Oct 1, but the presentation didn't
happen because the professor was away.

---

## Your retro

*The builder's own answers, recorded word for word.*

**Did you hit the goal?** my goal was partly done. the app is completely developed but is missing the back end database to pull from.  the roadblock was out of my control, i thought getting access to the data base would be easy but so far it requires a lot more access permissions than expected.

**What did the report show you?** i didnt realize that i was so focused on getting access that i didnt touch the app itself much.

**If the plan changed, why?** i changed it because i got the prototype done and i really wanted to get to the next step not knowing how dificult it would be to get past the next roadblock

**Actual difficulty:** 4. it was pretty easy to get the app done but getting access like i changed it to made it impossible to complete my goals fully

**What will you change next sprint?** next sprint i will make sure that i set goals that are based on my own personal work not based on things that others have to do for me like gaining access to the database

# Sprint 3 Review

**Window:** 2026-10-12 (plan committed 19:12) to 2026-10-26
**Sessions reviewed:** 5 across 1 project (Claude Code 5, Codex 0; 3 sessions excluded at your request)
**Not visible to this review:** the meeting with the professor (Oct 14), the meeting with DI (Oct 15),
the DI feedback emails (Oct 16), and the email cancelling the DI meeting (Oct 21). These are known
only from the notes in this repo.

## Where the work lives

- **Repo:** https://github.com/Jaxon-White/builder-template, shared with sdmurff. 27 commits in the
  window (including 4 PR merges), on 6 days: Oct 12, 13, 14, 15, 16, 19 and 26.
- **Live:** https://resource-navigator-provo.vercel.app. It started the sprint at an auto-generated
  Vercel URL, moved to find-help-provo.vercel.app on Oct 14, and moved to resource-navigator-provo on Oct 15.

## When you worked

7 of 15 days had activity: Oct 12, 13, 14, 15, 16, 19 and 26. Roughly 3.5 hours of active session
time in total. The work was front-loaded: Oct 12 to 16 accounts for about 3 of those hours and 21 of the
27 commits. Oct 17 to 25 had one active day (Oct 19, about 20 minutes, writing up the DI session).
Oct 20 to 25 had no activity in this repo.

## Where you got stuck

1. **The "ride or bus pass" need with no place behind it (Oct 13).** You raised the same problem in
   two sessions a few minutes apart. When you asked to commit, push and open it, what opened was GitHub,
   not the app. It ended the same evening with PR #9, which hides any need that no listed place covers.
2. **The live URL and name (Oct 14 to 15).** The auto-generated Vercel URL contained a word you flagged
   as possibly offensive, so you changed it to find-help-provo. The next morning, before the DI demo,
   you renamed the app to Resource Navigator and moved the URL again. About 10 prompts that morning
   were changes, pushes and "is it pushed / make it live" checks. It ended live at
   resource-navigator-provo before the DI meeting.

No other run of retries showed up. The largest change, the DI feedback on Oct 16, went from one
plan-mode prompt to a pushed build in about 45 minutes.

## What took the most time

- **Oct 16 (about 64 min):** the DI feedback round: sourced details, the vetted badge, county and state
  search, Print (spec 005), the Find help / Resources switch, and a real place for every kind of help
  plus seasonal hours (spec 006). You also drafted a thank-you email to the DI worker.
- **Oct 15 (about 49 min):** getting ready for the DI demo: the rename, the URL, the immigrants
  and refugees option, websites in Share, and per-day hours (spec 004).
- **Oct 12 (about 29 min):** the Sprint 2 retro, the Sprint 3 plan, and replacing sample data with 10
  real Provo-area places (spec 003).
- **Oct 14 (about 26 min):** writing up the professor session and fixing the Share bug.

There were 74 prompts in the window. Tool use was mostly shell commands (287), then web searches (20),
mostly while finding real places.

## Learning sessions

None logged this sprint. A `/learn` session was opened on Oct 19 but nothing was asked after it
started, and no log was saved to `learning/`. The sprint's work advanced Design.

## Axis

**Design.** Most of the time went to changing the interface based on watching the professor and DI
workers use it: the vetted badge they would not miss, the place details, search, Print, and the switch.

## Against your plan

**Goal was:** The app has real Utah County resources in it instead of only sample data, and real
users (the professor, a bishop, and a DI worker) have used it and given feedback.

Partly met. There are 14 real Utah County places live, against a target of 10, but none has been
confirmed by phone. The professor and DI have both given feedback, and the notes are in
`design/usability-tests/`. No bishop has used the app, and there are no bishop notes in the repo.
The weekly DI meeting on Oct 22 was cancelled by DI.

---

## Your retro

*The builder's own answers, recorded word for word in step 7.*

**Did you hit the goal?** partly, i didnt get a bishop to use the app, but i got 2 DI workers to use it and give me feedback

**What did the report show you?** i had some design problems and i went back and forth on a few options but i evenutally found what i liekd best and what made the most sense

**If the plan changed, why?** (skipped: the plan did not change)

**Actual difficulty:** it was a 2, all it was was a feedback week so it was super chill

**What will you change next sprint?** i really want to get it hooked up to the sharepoint, but i really have no control over that

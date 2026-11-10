# Sprint 4 Review

**Window:** 2026-10-28 (plan committed 20:00) to 2026-11-09
**Sessions reviewed:** 3 across 1 project (Claude Code 3, Codex 0; 7 sessions excluded at your request)
**Not visible to this review:** nothing else reported. The in-person TSO Resource & AI meeting
(Nov 5) and the canceled Oct 29 meeting are known only from the notes in this repo.

## Where the work lives

- **Repo:** https://github.com/Jaxon-White/builder-template, shared with sdmurff. 5 commits in the
  window, on 3 days: Oct 28 (Sprint 4 plan), Oct 29 (HQ's 19 categories, simpler intake, tags) and
  Nov 9 (two meeting-log commits, and HQ's 29 October revision: 18 categories, subcategories,
  For groups; spec 008, decision 007).
- **Live:** https://resource-navigator-provo.vercel.app, deployed with the HQ revision on Nov 9.

## When you worked

4 of 13 days had session activity (local time): Oct 28, Oct 29, Nov 3 and Nov 9. Nov 3 was a single
interrupted prompt. The work came in two bursts: Oct 28 evening to Oct 29 afternoon (the plan, the
category and tag changes, and HQ's revised draft arriving), then Nov 9 (applying the revision,
logging meetings, this review). Oct 30 to Nov 8 had no commits and one prompt. The Nov 5 meeting
was in person and falls in that gap.

## Where you got stuck

1. **Too many categories at intake (Oct 29 morning).** HQ's list had 19 categories, and you asked
   which could be merged or shown differently because it was overwhelming. You then pointed out
   that some programs need government-approved disability, not just a disability. It ended the same
   morning with 7 needs plus "More needs", veterans, seniors, reentry and SSI/SSDI asked as
   situations, and the change committed and pushed.
2. **Finding a need by searching ("someone who is blind") (Oct 29 morning).** Search only matched
   names and descriptions. You asked for tags, then for them at the bottom of each card as small
   circles. It ended in the same commit: tags on every place, filler words ignored, "Helps with"
   pills.
3. **HQ's revised list (Oct 29 to Nov 9).** HQ's 29 October revision arrived about six hours after
   the 19-category version went live. Applying it stopped at two design questions (split
   organizations into programs; what to do with groups HQ doesn't have), and the question dialog was
   interrupted on Nov 3. You answered on Nov 9: split programs later, follow HQ's groups with one
   app-only "no children" flag. It was built, committed and deployed that day.

## What took the most time

By prompts, Oct 29 (session dates in UTC): 22 of 30 prompts, about half of them the category, intake
and tags work that morning. By session time, the longest stretch was the Oct 29 morning session
(about 50 minutes of prompts) and the Nov 9 evening session (about 1 hour 45 minutes, meeting logs
and this review). Building the HQ revision on Nov 9 was mostly agent work after one prompt.
Durations are estimated from prompt times. Tool use was mostly shell commands (98 of 123 calls).

## Learning sessions

None logged this sprint. The sprint's work advanced Application Architecture.

## Axis

**Application Architecture.** Most of the work was reshaping the app's data to HQ's taxonomy:
categories, subcategories as a field, For groups replacing "who it serves", and matching rules built
on them. The intake and card layout changes (Design) were the next largest share.

## Against your plan

**Goal was:** In two weeks I have a clear idea of my role in the future of this app.

Partly. On Nov 5, an HQ staff member proposed a beta of the Resource Tool and a weekly working group
that names you as a member; that is a proposal, not yet a decision, and it is not settled whether
the beta tool is HQ's app or yours. Of the three "done looks like" items: the app now builds on
HQ's category list and its revision (done); asking HQ again for feedback
has no record in the repo this sprint beyond the Nov 5 meeting; looking at HQ's existing app has no
record in the repo.

---

## Your retro

*The builder's own answers, recorded word for word in step 7.*

**Did you hit the goal?** partly

*Asked why:* we have a meeting set up but i havent gotten a meeting yet

**What did the report show you?** i felt like updating was just going to get easier as i got to know the problem but it has only gotten harder

**If the plan changed, why?** (skipped: the plan did not change)

**Actual difficulty:** 3 because it was clear but proving to get more dificult

**What will you change next sprint?** i hope to get the subcategories standrdised

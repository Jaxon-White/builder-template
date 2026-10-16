# Decision 005: Every eligibility fact comes from an official source

**Date:** 2026-10-16
**Status:** Active

## Context

DI workers found the SNAP listing said "Anyone can apply," which misleads someone about whether
they qualify. Tracing it: the line was written during the AI-assisted research for spec 003. The
listing it cites (a Utah 211 provider page) says nothing about eligibility or SNAP, only "Call to
schedule interview." The research filled the gap with its own wording and attached a source that
didn't support it. The other places' eligibility lines were gathered the same way.

Missionaries use these details to tell someone whether to go. A wrong qualifier sends a person
somewhere they'll be turned away, or keeps them from applying for help they'd get.

## Options considered

1. **Fix the SNAP line and keep the rest**: pros: fast / cons: the same process wrote the other
   nine, so the next wrong line is still there.
2. **Keep directory listings (211, WhyHunger, Earth911, news) as sources**: pros: easy to find /
   cons: they often leave eligibility out or are out of date, which is how the gap got filled
   with a guess.
3. **Only official sources, every fact linked, unknown left blank**: pros: anyone can check a
   fact against the page it came from; blanks tell the missionary to ask / cons: slower, and some
   places will show "Call to ask" for a while.

## Decision

Option 3. Qualifiers, how to apply, what to bring and languages come only from the organization's
or program's own pages, listed in each place's `factSources`. Nothing is inferred or summarized
beyond what the page says. If no official page says it, the field stays empty and the app shows
"Call to ask." Deciding reason: a missionary acts on these facts in front of the person, so a
blank is safer than a guess.

## What would change our mind

WSRS access. WSRS is what DI workers already trust, so once we have it, WSRS becomes the source
and this rule applies to it the same way.

# PRODUCT.md

## What this is
温哥华 8/22–8/29: a single-file, Chinese-language trip reference for a 7-person two-family
vacation (Vancouver + Vancouver Island, 2026-08-22 to 08-29). Hosted on GitHub Pages.
Not a showcase page. It is the thing you pull out of your pocket mid-trip to answer
"where am I supposed to be, and when do I have to leave."

## Audience
Two families, Chinese-speaking, **on a phone, outdoors, in a hurry**. One member works
remote 06:00-14:00 Pacific on weekdays; the schedule is built around that.

## Register
Product (design SERVES the task). It is a tool, not a brochure.

## Scene
Standing on a Richmond street corner at 20:00, one hand on a suitcase, checking whether
it is time to leave for the ferry. That forces: dark theme, large hit targets, time-first
layout, thumb-reachable nav, zero decoration competing with the schedule.

## Design language
Dark, locked. OKLCH, seed hue 268 (carried over from v1 identity).
Semantic color does the work: alert red = hard deadline, warn amber = time emphasis,
ok green = free / points-covered, primary indigo = interactive and current selection.
Accent is never decorative.

## Tokens
--bg oklch(.15 .02 268) · --surface .195 · --surface-2 .245
--ink oklch(.96 .008 268) · --ink-2 .84 · --muted .72
--primary oklch(.72 .13 268) · --alert oklch(.74 .17 25) · --warn oklch(.84 .13 78) · --ok oklch(.78 .14 158)
All body text verified >= 7:1 against its own background.

## Structure
Sticky header (live Vancouver clock + trip-day counter) -> horizontal day rail ->
five bottom tabs: 行程 / 住宿 / 下单 / 钱 / 要点.
Day view is a two-column timeline (time | event); 8/28 splits into two parallel columns
because the families separate that afternoon. Reasoning lives behind <details>, never
in the way of the schedule.

## Constraints
- **Single self-contained index.html.** No build step, no CDN, no external requests,
  no images. Works on hotel wifi and on airplane mode after first load.
- Fixed rem type scale (product register), not fluid clamp.
- Booking checklist persists to localStorage.
- Reduced motion honored. No em-dashes.
- Data snapshot 2026-07-27, sourced from 温哥华行程-FINAL-2026-08-22至29.md.

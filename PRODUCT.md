# PRODUCT.md

## What this is
路书 · 温哥华与温哥华岛 8 天: a single-page Chinese-language pitch for a fully solved
8-day itinerary (Vancouver + Vancouver Island, 2026-08-22 to 08-29, 7 people, 2 cars,
~1,800 km). Hosted on GitHub Pages. The page is the sales artifact.

## Audience
A client being shown this itinerary for the first time, on a laptop or a phone, deciding
whether it is worth their money and their trust. They already know Vancouver is beautiful.
What they cannot judge is whether the eight days actually work.

## Mode
**Persuade.** Design is the product. The visitor must understand the offer, believe the
plan is real, and act.

## What it must prove
Not scenery. **Solved sequence.** Two prepaid ferry sailings, a 21:15 fireworks slot, a
20:10 sunset, a 06:00-14:00 remote workday, a 14:45 car-return deadline, and 341,038
Marriott points redeemed at 1.127 cents. Every hard deadline carries a danger class
because someone drove the route first.

## Scene
A dashboard-mounted roadbook read at night. That forces the graphite ground and the
hi-vis stock: this is an artifact made to stay legible in a moving car, not a brochure
made to look calm on a desk.

## Visual world
Rally roadbook. See DESIGN.md for the full system.

## Structure
Hero (offer, tally, leg 01 with its tulip drawn) -> the eight-leg strip -> the three stays ->
the danger board -> the ledger. Each leg carries: an operating window and deadline count, a
tulip, a headline, a paragraph, its highlights with what to see and where to eat, the
hour-by-hour beats, a plain-language warning, and which hotel that night.

## Constraints
- `index.html` plus `data.js`; the only external request is the font stylesheet. Every number
  in `data.js` traces to the source itinerary, and nothing is authored there that the source
  does not contain.
- No photographs. The roadbook draws what it found.
- No build step. Chinese-language throughout.
- Prices are a snapshot dated 2026-07-27, sourced from
  `温哥华行程-FINAL-2026-08-22至29.md`. Every figure on the page traces to that file.

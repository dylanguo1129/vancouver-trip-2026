# DESIGN.md

## The world: rally roadbook

A reconnaissance roadbook. The artifact a rally crew straps to the dash: a printed strip of
waypoints, each with a tulip diagram, a distance to the next, and a danger class. It exists
because someone drove the route first and wrote down what they found.

That is exactly what is being sold here, so the surface IS the roadbook rather than a page
about one. Not a brochure with roadbook decoration.

## Why this world and not the category default

The BC-travel rut ships a full-bleed mountain photo, "Discover British Columbia", a serif
display face, a day-by-day accordion, and a price at the bottom. Its predictable opposite is
a minimal white Swiss page. Neither proves the thing this product actually sells, which is
not scenery but **solved sequence**: two prepaid ferry sailings, a 21:15 fireworks slot, a
20:10 sunset, a 06:00-14:00 workday, and 341,038 points redeemed at 1.127 cents.

A roadbook proves reconnaissance. A brochure proves budget.

## Color

Strategy: **Committed.** Roadbook paper carries roughly half the surface.

| Token | Value | Role |
|---|---|---|
| `--stage` | `oklch(.155 .014 250)` | night stage, the ground everything sits on |
| `--stage-2` | `oklch(.205 .016 250)` | raised stage panels |
| `--paper` | `oklch(.805 .135 78)` | hi-vis roadbook stock, the committed field |
| `--paper-2` | `oklch(.885 .095 82)` | lighter stock for quiet passages |
| `--ink` | `oklch(.215 .035 62)` | press ink on paper |
| `--ink-2` | `oklch(.40 .045 62)` | secondary ink, 5.04 on stock |
| `--ink-3` | `oklch(.418 .047 64)` | tertiary: time column, addresses, field labels. 4.65 on stock, 6.1 on the lighter stock. Anything lighter fails 4.5 and must not be used for text. |
| `--danger` | `oklch(.415 .185 28)` | danger class marks, on paper, 4.88 on stock |
| `--danger-lit` | `oklch(.66 .19 28)` | danger on stage |
| `--cap` | `oklch(.74 .125 222)` | CAP heading, distances, instrument readouts |
| `--stage-ink` | `oklch(.96 .008 250)` / `--stage-mute` `oklch(.70 .018 250)` | text on stage |

Hi-vis ochre at chroma .135 is roadbook stock, not cream. The moment it drifts below
chroma .08 it has become the AI warm-neutral default and must be pushed back.

Secondary text on paper is tinted from the paper's own hue (62-82), never gray.

## Type

- **Archivo Narrow** — control labels, waypoint headings, danger classes. Condensed
  industrial grotesk is the roadbook's own lettering. Caps only for labels of four words
  or fewer.
- **Archivo** — body and prose.
- **JetBrains Mono** — times, distances, prices, coordinates. Measurement, not costume.
- CJK falls through to PingFang SC / Noto Sans CJK SC.

Display ceiling 6rem. Tracking floor -0.04em. Headings balanced.

## Components in the world's grammar

- **Tulip diagram** — authored SVG per waypoint. Filled dot at origin, stroke for the route,
  arrowhead at exit, tick marks for landmarks. Drawn, never an icon-font substitute.
- **Danger class** — `!` advisory, `!!` recoverable at a cost, `!!!` trip-breaking. Graded by
  type size, not by colour, so severity reads before it is parsed. Shipped census: 5 / 5 / 4.
  A `!!!` is only ever on 提车刷卡, the two 14:00 late checkouts, and the wifi test.
- **Gauge** — every leg carries two derived readouts: 行动窗口 (first to last clock time in the
  leg's own beats) and 硬死线 (count of class-3 marks). Both computed from the beat data, never
  hand-entered, so they cannot drift from the schedule.
- **Highlight entry** — the leg's 看 / 吃 / 玩 / 走 / 逛 / 听 / 省 rows. A 26px inked square
  carrying one character, then the name, then what is actually good about it. Ruled entries,
  never cards. Three columns above 880px, the paragraph spanning columns 2 to 3 below it:
  a three-child grid in a two-column track drops the paragraph into the 34px glyph column,
  which is how this shipped broken once.
- **Stay panel** — one per segment on the lighter stock: hook, a definition list of facts,
  a walking-distance list, and one closing tip. The tip is where the thing a booking site
  will not tell you goes.
- **Crew badge** — seven dots per leg, filled to the party size that day, with the count.
  The trip runs 7 / 7 / 6 / 6 / 6 / 7 / 3 / 3 and the 8/27 badge turns danger red and reads
  最后一天. The party shrinking is the trip's real shape; the badge is the only place it shows.
- **Day rail** — a sticky horizontal index inside the route section. **Pure CSS `position:
  sticky`, no JS gate.** The progress bar and the current-day highlight are enhancement: if
  neither ever fires the nav still works. This shipped broken twice, once behind a scroll
  listener and once behind an observer, in a renderer that fires neither.
- **Perforation** — repeating radial-gradient punch along the strip edge. CSS, no image.
- **Carnet stamp** — rotated overprint block for totals and confirmations.
- **Distance-to-next** — the running counter between waypoints, in the CAP colour.

## Motion

One authored moment: **the route draws itself.** Nothing else has an entrance. Within a leg,
its highlights and beats stagger in behind the draw at 32ms steps capped at 320ms, which is
staggering inside one list rather than a second entrance. A spool index on the left tracks the
scroll above 1320px and is state, not decoration. Section
headers, the danger board, the ledger and the close render at full opacity on load. Tulip strokes run in on
`stroke-dashoffset` as each waypoint enters, and the running total counts up once. Nothing
else animates on entry. Exponential ease-out. Content is visible by default; motion enhances
an already-rendered page. Everything collapses to a static plate under
`prefers-reduced-motion`, including `scroll-behavior`.

The draw is a **transition, never a keyframe animation**: a renderer that does not run
animations still lands on the finished state. The hidden start state is scoped under a
`.js-rv` class that only JS adds, with a 2.5s failsafe that reveals everything. Content is
never gated on a class that may not arrive.

## Prohibitions specific to this world

- No photographs. The roadbook draws what it found; it does not illustrate it.
- No card grid as page structure. The strip is the structure. The danger board is a ruled
  list; the ledger notes are hairline-separated columns, not panels.
- Danger classes never decorate. If a `!!!` sits on something survivable, it is a lie and
  the whole system stops being readable.
- Perforation and stamp are structural print artifacts, used where the strip actually
  divides, never sprinkled for texture.

## Constraints carried over

Single self-contained `index.html` apart from the font link. No build step. Chinese-language.
Data lives in `data.js`, snapshot 2026-07-28 from `温哥华行程-FINAL-2026-08-22至29.md`.

## The visibility rule, learned the hard way

Three separate features shipped invisible in this project because their *presence* was gated
on something that may never fire: a class added by an IntersectionObserver, a keyframe
animation's final state, and a scroll listener. The rule that came out of it:

**Nothing's existence may depend on a dynamic signal.** Presence is CSS. Motion is the
enhancement layered on top. Where a hidden start state is genuinely wanted, scope it under a
class JS adds, give it a timeout failsafe, and prefer a transition (declarative end state)
over an animation (end state only if it runs).

## Measured at ship

Paper carries **48%** of the rendered document. Body measures land at 33 to 40 CJK characters
per line (`em`, never `ch`: a CJK glyph is one em, so a Latin-comfortable 65ch is a cramped
36-character ribbon). Contrast on stock: ink 9.45, ink-2 5.04, danger 4.88. On stage:
stage-mute 7.34, danger-lit 5.28, cap 8.77.

## What was deliberately not built

A real roadbook carries cumulative distance, partial distance, and a CAP bearing per waypoint.
The source itinerary documents only a combined `~1,800 km` across both cars, so per-leg
distances and bearings would have to be invented. The gauge uses 行动窗口 and 硬死线 instead:
both are derived from data that exists. Claims stay bound to what is true even when the world's
native instrument would look better full.

## Voice

A travel agent who drove the route, not a brochure and not a spec sheet. Concrete over
atmospheric: 「鱼香三宝煲和黄鳝饭」 beats 「地道粤菜」, 「九点开门，不用订位」 beats
「环境优雅」. Opinions are allowed and expected: which line not to queue in, which doughnut
batch to ask for, which meter does not sell a day pass. Every restaurant carries its address
or its hours or what to order, usually all three. No em-dashes.

# PRODUCT.md

## What this is
「温哥华 · 海岛之夏」: a single-page, Chinese-language trip site for a 7-person two-family vacation (Vancouver + Vancouver Island, 2026-08-22 to 08-29). Hosted on GitHub Pages. The deliverable is the page itself: itinerary, route map, tide-timed oyster day, food list, points strategy, budget, booking checklist.

## Audience
The two families (Chinese-speaking, phones + desktop, viewing at night in the family group chat). One member works remote 06:00-14:00 weekdays; the plan is built around that.

## Register
Brand (design IS the product). Premium-consumer travel showcase.

## Design language
"八月萨利希海的暮航": deep indigo dusk water + sunset amber. Dark theme locked. OKLCH tokens, seed hue 268°.
Dials: VARIANCE 7 / MOTION 6 / DENSITY 3.

## Tokens
--bg: oklch(0.15 0.02 268); --surface: oklch(0.19 0.025 268); --surface-2: oklch(0.23 0.03 268);
--ink: oklch(0.95 0.01 268); --muted: oklch(0.74 0.02 268);
--primary: oklch(0.62 0.13 268); --accent: oklch(0.8 0.13 75); accent text: dark ink.

## Constraints
- Static, no build step. Vanilla HTML/CSS/JS + Leaflet (CDN).
- Real photos only (Wikimedia Commons, verified URLs, CC attribution in footer).
- Zero em-dashes. Max 1 kicker per 3 sections. No scroll cues. Reduced-motion honored.
- Data snapshot 2026-07-22; prices marked as snapshots.

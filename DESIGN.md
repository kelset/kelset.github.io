# Design

Visual system for kelset.dev: **"the network."** Lorenzo's work is drawn as a transit map, and the rest of the site is set in the wayfinding language that goes with one: a single grotesque at three widths, ink sign bands, and five line colours that always mean a line.

The idea is information design, not a costume. A transit diagram is the most legible way anyone has found to show several things running in parallel over time, which is exactly what a career with open source, speaking and side projects beside the day job looks like. It also happens to be honest about what he does: he builds the track, not the train.

> Superseded, for anyone reading old commits: "the changelog" (v2), "release notes of a human" (v3: Shantell Sans, ingredient colours, diff lines, marquee) and "the repository of Lorenzo" (v4: app bar, tab bar, JetBrains Mono, commit graph, four named themes). Nothing visual carries over from any of them. What does carry over is the content model, the row shape of the two lists, the three-quarter split, and the boop.

## Lines

Five lines, numbered in the order they opened. The mapping lives in `src/lib/labels.ts` (`LINES`, `topicHue`) and nowhere else.

| n | line | token | what is on it |
| --- | --- | --- | --- |
| 1 | Mobile | `mobile` | most of the jobs; `career` and `mobile` posts |
| 2 | Open source | `oss` | React Native, ProvidedAsIs, Sovereign Tech, OpenUK; `open-source` and `community` posts |
| 3 | Speaking | `speaking` | every appearance in the archive; `speaking` posts |
| 4 | Mind | `mind` | debug:mind, the sabbatical; `mental-health` posts |
| 5 | Agents | `agentic` | Shopify, agents party; `agentic` posts |

**A colour always means a line.** Nothing is tinted to brighten a row. Two things that mean the same thing share a line. Chrome that isn't on a line is ink.

Each line has three tokens, and a `.ln-<id>` class hands them to whatever is inside as `--l`, `--t` and `--on`:

- `--l-*` is the line itself: a stroke, a bullet, a slab.
- `--t-*` is the same line as text on the page (4.5:1 on both `--bg` and `--surface`).
- `--on-*` is what sits on top of `--l-*` (4.5:1 against it).

All values are OKLCH, kept inside sRGB so the measured contrast is the real one.

**Yellow.** The speaking line cannot hold 3:1 against paper, so in the light theme it is drawn with an ink casing (`--case-speaking`), the way printed maps have always handled yellow. The casing is transparent in the dark theme. Anything new that draws the speaking line as a shape needs it.

**Kinds are not lines.** Every appearance is on the speaking line, so a podcast is told from a talk by the word in its tag, not by borrowing another line's colour.

## Theme

Two: day and night, following `prefers-color-scheme` with a manual toggle in the header. The choice persists to `localStorage` and is applied before first paint by an inline script in `Base.astro`, which also maps the values earlier versions wrote (`kelset-dark`, `tokyo-night`, …) to `dark` / `light`.

Every token is declared once with `light-dark()`; `color-scheme` picks the half. Guest themes are gone on purpose: the palette *is* the lines, and a borrowed editor palette has no way to stay true to them.

Neutrals are blue-black, not grey: `--bg`, `--surface`, `--surface-2`, `--rule`, `--rule-strong`, and three inks (`--ink`, `--ink-soft`, `--ink-muted`). **`--ink-muted` is the contrast floor.** Sign bands (header, footer, the map's title strip) use `--sign-*`: ink in the day, a lifted surface at night, because a white slab on a dark page glares.

## Typography

One family: **Archivo** (variable, weight 400–900 and width 62–125, subset, ~80KB), plus its italic for prose (~32KB, preloaded only where prose uses it). Width does the work a second typeface normally would:

- **Expanded** (112–125%, weight 800–900): the name, page titles, station plaques, quest slabs.
- **Normal** (100%): prose and UI.
- **Condensed** (82–88%): eyebrows, tags, dates, map labels, timetable columns.

Dates and counts use `font-variant-numeric: tabular-nums` rather than a mono face. Code falls back to the system mono stack, so it costs no bytes.

`font-display: optional` plus preload: never a layout shift, never a paint delay. A slow first visit renders the system stack.

**No arrow or symbol glyphs.** Fontsource's `latin` subset stops at U+206F. Arrows are the `Arrow.astro` inline SVG and the external-link mark is a CSS mask; don't type `→` or `↗` into a template.

Sizes are rem, fluid via `clamp()` for display sizes; the scale is the `--fs-*` tokens.

## Layout

Full-width sign bands top and bottom; content in a `.wrap` (max 1200px, fluid gutter). No outer frame.

- **Sections** open with a 5px ink rule that starts at a station, a title, and a quiet note at the far end (`.sec-head`).
- **Sidebar pages** (`/blog/`, the article, `/about-me/`) share one split: `minmax(0, 3fr) minmax(0, 1fr)`. The prose measure is deliberately released inside the 3fr track; capping it leaves a dead channel before the sidebar. This was an explicit request, twice.
- **Below 860–900px** everything is one column. The header's exits scroll sideways under the brand row.
- **At 640px and below the home page is its own layout**, not a squeezed desktop: the name is sized to fill the column exactly, the band and the doodle shrink, the stops tighten, and each "Latest" list shows two rows.

Radii: `10px` cards and slabs, `6px` buttons, `4px` tags, pills fully round.

## Components

- **Header**: a sign band. The five exits are stations on one line: each link draws its own stretch of track with a stop under its label, the first and last end the line, and the current page is a filled interchange. Counts sit beside the labels. It carries a `view-transition-name` and sets `position: relative; z-index: 2`, because a named element is a stacking context.
- **Footer**: the other sign band. All five lines run in from the left edge and end at a buffer, above "End of the line."
- **NetworkMap**: the centrepiece. See below.
- **The strip** (`.strip` / `.stop`, global): a line drawn down the page with a station per item. Its one use today is the article contents, where the section being read is the filled station and, once the highlight script is running, only the stretch already travelled keeps the line's colour; what is still ahead is plain track. (It used to carry a detailed list of stops and a CV-style "record"; both were removed when the site stopped being a CV.)
- **The timetable** (`.tt-*`, global): `/blog/` and `/archive/` are the same list, **date · line · title + description · trailing figure** (reading time, or venue). The shape is defined once in `global.css` so the two can't drift; `PostRow` and `AppearanceRow` only supply markup. The whole row is the link; links inside a description are lifted back above it.
  Every list is also a line: a track runs down its left edge with a stop per row, and the stretch beside a row takes that row's line colour (a `.ln-*` class on the row: an article's first topic, or `speaking` for an appearance). A mixed list changes colour as it goes. The track runs out of the bottom of the list on purpose.
- **Pager** (foot of an article): the previous and next articles are stations, each at the far end of a stretch drawn in *that* article's line colour, so the pager says which line you would be changing to.
- **404**: set in ink, because it is on no line. Solid track runs in from the page edge to a station, then dots (the map's mark for a stretch nobody held) to a stop that was never built. The open stops under it are a timetable like every other list.
- **Share card** (`public/og.png`): the hero as a 1200×630 picture, the default Open Graph image. Generated by `node scripts/og-card.mjs` (needs Chrome) and committed; regenerate it when the name, the lines or the doodle change. Articles with a cover use the cover, as JPEG.
- **Slabs**: a block filled with a line colour and set in `--on`. The article header, the quest cards. On a slab, a bullet inverts (disc in `--on`, number in `--l`).
- **Bullets and tags**: `.bullet` is the numbered disc for a line; `.tag` is a small tab in a line's colour.
- **Plaque and "Now"**: the plaque is the current stop as a station nameplate (`--ink` background, `--bg` text, so it inverts with the theme). Beside it: two sentences and a short list of links to public write-ups. No bullets, no achievements.
- **Hero** (`Hero.astro`): the name on one line, then a band of all five lines crossing the page edge to edge, with the doodle sitting on it as the interchange; summary and buttons underneath. The band is a CSS gradient, not an SVG, and carries the yellow casing itself. It was picked in the lab over eight alternatives, because it is the only one that ties the hero to the map below it.
- **Boop** (`Boop.astro`): the doodle as a button. `look` is `ring` (five lines around a disc), `disc` (a plain station, used in the hero) or `ink` (the bare pen line, blended onto the page). Size comes from `--boop-size` on an ancestor. Five reactions (spin, wobble, squish, flip, hop), never the same one twice running; the caption walks along with each click. Reduced motion advances the caption only. One per page.
  The `ink` look depends on `mix-blend-mode`, so nothing between it and the page may create a stacking context: no `transform`, `translate`, `z-index` or `opacity` on its wrappers.

## The network map

`NetworkMap.astro` computes one SVG at build time from `src/data/career.ts`. Things that are easy to get wrong:

- **Columns are events, not months.** Every distinct start/end/mark date gets one evenly spaced column, then "now". It is a schematic and labelled "not to scale"; a busy year gets room, an empty one gets none.
- **The main line changes colour per job.** Each stretch takes the hue of the role that held it. A stretch nobody held (a gap over three months) or an aside (internship, sabbatical) is dotted.
- **Threads branch at 45°** from the station that shares their start date. `LAYOUT` says which lane each runs in, what it branches from (`from`) and whether it merges back (`into`). React Native merges into Sovereign Tech, which is why that stretch of main line is green. Finished things end in a terminus bar; ongoing ones run off the edge with an arrow.
- **Lane order avoids crossings**: open source above the main line with its spur above that, speaking below with its spur below that. Adding a thread means choosing a lane that keeps it that way.
- **Station names tilt at -32° and sit above the line**, except the ids in `BELOW`, whose station has a branch leaving upward from the same point.
- **Name flags ride on the line** and use `textLength`, so the pill width in `FLAGS` always fits the text. A flag needs a straight run about 6px longer than itself.
- **Side projects are spurs with a flag and an end stop**: ProvidedAsIs, debug:mind and agents party. agents party is still running, and by the map's own grammar would end in an arrow; it is drawn with a stop anyway (`cap` in `LAYOUT`) because Lorenzo wanted the three to look alike. The phone map's "Feb 2026 – now" carries the fact.
- **The landscape map must fit a 1200px page without scrolling.** `COL` (64px) is sized for the current event columns, and `TAIL` is the longer stretch from the last event to "now" that gives the agents party spur room for its flag. Adding an event with a new date adds a column: shrink `COL` to keep the SVG at or under 1196px, then check every flag still fits its run.
- **Both SVGs are `aria-hidden`.** Their text alternative is a visually hidden list right after the description: every stop and its dates. Keep it in step with the data (it is generated from it).
- **A station is a link only when the data gives it an `href`** — something public to read (a post, the archive, a project). Those links are `tabindex="-1"` mouse conveniences; every destination is reachable elsewhere on the site. A station with no `href` renders as a plain group and must not look clickable.
- **Phones get a portrait map.** At 640px and below the landscape SVG is hidden and a second one (`.map-v`) takes over: the same network turned on its side, now at the top, the main line nearest the names, threads stacked to its left, one row per event with its name and dates as horizontal text. A panned sliver of the landscape map showed one station and a lot of nothing. Both are generated from the same data in the same file; a new thread needs a lane in `LAYOUT` *and* an x in `VX`.
- **In between (641–1279px) the landscape map pans.** The scroller is `direction: rtl`, which parks it at the right-hand end ("now") with no script; the SVG switches back to `ltr`.
- **On a phone the key is five chips**, names only; the one-line descriptions come back from 641px.
- **Hovering or focusing a line in the key** fades every other line, in CSS (`:has()`).
- **The draw-in animation** is a `clip-path` wipe on the `.ink` group, only where the map fits whole (≥1280px) and motion is allowed. It never runs on the axis, so the frame is there from first paint.

## The lab

Design questions with more than one plausible answer get settled in `/lab/`, a dev-only route that renders each option in a phone frame and a desktop frame side by side (see AGENTS.md). The losing hero variants are still there on purpose: station sign, statement first, map first, giant doodle, type poster, calling card, name + current stop.

## Motion

Easing `cubic-bezier(0.22, 1, 0.36, 1)`; hovers 120–240ms. Cross-document view transitions move you along the line: the old page leaves 22px to the left as the next arrives from the right, while the two sign bands stay put. One looping animation exists: the pulse on the current stop. `prefers-reduced-motion: reduce` shortens everything to 1ms and a single iteration.

## What isn't here, and why

- **No CV.** No job titles or descriptions on the stops, no list of achievements, no skills, no "record". See PRODUCT.md.
- **No hero metrics.** No row of big numbers under the name.
- **No search, no hamburger, no sort control.** Nothing interactive-looking that the site can't back.
- **No per-year blurbs.** A year in the archive is summed up by a count of what was in it, derived from the collection.
- **No cover images on articles.** They feed Open Graph only.
- **No embeds.** YouTube links are links.

## Client JS inventory

Zero third-party JS. Everything is hand-written, tiny, and a progressive enhancement; the site works fully with JS disabled, and any control that needs a script stays `hidden` or `disabled` until that script has run:

1. no-flash theme snippet (inline, `Base.astro`)
2. theme toggle
3. boop
4. `copy link` on articles
5. writing topic filter and archive kind filter (`?topic=` / `?kind=` are linkable)
6. article contents active-section highlight

## Hard bans

Transit props (split-flap, tickets, roundels, operator typefaces or slogans) · a colour used for decoration rather than a line · gradient text · mono as a design voice · fluffy or jokey copy about career facts · hero metric rows · sketchy SVG decoration · any third-party product's components, icon set, or brand colours.

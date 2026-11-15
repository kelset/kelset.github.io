# AGENTS.md

Welcome, AI Agent! This file provides context and best practices for working on this repository.

## Project Overview

This is the personal website of [Lorenzo Sciandra](https://kelset.dev/), built with **[Astro](https://astro.build/)** (static output, zero client JS by default). It replaced a Hugo/Congo setup in 2026; the git history has the old site if you ever need it.

The design concept is **"the network"**: Lorenzo's work drawn as a transit map — jobs on the main line, open source, speaking and side projects as branches — with the rest of the site set in the wayfinding language that goes with one. Home is the map, `/blog/` is writing, `/archive/` is talks & press, `/side-quests/` is what lives elsewhere, `/about-me/` is a short overview. It is information design, not a costume: no transit props, and nothing is drawn that didn't happen. Read [PRODUCT.md](./PRODUCT.md) (positioning, brand, anti-references) and [DESIGN.md](./DESIGN.md) (lines, tokens, typography, components) before making visual changes — they are the source of truth for design decisions.

> Earlier iterations on this branch — "the changelog", "release notes of a human", and "the repository of Lorenzo" (app bar, tab bar, JetBrains Mono, commit graph, named editor themes) — are **superseded**. If you find a reference to one in an old commit or a stale comment, it is history, not intent.

## Hard constraints

- **Perfect Lighthouse scores are a feature.** Every page scores 100 in performance, accessibility, best practices and SEO (mobile + desktop). Do not merge changes that regress this. Test with: `npx lighthouse http://localhost:4322/<page>/ --chrome-flags="--headless=new"` against `npm run preview`.
- **WCAG 2.2 AA, verified in both themes.** Every text pairing clears 4.5:1. `--ink-muted` is the contrast floor on the page; on a line-coloured slab, text is `--on` at full opacity — an `opacity` below 1 there drops under AA.
- **No third-party requests at runtime.** No CDNs, no analytics, no embeds that phone home. YouTube links render as plain links, not iframes. Social icons are inlined SVG for this reason.
- **Zero client JS by default.** The only scripts are the no-flash theme snippet, the theme toggle, the boop (`Boop.astro`), `copy link`, the writing/archive filters, and the article contents highlight — all tiny, hand-written, progressive enhancements. The site must work fully with JS disabled. Adding a seventh needs a reason.
- **Never ship an affordance the site can't back.** Anything that needs a script renders `hidden` or `disabled` and is revealed by that script (filter chips, theme toggle, copy link, the boop button), so it is never inert.
- **A colour always means a line.** Five lines, defined once in `src/lib/labels.ts`. Don't tint something to make it prettier.
- **`trailingSlash: "always"`** — internal links must end with `/`.
- **Every station on the map is a documented fact.** Don't invent entries and don't guess a date — dates come from Lorenzo's LinkedIn export, and an absent `end` means the thing is still going, which the map draws as a line running off the edge. An entry is a name, its dates and its line, nothing more. The one deduced entry (the 2025 sabbatical) is commented as such in `src/data/career.ts`.
- **The site is a landing spot, not a CV.** It exists so people can learn who Lorenzo is and find what he has made: the writing, the talks, the projects, the socials. Nobody should be able to reconstruct his CV from it. So: no job titles or descriptions on the stops, no bullet lists of achievements, no skills list, no "record". The map says where and when; `/about-me/` is a short overview in prose; "Now" is two sentences and links to public write-ups. The only thing taken from the CV word for word is its one-sentence summary (`PROFILE.summary`, the home page lede) — update that when the CV's summary changes, and take nothing else.
- **Wording.** Say "community maintainer and release lead" for React Native, never "core maintainer". About Shopify, say only what is already public and linkable.
- **Copy is dry.** One line per fact, no clever sentence about a year or a job.

## Project shape

`src/layouts/Base.astro` is the whole shell: header sign → `<main>` → footer sign. Its props:

| prop | what it does |
| --- | --- |
| `title`, `description`, `ogImage`, `ogType`, `schema` | head and JSON-LD |
| `current` | which exit on the header reads as "you are here" (`map` \| `writing` \| `talks` \| `side-quests` \| `about`) |
| `italic` | preload the italic face; set it only where prose uses italics |
| `noindex` | keep the page out of search indexes (the lab, the 404) |

Pages own their own layout inside a `.wrap`; `Base` deliberately doesn't impose one.

- **Components** — `Header`, `Footer`, `ThemeToggle` (chrome); `Hero`, `HeroActions`, `Boop`, `NetworkMap` (home); `PostRow`, `AppearanceRow` (timetable rows); `AuthorCard`, `Toc` (article); `SocialRow`, `Arrow` (shared). `NetworkMap` has several easy-to-break invariants — read the DESIGN.md section before touching it.
- **Shared patterns live in `global.css`, not in components**: the timetable (`.tt-*`, drawn as a line with a stop per row), the strip (`.strip` / `.stop`), bullets, tags, chips, buttons, section heads (each opens at a station). That is deliberate — see the scoped-style gotcha below.
- **Themes** — day and night, via `light-dark()` and a `data-theme` override. Colour tokens were checked with a contrast script and kept inside sRGB; if you change one, re-measure it against `--bg`, `--surface` and its own `--on-*`.
- **Data** — `src/data/site.ts` (identity, the summary, the "Now" block, socials, projects, fact sheet, nav) and `career.ts` (the map: names, dates, lines). `src/lib/labels.ts` defines the lines, maps topics to them, and derives appearance venues. There is deliberately no CV data file.
- **Scoped-style gotcha** (this one has bitten twice): an Astro `<style>` block cannot reach into a child component's root element — the scope hash differs — and passing the child a `class` does *not* help. It fails **silently**: the rule simply never matches. Three honest fixes: put the shared rule in `global.css`; use `:global()` from the parent for markup the child owns; or pass a custom property, which inherits straight through (`SocialRow` takes `--social` / `--social-hi` from the footer this way).

## The lab

`/lab/` is a development-only place to put several answers to one design question side by side. It is one route, `src/pages/lab/[...slug].astro`, whose `getStaticPaths` returns nothing when `import.meta.env.PROD` is true — so `astro build` (and therefore `npm run preview` and the deployed site) contains no lab pages at all. Use `npm run dev` and open `http://localhost:4321/lab/`.

- Experiments are declared in `src/lab/experiments.ts`; variant components live in `src/lab/<experiment>/`.
- An experiment page shows every variant in a real 375px iframe and a real 1360px iframe, so `@media` rules behave exactly as they will on the site. Each variant also has its own full-size page.
- Lab code may be rougher than site code, but a variant should be a drop-in: when one wins, move its component into `src/components/`, wire it into the page, and delete or keep the losers as you like.
- If the lab ever needs to be reachable in production, that is a decision for Lorenzo: it would need `noindex` (the `Base` prop exists) and the sitemap filter in `astro.config.mjs` already excludes it.

## Content

- Blog posts: `src/content/blog/<slug>/index.md` — frontmatter: `title`, `date`, `description`, `topics` (array from the closed list in `content.config.ts`; drives the tags and the writing filter), optional `updated`, `cover` (relative path to an image in the same folder; Open Graph only). Headings inside posts start at `##`. The `description` is promoted to the article's tl;dr, so write it as one. **The first topic decides the article's line**: the colour of its header slab, its link underlines and its contents strip.
- Appearances: `src/content/appearances/<slug>.md` — frontmatter only: `title`, `date`, `kind` (talk | podcast | interview | guest-post | collection), `url`, `detail` (inline markdown), optional `lang: it`, `format`, `venue`. **Venue is derived** from the first markdown link in `detail`; only set it explicitly when that link is a co-host or a topic rather than a place. `detail` renders as the row's description, clamped to three lines, and feeds the AEO endpoints.
- Counts (header, filter chips, per-year tallies) are computed from the collections — never hardcode them.
- URLs are stable: `/blog/<slug>/`, `/archive/`, `/about-me/`, `/side-quests/`. Redirects from the old Hugo URLs live in `public/_redirects`.

## AEO (AI Engine Optimization)

`/llms.txt` and `/llms-full.txt` are generated at build time from the content collections (`src/pages/llms.txt.ts`, `llms-full.txt.ts`). They update automatically when content is added — only touch the templates to change the *structure* of what's exposed. `public/robots.txt` deliberately welcomes everyone — humans, search engines and AI crawlers — with no per-agent `Disallow`, and points at both endpoints. That's the settled position: if you're about to add a crawler block, that's a decision for Lorenzo, not a cleanup.

## Fonts

Subset fonts are committed in `src/assets/fonts/` and loaded with `font-display: optional` + preload. One family: **Archivo**, variable in weight *and width* — expanded for nameplates, normal for prose, condensed for labels and timetable columns — plus its italic for prose. After bumping `@fontsource-variable/archivo`, run `node scripts/subset-fonts.mjs`.

Note: the font has **no arrows or symbols** — fontsource's `latin` subset stops at U+206F, and adding a glyph to the subset charset will not pull it in. Use the `Arrow.astro` SVG and the `.ext` mask instead of typing `→` or `↗`.

## Share card

`public/og.png` is the default Open Graph image: the home hero as a picture. It is committed, not built, because rendering it needs a browser. Regenerate with `node scripts/og-card.mjs` (needs Chrome) when the name, the line colours or the doodle change; the script copies the day-theme colour values by hand, so keep them in step with `global.css`.

## Local Development

```bash
npm run dev       # http://localhost:4321
npm run build     # writes dist/
npm run preview   # serves dist/ on :4322 (use this for Lighthouse runs)
```

## Gotchas learned the hard way

- `compressHTML` must stay `true` (HTML whitespace rules). Astro 7's default `'jsx'` mode deletes the space when an inline `<a>` starts a new source line in prose.
- `[hidden] { display: none !important }` exists in `global.css` because component `display` rules would otherwise override the attribute — the filter chips depend on this.
- Never animate in from `opacity: 0` — it delays LCP. Animate transforms only. (The map's draw-in is a `clip-path` wipe on an SVG group, which is not an LCP candidate.)
- `view-transition-name` creates a **stacking context**. The header needs `position: relative; z-index: 2` to stay above what follows. Expect the same trap on any named element with a popover inside it.
- Tokens use `light-dark()`, so a colour read back from `getComputedStyle` mid-transition serialises as `oklab()` and is an *interpolated* value. Don't audit contrast (or judge a screenshot) right after flipping the theme — let transitions settle, or the numbers are nonsense.
- The dev server can serve a page's new markup with its old scoped CSS on the first load after an edit. If a fresh rule "doesn't apply", reload once more (or restart `astro dev`) before debugging the selector.
- Check phone width (375px and 320px) on every home page change: the hero and the map have their own layout at 640px and below, and the map there is a different SVG.
- CSS animations don't advance in a hidden or background tab. If the map looks half-drawn in an automated screenshot, the tab wasn't producing frames; it is not a bug in the wipe.
- Big expanded titles inside a card are sized to the card with `cqi` (see the quest slabs). `overflow-wrap: anywhere` there splits a name mid-word.
- Congo/Hugo shortcodes are gone; content is plain CommonMark + raw HTML. One post uses a `.video-link` wrapper, styled in `global.css`.

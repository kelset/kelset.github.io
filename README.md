# kelset.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/bb974a55-c950-4200-993b-a4cbfe73abea/deploy-status)](https://app.netlify.com/sites/xenodochial-northcutt-74ba42/deploys)
<a href="https://github.com/kelset?tab=followers">
<img alt="follow me on github" src="https://img.shields.io/github/followers/kelset?label=Follow%20%40kelset&style=social" />
</a>
<a href="https://bsky.app/profile/kelset.dev">
<img src="https://img.shields.io/badge/Bluesky-0285FF?logo=bluesky&logoColor=fff&style=flat" alt="Follow me on bsky" >
</a>

Personal website ([kelset.dev](https://kelset.dev/)) built with [Astro](https://astro.build/). The design concept is **"the network"** — a career drawn as a transit map, with jobs on the main line and open source, speaking and side projects as branches. See [PRODUCT.md](./PRODUCT.md) and [DESIGN.md](./DESIGN.md) for the design system and rationale.

## Development

```bash
npm install
npm run dev       # dev server on http://localhost:4321
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
```

## Layout

- `src/content/blog/` — long-form articles (one folder per post, `index.md` + images)
- `src/content/appearances/` — talks, podcasts, interviews, guest posts (frontmatter-only entries)
- `src/data/career.ts` — the network map on the home page (names and dates only; real, dated facts)
- `src/data/site.ts` — identity, the "Now" block, socials, projects, navigation
- `src/lab/` — dev-only design lab, served at `/lab/` under `npm run dev` and absent from production builds
- `src/pages/` — routes, including `rss.xml`, `llms.txt`, `llms-full.txt`
- `public/_redirects` — URL continuity from the previous Hugo version of the site

## Fonts

The brand font (Archivo, variable in weight and width, plus its italic) is subset and committed in `src/assets/fonts/`. After upgrading `@fontsource-variable/archivo`, regenerate it:

```bash
node scripts/subset-fonts.mjs
```

It loads with `font-display: optional` — a deliberately performance-first strategy: a very slow first visit renders the system stack; every other visit gets the brand font with zero layout shift.

## License

[MIT](./LICENSE)

/* The lab's contents. An experiment is one design question with several
   answers rendered side by side; add one here and it gets its own page under
   /lab/. The lab exists only in `astro dev` — see src/pages/lab/[...slug].astro.

   A variant is either a component (rendered at /lab/<experiment>/<id>/, with
   the real page content under it for context) or an `href` to a page that
   already exists, which is how the current design sits in the line-up. */
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import HeroSign from "./hero/Sign.astro";
import HeroStatement from "./hero/Statement.astro";
import HeroSlim from "./hero/Slim.astro";
import HeroDoodle from "./hero/Doodle.astro";
import HeroPoster from "./hero/Poster.astro";
import HeroCard from "./hero/Card.astro";
import HeroNow from "./hero/Now.astro";

export interface Variant {
  id: string;
  name: string;
  /** one or two dry sentences: the idea, and what it costs */
  note: string;
  component?: AstroComponentFactory;
  href?: string;
}

export interface Experiment {
  id: string;
  title: string;
  question: string;
  /** what to render under each variant so it is judged in context */
  context: "home";
  variants: Variant[];
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: "hero",
    title: "Home page hero",
    question: "What should the top of the home page be?",
    context: "home",
    variants: [
      {
        id: "current",
        name: "Current: lines run through",
        note: "The one that won (Nov 2026): all five lines cross the page under the name, and the doodle is the interchange on them. It replaced a big name with a ringed doodle beside it.",
        href: "/",
      },
      {
        id: "sign",
        name: "Station sign",
        note: "The header band carries on down and the name is set on it, with the five lines listed underneath. The doodle straddles the bottom edge. Heaviest of the set.",
        component: HeroSign,
      },
      {
        id: "statement",
        name: "Statement first",
        note: "What you do is the headline; the name shrinks to a line above it. First-person rewrite of the CV sentence, which is the one copy change in the set.",
        component: HeroStatement,
      },
      {
        id: "slim",
        name: "Map first",
        note: "Identity is one compact row and the map starts almost at the top. The least hero-like; lets the map be the hero.",
        component: HeroSlim,
      },
      {
        id: "doodle",
        name: "Giant doodle",
        note: "No disc, no ring: the pen drawing itself, very large, running off the edge. The most human one.",
        component: HeroDoodle,
      },
      {
        id: "poster",
        name: "Type poster",
        note: "Nothing but type: each word sized to span the column exactly. No avatar in the hero at all. Pushes the map down on desktop.",
        component: HeroPoster,
      },
      {
        id: "card",
        name: "Calling card",
        note: "Centred and compact, doodle on top, the five lines as chips. The quietest, and the most phone-shaped.",
        component: HeroCard,
      },
      {
        id: "now",
        name: "Name + current stop",
        note: "The avatar gives up its place to a Shopify plaque, so the hero answers who and where-now together. Overlaps with the Now section below it.",
        component: HeroNow,
      },
    ],
  },
];

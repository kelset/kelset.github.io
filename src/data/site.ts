export const SITE = {
  title: "kelset",
  domain: "kelset.dev",
  url: "https://kelset.dev",
  name: "Lorenzo Sciandra",
  handle: "kelset",
  description:
    "Lorenzo Sciandra's personal website. Staff engineer at Shopify who builds the harnesses, tooling and infrastructure that let teams ship faster. Previously a React Native community maintainer and release lead.",
  headline:
    "Staff engineer at Shopify • harnesses, tooling and infrastructure that let teams ship faster • previously React Native community maintainer and release lead • speaker • mental health advocate",
  bio: "Lorenzo Sciandra is a staff engineer on Shopify's Shop app who builds the harnesses, tooling and infrastructure that let teams ship faster. He was a React Native community maintainer for more than six years, including running its releases, and previously worked at Microsoft and the Sovereign Tech Agency. He speaks and writes about engineering, open source and mental health in tech.",
  email: "notkelset@kelset.dev",
  repo: "https://github.com/kelset/kelset.github.io",
} as const;

/* The identity block. `summary` is the one sentence borrowed from the CV, word
   for word; it is the home page's lede. That sentence is the only thing the
   site takes from the CV — see "landing spot, not a CV" in AGENTS.md. */
export const PROFILE = {
  summary:
    "Staff engineer who builds the harnesses, tooling and infrastructure that let teams ship faster. Previously a React Native community maintainer for 6+ years, including running its releases.",
  /* the shorter one, for the article author card */
  shortBio:
    "Staff engineer at Shopify, building the harnesses and tooling that let teams ship faster. Previously a React Native community maintainer. Writes about engineering, open source and mental health in tech.",
  location: "London, UK",
  role: "Staff engineer",
  employer: "Shopify",
} as const;

/* The "Now" block on the home page: where he is, in two sentences, and the
   public write-ups worth reading. Not a list of achievements — that is what a
   CV is for, and the site isn't one. Only link things that are already
   public. */
export const NOW = {
  org: "Shopify",
  role: "Staff Engineer, Shop app",
  since: "Aug 2025",
  lines: ["agentic", "mobile"],
  blurb:
    "I work on the Shop app. Most recently I built the agent harnesses behind its migration to native Swift and Kotlin, and co-led the launch.",
  links: [
    {
      label: "The Shop app migration",
      where: "Shopify Engineering",
      href: "https://shopify.engineering/shop-app-migration",
    },
    {
      label: "Shop on iPhone Duo",
      where: "Apple Newsroom",
      href: "https://www.apple.com/newsroom/2026/10/developers-bring-incredible-new-app-experiences-to-iphone-duo/",
    },
  ],
} as const;

export const SOCIAL = [
  { label: "GitHub", url: "https://github.com/kelset", icon: "github" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/lorenzo-sciandra/", icon: "linkedin" },
  { label: "Bluesky", url: "https://bsky.app/profile/kelset.dev", icon: "bluesky" },
  { label: "Mastodon", url: "https://mastodon.online/@kelset", icon: "mastodon" },
  { label: "YouTube", url: "https://www.youtube.com/@kelset", icon: "youtube" },
  { label: "X (Twitter)", url: "https://twitter.com/kelset", icon: "x" },
  { label: "Reddit", url: "https://www.reddit.com/user/kelsetdev", icon: "reddit" },
  { label: "Email", url: `mailto:${SITE.email}`, icon: "email" },
] as const;

/* Side quests. Only external, self-owned things belong here: nothing Lorenzo
   merely contributed to, and never this website. */
export const PROJECTS = [
  {
    id: "agents-party",
    name: "agents party",
    url: "https://agentsparty.dev",
    hue: "agentic",
    kind: "work in progress",
    blurb: "Exploring agentic coding, out loud. Multi-agent orchestration for real engineering work.",
    description:
      "Exploring agentic coding, out loud. What actually changes when a team hands part of the work to agents: orchestration, review, and the habits that survive it.",
    meta: "agentsparty.dev",
    stats: [
      { value: "2026", label: "started" },
      { value: "open", label: "notebook" },
      { value: "wip", label: "status" },
    ],
    actions: [{ label: "Visit agentsparty.dev", href: "https://agentsparty.dev" }],
  },
  {
    id: "debug-mind",
    name: "debug:mind",
    url: "https://debug-mind.com",
    hue: "mind",
    kind: "podcast, complete",
    blurb: "Mental health in tech: honest conversations with the humans behind the code.",
    /* It ran to a plan and finished — a few pilots after World Mental Health
       Day 2023, then a full year of episodes, ending December 2024. Nothing
       here should imply it's live. */
    description:
      "A podcast about mental health in tech: honest conversations with the humans behind the code. It opened on World Mental Health Day 2023 with a handful of pilots, then ran a full year of episodes and wrapped in December 2024.",
    meta: "debug-mind.com",
    stats: [
      { value: "14", label: "episodes" },
      { value: "1", label: "host, no ads" },
      { value: "2023 – 2024", label: "complete run" },
    ],
    actions: [
      { label: "Listen", href: "https://debug-mind.com" },
      { label: "Read the retrospective", href: "/blog/debug-mind-retrospective/" },
    ],
  },
] as const;

/* Kept for the record — not maintained. */
export const ARCHIVED = [
  {
    /* the meetup never had a durable home of its own — no link to give */
    name: "ProvidedAsIs",
    description: "A London meetup for open-source maintainers, run with Red Hat",
    span: "2019 – 2021",
    hue: "oss",
    url: undefined,
  },
  {
    name: "react-native-community-map",
    description: "A map of who was building what in the ecosystem, handed over in 2024",
    span: "2022 – 2024",
    hue: "oss",
    url: "https://github.com/kelset/react-native-community-map",
  },
  {
    name: "Job hunting resources",
    description: "Everything that helped, collected while doing it",
    span: "2024",
    hue: "mobile",
    url: "https://github.com/kelset/job-hunting-resources",
  },
] as const;

/* The fact sheet on /about-me/. `now` and `first job` stay visually distinct
   on purpose — an earlier draft put a bare "since 2013" next to Shopify and
   read as "at Shopify since 2013". */
export const FACTS = [
  { key: "Name", value: SITE.name },
  { key: "Handle", value: SITE.handle },
  { key: "Now", value: "Staff engineer, Shopify", note: "since Aug 2025" },
  { key: "Previously", value: "Sovereign Tech Agency, Microsoft, Formidable" },
  { key: "First job", value: "IT intern, Scuderia Toro Rosso F1", note: "2013" },
  { key: "Based in", value: "London, UK" },
  { key: "Speaks", value: "Italian, English" },
  { key: "Studied", value: "Politecnico di Torino" },
] as const;

/* Main navigation, and what the 404 offers instead. Real routes only. */
export const NAV = [
  { id: "map", label: "Map", short: "Map", href: "/", description: "the ninety-second version" },
  { id: "writing", label: "Writing", short: "Writing", href: "/blog/", description: "long-form articles" },
  {
    id: "talks",
    label: "Talks & press",
    short: "Talks",
    href: "/archive/",
    description: "talks, podcasts and interviews",
  },
  {
    id: "side-quests",
    label: "Side quests",
    short: "Quests",
    href: "/side-quests/",
    description: "things that live elsewhere",
  },
  { id: "about", label: "About", short: "About", href: "/about-me/", description: "who's behind this" },
] as const;

export type NavId = (typeof NAV)[number]["id"];

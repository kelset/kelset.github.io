/* The network — the map on the home page.
   Every entry is a documented fact, and an entry is only a name, its dates
   and the line it is on. No job titles, no descriptions: the map says where
   and when, and the site deliberately stops there (it is not a CV).

   Dates come from Lorenzo's LinkedIn export. Don't invent entries and don't
   guess a date — an absent end date means the thing is still going, which the
   map draws as a line that runs off the edge.

   ROLES are the main line: one stop at a time, each stretch drawn in the
   colour of the line that job belonged to.
   THREADS branch off the main line and run beside it — that overlap is the
   point of drawing this as a map at all.
   MARKS are single stations on a thread.
   `href` is where a stop leads when there is something public to read. */

import type { Hue } from "../lib/labels";

export interface Span {
  id: string;
  title: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or null for "still going" */
  end: string | null;
  hue: Hue;
  href?: string;
  /** deduced rather than recorded — see the sabbatical */
  inferred?: boolean;
  /** not a job: a sabbatical, an internship. Drawn dashed. */
  aside?: boolean;
}

export const ROLES: Span[] = [
  {
    id: "tororosso",
    title: "Scuderia Toro Rosso F1",
    start: "2013-07",
    end: "2013-10",
    hue: "mobile",
    aside: true,
  },
  {
    id: "leva",
    title: "Leva Engineering",
    start: "2015-12",
    end: "2017-03",
    hue: "mobile",
  },
  {
    id: "etv",
    title: "European Travel Ventures",
    start: "2017-03",
    end: "2018-01",
    hue: "mobile",
  },
  {
    id: "drivetribe",
    title: "DriveTribe",
    start: "2018-01",
    end: "2018-12",
    hue: "mobile",
  },
  {
    id: "formidable",
    title: "Formidable",
    start: "2019-01",
    end: "2020-08",
    hue: "mobile",
  },
  {
    id: "microsoft",
    title: "Microsoft",
    start: "2020-10",
    end: "2024-06",
    hue: "mobile",
  },
  {
    id: "sta",
    title: "Sovereign Tech Agency",
    start: "2024-07",
    end: "2024-12",
    hue: "oss",
    href: "/blog/focusing-on-open-source/",
  },
  {
    id: "pause",
    title: "Sabbatical",
    /* the one deduced entry: not on LinkedIn, it's the gap between Sovereign
       Tech ending and consulting starting */
    start: "2025-01",
    end: "2025-04",
    hue: "mind",
    inferred: true,
    aside: true,
  },
  {
    id: "consulting",
    title: "Independent consulting",
    start: "2025-05",
    end: "2025-07",
    hue: "mobile",
  },
  {
    id: "shopify",
    title: "Shopify",
    start: "2025-08",
    end: null,
    hue: "agentic",
    href: "/#now",
  },
];

export const THREADS: Span[] = [
  {
    id: "rn",
    title: "React Native",
    start: "2018-01",
    end: "2024-06",
    hue: "oss",
    href: "/blog/closing-the-react-native-chapter/",
  },
  {
    id: "speaking",
    title: "Public speaking",
    start: "2019-01",
    end: null,
    hue: "speaking",
    href: "/archive/",
  },
  {
    id: "providedasis",
    title: "ProvidedAsIs",
    start: "2019-06",
    end: "2021-01",
    hue: "oss",
  },
  {
    id: "debugmind",
    title: "debug:mind",
    start: "2023-10",
    end: "2024-12",
    hue: "mind",
    href: "https://debug-mind.com",
  },
  {
    id: "agentsparty",
    title: "agents party",
    /* month given by Lorenzo, Nov 2026 */
    start: "2026-02",
    end: null,
    hue: "agentic",
    href: "https://agentsparty.dev",
  },
];

export const MARKS: { id: string; title: string; at: string; hue: Hue; on: string; href?: string }[] = [
  {
    id: "openuk",
    title: "OpenUK Honours List",
    at: "2022-06",
    hue: "oss",
    /* which thread the station sits on */
    on: "rn",
    href: "https://openuk.uk/community/openuk-honours-lists/2022honourslist/",
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-08" → "Aug 2025"; null → "now". */
export function fmt(ym: string | null): string {
  if (!ym) return "now";
  const [y, m] = ym.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

/** "2025-08" → "Aug" */
export const monthOf = (ym: string): string => MONTHS[Number(ym.slice(5, 7)) - 1];

export const yearOf = (ym: string): number => Number(ym.slice(0, 4));

/** months since year 0 — for comparing and measuring gaps */
export const months = (ym: string): number => yearOf(ym) * 12 + Number(ym.slice(5, 7)) - 1;

/** "2018 – 2024", "2025 – now", or just "2013" when it starts and ends in one year */
export function yearSpan(s: { start: string; end: string | null }): string {
  const a = yearOf(s.start);
  if (!s.end) return `${a} – now`;
  const b = yearOf(s.end);
  return a === b ? `${a}` : `${a} – ${b}`;
}

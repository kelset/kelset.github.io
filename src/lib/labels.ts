/* Lines, in one place.

   The site draws Lorenzo's work as a transit network, and every colour on it
   is a line. There are five, numbered in the order they opened. A colour is
   never decoration: an element wears one only because it belongs to that
   line, and two things that mean the same thing share one (`open-source` and
   `community` are both line 2). */

export type Hue = "mobile" | "oss" | "speaking" | "mind" | "agentic" | "neutral";

export interface Line {
  id: Exclude<Hue, "neutral">;
  /** the number in the bullet — chronological, so it can never be reshuffled */
  n: number;
  name: string;
  /** one dry line for the legend */
  about: string;
  /** where the legend entry leads */
  href: string;
  since: number;
}

export const LINES: Line[] = [
  {
    id: "mobile",
    n: 1,
    name: "Mobile",
    about: "React Native apps since 2015, native Swift and Kotlin now.",
    href: "/about-me/",
    since: 2015,
  },
  {
    id: "oss",
    n: 2,
    name: "Open source",
    about: "React Native community maintainer and release lead, then public funding for maintainers.",
    href: "/blog/closing-the-react-native-chapter/",
    since: 2018,
  },
  {
    id: "speaking",
    n: 3,
    name: "Speaking",
    about: "Conference talks, podcasts and interviews.",
    href: "/archive/",
    since: 2019,
  },
  {
    id: "mind",
    n: 4,
    name: "Mind",
    about: "Mental health in tech: the debug:mind podcast, talks and posts.",
    href: "/blog/?topic=mental-health",
    since: 2023,
  },
  {
    id: "agentic",
    n: 5,
    name: "Agents",
    about: "Harnesses, tooling and review for teams shipping with coding agents.",
    href: "/#now",
    since: 2025,
  },
];

export const lineOf = (hue: Hue): Line | undefined => LINES.find((l) => l.id === hue);

/** The class that sets --l / --t / --on for a line. See global.css. */
export const lineClass = (hue: Hue): string => `ln-${hue}`;

const TOPIC_HUES: Record<string, Hue> = {
  "mental-health": "mind",
  "open-source": "oss",
  community: "oss",
  career: "mobile",
  mobile: "mobile",
  agentic: "agentic",
  speaking: "speaking",
  meta: "neutral",
};

export const topicHue = (topic: string): Hue => TOPIC_HUES[topic] ?? "neutral";

/** `talk` → `talk`, `guest-post` → `guest post` — for display. */
export const kindLabel = (kind: string): string => kind.replace("-", " ");

/** `mental-health` → `mental health` */
export const topicLabel = (topic: string): string => topic.replaceAll("-", " ");

export const KIND_ORDER = ["talk", "podcast", "guest-post", "interview", "collection"] as const;

export const KIND_PLURALS: Record<string, string> = {
  talk: "Talks",
  podcast: "Podcasts",
  "guest-post": "Guest posts",
  interview: "Interviews",
  collection: "Collections",
};

/* Nearly every appearance names where it happened inside `detail`, as the
   first markdown link — "[QCon London 2024](https://qconlondon.com/) - slides…"
   or "Episode 122 of [PointerPodcast](…)". Deriving from that keeps 51 files
   from each needing a new field.

   The ones where the first link is a co-host or a topic rather than a venue
   set `venue:` in frontmatter instead; the hostname is only a last resort. */
export function venueOf(entry: { data: { venue?: string; detail: string; url: string } }): string {
  if (entry.data.venue) return entry.data.venue;
  const link = /\[([^\]]+)\]\(/.exec(entry.data.detail);
  if (link) return link[1];
  try {
    return new URL(entry.data.url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/* The row prints the venue in its own column, so a `detail` that opens with
   that same link would say it twice — "OggCamp 2024 · OggCamp 2024 - slides".
   Drop the leading link (and its separator) only when it is the venue; when
   the first link is a co-host or a topic, the sentence needs it and stays. */
export function detailOf(entry: {
  data: { venue?: string; detail: string; url: string };
}): string {
  const detail = entry.data.detail.trim();
  const venue = venueOf(entry);
  if (!detail || !venue) return detail;
  const lead = /^\[([^\]]+)\]\([^)\s]+\)\s*(?:[-–—:·,]\s*)?/.exec(detail);
  if (!lead || lead[1] !== venue) return detail;
  return detail.slice(lead[0].length).trim();
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** 2024-04-10 → "10 Apr 2024" — the timetable date. */
export function dayOf(date: Date): string {
  return `${String(date.getUTCDate()).padStart(2, "0")} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export const readingMinutes = (body: string | undefined): number =>
  Math.max(1, Math.round((body ? body.trim().split(/\s+/).length : 0) / 230));

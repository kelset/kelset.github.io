import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* Topics are label-only: they colour a pill and drive the writing filter, and
   a post earns one only if it genuinely belongs to that topic. Keep the list
   closed so a typo can't quietly invent a new colour. */
export const TOPICS = [
  "mental-health",
  "open-source",
  "community",
  "career",
  "meta",
  "speaking",
  "mobile",
  "agentic",
] as const;

const blog = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      description: z.string(),
      cover: image().optional(),
      topics: z.array(z.enum(TOPICS)).default([]),
    }),
});

const appearances = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/appearances" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(["talk", "podcast", "interview", "guest-post", "collection"]),
    url: z.string().url(),
    detail: z.string().default(""),
    lang: z.string().optional(),
    format: z.string().optional(),
    /* Where it happened. Almost every entry already opens `detail` with a link
       to the venue, so this is derived from that (see lib/labels.ts) and only
       needs setting by hand when there is no link to derive from. */
    venue: z.string().optional(),
  }),
});

export const collections = { blog, appearances };

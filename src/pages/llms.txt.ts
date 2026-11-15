import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE, SOCIAL, PROJECTS } from "../data/site";

/* AI Engine Optimization: a concise, factual site summary for LLM crawlers.
   Generated from the collections, so it never needs editing when content is
   added. */

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const appearances = (await getCollection("appearances")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const lines = [
    `# ${SITE.name} - Personal Website`,
    "",
    `This is the personal website and blog of ${SITE.name} ("${SITE.handle}").`,
    SITE.headline,
    SITE.bio,
    "",
    "## Content",
    "",
    `This site contains ${posts.length} articles about software engineering, open source (particularly React Native) and mental health in tech, and an archive of ${appearances.length} conference talks, podcasts, interviews and guest posts.`,
    "",
    "### Articles",
    ...posts.map(
      (p) =>
        `- [${p.data.title}](${SITE.url}/blog/${p.id.replace(/\/index$/, "")}/) - ${p.data.date.toISOString().slice(0, 10)}\n  ${p.data.description}`,
    ),
    "",
    "### Recent appearances",
    ...appearances
      .slice(0, 10)
      .map(
        (a) =>
          `- [${a.data.title}](${a.data.url}) - ${a.data.kind}, ${a.data.date.toISOString().slice(0, 10)}`,
      ),
    `- Full archive: ${SITE.url}/archive/`,
    "",
    "### Projects",
    ...PROJECTS.map((p) => `- ${p.name}: ${p.url} - ${p.blurb}`),
    "",
    "### Links",
    ...SOCIAL.map((s) => `- ${s.label}: ${s.url}`),
    "",
    `Full content dump: ${SITE.url}/llms-full.txt`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

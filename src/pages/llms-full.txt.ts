import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../data/site";

/* AI Engine Optimization: full markdown dump of all long-form content. */

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const appearances = (await getCollection("appearances")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const chunks: string[] = [
    `# ${SITE.name} - Full Content`,
    "",
    SITE.bio,
    "",
    "---",
    "",
    "# Articles",
  ];

  for (const p of posts) {
    chunks.push(
      "",
      `## ${p.data.title}`,
      "",
      `Date: ${p.data.date.toISOString().slice(0, 10)}`,
      `URL: ${SITE.url}/blog/${p.id.replace(/\/index$/, "")}/`,
      "",
      (p.body ?? "").trim(),
      "",
      "---",
    );
  }

  chunks.push("", "# Appearances (talks, podcasts, interviews, guest posts)");
  for (const a of appearances) {
    chunks.push(
      "",
      `- ${a.data.date.toISOString().slice(0, 10)} · ${a.data.kind} · ${a.data.title}`,
      `  ${a.data.url}${a.data.detail ? `\n  ${a.data.detail}` : ""}`,
    );
  }
  chunks.push("");

  return new Response(chunks.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

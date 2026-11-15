import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../data/site";

export async function GET(context) {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: `${SITE.title} — blog`,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id.replace(/\/index$/, "")}/`,
    })),
    customData: "<language>en</language>",
  });
}

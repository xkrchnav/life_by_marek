import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../lib/site";
import { withBase } from "../lib/url";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  const siteUrl = context.site ?? new URL("https://xkrchnav.github.io");

  return rss({
    title: "life_by_marek — články",
    description: site.description,
    site: new URL(withBase("/"), siteUrl),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: withBase(`/clanky/${post.id}/`),
      categories: post.data.tags,
    })),
    customData: "<language>cs-CZ</language>",
  });
}

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { rehypeBaseLinks } from "./src/lib/rehype-base.mjs";

const site = process.env.SITE_URL ?? "https://lifebymarek.cz";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/vyvoleni/"),
    }),
  ],
  markdown: {
    processor: unified({
      rehypePlugins: [[rehypeBaseLinks, { base }]],
    }),
  },
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
});

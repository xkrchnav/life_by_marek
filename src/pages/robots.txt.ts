import type { APIRoute } from "astro";
import { withBase } from "../lib/url";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://xkrchnav.github.io");
  const sitemap = new URL(withBase("/sitemap-index.xml"), siteUrl).toString();

  const body = [
    "User-agent: *",
    "Allow: /",
    `Disallow: ${withBase("/vyvoleni/")}`,
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

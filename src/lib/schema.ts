import { site } from "./site";
import { withBase } from "./url";

type Json = Record<string, unknown>;

export function personNode(siteUrl: URL): Json {
  return {
    "@type": "Person",
    "@id": `${siteUrl.origin}/#marek`,
    name: site.person,
    alternateName: site.name,
    url: new URL(withBase("/"), siteUrl).toString(),
    image: new URL(withBase(site.ogImage), siteUrl).toString(),
    sameAs: [site.instagram],
    jobTitle: "Tvůrce projektu life_by_marek",
    knowsAbout: [
      "zdravá dlouhověkost",
      "prevence",
      "složení těla",
      "výživa",
      "pohyb",
      "regenerace",
    ],
  };
}

export function websiteNode(siteUrl: URL): Json {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl.origin}/#website`,
    name: site.name,
    alternateName: "life_by_marek — Marek Širůček",
    url: new URL(withBase("/"), siteUrl).toString(),
    inLanguage: site.lang,
    publisher: { "@id": `${siteUrl.origin}/#marek` },
  };
}

export function faqNode(items: readonly { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbNode(siteUrl: URL, trail: readonly { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(withBase(crumb.path), siteUrl).toString(),
    })),
  };
}

export function blogPostingNode(options: {
  siteUrl: URL;
  title: string;
  description: string;
  path: string;
  published: Date;
  modified?: Date;
  image?: string;
  lang: string;
  section?: string;
  wordCount?: number;
}): Json {
  const url = new URL(withBase(options.path), options.siteUrl).toString();
  return {
    "@type": "BlogPosting",
    headline: options.title,
    description: options.description,
    datePublished: options.published.toISOString(),
    dateModified: (options.modified ?? options.published).toISOString(),
    inLanguage: options.lang,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(options.image ? { image: options.image } : {}),
    ...(options.section ? { articleSection: options.section } : {}),
    ...(options.wordCount ? { wordCount: options.wordCount } : {}),
    author: { "@id": `${options.siteUrl.origin}/#marek` },
    publisher: { "@id": `${options.siteUrl.origin}/#marek` },
    isPartOf: {
      "@type": "Blog",
      "@id": new URL(withBase("/clanky/"), options.siteUrl).toString(),
      name: "Články life_by_marek",
    },
  };
}

export function videoNode(options: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  embedUrl: string;
}): Json {
  return {
    "@type": "VideoObject",
    name: options.name,
    description: options.description,
    thumbnailUrl: options.thumbnailUrl,
    uploadDate: options.uploadDate,
    embedUrl: options.embedUrl,
  };
}

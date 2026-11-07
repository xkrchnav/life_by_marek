# life_by_marek

Osobní web Marka Širůčka. Statický, rychlý, česky. Jeden cíl: dostat člověka k přihlášce.

Postavené na **Astro 7** (bez frameworku, bez Tailwindu) + **MDX** pro články. Nasazuje se na GitHub Pages.

---

## Rychlý start

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # typová kontrola (musí projít)
npm run build      # statický build do dist/
npm run preview    # náhled buildu
```

Node 22+.

---

## Kde co upravit

| Co chceš změnit | Soubor |
| --- | --- |
| Texty v úvodu (hero) | `src/components/Hero.astro` |
| Výhody, kroky, otázky, ticker | `src/data/home.ts` |
| Příběh a fotka | `src/components/Story.astro` |
| Přihláška (formulář) | `src/components/Cta.astro` |
| Hlavička, menu, patička | `src/components/Header.astro`, `Footer.astro` |
| Barvy, písmo, rozestupy | `src/styles/global.css` (proměnné v `:root`) |
| Výchozí titulek a popis webu | `src/lib/site.ts` |
| Články | `src/content/blog/*.mdx` |
| Tajná stránka – texty, video, kód | `src/data/vyvoleni.ts` |
| Tajná stránka – vzhled | `src/styles/vyvoleni.css` |
| Fotky | `src/assets/` (obsahové), `public/` jen ikona a OG obrázek |

Pravidlo: **obsahové fotky patří do `src/assets/`**, ne do `public/`. Astro je sám zmenší a převede na WebP.

---

## Jak přidat článek

1. Vytvoř soubor `src/content/blog/muj-clanek.mdx` (název souboru = URL: `/clanky/muj-clanek/`).
2. Nahoru dej frontmatter:

```yaml
---
title: "Jak zhubnout bez diety"
description: "Krátký popis do 160 znaků, který se ukáže ve vyhledávání."
publishedAt: 2026-11-07
author: Marek Širůček
image: ../../assets/blog/foto.jpg
imageAlt: "Popis fotky pro nevidomé"
tags: ["Hubnutí", "Návyky"]
draft: false
lang: cs
---
```

| Pole | Povinné | Poznámka |
| --- | --- | --- |
| `title` | ano | H1 i titulek stránky. Drž ho do ~45 znaků, ať se vejde do Google. |
| `description` | ano | 140–160 znaků. Prodává článek ve výsledcích hledání. |
| `publishedAt` | ano | `YYYY-MM-DD` |
| `updatedAt` | ne | Když článek výrazně přepíšeš. |
| `author` | ne | Výchozí „Marek Širůček“. |
| `image` | ne | Cesta relativně k souboru článku. Bez obrázku se použije barevná karta. |
| `imageAlt` | ne | Vyplň vždy, když je obrázek. |
| `tags` | ne | První tag se zobrazí jako štítek. |
| `draft` | ne | `true` článek skryje z webu, sitemap i RSS. |
| `lang` | ne | `cs` (výchozí) nebo `sk`. |

3. Piš normální Markdown. **Odkazy piš od kořene** – `/clanky/`, `/#prihlaska`. Základní cesta (`/life_by_marek`) se doplní automaticky, i na vlastní doméně.
4. Článek se sám objeví na `/clanky/`, na úvodu, v sitemapě i v RSS. Nic dalšího nastavovat nemusíš.

Obrázky dávej do `src/assets/blog/` a v článku na ně odkazuj relativně (`../../assets/blog/nazev.jpg`).

---

## Tajná stránka pro vyvolené

- URL: **`/vyvoleni/`**
- Přístupový kód: **`marek2026`** (změna v `src/data/vyvoleni.ts` → `passphrase`)
- Video: `src/data/vyvoleni.ts` → `video.youtubeId` (to za `v=` v adrese YouTube)
- Tlačítko: `ctaUrl` a `ctaLabel`
- Texty, otázky, nabídka: stejný soubor
- Vzhled: `src/styles/vyvoleni.css`

Stránka je schválně:

- mimo hlavní navigaci,
- s `noindex, nofollow`,
- mimo `sitemap.xml`,
- zakázaná v `robots.txt`.

**Důležité:** zámek na kódu je jen na efekt. Obsah stránky je ve zdrojáku a kdokoli, kdo zná adresu, si ho může zobrazit. Na skutečné soukromí použij hosting s heslem (Cloudflare Access, Netlify password) nebo stránku na veřejný web vůbec nedávej.

---

## SEO, co je už hotové

- Unikátní `title` a `description` na každé stránce.
- Kanonická adresa (`canonical`) a absolutní OG obrázek.
- Strukturovaná data: `Person`, `WebSite`, `FAQPage`, `BlogPosting`, `BreadcrumbList`, `VideoObject`.
- `sitemap-index.xml` + `robots.txt` + `rss.xml`.
- OG obrázek `public/og.jpg` je 1200×630.
- Články mají vlastní 1200×630 náhled pro sociální sítě.
- Mobilní menu, skip link, focus stavy, `prefers-reduced-motion`.

Po nasazení nezapomeň:

1. Přidat web do [Google Search Console](https://search.google.com/search-console).
2. Odeslat sitemapu `https://<doména>/sitemap-index.xml`.
3. Zkontrolovat náhled na [opengraph.xyz](https://www.opengraph.xyz/).

---

## Nasazení

Automaticky přes GitHub Actions na GitHub Pages při pushi do `main`.

Workflow (`.github/workflows/astro.yml`) předává adresu a základní cestu přes proměnné:

- `SITE_URL` – doména (teď `https://xkrchnav.github.io`)
- `BASE_PATH` – `/life_by_marek` pro GitHub Pages

Lokálně se buildí s `BASE_PATH=/`, takže `http://localhost:4321/` funguje bez podadresáře.

**Až koupíš doménu:**

1. V GitHubu → Settings → Pages → Custom domain nastav doménu.
2. GitHub Actions pak předá `BASE_PATH=/` samo.
3. Hotovo – canonical, sitemap i OG odkazy se přepíšou.

Jiný hosting (Netlify, Vercel, Cloudflare Pages): nastav `SITE_URL` a `BASE_PATH=/`.

---

## Formulář

Teď je v režimu **demo** – validuje a ukáže poděkování, ale nikam neposílá.

Pro reálné odesílání nastav buildovací proměnnou `PUBLIC_LEAD_ENDPOINT` (Formspree, Make, n8n, vlastní API). Formulář tam pošle JSON:

```json
{ "name": "…", "email": "…", "phone": "…", "company": "" }
```

Pole `company` je honeypot – musí zůstat prázdné. Když endpoint není nastavený, formulář funguje dál jako demo.

---

## Struktura

```
src/
  assets/              fotky (Astro je optimalizuje)
  components/          Hero, Benefits, Steps, Story, Cta, Faq, BlogCard…
  content/blog/        články v MDX
  content.config.ts    schéma frontmatteru
  data/                texty a data (home.ts, vyvoleni.ts, icons.ts)
  layouts/Layout.astro HTML obal + SEO + reveal animace
  lib/                 pomocné funkce (SEO schema, base cesty, formát data)
  pages/               index, clanky/, vyvoleni/, 404, rss.xml, robots.txt
  styles/              global.css, vyvoleni.css
public/                favicon.svg, og.jpg
```

---

## Co ještě doladit

- [ ] Vyměnit video na tajné stránce za Markovo.
- [ ] Projít texty tří článků – jsou to návrhy, uprav je podle sebe.
- [ ] Doplnit vlastní fotky (teď jsou použité dvě z původního webu).
- [ ] Zapojit formulář (`PUBLIC_LEAD_ENDPOINT`).
- [ ] Po koupi domény nastavit Custom domain a Search Console.

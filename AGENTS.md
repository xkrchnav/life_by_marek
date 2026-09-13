# AGENTS.md

Instructions for AI agents working in this repository.

## Main idea

Single-page **Czech** landing page for **life_by_marek** — a healthy-lifestyle and weight-loss project by **Marek Širůček** (Instagram: [@life_by_marek](https://www.instagram.com/life_by_marek/)). The site is static, bright, mobile-first, and has one conversion goal.

## Narrative

The story is first-person and grounded in Marek's own transformation, taken from his social post:

- He lost weight gradually, not with a crash diet. He still eats what he loves, and he even moves less than before — because **movement is a supplement, not the main thing**.
- Just before 30 he looks and feels better than at 23: more energy, keeps up with his kids, plays football, sleeps and recovers better.
- The invitation is friendly and pressure-free: "If it works for me, it will work for you." Young people are the main audience, but nothing may scare older visitors (no extremes, no shaming, no forbidden foods).
- Guiding motto: **"life_by_marek"** — also his Instagram hook.

**Single CTA: "JDU DO TOHO"** (I'm in / Let's do it). It scrolls to the lead form with **name, e-mail, phone**.

## Stack

- **Astro 7** (`output: static`, no adapter) + **TypeScript** strict (`astro/tsconfigs/strict`)
- No UI framework, no Tailwind, no CSS preprocessor — markup lives in `src/components/`, shared CSS in `src/styles/global.css`, page data in `src/data/`
- Font: Manrope via Google Fonts
- Images: originals in `src/assets/`, rendered with `astro:assets` `<Image />`; `astro.config.mjs` sets `image.layout: "constrained"` + `image.responsiveStyles: true`
- `@astrojs/check` 0.9.x with **TypeScript 5 or 6 only** — do not bump TypeScript to 7, the peer range does not allow it

## Repository layout

```
public/favicon.svg          # gradient M mark
public/og.jpg               # social preview image (copy of the before/after photo)
src/assets/promena.jpg      # before/after transformation (hero)
src/assets/marek-akce.jpg   # Marek at an event (story section)
src/data/home.ts            # benefits, steps, ticker items
src/data/icons.ts           # inline SVG icon strings
src/styles/global.css       # all styles (global, unscoped)
src/layouts/Layout.astro    # html shell, head meta, reveal script
src/components/             # Header, Logo, Hero, Ticker, Benefits, Steps, Story, Cta, Footer
src/components/Cta.astro    # lead form + form validation script
src/pages/index.astro       # composes the components
astro.config.mjs            # image config only
package.json                # scripts: dev, build, preview, check
```

## Commands

```
npm run dev       # dev server on http://localhost:4321
npm run check     # astro check (type diagnostics) — must pass
npm run build     # static build to dist/
npm run preview   # serve dist/
```

Always verify changes with `npm run check && npm run build`. For visual verification, headless Chrome is available at `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe` (use `--headless=new --screenshot=... --window-size=390,844` or Playwright with `channel`/`executablePath`, installed ad hoc in a temp dir — do not add test deps to this project).

## Conventions

- **All user-facing copy is Czech**, short and action-oriented; no long paragraphs. Keep the "JDU DO TOHO" wording exactly.
- **No code comments** unless requested.
- Colors are CSS variables in `:root`: green `#7AC143`, blue `#2E7CC4`, dark `#3F7C1F` / `#1F5E9C` for small text on white (contrast), ink `#12324A`, soft tints `--green-soft` / `--blue-soft`. Use `--grad` for decorative gradients and the provided button gradient classes for CTAs.
- Mobile-first CSS; breakpoints used: 600 / 720 / 820 / 920 / 960 / 1000 px.
- Images: always `astro:assets` with explicit `widths` + `sizes`; never put content images in `public/`.
- Accessibility: real labels for inputs, `aria-hidden` on decorative SVGs, `focus-visible` outlines, `prefers-reduced-motion` respected (ticker + reveal animations), skip link.
- Czech typography and diacritics must be preserved everywhere (lang="cs").

## Form behavior

The `#lead-form` is currently **demo-only**: JS validates name / e-mail / phone in Czech, marks `.field-error`, and swaps the form for the `#form-success` panel. There is no backend. To connect a real endpoint (Formspree, Make, etc.), replace the submit handler's success block in `src/components/Cta.astro` (search `lead-form`) with a `fetch()` POST; keep the validation and success UI.

## Deployment notes

- The build is fully static; deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, …).
- `site` is intentionally not set in `astro.config.mjs`. When the production domain is known, set `site` and turn `og:image` in `Layout.astro` into an absolute URL.
- Lead data (name, e-mail, phone) is personal data — if a real backend is added, make sure privacy expectations of the Czech copy ("Žádný spam…") stay true.

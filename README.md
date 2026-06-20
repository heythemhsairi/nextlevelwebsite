# Next Level — Editing-team marketing site

Bold-editorial redesign, built with **Astro** (static, no DB). Tunisian-darija RTL content.

## Run locally
```bash
npm install
npm run dev       # http://localhost:3000 (or next free port)
```

## Build for production
```bash
npm run build     # outputs static files to ./dist
npm run preview   # preview the production build
```

## Deploy
`./dist` is plain static HTML/CSS/JS — host it anywhere:
- **Netlify / Cloudflare Pages / Vercel** — point at this repo, build command `npm run build`, publish dir `dist`.
- **Drag-and-drop** — run `npm run build`, then drop the `dist` folder on app.netlify.com/drop.

## ⚠️ Before going live — replace placeholders
All content lives in **`src/config.ts`**. Update:
1. `site.whatsapp` — real WhatsApp number (international, no `+`).
2. **`public/site.js`** → `WHATSAPP_NUMBER` — must match the number above (used by the lead form).
3. `site.socials` — real Instagram / TikTok / YouTube URLs.
4. Metrics / testimonials / team — confirm the numbers and names are real (currently placeholder).
5. Swap the **sample media** in `public/media/` for your real exports, then point each entry in
   `src/config.ts` (`work`, `testimonials`, `socialThumbs`, `heroPoster`, `beforeAfter`) at them.
   Portfolio tiles expect a vertical 9:16 poster + a muted/looping clip; testimonials a face image;
   before/after a raw frame + a graded frame. The current files are royalty-free placeholders.

## Social share image
`public/og.png` (1200×630) is generated from `scripts/make-og.mjs`. After changing the
tagline/brand, regenerate it:
```bash
node scripts/make-og.mjs
```

## Structure
- `src/config.ts` — all copy + contact info (single source of truth)
- `src/layouts/Base.astro` — `<head>`, SEO/OpenGraph, fonts
- `src/components/` — Nav, Footer, Marquee, Social, Modal
- `src/pages/` — `index.astro` (home), `team.astro`
- `src/styles/global.css` — design tokens + base styles
- `public/site.js` — interactivity (form→WhatsApp, before/after slider, reveals, counters)
- `legacy/` — the original single-file HTML site (kept for reference)
```

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://nextlevel.tn',
  // 'directory' → /team builds to /team/index.html, served cleanly by Vercel
  build: { format: 'directory' },
  // React is used ONLY for isolated interactive islands (circular work gallery).
  // Static content stays in Astro components — do not hydrate whole pages.
  integrations: [react()],
});

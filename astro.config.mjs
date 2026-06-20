import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nextlevel.tn',
  // 'directory' → /team builds to /team/index.html, served cleanly by Vercel
  build: { format: 'directory' },
});

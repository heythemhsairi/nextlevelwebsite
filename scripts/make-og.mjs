/* Generates public/og.png (1200x630) — run: node scripts/make-og.mjs */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="r" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FF4D4D"/><stop offset="1" stop-color="#B00C12"/>
    </linearGradient>
    <radialGradient id="bloom" cx="78%" cy="8%" r="60%">
      <stop offset="0" stop-color="#FF2A2A" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#FF2A2A" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="0"/></filter>
  </defs>
  <rect width="1200" height="630" fill="#050505"/>
  <rect width="1200" height="630" fill="url(#bloom)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#r)"/>

  <g font-family="Sora, Arial, sans-serif">
    <text x="90" y="150" fill="#FF2A2A" font-size="24" font-weight="700" letter-spacing="6">MEDIA PRODUCTION HOUSE — TUNISIA</text>
    <text x="86" y="300" fill="#FAFAFA" font-size="118" font-weight="800" letter-spacing="-3">Next<tspan fill="#FF2A2A">Level</tspan></text>
    <text x="90" y="384" fill="#FAFAFA" font-size="38" font-weight="700">We make experts look like the authority they are.</text>
    <text x="90" y="438" fill="#ABA4A8" font-size="30" font-weight="600">You show up. We handle the rest.</text>
  </g>

  <g font-family="Sora, Arial, sans-serif">
    <text x="90" y="548" fill="#ABA4A8" font-size="26" font-weight="600">For doctors · lawyers · consultants · founders</text>
  </g>

  <circle cx="1080" cy="120" r="9" fill="#FF2A2A"/>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL('../public/og.png', import.meta.url), png);
console.log('wrote public/og.png', png.length, 'bytes');

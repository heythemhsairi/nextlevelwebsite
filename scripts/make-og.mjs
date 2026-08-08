/* Generates public/og.png (1200x630) — run: node scripts/make-og.mjs
   Brand: near-black #0A0808 · red #E63329 · warm white #F4F1EE (flat, no glows) */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0A0808"/>
  <rect x="0" y="0" width="1200" height="8" fill="#E63329"/>

  <g font-family="Inter, Arial, sans-serif">
    <text x="90" y="150" fill="#E63329" font-size="24" font-weight="600" letter-spacing="6">MEDIA PRODUCTION HOUSE — TUNISIA</text>
    <text x="86" y="305" fill="#F4F1EE" font-size="124" font-weight="800" letter-spacing="-3">Next<tspan fill="#E63329">Level</tspan></text>
    <text x="90" y="392" fill="#F4F1EE" font-size="36" font-weight="700">Strategy · Scripts · Production · Editing · Publishing</text>
    <text x="90" y="548" fill="#F4F1EE" fill-opacity="0.6" font-size="26" font-weight="600">For doctors · lawyers · consultants · founders</text>
  </g>

  <rect x="90" y="470" width="120" height="4" fill="#E63329"/>
  <circle cx="1090" cy="112" r="9" fill="#E63329"/>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL('../public/og.png', import.meta.url), png);
console.log('wrote public/og.png', png.length, 'bytes');

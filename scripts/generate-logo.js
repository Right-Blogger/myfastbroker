import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// SVG definition of the exact geometric logo from the user's image
const createLogoSvg = (size = 512, background = 'transparent') => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
  <defs>
    <linearGradient id="mainSpireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EA1D25" />
      <stop offset="100%" stop-color="#D4141E" />
    </linearGradient>
    <linearGradient id="bottomFoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#910D14" />
      <stop offset="100%" stop-color="#BD151D" />
    </linearGradient>
  </defs>
  ${background !== 'transparent' ? `<rect width="100" height="100" rx="20" fill="${background}" />` : ''}
  <!-- Upper origami wing / spire -->
  <polygon points="32,89.5 32,48 62,4 42.5,62" fill="url(#mainSpireGrad)" />
  <!-- Bottom shaded facet / fold -->
  <polygon points="32,89.5 42.5,62 63,89.5" fill="url(#bottomFoldGrad)" />
  <!-- Accent circle dot -->
  <circle cx="58.5" cy="58.5" r="9.2" fill="#EA1D25" />
</svg>`;
};

async function buildAssets() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Transparent SVG for header, footer, and vector usage
  const svgContent = createLogoSvg(512, 'transparent');
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);

  // 2. SVG with white rounded container matching user's exact uploaded asset
  const svgBadge = createLogoSvg(512, '#FFFFFF');
  fs.writeFileSync(path.join(publicDir, 'logo-badge.svg'), svgBadge);

  // 3. High-res transparent PNG (512x512)
  await sharp(Buffer.from(svgContent))
    .png()
    .toFile(path.join(publicDir, 'logo.png'));

  // 4. White badge PNG (512x512)
  await sharp(Buffer.from(svgBadge))
    .png()
    .toFile(path.join(publicDir, 'logo-badge.png'));

  // 5. Standard Favicon PNGs (32x32, 192x192, 512x512, apple-touch-icon 180x180)
  await sharp(Buffer.from(svgContent))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  await sharp(Buffer.from(svgContent))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(Buffer.from(svgContent))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  await sharp(Buffer.from(svgContent))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  // 6. ICO file (32x32)
  await sharp(Buffer.from(svgContent))
    .resize(32, 32)
    .toFormat('png')
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('All logo and favicon assets created successfully in /public!');
}

buildAssets().catch(console.error);

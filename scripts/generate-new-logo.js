import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// High-fidelity SVG of the blue handshake circular emblem matching the user's uploaded Logo.webp
export const createBlueHandshakeLogoSvg = (size = 500, background = 'transparent') => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="${size}" height="${size}">
  <defs>
    <!-- Upper deep royal blue crescent gradient -->
    <linearGradient id="topCrescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E6EFF" />
      <stop offset="45%" stop-color="#0052FF" />
      <stop offset="100%" stop-color="#0035C8" />
    </linearGradient>

    <!-- Top crescent inner shadow / depth -->
    <linearGradient id="topCrescentInner" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#002D9C" />
      <stop offset="100%" stop-color="#00186E" />
    </linearGradient>

    <!-- Bottom-left electric cyan / azure crescent gradient -->
    <linearGradient id="cyanCrescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00D2FF" />
      <stop offset="50%" stop-color="#009BF8" />
      <stop offset="100%" stop-color="#0066FF" />
    </linearGradient>

    <!-- Upper blue hand & wrist gradient -->
    <linearGradient id="blueHandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D7EFF" />
      <stop offset="60%" stop-color="#0052FF" />
      <stop offset="100%" stop-color="#0030B0" />
    </linearGradient>

    <!-- Under-thumb shadow -->
    <linearGradient id="thumbShadow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00238C" />
      <stop offset="100%" stop-color="#001560" />
    </linearGradient>

    <!-- White hand gradient with subtle soft blue depth -->
    <linearGradient id="whiteHandGrad" x1="20%" y1="20%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="85%" stop-color="#F2F8FF" />
      <stop offset="100%" stop-color="#DCEBFF" />
    </linearGradient>

    <!-- Luminous electric cyan finger capsule highlight -->
    <linearGradient id="cyanCapsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="60%" stop-color="#00A2FF" />
      <stop offset="100%" stop-color="#0066FF" />
    </linearGradient>
    
    <!-- Outer rim shine -->
    <linearGradient id="topRimShine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#55A0FF" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#A6D2FF" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#3D85FF" stop-opacity="0.3" />
    </linearGradient>

    <!-- Filter for clean soft glow -->
    <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  ${background !== 'transparent' ? `<rect width="500" height="500" rx="90" fill="${background}" />` : ''}

  <!-- 1. Motion horizontal lines on bottom-right -->
  <g stroke="#002094" stroke-width="9" stroke-linecap="round">
    <line x1="410" y1="365" x2="492" y2="365" />
    <line x1="390" y1="410" x2="495" y2="410" />
    <line x1="350" y1="455" x2="490" y2="455" />
  </g>

  <!-- 2. Lower-left electric cyan crescent -->
  <path d="M 2 195 
           C 0 255, 15 320, 52 375 
           C 95 440, 168 490, 250 498 
           C 330 500, 405 465, 460 410 
           C 430 435, 360 465, 290 460 
           C 200 455, 120 405, 80 325 
           C 52 270, 40 215, 48 160 
           C 22 170, 8 182, 2 195 Z" 
        fill="url(#cyanCrescentGrad)" />

  <!-- 3. Upper deep royal blue crescent -->
  <path d="M 50 110 
           C 85 45, 160 8, 250 8 
           C 345 8, 425 50, 470 125 
           C 490 160, 498 200, 498 238 
           C 498 238, 480 200, 455 170 
           C 420 130, 360 90, 270 95 
           C 180 100, 115 150, 75 210 
           C 65 170, 56 135, 50 110 Z" 
        fill="url(#topCrescentGrad)" />

  <!-- Top rim highlight -->
  <path d="M 85 85 C 130 38, 190 16, 260 16 C 330 16, 395 38, 445 85" 
        fill="none" stroke="url(#topRimShine)" stroke-width="4.5" stroke-linecap="round" />

  <!-- 4. Inner deep shadow facet between top crescent & handshake -->
  <path d="M 75 210 C 130 130, 240 100, 340 120 C 390 130, 430 155, 455 170 C 420 185, 370 190, 320 185 C 240 180, 160 195, 115 235 Z" 
        fill="url(#topCrescentInner)" opacity="0.85" />

  <!-- 5. Upper Hand (Blue grasping hand) -->
  <!-- Hand body & wrist from top right -->
  <path d="M 455 170 
           C 490 205, 498 238, 498 238 
           C 475 270, 440 310, 400 320 
           C 365 295, 335 240, 310 200 
           C 280 185, 230 190, 190 220 
           C 180 230, 175 245, 175 260 
           C 175 275, 185 285, 205 285 
           C 225 285, 255 260, 280 245 
           C 310 225, 345 220, 385 225 
           C 415 230, 445 220, 455 170 Z" 
        fill="url(#blueHandGrad)" />

  <!-- Blue thumb contour -->
  <path d="M 190 220 
           C 175 235, 172 255, 175 270 
           C 180 282, 195 288, 210 285 
           C 230 280, 255 255, 280 245 
           C 255 245, 220 230, 190 220 Z" 
        fill="#0050EA" />

  <!-- Dark crease under thumb -->
  <path d="M 195 283 C 220 283, 245 260, 275 248 C 255 258, 230 275, 205 278 Z" 
        fill="url(#thumbShadow)" />

  <!-- 6. Lower Hand (White grasping hand with 4 fingers) -->
  <!-- Main white palm & wrist -->
  <path d="M 185 275 
           C 200 265, 225 250, 260 240 
           C 300 230, 335 245, 365 270 
           C 390 295, 395 325, 385 350 
           C 375 375, 340 395, 310 405 
           C 280 415, 250 420, 220 425 
           C 195 400, 175 365, 165 330 
           C 155 295, 168 280, 185 275 Z" 
        fill="url(#whiteHandGrad)" />

  <!-- 4 Fingers on the white hand -->
  <!-- Finger 1 (Index Finger - bottom most) -->
  <g>
    <path d="M 220 425 C 205 435, 190 415, 200 400 L 255 355 C 265 345, 280 355, 270 368 L 220 425 Z" 
          fill="url(#whiteHandGrad)" />
    <!-- Cyan capsule on Finger 1 -->
    <rect x="220" y="375" width="22" height="42" rx="11" 
          transform="rotate(40 231 396)" fill="url(#cyanCapsuleGrad)" />
  </g>

  <!-- Finger 2 (Middle Finger) -->
  <g>
    <path d="M 260 395 C 245 405, 230 385, 240 370 L 305 320 C 315 310, 330 320, 320 335 L 260 395 Z" 
          fill="url(#whiteHandGrad)" />
    <!-- Cyan capsule on Finger 2 -->
    <rect x="260" y="335" width="24" height="46" rx="12" 
          transform="rotate(40 272 358)" fill="url(#cyanCapsuleGrad)" />
  </g>

  <!-- Finger 3 (Ring Finger) -->
  <g>
    <path d="M 305 365 C 290 375, 275 355, 285 340 L 350 288 C 360 278, 375 290, 365 305 L 305 365 Z" 
          fill="url(#whiteHandGrad)" />
    <!-- Cyan capsule on Finger 3 -->
    <rect x="305" y="300" width="25" height="48" rx="12.5" 
          transform="rotate(40 317 324)" fill="url(#cyanCapsuleGrad)" />
  </g>

  <!-- Finger 4 (Pinky / Top Finger) -->
  <g>
    <path d="M 350 330 C 335 340, 320 320, 330 305 L 390 252 C 400 242, 415 255, 405 270 L 350 330 Z" 
          fill="url(#whiteHandGrad)" />
    <!-- Cyan capsule on Finger 4 -->
    <rect x="345" y="265" width="25" height="48" rx="12.5" 
          transform="rotate(40 357 289)" fill="url(#cyanCapsuleGrad)" />
  </g>

  <!-- White cuff connector / palm contour -->
  <path d="M 215 278 
           C 255 242, 305 250, 350 270 
           C 390 290, 400 325, 385 355 
           C 365 385, 310 410, 260 418 
           C 230 405, 210 380, 200 350 
           C 190 320, 195 290, 215 278 Z" 
        fill="url(#whiteHandGrad)" />

  <!-- 4 Cyan Knuckle/Capsule inlays on the white hand -->
  <g filter="url(#softGlow)">
    <rect x="238" y="360" width="20" height="38" rx="10" transform="rotate(42 248 379)" fill="url(#cyanCapsuleGrad)" />
    <rect x="278" y="322" width="22" height="42" rx="11" transform="rotate(42 289 343)" fill="url(#cyanCapsuleGrad)" />
    <rect x="320" y="284" width="23" height="44" rx="11.5" transform="rotate(42 331 306)" fill="url(#cyanCapsuleGrad)" />
    <rect x="362" y="246" width="23" height="44" rx="11.5" transform="rotate(42 373 268)" fill="url(#cyanCapsuleGrad)" />
  </g>
</svg>`;
};

async function buildNewAssets() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Transparent SVG
  const svgContent = createBlueHandshakeLogoSvg(512, 'transparent');
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);

  // 2. High-res transparent PNG (512x512)
  await sharp(Buffer.from(svgContent))
    .png()
    .toFile(path.join(publicDir, 'logo.png'));

  // 3. Dark-card badge PNG and SVG (for preview or dark UI usage)
  const svgBadge = createBlueHandshakeLogoSvg(512, '#08080C');
  fs.writeFileSync(path.join(publicDir, 'logo-badge.svg'), svgBadge);
  await sharp(Buffer.from(svgBadge))
    .png()
    .toFile(path.join(publicDir, 'logo-badge.png'));

  // 4. Standard Favicon PNGs (32x32, 192x192, 512x512, apple-touch-icon 180x180)
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

  // 5. ICO file
  await sharp(Buffer.from(svgContent))
    .resize(32, 32)
    .toFormat('png')
    .toFile(path.join(publicDir, 'favicon.ico'));

  // 6. Also copy into app/
  const appDir = path.resolve('app');
  fs.copyFileSync(path.join(publicDir, 'favicon.ico'), path.join(appDir, 'favicon.ico'));
  fs.copyFileSync(path.join(publicDir, 'favicon.svg'), path.join(appDir, 'icon.svg'));

  console.log('Successfully regenerated all new blue handshake logo assets!');
}

buildNewAssets().catch(console.error);

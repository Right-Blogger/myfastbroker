'use client';

import React from 'react';

interface BrandLogoProps {
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'mark' | 'badge';
  className?: string;
  withText?: boolean;
  textClassName?: string;
  onClick?: () => void;
}

export default function BrandLogo({
  size = 'md',
  variant = 'badge',
  className = '',
  withText = false,
  textClassName = '',
  onClick,
}: BrandLogoProps) {
  // Dimension mapping
  const sizeMap: Record<string, number> = {
    xs: 24,
    sm: 32,
    md: 38,
    lg: 48,
    xl: 64,
  };

  const pixelSize = typeof size === 'number' ? size : sizeMap[size] || 38;
  const isBadge = variant === 'badge';

  const logoGraphic = (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
        isBadge
          ? 'bg-[#090e1a] rounded-xl shadow-md shadow-blue-500/15 border border-blue-500/25 p-1'
          : ''
      } ${className}`}
      style={{
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
      }}
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Upper deep royal blue crescent gradient */}
          <linearGradient id="blTopCrescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E6EFF" />
            <stop offset="45%" stopColor="#0052FF" />
            <stop offset="100%" stopColor="#0035C8" />
          </linearGradient>

          {/* Top crescent inner shadow / depth */}
          <linearGradient id="blTopCrescentInner" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#002D9C" />
            <stop offset="100%" stopColor="#00186E" />
          </linearGradient>

          {/* Bottom-left electric cyan / azure crescent gradient */}
          <linearGradient id="blCyanCrescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="50%" stopColor="#009BF8" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>

          {/* Upper blue hand & wrist gradient */}
          <linearGradient id="blBlueHandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D7EFF" />
            <stop offset="60%" stopColor="#0052FF" />
            <stop offset="100%" stopColor="#0030B0" />
          </linearGradient>

          {/* Under-thumb shadow */}
          <linearGradient id="blThumbShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00238C" />
            <stop offset="100%" stopColor="#001560" />
          </linearGradient>

          {/* White hand gradient with subtle soft blue depth */}
          <linearGradient id="blWhiteHandGrad" x1="20%" y1="20%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#F2F8FF" />
            <stop offset="100%" stopColor="#DCEBFF" />
          </linearGradient>

          {/* Luminous electric cyan finger capsule highlight */}
          <linearGradient id="blCyanCapsuleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="60%" stopColor="#00A2FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>

          {/* Outer rim shine */}
          <linearGradient id="blTopRimShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#55A0FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#A6D2FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3D85FF" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* 1. Motion horizontal lines on bottom-right */}
        <g stroke="#002094" strokeWidth="9" strokeLinecap="round">
          <line x1="410" y1="365" x2="492" y2="365" />
          <line x1="390" y1="410" x2="495" y2="410" />
          <line x1="350" y1="455" x2="490" y2="455" />
        </g>

        {/* 2. Lower-left electric cyan crescent */}
        <path
          d="M 2 195 
             C 0 255, 15 320, 52 375 
             C 95 440, 168 490, 250 498 
             C 330 500, 405 465, 460 410 
             C 430 435, 360 465, 290 460 
             C 200 455, 120 405, 80 325 
             C 52 270, 40 215, 48 160 
             C 22 170, 8 182, 2 195 Z"
          fill="url(#blCyanCrescentGrad)"
        />

        {/* 3. Upper deep royal blue crescent */}
        <path
          d="M 50 110 
             C 85 45, 160 8, 250 8 
             C 345 8, 425 50, 470 125 
             C 490 160, 498 200, 498 238 
             C 498 238, 480 200, 455 170 
             C 420 130, 360 90, 270 95 
             C 180 100, 115 150, 75 210 
             C 65 170, 56 135, 50 110 Z"
          fill="url(#blTopCrescentGrad)"
        />

        {/* Top rim highlight */}
        <path
          d="M 85 85 C 130 38, 190 16, 260 16 C 330 16, 395 38, 445 85"
          fill="none"
          stroke="url(#blTopRimShine)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* 4. Inner deep shadow facet between top crescent & handshake */}
        <path
          d="M 75 210 C 130 130, 240 100, 340 120 C 390 130, 430 155, 455 170 C 420 185, 370 190, 320 185 C 240 180, 160 195, 115 235 Z"
          fill="url(#blTopCrescentInner)"
          opacity="0.85"
        />

        {/* 5. Upper Hand (Blue grasping hand) */}
        <path
          d="M 455 170 
             C 490 205, 498 238, 498 238 
             C 475 270, 440 310, 400 320 
             C 365 295, 335 240, 310 200 
             C 280 185, 230 190, 190 220 
             C 180 230, 175 245, 175 260 
             C 175 275, 185 285, 205 285 
             C 225 285, 255 260, 280 245 
             C 310 225, 345 220, 385 225 
             C 415 230, 445 220, 455 170 Z"
          fill="url(#blBlueHandGrad)"
        />

        {/* Blue thumb contour */}
        <path
          d="M 190 220 
             C 175 235, 172 255, 175 270 
             C 180 282, 195 288, 210 285 
             C 230 280, 255 255, 280 245 
             C 255 245, 220 230, 190 220 Z"
          fill="#0050EA"
        />

        {/* Dark crease under thumb */}
        <path
          d="M 195 283 C 220 283, 245 260, 275 248 C 255 258, 230 275, 205 278 Z"
          fill="url(#blThumbShadow)"
        />

        {/* 6. Lower Hand (White grasping hand with fingers) */}
        <path
          d="M 185 275 
             C 200 265, 225 250, 260 240 
             C 300 230, 335 245, 365 270 
             C 390 295, 395 325, 385 350 
             C 375 375, 340 395, 310 405 
             C 280 415, 250 420, 220 425 
             C 195 400, 175 365, 165 330 
             C 155 295, 168 280, 185 275 Z"
          fill="url(#blWhiteHandGrad)"
        />

        {/* 4 Fingers on the white hand */}
        <g>
          <path
            d="M 220 425 C 205 435, 190 415, 200 400 L 255 355 C 265 345, 280 355, 270 368 L 220 425 Z"
            fill="url(#blWhiteHandGrad)"
          />
          <rect
            x="220"
            y="375"
            width="22"
            height="42"
            rx="11"
            transform="rotate(40 231 396)"
            fill="url(#blCyanCapsuleGrad)"
          />
        </g>

        <g>
          <path
            d="M 260 395 C 245 405, 230 385, 240 370 L 305 320 C 315 310, 330 320, 320 335 L 260 395 Z"
            fill="url(#blWhiteHandGrad)"
          />
          <rect
            x="260"
            y="335"
            width="24"
            height="46"
            rx="12"
            transform="rotate(40 272 358)"
            fill="url(#blCyanCapsuleGrad)"
          />
        </g>

        <g>
          <path
            d="M 305 365 C 290 375, 275 355, 285 340 L 350 288 C 360 278, 375 290, 365 305 L 305 365 Z"
            fill="url(#blWhiteHandGrad)"
          />
          <rect
            x="305"
            y="300"
            width="25"
            height="48"
            rx="12.5"
            transform="rotate(40 317 324)"
            fill="url(#blCyanCapsuleGrad)"
          />
        </g>

        <g>
          <path
            d="M 350 330 C 335 340, 320 320, 330 305 L 390 252 C 400 242, 415 255, 405 270 L 350 330 Z"
            fill="url(#blWhiteHandGrad)"
          />
          <rect
            x="345"
            y="265"
            width="25"
            height="48"
            rx="12.5"
            transform="rotate(40 357 289)"
            fill="url(#blCyanCapsuleGrad)"
          />
        </g>

        {/* White palm connector */}
        <path
          d="M 215 278 
             C 255 242, 305 250, 350 270 
             C 390 290, 400 325, 385 355 
             C 365 385, 310 410, 260 418 
             C 230 405, 210 380, 200 350 
             C 190 320, 195 290, 215 278 Z"
          fill="url(#blWhiteHandGrad)"
        />

        {/* 4 Cyan Knuckle capsules */}
        <rect
          x="238"
          y="360"
          width="20"
          height="38"
          rx="10"
          transform="rotate(42 248 379)"
          fill="url(#blCyanCapsuleGrad)"
        />
        <rect
          x="278"
          y="322"
          width="22"
          height="42"
          rx="11"
          transform="rotate(42 289 343)"
          fill="url(#blCyanCapsuleGrad)"
        />
        <rect
          x="320"
          y="284"
          width="23"
          height="44"
          rx="11.5"
          transform="rotate(42 331 306)"
          fill="url(#blCyanCapsuleGrad)"
        />
        <rect
          x="362"
          y="246"
          width="23"
          height="44"
          rx="11.5"
          transform="rotate(42 373 268)"
          fill="url(#blCyanCapsuleGrad)"
        />
      </svg>
    </div>
  );

  if (!withText) {
    return logoGraphic;
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${textClassName}`}
      onClick={onClick}
    >
      {logoGraphic}
      <div>
        <div className="text-xl font-bold text-white tracking-tight flex items-center gap-0.5">
          <span>MyFastBroker</span>
          <span className="text-blue-500 font-extrabold">.news</span>
        </div>
        <div className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase">
          Compare • Cut Fees • Trade
        </div>
      </div>
    </div>
  );
}

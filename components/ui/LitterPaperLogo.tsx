'use client';

import React from 'react';

interface LitterPaperLogoProps {
  className?: string;
  size?: number;
}

export function LitterPaperLogo({ className = '', size = 36 }: LitterPaperLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cardboard Box Background */}
      <path
        d="M20 50 L80 50 L75 88 C75 90 73 92 70 92 L30 92 C27 92 25 90 25 88 Z"
        fill="#C19A6B"
        stroke="#333333"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Front Box Flaps */}
      <path
        d="M12 42 L35 54 L35 68 L15 54 Z"
        fill="#B08757"
        stroke="#333333"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M88 42 L65 54 L65 68 L85 54 Z"
        fill="#B08757"
        stroke="#333333"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      
      {/* Cat Head */}
      <path
        d="M32 44 C30 32 36 18 40 20 C46 22 50 30 50 30 C50 30 54 22 60 20 C64 18 70 32 68 44 C68 46 64 52 50 52 C36 52 32 46 32 44 Z"
        fill="#FFFFFF"
        stroke="#333333"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Cat Left Ear Inner */}
      <path
        d="M35 24 L42 30"
        stroke="#333333"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Cat Right Ear Inner */}
      <path
        d="M65 24 L58 30"
        stroke="#333333"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Cat Eyes */}
      <ellipse cx="43" cy="36" rx="2.5" ry="3.5" fill="#333333" />
      <ellipse cx="57" cy="36" rx="2.5" ry="3.5" fill="#333333" />

      {/* Cat Nose & Mouth */}
      <polygon points="50,40 48,38 52,38" fill="#333333" />
      <path
        d="M47 42 C48.5 44 50 43 50 42 C50 43 51.5 44 53 42"
        stroke="#333333"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Whiskers Left */}
      <path d="M37 39 L26 37" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M37 41 L27 43" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />

      {/* Whiskers Right */}
      <path d="M63 39 L74 37" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M63 41 L73 43" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />

      {/* Cat Paws Resting on Box Edge */}
      <ellipse cx="38" cy="51" rx="6" ry="4" fill="#FFFFFF" stroke="#333333" strokeWidth="3" />
      <ellipse cx="62" cy="51" rx="6" ry="4" fill="#FFFFFF" stroke="#333333" strokeWidth="3" />
    </svg>
  );
}

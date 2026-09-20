import React from 'react';

// Simple, clean WalletWave Logo: Mint green gradient badge with W and currency stroke
export function LogoIcon({ className = "w-9 h-9" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoMint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {/* Mint green gradient rounded background */}
      <rect width="36" height="36" rx="8" fill="url(#logoMint)" />

      {/* Clean minimal 'W' in white */}
      <path
        d="M8 12.5L12.5 24L18 15L23.5 24L28 12.5"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Vertical currency line in mint accent */}
      <line 
        x1="18" y1="8.5" x2="18" y2="27.5" 
        stroke="#d1fae5" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
    </svg>
  );
}

export default function Logo({ size = "default", onClick = () => {} }) {
  return (
    <div 
      onClick={onClick} 
      className="flex items-center gap-2.5 cursor-pointer group select-none"
    >
      <LogoIcon className={size === "large" ? "w-10 h-10" : "w-8 h-8"} />
      <div className="flex items-baseline">
        <span className="text-xl font-bold tracking-tight text-white font-outfit">
          Wallet<span className="text-emerald-400">Wave</span>
        </span>
      </div>
    </div>
  );
}

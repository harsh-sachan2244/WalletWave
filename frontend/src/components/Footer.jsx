import React from 'react';
import { LogoIcon } from './Logo';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 py-8 text-center text-sm text-zinc-400">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center gap-2.5">
        <div className="flex items-center gap-2 font-bold text-white text-base">
          <LogoIcon className="w-6 h-6" />
          <span>WalletWave</span>
        </div>
        <p className="text-xs text-zinc-500">
          Smart expense tracking and effortless personal budgeting.
        </p>
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} WalletWave. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

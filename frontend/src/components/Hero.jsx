import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LogoIcon } from './Logo';
import heroMoneyImg from '../assets/hero-money.jpg';

export default function Hero() {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-8 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Simple Money Image (Upside on mobile, right side on desktop) */}
        <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 w-full flex items-center justify-center">
          <div className="relative group w-full max-w-60 sm:max-w-75 md:max-w-sm lg:max-w-md">
            {/* Soft ambient mint glow behind the image */}
            <div className="absolute -inset-2 bg-emerald-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-500" />
            
            {/* Simple Clean Money Illustration */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-700/70 bg-zinc-950/60 shadow-2xl">
              <img
                src={heroMoneyImg}
                alt="Wallet and money illustration"
                className="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Content Column (Headline, Copy, CTA Buttons - Below image on mobile, Left on desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
          
          {/* Top Badge with Logo */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-800/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4 sm:mb-6">
            <LogoIcon className="w-3.5 h-3.5 rounded-sm" />
            <span>Smart Personal Finance Tracker</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4 sm:mb-6">
            Master your money with{' '}
            <span className="bg-linear-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
              WalletWave
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-xl mb-6 sm:mb-8 leading-relaxed font-normal">
            A clean, distraction-free expense tracker. Keep tabs on everyday purchases, 
            stay on top of monthly spending limits, and achieve your financial targets with total clarity.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
            <Link
              to="/signup"
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] w-full sm:w-auto"
            >
              <span>Start Tracking Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={scrollToFeatures}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-zinc-700 hover:border-zinc-600 transition cursor-pointer text-center w-full sm:w-auto"
            >
              Explore Features
            </button>
          </div>

          {/* Trust Highlights Checklist */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 sm:gap-x-6 text-xs text-zinc-400 pt-3 border-t border-zinc-800/80 w-full">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>No Credit Card Needed</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Strictly Private & Encrypted</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

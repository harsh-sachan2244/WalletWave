import React from 'react';
import { Zap, Shield, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { value: '100% Free', label: 'No hidden paywalls or surprise charges' },
    { value: '0% Data Sold', label: 'Strict zero-ad, privacy-first commitment' },
    { value: '< 5 Seconds', label: 'Average time to log a daily transaction' },
  ];

  const points = [
    {
      icon: Zap,
      title: 'Fast & Seamless',
      description: 'Record any purchase in under five seconds with a clean, distraction-free interface built for speed.'
    },
    {
      icon: Shield,
      title: 'Private by Design',
      description: 'Your financial information belongs solely to you. Zero data selling, zero tracking cookies, zero ads.'
    },
    {
      icon: Target,
      title: 'Goal Focused',
      description: 'Transform vague savings dreams into realistic, achievable monthly budget milestones with visual progress.'
    }
  ];

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-24 bg-zinc-950/40 px-4 sm:px-6 lg:px-8 border-t border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-emerald-400 text-xs font-semibold mb-4">
            <span>Our Mission</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            About WalletWave
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base lg:text-lg font-normal">
            WalletWave was created for anyone who wants total clarity over their money without 
            the clutter of bloated banking apps or confusing spreadsheets. We focus on speed, 
            privacy, and simplicity so you can take confident control of your financial future.
          </p>
        </div>

        {/* Quick Trust Highlights with Gradient Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 mb-10 sm:mb-14">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="relative group rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 sm:p-6 text-center overflow-hidden hover:border-emerald-500/40 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-emerald-400/50 to-transparent group-hover:via-emerald-400 transition-all" />
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-linear-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 3 Core Value Cards with Unique Top Accent Lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 text-left mb-12 sm:mb-16">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div 
                key={index} 
                className="group relative rounded-2xl bg-linear-to-b from-zinc-800/90 via-zinc-850/80 to-zinc-900/90 p-5 sm:p-7 border border-zinc-700/80 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-emerald-400/70 to-transparent group-hover:h-1 group-hover:via-emerald-400 transition-all duration-300" />

                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center mb-4 sm:mb-5 group-hover:border-emerald-400/60 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] transition-all duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white mb-1.5 sm:mb-2 text-lg sm:text-xl tracking-tight group-hover:text-emerald-200 transition-colors">
                  {point.title}
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner for Landing Page Conversion */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-linear-to-r from-zinc-900 via-zinc-850 to-zinc-900 p-6 sm:p-10 border border-emerald-500/30 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent" />
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight">
            Ready to experience effortless expense tracking?
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-6">
            Join thousands taking control of their money with WalletWave. Free forever, no credit card required.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/25 cursor-pointer text-sm sm:text-base active:scale-[0.99] w-full sm:w-auto"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

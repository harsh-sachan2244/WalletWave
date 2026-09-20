import React from 'react';
import { UserCheck, PlusCircle, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: UserCheck,
      tag: 'Fast Setup',
      title: 'Set Up Your Profile',
      description: 'Create your free account in seconds. Choose your preferred currency, set your starting balance, and define your targets.'
    },
    {
      number: '02',
      icon: PlusCircle,
      tag: 'One-Tap Log',
      title: 'Log Everyday Purchases',
      description: 'Capture daily expenses on the go in under 5 seconds. Organize them effortlessly with intuitive tags and categories.'
    },
    {
      number: '03',
      icon: TrendingUp,
      tag: 'Real Results',
      title: 'Build Lasting Wealth',
      description: 'Monitor your spending patterns, cut unexpected budget leaks, and celebrate your savings milestones with total clarity.'
    }
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-emerald-400 text-xs font-semibold mb-4">
          <span>Simple Workflow</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
          How It Works
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          From tracking everyday purchases to building confident savings habits in three straightforward steps.
        </p>
      </div>

      {/* 3 Step Cards with Unique Borders & Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <div 
              key={index} 
              className="group relative rounded-2xl bg-linear-to-b from-zinc-800/90 via-zinc-850/80 to-zinc-900/90 p-5 sm:p-7 border border-zinc-700/80 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center overflow-hidden"
            >
              {/* Unique Top Gradient Accent Border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-emerald-400/70 to-transparent group-hover:h-1 group-hover:via-emerald-400 transition-all duration-300" />

              {/* Number Badge with Neon Mint Border */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-emerald-500/30 text-emerald-400 font-extrabold font-outfit text-base sm:text-lg flex items-center justify-center mb-4 group-hover:border-emerald-400/70 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.25)] transition-all duration-300 shrink-0">
                {step.number}
              </div>

              {/* Step Tag Pill */}
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full mb-3">
                {step.tag}
              </span>

              {/* Step Title & Icon */}
              <div className="flex items-center gap-2 mb-2">
                <StepIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-emerald-200 transition-colors">
                  {step.title}
                </h3>
              </div>

              {/* Step Description */}
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

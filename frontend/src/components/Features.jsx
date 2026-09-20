import React from 'react';
import { BarChart3, CreditCard, Target, Lock, ArrowUpRight } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: BarChart3,
      tag: 'Trends & Growth',
      title: 'Smart Analytics',
      description: 'See clear visual breakdowns of your spending trends and discover where your money really goes each month.',
      preview: (
        <div className="mt-5 pt-3.5 border-t border-zinc-700/60 flex flex-wrap items-end justify-between gap-2 px-1">
          <div className="flex items-end gap-2 h-9">
            <div className="w-3 bg-zinc-700 rounded-t h-[35%]" />
            <div className="w-3 bg-zinc-700 rounded-t h-[55%]" />
            <div className="w-3 bg-zinc-700 rounded-t h-[40%]" />
            <div className="w-3 bg-linear-to-t from-emerald-500 to-teal-300 rounded-t h-[90%]" />
          </div>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/50">
            +22% savings
          </span>
        </div>
      )
    },
    {
      icon: CreditCard,
      tag: '1-Tap Logging',
      title: 'Expense Tracking',
      description: 'Log transactions in seconds and effortlessly categorize everyday purchases with simple, custom tags.',
      preview: (
        <div className="mt-5 pt-3.5 border-t border-zinc-700/60 flex flex-wrap gap-1.5">
          <span className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-700">
            #Groceries
          </span>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-700">
            #Coffee
          </span>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-medium">
            #Subscriptions
          </span>
        </div>
      )
    },
    {
      icon: Target,
      tag: 'Custom Limits',
      title: 'Budget Management',
      description: 'Set flexible spending limits for groceries, bills, and leisure so you always stay ahead of your financial goals.',
      preview: (
        <div className="mt-5 pt-3.5 border-t border-zinc-700/60 space-y-1.5">
          <div className="flex justify-between text-xs text-zinc-300">
            <span className="font-medium">Dining Out Limit</span>
            <span className="text-emerald-300 font-semibold">$180 / $250</span>
          </div>
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-emerald-500 to-teal-300 rounded-full w-[72%]" />
          </div>
        </div>
      )
    },
    {
      icon: Lock,
      tag: 'Strict Privacy',
      title: 'Secure Accounts',
      description: 'Your financial information is strictly private, encrypted, and protected with secure account authentication.',
      preview: (
        <div className="mt-5 pt-3.5 border-t border-zinc-700/60 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            256-bit Encrypted
          </span>
          <span className="text-[11px] text-zinc-500">Zero Data Selling</span>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-14 sm:py-20 lg:py-24 bg-zinc-950/40 px-4 sm:px-6 lg:px-8 border-t border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-emerald-400 text-xs font-semibold mb-4">
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Everything you need to manage your money
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Practical, distraction-free tools built to help you spend mindfully and grow your savings.
          </p>
        </div>

        {/* 4 Feature Cards with Unique Gradient Borders & Glows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-linear-to-b from-zinc-800/90 via-zinc-850/80 to-zinc-900/90 p-5 sm:p-7 border border-zinc-700/80 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {/* Unique Top Gradient Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-emerald-400/70 to-transparent group-hover:h-1 group-hover:via-emerald-400 transition-all duration-300" />

                <div>
                  {/* Icon & Corner Tag */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/60 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] transition-all duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-300/90 bg-emerald-950/60 border border-emerald-800/50 px-2 sm:px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span>{feature.tag}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Styled mini snippet */}
                {feature.preview}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

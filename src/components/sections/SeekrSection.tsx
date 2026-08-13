import React, { useState } from 'react';
import { ArrowUpRight, Lock, RotateCw } from 'lucide-react';
import SplitText from '../ui/SplitText';
import BorderGradientButton from '../ui/BorderGradientButton';

export function SeekrSection() {
  const [iframeKey, setIframeKey] = useState(() => Date.now());

  const handleRefresh = () => {
    setIframeKey(Date.now());
  };

  return (
    <section className="w-full bg-[#0A0D14] text-white py-16 md:py-24 px-4 sm:px-6 md:px-12 border-t border-white/10 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col items-start">
        {/* Clean Header Block */}
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 md:mb-14 gap-6">
          <div className="flex flex-col items-start text-left max-w-3xl w-full">
            <SplitText
              text="Seekr"
              tag="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.02em] text-[oklch(92%_0.004_286.32)] leading-none drop-shadow-sm mb-6 inline-block text-left"
              textAlign="left"
              delay={50}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />

            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl font-mono leading-relaxed sm:mb-0 text-left">
              Track, evaluate, and land your next tech role.<br />
              Built in collaboration with AI agents.
            </p>
          </div>

          <div className="flex shrink-0 w-full sm:w-auto">
            <a
              href="https://seekr-37311.firebaseapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer w-full sm:w-auto"
              aria-label="Try Seekr AI coding project"
            >
              <BorderGradientButton 
                className="cursor-pointer w-full sm:w-auto h-[52px]"
                contentClassName="w-full justify-center"
              >
                <span>Try It Now</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </BorderGradientButton>
            </a>
          </div>
        </div>

        {/* 1440px Browser Frame Container with Interactive Iframe */}
        <div className="w-full max-w-[1440px] rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl overflow-hidden flex flex-col">
          {/* Browser Header Bar */}
          <div className="w-full bg-[#161B26] border-b border-white/10 px-4 py-3 flex items-center justify-between gap-4">
            {/* Window Dots */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-md mx-auto bg-[#0D1117] border border-white/10 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-neutral-400 gap-2">
              <div className="flex items-center gap-2 overflow-hidden truncate">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate font-mono text-[11px] text-neutral-300">
                  https://seekr-37311.firebaseapp.com/demo
                </span>
              </div>
              <button
                onClick={handleRefresh}
                className="hover:text-white transition-colors p-1 rounded shrink-0 cursor-pointer"
                title="Refresh Frame"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Embedded Interactive Application Frame */}
          <div className="w-full relative bg-neutral-900 overflow-hidden h-[780px] md:h-[800px]">
            <iframe
              key={iframeKey}
              src={`https://seekr-37311.firebaseapp.com/?demo=true&v=${iframeKey}`}
              title="Seekr Interactive Demo"
              className="w-full h-[780px] md:h-[800px] border-0 rounded-b-2xl"
              loading="lazy"
              allow="clipboard-write"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

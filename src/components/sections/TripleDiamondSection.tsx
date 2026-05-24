import { useState } from "react";
import { motion } from "motion/react";
import * as HoverCard from "@radix-ui/react-hover-card";
import SplitText from "../ui/SplitText";
import { CardSpotlight } from "../ui/card-spotlight";

function Diamond({ number, title, subtitle, blocks }: { number: string; title: string, subtitle: string, blocks: { badge: "Diverge" | "Converge", title: string, desc: string }[] }) {
  return (
    <div className="flex flex-col items-center flex-1 relative z-10">
      <div className="relative flex items-center justify-center size-[260px] md:size-[220px] lg:size-[320px] max-w-full">
        <div className="absolute m-auto inset-0 flex items-center justify-center">
          <CardSpotlight
            borderOnly
            color="#3E57FF"
            className="rotate-45 relative rounded-[24px] lg:rounded-[32px] size-[180px] md:size-[150px] lg:size-[240px] flex-none p-0 !border-[rgba(255,255,255,0.25)] bg-transparent shadow-[inset_-2px_4px_23.6px_0px_rgba(0,0,0,0.1),-4px_4px_15.9px_0px_rgba(0,0,0,0.05)] border-solid backdrop-blur-[8px]"
          >
            <div
              aria-hidden="true"
              className="absolute backdrop-blur-[8px] inset-0 rounded-[inherit]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 5.5243%, rgba(255, 255, 255, 0.2) 114.79%), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}
            />
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_-2px_4px_23.6px_0px_rgba(0,0,0,0.1)] pointer-events-none" />
          </CardSpotlight>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none p-4 w-full">
          <div className="text-xl lg:text-2xl font-bold mb-1 lg:mb-2">{number}</div>
          <div className="text-base lg:text-xl font-bold whitespace-pre-line leading-tight">{title}</div>
          <div className="text-xs lg:text-sm mt-1 lg:mt-2 text-[#DDE1E6]/70 whitespace-pre-line leading-snug">{subtitle}</div>
        </div>
      </div>
      <ul className="mt-6 md:mt-10 flex flex-col md:grid md:grid-rows-[150px_1fr] lg:grid-rows-[130px_1fr] gap-8 md:gap-6 lg:gap-10 text-sm lg:text-base text-[#DDE1E6] w-full max-w-[300px] md:max-w-[220px] lg:max-w-[280px] px-4 md:px-0 mx-auto">
        {blocks.map((block, i) => (
          <li key={i} className="flex flex-col items-start gap-2 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[9px] lg:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shrink-0 ${block.badge === 'Diverge' ? 'bg-[#8b84d8]/20 text-[#a59fe8]' : 'bg-[#2db482]/14 text-[#4db896]'}`}>
                {block.badge}
              </span>
              <span className="font-semibold text-white/90 text-xs lg:text-sm">{block.title}</span>
            </div>
            <p className="leading-snug text-white/70 text-xs lg:text-sm">{block.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PivotCycle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HoverCard.Root open={isOpen} onOpenChange={setIsOpen} openDelay={100} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <button 
          onClick={(e) => {
            if (window.innerWidth <= 768) {
              setIsOpen(!isOpen);
            }
          }}
          onMouseEnter={() => {
            if (window.innerWidth > 768) {
              setIsOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (window.innerWidth > 768) {
              setIsOpen(false);
            }
          }}
          className="relative size-[182px] md:size-[140px] lg:size-[182px] flex items-center justify-center group outline-none cursor-pointer"
        >
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <svg viewBox="0 0 182 182" fill="none" className="w-full h-full opacity-60 group-hover:opacity-100 group-data-[state=open]:opacity-100 transition-opacity duration-300 overflow-visible">
              <circle
                cx="91"
                cy="91"
                r="58"
                stroke="white"
                strokeDasharray="6 6"
                strokeWidth="1.5"
              />
              <g transform="translate(91, 91) rotate(-45) translate(0, -58) scale(0.6)">
                <g transform="translate(-12, -14)">
                  <path
                    d="M22.7607 12.6905C24.0082 13.4747 24.0082 15.2929 22.7607 16.0771L3.06434 28.4576C1.73244 29.2948 0 28.3375 0 26.7644L0 2.00321C0 0.430039 1.73244 -0.527259 3.06434 0.30994L22.7607 12.6905Z"
                    fill="#3E57FF"
                  />
                </g>
              </g>

              {/* Bottom Right Arrow */}
              <g transform="translate(91, 91) rotate(135) translate(0, -58) scale(0.6)">
                <g transform="translate(-12, -14)">
                  <path
                    d="M22.7607 12.6905C24.0082 13.4747 24.0082 15.2929 22.7607 16.0771L3.06434 28.4576C1.73244 29.2948 0 28.3375 0 26.7644L0 2.00321C0 0.430039 1.73244 -0.527259 3.06434 0.30994L22.7607 12.6905Z"
                    fill="#3E57FF"
                  />
                </g>
              </g>
            </svg>
          </motion.div>
          <div className="relative z-10 size-[100px] md:size-[80px] lg:size-[100px] rounded-full flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-sm shadow-[inset_0px_2px_10px_rgba(255,255,255,0.1)] group-hover:bg-white/10 group-data-[state=open]:bg-white/10 transition-colors">
            <span className="text-[12px] md:text-[10px] lg:text-[12px] font-medium leading-[1.1] text-center text-white">Strategic Pivot<br/>Loop</span>
          </div>
        </button>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content 
          className="z-50 w-72 p-6 rounded-xl bg-[#1E1E1E] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-md text-white text-[14px] leading-relaxed animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95"
          sideOffset={12}
        >
          <div className="text-white/70 text-sm">
            A critical gate used to validate the direction, not just the output. It ensures the team is solving the right problem. If a flaw is uncovered, the loop instantly routes the team back to re-scoping.
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export function TripleDiamondSection() {
  return (
    <section className="relative w-full bg-[#1C1C1C] text-white py-12 md:py-24 overflow-hidden flex flex-col items-center">
      {/* Background Grid */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1921 1078" fill="none" preserveAspectRatio="none" className="w-full h-full opacity-60">
          <defs>
            <radialGradient id="paint0_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(592 539) rotate(90) scale(539 539)">
              <stop stopColor="#254961"/>
              <stop offset="1" stopColor="#666666" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint1_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1329 539) rotate(90) scale(539 539)">
              <stop stopColor="#254961"/>
              <stop offset="1" stopColor="#666666" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint2_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(960.5 303) scale(960.5 960.5)">
              <stop stopColor="#254961"/>
              <stop offset="1" stopColor="#666666" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint3_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(960.5 539) scale(960.5 960.5)">
              <stop stopColor="#254961"/>
              <stop offset="1" stopColor="#666666" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint4_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(960.5 774) scale(960.5 960.5)">
              <stop stopColor="#254961"/>
              <stop offset="1" stopColor="#666666" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <g id="Grid">
            <path d="M592 1.58061e-08L592 1078" stroke="url(#paint0_radial_1_68)" strokeOpacity="0.8" />
            <path d="M1329 1.58061e-08L1329 1078" stroke="url(#paint1_radial_1_68)" strokeOpacity="0.8" />
            <path d="M1921 303L-3.69549e-05 303" stroke="url(#paint2_radial_1_68)" strokeOpacity="0.8" />
            <path d="M1921 539L-3.69549e-05 539" stroke="url(#paint3_radial_1_68)" strokeOpacity="0.8" />
            <path d="M1921 774L-3.69549e-05 774" stroke="url(#paint4_radial_1_68)" strokeOpacity="0.8" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 text-left mb-12">
        <SplitText
          text="My AI-Enhanced Triple Diamond"
          tag="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white uppercase leading-none drop-shadow-sm mb-6 inline-block text-left"
          textAlign="left"
          delay={50}
          duration={1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="text-base text-white/70 max-w-4xl font-medium leading-relaxed font-mono">
          Accelerating divergence with AI. Driving convergence with Human judgment.
        </p>

        <div className="relative mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Connecting dashed arrows */}
          <div className="hidden md:block absolute top-[110px] lg:top-[160px] left-[16.666%] right-[16.666%] -translate-y-1/2 z-0 pointer-events-none">
            {/* Arrow 1 -> 2 */}
            <div className="absolute left-[calc(0%+120px)] lg:left-[calc(0%+170px)] right-[calc(50%+120px)] lg:right-[calc(50%+170px)] top-0 h-px border-t-[2px] border-dashed border-white/60">
              <div className="absolute right-0 top-[-6px] border-t-[2px] border-r-[2px] border-white/60 w-3 h-3 rotate-45 mr-0.5" />
            </div>
            
            {/* Arrow 2 -> 3 */}
            <div className="absolute left-[calc(50%+120px)] lg:left-[calc(50%+170px)] right-[calc(0%+120px)] lg:right-[calc(0%+170px)] top-0 h-px border-t-[2px] border-dashed border-white/60">
              <div className="absolute right-0 top-[-6px] border-t-[2px] border-r-[2px] border-white/60 w-3 h-3 rotate-45 mr-0.5" />
            </div>
          </div>

          {/* Point 1 */}
          <Diamond 
            number="01"
            title={"Discover\n& Align"}
            subtitle="Setting the guardrails first"
            blocks={[
              { badge: "Diverge", title: "Discover & Explore", desc: "Immerse in user realities to surface friction patterns across contexts and uncover real product opportunities before any constraints are set." },
              { badge: "Converge", title: "Constrain & Align", desc: "Establish strict human constraints (user flows, scope boundaries, and tech parameters) before AI touches anything. These guardrails prevent confident generation in the wrong direction." }
            ]}
          />

          {/* The Cycle */}
          <div className="md:absolute left-[33.333%] md:-translate-x-1/2 md:top-[110px] lg:top-[160px] md:-translate-y-1/2 mx-auto z-20 flex justify-center w-full md:w-auto -my-4 md:my-0">
            <PivotCycle />
          </div>

          <Diamond 
            number="02"
            title={"Prototype\n& Validate"}
            subtitle="Collapsing the concept gap"
            blocks={[
              { badge: "Diverge", title: "Compress & Prototype", desc: "Use AI to collapse the distance between a raw design concept and a testable, interactive artifact. Cross-functional teams critique something real, not static wireframes." },
              { badge: "Converge", title: "Evaluate & Iterate", desc: "Human-led testing and cross-functional workshops catch systemic flaws. Parallel testing and generation cycles drive high-quality, fast revision loops until the UX architecture holds." }
            ]}
          />

          <Diamond 
            number="03"
            title={"Systemize\n& Deliver"}
            subtitle="Protecting system coherence"
            blocks={[
              { badge: "Diverge", title: "Systemize & Unify", desc: "Evaluate the product as a unified experience. Ensure the design system and UX remain robust in real-world engineering, not just in completion." },
              { badge: "Converge", title: "Verify & Close the Loop", desc: "Confirm the live product matches the validated human model. Feed post-launch insights back into Phase 01 for a faster, sharper, and better-informed next cycle." }
            ]}
          />
        </div>
      </div>
    </section>
  );
}

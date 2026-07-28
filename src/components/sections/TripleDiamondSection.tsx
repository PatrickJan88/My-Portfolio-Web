import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { Plus, Minus } from "lucide-react";
import SplitText from "../ui/SplitText";
import { CardSpotlight } from "../ui/card-spotlight";

function AccordionBlock({ block }: { block: { badge: string, title: string, desc: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="flex flex-col items-start text-left w-full border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between text-left focus:outline-none group gap-2"
      >
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-[9px] lg:text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full shrink-0 ${['Diverge', 'Explore', 'Experiment', 'Scale'].includes(block.badge) ? 'bg-[#6D86FF]/20 text-[#889DFF]' : 'bg-[#2db482]/14 text-[#4db896]'}`}>
            {block.badge}
          </span>
          <span className="font-semibold text-[oklch(92%_0.004_286.32)] text-sm md:text-[11px] lg:text-[13px] whitespace-nowrap tracking-tight group-hover:text-white transition-colors">{block.title}</span>
        </div>
        <div className="text-white/50 shrink-0 flex items-center justify-center size-4 rounded-full border border-white/30 group-hover:text-white group-hover:border-white/50 transition-colors mt-0.5">
          {isOpen ? <Minus size={10} strokeWidth={2.5} /> : <Plus size={10} strokeWidth={2.5} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden w-full"
          >
            <p className="leading-snug text-white/70 text-base md:text-xs lg:text-sm">{block.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function Diamond({ number, title, blocks, videoSrc, videoScale = "scale-[1.6]" }: { number: string; title: string, blocks: { badge: string, title: string, desc: string }[], videoSrc?: string, videoScale?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video play error:", e));
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <div 
      className="flex flex-col items-center flex-1 relative z-10 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center size-[260px] md:size-[220px] lg:size-[320px] max-w-full">
        <div className="absolute m-auto inset-0 flex items-center justify-center">
          <CardSpotlight
            borderOnly
            color="rgba(255, 255, 255, 0.2)"
            className="rotate-45 relative overflow-hidden rounded-[24px] lg:rounded-[32px] size-[180px] md:size-[150px] lg:size-[240px] flex-none p-0 !border-[rgba(255,255,255,0.25)] bg-transparent shadow-[inset_-2px_4px_23.6px_0px_rgba(0,0,0,0.1),-4px_4px_15.9px_0px_rgba(0,0,0,0.05)] border-[1px] border-solid [transform:translateZ(0)]"
          >
            {/* Base Backdrop Blur Layer */}
            <div className={`absolute inset-0 z-[-1] rounded-[inherit] pointer-events-none [transform:translateZ(0)] transition-colors duration-500 ${isHovered ? 'bg-neutral-900' : 'bg-[oklch(87.1%_0.006_286.286)]'}`} />

            {/* Video Container */}
            {videoSrc && (
              <div className={`absolute inset-0 z-0 bg-transparent rounded-[inherit] transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {/* 
                  Since the container is rotated 45deg, the video needs to be rotated -45deg 
                  so it appears upright.
                */}
                <div className="absolute inset-[-50%] w-[200%] h-[200%] flex items-center justify-center -rotate-45">
                  <video 
                    ref={videoRef}
                    src={videoSrc} 
                    muted 
                    loop 
                    playsInline
                    className={`w-[70%] h-[70%] object-cover ${videoScale}`}
                  />
                </div>
                {/* Dark Overlay for Video */}
                <div className="absolute inset-0 bg-black/80 rounded-[inherit] pointer-events-none" />
              </div>
            )}
            
            {/* Overlay Layer Background */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-500 pointer-events-none ${
                isHovered && videoSrc ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 5.5243%, rgba(255, 255, 255, 0.2) 114.79%), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)",
              }}
            />
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_-2px_4px_23.6px_0px_rgba(0,0,0,0.1)] pointer-events-none z-10" />
          </CardSpotlight>
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center text-center pointer-events-none p-4 md:px-8 lg:px-4 w-full h-full gap-2 lg:gap-3">
          {/* Number and Title inside the shape */}
          <div className={`text-3xl lg:text-5xl font-bold leading-none transition-colors duration-500 ${isHovered ? 'text-white' : 'text-[oklch(27.4%_0.006_286.033)]'}`}>{number}</div>
          <div className={`text-sm lg:text-lg font-bold whitespace-nowrap leading-tight transition-colors duration-500 ${isHovered ? 'text-white/90' : 'text-[oklch(27.4%_0.006_286.033)]'}`}>{title}</div>
        </div>
      </div>

      <ul className="mt-4 md:mt-6 flex flex-col gap-4 lg:gap-6 text-sm lg:text-base text-[#DDE1E6] w-full max-w-[300px] md:max-w-[220px] lg:max-w-[280px] px-4 md:px-0 mx-auto">
        {blocks.map((block, i) => (
          <AccordionBlock key={i} block={block} />
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
                    fill="#707070"
                  />
                </g>
              </g>

              {/* Bottom Right Arrow */}
              <g transform="translate(91, 91) rotate(135) translate(0, -58) scale(0.6)">
                <g transform="translate(-12, -14)">
                  <path
                    d="M22.7607 12.6905C24.0082 13.4747 24.0082 15.2929 22.7607 16.0771L3.06434 28.4576C1.73244 29.2948 0 28.3375 0 26.7644L0 2.00321C0 0.430039 1.73244 -0.527259 3.06434 0.30994L22.7607 12.6905Z"
                    fill="#707070"
                  />
                </g>
              </g>
            </svg>
          </motion.div>
          <div className="relative z-10 size-[100px] md:size-[80px] lg:size-[100px] rounded-full flex items-center justify-center border border-white/20 bg-neutral-800 shadow-[inset_0px_2px_10px_rgba(255,255,255,0.1)] group-hover:bg-white/10 group-data-[state=open]:bg-white/10 transition-colors">
            <span className="text-[12px] md:text-[10px] lg:text-[12px] font-medium leading-[1.1] text-center text-white">Strategic<br/>Iteration<br/>Loop</span>
          </div>
        </button>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content 
          className="z-50 w-72 p-6 rounded-xl bg-[#1E1E1E] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] text-white text-[14px] leading-relaxed animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95"
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
    <section className="relative w-full bg-[#1C1C1C] text-white py-6 md:py-16 overflow-hidden flex flex-col items-center">
      {/* Background Grid */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1921 1078" fill="none" preserveAspectRatio="none" className="w-full h-full opacity-60">
          <defs>
            <radialGradient id="paint0_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(592 539) rotate(90) scale(539 539)">
              <stop stopColor="#3B3B3B"/>
              <stop offset="1" stopColor="#666666" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint1_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1329 539) rotate(90) scale(539 539)">
              <stop stopColor="#3B3B3B"/>
              <stop offset="1" stopColor="#666666" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint2_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(960.5 303) scale(960.5 960.5)">
              <stop stopColor="#3B3B3B"/>
              <stop offset="1" stopColor="#666666" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint3_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(960.5 539) scale(960.5 960.5)">
              <stop stopColor="#3B3B3B"/>
              <stop offset="1" stopColor="#666666" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="paint4_radial_1_68" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(960.5 774) scale(960.5 960.5)">
              <stop stopColor="#3B3B3B"/>
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
          text="My Human-led AI Triple Diamond"
          tag="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[oklch(92%_0.004_286.32)] leading-none drop-shadow-sm mb-6 inline-block text-left"
          textAlign="left"
          delay={50}
          duration={1}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
        />
        <p className="text-base text-white/70 max-w-4xl font-medium leading-relaxed font-mono">
          Accelerating exploration with AI. Driving decisions through human judgment.
        </p>

        <div className="relative mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Connecting dashed arrows */}
          <div className="hidden md:block absolute top-[110px] lg:top-[160px] left-[16.666%] right-[16.666%] -translate-y-1/2 z-0 pointer-events-none">
            {/* Arrow 2 -> 3 */}
            <div className="absolute left-[calc(50%+120px)] lg:left-[calc(50%+170px)] right-[calc(0%+120px)] lg:right-[calc(0%+170px)] top-0">
              <div className="absolute left-0 right-0 top-0 border-t-[2px] border-dashed border-white/60" />
              <div className="absolute right-0 top-[-5px] border-t-[2px] border-r-[2px] border-white/60 w-3 h-3 rotate-45 translate-x-[50%]" />
            </div>
          </div>

          {/* Point 1 */}
          <Diamond 
            number="01"
            title="Discover & Align"
            videoSrc="/videos/diamond-video-1.webm"
            videoScale="scale-[3.0]"
            blocks={[
              { badge: "Explore", title: "Understand People & Problems", desc: "Observe users, understand the business, and uncover real problems before exploring solutions. This phase focuses on discovering opportunities through research rather than assumptions." },
              { badge: "Align", title: "Constrain & Align", desc: "Align user needs, business goals, technical feasibility, and project constraints before introducing AI into the design process. Clear guardrails lead to more reliable outcomes." }
            ]}
          />

          {/* The Cycle */}
          <div className="md:absolute left-[33.333%] md:-translate-x-[calc(50%+2px)] md:top-[110px] lg:top-[160px] md:-translate-y-1/2 mx-auto z-20 flex justify-center w-full md:w-auto -my-4 md:my-0">
            <PivotCycle />
          </div>

          <Diamond 
            number="02"
            title="Prototype & Validate"
            videoSrc="/videos/diamond-video-2.webm"
            videoScale="scale-[2.0]"
            blocks={[
              { badge: "Experiment", title: "Prototype & Explore", desc: "Use AI to rapidly transform ideas into interactive prototypes, enabling teams to evaluate concepts through real experiences instead of static wireframes." },
              { badge: "Validate", title: "Evaluate & Iterate", desc: "Validate prototypes through usability testing, stakeholder feedback, and cross-functional reviews. Human judgment guides every iteration before moving forward." }
            ]}
          />

          <Diamond 
            number="03"
            title="Systemize & Deliver"
            videoSrc="/videos/diamond-video-3.webm"
            blocks={[
              { badge: "Scale", title: "Scale & Systemize", desc: "Transform validated solutions into scalable design systems, reusable components, and implementation-ready experiences across products and teams." },
              { badge: "Learn", title: "Verify & Close the Loop", desc: "Measure product outcomes after launch and feed insights back into the next discovery cycle, enabling continuous improvement through human-led learning." }
            ]}
          />
        </div>
      </div>
    </section>
  );
}

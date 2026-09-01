import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { OptionWheel } from "../ui/OptionWheel";
import { PillarVisual, PillarMedia } from "../ui/PillarVisual";
import { AsciiFlowTrail } from "../ui/AsciiFlowTrail";
import SplitText from "../ui/SplitText";

export interface PillarItem {
  id: string;
  number: string;
  phaseLabel: string;
  title: string;
  quote: string;
  description: string;
  tags: string[];
  media?: PillarMedia;
}

export const pillarsData: PillarItem[] = [
  {
    id: "discover-align",
    number: "01",
    phaseLabel: "01",
    title: "Discover & Align",
    quote: "Focus on the right problem before moving into solutions.",
    description:
      "I start by defining what needs to be solved and what success looks like. I gather key inputs, clarify priorities, and set the scope and guardrails to keep the work focused on the right problem before moving into solutions.",
    tags: ["Explore", "Define", "Align"],
    media: {
      type: "video",
      src: "/home/ascii-magic-1.webm",
    },
  },
  {
    id: "strategic-iteration",
    number: "02",
    phaseLabel: "02",
    title: "Strategic Iteration",
    quote: "Challenge the direction before moving forward.",
    description:
      "I challenge the direction before moving forward. When new findings reveal a better path, I step back, rethink the approach, and adjust before investing further.",
    tags: ["Challenge", "Reframe", "Decide"],
    media: {
      type: "video",
      src: "/home/ascii-magic-2.webm",
    },
  },
  {
    id: "prototype-validate",
    number: "03",
    phaseLabel: "03",
    title: "Prototype & Validate",
    quote: "Rapidly transform ideas into interactive prototypes and test them early.",
    description:
      "I use AI to rapidly transform ideas into interactive prototypes and test them early. This makes it easier to compare ideas, uncover issues, and refine the solution before it is fully built, which saves time and cost.",
    tags: ["Prototype", "Test", "Refine"],
    media: {
      type: "video",
      src: "/home/ascii-magic-3.webm",
    },
  },
  {
    id: "systemize-deliver",
    number: "04",
    phaseLabel: "04",
    title: "Systemize & Deliver",
    quote: "Bring the final design into a consistent, usable product.",
    description:
      "I bring the final design into a consistent, usable product and make sure it works beyond a single screen or feature. The goal is to deliver something practical, coherent, and ready to scale.",
    tags: ["Systemize", "Deliver", "Scale"],
    media: {
      type: "video",
      src: "/home/ascii-magic-4.webm",
    },
  },
];

export function ScrollServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [continuousPos, setContinuousPos] = useState(0);

  // Scroll Progress across the 350vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0 -> 1 progress to continuous 0 -> 3 indices
  const rawPos = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const smoothPos = useSpring(rawPos, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });

  // Listen to smooth scroll position updates
  useMotionValueEvent(smoothPos, "change", (latest) => {
    setContinuousPos(latest);
    const rounded = Math.min(3, Math.max(0, Math.round(latest)));
    setActiveIndex(rounded);
  });

  // Handle clicking direct node
  const handleSelect = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable =
      containerRef.current.clientHeight - window.innerHeight;
    const targetScroll = containerTop + (index / 3) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeItem = pillarsData[activeIndex] || pillarsData[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360vh] bg-black"
    >
      {/* Sticky Fullscreen Section */}
      <div className="sticky top-0 h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden z-20 transition-colors duration-500 pt-16 md:pt-20">
        {/* Interactive ASCII Flow Trail Canvas (active only within this section) */}
        <AsciiFlowTrail
          charSet=" .·:;+*#%@█"
          trailLife={40}
          fontSize={13}
          color="rgba(240, 242, 245, "
        />

        {/* Centered Section Title matching H1 font family and size */}
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center mb-4 sm:mb-6 lg:mb-8 relative z-20">
          <SplitText
            text="How I work?"
            tag="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-space-grotesk tracking-normal text-white leading-tight inline-block"
            delay={50}
            duration={1}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative z-20">
          
          {/* Left Column: Number Option Wheel along Curved Arc */}
          <div className="lg:col-span-3 h-[420px] sm:h-[500px] lg:h-[540px] w-full flex items-center justify-center lg:justify-start relative">
            <OptionWheel
              items={pillarsData.map((item) => item.number)}
              selectedIndex={activeIndex}
              scrollProgress={continuousPos}
              onSelect={handleSelect}
              className="h-full w-full"
            />
          </div>

          {/* Center Column: Pillar Details & Text */}
          <div className="lg:col-span-5 flex flex-col justify-center px-2 sm:px-6 lg:px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                {/* Pillar Subtitle */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-[#fafafb] leading-[1.08] mb-4 text-balance">
                  {activeItem.title}
                </h3>

                {/* Subtitle / Description Narrative with text-pretty orphan prevention */}
                <p className="text-base sm:text-lg font-sans text-neutral-300 leading-relaxed max-w-lg mb-6 text-pretty">
                  {activeItem.description}
                </p>

                {/* Filter / Capsule Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {activeItem.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-neutral-800/80 text-neutral-200 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: 1:1 Aspect Ratio Media Container */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <PillarVisual
                key={activeItem.id}
                index={activeIndex}
                media={activeItem.media}
              />
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}


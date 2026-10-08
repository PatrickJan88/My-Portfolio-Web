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
    tags: ["AI-assisted Exploration", "Define", "Align"],
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
    quote: "Rapidly turn ideas into interactive prototypes and test them early.",
    description:
      "I use AI to rapidly turn ideas into interactive prototypes and test them early. This makes it easier to compare ideas, uncover issues, and refine the solution before it is fully built, which saves time and cost.",
    tags: ["AI-assisted prototyping", "Test", "Refine"],
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
      "I bring the final design into a consistent, usable product and make sure it works beyond a single screen or feature. I make sure the final experience is practical, coherent, and ready to scale across design and code.",
    tags: ["AI-assisted coding", "Documentation", "Scale"],
    media: {
      type: "video",
      src: "/home/ascii-magic-4.webm",
    },
  },
];

const rainbowBorderGradient =
  "linear-gradient(45deg, #FCAE0B, #4DB440, #979799, #777b86, #FCAE0B)";

const isSpecialAnimatedTag = (tag: string) =>
  tag === "AI-assisted Exploration" ||
  tag === "AI-assisted prototyping" ||
  tag === "AI-assisted coding";

export function ScrollServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [continuousPos, setContinuousPos] = useState(0);
  const [isLoopBack, setIsLoopBack] = useState(false);

  // Scroll Progress across the 420vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map progress to continuous 0 -> 3 wheel positions, locking at 3 during loop-back phase
  const rawPos = useTransform(
    scrollYProgress,
    [0, 0.22, 0.46, 0.70, 1.0],
    [0, 1, 2, 3, 3]
  );
  const smoothPos = useSpring(rawPos, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });

  // Listen to smooth scroll position updates for OptionWheel
  useMotionValueEvent(smoothPos, "change", (latest) => {
    setContinuousPos(Math.min(3, Math.max(0, latest)));
  });

  // Progress threshold listener for active phase & loop-back transition
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.22) {
      setActiveIndex(0);
      setIsLoopBack(false);
    } else if (latest < 0.46) {
      setActiveIndex(1);
      setIsLoopBack(false);
    } else if (latest < 0.70) {
      setActiveIndex(2);
      setIsLoopBack(false);
    } else if (latest < 0.85) {
      setActiveIndex(3);
      setIsLoopBack(false);
    } else {
      setActiveIndex(3);
      setIsLoopBack(true);
    }
  });

  // Handle clicking direct node
  const handleSelect = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable =
      containerRef.current.clientHeight - window.innerHeight;
    const targetProgresses = [0.0, 0.34, 0.58, 0.77];
    const targetScroll =
      containerTop + (targetProgresses[index] ?? (index / 3)) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeItem = pillarsData[activeIndex] || pillarsData[0];

  return (
    <>
      {/* ─── MOBILE & TABLET LAYOUT (< lg): Sequential scroll flow without number wheel ─── */}
      <section className="block lg:hidden relative w-full bg-black py-16 sm:py-24 md:py-28 px-6 sm:px-10 md:px-14 overflow-hidden z-20">
        {/* Interactive ASCII Flow Trail Canvas */}
        <AsciiFlowTrail
          charSet=" .·:;+*#%@█"
          trailLife={40}
          fontSize={13}
          color="rgba(240, 242, 245, "
        />

        {/* Centered Section Title */}
        <div className="w-full max-w-[720px] mx-auto text-center mb-12 sm:mb-16 md:mb-20 relative z-20">
          <SplitText
            text="How I work?"
            tag="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk tracking-normal text-white leading-tight inline-block"
            delay={50}
            duration={1}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        {/* 4 Personal Highlights rendered sequentially with animation under text */}
        <div className="w-full max-w-[680px] mx-auto flex flex-col gap-16 sm:gap-20 md:gap-24 relative z-20">
          {pillarsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 md:gap-8"
            >
              {/* Highlight Text */}
              <div className="flex flex-col">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-[#fafafb] leading-[1.15] mb-3 md:mb-4 text-balance">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg font-sans text-neutral-300 leading-relaxed mb-4 md:mb-6 text-pretty text-perfect">
                  {item.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
                  {item.tags.map((tag, idx) =>
                    isSpecialAnimatedTag(tag) ? (
                      <span
                        key={idx}
                        className="relative inline-flex items-center justify-center rounded-full p-[1px] animate-rainbow bg-[length:200%]"
                        style={{
                          backgroundImage: rainbowBorderGradient,
                        }}
                      >
                        <span className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-mono font-medium bg-[#1a1b1e] text-neutral-200 flex items-center justify-center whitespace-nowrap">
                          {tag}
                        </span>
                      </span>
                    ) : (
                      <span
                        key={idx}
                        className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-mono font-medium bg-neutral-800/80 text-neutral-200 border border-white/10"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Highlight Animation / Media directly under text */}
              <div className="w-full flex items-center justify-center max-w-[420px] md:max-w-[480px] mx-auto">
                <PillarVisual index={index} media={item.media} />
              </div>
            </motion.div>
          ))}

          {/* Sequential Loop-Back Closing Note for Pillar 04 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 md:gap-4 pt-2 md:pt-4"
          >
            <div className="flex flex-col">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-[#fafafb] leading-[1.15] mb-3 md:mb-4 text-balance">
                And then, I loop back.
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-sans text-neutral-300 leading-relaxed text-pretty text-perfect">
                I learn from what I build, test what works, and use what I learn to shape the next iteration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── DESKTOP LAYOUT (>= lg): Sticky interactive 420vh wheel & scroll experience ─── */}
      <div
        ref={containerRef}
        className="hidden lg:block relative w-full h-[420vh] bg-black"
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
                {isLoopBack ? (
                  <motion.div
                    key="loop-back"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col"
                  >
                    {/* Head style for And then, I loop back. same as for Systemize & Deliver */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-[#fafafb] leading-[1.08] mb-4 text-balance">
                      And then, I loop back.
                    </h3>

                    {/* Regular text style */}
                    <p className="text-base sm:text-lg font-sans text-neutral-300 leading-relaxed max-w-lg mb-6 text-pretty text-perfect">
                      I learn from what I build, test what works, and use what I learn to shape the next iteration.
                    </p>
                  </motion.div>
                ) : (
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
                    <p className="text-base sm:text-lg font-sans text-neutral-300 leading-relaxed max-w-lg mb-6 text-pretty text-perfect">
                      {activeItem.description}
                    </p>

                    {/* Filter / Capsule Tags */}
                    {activeItem.tags && activeItem.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2.5">
                        {activeItem.tags.map((tag, idx) =>
                          isSpecialAnimatedTag(tag) ? (
                            <span
                              key={idx}
                              className="relative inline-flex items-center justify-center rounded-full p-[1px] animate-rainbow bg-[length:200%]"
                              style={{
                                backgroundImage: rainbowBorderGradient,
                              }}
                            >
                              <span className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-[#1a1b1e] text-neutral-200 flex items-center justify-center whitespace-nowrap">
                                {tag}
                              </span>
                            </span>
                          ) : (
                            <span
                              key={idx}
                              className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-neutral-800/80 text-neutral-200 border border-white/10 hover:border-white/20 transition-colors"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
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
    </>
  );
}


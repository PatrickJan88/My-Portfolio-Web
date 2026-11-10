import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Phosphor } from "@lucasmarkes/hairline/react";
import { ShowcasePointer } from "../ui/showcase-pointer/showcase-pointer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { FluidOrb } from "../ui/fluid-orb";
import {
  Presentation,
  ExternalLink,
  Copy,
  Check,
  Download,
  FileText,
} from "lucide-react";

interface InternalDesignHubMedia1Props {
  onMediaClick?: (src: string, isVideo: boolean, gallery?: string[]) => void;
  className?: string;
}

interface AnimatedConnectionPathProps {
  d: string;
  gradientId: string;
  color: string;
  reverse?: boolean;
}

function AnimatedConnectionPath({
  d,
  color,
}: AnimatedConnectionPathProps) {
  return (
    <>
      {/* Base background track */}
      <path
        d={d}
        fill="none"
        stroke="#ebebeb"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Animated glowing beam path flowing outward from center hub to cards */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="45 155"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}

export function InternalDesignHubMedia1({
  onMediaClick,
  className = "",
}: InternalDesignHubMedia1Props) {
  // Micro-interaction states
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadedAsset, setDownloadedAsset] = useState(false);
  const [designerRadio, setDesignerRadio] = useState<"option1" | "option2">("option1");
  const [clientShowcaseActive, setClientShowcaseActive] = useState(false);

  // Dynamic measuring refs to ensure 100% exact connection between card borders and hub dots
  const containerRef = useRef<HTMLDivElement>(null);

  const devDotRef = useRef<HTMLSpanElement>(null);
  const mktgDotRef = useRef<HTMLSpanElement>(null);
  const designDotRef = useRef<HTMLSpanElement>(null);
  const bizDotRef = useRef<HTMLSpanElement>(null);

  const hubDevDotRef = useRef<HTMLSpanElement>(null);
  const hubMktgDotRef = useRef<HTMLSpanElement>(null);
  const hubDesignDotRef = useRef<HTMLSpanElement>(null);
  const hubBizDotRef = useRef<HTMLSpanElement>(null);

  const [paths, setPaths] = useState<{
    dev: string;
    mktg: string;
    design: string;
    biz: string;
  }>({
    dev: "",
    mktg: "",
    design: "",
    biz: "",
  });

  const updatePaths = useCallback(() => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    if (cRect.width === 0 || cRect.height === 0) return;

    const getDotCenter = (el: HTMLElement | null) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - cRect.left,
        y: r.top + r.height / 2 - cRect.top,
      };
    };

    const dev = getDotCenter(devDotRef.current);
    const mktg = getDotCenter(mktgDotRef.current);
    const design = getDotCenter(designDotRef.current);
    const biz = getDotCenter(bizDotRef.current);

    const hubDev = getDotCenter(hubDevDotRef.current);
    const hubMktg = getDotCenter(hubMktgDotRef.current);
    const hubDesign = getDotCenter(hubDesignDotRef.current);
    const hubBiz = getDotCenter(hubBizDotRef.current);

    if (!dev || !mktg || !design || !biz || !hubDev || !hubMktg || !hubDesign || !hubBiz) return;

    const createBezier = (start: { x: number; y: number }, end: { x: number; y: number }) => {
      const deltaX = end.x - start.x;
      const cp1X = start.x + deltaX * 0.5;
      const cp1Y = start.y;
      const cp2X = start.x + deltaX * 0.5;
      const cp2Y = end.y;
      return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
    };

    setPaths({
      dev: createBezier(hubDev, dev),
      mktg: createBezier(hubMktg, mktg),
      design: createBezier(hubDesign, design),
      biz: createBezier(hubBiz, biz),
    });
  }, []);

  useLayoutEffect(() => {
    updatePaths();

    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      updatePaths();
    });
    ro.observe(el);
    window.addEventListener("resize", updatePaths);

    const t1 = setTimeout(updatePaths, 60);
    const t2 = setTimeout(updatePaths, 300);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePaths);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [updatePaths, copiedCode, downloadedAsset, designerRadio, clientShowcaseActive]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`w-full aspect-[16/9] min-h-[360px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px] relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-black/8 bg-white shadow-sm p-2.5 sm:p-4 md:p-5 lg:p-6 select-none font-sans flex flex-col justify-between ${className}`}
    >
      {/* Scoped CSS: Enforce true circular geometry for dot matrix elements, and anchor right-side cursors inward */}
      <style>{`
        .phosphor-circles ellipse {
          transform-box: fill-box;
          transform-origin: center;
          transform: scaleY(1.9);
        }
        @media (max-width: 767px) {
          .showcase-pointer-cursor {
            display: none !important;
          }
        }
        /* Anchor right-side cursor labels inward so they stay neatly inside the card container */
        .showcase-pointer-cursor[data-cursor-id="marketing"] .showcase-pointer-cursor-label-anchor,
        .showcase-pointer-cursor[data-cursor-id="business"] .showcase-pointer-cursor-label-anchor {
          left: auto !important;
          right: 2px !important;
          top: 24px !important;
        }
        .showcase-pointer-cursor[data-cursor-id="marketing"] .showcase-pointer-cursor-label,
        .showcase-pointer-cursor[data-cursor-id="business"] .showcase-pointer-cursor-label {
          transform-origin: 100% 0 !important;
        }
      `}</style>

      {/* Top Header Bar without preview button */}
      <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2 pb-1.5 sm:pb-3 border-b border-black/6 shrink-0 z-30 relative">
        <h4 className="text-[11px] sm:text-base md:text-lg font-medium text-ink-black tracking-tight truncate">
          Internal Design Hub Workflow
        </h4>
      </div>

      {/* Interactive Showcase Pointer Canvas */}
      <ShowcasePointer
        className="w-full flex-1 relative min-h-0"
        cursorSize={0.75}
        onCursorPress={({ target }) => {
          if (target.closest("#devs-copy-btn")) setCopiedCode(true);
          if (target.closest("#marketing-download-btn")) setDownloadedAsset(true);
          if (target.closest("#designers-toggle-opt2")) setDesignerRadio("option2");
          if (target.closest("#designers-toggle-opt1")) setDesignerRadio("option1");
          if (target.closest("#business-showcase-btn")) setClientShowcaseActive((prev) => !prev);
        }}
        onCycle={() => {
          setCopiedCode(false);
          setDownloadedAsset(false);
          setDesignerRadio("option1");
          setClientShowcaseActive(false);
        }}
        cursors={[
          {
            id: "developers",
            name: "Developers",
            color: "#10b981",
            script: [
              { action: "hover", target: "#devs-copy-btn" },
              { action: "click", target: "#devs-copy-btn" },
              { action: "wait", duration: 2200 },
            ],
          },
          {
            id: "marketing",
            name: "Marketing Team",
            color: "#ef4444",
            script: [
              { action: "hover", target: "#marketing-download-btn" },
              { action: "click", target: "#marketing-download-btn" },
              { action: "wait", duration: 2200 },
            ],
          },
          {
            id: "designers",
            name: "Designers",
            color: "#1A73F2",
            script: [
              { action: "hover", target: "#designers-toggle-opt2" },
              { action: "click", target: "#designers-toggle-opt2" },
              { action: "wait", duration: 2200 },
            ],
          },
          {
            id: "business",
            name: "Business Support",
            color: "#ff7523",
            textColor: "#ffffff",
            script: [
              { action: "hover", target: "#business-showcase-btn" },
              { action: "click", target: "#business-showcase-btn" },
              { action: "wait", duration: 2200 },
            ],
          },
        ]}
      >
        <div ref={containerRef} className="w-full h-full relative min-h-0 flex flex-col justify-between">
          {/* Animated Connecting Lines that dynamically link the card edges and hub dots */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            aria-hidden="true"
          >
            {paths.dev && (
              <AnimatedConnectionPath
                d={paths.dev}
                gradientId="beam-devs-hub"
                color="#10b981"
              />
            )}
            {paths.mktg && (
              <AnimatedConnectionPath
                d={paths.mktg}
                gradientId="beam-marketing-hub"
                color="#ef4444"
              />
            )}
            {paths.design && (
              <AnimatedConnectionPath
                d={paths.design}
                gradientId="beam-designers-hub"
                color="#1A73F2"
              />
            )}
            {paths.biz && (
              <AnimatedConnectionPath
                d={paths.biz}
                gradientId="beam-business-hub"
                color="#ff7523"
              />
            )}
          </svg>

          {/* Center Hub in the Middle (responsive scaling for mobile and desktop) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-auto">
            <div className="relative flex flex-col items-center p-1.5 sm:p-2 md:p-2.5 lg:p-4 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.08)] transition-all hover:border-neutral-300">
              {/* Hub connection anchor dots: seated directly on the card border and linked seamlessly to lines */}
              <span
                ref={hubDevDotRef}
                className="absolute left-0 -translate-x-1/2 top-[28%] -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#10b981] border-2 border-white shadow-xs z-30 pointer-events-none opacity-0 md:opacity-100"
              />
              <span
                ref={hubMktgDotRef}
                className="absolute right-0 translate-x-1/2 top-[28%] -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#ef4444] border-2 border-white shadow-xs z-30 pointer-events-none opacity-0 md:opacity-100"
              />
              <span
                ref={hubDesignDotRef}
                className="absolute left-0 -translate-x-1/2 top-[72%] -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#1A73F2] border-2 border-white shadow-xs z-30 pointer-events-none opacity-0 md:opacity-100"
              />
              <span
                ref={hubBizDotRef}
                className="absolute right-0 translate-x-1/2 top-[72%] -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#ff7523] border-2 border-white shadow-xs z-30 pointer-events-none opacity-0 md:opacity-100"
              />

              {/* Hub title pill badge: "Internal Design Hub" */}
              <div className="flex items-center justify-center mb-1 sm:mb-1.5 md:mb-1.5 lg:mb-2 px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 rounded-full bg-neutral-100 text-[8px] sm:text-[9px] md:text-[9.5px] lg:text-[11px] font-mono font-medium text-neutral-600 border border-neutral-200/60 whitespace-nowrap">
                <span>Internal Design Hub</span>
              </div>

              {/* Phosphor figure with uncompressed true circular dot styling */}
              <div className="phosphor-circles flex items-center justify-center">
                <Phosphor
                  play
                  intensity={0.8}
                  theme="light"
                  className="w-[65px] sm:w-[90px] md:w-[115px] lg:w-[190px]"
                />
              </div>
            </div>
          </div>

          {/* 4 Cards: Scaled proportionally on tablet and mobile so they fit in frame without overlapping */}
          <div className="relative z-10 w-full h-full max-w-[880px] md:max-w-[900px] lg:max-w-[960px] mx-auto grid grid-cols-2 grid-rows-2 gap-x-2 sm:gap-x-6 md:gap-x-10 lg:gap-x-24 gap-y-3 sm:gap-y-4 md:gap-y-6 lg:gap-y-10 p-1 sm:p-2.5 md:p-3.5 lg:p-4 pointer-events-none items-center">
            {/* Corner 1: Top-Left - Developers Card */}
            <div className="flex justify-start items-start pointer-events-auto">
              <Card className="relative w-full max-w-[122px] sm:max-w-[160px] md:max-w-[195px] lg:max-w-[270px] bg-white border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-1.5 sm:p-2 md:p-2.5 lg:p-3.5 rounded-xl sm:rounded-2xl gap-1 sm:gap-1.5 lg:gap-2 text-neutral-900 transition-shadow hover:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                {/* Invisible terminal connection anchor at card edge (no visible half-dot) */}
                <span
                  ref={devDotRef}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none opacity-0"
                />

                <CardHeader className="p-0 flex items-center justify-start gap-1 sm:gap-1.5 md:gap-1.5 lg:gap-[8px]">
                  <FluidOrb color="#10b981" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 border border-neutral-200" />
                  <div className="min-w-0 flex flex-col items-start text-left">
                    <CardTitle className="text-[9.5px] sm:text-[10.5px] md:text-[12px] lg:text-[14px] font-semibold text-neutral-900 leading-tight text-left justify-start truncate">
                      Developers
                    </CardTitle>
                    <CardDescription className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] lg:text-[12px] text-neutral-500 font-normal leading-tight mt-0.5 truncate text-left">
                      React · CSS · Specs
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="p-0 my-0">
                  <button
                    id="devs-copy-btn"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCopiedCode(true);
                    }}
                    className="w-full bg-black hover:bg-neutral-800 text-white rounded-[999px] py-1 sm:py-1.5 md:py-1.5 lg:py-2 px-1.5 sm:px-2 md:px-2.5 lg:px-3 flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 transition-all cursor-pointer shadow-xs active:scale-95 group/copy text-[8px] sm:text-[9px] md:text-[10px] lg:text-[13px] font-medium"
                    aria-label="Copy code specifications"
                  >
                    {copiedCode ? (
                      <span className="text-white font-medium">Copied</span>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 text-white shrink-0" />
                        <span className="truncate">Copy Code</span>
                      </>
                    )}
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Corner 2: Top-Right - Marketing Team Card */}
            <div className="flex justify-end items-start pointer-events-auto">
              <Card className="relative w-full max-w-[122px] sm:max-w-[160px] md:max-w-[195px] lg:max-w-[270px] bg-white border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-1.5 sm:p-2 md:p-2.5 lg:p-3.5 rounded-xl sm:rounded-2xl gap-1 sm:gap-1.5 lg:gap-2 text-neutral-900 transition-shadow hover:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                {/* Invisible terminal connection anchor at card edge (no visible half-dot) */}
                <span
                  ref={mktgDotRef}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none opacity-0"
                />

                <CardHeader className="p-0 flex items-center justify-start gap-1 sm:gap-1.5 md:gap-1.5 lg:gap-[8px]">
                  <FluidOrb color="#ef4444" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 border border-neutral-200" />
                  <div className="min-w-0 flex flex-col items-start text-left">
                    <CardTitle className="text-[9.5px] sm:text-[10.5px] md:text-[12px] lg:text-[14px] font-semibold text-neutral-900 leading-tight text-left justify-start truncate">
                      Marketing Team
                    </CardTitle>
                    <CardDescription className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] lg:text-[12px] text-neutral-500 font-normal leading-tight mt-0.5 truncate text-left">
                      Brand Assets
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="p-0 my-0">
                  <div
                    id="marketing-download-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDownloadedAsset(true);
                    }}
                    className="flex items-center justify-between px-1.5 sm:px-2 md:px-2.5 lg:px-3.5 py-1 sm:py-1.5 md:py-1.5 lg:py-2 rounded-[999px] bg-neutral-100/90 hover:bg-neutral-100 transition-colors cursor-pointer border border-neutral-200/50 group/asset"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                      <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 text-neutral-700 shrink-0" strokeWidth={2} />
                      <span className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] lg:text-[12px] text-neutral-800 font-medium truncate">
                        Logo Guidelines
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-neutral-500 group-hover/asset:text-neutral-800 transition-colors ml-1 shrink-0 cursor-pointer"
                      aria-label="Download brand assets"
                    >
                      {downloadedAsset ? (
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 text-emerald-600" />
                      ) : (
                        <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5" strokeWidth={1.75} />
                      )}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Corner 3: Bottom-Left - Designers Card */}
            <div className="flex justify-start items-end pointer-events-auto">
              <Card className="relative w-full max-w-[122px] sm:max-w-[160px] md:max-w-[195px] lg:max-w-[270px] bg-white border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-1.5 sm:p-2 md:p-2.5 lg:p-3.5 rounded-xl sm:rounded-2xl gap-1 sm:gap-1.5 lg:gap-2 text-neutral-900 transition-shadow hover:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                {/* Invisible terminal connection anchor at card edge (no visible half-dot) */}
                <span
                  ref={designDotRef}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none opacity-0"
                />

                <CardHeader className="p-0 flex items-center justify-start gap-1 sm:gap-1.5 md:gap-1.5 lg:gap-[8px]">
                  <FluidOrb color="#1A73F2" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 border border-neutral-200" />
                  <div className="min-w-0 flex flex-col items-start text-left">
                    <CardTitle className="text-[9.5px] sm:text-[10.5px] md:text-[12px] lg:text-[14px] font-semibold text-neutral-900 leading-tight text-left justify-start truncate">
                      Designers
                    </CardTitle>
                    <CardDescription className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] lg:text-[12px] text-neutral-500 font-normal leading-tight mt-0.5 truncate text-left">
                      UI Component
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="p-0 my-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-5 pt-0.5 select-none">
                    {/* Option 1 */}
                    <div
                      id="designers-toggle-opt1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDesignerRadio("option1");
                      }}
                      className="flex items-center gap-1 sm:gap-1.5 cursor-pointer group/opt1"
                    >
                      <span
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          designerRadio === "option1"
                            ? "bg-black border border-black active:scale-90"
                            : "border border-neutral-300 bg-white group-hover/opt1:border-neutral-400"
                        }`}
                      >
                        {designerRadio === "option1" && (
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span
                        className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-[13px] font-medium transition-colors ${
                          designerRadio === "option1"
                            ? "text-neutral-900"
                            : "text-neutral-600 group-hover/opt1:text-neutral-900"
                        }`}
                      >
                        Opt 1
                      </span>
                    </div>

                    {/* Option 2 */}
                    <div
                      id="designers-toggle-opt2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDesignerRadio("option2");
                      }}
                      className="flex items-center gap-1 sm:gap-1.5 cursor-pointer group/opt2"
                    >
                      <span
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          designerRadio === "option2"
                            ? "bg-black border border-black active:scale-90"
                            : "border border-neutral-300 bg-white group-hover/opt2:border-neutral-400"
                        }`}
                      >
                        {designerRadio === "option2" && (
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <span
                        className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-[13px] font-medium transition-colors ${
                          designerRadio === "option2"
                            ? "text-neutral-900"
                            : "text-neutral-600 group-hover/opt2:text-neutral-900"
                        }`}
                      >
                        Opt 2
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Corner 4: Bottom-Right - Business Support Team Card */}
            <div className="flex justify-end items-end pointer-events-auto">
              <Card className="relative w-full max-w-[122px] sm:max-w-[160px] md:max-w-[195px] lg:max-w-[270px] bg-white border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-1.5 sm:p-2 md:p-2.5 lg:p-3.5 rounded-xl sm:rounded-2xl gap-1 sm:gap-1.5 lg:gap-2 text-neutral-900 transition-shadow hover:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                {/* Invisible terminal connection anchor at card edge (no visible half-dot) */}
                <span
                  ref={bizDotRef}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 pointer-events-none opacity-0"
                />

                <CardHeader className="p-0 flex items-center justify-start gap-1 sm:gap-1.5 md:gap-1.5 lg:gap-[8px]">
                  <FluidOrb color="#ff7523" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 border border-neutral-200" />
                  <div className="min-w-0 flex flex-col items-start text-left">
                    <CardTitle className="text-[9.5px] sm:text-[10.5px] md:text-[12px] lg:text-[14px] font-semibold text-neutral-900 leading-tight text-left justify-start truncate">
                      Business Support
                    </CardTitle>
                    <CardDescription className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] lg:text-[12px] text-neutral-500 font-normal leading-tight mt-0.5 truncate text-left">
                      Client Prototypes
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="p-0 my-0">
                  <div
                    id="business-showcase-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setClientShowcaseActive((prev) => !prev);
                    }}
                    className="flex items-center justify-between pt-0.5 cursor-pointer group/showcase"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                      <Presentation className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-neutral-800 shrink-0 group-hover/showcase:text-black transition-colors" strokeWidth={2} />
                      <span className="text-[7.5px] sm:text-[9px] md:text-[10px] lg:text-[13px] text-neutral-900 font-medium truncate group-hover/showcase:text-black">
                        Showcase
                      </span>
                    </div>
                    <ExternalLink
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 transition-colors shrink-0 ${
                        clientShowcaseActive ? "text-amber-600" : "text-neutral-700 group-hover/showcase:text-neutral-950"
                      }`}
                      strokeWidth={1.75}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ShowcasePointer>
    </motion.div>
  );
}

export default InternalDesignHubMedia1;

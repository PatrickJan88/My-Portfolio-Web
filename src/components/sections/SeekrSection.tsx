import React, { useState, useEffect, useContext } from 'react';
import { Lock, RotateCw } from 'lucide-react';
import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, useScroll, useTransform } from 'motion/react';
import SplitText from '../ui/SplitText';
import BorderGradientButton from '../ui/BorderGradientButton';
import { ShaderGradientCanvas, ShaderGradient as ShaderGradientOriginal } from '@shadergradient/react';

const ShaderGradient = ShaderGradientOriginal as any;
import MagnifiedBento, { BentoHoverContext, BentoMarquee } from '../ui/magnified-bento';
import { AnimatedCircularProgressBar } from '../ui/animated-circular-progress-bar';
import { Globe } from '../ui/globe';
import { Confetti, type ConfettiRef } from '../ui/confetti';
import { Safari } from '../ui/safari';
import { FluidGlass } from '../ui/FluidGlass';
import { FolderInteraction } from '../ui/folder-interaction';
import { Accordion } from '../ui/accordion-transition';
import { CompanyHeadcountChart } from '../ui/company-headcount-chart';

function ProgressDemo() {
  const [value, setValue] = useState(0);
  const isHovered = useContext(BentoHoverContext);
  const confettiRef = React.useRef<ConfettiRef>(null);
  const hasFired = React.useRef(false);

  useEffect(() => {
    if (!isHovered) return;
    
    const handleIncrement = (prev: number) => {
      if (prev >= 100) {
        if (!hasFired.current) {
          confettiRef.current?.fire({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
          });
          hasFired.current = true;
        }
        return 0;
      }
      return prev + 10;
    };
    
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <>
      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-0 size-full pointer-events-none"
      />
      <AnimatedCircularProgressBar
        max={100}
        min={0}
        value={value}
        gaugePrimaryColor="#ffffff"
        gaugeSecondaryColor="rgba(255, 255, 255, 0.2)"
        className="bg-white/10 backdrop-blur-md rounded-full shadow-sm"
      />
    </>
  );
}

function OneClickCaptureCover() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-neutral-900">
      {/* Background Video Layer */}
      <video
        ref={videoRef}
        src="/seekr/loop-720x480-cover1.5.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 scale-[1.2]"
      />

      <div className="absolute inset-0 bg-black/25 z-[1] pointer-events-none" />

      {/* Foreground Marquee Layer */}
      <div className="relative z-10 w-full h-full overflow-hidden">
        <BentoMarquee />
      </div>
    </div>
  );
}

function VisualAnalyticsCover() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-neutral-900">
      <video
        ref={videoRef}
        src="/seekr/loop-720x480-cover2.2.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover absolute inset-[-2px] z-0 scale-[1.2] pointer-events-none"
      />
      <div className="absolute inset-[-2px] bg-black/25 z-[1] pointer-events-none" />
      <div className="absolute inset-0 z-10 w-full h-full">
        <Globe />
      </div>
    </div>
  );
}

function SmartCVMatchCover() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-neutral-900">
      <video
        ref={videoRef}
        src="/seekr/loop-720x480-cover3.2.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover absolute inset-0 z-0 scale-[1.2]"
      />
      <div className="absolute inset-0 bg-black/[0.35] z-[1] pointer-events-none" />
      <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
        <ProgressDemo />
      </div>
    </div>
  );
}

function SeekrVideoCover({ src }: { src: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-neutral-900">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover absolute inset-0 z-0 scale-[1.05]"
      />
      {/* 25% black overlay to make cover background darker */}
      <div className="absolute inset-0 z-10 bg-black/25 pointer-events-none" />
    </div>
  );
}

function Company360Cover() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-neutral-900">
      {/* Background video */}
      <video
        ref={videoRef}
        src="/seekr/loop-480x360-cover4.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover absolute inset-0 z-0 scale-[1.05]"
      />
      {/* 25% black overlay to make cover background darker */}
      <div className="absolute inset-0 z-10 bg-black/25 pointer-events-none" />

      {/* Line Chart Container on Card 4 with Subtle Glassmorphism (80% White Opacity) - scaled 95% and centered */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-2.5 sm:p-3 pointer-events-auto select-none">
        <div className="w-[85.5%] sm:w-[81.7%] max-w-[285px] scale-[0.95] origin-center bg-white/80 backdrop-blur-md border border-white/70 rounded-xl p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.06)] flex flex-col transition-all duration-300 group-hover:scale-[0.97]">
          <CompanyHeadcountChart />
        </div>
      </div>
    </div>
  );
}

function TailoredStudioCover() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const isHovered = useContext(BentoHoverContext);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-neutral-900">
      {/* Background video */}
      <video
        ref={videoRef}
        src="/seekr/loop-480x360-cover6.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover absolute inset-0 z-0 scale-[1.05]"
      />
      {/* 25% black overlay to make cover background darker */}
      <div className="absolute inset-0 z-10 bg-black/25 pointer-events-none" />

      {/* Interactive Folder Effect */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-2 pointer-events-auto select-none scale-[0.58] sm:scale-[0.64] origin-center translate-y-2 sm:translate-y-3">
        <FolderInteraction isHovered={isHovered} />
      </div>
    </div>
  );
}

function DualTrackAccordionCover() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [openTrack, setOpenTrack] = useState<'industry' | 'academic' | 'none'>('none');

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, []);

  const toggleTrack = (track: 'industry' | 'academic') => {
    setOpenTrack((prev) => (prev === track ? 'none' : track));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-neutral-900">
      {/* Background video */}
      <video
        ref={videoRef}
        src="/seekr/loop-480x360-cover5.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover absolute inset-0 z-0 scale-[1.05]"
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

      {/* Accordion Container */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-2.5 sm:p-3 pointer-events-auto select-none">
        <div className="w-[90%] sm:w-[86%] max-w-[300px] bg-white/80 backdrop-blur-md border border-white/70 rounded-xl p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.06)] flex flex-col gap-2 transition-all duration-300">
          {/* Top Bar Label */}
          <div className="flex items-center justify-between px-1 pb-1 border-b border-neutral-200/60">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 font-bold">
              I AM
            </span>
          </div>

          {/* Industry Seekr Accordion (No grey border/outline, clean shadow like reference) */}
          <Accordion
            title={
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.7)] shrink-0" />
                <span className="text-xs font-semibold text-neutral-800 tracking-tight">Industry Seekr</span>
                <span className="text-[9px] font-mono font-medium text-[#2563EB] bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full ml-auto">
                  Active
                </span>
              </div>
            }
            isOpen={openTrack === 'industry'}
            onToggle={() => toggleTrack('industry')}
            chevronClassName="text-neutral-500"
            className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border-0 rounded-lg overflow-hidden transition-all duration-200"
            headerClassName="px-2.5 py-2.5"
          >
            <div className="px-2.5 pt-0.5 pb-2.5 flex flex-col border-t border-neutral-100 mt-0.5">
              <div className="text-[10px] text-neutral-600 font-normal leading-relaxed">
                26 active applications.
              </div>
            </div>
          </Accordion>

          {/* Academic Seekr Accordion (Unclickable by default, matching clean shadow) */}
          <Accordion
            title={
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF7523] shadow-[0_0_8px_rgba(255,117,35,0.7)] shrink-0" />
                <span className="text-xs font-semibold text-neutral-800 tracking-tight">Academic Seekr</span>
                <span className="text-[9px] font-mono font-medium text-[#D85A0F] bg-orange-50 border border-[#FF7523]/30 px-1.5 py-0.5 rounded-full ml-auto">
                  Synced
                </span>
              </div>
            }
            isOpen={false}
            disabled={true}
            chevronClassName="text-neutral-400"
            className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border-0 rounded-lg overflow-hidden transition-all duration-200"
            headerClassName="px-2.5 py-2.5"
          />
        </div>
      </div>
    </div>
  );
}

function EmptyCardCover() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0D14]" />
  );
}

export function SeekrSection() {
  const [iframeKey, setIframeKey] = useState(() => Date.now());
  const bentoSectionRef = React.useRef<HTMLDivElement>(null);
  const cardsTrackRef = React.useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const maxScrollRef = React.useRef(0);
  maxScrollRef.current = maxScroll;

  useEffect(() => {
    const calculateMaxScroll = () => {
      if (cardsTrackRef.current) {
        const track = cardsTrackRef.current;
        const cards = track.querySelectorAll(".bento-card-item");
        const lastCard = cards[cards.length - 1] as HTMLElement | null;
        const viewportWidth = window.innerWidth;
        const rightMargin = window.innerWidth < 640 ? 32 : 64;

        if (lastCard) {
          // offsetLeft and offsetWidth are layout-based coordinates immune to CSS transforms
          const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
          // When translated by maxScroll, the last card's right edge will sit precisely (viewportWidth - rightMargin) from the left
          // leaving exactly rightMargin (64px on sm+, 32px on mobile) between the last card and the right edge
          const scrollDist = Math.max(0, lastCardRight - viewportWidth + rightMargin);
          setMaxScroll(scrollDist);
        } else {
          const trackWidth = track.scrollWidth;
          const scrollDist = Math.max(0, trackWidth - viewportWidth + rightMargin);
          setMaxScroll(scrollDist);
        }
      }
    };

    calculateMaxScroll();
    // Re-verify after initial mount and font rendering
    const timer = setTimeout(calculateMaxScroll, 100);
    window.addEventListener("resize", calculateMaxScroll);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && cardsTrackRef.current) {
      observer = new ResizeObserver(calculateMaxScroll);
      observer.observe(cardsTrackRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateMaxScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: bentoSectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll translation for the cards:
  // From 0.02 to 0.78: cards glide smoothly from right to left
  // From 0.78 to 1.0: cards stay in final position while the user can view them,
  // and as the user continues scrolling, Section 2 peels up to reveal the demo section!
  const cardsX = useTransform(scrollYProgress, (progress) => {
    const currentMax = maxScrollRef.current;
    if (currentMax <= 0) return 0;
    if (progress <= 0.02) return 0;
    if (progress >= 0.78) return -currentMax;
    const factor = (progress - 0.02) / (0.78 - 0.02);
    return -factor * currentMax;
  });

  // Manual Hold-and-Drag interaction to switch cards left and right
  const isDraggingRef = React.useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStartXRef = React.useRef(0);
  const startScrollYRef = React.useRef(0);
  const hasMovedRef = React.useRef(false);
  const lastTimeRef = React.useRef(0);
  const lastXRef = React.useRef(0);
  const velocityRef = React.useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only primary mouse button or touch

    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, textarea, select")) {
      return;
    }

    if (!bentoSectionRef.current) return;

    const bentoEl = bentoSectionRef.current;
    const rect = bentoEl.getBoundingClientRect();
    const bentoTop = window.scrollY + rect.top;
    const totalRunway = bentoEl.offsetHeight - window.innerHeight;
    const minScroll = bentoTop + 0.02 * totalRunway;
    const maxScrollY = bentoTop + 0.78 * totalRunway;

    // Anchor starting scroll within the sticky card translation range so drag responds instantly
    const initialScroll = Math.max(minScroll, Math.min(maxScrollY, window.scrollY));

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    pointerStartXRef.current = e.clientX;
    startScrollYRef.current = initialScroll;
    lastTimeRef.current = performance.now();
    lastXRef.current = e.clientX;
    velocityRef.current = 0;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !bentoSectionRef.current) return;

    const deltaX = e.clientX - pointerStartXRef.current;
    if (!hasMovedRef.current && Math.abs(deltaX) > 4) {
      hasMovedRef.current = true;
      setIsDragging(true);
    }

    if (!hasMovedRef.current) return;

    // Track instantaneous pointer velocity for smooth inertia on release
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (e.clientX - lastXRef.current) / dt;
    }
    lastTimeRef.current = now;
    lastXRef.current = e.clientX;

    const bentoEl = bentoSectionRef.current;
    const rect = bentoEl.getBoundingClientRect();
    const bentoTop = window.scrollY + rect.top;
    const totalRunway = bentoEl.offsetHeight - window.innerHeight;
    const currentMax = maxScrollRef.current;

    if (totalRunway <= 0 || currentMax <= 0) return;

    // Direct 1:1 tactile drag response:
    // Moving cursor left (deltaX < 0) advances cards to the left
    // Moving cursor right (deltaX > 0) scrolls cards back to the right
    const progressRange = 0.78 - 0.02; // 0.76
    const cardsRunwayPx = totalRunway * progressRange;
    const scrollRatio = cardsRunwayPx / currentMax;
    const scrollDelta = -deltaX * scrollRatio;

    const minScroll = bentoTop + 0.02 * totalRunway;
    const maxScrollY = bentoTop + 0.78 * totalRunway;
    const targetScroll = Math.max(minScroll, Math.min(maxScrollY, startScrollYRef.current + scrollDelta));

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll, { immediate: true });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "instant" });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch {}

    // Apply natural momentum easing if released with velocity
    if (hasMovedRef.current && Math.abs(velocityRef.current) > 0.35 && bentoSectionRef.current) {
      const bentoEl = bentoSectionRef.current;
      const rect = bentoEl.getBoundingClientRect();
      const bentoTop = window.scrollY + rect.top;
      const totalRunway = bentoEl.offsetHeight - window.innerHeight;
      const currentMax = maxScrollRef.current;
      
      if (totalRunway > 0 && currentMax > 0) {
        const progressRange = 0.78 - 0.02;
        const cardsRunwayPx = totalRunway * progressRange;
        const scrollRatio = cardsRunwayPx / currentMax;

        const flickDistancePx = velocityRef.current * 260;
        const inertiaScrollDelta = -flickDistancePx * scrollRatio;

        const minScroll = bentoTop + 0.02 * totalRunway;
        const maxScrollY = bentoTop + 0.78 * totalRunway;
        const finalScroll = Math.max(minScroll, Math.min(maxScrollY, window.scrollY + inertiaScrollDelta));

        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(finalScroll, { duration: 0.7, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
        }
      }
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleRefresh = () => {
    setIframeKey(Date.now());
  };

  return (
    <div className="relative w-full bg-[#0A0D14]">
      {/* 1. Mockup Section - Sticky underneath */}
      <section className="sticky top-0 w-full h-[100svh] flex flex-col justify-center bg-[#0A0D14] p-4 sm:p-6 md:p-8 overflow-hidden z-0">
        {/* Background Shader Gradient - lazy loaded with generous rootMargin to prevent pop-in */}
        <div className="absolute inset-0 z-0 pointer-events-none blur-lg scale-105 opacity-100">
          <ShaderGradientCanvas style={{ pointerEvents: 'none' }} lazyLoad={true} rootMargin="600px">
            <ShaderGradient
              animate="on"
              axesHelper="off"
              bgColor1="#000000"
              bgColor2="#000000"
              brightness={1}
              cAzimuthAngle={180}
              cDistance={2.81}
              cPolarAngle={80}
              cameraZoom={9.1}
              color1="#2850A6"
              color2="#1D3770"
              color3="#0D1425"
              destination="onCanvas"
              embedMode="off"
              envPreset="lobby"
              format="gif"
              fov={45}
              frameRate={10}
              gizmoHelper="hide"
              grain="off"
              lightType="3d"
              pixelDensity={1}
              positionX={0}
              positionY={0}
              positionZ={0}
              range="enabled"
              rangeEnd={40}
              rangeStart={0}
              reflection={0.1}
              rotationX={50}
              rotationY={0}
              rotationZ={-60}
              shader="defaults"
              type="waterPlane"
              uAmplitude={0}
              uDensity={1.5}
              uFrequency={0}
              uSpeed={0.3}
              uStrength={1.5}
              uTime={8}
              wireframe={false}
            />
          </ShaderGradientCanvas>
        </div>

        <div className="max-w-[1440px] mx-auto w-full h-full relative z-10 flex flex-col items-center">
          {/* 1440px Browser Frame Container with Interactive Iframe */}
          <div className="w-full h-full max-w-[1440px] rounded-[2rem] bg-black/40 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            {/* Browser Header Bar */}
            <div className="w-full bg-[#0D1117]/80 px-4 py-3 flex items-center justify-between gap-4">
              {/* Window Dots */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
              </div>

              {/* Address Bar */}
              <div className="flex-1 max-w-md mx-auto bg-black/40 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-neutral-400 gap-2">
                <div className="flex items-center gap-2 overflow-hidden truncate">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate font-mono text-[11px] text-neutral-300">
                    https://seekr-v5am.onrender.com/demo
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
            <div className="w-full flex-grow relative bg-[#0A0D14] overflow-hidden">
              <iframe
                key={iframeKey}
                src={`https://seekr-v5am.onrender.com/?demo=true&v=${iframeKey}`}
                title="Seekr Interactive Demo"
                className="w-full h-full border-0 rounded-b-[2rem]"
                loading="lazy"
                allow="clipboard-write"
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro & Bento Grid Section - Sticky peel effect */}
      <div ref={bentoSectionRef} className="relative z-10 w-full h-[320vh] mt-[-100svh]">
        <section className="sticky top-0 w-full min-h-[100svh] lg:h-[100svh] flex flex-col justify-center bg-fog-white text-ink-black py-4 sm:py-6 md:py-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-none border-b border-mist-gray overflow-hidden">
          <div className="w-full h-full relative z-10 flex flex-col justify-center items-center">
            {/* Clean Header Block */}
            <div className="w-full flex flex-col items-center text-center mb-8 md:mb-12 max-w-4xl mx-auto px-4 sm:px-6">
              <motion.img
                src="/home/seekr logo 1.webp"
                alt="Seekr"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="h-9 md:h-12 lg:h-[60px] object-contain mb-6 inline-block"
              />

              <p className="text-base sm:text-lg md:text-xl text-ink-black max-w-[85ch] font-mono leading-relaxed text-center text-pretty">
                Track, evaluate, and land your next tech or academic role. <br className="hidden sm:block" />
                <span className="block mt-2 sm:mt-1 text-pretty">I realized a problem that I'm tired of tracking applications across various platforms during my job search, so I collaborated with AI agents to address it.</span>
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 md:mt-8">
                <a
                  href="https://seekr-v5am.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block cursor-pointer"
                  aria-label="Try Seekr AI coding project"
                >
                  <BorderGradientButton 
                    className="cursor-pointer [&>div]:bg-ink-black [&>div]:group-hover:bg-neutral-800 h-[50px]"
                    contentClassName="justify-center !text-white leading-none px-10 sm:px-12 !py-0 h-full w-full text-sm sm:text-base min-w-[140px] sm:min-w-[160px]"
                  >
                    <span>Try now</span>
                  </BorderGradientButton>
                </a>

                <a
                  href="https://github.com/PatrickJan88/Seekr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Seekr on GitHub"
                  className="inline-flex items-center justify-center gap-2 px-6 h-[50px] rounded-full bg-white border border-mist-gray text-ink-black font-medium text-sm sm:text-base hover:bg-neutral-100 transition-all shadow-sm cursor-pointer leading-none text-pretty box-border"
                >
                  <HugeiconsIcon icon={GithubIcon} size={18} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Bento Cards Horizontal Scroll - Mouse Scroll & Hold-and-Drag Driven */}
            <div 
              className={`w-full overflow-hidden z-10 pt-2 pb-12 sm:pb-14 select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onClickCapture={handleClickCapture}
              style={{ touchAction: isDragging ? "none" : "pan-y" }}
            >
              <motion.div
                ref={cardsTrackRef}
                style={{ x: cardsX }}
                className="relative flex items-stretch gap-5 sm:gap-6 pl-8 sm:pl-[64px] pr-8 sm:pr-[64px] w-max will-change-transform transform-gpu select-none"
              >
                <div className="bento-card-item shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] lg:w-[400px] xl:w-[420px] flex flex-col">
                  <MagnifiedBento 
                    title="One-Click Match & Pipeline" 
                    description="Instantly capture job details, score and rank listings against your background, and auto-fill your tracking pipeline in a single click." 
                  >
                    <OneClickCaptureCover />
                  </MagnifiedBento>
                </div>
                <div className="bento-card-item shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] lg:w-[400px] xl:w-[420px] flex flex-col">
                  <MagnifiedBento 
                    title="Visual Pipeline & Geo-Tracking" 
                    description="Monitor your progress end-to-end with intuitive Sankey pipeline diagrams and interactive global maps tracking your applications by country." 
                  >
                    <VisualAnalyticsCover />
                  </MagnifiedBento>
                </div>
                <div className="bento-card-item shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] lg:w-[400px] xl:w-[420px] flex flex-col">
                  <MagnifiedBento 
                    title="Smart CV Match" 
                    description="Compare your CV against a job description and get an alignment score with actionable suggestions." 
                  >
                    <SmartCVMatchCover />
                  </MagnifiedBento>
                </div>
                {/* Card 4 */}
                <div className="bento-card-item shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] lg:w-[400px] xl:w-[420px] flex flex-col">
                  <MagnifiedBento 
                    title="Company 360° Intelligence" 
                    description="Access detailed reports on target employers, including headcount trends, financial health, business models, and interview kits for every stage of your hiring conversation." 
                  >
                    <Company360Cover />
                  </MagnifiedBento>
                </div>
                {/* Card 5 */}
                <div className="bento-card-item shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] lg:w-[400px] xl:w-[420px] flex flex-col">
                  <MagnifiedBento 
                    title="Dual-Track Mode" 
                    description="Switch between Industry and Academic tracks to instantly adapt your pipeline, market data, and matching criteria, keeping distinct career paths organized and tailored." 
                  >
                    <DualTrackAccordionCover />
                  </MagnifiedBento>
                </div>
                {/* Card 6 */}
                <div className="bento-card-item shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] lg:w-[400px] xl:w-[420px] flex flex-col">
                  <MagnifiedBento 
                    title="Tailored Application Studio" 
                    description="Generate and refine job-matched CVs, cover letters, and pitch kits. Customize text, select curated paper styles, and export your materials in seconds." 
                  >
                    <TailoredStudioCover />
                  </MagnifiedBento>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Spacer to complete the scroll peel effect and keep Demo layer visible for 1 screen */}
      <div className="w-full h-[180vh] pointer-events-none" />
    </div>
  );
}

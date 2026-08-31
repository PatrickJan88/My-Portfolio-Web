import React, { useState, useEffect, useContext } from 'react';
import { Lock, RotateCw } from 'lucide-react';
import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from 'motion/react';
import SplitText from '../ui/SplitText';
import BorderGradientButton from '../ui/BorderGradientButton';
import { ShaderGradientCanvas, ShaderGradient as ShaderGradientOriginal } from '@shadergradient/react';

const ShaderGradient = ShaderGradientOriginal as any;
import MagnifiedBento, { BentoHoverContext, BentoMarquee } from '../ui/magnified-bento';
import { AnimatedCircularProgressBar } from '../ui/animated-circular-progress-bar';
import { Globe } from '../ui/globe';
import { Confetti, type ConfettiRef } from '../ui/confetti';

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

export function SeekrSection() {
  const [iframeKey, setIframeKey] = useState(() => Date.now());

  const handleRefresh = () => {
    setIframeKey(Date.now());
  };

  return (
    <div className="relative w-full bg-[#0A0D14]">
      {/* 1. Mockup Section - Sticky underneath */}
      <section className="sticky top-0 w-full h-[100svh] flex flex-col justify-center bg-[#0A0D14] p-4 sm:p-6 md:p-8 overflow-hidden z-0">
        {/* Background Shader Gradient - rendered immediately to prevent scroll pop-in */}
        <div className="absolute inset-0 z-0 pointer-events-none blur-lg scale-105 opacity-100">
          <ShaderGradientCanvas style={{ pointerEvents: 'none' }} lazyLoad={false}>
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
      <div className="relative z-10 w-full h-[200svh] mt-[-100svh]">
        <section className="sticky top-0 w-full h-[100svh] flex flex-col justify-center bg-fog-white text-ink-black py-8 md:py-16 px-4 sm:px-6 md:px-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-none border-b border-mist-gray overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full h-full relative z-10 flex flex-col items-center justify-center">
          {/* Clean Header Block */}
          <div className="w-full flex flex-col items-center text-center mb-8 md:mb-12 max-w-4xl mx-auto">
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

          {/* 3 Bento Grid */}
          <div className="w-full flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 z-10 pb-12 md:pb-8 pt-4 px-4 md:px-0 -mx-4 md:mx-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="snap-center shrink-0 w-[85vw] md:w-auto h-[45vh] md:h-auto min-h-[300px]">
              <MagnifiedBento 
                title="One-Click Capture" 
                description="Let AI instantly extract job details from any market listing and auto-fill your tracking pipeline." 
              >
                <OneClickCaptureCover />
              </MagnifiedBento>
            </div>
            <div className="snap-center shrink-0 w-[85vw] md:w-auto h-[45vh] md:h-auto min-h-[300px]">
              <MagnifiedBento 
                title="Visual Analytics" 
                description="Analyze your application statistics and track your job search geographically with interactive map visualizations." 
              >
                <VisualAnalyticsCover />
              </MagnifiedBento>
            </div>
            <div className="snap-center shrink-0 w-[85vw] md:w-auto h-[45vh] md:h-auto min-h-[300px]">
              <MagnifiedBento 
                title="Smart CV Match" 
                description="Compare your CV against a job description and get an alignment score with actionable suggestions." 
              >
                <SmartCVMatchCover />
              </MagnifiedBento>
            </div>
          </div>
        </div>
        </section>
      </div>

      {/* 3. Spacer to complete the scroll peel effect and keep Demo layer visible for 1 screen */}
      <div className="w-full h-[200svh] pointer-events-none" />
    </div>
  );
}

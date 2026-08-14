import React, { useState, useEffect, useContext } from 'react';
import { ArrowUpRight, Lock, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';
import SplitText from '../ui/SplitText';
import BorderGradientButton from '../ui/BorderGradientButton';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import MagnifiedBento, { BentoHoverContext } from '../ui/magnified-bento';
import { Globe } from '../ui/globe';
import { AnimatedCircularProgressBar } from '../ui/animated-circular-progress-bar';

function ProgressDemo() {
  const [value, setValue] = useState(0);
  const isHovered = useContext(BentoHoverContext);

  useEffect(() => {
    if (!isHovered) return;
    
    const handleIncrement = (prev: number) => {
      if (prev >= 100) {
        return 0;
      }
      return prev + 10;
    };
    
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor="#171717"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
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
      <section className="sticky top-0 w-full h-[100svh] flex flex-col justify-center bg-[#0A0D14] py-16 px-4 sm:px-6 md:px-12 overflow-hidden z-0">
        {/* Background Shader Gradient - rendered immediately to prevent scroll pop-in */}
        <div className="absolute inset-0 z-0 pointer-events-none blur-lg scale-105 opacity-100">
          <ShaderGradientCanvas style={{ pointerEvents: 'none' }} lazyLoad={false}>
            <ShaderGradient
              animate="on"
              bgColor1="#000000"
              bgColor2="#000000"
              brightness={1.2}
              cAzimuthAngle={170}
              cDistance={3.55}
              cPolarAngle={70}
              cameraZoom={1}
              color1="#8EC5FF"
              color2="#94eaff"
              color3="#edfdff"
              destination="onCanvas"
              embedMode="off"
              envPreset="city"
              format="gif"
              fov={32}
              frameRate={10}
              gizmoHelper="hide"
              grain="off"
              lightType="3d"
              pixelDensity={1}
              positionX={0}
              positionY={0.9}
              positionZ={-0.3}
              range="enabled"
              rangeEnd={40}
              rangeStart={0}
              reflection={0.1}
              rotationX={45}
              rotationY={0}
              rotationZ={0}
              shader="defaults"
              type="waterPlane"
              uAmplitude={0}
              uDensity={1.2}
              uFrequency={0}
              uSpeed={0.02}
              uStrength={3.4}
              uTime={0}
              wireframe={false}
            />
          </ShaderGradientCanvas>
        </div>

        <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col items-center">
          {/* 1440px Browser Frame Container with Interactive Iframe */}
          <div className="w-full max-w-[1440px] rounded-[2rem] bg-black/40 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
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
            <div className="w-full relative bg-[#0A0D14] overflow-hidden h-[600px] md:h-[700px]">
              <iframe
                key={iframeKey}
                src={`https://seekr-37311.firebaseapp.com/?demo=true&v=${iframeKey}`}
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

      {/* 2. Intro & Bento Grid Section - Normal scroll, sits on top */}
      <section className="relative z-10 w-full min-h-[100svh] mt-[-100svh] flex flex-col justify-center bg-neutral-50 text-neutral-900 py-16 px-4 sm:px-6 md:px-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-none border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto w-full relative z-10 flex flex-col items-start">
          {/* Clean Header Block */}
          <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 md:mb-14 gap-6 sm:gap-8">
            <div className="flex flex-col items-start text-left flex-1 min-w-0 pr-0 sm:pr-4 lg:pr-8">
              <SplitText
                text="Seekr"
                tag="h2"
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[0.02em] text-neutral-900 leading-none mb-6 inline-block text-left"
                textAlign="left"
                delay={50}
                duration={1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />

              <p className="text-base sm:text-lg md:text-xl text-neutral-500 max-w-[85ch] font-mono leading-relaxed sm:mb-0 text-left">
                Track, evaluate, and land your next tech role. I realized a problem that I'm tired of tracking applications across various platforms during my job search, so I collaborated with AI agents to address it.
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
                  className="cursor-pointer w-full sm:w-auto [&>div]:bg-neutral-900 [&>div]:group-hover:bg-neutral-800"
                  contentClassName="w-full justify-center !text-white leading-none"
                >
                  <span>Try now</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </BorderGradientButton>
              </a>
            </div>
          </div>

          {/* 3 Bento Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
            <MagnifiedBento 
              title="One-Click Capture" 
              description="Let AI instantly extract job details from any market listing and auto-fill your tracking pipeline." 
            />
            <MagnifiedBento 
              title="Visual Analytics" 
              description="Analyze your application statistics and track your job search geographically with interactive map visualizations." 
            >
              <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-white/50 rounded-[1.5rem]">
                <Globe className="top-4 sm:top-6" />
                <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_150%,rgba(0,0,0,0.1),rgba(255,255,255,0))]" />
              </div>
            </MagnifiedBento>
            <MagnifiedBento 
              title="Smart CV Match" 
              description="Compare your CV against a job description and get an alignment score with actionable suggestions." 
            >
              <div className="w-full h-full flex flex-col items-center justify-center bg-white/50 rounded-[1.5rem]">
                <ProgressDemo />
              </div>
            </MagnifiedBento>
          </div>
        </div>
      </section>

      {/* 3. Spacer to complete the scroll peel effect */}
      <div className="w-full h-[100svh] pointer-events-none" />
    </div>
  );
}

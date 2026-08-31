import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { SpectralParticles } from "../ui/SpectralParticles";
import { GlitterWrap } from "../ui/GlitterWrap";
import { TextGlitch } from "../ui/TextGlitch";
import { FluidImage } from "../ui/fluid-image";

interface HeroSectionProps {
  onIntroComplete?: () => void;
}

export function HeroSection({ onIntroComplete }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress across the 350vh track for an ultra-smooth, unhurried progression
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth physics-based spring with gentle damping for natural scroll pacing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.45,
  });

  // Stage 1 (hero-bg-ascii-2.webp): Starts visible, eases out smoothly into Stage 2
  const bg1Opacity = useTransform(smoothProgress, [0, 0.08, 0.26, 0.36], [1, 1, 0, 0]);
  const bg1Scale = useTransform(smoothProgress, [0, 0.36], [1, 1.025]);

  // Stage 2 (hero-bg-ascii-1.webp): Eases in, holds comfortably, then slowly and naturally dissolves into Stage 3
  const bg2Opacity = useTransform(smoothProgress, [0.08, 0.26, 0.44, 0.82], [0, 1, 1, 0]);
  const bg2Scale = useTransform(smoothProgress, [0.1, 0.8], [0.985, 1.025]);

  // Stage 3 (hero-bg-ascii-3-1.webp.webp): Very gradual ease-in starting at 44% and smoothly reaching full presence at 82%
  const bg3Opacity = useTransform(smoothProgress, [0.44, 0.82, 1], [0, 1, 1]);
  const bg3Scale = useTransform(smoothProgress, [0.44, 0.95], [0.985, 1.0]);

  // Title & Subtitle dim continuously and slowly across Stage 1 to Stage 3, fading away by the final stage
  // Stage 1 (0 -> ~0.3): Starts bright at 1.0, gently dims to ~0.78
  // Stage 2 (0.3 -> ~0.65): Continues dimming down from ~0.78 to ~0.42
  // Stage 3 (0.65 -> 0.96): Dims to a faint ghost at ~0.15 and gradually dissolves to 0
  const textOpacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.55, 0.8, 0.96],
    [1, 0.82, 0.52, 0.2, 0]
  );
  const textScale = useTransform(smoothProgress, [0, 0.96], [1, 0.95]);
  const textY = useTransform(smoothProgress, [0, 0.96], [0, -32]);

  return (
    <div ref={containerRef} className="relative w-full h-[350vh] bg-black">
      {/* Sticky Fullscreen Viewport */}
      <section className="sticky top-0 w-full h-screen bg-black flex items-center justify-center overflow-hidden select-none z-10">
        
        {/* 1. SCROLL-DRIVEN BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          
          {/* STAGE 1 BACKGROUND (hero-bg-ascii-2.webp) */}
          <motion.div
            style={{ opacity: bg1Opacity, scale: bg1Scale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          >
            <FluidImage
              image="/home/hero-bg-ascii-2.webp"
              className="w-full h-full"
            />
          </motion.div>

          {/* STAGE 2 INTERMEDIATE BACKGROUND (hero-bg-ascii-1.webp) */}
          <motion.div
            style={{ opacity: bg2Opacity, scale: bg2Scale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          >
            <FluidImage
              image="/home/hero-bg-ascii-1.webp"
              className="w-full h-full"
            />
          </motion.div>

          {/* STAGE 3 REVEAL BACKGROUND (hero-bg-ascii-3-1.webp.webp) */}
          <motion.div
            style={{ opacity: bg3Opacity, scale: bg3Scale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          >
            <FluidImage
              image="/home/hero-bg-ascii-3-1.webp.webp"
              className="w-full h-full"
            />
          </motion.div>

          {/* Subtle radial vignette for soft blending */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none z-[1]" />

          {/* GLITTER WRAP (Starfield Warp Tunnel) */}
          <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
            <GlitterWrap
              particleCount={200}
              color1="#F3F7FF"
              color2="#FF7523"
              color3="#2F5BF9"
              speed={1.2}
              density={50}
              starSize={16}
              turbulence={2}
              brightness={80}
              glitterIntensity={2}
              trailAmount={20}
            />
          </div>
        </div>

        {/* 2. SPECTRAL PARTICLES (Atomic 3-color Interactive Cursor Particle Field) */}
        <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
          <SpectralParticles
            engine="atomic"
            colorScheme="electric"
            particleCount={70}
            speed={0.35}
            containmentRadius={480}
            glowIntensity={1.1}
            interactive={true}
          />
        </div>

        {/* 3. HERO TITLE & SUBTITLE WITH GRADUAL SCROLL DIM OUT & GLITCH EFFECT */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-6xl mx-auto -mt-6 md:-mt-10 pointer-events-none"
        >
          {/* POFEI TITLE: Design system font (Space Grotesk + Stack Sans + Inter), weight 900 extra bold, larger size */}
          <div className="relative w-full max-w-[950px] h-[130px] sm:h-[165px] md:h-[200px] lg:h-[240px] flex items-center justify-center pointer-events-auto">
            <TextGlitch
              as="h1"
              text="POFEI"
              fontFamily="'Space Grotesk', 'Stack Sans Text', 'Inter', system-ui, -apple-system, sans-serif"
              fontSize="clamp(5.5rem, 16vw, 11.5rem)"
              fontWeight={900}
              letterSpacing="-0.03em"
              lineHeight={1}
              textColor="#e4e6ea"
              glitchColor1="#ffffff"
              glitchColor2="#ffffff"
              glitchIntensity={0.65}
              glitchSpeed={0.65}
              smoothness={0.35}
              animationMode="hover"
              triggerOnMount={true}
              mountDuration={0.65}
              enableTurbulence={true}
              glitchStyle="classic"
              className="drop-shadow-[0_4px_36px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* SUBTITLE: Increased weight (700 bold), standard & ampersand, without heavy turbulence */}
          <div className="w-full max-w-4xl mt-3 md:mt-5 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full cursor-pointer"
            >
              <TextGlitch
                as="p"
                text="PRODUCT DESIGNER & AI BUILDER"
                fontFamily="'TraditionalAmpersand', 'Inter', 'Space Grotesk', system-ui, -apple-system, sans-serif"
                fontSize="clamp(1rem, 2.3vw, 1.4rem)"
                fontWeight={700}
                letterSpacing="0.24em"
                lineHeight={1.4}
                textColor="#e4e6ea"
                glitchColor1="#ffffff"
                glitchColor2="#ffffff"
                glitchIntensity={0.22}
                glitchSpeed={0.4}
                smoothness={0.4}
                enableTurbulence={false}
                animationMode="hover"
                glitchStyle="classic"
                className="drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default HeroSection;

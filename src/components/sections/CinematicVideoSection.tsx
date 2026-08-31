import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import ParticleText from "../ui/ParticleText";
import TypewriterText from "../ui/TypewriterText";

export function CinematicVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spring-smoothed scroll progress for organic, springy ease-in dynamics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });

  // Video entrance (card to full-screen) and dive-through expansion (1.0 -> 1.45)
  const videoScale = useTransform(smoothProgress, [0, 0.22, 0.52, 0.82], [0.85, 1.0, 1.0, 1.45]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.14, 0.64, 0.82], [0.3, 1.0, 1.0, 0]);
  const borderRadius = useTransform(smoothProgress, [0, 0.22], ["28px", "0px"]);
  
  // Cinematic dimming overlay that intensifies slightly as we dive through the bubble membrane
  const bubbleDimOpacity = useTransform(smoothProgress, [0, 0.55, 0.72, 0.82], [0.15, 0.2, 0.5, 0]);

  // "Let's Build" Particle Text: Enters with video, remains active and interactive,
  // then scales outward and dissolves away in sync with the expanding bubble in the video's last seconds
  const textOpacity = useTransform(smoothProgress, [0.06, 0.2, 0.56, 0.74], [0, 1, 1, 0]);
  const textScale = useTransform(smoothProgress, [0.06, 0.2, 0.56, 0.74], [0.94, 1.0, 1.0, 1.28]);

  // Final high-res image (lets-build-bg3.webp) reveal - seamlessly emerges from the expanding bubble
  const finalImageOpacity = useTransform(smoothProgress, [0.62, 0.82], [0, 1]);
  const finalImageScale = useTransform(smoothProgress, [0.62, 0.86, 1], [1.12, 1.0, 1.0]);

  // Video Controller: Scrub seamlessly through the full 2.94s video up to the bubble dive
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;

    const renderLoop = () => {
      const progress = scrollYProgress.get();

      if (progress < 0.8) {
        if (!video.paused) video.pause();
        // Scrub through the full video timeline (0s -> 2.9s)
        const scrubProgress = Math.min(1, Math.max(0, progress / 0.78));
        const targetTime = scrubProgress * 2.9;
        if (Math.abs(video.currentTime - targetTime) > 0.015) {
          video.currentTime = targetTime;
        }
      } else {
        if (!video.paused) video.pause();
        if (Math.abs(video.currentTime - 2.9) > 0.02) {
          video.currentTime = 2.9;
        }
      }

      frameId = requestAnimationFrame(renderLoop);
    };

    frameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(frameId);
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] bg-black">
      {/* Sticky container that stays on screen while scrolling the 320vh height */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center z-0">
        
        {/* Cinematic Video Layer with Bubble Expansion */}
        <motion.div
          style={{ scale: videoScale, opacity: videoOpacity, borderRadius }}
          className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden origin-center z-0"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            className="w-full h-full object-cover"
            src="/home/bg video 1.2.mp4"
            preload="auto"
          />
          {/* Dive-through dimming overlay */}
          <motion.div
            style={{ opacity: bubbleDimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        </motion.div>

        {/* Final Screen Image Layer (Spring Ease-In & Settling from within the bubble) */}
        <motion.div
          style={{
            opacity: finalImageOpacity,
            scale: finalImageScale,
          }}
          className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden origin-center z-[1]"
        >
          {/* Responsive aspect-ratio wrapper to anchor screen overlays at exact pixel coordinates */}
          <div className="relative aspect-[1672/941] min-w-full min-h-full w-auto h-auto max-w-none flex items-center justify-center shrink-0">
            <img
              src="/home/lets-build-bg3.webp"
              alt="Cinematic visual landscape"
              className="w-full h-full object-cover select-none pointer-events-none"
              loading="eager"
              decoding="async"
            />

            {/* CRT Monitor Screen Typewriter Overlay (Lower Center Screen) */}
            <div
              style={{
                left: "36.2%",
                top: "52.8%",
                width: "11.2%",
                height: "13.2%",
                transform: "translate(-8px, -16px)",
              }}
              className="absolute flex items-center justify-center overflow-hidden px-1 pointer-events-none select-none z-10 bg-transparent"
            >
              {/* Typewriter Text with blinking cursor */}
              <div className="relative z-[2] w-full flex items-center justify-center text-center">
                <TypewriterText
                  texts={["Let's Build"]}
                  color="#EEEEEE"
                  prefixColor="#EEEEEE"
                  cursorColor="#FF8D00"
                  cursorBorderColor="#FF8D00"
                  cursorWidth={3.5}
                  cursorHeight={15}
                  font={{
                    fontFamily: "Space Grotesk, Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.65rem, 0.95vw, 1.25rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: "1.15em",
                    textAlign: "center"
                  }}
                  transition={{
                    duration: 0.08,
                    delay: 2.0,
                  }}
                  deletingSpeed={35}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive "Let's Build" Particle Text Layer (During video phase) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 z-[2]">
          <motion.div
            style={{ opacity: textOpacity, scale: textScale }}
            className="pointer-events-auto w-full h-[360px] flex items-center justify-center"
          >
            <ParticleText
              text="Let's Build"
              particleSize={1.9}
              density={3}
              color="#ffffff"
              highlightColor="#ffffff"
              scatter={230}
              gatherDuration={1300}
              stagger={420}
              pointerRepel={42}
              repelRadius={120}
              idleDrift={0.8}
              trigger="hover"
              fontSize="clamp(5rem, 15vw, 12rem)"
              fontWeight={900}
              fontFamily="inherit"
              glow
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}




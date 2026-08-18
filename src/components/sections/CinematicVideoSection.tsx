import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ParticleText from "../ui/ParticleText";
import { cn } from "@/lib/utils";

export function CinematicVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale the video up from smaller size to full screen as we scroll
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  // Fade in the video as we scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);
  // Round corners initially, then remove rounding when full screen
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], ["32px", "0px"]);

  // Fade in the text gradually as we scroll
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  // Consolidated Video Controller: Scroll Scrubbing + Seamless Forward Loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;

    const renderLoop = () => {
      const progress = scrollYProgress.get();

      if (progress >= 0.99) {
        // --- NATIVE SEAMLESS LOOP PHASE ---
        // We use native hardware-accelerated playback here instead of manual scrubbing
        // to completely eliminate the choppy "stuck" feeling caused by reverse-decoding mp4 frames.
        video.playbackRate = 0.5;
        if (video.paused) video.play().catch(() => {});
        
        // Seamlessly wrap the playhead when it hits the end of the loop zone
        if (video.currentTime >= 2.9) {
          video.currentTime = 2.0;
        }
      } else {
        // --- SCROLL SCRUB PHASE (0s to 2s) ---
        if (!video.paused) video.pause();
        
        const targetTime = 2 * (progress / 0.99);
        // Set currentTime smoothly as user scrolls
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime;
        }
      }

      frameId = requestAnimationFrame(renderLoop);
    };

    frameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(frameId);
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
      {/* Sticky container that stays on screen while scrolling the 300vh height */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center z-0">
        
        {/* Cinematic Video Reveal */}
        <motion.div
          style={{ scale, opacity, borderRadius }}
          className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden origin-center"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            className="w-full h-full object-cover"
            src="/bg video 1.2.mp4"
            preload="auto"
          />
          {/* Black overlay for text readability */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </motion.div>

        {/* Text Overlay Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <motion.div
            style={{ opacity: textOpacity }}
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

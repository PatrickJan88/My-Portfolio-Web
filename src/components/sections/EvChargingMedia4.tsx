import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface EvChargingMedia4Props {
  onMediaClick?: (src: string, isVideo: boolean, gallery?: string[]) => void;
  className?: string;
}

export function EvChargingMedia4({
  onMediaClick,
  className = "",
}: EvChargingMedia4Props) {
  const [phase, setPhase] = useState<"image" | "video">("image");
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const imageSrc = "/projects/ev-charging-platform/ev-mp-4.webp";
  const videoSrc = "/projects/ev-charging-platform/ev-mp4-video.webm";

  // Observe in-view status so we don't autoplay off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Timer loop: when phase is 'image', wait 2s then switch to 'video'
  useEffect(() => {
    if (!isInView) return;

    if (phase === "image") {
      const timer = setTimeout(() => {
        setPhase("video");
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      }, 2000);

      return () => clearTimeout(timer);
    } else if (phase === "video") {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [phase, isInView]);

  // Handle video finished playing: switch back to static image, which triggers next loop
  const handleVideoEnded = () => {
    setPhase("image");
  };

  const handleContainerClick = () => {
    if (onMediaClick) {
      const activeSrc = phase === "video" ? videoSrc : imageSrc;
      onMediaClick(activeSrc, phase === "video");
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      onClick={handleContainerClick}
      className={`w-full aspect-[4/3] md:aspect-[16/9] bg-mist-gray rounded-[2rem] overflow-hidden flex items-center justify-center relative cursor-pointer md:cursor-auto select-none ${className}`}
    >
      {/* Static Image Layer (Full 16:9 Graphic) */}
      <img
        src={imageSrc}
        alt="E boost Market Vietnam UI"
        className={`w-full h-full object-cover md:object-contain absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
          phase === "image" ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      />

      {/* Video Layer: Kept right in the middle of the 16:9 frame with seamless dark matching backdrop */}
      <div
        className={`absolute inset-0 w-full h-full bg-[#0f0e15] flex items-center justify-center transition-opacity duration-700 ease-in-out ${
          phase === "video" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          preload="auto"
          onEnded={handleVideoEnded}
          className="h-full aspect-square max-w-full object-contain mx-auto pointer-events-none md:pointer-events-auto"
        />
      </div>
    </motion.div>
  );
}

export default EvChargingMedia4;

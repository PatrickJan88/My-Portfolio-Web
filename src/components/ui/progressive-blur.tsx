import React, { useEffect, useRef } from "react";
import { motion, useSpring } from "motion/react";

export type ProgressiveBlurProps = {
  className?: string;
  position?: "top" | "bottom";
  /** Height of the blur area (expanded natural area default: 140px) */
  height?: string;
  /** Blur intensity in pixels (default: 8px for soft natural optical refraction) */
  blurAmount?: string;
  fixed?: boolean;
  /** Only appear while scrolling / active motion (default: true) */
  scrollOnly?: boolean;
  /** Delay in ms before melting away after scrolling stops (default: 300ms) */
  meltDelay?: number;
  /** Distance from bottom of the page in px before fading out completely (default: 180px) */
  footerThreshold?: number;
};

/**
 * Pure Glass Progressive ScrollBlur:
 * 100% transparent (no color wash / no white or black tint).
 * Natural backdrop-filter blur feathered smoothly via CSS linear gradient mask.
 * Automatically suppresses when reaching the footer area.
 */
export const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  className = "",
  position = "bottom",
  height = "140px",
  blurAmount = "8px",
  fixed = true,
  scrollOnly = true,
  meltDelay = 300,
  footerThreshold = 180,
}) => {
  const isTop = position === "top";
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  // Smooth opacity spring for subtle enter and gentle fade out
  const opacity = useSpring(scrollOnly ? 0 : 1, {
    stiffness: 170,
    damping: 24,
    mass: 0.5,
  });

  useEffect(() => {
    if (!scrollOnly) {
      opacity.set(1);
      return;
    }

    const isNearFooter = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // If we are within footerThreshold of the document bottom, hide blur
      return documentHeight - (scrollY + windowHeight) < footerThreshold;
    };

    const triggerMotion = () => {
      if (isNearFooter()) {
        opacity.set(0);
        return;
      }

      opacity.set(1);

      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        opacity.set(0);
      }, meltDelay);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (isNearFooter()) {
        opacity.set(0);
        return;
      }

      // React to scroll movement
      if (Math.abs(delta) > 0.5) {
        triggerMotion();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        triggerMotion();
      }
    };

    const handleTouch = () => {
      triggerMotion();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouch);
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollOnly, meltDelay, footerThreshold, opacity]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        opacity,
        [isTop ? "top" : "bottom"]: 0,
        height,
        backgroundColor: "transparent",
        background: "transparent",
        maskImage: isTop
          ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
          : "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage: isTop
          ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
          : "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
      className={`pointer-events-none select-none ${
        fixed ? "fixed" : "absolute"
      } left-0 right-0 w-full z-30 ${className}`}
    />
  );
};

export default ProgressiveBlur;

import { useEffect, useRef } from "react";
import { motion, useSpring } from "motion/react";

interface ScrollBlurProps {
  /** Maximum blur strength in pixels (default: 40) */
  blurStrength?: number;
  /** Height of the edge blur zones (default: 180px) */
  height?: number | string;
  /** Positions to render the blur: 'both' | 'top' | 'bottom' */
  direction?: "both" | "top" | "bottom";
  /** Optional background tint */
  tint?: string;
  /** Time in ms before the blur melts away after scrolling stops (default: 320ms) */
  meltDelay?: number;
  /** Show subtle edge feathering */
  edgeFeather?: boolean;
}

/**
 * ScrollBlurByAki
 * Features progressive multi-slice backdrop-filters for natural visual dispersion,
 * velocity-responsive opacity springing, and smooth fade-out melting at rest.
 * Fixed in the viewport with pointer-events disabled.
 */
export function ScrollBlur({
  blurStrength = 40,
  height = "180px",
  direction = "both",
  tint = "transparent",
  meltDelay = 350,
}: ScrollBlurProps) {
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const lastTime = useRef(typeof Date !== "undefined" ? Date.now() : 0);

  // Smooth opacity spring for entering on scroll and gently melting away at rest
  const opacity = useSpring(0, {
    stiffness: 160,
    damping: 22,
    mass: 0.6,
  });

  useEffect(() => {
    const handleScrollActivity = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const dt = Math.max(1, now - lastTime.current);
      const dy = Math.abs(currentScrollY - lastScrollY.current);
      const velocity = dy / dt; // px per ms

      lastScrollY.current = currentScrollY;
      lastTime.current = now;

      // Responsive opacity that immediately fires on motion (min 0.75, max 1.0)
      const targetOpacity = Math.min(1, Math.max(0.8, velocity * 0.8 + 0.3));
      opacity.set(targetOpacity);

      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        opacity.set(0);
      }, meltDelay);
    };

    window.addEventListener("scroll", handleScrollActivity, { passive: true });
    window.addEventListener("wheel", handleScrollActivity, { passive: true });
    window.addEventListener("touchmove", handleScrollActivity, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollActivity);
      window.removeEventListener("wheel", handleScrollActivity);
      window.removeEventListener("touchmove", handleTouchActivitySafe);
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
    function handleTouchActivitySafe() {
      handleScrollActivity();
    }
  }, [opacity, meltDelay]);

  const heightVal = typeof height === "number" ? `${height}px` : height;

  // Progressive slices calculated with optical curve (Aki / Framer method)
  const steps = 6;
  const topSlices = Array.from({ length: steps }, (_, i) => {
    const pStart = (i / steps) * 100;
    const pEnd = ((i + 1.5) / steps) * 100;
    const blurAmount = blurStrength * Math.pow((i + 1) / steps, 1.8);
    return {
      blur: blurAmount,
      mask: `linear-gradient(to bottom, rgba(0,0,0,1) ${pStart * 0.6}%, rgba(0,0,0,0) ${Math.min(100, pEnd * 1.1)}%)`,
    };
  });

  const bottomSlices = Array.from({ length: steps }, (_, i) => {
    const pStart = (i / steps) * 100;
    const pEnd = ((i + 1.5) / steps) * 100;
    const blurAmount = blurStrength * Math.pow((i + 1) / steps, 1.8);
    return {
      blur: blurAmount,
      mask: `linear-gradient(to top, rgba(0,0,0,1) ${pStart * 0.6}%, rgba(0,0,0,0) ${Math.min(100, pEnd * 1.1)}%)`,
    };
  });

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none"
    >
      {/* TOP BLUR ZONE */}
      {(direction === "both" || direction === "top") && (
        <motion.div
          style={{ opacity, height: heightVal }}
          className="fixed top-0 left-0 right-0 w-full pointer-events-none"
        >
          {topSlices.map((slice, idx) => (
            <div
              key={`top-slice-${idx}`}
              className="absolute inset-0 w-full h-full"
              style={{
                backdropFilter: `blur(${slice.blur.toFixed(1)}px)`,
                WebkitBackdropFilter: `blur(${slice.blur.toFixed(1)}px)`,
                maskImage: slice.mask,
                WebkitMaskImage: slice.mask,
              }}
            />
          ))}
          {tint && tint !== "transparent" && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: `linear-gradient(to bottom, ${tint} 0%, transparent 100%)`,
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
              }}
            />
          )}
        </motion.div>
      )}

      {/* BOTTOM BLUR ZONE */}
      {(direction === "both" || direction === "bottom") && (
        <motion.div
          style={{ opacity, height: heightVal }}
          className="fixed bottom-0 left-0 right-0 w-full pointer-events-none"
        >
          {bottomSlices.map((slice, idx) => (
            <div
              key={`bottom-slice-${idx}`}
              className="absolute inset-0 w-full h-full"
              style={{
                backdropFilter: `blur(${slice.blur.toFixed(1)}px)`,
                WebkitBackdropFilter: `blur(${slice.blur.toFixed(1)}px)`,
                maskImage: slice.mask,
                WebkitMaskImage: slice.mask,
              }}
            />
          ))}
          {tint && tint !== "transparent" && (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: `linear-gradient(to top, ${tint} 0%, transparent 100%)`,
                maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
              }}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}

export default ScrollBlur;

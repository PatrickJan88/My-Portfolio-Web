import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // Exact momentum & damping configuration matching Framer's Palmer template
    const lenis = new Lenis({
      duration: 1.15, // Time to reach target position (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95, // Refined natural wheel velocity
      touchMultiplier: 1.5,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Scroll to top on route change smoothly without abrupt jump
    lenis.scrollTo(0, { immediate: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [location.pathname]);

  return <>{children}</>;
}

export default SmoothScrollProvider;

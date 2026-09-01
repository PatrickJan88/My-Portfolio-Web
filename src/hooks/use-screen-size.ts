import { useState, useEffect } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export interface ScreenSizeHelper {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isLessThan: (bp: Breakpoint) => boolean;
  isGreaterThan: (bp: Breakpoint) => boolean;
  lessThan: (bp: Breakpoint) => boolean;
  greaterThan: (bp: Breakpoint) => boolean;
  is: (bp: Breakpoint) => boolean;
}

export function useScreenSize(): ScreenSizeHelper {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getBreakpoint = (width: number): Breakpoint => {
    if (width >= BREAKPOINTS["2xl"]) return "2xl";
    if (width >= BREAKPOINTS.xl) return "xl";
    if (width >= BREAKPOINTS.lg) return "lg";
    if (width >= BREAKPOINTS.md) return "md";
    if (width >= BREAKPOINTS.sm) return "sm";
    return "xs";
  };

  const currentBp = getBreakpoint(windowSize.width);

  const lessThan = (bp: Breakpoint) => windowSize.width < BREAKPOINTS[bp];
  const greaterThan = (bp: Breakpoint) => windowSize.width >= BREAKPOINTS[bp];
  const is = (bp: Breakpoint) => currentBp === bp;

  return {
    width: windowSize.width,
    height: windowSize.height,
    breakpoint: currentBp,
    isLessThan: lessThan,
    isGreaterThan: greaterThan,
    lessThan,
    greaterThan,
    is,
  };
}

export default useScreenSize;

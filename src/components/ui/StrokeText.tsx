import { CSSProperties, useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';

export type StrokeTextTrigger = 'mount' | 'hover' | 'scroll' | 'loop';
export type StrokeTextFillMode = 'wipe' | 'fade' | 'none';

export interface StrokeTextProps {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: StrokeTextTrigger;
  fillMode?: StrokeTextFillMode;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
  onComplete?: () => void;
}

// Exact authentic Space Grotesk Bold glyph vector contours with NO overlapping internal loops or extra strokes
const POFEI_GLYPHS = [
  {
    char: 'P',
    d: 'M31.68 140 L10.56 140 L10.56 28 L56.64 28 Q67.20 28 75.28 32.24 Q83.36 36.48 87.92 44.16 Q92.48 51.84 92.48 62.40 L92.48 64.64 Q92.48 75.04 87.76 82.80 Q83.04 90.56 74.96 94.80 Q66.88 99.04 56.64 99.04 L31.68 99.04 L31.68 140 Z M31.68 47.20 L31.68 79.84 L54.56 79.84 Q62.08 79.84 66.72 75.68 Q71.36 71.52 71.36 64.32 L71.36 62.72 Q71.36 55.52 66.72 51.36 Q62.08 47.20 54.56 47.20 Z',
  },
  {
    char: 'O',
    d: 'M145.92 142.24 Q124.80 142.24 112.32 130.64 Q99.84 119.04 99.84 97.44 L99.84 70.56 Q99.84 48.96 112.32 37.36 Q124.80 25.76 145.92 25.76 Q167.04 25.76 179.52 37.36 Q192 48.96 192 70.56 L192 97.44 Q192 119.04 179.52 130.64 Q167.04 142.24 145.92 142.24 Z M145.92 123.36 Q157.76 123.36 164.32 116.48 Q170.88 109.60 170.88 98.08 L170.88 69.92 Q170.88 58.40 164.32 51.52 Q157.76 44.64 145.92 44.64 Q134.24 44.64 127.60 51.52 Q120.96 58.40 120.96 69.92 L120.96 98.08 Q120.96 109.60 127.60 116.48 Q134.24 123.36 145.92 123.36 Z',
  },
  {
    char: 'F',
    d: 'M226.88 140 L205.76 140 L205.76 28 L276.16 28 L276.16 47.20 L226.88 47.20 L226.88 74.24 L272.32 74.24 L272.32 93.44 L226.88 93.44 L226.88 140 Z',
  },
  {
    char: 'E',
    d: 'M359.36 140 L286.40 140 L286.40 28 L358.40 28 L358.40 47.20 L307.52 47.20 L307.52 73.92 L353.92 73.92 L353.92 93.12 L307.52 93.12 L307.52 120.80 L359.36 120.80 L359.36 140 Z',
  },
  {
    char: 'I',
    d: 'M391.36 140 L370.24 140 L370.24 28 L391.36 28 L391.36 140 Z',
  }
];

export const StrokeText = ({
  text = 'POFEI',
  strokeColor = '#66676a',
  fillColor = '#e4e6ea',
  strokeWidth = 2,
  drawDuration = 1.4,
  fillDelay = 0.15,
  stagger = 0.04,
  ease = 'power2.out',
  fillMode = 'wipe',
  className = '',
  style = {},
  onComplete
}: StrokeTextProps) => {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const wipeRectRef = useRef<SVGRectElement | null>(null);
  const hasFinishedRef = useRef(false);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  // Exact bounds of the Space Grotesk Bold vector glyphs (viewBox matching font coordinates)
  const viewBox = '5 22 392 124';
  const totalBoxWidth = 405;

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === 'undefined' || !root || hasFinishedRef.current) return undefined;

    const strokePaths = gsap.utils.toArray<SVGPathElement>(root.querySelectorAll('[data-stroke-char]'));
    const fillPaths = gsap.utils.toArray<SVGPathElement>(root.querySelectorAll('[data-fill-char]'));
    const wipe = wipeRectRef.current;
    if (!strokePaths.length) return undefined;

    // Measure exact stroke dash lengths per path
    strokePaths.forEach((path) => {
      const length = path.getTotalLength() || 600;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
    });

    const fillEnabled = fillMode !== 'none';
    const useWipe = fillEnabled && fillMode === 'wipe';
    const fillDuration = Math.max(0.4, drawDuration * 0.4);
    const targets = [...strokePaths, ...fillPaths, wipe].filter(Boolean);

    gsap.killTweensOf(targets);
    gsap.set(fillPaths, { opacity: useWipe ? 1 : 0 });
    if (wipe) gsap.set(wipe, { attr: { width: 0 } });

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      strokePaths.forEach((path) => gsap.set(path, { strokeDashoffset: 0 }));
      gsap.set(fillPaths, { opacity: fillEnabled ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: totalBoxWidth + 50 } });
      hasFinishedRef.current = true;
      onComplete?.();
      return () => gsap.killTweensOf(targets);
    }

    // STRICT ONE-TIME EXECUTION TIMELINE (No repeats, no loop, single draw then single fill)
    const tl = gsap.timeline({
      paused: true,
      repeat: 0,
      onComplete: () => {
        hasFinishedRef.current = true;
        onComplete?.();
      }
    });

    // 1. Single draw pass across each glyph
    strokePaths.forEach((path, i) => {
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: drawDuration,
          ease
        },
        i * stagger
      );
    });

    // 2. Single fill pass (wipe across whole wordmark)
    if (useWipe && wipe) {
      tl.to(
        wipe,
        {
          attr: { width: totalBoxWidth + 60 },
          duration: fillDuration,
          ease: 'power2.inOut'
        },
        drawDuration + fillDelay
      );
    } else if (fillEnabled) {
      tl.to(
        fillPaths,
        {
          opacity: 1,
          duration: fillDuration,
          ease: 'power2.out',
          stagger
        },
        drawDuration + fillDelay
      );
    }

    // Play once on mount
    tl.play(0);

    return () => {
      tl.kill();
      gsap.killTweensOf(targets);
    };
  }, [drawDuration, fillDelay, stagger, ease, fillMode, onComplete, totalBoxWidth]);

  return (
    <span
      ref={rootRef}
      className={`block w-full h-full leading-[0] flex items-center justify-center ${className}`.trim()}
      style={style}
      role="img"
      aria-label={String(text ?? '')}
    >
      <svg
        className="w-full h-full max-h-[160px] md:max-h-[220px] overflow-visible select-none"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {fillMode === 'wipe' && (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect ref={wipeRectRef} x="0" y="0" width="0" height="160" />
            </clipPath>
          </defs>
        )}

        {/* Outline Stroke Paths - Single-draw, clean contours with no internal overlaps */}
        <g
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          fillRule="evenodd"
        >
          {POFEI_GLYPHS.map((glyph, index) => (
            <path data-stroke-char key={`s-${glyph.char}-${index}`} d={glyph.d} />
          ))}
        </g>

        {/* Solid Filled Paths - Single wipe fill */}
        <g
          fill={fillColor}
          stroke="none"
          fillRule="evenodd"
          clipPath={fillMode === 'wipe' ? `url(#${wipeId})` : undefined}
        >
          {POFEI_GLYPHS.map((glyph, index) => (
            <path data-fill-char key={`f-${glyph.char}-${index}`} d={glyph.d} />
          ))}
        </g>
      </svg>
    </span>
  );
};

export default StrokeText;

import { useState, useEffect, useRef, useId, useMemo, type CSSProperties } from 'react';

export type GlitchStyle = 'classic' | 'rgb-split' | 'chaos';
export type AnimationMode = 'continuous' | 'hover';

export interface TextGlitchProps {
  text: string;
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  textColor?: string;
  glitchColor1?: string;
  glitchColor2?: string;
  glitchIntensity?: number; // 0 to 1
  glitchSpeed?: number; // 0.2 to 2
  smoothness?: number; // 0 to 1
  animationMode?: AnimationMode; // 'continuous' | 'hover'
  glitchStyle?: GlitchStyle; // 'classic' | 'rgb-split' | 'chaos'
  enableTurbulence?: boolean; // When false, bypasses SVG feDisplacementMap warping to keep small text sharp
  triggerOnMount?: boolean; // Whether to play glitch burst once on mount/entry
  mountDuration?: number; // Duration of the entry burst in seconds (default: 0.65)
  className?: string;
  style?: CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

interface SliceBand {
  clip: string;
  transform: string;
  opacity: number;
  color: string;
}

interface NoiseBar {
  top: number;
  height: number;
  left: number;
  width: number;
  opacity: number;
  color: string;
}

export function TextGlitch({
  text = 'POFEI',
  fontFamily = "'Space Grotesk', system-ui, -apple-system, sans-serif",
  fontSize = 'clamp(4rem, 12vw, 10rem)',
  fontWeight = 800,
  letterSpacing = '-0.03em',
  lineHeight = 1,
  textColor = '#e4e6ea',
  glitchColor1 = '#ffffff',
  glitchColor2 = '#ffffff',
  glitchIntensity = 0.65,
  glitchSpeed = 0.6,
  smoothness = 0.35,
  animationMode = 'hover',
  glitchStyle = 'classic',
  enableTurbulence = true,
  triggerOnMount = false,
  mountDuration = 0.65,
  className = '',
  style,
  as: Component = 'div',
}: TextGlitchProps) {
  const filterId = `cinema-glitch-filter-${useId().replace(/:/g, '')}`;
  const [isHovered, setIsHovered] = useState(false);
  const [isMountGlitching, setIsMountGlitching] = useState(triggerOnMount);

  // Trigger glitch burst on entry / mount
  useEffect(() => {
    if (!triggerOnMount) return;
    setIsMountGlitching(true);
    const timer = setTimeout(() => {
      setIsMountGlitching(false);
    }, Math.max(0.1, mountDuration) * 1000);
    return () => clearTimeout(timer);
  }, [triggerOnMount, mountDuration]);

  // SVG turbulence & displacement states
  const [dispScale, setDispScale] = useState(0);
  const [turbSeed, setTurbSeed] = useState(1);
  const [turbFreq, setTurbFreq] = useState('0.02 0.9');

  // Multi-band slicing slices
  const [slices, setSlices] = useState<SliceBand[]>([]);
  const [noiseBars, setNoiseBars] = useState<NoiseBar[]>([]);
  const [brightness, setBrightness] = useState(1);
  const [skewDeg, setSkewDeg] = useState(0);
  const [scrambleText, setScrambleText] = useState(text);

  const animRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  const glitchChars = useMemo(
    () => '!<>-_\\/[]{}—=+*^?#_0101XYZ',
    []
  );

  useEffect(() => {
    let isActive = true;

    const tick = (time: number) => {
      if (!isActive) return;

      const shouldAnimate =
        animationMode === 'continuous' || (animationMode === 'hover' && isHovered) || isMountGlitching;

      if (!shouldAnimate) {
        setDispScale(0);
        setSlices([]);
        setNoiseBars([]);
        setBrightness(1);
        setSkewDeg(0);
        setScrambleText(text);
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      // Interval scaled by speed
      const baseInterval = 100 / Math.max(0.2, glitchSpeed);
      if (time - lastUpdateRef.current > baseInterval) {
        lastUpdateRef.current = time;

        const isSpike = Math.random() < 0.78;

        if (isSpike) {
          // 1. Procedural displacement map distortion (subtle horizontal cinema displacement)
          if (enableTurbulence) {
            const seed = Math.floor(Math.random() * 100) + 1;
            const currentDisp = (Math.random() * 6 + 1.5) * glitchIntensity;
            const yFreq = 0.5 + Math.random() * 0.5;
            setTurbSeed(seed);
            setTurbFreq(`0.01 ${yFreq.toFixed(2)}`);
            setDispScale(currentDisp);
          } else {
            setDispScale(0);
          }

          // 2. Brightness flash & subtle micro skew
          setBrightness(Math.random() < 0.3 ? 1.2 : 1.0 + Math.random() * 0.1);
          setSkewDeg((Math.random() - 0.5) * (enableTurbulence ? 2.5 : 1.2) * glitchIntensity);

          // 3. Multi-layer slicing bands (pure white / monochrome)
          const numSlices = 5;
          const newSlices: SliceBand[] = [];
          const intensityPx = 10 * glitchIntensity;

          for (let i = 0; i < numSlices; i++) {
            const top = Math.floor(Math.random() * 85);
            const height = Math.floor(Math.random() * 18) + 4;
            const bottom = Math.max(0, 100 - (top + height));

            const isColor1 = i % 2 === 0;
            const color = isColor1 ? glitchColor1 : glitchColor2;
            const dir = isColor1 ? -1 : 1;

            const dx = dir * (Math.random() * intensityPx + 2);
            const dy = (Math.random() - 0.5) * (intensityPx * 0.12);
            const sliceSkew = (Math.random() - 0.5) * 2 * glitchIntensity;

            newSlices.push({
              clip: `inset(${top}% 0 ${bottom}% 0)`,
              transform: `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) skewX(${sliceSkew.toFixed(1)}deg)`,
              opacity: 0.9 + Math.random() * 0.1,
              color,
            });
          }
          setSlices(newSlices);

          // 4. Digital noise bars
          const newNoiseBars: NoiseBar[] = [];
          if (Math.random() < 0.45) {
            const barCount = Math.floor(Math.random() * 2) + 1;
            for (let b = 0; b < barCount; b++) {
              newNoiseBars.push({
                top: Math.floor(Math.random() * 90),
                height: Math.floor(Math.random() * 3) + 1,
                left: Math.floor(Math.random() * 30),
                width: Math.floor(Math.random() * 50) + 20,
                opacity: 0.4 + Math.random() * 0.4,
                color: Math.random() < 0.5 ? glitchColor1 : glitchColor2,
              });
            }
          }
          setNoiseBars(newNoiseBars);

          // 5. Scramble text in chaos mode
          if (glitchStyle === 'chaos' && Math.random() < 0.4) {
            const arr = text.split('');
            const replaceIdx = Math.floor(Math.random() * arr.length);
            arr[replaceIdx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            setScrambleText(arr.join(''));
          } else {
            setScrambleText(text);
          }
        } else {
          // Micro resting frame
          setDispScale(0);
          setSlices([]);
          setNoiseBars([]);
          setBrightness(1);
          setSkewDeg(0);
          setScrambleText(text);
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      isActive = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [text, glitchIntensity, glitchSpeed, glitchStyle, enableTurbulence, animationMode, isHovered, isMountGlitching, glitchColor1, glitchColor2, glitchChars]);

  const fontStyle = {
    fontFamily,
    fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
    fontWeight,
    letterSpacing: typeof letterSpacing === 'number' ? `${letterSpacing}px` : letterSpacing,
    lineHeight,
  };

  const isGlitching = (animationMode === 'continuous' || (animationMode === 'hover' && isHovered)) && dispScale > 0;

  return (
    <Component
      className={`relative inline-block select-none cursor-pointer group ${className}`.trim()}
      style={{ ...fontStyle, ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={text}
    >
      {/* SVG Cinema Displacement & Turbulence Filter Definition */}
      <svg
        className="absolute w-0 h-0 pointer-events-none opacity-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={turbFreq}
              numOctaves="1"
              seed={turbSeed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={dispScale}
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/* 1. Main Base Text (with SVG Movie Displacement Filter + Brightness Flash) */}
      <span
        className="relative block transition-transform duration-100 will-change-transform"
        style={{
          color: textColor,
          filter: dispScale > 0 ? `url(#${filterId}) brightness(${brightness})` : undefined,
          transform: skewDeg !== 0 ? `skewX(${skewDeg.toFixed(1)}deg)` : 'none',
        }}
      >
        {scrambleText}
      </span>

      {/* 2. Chromatic RGB Slicing Layers */}
      {slices.map((s, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none z-[2]"
          style={{
            color: s.color,
            clipPath: s.clip,
            transform: s.transform,
            opacity: s.opacity,
            mixBlendMode: 'screen',
          }}
        >
          {scrambleText}
        </span>
      ))}

      {/* 3. Movie Digital Noise / Tear Lines Overlay */}
      {noiseBars.map((nb, nIdx) => (
        <span
          key={`bar-${nIdx}`}
          aria-hidden="true"
          className="absolute pointer-events-none select-none z-[3]"
          style={{
            top: `${nb.top}%`,
            height: `${nb.height}px`,
            left: `${nb.left}%`,
            width: `${nb.width}%`,
            backgroundColor: nb.color,
            opacity: nb.opacity,
            mixBlendMode: 'screen',
            boxShadow: `0 0 8px ${nb.color}`,
          }}
        />
      ))}

      {/* 4. Film Interlace / CRT Scanlines Effect (Visible only during active glitch) */}
      {isGlitching && (
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none select-none z-[4] opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 1px, transparent 3px)',
          }}
        />
      )}
    </Component>
  );
}

export default TextGlitch;

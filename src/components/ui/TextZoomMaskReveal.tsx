import { useId, useRef, useEffect, useState } from "react";
import { motion, MotionValue } from "motion/react";

interface TextZoomMaskRevealProps {
  src?: string;
  videoSrc?: string;
  playbackRate?: number;
  word?: string;
  scale: number | MotionValue<number>;
  imageScale?: number | MotionValue<number>;
  isMasked?: boolean;
  darkOverlay?: number;
  fontSize?: string;
  fontWeight?: number | string;
  fontFamily?: string;
  letterSpacing?: string;
  className?: string;
}

export function TextZoomMaskReveal({
  src = "/home/hero-bg-ascii-1.webp",
  videoSrc,
  playbackRate = 0.6,
  word = "POFEI",
  scale,
  imageScale,
  isMasked = true,
  darkOverlay = 0.5,
  fontSize = "clamp(5rem, 16vw, 12rem)",
  fontWeight = 900,
  fontFamily = "'Space Grotesk', system-ui, -apple-system, sans-serif",
  letterSpacing = "-0.03em",
  className = "",
}: TextZoomMaskRevealProps) {
  const maskId = `text-zoom-mask-${useId().replace(/:/g, "")}`;
  const textRef = useRef<SVGTextElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc, playbackRate]);

  useEffect(() => {
    // Calculate the precise visual center of 'O' and 'F' glyphs for zoom focal point
    const updateOrigin = () => {
      if (!textRef.current || !containerRef.current) return;
      try {
        const extO = textRef.current.getExtentOfChar(1); // 'O'
        const extF = textRef.current.getExtentOfChar(2); // 'F'
        if (extO && extF && extO.width > 0 && extF.width > 0) {
          const midX = (extO.x + extO.width / 2 + extF.x + extF.width / 2) / 2;
          const midY = (extO.y + extO.height / 2 + extF.y + extF.height / 2) / 2;
          setOrigin({ x: midX, y: midY });
          return;
        }
      } catch {
        // Fallback using BBox
      }

      try {
        const bbox = textRef.current.getBBox();
        setOrigin({
          x: bbox.x + bbox.width * 0.48,
          y: bbox.y + bbox.height * 0.5,
        });
      } catch {
        const rect = containerRef.current.getBoundingClientRect();
        setOrigin({ x: rect.width * 0.48, y: rect.height * 0.5 });
      }
    };

    updateOrigin();
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateOrigin).catch(() => {});
    }
    const timeout = setTimeout(updateOrigin, 100);
    window.addEventListener("resize", updateOrigin);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateOrigin);
    };
  }, [word, fontSize, fontFamily, letterSpacing]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none pointer-events-none ${className}`}
    >
      <svg
        className="w-full h-full overflow-visible"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="-50000"
            y="-50000"
            width="100000"
            height="100000"
          >
            {/* White glyphs inside mask where image/video content is visible */}
            <motion.g
              style={{
                scale,
                transformOrigin: `${origin.x}px ${origin.y}px`,
              }}
            >
              <text
                ref={textRef}
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize,
                  fontWeight,
                  fontFamily,
                  letterSpacing,
                }}
                fill="#ffffff"
              >
                {word}
              </text>
            </motion.g>
          </mask>
        </defs>

        {videoSrc ? (
          <foreignObject
            x="-500%"
            y="-500%"
            width="1100%"
            height="1100%"
            mask={isMasked ? `url(#${maskId})` : undefined}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              style={
                imageScale
                  ? { scale: imageScale, transformOrigin: "50% 50%" }
                  : undefined
              }
            >
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover sm:object-contain object-center"
              />
              {/* 50% black overlay on entry video */}
              {darkOverlay > 0 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundColor: `rgba(0, 0, 0, ${darkOverlay})` }}
                />
              )}
            </motion.div>
          </foreignObject>
        ) : (
          <g mask={isMasked ? `url(#${maskId})` : undefined}>
            <motion.image
              href={src}
              x="-500%"
              y="-500%"
              width="1100%"
              height="1100%"
              preserveAspectRatio="xMidYMid slice"
              style={
                imageScale
                  ? { scale: imageScale, transformOrigin: "50% 50%" }
                  : undefined
              }
            />
          </g>
        )}
      </svg>
    </div>
  );
}

export default TextZoomMaskReveal;

import { useState, useEffect, useRef } from "react";
import { motion, MotionValue, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface InlineMediaBetweenProps {
  mediaUrl?: string;
  mediaType?: "image" | "video";
  progress?: MotionValue<number>;
  range?: [number, number];
  alt?: string;
  className?: string;
  targetSectionId?: string;
}

export function InlineMediaBetween({
  mediaUrl = "/home/biotopia-case-cover-page-1.webp",
  mediaType = "image",
  progress,
  range = [0.85, 0.95],
  alt = "Selected projects preview",
  className,
  targetSectionId = "selected-projects",
}: InlineMediaBetweenProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const inlineImgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const maskImgRef = useRef<HTMLImageElement>(null);

  const threshold = Math.max(0, range[0] - 0.03);

  // Monitor scroll progress to expand thumbnail between "my" and "work."
  useEffect(() => {
    if (!progress) return;
    const unsub = progress.on("change", (latest) => {
      setIsExpanded(latest >= threshold);
    });
    return () => unsub();
  }, [progress, threshold]);

  // Handle clicking the media image to immediately jump to Selected Projects and trigger Rect Mask Reveal
  const handleMediaClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Immediately jump to the start of Selected Projects section without showing scroll movement
    const lenis = (window as any).__lenis;
    const targetElement = document.getElementById(targetSectionId);

    if (lenis && targetElement) {
      lenis.scrollTo(targetElement, { immediate: true });
    } else if (targetElement) {
      const targetY =
        targetElement.getBoundingClientRect().top +
        (window.pageYOffset || document.documentElement.scrollTop);
      window.scrollTo(0, targetY);
    }

    // Run the Rect Mask Reveal animation
    requestAnimationFrame(() => {
      if (maskImgRef.current && overlayRef.current) {
        gsap.killTweensOf([maskImgRef.current, overlayRef.current]);

        // Ensure full overlay visibility at start
        gsap.set(overlayRef.current, { opacity: 1 });

        // Rectangular Mask Reveal animation
        gsap.fromTo(
          maskImgRef.current,
          {
            clipPath: "inset(48% 48% 48% 48% round 16px)",
            scale: 1.35,
            filter: "blur(16px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power4.inOut",
            onComplete: () => {
              // Fade out the overlay cleanly to reveal the start of Selected Projects
              if (overlayRef.current) {
                gsap.to(overlayRef.current, {
                  opacity: 0,
                  duration: 0.4,
                  ease: "power2.out",
                  onComplete: () => {
                    setIsTransitioning(false);
                  },
                });
              } else {
                setIsTransitioning(false);
              }
            },
          }
        );
      }
    });
  };

  const active = isExpanded || isHovered;

  return (
    <>
      <span
        className="inline-flex items-center align-middle relative cursor-pointer select-none group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleMediaClick}
        role="button"
        tabIndex={0}
        aria-label="Click to jump to Selected Projects"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleMediaClick();
          }
        }}
      >
        <motion.span
          initial={{ width: 0, opacity: 0, scale: 0.8, marginLeft: 0, marginRight: 0 }}
          animate={
            active
              ? {
                  width: "2.4em",
                  opacity: 1,
                  scale: 1,
                  marginLeft: "0.25em",
                  marginRight: "0.25em",
                  transition: { duration: 0.45, type: "spring", bounce: 0.15 },
                }
              : {
                  width: 0,
                  opacity: 0,
                  scale: 0.8,
                  marginLeft: 0,
                  marginRight: 0,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }
          }
          className={cn(
            "h-[1.15em] overflow-hidden align-middle shrink-0 inline-flex items-center justify-center rounded-[4px] sm:rounded-[6px] relative shadow-xs transition-transform duration-300 group-hover:scale-105",
            className
          )}
        >
          {mediaType === "image" ? (
            <img
              ref={inlineImgRef}
              src={mediaUrl}
              alt={alt}
              loading="eager"
              className="w-full h-full object-cover rounded-[inherit] pointer-events-none block"
            />
          ) : (
            <video
              src={mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-[inherit] pointer-events-none block"
            />
          )}
        </motion.span>
      </span>

      {/* Full-bleed Rect Mask Reveal Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-black/85 backdrop-blur-xs"
          >
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
              <img
                ref={maskImgRef}
                src={mediaUrl}
                alt="Selected Projects Reveal"
                className="w-full h-full object-cover"
                style={{
                  clipPath: "inset(48% 48% 48% 48% round 16px)",
                  transform: "scale(1.35)",
                  filter: "blur(16px)",
                }}
              />
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default InlineMediaBetween;

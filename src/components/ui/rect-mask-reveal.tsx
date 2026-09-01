"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface RectMaskRevealProps {
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  autoPlay?: boolean;
  duration?: number;
  ease?: string;
  borderRadius?: number | string;
  blur?: number;
  initialScale?: number;
  onRevealComplete?: () => void;
  onClick?: () => void;
}

export const RectMaskReveal: React.FC<RectMaskRevealProps> = ({
  src = "/home/biotopia-case-cover-page-1.webp",
  alt = "reveal",
  className,
  imageClassName,
  autoPlay = true,
  duration = 1.2,
  ease = "power4.inOut",
  borderRadius = "12px",
  blur = 16,
  initialScale = 1.4,
  onRevealComplete,
  onClick,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const reveal = () => {
    if (!imgRef.current) return;
    gsap.killTweensOf(imgRef.current);
    gsap.fromTo(
      imgRef.current,
      {
        clipPath: `inset(50% 50% 50% 50% round ${borderRadius})`,
        scale: initialScale,
        filter: `blur(${blur}px)`,
      },
      {
        clipPath: `inset(0% 0% 0% 0% round ${borderRadius})`,
        scale: 1,
        filter: "blur(0px)",
        duration,
        ease,
        onComplete: onRevealComplete,
      }
    );
  };

  useEffect(() => {
    if (autoPlay) {
      reveal();
    }
  }, [autoPlay]);

  return (
    <div
      onClick={() => {
        reveal();
        onClick?.();
      }}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl",
        className
      )}
      aria-label="Rect mask reveal"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn("size-full object-cover", imageClassName)}
        style={{
          clipPath: `inset(50% 50% 50% 50% round ${borderRadius})`,
          transform: `scale(${initialScale})`,
          filter: `blur(${blur}px)`,
        }}
      />
    </div>
  );
};

export default RectMaskReveal;

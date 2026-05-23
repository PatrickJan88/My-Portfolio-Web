"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "./canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#3E57FF",
  className,
  borderOnly = false,
  ...props
}: {
  radius?: number;
  color?: string;
  borderOnly?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) {
      if (!isHovering) {
        setIsHovering(true);
        // Set coordinates to center of the element roughly or from touch
        const touch = e.touches[0];
        let { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        mouseX.set(width / 2);
        mouseY.set(height / 2);
      } else {
        setIsHovering(false);
      }
    }
  };

  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      {...props}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute z-0 -inset-px rounded-[inherit] transition duration-300 overflow-hidden",
          isHovering ? "opacity-100" : "opacity-0 group-hover/spotlight:opacity-100"
        )}
        style={{
          backgroundColor: borderOnly ? "transparent" : color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {borderOnly ? (
          <div className="absolute inset-0 rounded-[inherit] border-[1.5px] border-transparent [mask-composite:exclude] [-webkit-mask-composite:xor] [mask:linear-gradient(white_0_0)_padding-box,linear-gradient(white_0_0)] [-webkit-mask:linear-gradient(white_0_0)_padding-box,linear-gradient(white_0_0)]">
             <div className="absolute inset-[-100%]" style={{ backgroundColor: color }} />
             {isHovering && (
               <CanvasRevealEffect
                 animationSpeed={5}
                 containerClassName="bg-transparent absolute inset-0 pointer-events-none"
                 colors={[
                   [59, 130, 246],
                   [139, 92, 246],
                 ]}
                 dotSize={3}
                 showGradient={false}
               />
             )}
          </div>
        ) : (
          isHovering && (
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent absolute inset-0 pointer-events-none"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              dotSize={3}
            />
          )
        )}
      </motion.div>
      {children}
    </div>
  );
};

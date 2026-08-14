import { cn } from "@/lib/utils";
import React from "react";

export interface AnimatedCircularProgressBarProps {
  max?: number;
  min?: number;
  value: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
}

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
}: AnimatedCircularProgressBarProps) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = ((value - min) / (max - min)) * 100;

  return (
    <div
      className={cn(
        "relative size-40 text-2xl font-semibold",
        className
      )}
      style={
        {
          "--circle-size": "100px",
          "--circumference": circumference,
          "--percent-to-px": `${percentPx}px`,
          "--gap-percent": "5",
          "--offset-factor": "0",
          "--transition-length": "1s",
          "--transition-step": "200ms",
          "--delay": "0s",
          "--percent-to-deg": "3.6deg",
          transform: "translateZ(0)",
        } as React.CSSProperties
      }
    >
      <svg
        fill="none"
        className="size-full"
        strokeWidth="2"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-100"
          style={
            {
              stroke: gaugeSecondaryColor,
              "--stroke-percent": 90,
              strokeDasharray: `calc(${circumference}px)`,
              transformOrigin: "50px 50px",
            } as React.CSSProperties
          }
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset={`calc(${circumference}px - (${currentPercent} * ${percentPx}px))`}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-100 transition-all duration-500 ease-in-out"
          style={
            {
              stroke: gaugePrimaryColor,
              strokeDasharray: `${circumference}px`,
              transformOrigin: "50px 50px",
              transform: "rotate(-90deg)",
            } as React.CSSProperties
          }
        />
      </svg>
      <span className="absolute inset-0 m-auto flex items-center justify-center animate-in fade-in text-neutral-900">
        {Math.round(currentPercent)}
      </span>
    </div>
  );
}

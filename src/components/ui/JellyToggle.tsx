"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, MotionValue } from "motion/react";

export interface JellyToggleProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Knob color on the left / Off state (default: #FF7523 orange) */
  offKnobColor?: string;
  /** Knob color on the right / On state (default: #2F5BF9 blue) */
  onKnobColor?: string;
  /** Background track color */
  trackBackground?: string;
  /** Track border color */
  trackBorderColor?: string;
  /** Track border width */
  trackBorderWidth?: string;
  size?: "sm" | "md" | "lg" | "inline";
  className?: string;
  ariaLabel?: string;
  /** Optional scroll progress value to auto slide from left to right */
  progress?: MotionValue<number>;
  /** The scroll progress range [start, end] when this toggle reveals */
  range?: [number, number];
}

/**
 * Jelly Toggle — Match Framer Canvas Transition Settings
 *
 * Framer Transition Settings:
 * - Type: Spring
 * - Based On: Time
 * - Time: 0.8s
 * - Bounce: 0.6
 * - Delay: 0s
 */
export function JellyToggle({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  offKnobColor = "#FF7523",
  onKnobColor = "#2F5BF9",
  trackBackground = "rgba(207, 207, 207, 0.15)",
  trackBorderColor = "rgba(255, 255, 255, 0.1)",
  trackBorderWidth = "1px",
  size = "inline",
  className = "",
  ariaLabel = "Toggle alternative mode",
  progress,
  range,
}: JellyToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;
  const hasAutoTriggeredRef = useRef(false);

  // Auto trigger when scrolled into view
  useEffect(() => {
    if (!progress || !range) return;

    const unsubscribe = progress.on("change", (v) => {
      const [start, end] = range;
      const threshold = start + (end - start) * 0.4;
      if (v >= threshold && !hasAutoTriggeredRef.current) {
        hasAutoTriggeredRef.current = true;
        setInternalChecked(true);
        onChange?.(true);
      } else if (v < start * 0.8 && hasAutoTriggeredRef.current) {
        hasAutoTriggeredRef.current = false;
        setInternalChecked(false);
        onChange?.(false);
      }
    });

    return () => unsubscribe();
  }, [progress, range, onChange]);

  const handleToggle = () => {
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  // Dimensions based on size. "inline" mode matches the surrounding text's `em` scale.
  const sizeStyles = {
    inline: {
      width: "2.1em",
      height: "1.1em",
      padding: "0.12em",
      knobSize: "0.86em",
      travelDistance: "1.0em",
    },
    sm: {
      width: "48px",
      height: "26px",
      padding: "3px",
      knobSize: "20px",
      travelDistance: "22px",
    },
    md: {
      width: "70px",
      height: "36px",
      padding: "4px",
      knobSize: "28px",
      travelDistance: "34px",
    },
    lg: {
      width: "84px",
      height: "44px",
      padding: "5px",
      knobSize: "34px",
      travelDistance: "40px",
    },
  }[size];

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className={`relative inline-flex items-center rounded-[50px] cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 align-middle mx-1.5 ${className}`}
      style={{
        width: sizeStyles.width,
        height: sizeStyles.height,
        padding: sizeStyles.padding,
        backgroundColor: trackBackground,
        borderWidth: trackBorderWidth,
        borderColor: trackBorderColor,
        borderStyle: "solid",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
        verticalAlign: "middle",
      }}
    >
      {/* Knob with Exact Framer Spring Physics (duration: 0.8s, bounce: 0.6) */}
      <motion.span
        className="block rounded-[100px] will-change-transform"
        style={{
          width: sizeStyles.knobSize,
          height: sizeStyles.knobSize,
          transformOrigin: isChecked ? "25% 50%" : "75% 50%",
          boxShadow: isChecked
            ? `0 1px 2px rgba(0,0,0,0.12), 0 1px 4px ${onKnobColor}30`
            : `0 1px 2px rgba(0,0,0,0.12), 0 1px 4px ${offKnobColor}30`,
        }}
        animate={{
          x: isChecked ? sizeStyles.travelDistance : "0em",
          backgroundColor: isChecked ? onKnobColor : offKnobColor,
          // Framer variant sequence: Circle -> Stretched Oblong Capsule (middle) -> Squashed impact -> Settled Circle
          scaleX: isChecked
            ? [1, 1.85, 0.65, 1.35, 0.85, 1.08, 0.98, 1]
            : [1, 1.85, 0.65, 1.35, 0.85, 1.08, 0.98, 1],
          scaleY: isChecked
            ? [1, 0.55, 1.45, 0.75, 1.15, 0.95, 1.02, 1]
            : [1, 0.55, 1.45, 0.75, 1.15, 0.95, 1.02, 1],
        }}
        transition={{
          x: {
            type: "spring",
            duration: 0.8,
            bounce: 0.6,
            delay: 0,
          },
          backgroundColor: {
            duration: 0.35,
            ease: "easeInOut",
          },
          scaleX: {
            duration: 0.8,
            ease: "easeOut",
            times: [0, 0.18, 0.42, 0.6, 0.74, 0.86, 0.94, 1],
          },
          scaleY: {
            duration: 0.8,
            ease: "easeOut",
            times: [0, 0.18, 0.42, 0.6, 0.74, 0.86, 0.94, 1],
          },
        }}
      />
    </motion.button>
  );
}

export default JellyToggle;

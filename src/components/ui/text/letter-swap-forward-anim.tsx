import { useState } from "react";
import { motion } from "motion/react";

interface LetterSwapForwardProps {
  label: string;
  reverse?: boolean;
  className?: string;
  staggerFrom?: "first" | "last" | "center";
}

export default function LetterSwapForward({
  label,
  reverse = false,
  className = "",
  staggerFrom = "first",
}: LetterSwapForwardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const letters = label.split("");

  const getStaggerDelay = (index: number) => {
    const total = letters.length;
    if (staggerFrom === "first") return index * 0.03;
    if (staggerFrom === "last") return (total - 1 - index) * 0.03;
    if (staggerFrom === "center") {
      const center = Math.floor(total / 2);
      return Math.abs(center - index) * 0.03;
    }
    return index * 0.03;
  };

  return (
    <motion.h1
      className={`relative inline-flex flex-wrap justify-center pointer-events-auto cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="hidden"
      animate="visible"
    >
      <span className="sr-only">{label}</span>
      {letters.map((letter, i) => {
        const delay = getStaggerDelay(i);
        return (
          <motion.span
            key={i}
            className="relative overflow-hidden inline-flex justify-center items-center -m-[0.1em]"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: -8, 
                transition: { 
                  duration: 1, 
                  ease: [0.215, 0.61, 0.355, 1], // power3.out equivalent
                  delay: i * 0.05 
                } 
              }
            }}
          >
            {/* Original Letter */}
            <motion.span
              className="inline-flex justify-center items-center p-[0.1em]"
              animate={
                isHovered
                  ? { y: reverse ? "100%" : "-100%" }
                  : { y: "0%" }
              }
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: delay,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
            
            {/* Duplicate Letter for Hover Swap */}
            <motion.span
              className="absolute inset-0 inline-flex justify-center items-center p-[0.1em]"
              initial={{ y: reverse ? "-100%" : "100%" }}
              animate={
                isHovered
                  ? { y: "0%" }
                  : { y: reverse ? "-100%" : "100%" }
              }
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: delay,
              }}
              aria-hidden="true"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </motion.span>
        );
      })}
    </motion.h1>
  );
}

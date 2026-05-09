import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends Omit<HTMLMotionProps<"button">, "onDragStart" | "onDragEnd" | "onDrag" | "ref"> {
  children: ReactNode;
  className?: string;
}

export function SecondaryButton({ children, className, ...props }: SecondaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "px-8 py-3.5 glass-panel-light text-neutral-900 rounded-xl font-medium hover:bg-white/80 shadow-sm flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

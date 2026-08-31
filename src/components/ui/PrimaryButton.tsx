import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends Omit<HTMLMotionProps<"button">, "onDragStart" | "onDragEnd" | "onDrag" | "ref"> {
  children: ReactNode;
  className?: string;
}

export function PrimaryButton({ children, className, ...props }: PrimaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "px-8 py-3.5 bg-ink-black text-white rounded-xl font-medium shadow-lg shadow-ink-black/10 hover:shadow-ink-black/20 flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

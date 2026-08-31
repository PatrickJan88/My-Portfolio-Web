import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "dark" | "light";
  className?: string;
}

export function GlassCard({ children, className, variant = "light", ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl md:rounded-[2rem] p-6 shadow-sm",
        variant === "dark" ? "glass-panel-dark text-white" : "glass-panel-light text-ink-black",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

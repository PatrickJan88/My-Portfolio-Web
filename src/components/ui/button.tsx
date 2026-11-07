import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-xl text-xs select-none",
          variant === "default" && "bg-white text-black hover:bg-neutral-200 active:scale-[0.98]",
          variant === "outline" && "border border-white/20 bg-transparent text-white hover:bg-white/10 active:scale-[0.98]",
          variant === "secondary" && "bg-neutral-800 text-white hover:bg-neutral-700 active:scale-[0.98]",
          variant === "ghost" && "hover:bg-white/10 text-white",
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-10 px-5 text-sm",
          size === "icon" && "h-9 w-9 p-0",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

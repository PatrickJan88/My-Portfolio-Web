"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

interface MorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
}

const MorphButton = React.forwardRef<HTMLButtonElement, MorphButtonProps>(
  (
    {
      className,
      variant = "outline",
      size = "default",
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    useGSAP(
      () => {
        const start = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
        const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

        const tl = gsap.timeline({ paused: true });

        tl.fromTo(".path", {
          attr: { d: start },
        }, {
          attr: { d: end },
          ease: "power2.inOut",
          duration: 0.3
        });

        const tl2 = gsap.timeline({ paused: true });
        tl2.fromTo(".icon-container", 
          { color: "#000000" }, 
          {
            color: "#ffffff",
            duration: 0.3,
            scale: 1.05,
            ease: "power2.inOut",
          }
        );
        if (!buttonRef.current) return;

        const onEnter = () => {
          tl.play();
          tl2.play();
        };
        const onLeave = () => {
          tl.reverse();
          tl2.reverse();
        };

        buttonRef.current.addEventListener("mouseenter", onEnter);
        buttonRef.current.addEventListener("mouseleave", onLeave);

        return () => {
          buttonRef.current?.removeEventListener("mouseenter", onEnter);
          buttonRef.current?.removeEventListener("mouseleave", onLeave);
        };
      },
      { scope: buttonRef }
    );
    return (
      <button
        ref={buttonRef}
        disabled={disabled}
        className={cn(
          "relative button cursor-pointer overflow-hidden bg-neutral-100 hover:bg-neutral-100 w-10 h-10 rounded-full flex items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 pointer-events-none">
          <svg
            style={{
              width: "100%",
              height: "100%",
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="transition"
          >
            <path
              className="path"
              fill="#000000"
              strokeWidth="0px"
              vectorEffect="non-scaling-stroke"
              d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
            />
          </svg>
        </div>
        <div className="z-40 scale-100 icon-container flex items-center justify-center text-black">
          {children}
        </div>
      </button>
    );
  }
);

MorphButton.displayName = "MorphButton";

export default MorphButton;

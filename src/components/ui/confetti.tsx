"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import canvasConfetti from "canvas-confetti";

export interface ConfettiRef {
  fire: (options?: canvasConfetti.Options) => void;
}

interface ConfettiProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  options?: canvasConfetti.Options;
  globalOptions?: canvasConfetti.GlobalOptions;
}

export const Confetti = forwardRef<ConfettiRef, ConfettiProps>(
  ({ className, options, globalOptions, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const confettiInstanceRef = useRef<canvasConfetti.CreateTypes | null>(null);

    useEffect(() => {
      if (canvasRef.current) {
        confettiInstanceRef.current = canvasConfetti.create(canvasRef.current, {
          resize: true,
          useWorker: true,
          ...globalOptions,
        });
      }
      return () => {
        if (confettiInstanceRef.current) {
          confettiInstanceRef.current.reset();
        }
      };
    }, [globalOptions]);

    useImperativeHandle(ref, () => ({
      fire: (opts?: canvasConfetti.Options) => {
        if (confettiInstanceRef.current) {
          confettiInstanceRef.current({ ...options, ...opts });
        }
      },
    }));

    return <canvas ref={canvasRef} className={className} {...props} />;
  }
);

Confetti.displayName = "Confetti";

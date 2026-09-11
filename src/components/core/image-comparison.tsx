import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, SpringOptions, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface ImageComparisonContextType {
  springPosition: MotionValue<number>;
  motionPosition: MotionValue<number>;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  updatePosition: (clientX: number) => void;
}

const ImageComparisonContext = createContext<ImageComparisonContextType | null>(null);

function useImageComparison() {
  const context = useContext(ImageComparisonContext);
  if (!context) {
    throw new Error('useImageComparison must be used within an ImageComparison component');
  }
  return context;
}

export interface ImageComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

export function ImageComparison({
  children,
  className,
  enableHover = false,
  springOptions = { bounce: 0, duration: 0.1 },
  defaultValue = 50,
  onValueChange,
  ...props
}: ImageComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const motionPosition = useMotionValue(defaultValue);
  const springPosition = useSpring(motionPosition, springOptions);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width === 0) return;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      motionPosition.set(percentage);
      if (onValueChange) {
        onValueChange(percentage);
      }
    },
    [motionPosition, onValueChange]
  );

  useEffect(() => {
    motionPosition.set(defaultValue);
  }, [defaultValue, motionPosition]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if capture unsupported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging || enableHover) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const current = motionPosition.get();
    if (e.key === 'ArrowLeft') {
      const next = Math.max(0, current - 5);
      motionPosition.set(next);
      onValueChange?.(next);
    } else if (e.key === 'ArrowRight') {
      const next = Math.min(100, current + 5);
      motionPosition.set(next);
      onValueChange?.(next);
    }
  };

  return (
    <ImageComparisonContext.Provider
      value={{
        springPosition,
        motionPosition,
        isDragging,
        setIsDragging,
        updatePosition,
      }}
    >
      <div
        ref={containerRef}
        role="slider"
        aria-valuenow={defaultValue}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={cn(
          'relative select-none overflow-hidden touch-none cursor-ew-resize',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

export interface ImageComparisonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  position: 'left' | 'right' | 'front' | 'back';
  className?: string;
}

export function ImageComparisonImage({
  src,
  alt = 'Comparison Image',
  position,
  className,
  ...props
}: ImageComparisonImageProps) {
  const { springPosition } = useImageComparison();

  const clipPath = useTransform(springPosition, (val) => {
    if (position === 'left' || position === 'front') {
      return `inset(0 ${100 - val}% 0 0)`;
    }
    if (position === 'right') {
      return `inset(0 0 0 ${val}%)`;
    }
    // position === 'back' is the full background layer
    return 'inset(0 0 0 0)';
  });

  return (
    <motion.div
      style={{ clipPath }}
      className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none select-none"
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          'h-full w-full object-cover object-center pointer-events-none select-none block max-w-none',
          className
        )}
        draggable={false}
        {...props}
      />
    </motion.div>
  );
}

export interface ImageComparisonSliderProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  className?: string;
}

export function ImageComparisonSlider({
  children,
  className,
  ...props
}: ImageComparisonSliderProps) {
  const { springPosition } = useImageComparison();
  const left = useTransform(springPosition, (val) => `${val}%`);

  return (
    <motion.div
      style={{ left }}
      className={cn(
        'absolute top-0 bottom-0 -translate-x-1/2 pointer-events-auto cursor-ew-resize z-20 select-none touch-none',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ImageComparisonCustomSlider({
  leftSrc,
  rightSrc,
  frontSrc,
  backSrc,
  leftAlt,
  rightAlt,
  frontAlt,
  backAlt,
  aspectRatio = 'aspect-[4/3]',
  className,
}: {
  leftSrc?: string;
  rightSrc?: string;
  frontSrc?: string;
  backSrc?: string;
  leftAlt?: string;
  rightAlt?: string;
  frontAlt?: string;
  backAlt?: string;
  aspectRatio?: string;
  className?: string;
} = {}) {
  const resolvedBackSrc = backSrc || rightSrc || '/projects/ears/Comparing Image Landing Page New.webp';
  const resolvedFrontSrc = frontSrc || leftSrc || '/projects/ears/Comparing Image Landing Page.webp';
  const resolvedBackAlt = backAlt || rightAlt || 'Comparing Image Landing Page New';
  const resolvedFrontAlt = frontAlt || leftAlt || 'Comparing Image Landing Page';

  return (
    <ImageComparison className={cn(aspectRatio, 'w-full rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800/60 bg-[#101014]', className)}>
      <ImageComparisonImage
        src={resolvedBackSrc}
        alt={resolvedBackAlt}
        position='back'
      />
      <ImageComparisonImage
        src={resolvedFrontSrc}
        alt={resolvedFrontAlt}
        position='front'
      />
      <ImageComparisonSlider className='w-2 bg-white/50 backdrop-blur-xs transition-colors hover:bg-white/80'>
        <div className='absolute left-1/2 top-1/2 h-8 w-6 -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-white shadow-md flex items-center justify-center'>
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-zinc-400 rounded-full" />
            <div className="w-0.5 h-3 bg-zinc-400 rounded-full" />
          </div>
        </div>
      </ImageComparisonSlider>
    </ImageComparison>
  );
}

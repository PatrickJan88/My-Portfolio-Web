"use client"

import { ElementType, forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react"
import { motion, useInView, UseInViewOptions, Variants, MotionValue } from "motion/react"
import { cn } from "@/lib/utils"

export interface MediaBetweenTextProps {
  /**
   * The text to display before the media
   */
  firstText?: string

  /**
   * The text to display after the media
   */
  secondText?: string

  /**
   * URL of the media (image or video) to display
   */
  mediaUrl: string

  /**
   * Type of media to display
   */
  mediaType?: "image" | "video"

  /**
   * Optional class name for the media container
   */
  mediaContainerClassName?: string

  /**
   * Fallback URL for video poster or image loading
   */
  fallbackUrl?: string

  /**
   * HTML Tag to render the text elements as
   * @default span
   */
  as?: ElementType

  /**
   * Whether video should autoplay
   * @default true
   */
  autoPlay?: boolean

  /**
   * Whether video should loop
   * @default true
   */
  loop?: boolean

  /**
   * Whether video should be muted
   * @default true
   */
  muted?: boolean

  /**
   * Whether video should play inline
   * @default true
   */
  playsInline?: boolean

  /**
   * Alt text for image
   */
  alt?: string

  /**
   * Type of animation trigger
   * @default "hover"
   */
  triggerType?: "hover" | "ref" | "inView" | "scroll"

  /**
   * Reference to container element for inView trigger
   */
  containerRef?: React.RefObject<HTMLDivElement | null>

  /**
   * Options for useInView hook
   */
  useInViewOptionsProp?: UseInViewOptions

  /**
   * Custom animation variants
   */
  animationVariants?: {
    initial?: Variants["initial"]
    animate?: Variants["animate"]
  }

  /**
   * Optional class name for the root element
   */
  className?: string

  /**
   * Optional class name for the left text element
   */
  leftTextClassName?: string

  /**
   * Optional class name for the right text element
   */
  rightTextClassName?: string

  /**
   * Scroll progress MotionValue
   */
  scrollProgress?: MotionValue<number>

  /**
   * Scroll threshold to expand
   */
  expandThreshold?: number
}

export type MediaBetweenTextRef = {
  animate: () => void
  reset: () => void
}

export const MediaBetweenText = forwardRef<
  MediaBetweenTextRef,
  MediaBetweenTextProps
>(
  (
    {
      firstText = "",
      secondText = "",
      mediaUrl,
      mediaType = "image",
      mediaContainerClassName,
      fallbackUrl,
      as = "span",
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
      alt,
      triggerType = "hover",
      containerRef,
      useInViewOptionsProp = {
        once: false,
        amount: 0.3,
        root: containerRef,
      },
      animationVariants,
      className,
      leftTextClassName,
      rightTextClassName,
      scrollProgress,
      expandThreshold = 0.8,
    },
    ref
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isScrollActive, setIsScrollActive] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const isInView = useInView(componentRef, useInViewOptionsProp)

    useEffect(() => {
      if (!scrollProgress) return
      const unsub = scrollProgress.on("change", (v) => {
        setIsScrollActive(v >= expandThreshold)
      })
      return () => unsub()
    }, [scrollProgress, expandThreshold])

    useImperativeHandle(ref, () => ({
      animate: () => setIsAnimating(true),
      reset: () => setIsAnimating(false),
    }))

    const shouldAnimate =
      triggerType === "hover"
        ? isHovered
        : triggerType === "inView"
          ? isInView
          : triggerType === "scroll"
            ? (isScrollActive || isInView)
            : triggerType === "ref"
              ? isAnimating
              : false

    const TextComponent = motion.create(as)

    const defaultVariants: Variants = {
      initial: {
        width: 0,
        opacity: 0,
        scale: 0.8,
      },
      animate: {
        width: "2.4em",
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, type: "spring", bounce: 0.15 },
      },
    }

    const activeVariants: Variants = (animationVariants as Variants) || defaultVariants

    return (
      <span
        className={cn("inline-flex items-center align-middle relative", className)}
        ref={componentRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {firstText ? (
          <TextComponent layout className={cn("inline-block", leftTextClassName)}>
            {firstText}
          </TextComponent>
        ) : null}

        <motion.span
          className={cn(
            "overflow-hidden align-middle shrink-0 inline-flex items-center justify-center rounded-[4px] sm:rounded-[6px]",
            mediaContainerClassName
          )}
          variants={activeVariants}
          initial="initial"
          animate={shouldAnimate ? "animate" : "initial"}
        >
          {mediaType === "video" ? (
            <video
              className="w-full h-full object-cover"
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              playsInline={playsInline}
              poster={fallbackUrl}
            >
              <source src={mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={mediaUrl}
              alt={alt || `${firstText} ${secondText}`}
              className="w-full h-full object-cover rounded-[inherit] pointer-events-none block"
            />
          )}
        </motion.span>

        {secondText ? (
          <TextComponent layout className={cn("inline-block", rightTextClassName)}>
            {secondText}
          </TextComponent>
        ) : null}
      </span>
    )
  }
)

MediaBetweenText.displayName = "MediaBetweenText"

export default MediaBetweenText

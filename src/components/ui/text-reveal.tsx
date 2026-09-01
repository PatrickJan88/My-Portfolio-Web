import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { GradientText } from "./GradientText"

export interface HighlightRule {
  phrase: string
  color?: string
  isGradient?: boolean
  gradientColors?: string[]
  animationSpeed?: number
}

export interface CustomSlotRule {
  key: string
  component: ReactNode | ((props: { progress: MotionValue<number>; range: [number, number] }) => ReactNode)
}

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  highlights?: HighlightRule[]
  customSlots?: CustomSlotRule[]
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  highlights = [],
  customSlots = [],
  className,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 50%"],
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  // Find character spans for each highlight rule
  const spans: {
    start: number
    end: number
    color?: string
    isGradient?: boolean
    gradientColors?: string[]
    animationSpeed?: number
  }[] = []

  highlights.forEach(({ phrase, color, isGradient, gradientColors, animationSpeed }) => {
    if (!phrase) return
    let pos = 0
    const lowerChildren = children.toLowerCase()
    const lowerPhrase = phrase.toLowerCase()
    while (pos < children.length) {
      const idx = lowerChildren.indexOf(lowerPhrase, pos)
      if (idx === -1) break
      spans.push({
        start: idx,
        end: idx + phrase.length,
        color,
        isGradient,
        gradientColors,
        animationSpeed,
      })
      pos = idx + phrase.length
    }
  })

  // Tokenize words with their character positions
  interface WordToken {
    text: string
    color?: string
    isGradient?: boolean
    gradientColors?: string[]
    animationSpeed?: number
    customComponent?: ReactNode | ((props: { progress: MotionValue<number>; range: [number, number] }) => ReactNode)
    trailingPunctuation?: string
    isBreak?: boolean
  }

  const wordTokens: WordToken[] = []
  const wordRegex = /\S+/g
  let match: RegExpExecArray | null

  while ((match = wordRegex.exec(children)) !== null) {
    const wordText = match[0]
    const wordStart = match.index
    const wordEnd = wordStart + wordText.length

    // Check if this token is a line break
    if (wordText === "\n" || wordText === "<br/>") {
      wordTokens.push({
        text: "\n",
        isBreak: true,
      })
      continue
    }

    // Check if this token matches a custom slot
    const slot = customSlots.find(
      (s) => s.key === wordText || wordText.startsWith(s.key)
    )
    let customComponent = slot?.component
    let trailingPunctuation = ""
    if (slot && wordText.length > slot.key.length) {
      trailingPunctuation = wordText.slice(slot.key.length)
    }

    // Check if this word overlaps with any highlight span
    const matchingSpan = spans.find(
      (s) => wordStart < s.end && wordEnd > s.start
    )

    wordTokens.push({
      text: wordText,
      color: matchingSpan?.color,
      isGradient: matchingSpan?.isGradient,
      gradientColors: matchingSpan?.gradientColors,
      animationSpeed: matchingSpan?.animationSpeed,
      customComponent,
      trailingPunctuation,
    })
  }

  return (
    <div ref={sectionRef} className={cn("relative z-0 w-full", className)}>
      <div
        className={
          "mx-auto flex w-full max-w-[1440px] items-center justify-center bg-transparent px-4 sm:px-6 md:px-12 pt-12 md:pt-24 pb-4 md:pb-8"
        }
      >
        <span
          className={
            "flex flex-wrap justify-center items-center text-center py-5 text-xl font-mono font-medium leading-relaxed text-ink-black/20 md:py-8 md:text-2xl lg:py-10 lg:text-3xl xl:text-4xl dark:text-white/20 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%]"
          }
        >
          {wordTokens.map((token, i) => {
            if (token.isBreak) {
              return <span key={`br-${i}`} className="w-full block basis-full h-0" aria-hidden="true" />
            }
            const start = i / wordTokens.length
            const end = start + 1 / wordTokens.length
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                color={token.color}
                isGradient={token.isGradient}
                gradientColors={token.gradientColors}
                animationSpeed={token.animationSpeed}
                customComponent={token.customComponent}
                trailingPunctuation={token.trailingPunctuation}
              >
                {token.text}
              </Word>
            )
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
  color?: string
  isGradient?: boolean
  gradientColors?: string[]
  animationSpeed?: number
  customComponent?: ReactNode | ((props: { progress: MotionValue<number>; range: [number, number] }) => ReactNode)
  trailingPunctuation?: string
}

const Word: FC<WordProps> = ({
  children,
  progress,
  range,
  color,
  isGradient,
  gradientColors = ["#2F5BF9", "#FF7523"],
  animationSpeed = 8,
  customComponent,
  trailingPunctuation,
}) => {
  const opacity = useTransform(progress, range, [0, 1])

  if (customComponent) {
    const renderedSlot =
      typeof customComponent === "function"
        ? customComponent({ progress, range })
        : customComponent

    return (
      <span className="relative inline-flex items-center align-middle">
        {renderedSlot}
        {trailingPunctuation ? (
          <span className="relative inline-block ml-[1px]">
            {/* Ghost base punctuation */}
            <span className="absolute inset-0 opacity-30 select-none pointer-events-none text-ink-black/20 dark:text-white/20">
              {trailingPunctuation}
            </span>
            {/* Revealed dark/white font color punctuation */}
            <motion.span
              style={{ opacity }}
              className="text-ink-black dark:text-white font-inherit font-bold"
            >
              {trailingPunctuation}
            </motion.span>
          </span>
        ) : null}
      </span>
    )
  }

  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5 inline-block">
      {/* Ghost unrevealed base with identical metrics and spacing */}
      <span className="absolute inset-0 opacity-30 select-none pointer-events-none text-ink-black/20 dark:text-white/20 flex items-center justify-center">
        {children}
      </span>

      {/* Revealed foreground */}
      <motion.span
        style={{ opacity }}
        className={cn(
          "inline-block",
          !isGradient && !color && "text-ink-black dark:text-white"
        )}
      >
        {isGradient ? (
          <GradientText
            colors={gradientColors}
            animationSpeed={animationSpeed}
            direction="horizontal"
            showBorder={false}
            className="inline-flex items-center justify-center p-0 m-0"
          >
            {children}
          </GradientText>
        ) : (
          <span style={color ? { color } : undefined}>{children}</span>
        )}
      </motion.span>
    </span>
  )
}

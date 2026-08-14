import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 50%"],
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 w-full", className)}>
      <div
        className={
          "mx-auto flex w-full max-w-[1440px] items-center justify-center bg-transparent px-4 sm:px-6 md:px-12 pt-12 md:pt-24 pb-4 md:pb-8"
        }
      >
        <span
          className={
            "flex flex-wrap justify-center text-center py-5 text-xl font-mono font-medium leading-relaxed text-black/20 md:py-8 md:text-2xl lg:py-10 lg:text-3xl xl:text-4xl dark:text-white/20 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%]"
          }
        >
          {words.map((word, i) => {
            if (word === "\n") {
              return <div key={i} className="w-full" />
            }
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
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
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  )
}

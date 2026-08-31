"use client";

import * as React from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

export type FontStyle = React.CSSProperties;

export type TransitionValue = {
  type?: string;
  duration?: number;
  delay?: number;
  ease?: string | number[];
  staggerChildren?: number;
};

export type StaggerFrom = "first" | "last" | "center" | "random";
export type SplitBy = "characters" | "words" | "lines";

export type WordPart = {
  characters: string[];
  needsSpace: boolean;
};

export type TextCarouselProps = {
  prefix?: string;
  texts?: string[];
  font?: FontStyle;
  color?: string;
  prefixColor?: string;
  badgeBackground?: string;
  badgeBorder?: string;
  badgePaddingX?: number;
  badgePaddingY?: number;
  badgeRadius?: number;
  gap?: number;

  splitBy?: SplitBy;
  staggerFrom?: StaggerFrom;

  auto?: boolean;
  interval?: number;

  transition?: TransitionValue;
  className?: string;
  style?: React.CSSProperties;
  inline?: boolean;
  fixedWidth?: number | string;
};

const ROTATION_INTERVAL_MS = 2400;

const mapEase = (ease: TransitionValue["ease"]): string => {
  if (typeof ease !== "string") return "power2.out";

  const easeMap: Record<string, string> = {
    linear: "none",
    easeIn: "power2.in",
    easeOut: "power2.out",
    easeInOut: "power2.inOut",
    circIn: "circ.in",
    circOut: "circ.out",
    circInOut: "circ.inOut",
    backIn: "back.in",
    backOut: "back.out(1.7)",
    backInOut: "back.inOut",
    anticipate: "back.out(1.7)",
  };

  return easeMap[ease] ?? ease;
};

const mapStaggerFrom = (
  staggerFrom: StaggerFrom
): "start" | "end" | "center" | "random" => {
  if (staggerFrom === "first") return "start";
  if (staggerFrom === "last") return "end";
  return staggerFrom;
};

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (part) => part.segment);
  }
  return Array.from(text);
};

const buildElements = (text: string, splitBy: SplitBy): WordPart[] => {
  if (splitBy === "characters") {
    const words = text.split(" ");
    return words.map((word, i) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== words.length - 1,
    }));
  }

  if (splitBy === "words") {
    return text.split(" ").map((word, i, arr) => ({
      characters: [word],
      needsSpace: i !== arr.length - 1,
    }));
  }

  return text.split("\n").map((line, i, arr) => ({
    characters: [line],
    needsSpace: i !== arr.length - 1,
  }));
};

export function TextCarousel({
  prefix,
  texts = ["design", "aesthetics", "technology", "business"],
  font = {
    fontFamily: 'var(--font-sans, "TraditionalAmpersand", "Stack Sans Text", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    fontSize: "inherit",
    fontWeight: 700,
    lineHeight: "inherit",
    letterSpacing: "-0.01em",
  },
  color = "#ffffff",
  prefixColor = "#E8E8E8",
  badgeBackground = "#FF7523",
  badgeBorder,
  badgePaddingX = 16,
  badgePaddingY = 4,
  badgeRadius = 8,
  gap = 8,

  splitBy = "characters",
  staggerFrom = "first",

  auto = true,
  interval = ROTATION_INTERVAL_MS,

  transition = {
    type: "tween",
    duration: 0.45,
    delay: 0,
    ease: "easeOut",
    staggerChildren: 0.03,
  },
  className = "",
  style = {},
  inline = true,
  fixedWidth,
}: TextCarouselProps) {
  const safeTexts =
    texts && texts.length > 0
      ? texts
      : ["design", "aesthetics", "technology", "business"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const contentRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const isAnimating = useRef(false);
  const isFirstRender = useRef(true);
  const hasSizedBadge = useRef(false);

  const elements = useMemo(
    () => buildElements(safeTexts[currentTextIndex] ?? "", splitBy),
    [safeTexts, currentTextIndex, splitBy]
  );

  useEffect(() => {
    if (currentTextIndex > safeTexts.length - 1) {
      setCurrentTextIndex(0);
    }
  }, [safeTexts.length, currentTextIndex]);

  useEffect(() => {
    if (!auto || safeTexts.length <= 1) return;

    const getNextIndex = (index: number) => {
      if (index >= safeTexts.length - 1) return 0;
      return index + 1;
    };

    const intervalId = window.setInterval(() => {
      if (isAnimating.current) return;

      const content = contentRef.current;
      if (!content) return;

      const chars = content.querySelectorAll(".char");
      if (chars.length === 0) {
        setCurrentTextIndex((index) => getNextIndex(index));
        return;
      }

      const duration = transition.duration ?? 0.45;
      const staggerEach = transition.staggerChildren ?? 0.03;
      const ease = mapEase(transition.ease);

      isAnimating.current = true;
      gsap.killTweensOf(chars);

      gsap.to(chars, {
        yPercent: -120,
        opacity: 0,
        duration,
        stagger: {
          each: staggerEach,
          from: mapStaggerFrom(staggerFrom),
        },
        ease,
        onComplete: () => {
          setCurrentTextIndex((index) => getNextIndex(index));
        },
      });
    }, interval);

    return () => window.clearInterval(intervalId);
  }, [auto, safeTexts.length, staggerFrom, transition, interval]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const chars = content.querySelectorAll(".char");
    if (chars.length === 0) {
      isAnimating.current = false;
      return;
    }

    gsap.killTweensOf(chars);

    const duration = transition.duration ?? 0.45;
    const delay = isFirstRender.current ? (transition.delay ?? 0) : 0;
    const staggerEach = transition.staggerChildren ?? 0.03;
    const ease = mapEase(transition.ease);

    isFirstRender.current = false;
    isAnimating.current = true;

    gsap.fromTo(
      chars,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        stagger: {
          each: staggerEach,
          from: mapStaggerFrom(staggerFrom),
        },
        ease,
        onComplete: () => {
          isAnimating.current = false;
        },
      }
    );

    return () => {
      gsap.killTweensOf(chars);
    };
  }, [currentTextIndex, elements, staggerFrom, transition]);

  useLayoutEffect(() => {
    if (fixedWidth) return;
    const badge = badgeRef.current;
    const content = contentRef.current;
    if (!badge || !content) return;

    const nextWidth = content.scrollWidth + badgePaddingX * 2;
    const duration = transition.duration ?? 0.45;
    const ease = mapEase(transition.ease);

    gsap.killTweensOf(badge);

    if (!hasSizedBadge.current) {
      hasSizedBadge.current = true;
      gsap.set(badge, { width: nextWidth });
      return;
    }

    gsap.to(badge, {
      width: nextWidth,
      duration,
      ease,
    });
  }, [currentTextIndex, elements, badgePaddingX, transition, fixedWidth]);

  const textAlign =
    (font.textAlign as React.CSSProperties["textAlign"]) ?? "left";
  const justifyContent =
    textAlign === "center"
      ? "center"
      : textAlign === "right" || textAlign === "end"
        ? "flex-end"
        : "flex-start";

  return (
    <span
      className={`select-none ${className}`}
      style={{
        ...font,
        display: inline ? "inline-flex" : "flex",
        width: inline ? "auto" : "100%",
        alignItems: "center",
        justifyContent,
        verticalAlign: "middle",
        flexWrap: "nowrap",
        gap,
        textAlign,
        ...style,
      }}
    >
      {prefix ? (
        <span style={{ color: prefixColor, whiteSpace: "pre" }}>
          {prefix}
        </span>
      ) : null}

      <span
        ref={badgeRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          verticalAlign: "middle",
          backgroundColor: badgeBackground,
          border: badgeBorder ? `1px solid ${badgeBorder}` : undefined,
          color,
          borderRadius: badgeRadius,
          paddingTop: badgePaddingY,
          paddingBottom: badgePaddingY,
          paddingLeft: badgePaddingX,
          paddingRight: badgePaddingX,
          boxSizing: "border-box",
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          width: fixedWidth,
          willChange: "width",
        }}
      >
        <span
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
        >
          {prefix ? `${prefix} ` : ""}
          {safeTexts[currentTextIndex]}
        </span>

        <span
          ref={contentRef}
          aria-hidden="true"
          style={{
            display: "inline-flex",
            flexWrap: splitBy === "lines" ? "nowrap" : "wrap",
            flexDirection: splitBy === "lines" ? "column" : "row",
            whiteSpace: "nowrap",
            position: "relative",
          }}
        >
          {elements.map((wordObj, wordIndex) => (
            <span
              key={`${currentTextIndex}-${wordIndex}`}
              style={{ display: "inline-flex" }}
            >
              {wordObj.characters.map((char, charIndex) => (
                <span
                  key={`${currentTextIndex}-${wordIndex}-${charIndex}`}
                  className="char"
                  style={{
                    display: "inline-block",
                    willChange: "transform, opacity",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              {wordObj.needsSpace ? (
                <span style={{ whiteSpace: "pre" }}> </span>
              ) : null}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}

export default TextCarousel;

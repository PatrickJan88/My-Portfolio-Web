// Shiny Pill — Originkit
// Originkit preset `custom-style` — props baked into the default export.
import type { CSSProperties, ReactNode } from "react";

export interface ShinyPillProps {
  text?: string;
  link?: string;
  textColor?: string;
  shineColor?: string;
  speed?: number;
  font?: CSSProperties;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

const KEYFRAMES_ID = "shiny-pill-keyframes";

/**
 * Animated Shiny Text
 *
 * A line of text with a sheen that sweeps left-to-right on a loop.
 */
export function ShinyPill(props: ShinyPillProps) {
  const {
    text = "Human-centered design",
    link,
    textColor = "#0D0D0D",
    shineColor = "#2F5BF9",
    speed = 2,
    font = {
      fontSize: "inherit",
      textAlign: "left",
      fontFamily: 'var(--font-sans, "TraditionalAmpersand", "Stack Sans Text", "Inter", sans-serif)',
      fontWeight: 700,
      lineHeight: "inherit",
      letterSpacing: "-0.01em",
    },
    style,
    className = "",
    children,
  } = props;

  const contentText = children ?? text;
  const isFixedWidth = style?.width === "100%";

  const shellStyle: CSSProperties = {
    ...style,
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    boxSizing: "border-box",
    ...(isFixedWidth ? {} : { minWidth: "max-content", width: "auto" }),
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    ...font,
  };

  const shineLayerStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    color: shineColor,
    pointerEvents: "none",
    WebkitMaskImage:
      "linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)",
    maskImage:
      "linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)",
    WebkitMaskSize: "150% auto",
    maskSize: "150% auto",
    animation: `shinyPillSweep ${speed}s ease-in-out infinite`,
  };

  const content = (
    <span style={shellStyle} className={`shiny-pill-wrap ${className}`}>
      <style
        id={KEYFRAMES_ID}
        dangerouslySetInnerHTML={{
          __html: `@keyframes shinyPillSweep {
            0% { -webkit-mask-position: 200%; mask-position: 200%; }
            100% { -webkit-mask-position: -100%; mask-position: -100%; }
          }`,
        }}
      />
      {/* Base layer — muted baseline color */}
      <span style={{ color: textColor }}>{contentText}</span>
      {/* Shine layer — bright copy masked by the sweeping gradient */}
      <span style={shineLayerStyle} aria-hidden="true">
        {contentText}
      </span>
    </span>
  );

  if (link) {
    return (
      <a
        href={link}
        style={{ textDecoration: "none", display: "inline-flex", verticalAlign: "baseline" }}
      >
        {content}
      </a>
    );
  }

  return content;
}

export default ShinyPill;

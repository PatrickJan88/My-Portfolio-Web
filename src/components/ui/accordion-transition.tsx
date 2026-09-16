"use client";

import React, { useState } from "react";

// ── Styles ──────────────────────────────────────────────
// Auto-injected on first import. Idempotent (guarded by
// the element id) and SSR-safe (no-ops without document).
const __TRANSITION_STYLES = `
:root {
  --acc-expand: 250ms;
  --acc-collapse: 250ms;
  --acc-chevron: 250ms;
  --acc-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

/* grid-template-rows 0fr → 1fr gives a clean height animation
   with no JS measurement; the inner element clips overflow. */
.t-acc-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--acc-collapse) var(--acc-ease);
}
.t-acc[data-open="true"] .t-acc-panel {
  grid-template-rows: 1fr;
  transition: grid-template-rows var(--acc-expand) var(--acc-ease);
}
.t-acc-panel-inner {
  overflow: hidden;
  opacity: 0;
  filter: blur(2px);
  transition:
    opacity var(--acc-collapse) var(--acc-ease),
    filter var(--acc-collapse) var(--acc-ease);
}
.t-acc[data-open="true"] .t-acc-panel-inner {
  opacity: 1;
  filter: blur(0);
  transition:
    opacity var(--acc-expand) var(--acc-ease),
    filter var(--acc-expand) var(--acc-ease);
}
/* Flip the chevron vertically to turn the "v" into a "^".
   scaleY(-1) about the centre passes through a flat line at
   the midpoint (same look as a "d:" path morph) but animates
   in every browser, unlike CSS "d:" morphing (Chromium only).
   The chevron path is symmetric about the 16x16 viewBox
   centre, so the flip lands exactly on the "^"; non-scaling
   -stroke keeps the stroke width constant through the flip. */
.t-acc-chevron {
  display: inline-flex;
  transform: scaleY(1);
  transform-origin: center;
  transition: transform var(--acc-chevron) var(--acc-ease);
}
.t-acc-chevron path { vector-effect: non-scaling-stroke; }
.t-acc[data-open="true"] .t-acc-chevron {
  transform: scaleY(-1);
}

@media (prefers-reduced-motion: reduce) {
  .t-acc-panel, .t-acc-panel-inner, .t-acc-chevron {
    transition: none !important;
  }
}
`;

if (typeof document !== "undefined" && !document.getElementById("transitions-p21")) {
  const __style = document.createElement("style");
  __style.id = "transitions-p21";
  __style.textContent = __TRANSITION_STYLES;
  document.head.appendChild(__style);
}

export interface AccordionProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  headerClassName?: string;
  chevronClassName?: string;
  disabled?: boolean;
}

// Pair with the CSS from the CSS tab.
// `data-open` toggles the grid-rows height animation and the chevron
// path morph — no height measuring needed.
export function Accordion({
  title,
  children,
  defaultOpen = false,
  isOpen: controlledOpen,
  onToggle,
  className = "",
  headerClassName = "",
  chevronClassName = "text-neutral-400",
  disabled = false,
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen((v) => !v);
    }
  };

  return (
    <div className={`t-acc ${className}`} data-open={open ? "true" : "false"}>
      <button
        type="button"
        disabled={disabled}
        className={`t-acc-head w-full flex items-center justify-between text-left select-none ${
          disabled ? "cursor-default" : "cursor-pointer"
        } ${headerClassName}`}
        aria-expanded={open ? "true" : "false"}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0 mr-1.5">{title}</div>
        <span className={`t-acc-chevron shrink-0 transition-colors ${chevronClassName}`} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6.5L8 10.5L12 6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {children ? (
        <div className="t-acc-panel">
          <div className="t-acc-panel-inner">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

export default Accordion;

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, FileCode } from "lucide-react";
import { SegmentedControl, SegmentedOption } from "../ui/segmented-control";

const TOGGLE_1 = "/projects/internal-design-manual/Toggle%201.1.webp";
const TOGGLE_2 = "/projects/internal-design-manual/Toggle%202.1.webp";

const TAB_OPTIONS: SegmentedOption[] = [
  { value: "toggle-01", label: "Toggle 01" },
  { value: "toggle-02", label: "Toggle 02" },
  { value: "react", label: "React" },
  { value: "css", label: "CSS" },
];

export const REACT_CODE = `import { useId, useState } from "react";
import {
  LockKeyhole,
  Bell,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import "./ToggleComponents.css";

// EARS Product Design System - Toggle Components

const LONG_LABEL =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry";

const toggleOptions = [
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
  {
    id: "long",
    label: "Lorem Ipsum is simply...",
    fullLabel: LONG_LABEL,
  },
  {
    id: "disabled",
    label: "Disabled",
    disabled: true,
  },
];

// Shared option label and tooltip
function OptionLabel({ option }) {
  return (
    <span
      className={\`toggle-label \${
        option.fullLabel ? "has-tooltip" : ""
      }\`}
      data-tooltip={option.fullLabel}
    >
      <span className="toggle-label-text">
        {option.label}
      </span>
    </span>
  );
}

// Shared selectable toggle group
function ToggleGroup({
  variant,
  label,
  options = toggleOptions,
}) {
  const [selected, setSelected] = useState(
    options.find((option) => !option.disabled)?.id
  );

  return (
    <div
      className={\`toggle-group toggle-group--\${variant}\`}
      role="group"
      aria-label={label}
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={\`toggle-option \${
            selected === option.id ? "is-active" : ""
          }\`}
          aria-pressed={selected === option.id}
          aria-label={option.fullLabel || option.label}
          disabled={option.disabled}
          onClick={() => setSelected(option.id)}
        >
          <OptionLabel option={option} />
        </button>
      ))}
    </div>
  );
}

// 01 - Radio Toggle

const radioOptions = [
  { id: "option1", label: "Option 1" },
  {
    id: "option2",
    label: "Lorem Ipsum...",
    fullLabel: LONG_LABEL,
  },
];

export function RadioToggle({
  disabled = false,
  label = "Radio toggle selection",
}) {
  const [selected, setSelected] = useState("option1");
  const groupName = useId();

  return (
    <fieldset
      className="radio-toggle"
      disabled={disabled}
    >
      <legend className="sr-only">{label}</legend>

      {radioOptions.map((option) => (
        <label
          key={option.id}
          className="radio-option"
        >
          <input
            type="radio"
            name={groupName}
            value={option.id}
            checked={selected === option.id}
            onChange={() => setSelected(option.id)}
            aria-label={option.fullLabel || option.label}
          />

          <OptionLabel option={option} />
        </label>
      ))}
    </fieldset>
  );
}

// 02 - Switch Button Toggle

export function SwitchButtonToggle() {
  return (
    <ToggleGroup
      variant="switch"
      label="Switch button selection"
    />
  );
}

// 03 - Text Toggle

export function TextToggle() {
  return (
    <ToggleGroup
      variant="text"
      label="Text toggle selection"
    />
  );
}

// 04 - Button Toggle

export function ButtonToggle() {
  return (
    <ToggleGroup
      variant="button"
      label="Button toggle selection"
    />
  );
}

// 05 - Sliding Underline

const underlineOptions = [
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
  {
    id: "long",
    label:
      "Iacus sed turpis tincidunt id aliquet risus feugiat...",
    fullLabel:
      "Iacus sed turpis tincidunt id aliquet risus feugiat in ante metus dictum tempor commodo ullamcorper a lacus vestibulum",
  },
  {
    id: "disabled",
    label: "Disabled",
    disabled: true,
  },
];

export function SlidingUnderline() {
  return (
    <ToggleGroup
      variant="underline"
      label="Underline toggle selection"
      options={underlineOptions}
    />
  );
}

// 06 - Left Tab Toggle with Icon

const settingsTabs = [
  {
    id: "security",
    label: "Security",
    icon: LockKeyhole,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "cache",
    label: "Clear Cache",
    icon: Trash2,
  },
  {
    id: "information",
    label: "Lorem Ipsum is simply dummy text of the...",
    fullLabel: LONG_LABEL,
    icon: ShieldCheck,
  },
];

export function LeftTabToggle() {
  const [selected, setSelected] = useState("security");
  const groupId = useId();

  const activeIndex = settingsTabs.findIndex(
    (tab) => tab.id === selected
  );

  function handleKeyDown(event) {
    let nextIndex = activeIndex;

    if (event.key === "ArrowDown") {
      nextIndex = (activeIndex + 1) % settingsTabs.length;
    } else if (event.key === "ArrowUp") {
      nextIndex =
        (activeIndex - 1 + settingsTabs.length) %
        settingsTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = settingsTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    const nextTab = settingsTabs[nextIndex];
    setSelected(nextTab.id);

    document
      .getElementById(\`\${groupId}-\${nextTab.id}\`)
      ?.focus();
  }

  return (
    <div className="sidebar-layout">
      <div
        className="sidebar-tabs"
        role="tablist"
        aria-label="EARS product settings"
        aria-orientation="vertical"
        onKeyDown={handleKeyDown}
      >
        {settingsTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selected === tab.id;

          return (
            <button
              key={tab.id}
              id={\`\${groupId}-\${tab.id}\`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={\`\${groupId}-panel\`}
              tabIndex={isActive ? 0 : -1}
              className={\`sidebar-tab \${
                isActive ? "is-active" : ""
              }\`}
              onClick={() => setSelected(tab.id)}
            >
              <Icon
                size={24}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span
                className={\`sidebar-tab-label \${
                  tab.fullLabel ? "has-tooltip" : ""
                }\`}
                data-tooltip={tab.fullLabel}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={\`\${groupId}-panel\`}
        role="tabpanel"
        className="sidebar-panel"
        aria-labelledby={\`\${groupId}-\${selected}\`}
        tabIndex={0}
      >
        {/* Settings panel content */}
      </div>
    </div>
  );
}

// Component Documentation Showcase

export default function ToggleComponents() {
  return (
    <main className="toggle-showcase">
      <section className="component-section">
        <h2>Radio Toggle</h2>

        <div className="component-card">
          <div className="radio-demo">
            <div>
              <h3>Normal:</h3>
              <RadioToggle label="Normal radio toggle" />
            </div>

            <div>
              <h3>Hover:</h3>
              <RadioToggle label="Hover radio toggle" />
            </div>

            <div>
              <h3>Disabled:</h3>
              <RadioToggle
                disabled
                label="Disabled radio toggle"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Switch Button Toggle</h2>

        <div className="component-card">
          <SwitchButtonToggle />
        </div>
      </section>

      <section className="component-section">
        <h2>Text Toggle</h2>

        <div className="component-card">
          <TextToggle />
        </div>
      </section>

      <section className="component-section">
        <h2>Button Toggle</h2>

        <div className="component-card">
          <ButtonToggle />
        </div>
      </section>

      <section className="component-section">
        <h2>Sliding Underline</h2>

        <div className="component-card">
          <SlidingUnderline />
        </div>
      </section>

      <section className="component-section">
        <h2>Left Tab Toggle with Icon</h2>

        <div className="component-card">
          <LeftTabToggle />
        </div>
      </section>
    </main>
  );
}`;

export const CSS_CODE = `/* Design Tokens */

:root {
  --toggle-primary: #00a9e8;
  --toggle-text: #102d3d;
  --toggle-muted: #647582;
  --toggle-disabled: #ced2d6;
  --toggle-border: #ced2d6;
  --toggle-surface: #ffffff;
  --toggle-active-bg: #e5f6fc;
  --toggle-tooltip-bg: #003246;
  --toggle-radius: 10px;
  --toggle-font-size: 1rem;
}

/* Component Showcase */

.toggle-showcase {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  color: var(--toggle-text);
}

.component-section h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.component-card {
  min-width: 0;
  padding: 2rem;
  background: var(--toggle-surface);
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: var(--toggle-radius);
  box-shadow: 0 8px 26px rgba(143, 174, 192, 0.18);
}

.component-card button,
.component-card input {
  font: inherit;
}

.component-card button {
  cursor: pointer;
}

/* Shared Toggle Styles */

.toggle-group {
  display: flex;
  align-items: stretch;
  width: 100%;
  min-width: 0;
}

.toggle-option {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 2rem;
  padding: 0.5rem 0.75rem;
  border: 0;
  background: transparent;
  color: var(--toggle-text);
  font-size: var(--toggle-font-size);
  line-height: 1.25;
  white-space: nowrap;
  transition:
    background-color 180ms ease,
    color 180ms ease,
    opacity 180ms ease;
}

.toggle-option:hover:not(:disabled) {
  opacity: 0.7;
}

.toggle-option:disabled {
  color: var(--toggle-disabled);
  cursor: not-allowed;
}

.toggle-option:focus-visible,
.sidebar-tab:focus-visible {
  outline: 2px solid var(--toggle-primary);
  outline-offset: 3px;
  z-index: 3;
}

/* Shared Long-Text Tooltip */

.toggle-label,
.sidebar-tab-label {
  position: relative;
  display: block;
  min-width: 0;
  max-width: 100%;
}

.toggle-label-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.has-tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 0.75rem);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: min(28rem, 80vw);
  padding: 0.4rem 0.65rem;
  background: var(--toggle-tooltip-bg);
  color: #ffffff;
  border-radius: 0.3rem;
  font-size: 0.75rem;
  line-height: 1.4;
  font-weight: 400;
  white-space: normal;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 20;
}

.has-tooltip::before {
  content: "";
  position: absolute;
  bottom: calc(100% + 0.35rem);
  left: 50%;
  transform: translateX(-50%);
  border: 0.4rem solid transparent;
  border-top-color: var(--toggle-tooltip-bg);
  border-bottom: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 20;
}

/* Show Tooltip on Hover or Focus */

button:not(:disabled):hover .has-tooltip::after,
button:not(:disabled):hover .has-tooltip::before,
button:focus-visible .has-tooltip::after,
button:focus-visible .has-tooltip::before,
.radio-option:hover:not(:has(input:disabled)) .has-tooltip::after,
.radio-option:hover:not(:has(input:disabled)) .has-tooltip::before,
.radio-option:focus-within:not(:has(input:disabled)) .has-tooltip::after,
.radio-option:focus-within:not(:has(input:disabled)) .has-tooltip::before {
  opacity: 1;
  visibility: visible;
}

/* 01 - Radio Toggle */

.radio-demo {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
}

.radio-demo h3 {
  margin: 0 0 1.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.radio-toggle {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.radio-option {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  color: var(--toggle-text);
  font-size: 1rem;
  line-height: 1.4;
  cursor: pointer;
}

.radio-option input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  display: grid;
  place-content: center;
  width: 1rem;
  height: 1rem;
  margin: 0;
  flex-shrink: 0;
  border: 1px solid #b8c4cc;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
}

.radio-option input[type="radio"]::before {
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--toggle-primary);
  transform: scale(0);
  transition: transform 150ms ease;
}

.radio-option input[type="radio"]:checked {
  border-color: var(--toggle-primary);
}

.radio-option input[type="radio"]:checked::before {
  transform: scale(1);
}

.radio-option:hover:not(:has(input:disabled)) {
  opacity: 0.7;
}

.radio-option input[type="radio"]:focus-visible {
  outline: 2px solid var(--toggle-primary);
  outline-offset: 3px;
}

/* Disabled Radio and Text */

.radio-option:has(input:disabled) {
  color: var(--toggle-disabled);
  cursor: not-allowed;
}

.radio-option input[type="radio"]:disabled {
  border-color: var(--toggle-disabled);
  background: #f4f5f6;
  cursor: not-allowed;
}

.radio-option input[type="radio"]:disabled::before {
  background: var(--toggle-disabled);
}

/* 02 - Switch Button Toggle */

.toggle-group--switch {
  padding: 2px;
  border: 1px solid var(--toggle-border);
  border-radius: 999px;
}

.toggle-group--switch .toggle-option {
  flex: 1 1 0;
  border-radius: 999px;
}

.toggle-group--switch .toggle-option.is-active {
  background: var(--toggle-primary);
  color: #ffffff;
}

/* 03 - Text Toggle */

.toggle-group--text {
  justify-content: flex-end;
  gap: 0.5rem;
}

.toggle-group--text .toggle-option {
  flex: 0 1 auto;
  padding: 0.5rem 0.75rem;
}

.toggle-group--text .toggle-option.is-active {
  color: var(--toggle-primary);
}

/* 04 - Button Toggle */

.toggle-group--button {
  border-radius: 0.4rem;
}

.toggle-group--button .toggle-option {
  flex: 1 1 0;
  border: 1px solid var(--toggle-border);
  background: #f7f8f9;
}

.toggle-group--button .toggle-option + .toggle-option {
  border-left: 0;
}

.toggle-group--button .toggle-option:first-child {
  border-radius: 0.4rem 0 0 0.4rem;
}

.toggle-group--button .toggle-option:last-child {
  border-radius: 0 0.4rem 0.4rem 0;
}

.toggle-group--button .toggle-option.is-active {
  position: relative;
  z-index: 1;
  background: #ffffff;
  border-color: var(--toggle-primary);
  color: var(--toggle-primary);
  box-shadow: inset 0 0 0 1px var(--toggle-primary);
}

/* 05 - Sliding Underline */

.toggle-group--underline {
  gap: 0.75rem;
  border-bottom: 1px solid #e3e7eb;
}

.toggle-group--underline .toggle-option {
  flex: 0 1 auto;
  padding: 0.75rem 0.65rem;
}

.toggle-group--underline .toggle-option:nth-child(3) {
  flex: 1 1 auto;
}

.toggle-group--underline .toggle-option::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--toggle-primary);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 220ms ease;
}

.toggle-group--underline .toggle-option.is-active {
  color: var(--toggle-primary);
}

.toggle-group--underline .toggle-option.is-active::after {
  transform: scaleX(1);
}

/* 06 - Left Tab Toggle with Icon */

.sidebar-layout {
  display: grid;
  grid-template-columns: 14rem minmax(0, 1fr);
  min-height: 19rem;
}

.sidebar-tabs {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e9ed;
}

.sidebar-tab {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  min-height: 3.5rem;
  padding: 0.75rem 1rem;
  border: 0;
  background: transparent;
  color: var(--toggle-text);
  text-align: left;
  font-size: 1rem;
  line-height: 1.4;
  cursor: pointer;
}

.sidebar-tab svg {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  color: #4b657d;
}

.sidebar-tab:hover {
  color: var(--toggle-primary);
}

.sidebar-tab.is-active {
  background: var(--toggle-active-bg);
}

.sidebar-tab.is-active::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 4px;
  background: var(--toggle-primary);
}

.sidebar-tab-label {
  overflow-wrap: anywhere;
}

.sidebar-tab:has(.has-tooltip) {
  color: var(--toggle-primary);
}

.sidebar-tabs,
.sidebar-layout {
  overflow: visible;
}

.sidebar-panel {
  min-width: 0;
  padding: 1rem;
}

/* Accessibility */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Responsive Layout */

@media (max-width: 700px) {
  .component-card {
    padding: 1rem;
  }

  .radio-demo {
    grid-template-columns: 1fr;
  }

  .sidebar-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .sidebar-tabs {
    border-right: 0;
    border-bottom: 1px solid #e5e9ed;
  }

  .toggle-group--underline,
  .toggle-group--text {
    flex-wrap: wrap;
  }

  .toggle-option {
    font-size: 0.875rem;
  }
}

/* Reduced Motion */

@media (prefers-reduced-motion: reduce) {
  .toggle-option,
  .toggle-option::after,
  .radio-option input::before {
    transition: none;
  }
}`;

/**
 * Tokenizer simulating modern IDE dark-mode syntax highlighting (VS Code Dark+)
 */
function highlightJsxLine(line: string) {
  if (line.trim().startsWith("//")) {
    return <span className="text-[#6a9955] italic">{line}</span>;
  }

  const tokenRegex =
    /(\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[^`]*`|<\/?[A-Z][a-zA-Z0-9]*|<\/?[a-z][a-z0-9-]*|\b(?:import|from|export|default|function|const|let|var|return|if|else)\b|\b(?:useState|useId|useEffect|useCallback|useRef|useMemo)\b|\b[A-Z][a-zA-Z0-9_]*\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|[a-zA-Z0-9-]+(?=\s*=)|=>|===|!==|==|!=|[{}()[\];,.:+*/%?-]|[^<>"'`\s{}()[\];,.:+*/%?=-]+|\s+)/g;

  const matches = line.match(tokenRegex);
  if (!matches) return line;

  return matches.map((token, idx) => {
    if (token.startsWith("//")) {
      return (
        <span key={idx} className="text-[#6a9955] italic">
          {token}
        </span>
      );
    }
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith("`") && token.endsWith("`"))
    ) {
      return (
        <span key={idx} className="text-[#ce9178]">
          {token}
        </span>
      );
    }
    if (
      /^(import|from|export|default|function|const|let|var|return|if|else)$/.test(
        token
      )
    ) {
      return (
        <span key={idx} className="text-[#c586c0] font-semibold">
          {token}
        </span>
      );
    }
    if (/^(useState|useId|useEffect|useCallback|useRef|useMemo)$/.test(token)) {
      return (
        <span key={idx} className="text-[#dcdcaa]">
          {token}
        </span>
      );
    }
    if (token.startsWith("</") || token.startsWith("<")) {
      return (
        <span key={idx} className="text-[#569cd6]">
          {token}
        </span>
      );
    }
    if (/^[A-Z][a-zA-Z0-9_]*$/.test(token)) {
      return (
        <span key={idx} className="text-[#4ec9b0]">
          {token}
        </span>
      );
    }
    if (/^(true|false|null|undefined)$/.test(token)) {
      return (
        <span key={idx} className="text-[#569cd6]">
          {token}
        </span>
      );
    }
    if (/^\d+(?:\.\d+)?$/.test(token)) {
      return (
        <span key={idx} className="text-[#b5cea8]">
          {token}
        </span>
      );
    }
    return (
      <span key={idx} className="text-[#9cdcfe]">
        {token}
      </span>
    );
  });
}

function highlightCssLine(line: string) {
  if (line.trim().startsWith("/*") || line.trim().endsWith("*/") || line.trim().startsWith("*")) {
    return <span className="text-[#6a9955] italic">{line}</span>;
  }

  const tokenRegex =
    /(\/\*[\s\S]*?\*\/|#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:rem|px|ms|s|%|vw|vh)?\b|\b(?:var|calc|min|max|clamp|scale|scaleX|translateX|repeat)\b|--[a-zA-Z0-9-]+|:[a-zA-Z0-9-]+|[.{};:(),]|\b[a-zA-Z-]+(?=\s*:)|[^\s{};:(),]+|\s+)/g;

  const matches = line.match(tokenRegex);
  if (!matches) return line;

  return matches.map((token, idx) => {
    if (token.startsWith("/*") || token.endsWith("*/")) {
      return (
        <span key={idx} className="text-[#6a9955] italic">
          {token}
        </span>
      );
    }
    if (token.startsWith("#") && token.length >= 4) {
      return (
        <span key={idx} className="text-[#ce9178] font-mono">
          {token}
        </span>
      );
    }
    if (/^\d+(?:\.\d+)?(rem|px|ms|s|%|vw|vh)?$/.test(token)) {
      return (
        <span key={idx} className="text-[#b5cea8]">
          {token}
        </span>
      );
    }
    if (/^(var|calc|min|max|clamp|scale|scaleX|translateX|repeat)$/.test(token)) {
      return (
        <span key={idx} className="text-[#dcdcaa]">
          {token}
        </span>
      );
    }
    if (token.startsWith("--")) {
      return (
        <span key={idx} className="text-[#9cdcfe]">
          {token}
        </span>
      );
    }
    if (token.startsWith(".") || token.startsWith("@") || token.startsWith(":") || token.startsWith("&")) {
      return (
        <span key={idx} className="text-[#d7ba7d]">
          {token}
        </span>
      );
    }
    return (
      <span key={idx} className="text-[#e6edf3]">
        {token}
      </span>
    );
  });
}

interface InternalDesignHubMedia3Props {
  onMediaClick?: (src: string, isVideo: boolean, gallery?: string[]) => void;
  align?: "left" | "right";
  className?: string;
}

export function InternalDesignHubMedia3({
  onMediaClick,
  align = "right",
  className = "",
}: InternalDesignHubMedia3Props) {
  const [activeTab, setActiveTab] = useState<string>("toggle-01");

  const handleImageClick = (src: string) => {
    if (onMediaClick) {
      onMediaClick(src, false, [TOGGLE_1, TOGGLE_2]);
    }
  };

  const reactLines = useMemo(() => REACT_CODE.split("\n"), []);
  const cssLines = useMemo(() => CSS_CODE.split("\n"), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`w-full lg:w-7/12 aspect-[4/3] mb-8 lg:mb-12 ${
        align === "left" ? "lg:float-left lg:mr-12" : "lg:float-right lg:ml-12"
      } lg:mt-2 relative rounded-[2rem] overflow-hidden shadow-sm border border-black/8 bg-white group ${className}`}
    >
      {/* 4:3 Media Frame Canvas */}
      <div className="w-full h-full relative overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          {activeTab === "toggle-01" && (
            <motion.div
              key="toggle-01"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleImageClick(TOGGLE_1)}
              className="w-full h-full relative cursor-pointer flex items-center justify-center bg-white"
            >
              <img
                src={TOGGLE_1}
                alt="Internal Design Hub Toggle Specifications - Part 01"
                className="w-full h-full object-contain pointer-events-none"
              />
            </motion.div>
          )}

          {activeTab === "toggle-02" && (
            <motion.div
              key="toggle-02"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleImageClick(TOGGLE_2)}
              className="w-full h-full relative cursor-pointer flex items-center justify-center bg-white"
            >
              <img
                src={TOGGLE_2}
                alt="Internal Design Hub Toggle Specifications - Part 02"
                className="w-full h-full object-contain pointer-events-none"
              />
            </motion.div>
          )}

          {activeTab === "react" && (
            <motion.div
              key="react"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4] select-text min-h-0"
            >
              {/* VS Code IDE Title Bar */}
              <div className="h-10 px-4 bg-[#181a1f] border-b border-black/40 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  {/* Active File Tab */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-t bg-[#1e1e1e] border-t-2 border-[#007acc] text-xs font-mono text-white">
                    <Code2 size={13} className="text-[#61afef]" />
                    <span>ToggleComponents.jsx</span>
                  </div>
                </div>
              </div>

              {/* IDE Code Canvas with Line Numbers & Bottom Padding for Floating Tab */}
              <div
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                data-lenis-prevent-touch="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                tabIndex={0}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(255, 255, 255, 0.25) transparent",
                }}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 font-mono text-[11px] sm:text-xs leading-[1.65] pb-32 select-text focus:outline-none"
              >
                <table className="w-full border-collapse">
                  <tbody>
                    {reactLines.map((line, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.04]">
                        <td className="w-10 pr-4 text-right text-[#6e7681] select-none align-top font-mono">
                          {idx + 1}
                        </td>
                        <td className="whitespace-pre font-mono">
                          {highlightJsxLine(line)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "css" && (
            <motion.div
              key="css"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4] select-text min-h-0"
            >
              {/* VS Code IDE Title Bar */}
              <div className="h-10 px-4 bg-[#181a1f] border-b border-black/40 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  {/* Active File Tab */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-t bg-[#1e1e1e] border-t-2 border-[#007acc] text-xs font-mono text-white">
                    <FileCode size={13} className="text-[#38bdf8]" />
                    <span>ToggleComponents.css</span>
                  </div>
                </div>
              </div>

              {/* IDE Code Canvas with Line Numbers & Bottom Padding for Floating Tab */}
              <div
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                data-lenis-prevent-touch="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                tabIndex={0}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(255, 255, 255, 0.25) transparent",
                }}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 font-mono text-[11px] sm:text-xs leading-[1.65] pb-32 select-text focus:outline-none"
              >
                <table className="w-full border-collapse">
                  <tbody>
                    {cssLines.map((line, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.04]">
                        <td className="w-10 pr-4 text-right text-[#6e7681] select-none align-top font-mono">
                          {idx + 1}
                        </td>
                        <td className="whitespace-pre font-mono">
                          {highlightCssLine(line)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Segmented Control Tab ON THE BOTTOM SIDE INSIDE THE AREA OF THE MEDIA */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-[calc(100%-1.5rem)] sm:w-auto max-w-[360px] sm:max-w-none flex justify-center">
        <SegmentedControl
          options={TAB_OPTIONS}
          label="Toggle Component Specifications"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto shadow-[0_16px_36px_rgba(0,0,0,0.05),0_6px_16px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.05)] backdrop-blur-md bg-white/95 border border-black/[0.06] dark:bg-[#1D1D1A]/95 dark:border-white/20"
        />
      </div>
    </motion.div>
  );
}

export const InternalDesignHubMedia2 = InternalDesignHubMedia3;
export default InternalDesignHubMedia3;

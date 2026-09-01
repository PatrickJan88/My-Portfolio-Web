# Portfolio Operating System (Portfolio OS)

This document serves as the **single source of truth** for all AI agents, designers, developers, and future contributors working on this portfolio website.

The purpose of this document is to preserve design consistency, architectural integrity, narrative craftsmanship, aesthetic philosophy, and scalability while allowing the portfolio to evolve organically.

---

## 0. Portfolio Identity & Personal Brand Narrative

### Owner
**Pofei Ran**

### Personal Brand Narrative
The portfolio represents a multidisciplinary creator who bridges:
* **Product Thinking & Systems Strategy**
* **User Experience & Interaction Design**
* **Human-Computer Interaction (HCI) Research**
* **Artificial Intelligence & Computational Systems**
* **Creative Technology & Front-End Engineering**

The goal is not to appear merely as a visual designer. The goal is to demonstrate the mastery to:
1. Identify complex, ambiguous human and technological problems.
2. Conduct rigorous qualitative and quantitative HCI research.
3. Design elegant, highly intuitive, and deeply accessible solutions.
4. Validate outcomes through iterative testing and empirical measurement.
5. Engineer, prototype, and ship living, high-performance digital experiences.

Every project, case study, and interactive surface must reinforce this narrative.

---

## 1. Design Philosophy & Aesthetic Core

The visual and conceptual identity of this portfolio operates at the intersection of computational precision, organic tactility, and atmospheric depth.

```
       ┌────────────────────────────────────────────────────────┐
       │                 THE DESIGN MATRIX                      │
       │                                                        │
       │   Retro-Futurism  ───┬───  Cosmos Concepts             │
       │                      │                                 │
       │   ASCII & Cybernetics ──┼───  Shader & WebGL Physics      │
       │                      │                                 │
       │   Oil Painting Glow  ───┴───  Intertwined Narrative UI │
       └────────────────────────────────────────────────────────┘
```

### Core Aesthetic Pillars & Keywords

* **Futuristic Design & Retro-Futurism**: A balanced dialogue between sleek next-generation computing and nostalgic analog precision. We combine vintage aerospace instrumentation, tactical readouts, and CRT scanlines with hyper-clean contemporary glass and micro-typography.
* **Cosmos Concepts**: Deep spatial voids, orbital geometries, celestial lighting coordinates, and macro-to-micro perspective shifts that make the interface feel expansive, ambient, and boundless.
* **Abstract Design & Computational Graphics**: Non-representational mathematical forms, dimensional ribbons, procedural noise fields, and sculptural vectors that visualize complex systems and intelligent algorithms.
* **ASCII Art & Terminal Matrixes**: Raw, nostalgic cybernetic typography and monospace character grids bridging the low-fi origins of computing with avant-garde interactive web art.
* **Glassmorphism & Optical Refraction**: Specular highlight borders, multi-layered backdrop blurs, realistic chromatic dispersion, and frosted translucent panels that establish clean Z-depth hierarchy without clutter.
* **Oil Painting-Like Future Aesthetics**: Fluid painterly pigments, impressionistic color washes, warm luminous halos, and tangible digital canvas textures that bring emotional warmth to digital minimalism.
* **Glitch Text & Cryptographic Decryption**: Transient cybernetic signal distortions, kinetic character scrambling, and responsive glyph reveals that evoke intelligent computational decoding on interaction.
* **Scroll-Driven Storytelling & Immersive Scrolling**: Inertial smooth scroll momentum orchestrated via Lenis, driving paragraph-by-paragraph text reveals, ghost baseline opacity illumination, and seamless narrative reveals.
* **Aura Gradients with Grainy Texture**: Radiant, diffused chromatic halos layered with subtle analog film grain to eliminate digital banding and provide a tactile, editorial finish.
* **GPU Shaders & WebGL Canvas (Three.js / OGL / ShaderGradient)**: Real-time procedural rendering, dynamic raymarching, fluid simulations, and responsive ambient lighting reacting to user presence.
* **Intertwined Interactive UI Narrative Design**: Embedded kinetic components (such as Inline Media Rect Mask Reveals, Jelly Toggles, Rotating Text Carousels, and Dynamic Shiny Badges) woven directly inside editorial sentences, turning reading into an exploratory, tangible journey.

---

## 2. Source of Truth Hierarchy

When architectural, visual, or implementation conflicts occur, follow this strict precedence:

1. **`AGENTS.md`** (System architecture, design tokens, narrative rules, and constraints)
2. **Type Definitions** (`/src/types/` – schema integrity and strict typing)
3. **Data Layer** (`/src/data/` – authentic case study facts, metrics, and content)
4. **Shared UI & Primitive Components** (`/src/components/ui/` & `/src/components/fancy/`)
5. **Feature & Section Components** (`/src/components/sections/` & `/src/features/`)
6. **Visual Enhancements & Shader Layers** (Background canvases, particle layers, lighting)
7. **Experimental Features & Micro-interactions**

> **Rule:** AI agents and contributors must never violate higher-priority rules to satisfy lower-priority requirements.

---

## 3. Tech Stack & Engineering Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                        TECH STACK MATRIX                        │
├───────────────────┬─────────────────────────────────────────────┤
│ Core Engine       │ React 19, TypeScript, Vite 6                │
│ Styling           │ Tailwind CSS v4, clsx, tailwind-merge, cva  │
│ Motion & Timeline │ Motion (v12), GSAP, @gsap/react             │
│ Smooth Scroll     │ Lenis Smooth Scroll                         │
│ 3D & Shaders      │ Three.js, React Three Fiber, Drei, OGL      │
│ Procedural Visuals│ @shadergradient/react, Cobe, Thinking Orbs  │
│ Icons             │ Lucide React, HugeIcons                     │
│ Architecture      │ Component-First, Isolated Feature Folders   │
│ Production Host   │ Vercel (Speed Insights & Analytics)         │
└───────────────────┴─────────────────────────────────────────────┘
```

### Architectural Principles
* **Component-First Architecture**: Build modular, single-responsibility components with strict TypeScript contracts.
* **Composition over Inheritance**: Compose small, focused UI primitives into rich editorial sections.
* **Content/Presentation Decoupling**: Isolate project metadata and case studies in structured data models (`/src/data/`).
* **Zero Layout Thrashing & High-FPS Animations**: Leverage GPU-accelerated properties (`transform`, `opacity`, `clip-path`) and maintain 60–120 FPS across devices.

### Directory Structure
```text
src/
├── assets/          # Static media, custom SVGs, project images
├── components/      # UI component hierarchy
│   ├── fancy/       # Experimental & creative UI primitives (blocks, text, media)
│   ├── icons/       # Custom vector iconography
│   ├── providers/   # Global context & Smooth Scroll (Lenis) providers
│   ├── sections/    # Page-level narrative sections (Hero, TextReveal, Cases, etc.)
│   └── ui/          # Core design system atomic primitives (buttons, badges, pills)
├── data/            # Single source of truth for case studies, stats, and biography
├── features/        # Self-contained complex feature modules
├── hooks/           # Custom React hooks (dimensions, scroll velocity, media queries)
├── lib/             # Utility helpers (cn, math, shader utilities)
├── pages/           # Route views (Home, CaseStudies, About, Playground)
└── types/           # Global TypeScript interfaces and data schemas
```

---

## 4. Design System Tokens & Styling Rules

### Color Strategy
* **Default Theme**: Dark Mode (Cosmic depth, Obsidian, Neutral-950, OKLCH contrast blocks).
* **Base Backgrounds**: `#0c0d0e`, `oklch(14.5% 0 none)`.
* **Subtle Dividers & Borders**: `oklch(20.5% 0 none)`, `white/10`, `rgba(255,255,255,0.06)`.
* **Accent Energy**: Solar Amber (`#FF7523`), Luminous Aura Cyan (`#38bdf8`), Cosmic Violet (`#a855f7`).
* **Contrast Compliance**: Minimum WCAG AA compliance (4.5:1 ratio for body text, 3:1 for large display elements).

### Typography System
* **Headings & Display**: Space Grotesk (Default letter-spacing `tracking-normal`, high-impact display hierarchy).
* **Body & Paragraphs**: Inter / Geist Variable (Always apply `text-pretty` to prevent typographic orphans).
* **Technical Metadata & Code**: Chivo Mono / Monospace (Used for metrics, tags, timestamps, coordinates).
* **Data Strings**: Never hardcode line breaks (`\n`) into data strings; let fluid container widths and CSS handle wrapping naturally.

### Design Tokens
* **Spacing Scale**: 4px base modular scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
* **Border Radii**: Mathematically nested corners (`Inner Radius = Outer Radius - Padding`). Standard pills use `rounded-full`, cards use `rounded-xl` to `rounded-2xl`.

---

## 5. Motion & Interaction Standards

### Motion Philosophy
Motion is an instrument of narrative clarity and tactile delight, never superficial decoration. Motion must communicate:
* **Hierarchy**: Guiding focus to the most critical action or revelation.
* **Continuity**: Seamlessly morphing state and spatial position between sections.
* **Feedback**: Acknowledging user intent with spring physics and kinetic resonance.

### Standards & Performance
* **Duration**: Micro-interactions: `150ms–300ms`. Stage transitions & reveals: `400ms–1200ms`.
* **Spring Physics**: Low bounce, high damping for a weighted, premium physical feel.
* **GSAP & Clip-Path Reveals**: Use `clip-path: inset(...)` with `power4.inOut` for cinematic rectangular mask expansions.
* **Scroll-Trigger Synchrony**: Lenis smooth scroll must drive scroll progress values without fighting native browser events.
* **Accessibility**: Respect `prefers-reduced-motion` at all times.

---

## 6. Content Architecture & Case Study Standards

### Case Study Structure
Every comprehensive case study must document the full design lifecycle:
1. **Context & Overview**: Domain, timeline, platform, and stakeholders.
2. **The Problem**: Root cause analysis and core user frictions.
3. **Strategic Goals**: User objectives and measurable business KPIs.
4. **Role & Team**: Individual ownership and cross-functional collaboration.
5. **Research & Discovery**: Methodologies, user interviews, competitive audits.
6. **Key Insights**: Synthesis of research into actionable design pillars.
7. **Design Process & Exploration**: Wireframes, system architectures, prototypes.
8. **Critical Trade-offs & Iterations**: Why alternative paths were rejected.
9. **The Solution**: High-fidelity interactive outcomes and technical implementations.
10. **Impact & Validated Metrics**: Quantitative and qualitative results.
11. **Reflections & Lessons**: What was learned and what would be done differently next time.

### Authenticity Guardrails
* **No Fabricated Data**: Never invent artificial metrics, fake company titles, or unsupported research claims.
* **Evidence-Based Design**: Anchor every major UI decision in verified research or engineering constraints.

---

## 7. AI Agent Operating Rules & Guide

When an AI agent or automated assistant contributes to this codebase:

1. **Consult `AGENTS.md` First**: Ensure your proposed changes align with this single source of truth.
2. **Preserve Architecture**: Extend existing components and utilities rather than creating duplicated alternatives.
3. **Maintain Strict TypeScript Typing**: No `any` types; define all props and state interfaces in `/src/types/`.
4. **Follow the Design Philosophy**: Infuse the specified aesthetic pillars (Retro-futurism, cosmos concepts, aura shaders, intertwined narrative elements, clean typography).
5. **Verify Before Completing**:
   * Run `tsc --noEmit` (or linter) to verify 0 build errors.
   * Verify mobile, tablet, and desktop responsive layouts.
   * Verify touch target sizing (minimum 44px on touch devices).
   * Verify dark/light contrast ratios and smooth scroll integration.

---

## 8. Long-Term Vision

This portfolio is an evolving, living digital artifact representing **Pofei Ran's** ongoing exploration of design systems, human-computer interaction, artificial intelligence, and creative coding.

When in doubt, prioritize:
**Clarity → Usability → Accessibility → Performance → Aesthetic Craftsmanship.**

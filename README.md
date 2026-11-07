# Pofei Portfolio Website

> **A synthesis of Product Thinking, HCI Research, Artificial Intelligence, and Creative Engineering.**  
> Built as a living design platform combining retro-futurism, cosmos concepts, computational shaders, and scroll-driven narrative storytelling.

[![Live Website](https://img.shields.io/badge/Live-pofeiportfolio.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://pofeiportfolio.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-v12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

---

## 1. Design Philosophy & Aesthetic Core

This portfolio is crafted as a **Portfolio OS** — an intertwined, kinetic digital environment that rejects static visual templates in favor of rich, multi-layered interactive storytelling.

```
       ┌────────────────────────────────────────────────────────┐
       │                 THE DESIGN MATRIX                      │
       │                                                        │
       │   Retro-Futurism  ───┬───  Cosmos Concepts             │
       │                      │                                 │
       │   ASCII & Cybernetics ──┼───  Shader & WebGL Physics   │
       │                      │                                 │
       │   Oil Painting Glow  ───┴───  Intertwined Narrative UI │
       └────────────────────────────────────────────────────────┘
```

### Core Aesthetic Pillars

- **Futuristic Design & Retro-Futurism**: Merging analog precision, tactile cockpit controls, and CRT cybernetic textures with ultra-modern glassmorphic surfaces and high-contrast typography.
- **Cosmos Concepts & Spatial Depth**: Deep obsidian voids, orbital geometries, celestial coordinates, and dynamic perspective scales that give the UI an expansive, atmospheric gravity.
- **Abstract Design & Computational Graphics**: Procedural mathematical curves, geometric wireframes, and dynamic canvas shaders visualizing the hidden mechanics of AI systems.
- **ASCII Art & Monospace Matrices**: Raw terminal typography and glyph grids juxtaposing the tactile origins of computer science with contemporary editorial elegance.
- **Glassmorphism & Optical Refraction**: Frosted translucent backdrops, specular light borders, and subtle chromatic dispersion layers providing natural Z-axis hierarchy.
- **Oil Painting-Like Future Design**: Luminous painterly pigments, impressionistic color washes, and soft aura gradients that infuse computational coldness with human warmth.
- **Glitch Text & Deciphering Interactions**: Kinetic text decryptions, transient cybernetic noise, and reactive hover glyph scrambles mimicking active neural processing.
- **Scroll-Driven Storytelling & Immersive Momentum**: Inertial smooth scroll physics powered by **Lenis**, synchronizing paragraph-by-paragraph text reveals, ghost baseline illumination, and seamless stage reveals.
- **Aura Gradients with Film Grain Shaders**: Diffused chromatic radiation fields layered with micro-grain textures to eliminate color banding and replicate analog tactile print.
- **GPU Shaders & WebGL Integration**: Real-time interactive fluid simulations, raymarched orbs, procedural noise fields, and interactive 3D globes (`Three.js`, `OGL`, `@shadergradient/react`, `Cobe`).
- **Intertwined Narrative UI Elements**: Micro-interactions seamlessly woven directly inside editorial text — including inline media rect-mask reveals, jelly toggle switches, dynamic rotating carousels, and luminous shiny pills.

---

## 2. Comprehensive Tech Stack

```text
┌────────────────────────┬───────────────────────────────────────────────────────────┐
│ Layer                  │ Technologies & Libraries                                  │
├────────────────────────┼───────────────────────────────────────────────────────────┤
│ Core Engine            │ React 19, TypeScript 5.8, Vite 6                          │
│ Styling & Tokens       │ Tailwind CSS v4, clsx, tailwind-merge, cva, OKLCH Colors  │
│ Motion & Animation     │ Motion (Framer Motion v12), GSAP, @gsap/react             │
│ Smooth Inertial Scroll │ Lenis Smooth Scroll (@studio-freight / lenis)             │
│ 3D, Shaders & Canvas   │ Three.js, React Three Fiber, Drei, OGL, @shadergradient   │
│ Interactive Graphics   │ Cobe (WebGL Globe), Thinking Orbs, Canvas Confetti        │
│ Typography             │ Space Grotesk, Inter, Geist Variable, Chivo Mono Variable │
│ Icons & Symbols        │ Lucide React, HugeIcons                                   │
│ Routing & Platform     │ React Router v7, Vercel Speed Insights & Analytics        │
└────────────────────────┴───────────────────────────────────────────────────────────┘
```

---

## 3. How to Use this Repository (Single Source of Truth)

This codebase is governed by **[`AGENTS.md`](./AGENTS.md)**. All developers, designers, and AI agents must treat `AGENTS.md` as the supreme design and architectural authority.

### Authority Hierarchy

```
1. AGENTS.md (System rules, tokens, philosophy)
   └── 2. TypeScript Types (/src/types/)
        └── 3. Data Layer (/src/data/)
             └── 4. Shared Atomic Components (/src/components/ui/)
                  └── 5. Feature & Section Assemblies (/src/components/sections/)
                       └── 6. Shader & Background Canvases
```

### Contribution & Development Workflow

1. **Review Guidelines**: Read [`AGENTS.md`](./AGENTS.md) before making structural or visual changes.
2. **Preserve Modularity**: Shared UI belongs in `/src/components/ui/` or `/src/components/fancy/`. Domain logic belongs in `/src/features/` or `/src/components/sections/`.
3. **Strict Type Safety**: Never use `any`. Always define descriptive TypeScript types in `/src/types/`.
4. **Adhere to Design Tokens**:
   - Use the 4px base spacing scale.
   - Use nested corner radiuses (`Inner Radius = Outer Radius - Padding`).
   - Maintain WCAG AA contrast (4.5:1 for body text).
   - Use Space Grotesk for headings, Inter/Geist for body with `text-pretty`, and Chivo Mono for metadata.

---

## 4. Project Structure

```text
pofei-portfolio/
├── AGENTS.md                   # Single source of truth (System OS & Design Tokens)
├── README.md                   # Project overview, tech stack & setup guide
├── index.html                  # HTML entry point with synchronized metadata
├── package.json                # Dependencies and build scripts
├── vite.config.ts              # Vite 6 configuration with Tailwind CSS v4
│
├── public/                     # Static media, case study assets, and vector icons
│   ├── home/                   # Hero covers, showcase assets, and case thumbnails
│   └── project/                # Detailed case study imagery and prototypes
│
└── src/
    ├── assets/                 # SVGs and static brand assets
    ├── components/
    │   ├── fancy/              # Creative blocks (media-between-text, creative text)
    │   ├── icons/              # Custom brand and system icon components
    │   ├── providers/          # Global providers (SmoothScrollProvider / Lenis)
    │   ├── sections/           # Full-page sections (Hero, TextReveal, SelectedCases, etc.)
    │   └── ui/                 # Atomic UI primitives (Buttons, Badges, Shaders, Toggles)
    ├── data/                   # Verified case studies, career milestones & project data
    ├── features/               # Self-contained feature modules
    ├── hooks/                  # Custom hooks (scroll progress, window size, media queries)
    ├── lib/                    # Shared utilities (cn, math, shader helpers)
    ├── pages/                  # Page routes (Home, CaseStudy detail, etc.)
    └── types/                  # Global TypeScript interfaces and data models
```

---

## 5. Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **bun** / **pnpm**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/PofeiRan/pofei-portfolio.git

# 2. Navigate to project root
cd pofei-portfolio

# 3. Install dependencies
npm install

# 4. Launch local development server (binds to http://localhost:3000)
npm run dev
```

### Build & Verification

```bash
# Type check and lint
npm run lint

# Production build (outputs to /dist)
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Quality & Accessibility Standards

-  **WCAG AA Compliance**: High contrast ratios across dark/light palettes, keyboard navigability on all interactive controls, and meaningful alt tags on all project visuals.
-  **Performance Optimized**: GPU-accelerated transforms, zero layout thrashing, lazy-loaded off-screen canvases, and responsive asset sizing.
-  **Fully Responsive**: Desktop-first precision with mobile-first adaptive CSS (`sm:`, `md:`, `lg:`, `xl:`), maintaining a minimum 44px touch target on mobile.
-  **Reduced Motion**: Fallbacks provided for users with `prefers-reduced-motion` enabled.

---

## 7. Changelog & Update History

All continuous modifications, design refinements, and feature enhancements are tracked below prior to deployment and GitHub synchronization.

### [2026-11-06] — Internal Design Hub: Media 3 Custom Tabbed Component Integration

#### 1. Custom Media 3 Segmented Control & Multi-Asset Showcase (`InternalDesignHubMedia3.tsx` & `ProjectDetail.tsx`)
- **Internal Bottom Tab Placement**:
  - Embedded the physics-based `SegmentedControl` tab switcher directly on the bottom side *inside* the media area (`absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-30`), floating over the visual canvas with glassmorphic elevation.
  - Eliminated external placement below the card, ensuring a unified self-contained interactive media unit that floats and wraps cleanly within Section 3.
- **Four Integrated Tabs with Real Code & IDE Simulation**:
  - **`Toggle 01`**: High-resolution `Toggle 1.webp` showcase (Radio, Switch Button, and Text Toggles) with lightbox expansion.
  - **`Toggle 02`**: High-resolution `Toggle 2.webp` showcase (Button Toggle, Sliding Underline, and Left Tab with Icon) with lightbox expansion.
  - **`React`**: Displays `ToggleComponents.jsx` inside a dark IDE editor with VS Code Dark+ syntax highlighting (keywords, hooks, JSX tags, attributes, strings, comments) and one-click copy.
  - **`CSS`**: Displays `ToggleComponents.css` design system tokens and BEM styles inside the IDE code editor with syntax colors and one-click copy.
- **Code Gutter & Scroll Comfort**:
  - Gutter with line numbers (`1, 2, 3...`) and padded scroll container (`pb-24`) to ensure code can be read and scrolled smoothly without being obscured by the bottom floating tab.

### [2026-11-05] — Internal Design Hub: Title Simplification & Metrics Refinement

#### 1. Title & Category Simplification (`internal-design-manual.ts` & `corporate-website-redesign.ts`)
- **Name & Taxonomy Streamlined**:
  - Simplified case study title and hero heading from `"Internal Design Manual & Product Resource Web"` to `"Internal Design Hub"`.
  - Updated category taxonomy from `"Design System & Web Platform"` to `"Design System"`.
  - Synchronized navigation reference in `corporate-website-redesign.ts` (`nextProject.title`).

#### 2. Result Section Narrative Integration (`internal-design-manual.ts` & `ProjectDetail.tsx`)
- **Section Heading Update & Single-Line Layout**:
  - Changed heading from `"Measurable Velocity, Adoption, and Cross-Platform Consistency"` to `"Impact on Workflow Efficiency and Cross-Functional Collaboration."`.
  - Configured `whitespace-nowrap` with fluid `clamp` sizing (`text-[clamp(0.85rem,2.7vw,2.75rem)]`) to ensure the entire headline remains on a single, continuous line without line wrapping.
- **Outcome Bullet Points**:
  - Replaced placeholder result metrics with authentic five-pillar outcome narrative:
    - *The platform established a shared internal reference that helped teams:*
    - `•` Access design specifications, code examples, prototypes, and brand assets in one place.
    - `•` Reduce dependence on individual team members for routine design questions.
    - `•` Translate design decisions into implementation with greater clarity.
    - `•` Reuse approved components and visual resources across teams.
    - `•` Strengthen collaboration between design, development, marketing, business analysis, and client support.

#### 3. Animated Metrics Counter Integration (`internal-design-manual.ts` & `ProjectDetail.tsx`)
- **Component Porting from Homepage**:
  - Ported the animated metrics number pattern (`CountingNumber` + `useInView` scroll detection) into `ProjectDetail.tsx`.
  - Positioned directly below the case study hero title banner at the top of the content area.
- **Data Configuration & Copy Refinement**:
  - `-30%` Reduction in resource-search time
  - `-50%` Reduction in recurring design questions
  - `5+` Cross-functional teams supported
- **Single-Row Formatting, Axis Alignment & Expanded Margins**:
  - Enforced `whitespace-nowrap` on metric labels to keep all text strictly on a single horizontal row, eliminating line breaking and orphan words.
  - Aligned the 3 metrics across the full width of the underlying grey divider using `justify-between`, ensuring generous margin spacing between columns.
  - Formatted each column with `items-center text-center` so that each number is centered relative to its text label below.
  - Maintained compact vertical padding and margins (`pt-8 md:pt-12`, `mb-8 md:mb-12`, `pb-8 md:pb-12`).
- **Schema & System Isolation (`src/types/project.ts`)**:
  - Added optional `metrics?: ProjectMetric[]` to `ProjectData` schema.
  - Rendered conditionally so that only projects explicitly declaring `metrics` display the section, preserving 100% isolation for all other case studies.

#### 4. Cover & Hero Background Asset Update (`internal-design-manual.ts`)
- **WebP Hero & Projects Cover Asset Application**:
  - Applied `public/projects/internal-design-manual/cover-page.webp` to `image` (the project card cover displayed in the Projects grid showcase) in `src/data/projects/internal-design-manual.ts`.
  - Applied `public/projects/internal-design-manual/cover-hero-page.webp` to `heroImage` (the full-bleed case study hero page background).
  - Seamlessly replaces placeholder SVG graphics while preserving image overlay contrast, responsive dimensions, and zero layout shift.

### [2026-11-04] — Internal Design Manual: Approach & Challenge Narrative Updates

#### 1. Problem Statement / The Challenge Refinement (`internal-design-manual.ts`)
- **Label Update**: Changed section label from `"Problem Statement"` to `"The Challenge"`.
- **Narrative Copy Update**:
  - Replaced placeholder quote with authentic challenge context:
    *`"Design documentation, implementation references, prototypes, and marketing materials were distributed across different resources. Teams often relied on colleagues or disconnected platforms to find assets, clarify specifications, and access approved product references, creating friction in cross-functional collaboration and slowing down daily workflows."`*

#### 2. Approach & Media Layout Restructuring (`internal-design-manual.ts` & `ProjectDetail.tsx`)
- **Placeholder Text Removal**:
  - Removed placeholder section `"Design Strategy"` and heading `"Transforming Static Guidelines into an Interactive, Living Resource Web"` along with its boilerplate body.
- **Narrative & Media Pairing**:
  - **Section 1 (Flanked by Media 2 on Right)**:
    - Heading: *"A shared reference for cross-functional teams."*
    - Intro text and items **1 (Centralized documentation)** and **2 (Design-to-code references)**.
  - **Section 2 (Floated Media 3 on Left, Text on Right)**:
    - 4:3 placeholder media placed on the left.
    - Items **3 (Prototype showcase)** and **4 (Shared asset library)** aligned on its right side.
- **System Isolation & Media 4 Removal (`src/types/project.ts` & `ProjectDetail.tsx`)**:
  - Removed `media4` from `internal-design-manual.ts`.
  - Updated `ProjectDetail.tsx` so `media4` is only rendered when explicitly defined, cleanly eliminating the placeholder slot for `internal-design-manual` without affecting other case studies.
  - Made `label` and `heading` optional on `section2` in `ProjectData`.
  - Guarded section 2 in `ProjectDetail.tsx` so that `internal-design-manual` does not render default fallback headings when omitted, while preserving existing behavior for all other case studies.

### [2026-11-03] — Resume & Document Asset Replacement

#### 1. CV Asset Replacement (`public/docs/Pofei_Ran_CV.pdf`)
- **Seamless Document Replacement**:
  - Successfully received and verified the newly uploaded CV document at `public/docs/Pofei_Ran_CV.pdf` (PDF v1.3, 2 pages, 74 KB).
  - Preserved all existing entry points, navigation bars, interactive PDF preview modal (`PdfViewerModal`), and download workflows completely intact with zero code alterations required.

### [2026-11-03] — Case Study Architecture: Internal Design Manual & Svenska Lek Archival

#### 1. Internal Design Manual & Product Resource Web (`internal-design-manual.ts`)
- **New Case Study Created**:
  - Structured after `Corporate Website Redesign` (`corporate-website-redesign.ts`) with identical narrative sections:
    - Overview (Context & Objective)
    - Problem Statement (Callout Quote)
    - Section 1: Approach (Foundations & Information Architecture)
    - Section 2: Design Strategy (Living Component Library & Guidelines)
    - Section 3: Result & Impact (Metrics, Adoption & Velocity)
    - Metadata (DURATION: "2 months", YEAR: "2023 - 2024", ROLE: "UI/UX Designer", PLATFORM: "Internal Source Web and Design System Documentation")
    - Media slots (`media1`, `media2`, `media3`, `media4`)
    - Next Project link leading directly into `ev-charging-platform`.
- **Dedicated Media Directory (`public/projects/internal-design-manual/`)**:
  - Created directory with documentation `README.md` explaining exact asset requirements and aspect ratios.
  - Provided responsive placeholder SVGs (`cover.svg`, `hero.svg`, `media-1.svg`, `media-2.svg`, `media-3.svg`, `media-4.svg`) with cosmic obsidian styling, technical grid frames, and token typography to guarantee zero layout shift or broken imagery.
- **Project Navigation Sequence**:
  - Connected `corporate-website-redesign.ts` `nextProject` to `internal-design-manual`.
  - Registered `internalDesignManualCaseStudy` in `src/data/projects.ts` within the active project rotation.
- **Overview Narrative Integration**:
  - Replaced overview placeholder copy with authentic two-paragraph narrative detailing the centralized design manual and company resource website bridging product design specifications, reusable UI components, code references, prototypes, motion guidelines, brand assets, and marketing brochures for cross-departmental collaboration.

#### 2. Svenska Lek Archival (`svenska-lek.ts` & `project.ts`)
- **Preserved & Hidden Without Deletion**:
  - Added optional `hidden?: boolean` property to `ProjectData` schema in `src/types/project.ts`.
  - Marked `svenskaLekCaseStudy` with `hidden: true` in `src/data/projects/svenska-lek.ts`.
  - Filtered active project listings (`projectsData`) to exclude hidden case studies while retaining full data preservation in `allProjectsData`.
  - Preserved all files and media assets under `public/projects/svenska-lek/` intact for future unhiding/restoration.
  - Enabled direct URL access resolution via `allProjectsData.find` in `src/pages/ProjectDetail.tsx`.

### [2026-10-22] — Ears Case Study Video Asset Replacement

#### 1. Ears Project Case Study (`ears.ts` & `ProjectDetail.tsx`)
- **EyeAsk Video Asset Upgrade**:
  - Replaced `/projects/ears/eyeask-video-1080p.webm` with the updated high-definition media asset `/projects/ears/eyeask-video-1080p2.webm`.
  - Updated the data source in `src/data/projects/ears.ts` (`eyeAsk.media`).
  - Synchronized the media renderer and lightbox fallback paths in `src/pages/ProjectDetail.tsx`.
  - Cleanly removed the deprecated legacy asset `public/projects/ears/eyeask-video-1080p.webm`.
  - Preserved all surrounding typography, layout geometry, autoplay loop attributes, and interaction patterns unchanged.

### [2026-10-08] — How I Work Narrative Expansion & AI Pill Border Animation

#### 1. How I Work (`ScrollServicesSection.tsx`)
- **Pillar 03 Copy Refinement**: Updated description to:  
  *`"I use AI to rapidly turn ideas into interactive prototypes and test them early."`*
- **Pillar 04 Copy Refinement**: Updated description to:  
  *`"I make sure the final experience is practical, coherent, and ready to scale across design and code."`*
- **Continuous Loop Narrative Reveal ("And then, I loop back.")**:
  - Added an integrated follow-through stage immediately following Pillar 04 with matching typography hierarchy and layout parity.
  - Heading: *`"And then, I loop back."`*
  - Body: *`"I learn from what I build, test what works, and use what I learn to shape the next iteration."`*
  - Smoothly orchestrates scroll progression forward into the Cinema section.
- **Pill & Tag Nomenclature Synchronization**:
  - **Pillar 01**: Updated tag from `Explore` to `AI-assisted Exploration`.
  - **Pillar 03**: Updated tag from `Prototype` to `AI-assisted prototyping`.
  - **Pillar 04**: Updated tag from `Systemize` to `AI-assisted coding`.
  - **Pillar 04**: Updated tag from `Deliver` to `Documentation`.
- **Animated Rainbow Border Effect for AI Tags**:
  - Integrated the signature 45° dynamic rotating rainbow gradient border (`#FCAE0B`, `#4DB440`, `#979799`, `#777b86`) identical to the Seekr **"Try now"** button into three specific AI tags:
    - `AI-assisted Exploration`
    - `AI-assisted prototyping`
    - `AI-assisted coding`
  - Utilized a high-precision `p-[1px]` wrapper containing a matching dark background capsule (`bg-[#1c1d20]`) to ensure pixel-perfect dimension parity, zero layout shift, and identical sizing compared to standard tags across mobile, tablet, and desktop viewports.

#### 2. Seekr Section (`SeekrSection.tsx`)
- **Mobile 3-Page Cover Layout Optimization**:
  - Fixed mobile Chrome layout on the final 3-page cover showcase to eliminate horizontal squeezing and image distortion.
  - Locked tablet and desktop configurations unchanged while providing tailored mobile scaling and aspect ratio integrity.

### [2026-11-06] — Internal Design Hub Media Layout & Radius 999 Tabs Modernization

#### Internal Design Hub Media 2 & 3 Reorganization (`ProjectDetail.tsx`, `InternalDesignHubMedia3.tsx`)
- **Media 2 Tabs Relocation**:
  - Moved the interactive 4-tab component (`Toggle 01`, `Toggle 02`, `React`, `CSS`) to **Media 2** in Section 2, right-aligned alongside the "Approach" and "Design-to-code references" narrative.
  - Added dynamic `align="right"` floating layout support.
- **Media 3 Video Integration**:
  - Assigned `/projects/internal-design-manual/internal web 2.webm` to **Media 3** in Section 3, rendering seamlessly with autoplay, loop, muted, playsInline, and full lightbox modal support.
  - Updated `src/data/projects/internal-design-manual.ts` data sources for `media2` and `media3`.
- **SegmentedControl Pill Radius (999px)**:
  - Updated all tabs container, active sliding motion thumb indicator, and radio button hitboxes to `rounded-[999px]` in `src/components/ui/segmented-control.tsx` to match the portfolio's signature pill design tokens.
- **Simulator Code Alignment**:
  - Synchronized `ToggleComponents.jsx` and `ToggleComponents.css` simulator code to the updated section order: `01 - Radio Toggle`, `02 - Switch Button Toggle`, `03 - Text Toggle`, `04 - Button Toggle`, `05 - Sliding Underline`, and `06 - Left Tab Toggle with Icon`.
- **Floating Shadow & Tab Height Refinement**:
  - Increased tab height by 10px (`py-[12px]`) for a more substantial tactile hit area.
  - Applied a delicate 5% #000 (`rgba(0,0,0,0.05)`) multi-layered diffused ambient shadow (`0_16px_36px`, `0_6px_16px`, `0_2px_6px`) so the tab component distinctly floats above both bright media and dark IDE simulator canvas.
- **Header Simplification**:
  - Removed the copy button from the top-right corner of the code simulator header across both React and CSS views for an uncluttered editor look.
- **Top Navigation Scroll & 3-Second Inactivity Auto-Hide Logic (`Navbar.tsx`)**:
  - Preserved original scroll-down disappearance and top-of-page persistence.
  - When the user scrolls up, the floating navigation pill appears immediately; if the user remains inactive without scrolling for 3 seconds, the navigation smoothly fades out and slides up until the user scrolls again.
  - Added hover pause guardrails so the navigation stays visible if the user hovers over the navbar.
- **Problem Statement / Quote Section Typographic Orphan Prevention (`ProjectDetail.tsx`)**:
  - Applied `text-perfect` and `text-pretty` to the central quote heading across every case study to balance line wrapping.
  - Added a `preventOrphans` helper that binds the final word with a non-breaking space (`\u00A0`), strictly preventing single trailing words on a solitary line.
- **Metric Target Alignment**:
  - Updated the "Cross-functional teams supported" metric from `5+` to `4+` in `src/data/projects/internal-design-manual.ts`.
- **Internal Design Hub Media 1 Customization (`InternalDesignHubMedia1.tsx`, `card.tsx`, `button.tsx`)**:
  - Implemented Shadcn `Card` composition (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) on a pure white canvas with `ShowcasePointer` multi-cursor orchestration.
  - Faithfully matched the exact content & card structure for 4 roles:
    1. **Developers**: `TimeSlider Component` · `<TimeSlider />` code snippet · `Copy Code` action → `Copied ✓`
    2. **Marketing**: `Product Showcase` · `EARS Product Demo` thumbnail · `Approved logo assets` download → `Asset Downloaded ✓`
    3. **Designers**: `Radio Toggle` · `Reusable component documented` toggle → `State Updated ✓`
    4. **Business & Support**: `Product Reference` · Expandable `TimeSlider Interaction` spec card → `Spec Expanded ✓`
  - Added canvas top-right `Replay` reset button and `Fullscreen` view control.

### [2026-11-07] — Internal Design Hub Media 1 16:9 Ratio & Compact Developers Card

#### Media 1 Canvas & Card Sizing Refinement (`InternalDesignHubMedia1.tsx`)
- **16:9 Aspect Ratio Restored**:
  - Restored the Media 1 container to `aspect-[4/3] md:aspect-[16/9]` to match portfolio media standards, replacing previous unrestricted vertical height with clean desktop 16:9 proportions.
- **Card Miniaturization Across All Roles**:
  - Scaled down card footprints to compact, light-themed cards (`max-w-[280px] sm:max-w-[300px]`, `rounded-2xl`, `p-3.5 sm:p-4`) so all 4 cards sit symmetrically in a 2x2 grid with ample roaming room for the showcase pointer cursors.
- **Developers Card Refinement**:
  - Subtitle updated to `"React · CSS · UI Specs"`.
  - Added new black radius 999 pill button (`rounded-[999px]`) with white copy icon on the left of `"Copy Code"`.
  - Removed checkmark icons from the copied state, displaying clean white text `"Copied"` without color shifting.
- **Designers Card Exact Reference Replication & Toggle Fix**:
  - **Header**: Light-gray rounded square badge with `Component` icon, paired with `"Designers"` title and updated subtitle `"UI Component"`.
  - **Toggle Bug Fixed**: When selecting Option 2, Option 1 smoothly reverts to the default unselected border ring (`border border-neutral-300 bg-white`).
- **Business Support Team Card & Cursor Text Styling**:
  - **Header**: Light-gray rounded square badge with `MonitorPlay` icon, paired with `"Business Support Team"` title and updated subtitle `"Client Solutions Prototypes"`.
  - **Cursor Tag**: Explicitly set cursor label text color to white (`textColor: "#ffffff"`), matching the other 3 cursor badges.
  - **Component**: Presentation easel icon (`Presentation`) with `"Client Showcase"` on the left and `ExternalLink` icon on the right.
- **Marketing Team Card Text Swapping**:
  - Subtitle updated to `"Brochures & Brand Assets"`.
  - Bottom pill box text updated to `"Company Logo Guidelines"`.
- **Card Dimension & Grid Alignment**:
  - Harmonized all 4 cards with identical padding (`p-3.5 sm:p-4`), uniform minimum heights, and 8px icon-to-title margins for a balanced 2x2 grid layout.

---


<div align="center">
  <sub>Designed, Researched, and Engineered by <strong>Pofei Ran</strong>. Governed by <strong>Portfolio OS</strong>.</sub>
</div>

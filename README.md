# Pofei Ran — Portfolio & Operating System

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

<div align="center">
  <sub>Designed, Researched, and Engineered by <strong>Pofei Ran</strong>. Governed by <strong>Portfolio OS</strong>.</sub>
</div>

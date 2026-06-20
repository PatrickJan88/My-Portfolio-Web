# Portfolio Operating System (Portfolio OS)

This document serves as the single source of truth for all AI agents, developers, and future contributors working on this portfolio website.

The purpose of this document is to preserve design consistency, architectural integrity, content quality, and scalability while allowing the portfolio to evolve over time.

---

## 0. Portfolio Identity & Personal Brand Narrative

### Owner
Pofei Ran

### Personal Brand Narrative
The portfolio represents a designer who combines:
* Product Thinking
* User Experience Design
* Human-Computer Interaction Research
* Artificial Intelligence
* Technical Implementation

The goal is not to appear as a visual designer only.
The goal is to demonstrate the ability to:
* Identify problems
* Conduct research
* Design solutions
* Validate outcomes
* Build and prototype ideas

Every project should reinforce this narrative.

### Portfolio Goals
* Showcase professional UX/UI work.
* Demonstrate HCI research capability and research case studies.
* Highlight AI-related knowledge and experimentation.
* Present visual design excellence.
* Support recruitment and networking.
* Document professional growth and learning.
* Establish a credible personal brand within design and AI.

### Portfolio Success Metrics
The portfolio should enable:
- Recruiters to understand expertise within 30 seconds.
- Hiring managers to evaluate case studies efficiently.
- Visitors to navigate without confusion.
- Project stories to be understood without explanation.

Success is measured by clarity and credibility, not by visual complexity.

### Target Audience
* Hiring managers
* Product teams
* UX leaders
* AI startups
* HCI researchers
* Design recruiters
* Technology founders

### Core Principles
* Clarity over decoration
* Usability over complexity
* Storytelling over feature overload
* Accessibility first
* Performance before visual excess
* Research-informed decisions
* Consistency over trend chasing

---

## 1. Source of Truth Hierarchy

When conflicts occur, follow this order:
1. AGENTS.md
2. Type Definitions
3. Data Layer
4. Shared Components
5. Feature Components
6. Visual Enhancements
7. Experimental Features

AI agents must never violate higher-priority rules to satisfy lower-priority requirements.

---

## 2. System Architecture

### Tech Stack
**Framework:**
* React
* Vite

**Styling:**
* Tailwind CSS

**Animations:**
* Framer Motion

**Icons:**
* Lucide React

**Language:**
* TypeScript

### Architectural Principles
* Component-first architecture
* Reusable over duplicated
* Extend rather than replace
* Composition over inheritance
* Separate content from presentation
* Separate business logic from UI
* Minimize technical debt

### Folder Philosophy
Features should be isolated.

Example:
```text
src/
├── components/
├── features/
├── pages/
├── data/
├── hooks/
├── lib/
├── types/
├── assets/
```

Shared functionality belongs in shared locations.
Feature-specific functionality belongs inside its own feature folder.

---

## 3. Design System

### Visual Direction
The portfolio should communicate:
* Professionalism
* Design maturity
* Technical competence
* Research capability
* Modern craftsmanship

The visual language should feel:
* Minimal
* Intentional
* Premium
* High contrast
* Contemporary

### Color Strategy
**Default:**
* Dark mode

**Preferred backgrounds:**
* black
* neutral-900

Color should support hierarchy, not dominate attention.

### Typography
**Headings:**
* Space Grotesk

**Body:**
* Inter

**Technical metadata:**
* Monospace

Typography should prioritize readability before visual style.

### Layout Principles
* Strong visual hierarchy
* Generous whitespace
* Consistent spacing rhythm
* Modular grid alignment
* Clear content grouping

### Design Tokens
**Spacing:**
* Use 4px base scale

**Border Radius:**
* Large rounded corners preferred

**Container Width:**
* Consistent max-width system

**Motion:**
* Centralized motion tokens

**Typography:**
* Centralized typography tokens

---

## 4. Motion System

### Motion Philosophy
Motion exists to improve understanding.
Motion should communicate:
* Hierarchy
* Progression
* Focus
* Context

Motion should never exist solely for decoration.

### Preferred Motion Types
* Fade transitions
* Slide reveals
* Staggered content reveals
* Scroll-triggered animations
* Subtle hover interactions

### Avoid
* Excessive parallax
* Infinite animations
* Distracting motion
* Motion that delays usability

### Motion Standards
**Duration:**
* 150ms–500ms

**Easing:**
* easeOut preferred

**Reduced Motion:**
* Always respect user preferences

---

## 5. Content Architecture

### Case Study Structure
Every project should include:
1. Context
2. Problem
3. Goal
4. Role
5. Research
6. Insights
7. Design Process
8. Iterations
9. Solution
10. Results
11. Reflection

### Storytelling Priority
Projects should demonstrate:
* Thinking process
* Decision making
* Tradeoffs
* User-centered reasoning

Not just final visuals.

### Content Principles
Show evidence.
Avoid unsupported claims.
Research findings should support design decisions whenever possible.

### Content Authenticity
Never fabricate:
- Project outcomes
- User research findings
- Metrics
- Business results
- Team structures

Unknown information should be clearly labeled.
Authenticity is more important than perceived impact.

### Research Presentation Standards
Research case studies should include:
- Research objective
- Methodology
- Participants
- Key findings
- Design implications
- Reflections

Research content should prioritize rigor and transparency.

---

## 6. Accessibility Standards

Accessibility is mandatory.

### Requirements
**Minimum:**
* WCAG AA compliance

**All interactive elements must support:**
* Keyboard navigation
* Visible focus states
* Screen reader compatibility

**Images:**
* Meaningful alt text

**Motion:**
* Reduced-motion support

**Forms:**
* Clear labels
* Accessible validation

Accessibility must never be sacrificed for aesthetics.

---

## 7. Performance Standards

Performance is a design feature.

### Requirements
* Optimize media assets
* Lazy load heavy content
* Minimize unnecessary renders
* Avoid oversized bundles
* Use efficient animations

Performance should remain a first-class concern during all development.

---

## 8. Design Decision Framework

When multiple solutions exist:

Priority order:
1. User Understanding
2. Accessibility
3. Performance
4. Maintainability
5. Visual Enhancement

If a feature improves aesthetics but harms usability, usability wins.
If a feature improves aesthetics but harms performance, performance wins.
If a feature improves aesthetics but increases complexity, simplicity wins.

---

## 9. AI Agent Operating Rules

Before implementing any change:
1. Read AGENTS.md first.
2. Preserve existing architecture.
3. Extend instead of replacing.
4. Avoid introducing dependencies unless requested.
5. Verify responsiveness.
6. Verify accessibility.
7. Verify performance impact.
8. Verify design consistency.
9. Document structural changes.
10. Keep solutions maintainable.

AI agents should optimize for long-term sustainability rather than short-term convenience.

---

## 10. Scalability & Future AI Integration

The portfolio is expected to grow.

### AI Integration Principles
AI features should enhance user value.
Avoid AI for novelty alone.

Future AI implementations may include:
* Portfolio assistant
* Research explorer
* Project recommendation engine
* Case study summarizer
* Interactive demos

Requirements:
* Explainability first
* User control first
* Privacy first
* Accessibility first

AI should support storytelling rather than distract from it.

### Expansion Rules
New features must:
* Be modular
* Remain loosely coupled
* Preserve existing architecture
* Avoid unnecessary complexity

No feature should require rewriting the entire system.

---

## 11. Validation Checklist

Before committing any change:

**Architecture**
* No broken types
* No schema regressions

**Design**
* Consistent visual language
* Consistent spacing
* Consistent typography

**Accessibility**
* Keyboard accessible
* Visible focus states
* WCAG AA compliant

**Performance**
* Optimized assets
* Lazy loading where appropriate

**Responsive**
* Mobile verified
* Tablet verified
* Desktop verified

**Content**
* Links verified
* Assets verified
* No placeholder content

**Documentation**
* Structural changes documented

---

## 12. Long-Term Vision

This portfolio is more than a collection of projects.

It is a living platform representing:
* Product Design
* UX Strategy
* HCI Research
* AI Exploration
* Technical Execution

Every addition should strengthen that narrative.

When uncertain, prioritize:
Clarity → Usability → Accessibility → Performance → Visual Enhancement.

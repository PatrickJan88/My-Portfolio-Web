import { ProjectData } from "../../types/project";

export const internalDesignManualCaseStudy: ProjectData = {
  id: "internal-design-manual",
  title: "Internal Design Hub",
  category: "Design System",
  client: "Enterprise Platform",
  image: "/projects/internal-design-manual/cover-page.webp",
  
  heroHeading: "Internal Design Hub",
  heroImage: "/projects/internal-design-manual/cover-hero-page.webp",
  
  overviewHeading: "Centralizing Design Standards and Product Resources for Cross-Functional Scale",
  overview: "In my previous role, I designed and built an internal Design Manual and company resource website that became the centralized source of truth for the company's digital assets. It brought together product design specifications, reusable UI components, code references, prototypes, motion guidelines, brand assets, and marketing brochures in one place.\n\nThe platform gave designers, developers, marketing teams, business analysts, and consultants easy access to shared resources, breaking down information silos and enabling faster, more consistent collaboration across departments.",
  
  testimonial: {
    quote: "Design documentation, implementation references, prototypes, and marketing materials were distributed across different resources. Teams often relied on colleagues or disconnected platforms to find assets, clarify specifications, and access approved product references, creating friction in cross-functional collaboration and slowing down daily workflows.",
    label: "The Challenge"
  },
  
  section1: {
    label: "Approach",
    heading: "A shared reference for cross-functional teams.",
    content: "I brought design documentation, implementation references, prototypes, and brand resources together in a web-based platform.\n\n1. Centralized documentation: Organized design principles, typography, colors, reusable UI components, and motion guidelines to support consistent product experiences.\n\n2. Design-to-code references: Connected UI specifications with implementation examples in HTML, CSS, React, and iOS Swift, supporting both web and iPad-based product development."
  },
  
  section2: {
    content: "3. Prototype showcase: Documented approved design prototype links, organized around client requirements, so teams could quickly access and present relevant product experiences during client showcases.\n\n4. Shared asset library: Centralized approved company logos, icons, and marketing resources for easy access and consistent reuse."
  },
  
  section3: {
    label: "Result",
    heading: "Impact on Workflow Efficiency and Cross-Functional Collaboration.",
    content: "The platform established a shared internal reference that helped teams:\n\n• Access design specifications, code examples, prototypes, and brand assets in one place.\n\n• Reduce dependence on individual team members for routine design questions.\n\n• Translate design decisions into implementation with greater clarity.\n\n• Reuse approved components and visual resources across teams.\n\n• Strengthen collaboration between design, development, marketing, business analysis, and client support."
  },
  
  tags: [],
  metadata: [
    { label: "DURATION", value: "2 months" },
    { label: "YEAR", value: "2023 - 2024" },
    { label: "ROLE", value: "UI/UX Designer" },
    { label: "PLATFORM", value: "Internal Source Web and Design System Documentation" },
  ],

  metrics: [
    { prefix: "-", target: 30, suffix: "%", label: "Reduction in resource-search time" },
    { prefix: "-", target: 50, suffix: "%", label: "Reduction in recurring design questions" },
    { target: 4, suffix: "+", label: "Cross-functional teams supported" },
  ],

  media1: "/projects/internal-design-manual/media-1.svg",
  media2: "/projects/internal-design-manual/Toggle%201.1.webp",
  media3: "/projects/internal-design-manual/internal%20web%202.webm",
  
  nextProject: {
    id: "ev-charging-platform",
    title: "EV Charging Platform"
  }
};

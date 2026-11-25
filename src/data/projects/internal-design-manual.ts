import { ProjectData } from "../../types/project";

export const internalDesignManualCaseStudy: ProjectData = {
  id: "internal-design-manual",
  title: "Internal Design Hub",
  category: "Design System",
  client: "Enterprise Platform",
  image: "/projects/internal-design-manual/cover-page.webp",
  
  heroHeading: "Internal Design Hub",
  heroImage: "/projects/internal-design-manual/cover-hero-page.webp",
  
  overviewHeading: "Centralizing Design Standards and Product Resources for Organizational Efficiency",
  overview: "In my previous role, I designed and built an internal Design Manual and company resource website that became the centralized source of truth for the company's digital assets. It brought together product design specifications, reusable UI components, code references, prototypes, motion guidelines, brand assets, and marketing brochures in one place.\n\nThe platform gave designers, developers, marketing teams, business analysts, and consultants easy access to shared resources, breaking down information silos and enabling faster, more consistent collaboration across departments.",
  
  testimonial: {
    quote: "Design documentation, implementation references, prototypes, and marketing materials were scattered across different platforms. Teams frequently relied on colleagues to locate resources, clarify specifications, and access approved materials, creating unnecessary dependencies and slowing down daily workflows.",
    label: "The Challenge"
  },
  
  section1: {
    label: "Approach",
    heading: "A Shared Foundation for Cross-Functional Delivery",
    content: "I brought design documentation, implementation references, prototypes, and brand resources together in a web-based platform.\n\n1. Centralized documentation: Organized design principles, typography, colors, reusable UI components, and motion guidelines to support consistent product experiences.\n\n2. Design-to-code references: Connected UI specifications with implementation examples in HTML, CSS, React, and iOS Swift, supporting both web and iPad-based product development."
  },
  
  section2: {
    content: "3. Prototype showcase: Organized approved product prototypes around client requirements, allowing business support teams and consultants to independently access and present relevant product experiences during client demonstrations.\n\n4. Shared asset library: Centralized approved company logos, icons, and marketing resources for easy access and consistent reuse."
  },
  
  section3: {
    label: "Result",
    heading: "Improving Organizational Efficiency and Team Autonomy",
    content: "The Internal Design Hub established a shared foundation for knowledge management, resource accessibility, and consistent product delivery across departments.\n\nBy reducing dependence on individual team members for routine information requests, the platform enabled teams to work more independently. Designers and developers gained clearer implementation references, while marketing and business support teams could directly access approved resources and client-ready prototypes.\n\nThe project helped reduce operational friction, standardize workflows, and strengthen collaboration across departments, creating a more scalable foundation for enterprise product development and business support."
  },
  
  tags: [],
  metadata: [
    { label: "DURATION", value: "3 months" },
    { label: "YEAR", value: "2023 - 2024" },
    { label: "ROLE", value: "UI Designer II" },
    { label: "PLATFORM", value: "Internal Knowledge & Resource Hub" },
  ],

  metrics: [
    {
      prefix: "−",
      target: 30,
      suffix: "%",
      label: "Resource Search Time",
      subLabel: "Operational efficiency",
    },
    {
      prefix: "−",
      target: 50,
      suffix: "%",
      label: "Recurring Design Questions",
      subLabel: "Team autonomy",
    },
    {
      target: 4,
      suffix: "+",
      label: "Teams Supported",
      subLabel: "Cross-functional reach",
    },
  ],

  media1: "/projects/internal-design-manual/media-1.svg",
  media2: "/projects/internal-design-manual/Toggle%201.1.webp",
  media3: "/projects/internal-design-manual/internal%20web%202.webm",
  
  nextProject: {
    id: "ev-charging-platform",
    title: "EV Charging Platform"
  }
};

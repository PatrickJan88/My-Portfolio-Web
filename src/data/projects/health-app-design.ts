import { ProjectData } from "../../types/project";

export const healthAppDesignCaseStudy: ProjectData = {
  id: "health-app-design",
  title: "Health App Design",
  category: "Product Design",
  client: "Legent Health",
  image: "/projects/health-app-design/cover-page.webp",
  
  heroHeading: "Digital Health\nAPP",
  heroImage: "/projects/health-app-design/cover-hero-page.webp",
  
  overviewHeading: "Digital Health APP",
  overview: "A comprehensive digital health platform built natively within the WeChat Mini Program ecosystem. The product transforms the traditional medical journey into a modern, frictionless experience by connecting patients with remote consultations, localized pathology education, and a new-retail O2O (Online-to-Offline) pharmacy.",
  
  testimonial: {
    quote: "Busy young professionals in Mainland China faced high-friction access to medical experts and prescription fulfillment. Simultaneously, medical professionals lacked transparent, segmented tools to manage patients and build their digital reputation efficiently.",
    label: "Problem Statement"
  },

  section1: {
    label: "Approach",
    heading: "Single Sign-On (SSO) & Segmented Architecture",
    content: "To achieve maximum adoption, I leveraged WeChat’s native infrastructure (SSO and WeChat Pay) to create a zero-friction onboarding loop. The architecture was deliberately split into a dual-sided value proposition: an accessible, consumer-facing interface for fast telehealth and medication delivery, paired with a robust, data-dense management portal empowering doctors to segment and treat patients efficiently."
  },

  section2: {
    label: "Design System",
    heading: "Atomic Design",
    content: "To ensure rapid iteration and seamless developer handoff, I built a highly modular UI component library grounded in Atomic Design principles. This systematic approach guaranteed visual consistency across complex Templates and Pages, allowing the engineering team to scale the platform effortlessly without accumulating design debt."
  },

  section3: {
    label: "Result",
    heading: "Reduced Time-to-Care",
    content: "The platform streamlined user adoption by integrating WeChat account binding, enabling a modern medication experience. Patients benefited from quick remote consultations and fast medication delivery, while medical providers gained a patient management system that improved diagnostic efficiency and boosted their digital presence."
  },

  media1: "/projects/health-app-design/health-mp-1.webp",
  media2: "/projects/health-app-design/health-mp-3.1.webp",
  media3: "/projects/health-app-design/health-mp-2.webp",
  media4: "/projects/health-app-design/health-mp-4.webp",

  tags: [],
  metadata: [
    { label: "DURATION", value: "3 months" },
    { label: "YEAR", value: "2021" },
    { label: "ROLE", value: "UI Designer" },
    { label: "INDUSTRY", value: "HealthTech" },
  ]
};

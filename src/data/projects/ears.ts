import { ProjectData } from "../../types/project";

export const earsCaseStudy: ProjectData = {
  id: "ears",
  title: "Enterprise Finance Ecosystem",
  category: "Product Design",
  client: "Essex Lake Group",
  image: "/projects/ears/ears-cover-page.svg",
  
  heroHeading: "Executive Action and Response Solutions",
  heroImage: "/projects/ears/ears-cover-page.svg",
  heroVideo: "/projects/ears/EARS_video.webm",
  
  overview:
    "An AI-powered ecosystem that accelerates decision-making for financial leaders by turning complex analytics into execution-ready actions. It seamlessly connects an Apple-first mobile experience for the C-suite with a robust operational web hub for middle management, alongside scalable industry-specific solutions.",
  subOverview: "",

  testimonial: {
    quote: "Our data is powerful, but it lacks velocity. When I’m moving between meetings or traveling, I can't wait for a dense analyst report to load on a laptop. I need the bottom line and the next best action, instantly.",
    label: "Executive Client",
  },
  
  section1: {
    label: "Approach",
    heading: "Research & Constrained Agency",
    content: "Through client interviews with the design team, we found that our highly mobile executives overwhelmingly (80%+) preferred Apple devices. We combined this hardware reality with Constrained Agency—positioning AI as an analytical engine that surfaces insights, while the executive remains the ultimate decision-maker.",
  },

  section2: {
    label: "Solution",
    heading: "Ecosystem Tiering",
    content: "Centered on Instant Connectivity, Continuous Governance, and Domain-Specific Action Insights, the ecosystem features iPhone and Apple Watch apps for on-the-go executive execution, paired with a desktop Management Hub for middle management.",
  },

  section3: {
    label: "Result",
    heading: "Empowered Decision Making",
    content: 'Delivered a scalable, secure ecosystem that seamlessly connects middle management operations with high-speed executive execution. The products empowered leaders to confidently act on complex analyst insights. A prime example of this architecture is the built-in Retail Branch Workforce Planning solution for a Top-3 US Bank. Collaborating directly with analyst and software development teams, I delivered this dynamic workforce module to resolve a lack of granular staff planning. By integrating a novel "Teller Stress Index," the solution reduced task completion time by 40% and boosted banker sales calls by 40%. Furthermore, it increased overall service levels by 500 bps and brought the percentage of customers waiting over 5 minutes down to just 33%.',
  },

  media1: "/projects/ears/ears-mp-1.webm",
  media2: "/projects/ears/ears-mp-2.webp",
  media3: "/projects/ears/ears-mp-3.webp",
  media4: ["/projects/ears/ears-mp-4.1.webp", "/projects/ears/ears-mp-5.1.webp"],
    
  tags: [],
  metadata: [
    { label: "DURATION", value: "8 months" },
    { label: "YEAR", value: "2024 - 2025" },
    { label: "ROLE", value: "UX/UI Designer II" },
    { label: "INDUSTRY", value: "B2B Fintech" },
  ],

  content: [
    {
      type: "testimonial",
      quote:
        "Most platforms optimize for the platform. We designed one that communicates speed and approachability—the product's promise in visual form.",
      authorLabel: "DESIGN PHILOSOPHY",
    },
    {
      type: "media-full",
      mediaType: "image",
    },
    {
      type: "text",
      title: "Overview",
      heading: "Healthcare,\nRedesigned",
      content: "Legent Health needed a brand that communicates care, expertise, and modernity. We built a comprehensive identity from logo to digital presence — ensuring every patient touchpoint reflects the quality of care they provide.",
      subContent: "Healthcare branding that feels warm and human, not cold and clinical."
    },
    {
      type: "media-two-cols",
      mediaType1: "image",
      mediaType2: "image",
    },
    {
      type: "media-full",
      mediaType: "image",
    }
  ],
  
  nextProject: {
    id: "ev-charging-platform",
    title: "EV Charging Platform"
  }
};

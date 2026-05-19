import { ProjectData } from "../../types/project";

export const evChargingPlatformCaseStudy: ProjectData = {
  id: "ev-charging-platform",
  title: "EV Charging Platform",
  category: "Product Design",
  client: "Agent Zero",
  image: "/projects/ev-charging-platform/cover-page-1.png",
  
  heroHeading: "EV Charging\nPlatform",
  heroImage: "/projects/ev-charging-platform/cover-hero-page-1.png",
  
  overviewHeading: "Global Scalability\nand Deep Localization",
  overview: "A multi-market UX strategy, designing a suite of smart EV charging applications, EV 365, E boost, and Hydra, for a single enterprise client. Spanning the EU (Poland) and Southeast Asian (Vietnam) markets, the project required balancing a unified technical infrastructure with deep local adaptations in mapping, billing, and device management.",
  
  testimonial: {
    quote: "We need to expand our smart charging infrastructure internationally, but a one-size-fits-all app won't work. We need a core platform that meets strict EU usability standards while simultaneously adapting to the unique payment structures, mapping needs, and user behaviors of the Vietnamese market.",
    label: "Problem Statement"
  },

  section1: {
    label: "Approach",
    heading: "Modular Localization",
    content: "To scale the client’s smart charging network across distinct global regions, I adopted a modular design strategy. I focused on establishing a core, efficient interface that could support deep localization, seamlessly accommodating the vastly different mapping ecosystems, service fee models, and behavioral expectations between European and Southeast Asian users."
  },

  section2: {
    label: "Solution",
    heading: "Market-Specific Execution",
    content: "I designed three distinct yet cohesive applications. For the EU market, EV 365 features a clean interface compliant with local standards, integrating Google Maps, alternative regional navigation, and an intuitive billing system. For Vietnam, Eboost and Hydra introduce custom homepage layouts, specialized parking and service fee displays, and robust real-time device management tools perfectly optimized for local charging habits."
  },

  section3: {
    label: "Result",
    heading: "Multi-Market Product Strategy",
    content: "I successfully delivered a highly adaptable EV software ecosystem that empowered the client's international expansion. By blending a unified smart-equipment architecture with deeply localized front-end user experiences, the platform ensures intuitive, high-speed charging reservations and payments across two vastly different global markets."
  },

  tags: [],
  metadata: [
    { label: "DURATION", value: "4 months" },
    { label: "YEAR", value: "2020" },
    { label: "ROLE", value: "UI Designer" },
    { label: "INDUSTRY", value: "E-Mobility & CleanTech" },
  ],

  content: [
    {
      type: "media-full",
      mediaType: "image",
    }
  ],
  media1: "/projects/ev-charging-platform/ev-mp-1.webp",
  media2: "/projects/ev-charging-platform/ev-mp-2.webp",
  media3: "/projects/ev-charging-platform/ev-mp-3.webp",
  media4: "/projects/ev-charging-platform/ev-mp-4.webp",
  
  nextProject: {
    id: "biotopia-digital-experience",
    title: "Biotopia Digital Experience"
  }
};

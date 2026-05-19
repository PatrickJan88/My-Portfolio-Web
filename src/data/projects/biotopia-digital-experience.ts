import { ProjectData } from "../../types/project";

export const biotopiaDigitalExperienceCaseStudy: ProjectData = {
  id: "biotopia-digital-experience",
  title: "Biotopia: End-to-End Service Blueprint",
  category: "Research & Design",
  client: "Biotopia",
  image: "/projects/biotopia-digital-experience/bio-cover-page.webp",
  
  heroHeading: "Unified Museum\nService",
  heroImage: "/projects/biotopia-digital-experience/bio-cover-hero-page.webp",
  
  overview: "An overarching Service Design blueprint was created to transform the Uppsala Biotopia museum experience. This connected journey spans targeted offline marketing (posters, reward stickers, and customized animal-themed badges). A web-based pixel art mini-game that promotes knowledge sharing and offers rewards to encourage visitor engagement and offline visits to the museum to collect the gifts. The plan also includes a core mobile app that provides an outdoor exploration map and continues the online experience. To support these initiatives, a backend Content Management System (CMS) has been implemented to streamline daily staff operations",
  
  testimonial: {
    quote: "Following client introductory sessions and an initial museum visit, identified four critical business constraints: a limited budget, low physical and online awareness, limited physical space inside the museum, and a narrow demographic (primarily families with kids aged 3-5)",
    label: "Problem Statement",
  },

  section1: {
    label: "Approach",
    heading: "Ideation Workshop & Triangulated Research",
    content: "Through collaborative workshops, established an O2O (Online-to-Offline) acquisition strategy validated by mixed-methods research (observations, surveys, interviews, and staff feedback). This informed a phased rollout: Launched a pilot campaign using physical posters at Uppsala University to drive digital-to-physical museum visits. Once validated, this O2O loop is designed to scale city-wide, targeting outdoor community areas and nature hotspots that align perfectly with the app’s outdoor exploration features."
  },

  section2: {
    label: "Design Process",
    heading: "Human-in-the-Loop AI Prototyping",
    content: "To navigate budget constraints, I used AI as an accelerator while maintaining strict human supervision:\n\n• Embedded the initial digital experience directly into the museum’s existing website, requiring zero extra development effort.\n\n• When user testing revealed an AI-drafted quiz was unengaging, human intervention drove a strategic pivot to an interactive pixel art mini-game.\n\n• AI-generated drafts of physical rewards (Stickers, badges, and posters) allowed for immediate client buy-in, securing enthusiastic feedback.\n\n• To bypass indoor capacity limits, I designed outdoor mobile exploration maps, effectively turning the city into an extension of the museum."
  },

  section3: {
    label: "Result",
    heading: "Staff Validation & AI Learnings",
    content: "The presentation to the Biotopia staff received very positive feedback, validating the blueprint as a viable, low-cost strategy to attract a wider demographic and bypass physical space constraints. During the review, staff also caught a minor AI hallucination in the physical assets (an inaccurate owl feather color). This valuable critique reinforced the absolute necessity of strict human oversight and domain-expert iteration when integrating AI into the design workflow."
  },

  media1: "/projects/biotopia-digital-experience/bio-mp-1.webm",
  media2: "/projects/biotopia-digital-experience/bio-mp-2.webp",
  media3: "/projects/biotopia-digital-experience/bio-mp-3.webp",
  media4: ["/projects/biotopia-digital-experience/bio-mp-4.webp", "/projects/biotopia-digital-experience/bio-mp-5.webp"],

  tags: [],
  metadata: [
    { label: "DURATION", value: "2 months" },
    { label: "YEAR", value: "2026" },
    { label: "ROLE", value: "Service Designer" },
    { label: "INDUSTRY", value: "Museum (HCI Research)" },
  ]
};

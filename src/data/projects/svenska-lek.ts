import { ProjectData } from "../../types/project";

export const svenskaLekCaseStudy: ProjectData = {
  id: "svenska-lek",
  title: "Svenska Lek",
  category: "Product Design",
  client: "Svenska Lek",
  image: "/projects/svenska-lek/sl-cover-page.webp",
  
  heroHeading: "An AI-Native Product Experiment",
  heroImage: "/projects/svenska-lek/sl-cover-hero-page.webp",
  
  overview:
    "Svenska Lek is an interactive learning platform designed to help international learners build practical Swedish language skills through daily practice, listening exercises, vocabulary reinforcement, and AI-assisted learning experiences.\n\nBeyond the product itself, Svenska Lek served as an experiment to validate a broader question: Can a single product designer leverage a multi-agent AI workflow to rapidly research, architect, build, and ship a high-quality digital product? The project became a test of how product thinking, UX strategy, and AI collaboration could be combined to accelerate end-to-end product development.",
  subOverview: "",

  testimonial: {
    quote: "Validate whether a single product designer could use a multi-agent AI workflow to rapidly architect, build, and ship a high-quality educational platform from scratch.",
    label: "The Goal",
  },
  
  section1: {
    label: "Approach",
    heading: "Product Blueprint Before AI Execution",
    content: "One of the most important lessons from this project was that successful AI-assisted development begins with strong product thinking. Before any implementation, I defined the product vision, user journeys, feature priorities, technical architecture, and success criteria.\n\nI established clear guardrails for both design and development, including the frontend framework, backend infrastructure, third-party integrations, and testing strategy. By creating a detailed product blueprint first, AI tools could operate within a structured system rather than generating isolated solutions, resulting in faster iteration and more consistent outcomes.",
  },

  section2: {
    label: "Execution",
    heading: "Multi-Agent Product Development Workflow",
    content: "I orchestrated a human-led, multi-agent AI workflow that combined strategic planning, design system generation, development, and quality assurance. Product requirements were refined through iterative discussions with multiple AI models, allowing ideas to be challenged, compared, and strengthened before implementation.\n\nOnce the product specification was finalized, I translated the documentation into visual architecture, including sitemaps, design foundations, and component structures. This created a shared blueprint that accelerated development and reduced ambiguity during implementation.\n\nDevelopment was completed through an AI-assisted workflow spanning rapid prototyping, debugging, testing, and deployment. Throughout the process, version control and human review ensured quality, maintainability, and alignment with the original product vision.",
  },

  section3: {
    label: "Result",
    heading: "Validating AI-Assisted Product Creation",
    content: "Svenska Lek successfully demonstrated that AI can significantly accelerate product development when guided by clear strategy, structured workflows, and strong UX foundations. The platform received positive feedback from international learners studying Swedish and validated several assumptions around AI-assisted learning experiences.\n\nMore importantly, the project proved that effective AI-driven product creation is not simply about generating code. The quality of the outcome depended on product thinking, system design, and human decision-making. By combining UX methodology with AI execution, I was able to transform an idea into a functioning product while establishing a repeatable framework for future AI-native product development.",
  },

  media2: "/projects/svenska-lek/sl-mp-2.webp",
  media3: "/projects/svenska-lek/sl-mp-3.webp",
    
  tags: [],
  metadata: [
    { label: "DURATION", value: "10 days" },
    { label: "YEAR", value: "2025" },
    { label: "ROLE", value: "Product Designer" },
    { 
      label: "LINKS", 
      value: "", 
      links: [
        { label: "Live Demo", url: "https://svenskalek.vercel.app/" },
        { label: "GitHub Repository", url: "https://github.com/PatrickJan88/svenskalek-v3.0.git" }
      ]
    },
  ],

  content: [],
  
  nextProject: {
    id: "icon-archive",
    title: "Icon Archive"
  }
};

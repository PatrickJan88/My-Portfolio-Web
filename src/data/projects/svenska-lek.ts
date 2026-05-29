import { ProjectData } from "../../types/project";

export const svenskaLekCaseStudy: ProjectData = {
  id: "svenska-lek",
  title: "Svenska Lek",
  category: "Product Design",
  client: "Svenska Lek",
  image: "/projects/svenska-lek/sl-cover-page.webp",
  
  heroHeading: "A Personal AI Exploration",
  heroImage: "/projects/svenska-lek/sl-cover-hero-page.webp",
  
  overview:
    "Svenska Lek is an interactive web application for Swedish language learners. More importantly, it is a personal product exploration designed to test and validate my AI workflow and the concept of Vibecoding. The practice of building and shipping software entirely through natural language and AI agents.",
  subOverview: "",

  testimonial: {
    quote: "Validate whether a single product designer could use a multi-agent AI workflow to rapidly architect, build, and ship a high-quality educational platform from scratch.",
    label: "The Goal",
  },
  
  section1: {
    label: "Approach",
    heading: "Blueprinting for AI Quality",
    content: "Through this project, I learned a critical lesson about vibecoding: AI only generates high-quality code if the product thinking is rigorous. Before writing a single AI prompt, I explicitly defined the tech stack, requiring Tailwind CSS and specialized UI libraries for the frontend, Netlify for the backend/hosting, and Google APIs (Translation and Text-to-Speech) to power core features like a simulated daily Swedish podcast. By mapping out the user flows and defining the strict testing strategy first, this blueprint provided the AI with clear, undeniable guardrails.",
  },

  section2: {
    label: "Execution",
    heading: "The Multi-Agent Workflow",
    content: "• I applied a multi-agent AI workflow to develop Svenska Lek from concept to deployment. Starting with sketches and MVP ideas, I refined the direction, learning experience, feature priorities, and technical feasibility through discussions with Google Gemini.\n\n• After establishing the initial product specification, I developed a collaborative AI review system using Gemini, Claude, and ChatGPT. By comparing outputs and synthesizing the best ideas, I created a structured product blueprint while retaining control over the final direction.\n\n• I imported the finalized product documentation into Relume AI to quickly generate the sitemap, style guide, and design system structure, converting textual architecture into visual architecture for better alignment and communication during development with Bolt.new.\n\n• I used Bolt.new and Cursor to speed up front-end implementation, debugging, and QA, while managing version control with GitHub. This streamlined workflow enabled rapid prototyping, safe iteration, and efficient deployment to Netlify, helping me maintain a scalable, AI-driven development process.",
  },

  section3: {
    label: "Result",
    heading: "Validating Product Thinking",
    content: "This project effectively validated my AI workflow and received positive feedback from individuals in similar situations, such as international students studying in Sweden. It proved that vibe coding is not simply chatting with an AI; it requires strong product thinking. I brought together UX blueprinting and quick AI execution to create a useful product for language learners.",
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
        { label: "Live Demo", url: "https://papaya-cat-9382bf.netlify.app" },
        { label: "GitHub Repository", url: "https://github.com/PatrickJan88/svenskalek-v2.0.1.git" }
      ]
    },
  ],

  content: [],
  
  nextProject: {
    id: "icon-archive",
    title: "Icon Archive"
  }
};

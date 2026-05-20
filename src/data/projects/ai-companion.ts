import { ProjectData } from "../../types/project";

export const aiCompanionCaseStudy: ProjectData = {
  id: "ai-companion",
  title: "Dual-Persona AI",
  category: "Research & Design",
  client: "Confidential",
  image: "/projects/ai-companion/ai-companion-cover-page.webp",
  
  heroHeading: "Dual-Persona AI",
  heroImage: "/projects/ai-companion/ai-companion-cover-hero-page.webp",
  
  overviewHeading: "From App to Social Robot",
  overview: "Designed to support international students in Sweden, this project began as a dual-purpose mobile app offering both administrative guidance and emotional support. To deeply evaluate these interactions in a physical space, the project evolved into an advanced Human-Robot Interaction (HRI) study using the Furhat robotics platform to test user trust and engagement across both scenarios.",
  
  tags: [],
  metadata: [
    { label: "DURATION", value: "2 months" },
    { label: "YEAR", value: "2026" },
    { label: "ROLE", value: "UX Designer & HRI Researcher" },
    { label: "INDUSTRY", value: "Human-Robot Interaction (HRI) & EdTech" },
  ],

  media1: "/projects/ai-companion/ai-companion-mp-1.webm",
  media2: "/projects/ai-companion/ai-companion-mp-2.webp",
  media3: "/projects/ai-companion/ai-companion-mp-3.webp",
  media4: ["/projects/ai-companion/ai-companion-mp-4.webp", "/projects/ai-companion/ai-companion-mp-5.webp"],

  testimonial: {
    quote: "Moving to a new country creates two distinct burdens for international students: complex administrative tasks and emotional isolation. Existing support systems usually address only one of these issues, leaving students overwhelmed and lacking comprehensive support. Generic language models can struggle with \"context collapse,\" using the wrong tone for different situations and risking inaccurate information in critical tasks. Furthermore, a 2D text box lacks the physical presence needed to build trust and provide genuine empathetic support.",
    label: "Problem Statement"
  },

  section1: {
    label: "Approach",
    heading: "Python, Data, and HRI Prototyping",
    content: "The project was structured in two distinct phases to ensure a strong design strategy. First, I developed the \"Admin Companion\" and \"Emo Companion\" user flows for a digital mobile application. To gain deeper behavioral insights, our research team extended this digital foundation into the physical world. Using Python scripts and the Furhat platform, we transformed the app's conversational logic into a physical social robot, allowing us to conduct real-time data analysis on how international students interacted with the dual personas."
  },

  section2: {
    label: "Design Concept",
    heading: "Segmented Interaction Architecture",
    content: "To ensure the AI could handle distinct user needs without causing confusion, we built a carefully segmented interaction model that worked across both the app and the robot:\n\n• Admin Companion Flow: Focused on efficiency and direct answers. This flow helped users process data for practical tasks like university enrollment or local registrations.\n\n• Emo Companion Flow: Prioritized empathy, active listening, and a calm conversational pace to help students navigate homesickness or academic stress.\n\n• Platform Agnostic: By cleanly separating these logical flows, the core architecture was easily mapped from a 2D mobile screen to a 3D physical robot face."
  },

  section3: {
    label: "Result",
    heading: "Evaluating Dual-Purpose Trust",
    content: "The research successfully proved that a dual-purpose architecture can address both practical and emotional needs effectively. The study revealed key insights into how international students build trust with AI companions, showing that clearly separating the \"administrative\" and \"emotional\" workflows improves overall user acceptance. Ultimately, this project demonstrates a scalable strategy for evolving digital AI assistants into physical, conversational agents."
  },

  content: [
    {
      type: "media-full",
      mediaType: "image",
    }
  ]
};

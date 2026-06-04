import { ProjectData } from "../../types/project";

export const aiCompanionCaseStudy: ProjectData = {
  id: "ai-companion",
  title: "Dual-Persona AI",
  category: "Research & Design",
  client: "Confidential",
  image: "/projects/ai-companion/ai-companion-cover-page.webp",
  
  heroHeading: "Dual-Persona AI",
  heroImage: "/projects/ai-companion/ai-companion-cover-hero-page.webp",
  
  overviewHeading: "Supporting International Student Adaptation",
  overview: "International students face two simultaneous challenges when arriving in a new country: navigating unfamiliar administrative systems and adapting to social and emotional change. Existing support services often address these needs separately, creating fragmented experiences during an already stressful transition.\n\nThis project explored how a dual-purpose AI companion could support both contexts through a single interaction framework. Beginning as a mobile application concept and evolving into a Human-Robot Interaction (HRI) study using the Furhat platform, the project investigated how embodied AI can reduce cognitive load, build trust, and support student well-being during the adaptation process.",
  
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
    heading: "Conversational Design & HRI Evaluation",
    content: "The project was developed through an iterative design and research process. First, I developed the \"Admin Companion\" and \"Emo Companion\" user flows for a digital mobile application.  An Administrative Companion focused on practical guidance, and an Emotional Companion focused on well-being and reassurance. To evaluate how embodiment influences user perception, the interaction model was implemented on the Furhat social robot platform using Python-based conversational logic. Through surveys, interviews, and in-person observation, we investigated how users responded to different conversational roles, measuring cognitive load, trust, comfort, and perceived dependency."
  },

  section2: {
    label: "Design Concept",
    heading: "Context-Aware AI Roles",
    content: "A key design challenge was preventing conversational context collapse, where the same AI adopts conflicting tones across different situations. To address this, I designed two clearly separated interaction roles.\n\nThe Administrative Companion provided structured, step-by-step guidance for tasks such as university onboarding and public-service registration. The Emotional Companion used active listening, reassurance, and light conversational support to address feelings of uncertainty, stress, and isolation.\n\nBy maintaining distinct behavioral boundaries, the system created more predictable interactions and helped users understand what type of support to expect in different contexts."
  },

  section3: {
    label: "Result",
    heading: "Key Insights for Embodied AI Support",
    content: "The study revealed that verbal guidance delivered through an embodied conversational agent can significantly reduce the mental effort associated with complex administrative tasks, particularly for users who prefer auditory learning. Participants consistently favored spoken, step-by-step guidance over navigating dense information independently.\n\nThe research also highlighted important design considerations for future AI companions. Emotional support interactions required strong privacy safeguards, while unnatural conversational behaviors, such as repetitive responses, reduced trust and created discomfort. Most importantly, participants indicated that AI companions should not replace human relationships. Instead, they should act as a safe environment for practicing social interactions, building confidence, and supporting integration into real-world communities.\n\nThese findings contribute practical design recommendations for future AI-powered support systems spanning mobile, conversational, and robotic interfaces."
  },

  content: [
    {
      type: "media-full",
      mediaType: "image",
    }
  ]
};

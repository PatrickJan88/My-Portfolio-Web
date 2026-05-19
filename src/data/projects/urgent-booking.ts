import { ProjectData } from "../../types/project";

export const urgentBookingCaseStudy: ProjectData = {
  id: "urgent-booking",
  title: "Urgency-Responsive Travel Scaffolding",
  category: "Research & Design",
  client: "Confidential",
  image: "https://images.unsplash.com/photo-1549416878-b9ca95e1bbbb?q=80&w=1000&auto=format&fit=crop",
  
  heroHeading: "Urgency-Responsive\nTravel Scaffolding",
  heroImage: "https://images.unsplash.com/photo-1549416878-b9ca95e1bbbb?q=80&w=1600&auto=format&fit=crop",
  
  overviewHeading: "Urgency-Responsive UX & Cognitive Relief",
  overview: "This Research through Design (RtD) project explores the tension between algorithmic efficiency and user trust in high-urgency scenarios. By developing \"Urgency-Responsive Scaffolding,\" the research demonstrates how voluntary interface constraints can provide cognitive relief while maintaining user confidence.",
  
  tags: [],
  metadata: [
    { label: "DURATION", value: "1 month" },
    { label: "YEAR", value: "2025" },
    { label: "ROLE", value: "UX Researcher & Designer" },
    { label: "INDUSTRY", value: "Travel (HCI Research)" },
  ],

  testimonial: {
    quote: "Modern travel apps use recommender systems that assume users have unlimited time to explore infinite choices, which causes choice overload and decision paralysis in urgent situations. Conversely, forcing users into full AI automation triggers a fear of financial loss and distrust due to a lack of transparency.",
    label: "Problem Statement",
  },

  section1: {
    label: "Approach",
    heading: "Mixed-Methods & Comparative Testing",
    content: "Using the Research through Design methodology , I created a high-fidelity travel app prototype featuring three distinct states: a standard exploration mode, a full AI automation mode, and a constrained agency mode. To evaluate these, I recruited 5 international students—frequent travelers across the EU—for a simulated high-urgency booking scenario. The evaluation employed qualitative comparative testing , concurrent think-aloud protocols, an online survey questionnaire, and semi-structured interviews featuring 3 targeted open-ended questions. To ensure users retained control, the system utilized a manual toggle and \"Just-in-Time Prompts\" allowing them to voluntarily transition between modes and preserve their autonomy."
  },

  section2: {
    label: "Concept",
    heading: "Scalable Design Concept",
    content: "To resolve the tension between decision paralysis and algorithmic distrust, I deployed a scalable \"Constrained Agency\" architecture:\n\n• Defensible Constraints: Restricts choices to three transparent options (Smart Balance, Cheapest, Closest) to provide cognitive relief while maintaining trust.\n\n• Preserved Autonomy: A persistent toggle allows users to instantly revert to the default exploration view.\n\n• Substantive Scalability: This framework extends seamlessly into complex domains like FinTech, where it can synthesize massive data overloads into actionable executive dashboards."
  },

  section3: {
    label: "Result",
    heading: "Validated \"Strong Concept\"",
    content: "Validated using Höök & Löwgren's \"Strong Concept\" framework, the constrained agency model successfully bridged the gap between efficiency and user trust. Testing proved that limiting options provided crucial cognitive relief and psychological safety, contrasting sharply with the user rejection of \"black box\" full automation. Ultimately, this urgency-responsive scaffolding serves as a substantive, generative model for balancing algorithmic power with human agency across a wide spectrum of high-stakes interface designs."
  },

  content: [
    {
      type: "media-full",
      mediaType: "image",
    }
  ]
};

import { ProjectData } from "../../types/project";

export const agentZeroCaseStudy: ProjectData = {
  id: "agent-zero",
  title: "Agent Zero",
  category: "Autonomous Systems",
  client: "Agent Zero",
  image: "https://images.unsplash.com/photo-1620825937374-87fc1d6aafc8?q=80&w=1000&auto=format&fit=crop",
  
  heroHeading: "Autonomous\nSystems",
  heroImage: "https://images.unsplash.com/photo-1620825937374-87fc1d6aafc8?q=80&w=1600&auto=format&fit=crop",
  
  overview: "Creating autonomous systems for the future...",
  subOverview: "Sub overview text goes here...",
  
  tags: [],
  metadata: [
    { label: "DURATION", value: "3 months" },
    { label: "ROLE", value: "Lead Designer" },
    { label: "INDUSTRY", value: "AI" },
  ],

  content: [
    {
      type: "media-full",
      mediaType: "image",
    }
  ],
  
  nextProject: {
    id: "essex-web",
    title: "Essex Corporate Website"
  }
};

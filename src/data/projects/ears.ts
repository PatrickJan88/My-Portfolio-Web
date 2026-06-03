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
    "Modern enterprises generate vast amounts of operational, financial, and governance data, yet executives often struggle to convert fragmented reports into timely action. Critical decisions were slowed by disconnected systems, manual reporting processes, and an over-reliance on data interpretation meetings.\n\nAs part of the product design team, I helped design an AI-powered enterprise ecosystem that transforms complex analytics into actionable insights for executives and operational leaders. The platform connects executive mobile experiences with management control centers, enabling organizations to move from reactive reporting to proactive decision-making.",
  subOverview: "",

  testimonial: {
    quote: "Our data is powerful, but it lacks velocity. When I’m moving between meetings or traveling, I can't wait for a dense analyst report to load on a laptop. I need the bottom line and the next best action, instantly.",
    label: "Client Problem Statement",
  },
  
  section1: {
    label: "Approach",
    heading: "Designing for Executive Action",
    content: "Working closely with clients, analysts, product stakeholders, and engineering teams, we discovered that senior leaders required immediate access to business-critical information while remaining highly mobile. Research revealed a strong preference for Apple devices among executive users, influencing our multi-device strategy across iPhone, Apple Watch, and desktop experiences.\n\nRather than replacing human judgment, we adopted a human-in-command design philosophy. In this approach, AI highlights risks, opportunities, and recommendations, while our team of data analysis experts contributes their domain expertise and insights. Together, they convert this information into smart insights and actionable tickets, ensuring that decision-making authority remains with business leaders. This strategy fosters trust, transparency, and accountability within highly regulated financial environments, while ensuring that humans supervise the results at all times.",
  },

  section2: {
    label: "Solution",
    heading: "A Connected Enterprise Intelligence Ecosystem",
    content: "The solution unified fragmented data sources into a single decision-support ecosystem built around three core principles: Instant Connectivity, Continuous Governance, and Domain-Specific Action Insights.\n\nI contributed to the design of executive mobile experiences, management dashboards, operational workflows, and data visualization systems that transformed complex enterprise analytics into clear, action-oriented experiences. The ecosystem enabled leaders to monitor performance, identify anomalies, investigate root causes, and execute decisions across multiple business domains from a unified platform.",
  },

  section3: {
    label: "Result",
    heading: "From Data Discovery to Business Action",
    content: 'The platform enabled executives and operational teams to significantly reduce time spent gathering and interpreting information, shifting focus toward decision-making and execution. By connecting AI-powered insights with operational workflows, organizations gained greater visibility, accountability, and responsiveness across key business functions.\n\nOne notable implementation was a workforce planning solution developed for a Top-3 U.S. bank. Collaborating closely with analysts and software engineers, I helped design a workforce optimization experience that introduced a Teller Stress Index to identify staffing bottlenecks and operational risks. The solution reduced task completion time by 40%, increased banker sales-call activity by 40%, improved service levels by 500 basis points, and reduced the percentage of customers waiting longer than five minutes to approximately 33%.\n\nThis project demonstrated how thoughtful UX design can bridge enterprise AI, operational analytics, and executive decision-making to deliver measurable business outcomes at scale.',
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

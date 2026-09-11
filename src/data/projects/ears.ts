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
  overviewMedia: "/projects/ears/ears-reel-720p2.webm",
  imageComparison: {
    backSrc: "/projects/ears/Comparing Image Landing Page New.webp",
    frontSrc: "/projects/ears/Comparing Image Landing Page.webp",
    backAlt: "Comparing Image Landing Page New",
    frontAlt: "Comparing Image Landing Page",
    leftSrc: "/projects/ears/Comparing Image Landing Page.webp",
    rightSrc: "/projects/ears/Comparing Image Landing Page New.webp",
    leftAlt: "Comparing Image Landing Page",
    rightAlt: "Comparing Image Landing Page New",
    aspectRatio: "aspect-[4/3]",
  },

  testimonial: {
    quote: "Our data is powerful, but it lacks velocity. When I’m moving between meetings or traveling, I can't wait for a dense analyst report to load on a laptop. I need the bottom line and the next best action, instantly.",
    label: "Client Problem Statement",
  },
  
  eyeAsk: {
    label: "EyeAsk",
    heading: "Conversational Intelligence in Context",
    media: "/projects/ears/eyeask-video-1080p.webm",
    content:
      "EyeAsk is the conversational AI capability I primarily contributed to within the platform, embedded directly into the dashboard to give executives a more natural way to interact with enterprise data. Powered by private, domain-trained Large Language Models (LLMs) for financial and insurance contexts, EyeAsk understands natural-language questions and maintains context across conversation turns. Users can ask follow-up questions without repeatedly explaining the context, while responses can be returned as structured narratives, visualizations, or both, following the organization’s preferred reporting format. The solution was designed around data security, privacy, and regulatory requirements in highly regulated industries. The conversational interface was therefore connected to a built-in execution environment, allowing users to move from asking questions to interpreting and working with enterprise data within the same experience. EyeAsk achieved 78.6% accuracy on long-format data and 81.8% on wide-format data during testing.",
  },

  section1: {
    label: "Beyond the Dashboard",
    heading: "Extending the Executive Experience",
    content:
      "The mobile experience extends the enterprise system beyond the main iPad interface, giving executives continuous access to important business signals wherever they are.\n\nThe iPhone application provides a lightweight view of alerts, warnings, anomaly scan results, smart insights, and reminders, while the Apple Watch acts as an always-available layer for receiving critical messages, alerts, anomaly results, and task reminders.\n\nTogether, these connected experiences help executives stay informed, monitor changes, and respond quickly without needing to return to the full dashboard.",
  },

  section2: {
    label: "EyeVia",
    heading: "Built for Daily Operations",
    content:
      "EyeVia is the web-based experience designed for middle-level managers and operational teams. It provides deeper access to the domain-specific solutions that clients licensed and customized around their business models and operational contexts. We made these solutions more visible and easier to switch between, helping managers move faster through their daily analysis and management workflows. Underneath the experience, shared AI engines power capabilities such as anomaly detection, forecasting, and intelligent analysis across solutions.\n\nThis created a connected product ecosystem with different levels of interaction: executives get fast, actionable awareness; managers get deeper domain-specific tools for daily operations.",
  },

  designIteration: {
    label: "Design Iteration",
    heading: "From Solutions to Action",
    content:
      "When I joined the project, the dashboard was primarily solution-centered. Financial solutions occupied the main experience, while alerts, anomaly analysis, forecasting, and action-ticket tracking were secondary. As we gained more user interviews, usage data, and remote and on-site contextual observations, the design direction began to change. Our design team also interviewed leaders within our own company, including the CEO, to compare what executives said they needed with how they actually worked. One key insight was that executives were constantly on the go. They did not need every data point or detailed drill-down. They needed a quick overview, domain-expert interpretation, and a clear understanding of what happened, why it mattered, and what to do next.\n\nBased on these insights, we redesigned the dashboard around anomalies, alerts, forecasting, actionable insights, and ticket tracking, supported by an AI-powered real-time personal analyst. Detailed financial solutions moved to the sidebar, keeping them accessible without competing with the executive workflow.\n\nThe design shifted from solution-centered to action-centered, combining AI analysis with human domain expertise so executives could quickly understand key KPIs, assign tasks, and stay connected while on the go.",
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
    { label: "DURATION", value: "3 years" },
    { label: "YEAR", value: "2022 - 2025" },
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
    id: "corporate-website-redesign",
    title: "Corporate Website Redesign"
  }
};

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
    "Modern enterprises generate vast amounts of operational, financial, and governance data, yet converting fragmented information into timely business action remains a challenge. Disconnected systems, manual reporting, and reliance on analyst-led interpretation can slow decision-making and operational responses.\n\nAt Essex Lake Group, a financial consulting and technology company, I contributed to an AI-powered enterprise ecosystem that combined domain expertise, advanced analytics, and digital solutions to address complex business challenges.\n\nWorking alongside consultants, data analysts, product stakeholders, and software engineers, I helped translate client-specific business requirements into actionable digital experiences for executives and operational teams. The ecosystem connects executive decision-making with daily operational management, supporting a shift from reactive reporting to proactive business action.",
  subOverview: "",
  overviewMedia: "/projects/ears/ears-reel-720p2.webm",
  overviewMediaLabel: "Concept Explorations",
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
    media: "/projects/ears/eyeask-video-1080p2.webm",
    content:
      "EyeAsk is an embedded conversational AI capability designed to help executives interact with complex enterprise data through natural-language questions.\n\nMy primary contribution focused on the conversational experience, response structure, and presentation of analytical insights, helping users move from asking business questions to interpreting and acting on the results.\n\nThe system uses domain-specific Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) to ground responses in client-specific enterprise knowledge, supporting more relevant financial and operational data interpretation.\n\nEyeAsk maintains conversational context across follow-up questions and presents responses through structured narratives, data visualizations, or both. Its integration within the enterprise platform connects conversational analytics with existing business workflows.\n\nDuring testing, EyeAsk achieved 78.6% accuracy on long-format data and 81.8% on wide-format data.",
  },

  section1: {
    label: "Beyond the Dashboard",
    heading: "Extending the Executive Experience",
    content:
      "The mobile experience extends the enterprise system beyond the main iPad interface, giving executives continuous access to important business signals wherever they are.\n\nThe iPhone application provides a lightweight view of alerts, warnings, anomaly scan results, smart insights, and reminders, while the Apple Watch acts as an always-available layer for receiving critical messages, alerts, anomaly results, and task reminders.\n\nTogether, these connected experiences help executives stay informed, monitor changes, and respond quickly without needing to return to the full dashboard.",
  },

  section2: {
    label: "EyeVia",
    heading: "Enabling Data-Driven Operations",
    content:
      "EyeVia is the web-based enterprise platform designed for middle-level managers and operational teams. It provides deeper access to domain-specific financial solutions licensed by clients and customized around their business models, operational requirements, and analytical needs.\n\nOur design focused on making these solutions more accessible and easier to navigate, supporting daily analysis, performance monitoring, and operational management. Shared analytical capabilities, including anomaly detection, forecasting, and intelligent insights, support decision-making across different business functions.\n\nTogether, EARS and EyeVia create a connected enterprise ecosystem: executives gain actionable business awareness, while managers access specialized tools for analysis and operational execution.",
  },

  designIteration: {
    label: "Design Iteration",
    heading: "From Solutions to Action",
    content:
      "When I joined the project, the dashboard was primarily centered on financial solutions, while alerts, anomaly analysis, forecasting, and action ticket tracking remained secondary.\n\nThrough user interviews, usage data, contextual observations, and feedback from consulting teams, I collaborated with the design team to identify a gap between the existing product structure and executives' actual decision needs. I also participated in interviews with internal business leaders, including the CEO, to better understand executive workflows and priorities.\n\nOne key insight was that executives often needed to make decisions on the go, whether waiting for a flight, traveling between locations, attending meetings, or moving around the workplace. Rather than navigating detailed reports, they needed to quickly understand what was happening, why it mattered, what action was needed, and who was responsible.\n\nBased on these findings, I worked closely with the design team to redesign the dashboard around anomalies, alerts, forecasting, actionable insights, and ticket tracking, combining AI analytics with human domain expertise. Detailed financial solutions remained accessible through the sidebar without competing with the primary executive workflow.\n\nThis shift from presenting financial solutions to prioritizing business action aligned the product more closely with business priorities and executives' everyday needs.",
  },

  section3: {
    label: "Result",
    heading: "From Data Discovery to Business Action",
    content:
      "The enterprise ecosystem connected complex financial analytics with practical business workflows, helping executives and operational teams move from information discovery to decision-making and execution.\n\nOne notable example was the Retail Branch solution for a North American banking client. Collaborating with data analysts, consultants, and software engineers, I helped translate complex operational requirements into analytical interfaces supporting workforce planning, employee effectiveness, and customer experience. My design contributions included visualizing staffing bottlenecks, employee productivity, service levels, and operational risks to support management decisions.\n\nThe Retail Branch solution reported measurable business outcomes, including 12–15% OpEx Savings, an increase in daily banker sales calls from 12 to 18, a 500 basis point improvement in service levels, and a reduction in customers waiting longer than five minutes from 39% to 33%.\n\nThis project demonstrated how financial consulting expertise, advanced analytics, and human-centred design could work together to improve operational efficiency, customer experience, and business performance.",
  },

  resultMetricsTitle: "Retail branch · reported solution impact",
  resultMetrics: [
    {
      prefix: "+",
      target: 10,
      suffix: "%",
      label: "Revenue / Balance Growth",
      subLabel: "Business growth",
    },
    {
      prefix: "12–",
      from: 12,
      target: 15,
      suffix: "%",
      label: "OpEx Savings",
      subLabel: "Operating expense efficiency",
    },
    {
      prefix: "+",
      target: 50,
      suffix: "%",
      label: "Daily Sales Calls per Banker",
      subLabel: "Employee effectiveness",
    },
    {
      prefix: "−",
      target: 400,
      suffix: "\u00A0bps",
      label: "Volume Forecast Error",
      subLabel: "Operations planning",
    },
    {
      prefix: "+",
      target: 500,
      suffix: "\u00A0bps",
      label: "Service Level Improvement",
      subLabel: "Service performance",
    },
    {
      prefix: "39% → ",
      from: 39,
      target: 33,
      suffix: "%",
      label: "Customers Waiting Over 5 Minutes",
      subLabel: "In-branch customer experience",
    },
  ],

  media1: "/projects/ears/ears-mp-1.webm",
  media2: "/projects/ears/ears-mp-2.webp",
  media3: "/projects/ears/ears-mp-3.webp",
  media4: ["/projects/ears/ears-mp-4.1.webp", "/projects/ears/ears-mp-5.1.webp"],
    
  tags: [],
  metadata: [
    { label: "DURATION", value: "3 years" },
    { label: "YEAR", value: "2022 - 2025" },
    { label: "ROLE", value: "UI Designer II" },
    { label: "INDUSTRY", value: "Financial Technology & Consulting" },
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

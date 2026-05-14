import { ProjectData } from "../../types/project";

export const corporateWebsiteRedesignCaseStudy: ProjectData = {
  id: "corporate-website-redesign",
  title: "Corporate Website Redesign",
  category: "Web Design",
  client: "Essex Lake Group",
  image: "/projects/corporate-website-redesign/web-cover-page.webp",
  
  heroHeading: "Corporate\nRedesign",
  heroImage: "/projects/corporate-website-redesign/web-cover-hero-page.webp",
  
  overview: "A strategic redesign of a corporate website to align the digital presence with the innovative capabilities of the company's newly upgraded AI ecosystem. By adopting a \"high-tech\" aesthetic and a simplified, single-screen slide layout, the new site drastically improves user experience, making essential information immediately accessible while reinforcing the company's position as a leader in financial technology.",
  
  tags: [],
  metadata: [
    { label: "DURATION", value: "3 months" },
    { label: "YEAR", value: "2025" },
    { label: "ROLE", value: "UX/UI Designer II" },
    { label: "INDUSTRY", value: "B2B Fintech" },
  ],

  content: [
    {
      type: "media-full",
      mediaType: "video",
      media1: "/projects/corporate-website-redesign/web-mp-1.webm"
    },
    {
      type: "media-full",
      mediaType: "image",
      media1: "/projects/corporate-website-redesign/web-mp-2.webp"
    },
    {
      type: "media-full",
      mediaType: "image",
      media1: "/projects/corporate-website-redesign/web-mp-3.webp"
    }
  ],
  
  nextProject: {
    id: "health-app-design",
    title: "Health App Design"
  }
};

export interface ProjectTag {
  label: string;
  value: string;
}

export interface ProjectMetadata {
  label: string;
  value: string;
}

export interface ProjectSectionText {
  type: "text";
  title: string;
  heading: string;
  content: string;
  subContent?: string;
}

export interface ProjectSectionTestimonial {
  type: "testimonial";
  quote: string;
  authorLabel: string;
}

export interface ProjectSectionMediaFull {
  type: "media-full";
  mediaUrl?: string;
  mediaType: "image" | "video";
}

export interface ProjectSectionMediaTwoCols {
  type: "media-two-cols";
  mediaUrl1?: string;
  mediaType1: "image" | "video";
  mediaUrl2?: string;
  mediaType2: "image" | "video";
}

export type ProjectContentSection =
  | ProjectSectionText
  | ProjectSectionTestimonial
  | ProjectSectionMediaFull
  | ProjectSectionMediaTwoCols;

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  client: string;
  image: string;
  
  // Hero section
  heroHeading: string;
  heroImage: string;
  heroVideo?: string;
  
  // Overview section
  overview: string;
  subOverview: string;
  
  tags: ProjectTag[];
  metadata: ProjectMetadata[];
  
  // Dynamic Page Content (Sections after overview)
  content?: ProjectContentSection[];
  
  // Next Project
  nextProject?: {
    id: string;
    title: string;
  };
}

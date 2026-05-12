import { earsCaseStudy } from "./projects/ears";
import { agentZeroCaseStudy } from "./projects/agent-zero";
import { essexWebCaseStudy } from "./projects/essex-web";
import { legentHealthCaseStudy } from "./projects/legent-health";
import { mobileAppUxCaseStudy } from "./projects/mobile-app-ux";
import { aiCompanionCaseStudy } from "./projects/ai-companion";
import { urgentBookingCaseStudy } from "./projects/urgent-booking";

import { ProjectData } from "../types/project";
export type { ProjectData };

export const projectsData: ProjectData[] = [
  mobileAppUxCaseStudy,
  aiCompanionCaseStudy,
  urgentBookingCaseStudy,
  earsCaseStudy,
  agentZeroCaseStudy,
  essexWebCaseStudy,
  legentHealthCaseStudy
];

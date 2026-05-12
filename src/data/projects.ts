import { earsCaseStudy } from "./projects/ears";
import { agentZeroCaseStudy } from "./projects/agent-zero";
import { essexWebCaseStudy } from "./projects/essex-web";
import { legentHealthCaseStudy } from "./projects/legent-health";
import { mobileAppUxCaseStudy } from "./projects/mobile-app-ux";

import { ProjectData } from "../types/project";
export type { ProjectData };

export const projectsData: ProjectData[] = [
  earsCaseStudy,
  agentZeroCaseStudy,
  essexWebCaseStudy,
  legentHealthCaseStudy,
  mobileAppUxCaseStudy
];

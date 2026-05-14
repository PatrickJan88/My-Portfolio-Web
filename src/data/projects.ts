import { earsCaseStudy } from "./projects/ears";
import { evChargingPlatformCaseStudy } from "./projects/ev-charging-platform";
import { corporateWebsiteRedesignCaseStudy } from "./projects/corporate-website-redesign";
import { healthAppDesignCaseStudy } from "./projects/health-app-design";
import { biotopiaDigitalExperienceCaseStudy } from "./projects/biotopia-digital-experience";
import { aiCompanionCaseStudy } from "./projects/ai-companion";
import { urgentBookingCaseStudy } from "./projects/urgent-booking";

import { ProjectData } from "../types/project";
export type { ProjectData };

export const projectsData: ProjectData[] = [
  biotopiaDigitalExperienceCaseStudy,
  aiCompanionCaseStudy,
  urgentBookingCaseStudy,
  earsCaseStudy,
  evChargingPlatformCaseStudy,
  corporateWebsiteRedesignCaseStudy,
  healthAppDesignCaseStudy
];

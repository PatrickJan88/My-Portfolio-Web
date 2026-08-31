import { HeroSection } from "../components/sections/HeroSection";
import { ScrollServicesSection } from "../components/sections/ScrollServicesSection";
import { TextRevealSection } from "../components/sections/TextRevealSection";
import { MetricsSection } from "../components/sections/MetricsSection";
import { SeekrSection } from "../components/sections/SeekrSection";
import { CinematicVideoSection } from "../components/sections/CinematicVideoSection";
import { SelectedCasesSection } from "../components/sections/SelectedCasesSection";

export default function Home() {
  return (
    <div className="w-full flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />
      
      <div className="w-full flex flex-col">
        <TextRevealSection />

        {/* 2. Metrics Section */}
        <MetricsSection />

        {/* 3. Selected Cases Section with Dynamic Scroll-Driven Shader Background */}
        <SelectedCasesSection />

        {/* 4. Seekr Section (Interactive Demo) */}
        <SeekrSection />

        {/* 5. Pillars & Values (ScrollServicesSection) */}
        <ScrollServicesSection />

        {/* 6. Cinematic Video Reveal Section */}
        <CinematicVideoSection />
      </div>
    </div>
  );
}

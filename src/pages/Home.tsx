import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "../components/sections/HeroSection";
import { TextRevealSection } from "../components/sections/TextRevealSection";
import { MetricsSection } from "../components/sections/MetricsSection";
import { TripleDiamondSection } from "../components/sections/TripleDiamondSection";
import { SeekrSection } from "../components/sections/SeekrSection";
import { CinematicVideoSection } from "../components/sections/CinematicVideoSection";
import { FeaturedSlider } from "../components/ui/FeaturedSlider";
import { projectsData } from "../data/projects";
import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from '@/src/components/animate-ui/components/animate/cursor';

export default function Home() {
  const featuredWorksIds = ["biotopia-digital-experience", "ears", "corporate-website-redesign", "health-app-design"];
  const featuredWorks = featuredWorksIds.map(id => projectsData.find(p => p.id === id)).filter(Boolean) as typeof projectsData;

  return (
    <div className="w-full flex-1 flex flex-col">
      <HeroSection />
      
      <TextRevealSection />

      <MetricsSection />

      {/* Selected Featured Works Carousel */}
      <div className="relative w-full z-10 bg-[#1C1C1C] py-6 md:py-16 object-contain">
        <section className="w-full flex flex-col justify-center">
          <FeaturedSlider works={featuredWorks} />
        </section>
      </div>

      {/* Seekr Portfolio Section */}
      <SeekrSection />

      <TripleDiamondSection />

      {/* Cinematic On-Scroll Video Reveal Section */}
      <CinematicVideoSection />
    </div>
  );
}

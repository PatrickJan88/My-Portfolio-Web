import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "../components/sections/HeroSection";
import { InstantCamera } from "../components/ui/InstantCamera";
import { FeaturedSlider } from "../components/ui/FeaturedSlider";
import { FloatingScrapbook } from "../components/ui/FloatingScrapbook";
import { projectsData } from "../data/projects";

export default function Home() {
  const featuredWorksIds = ["biotopia-digital-experience", "ai-companion", "urgent-booking", "corporate-website-redesign"];
  const featuredWorks = featuredWorksIds.map(id => projectsData.find(p => p.id === id)).filter(Boolean) as typeof projectsData;

  return (
    <div className="w-full flex-1 flex flex-col">
      <HeroSection />

      {/* Selected Featured Works Carousel */}
      <div className="relative w-full z-10 bg-[#141414] py-24 object-contain">
        <section className="w-full flex flex-col justify-center">
          <FeaturedSlider works={featuredWorks} />
        </section>
      </div>

      {/* "Let's FIKA" Section */}
      <div className="relative w-full min-h-screen z-20 bg-[#FBFBFB] flex flex-col items-center justify-center py-24 px-6 md:px-12 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          <div className="mb-12 text-center relative z-40">
            <h2 className="text-5xl font-semibold tracking-tighter text-[#373737] uppercase leading-[0.9] mb-6 drop-shadow-sm font-sans">
              Captured Moments
            </h2>
          </div>

          <div className="relative z-40">
            <InstantCamera />
          </div>
        </div>
        <FloatingScrapbook />
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "../components/sections/HeroSection";
import { TripleDiamondSection } from "../components/sections/TripleDiamondSection";
import { InstantCamera } from "../components/ui/InstantCamera";
import { FeaturedSlider } from "../components/ui/FeaturedSlider";
import { FloatingScrapbook } from "../components/ui/FloatingScrapbook";
import { projectsData } from "../data/projects";
import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from '@/src/components/animate-ui/components/animate/cursor';

export default function Home() {
  const featuredWorksIds = ["biotopia-digital-experience", "svenska-lek", "ears", "corporate-website-redesign"];
  const featuredWorks = featuredWorksIds.map(id => projectsData.find(p => p.id === id)).filter(Boolean) as typeof projectsData;

  return (
    <div className="w-full flex-1 flex flex-col">
      <HeroSection />

      <TripleDiamondSection />

      {/* Selected Featured Works Carousel */}
      <div className="relative w-full z-10 bg-transparent py-6 md:py-16 object-contain">
        <section className="w-full flex flex-col justify-center">
          <FeaturedSlider works={featuredWorks} />
        </section>
      </div>

      {/* "Let's FIKA" Section */}
      <div className="relative w-full z-20 bg-[#FBFBFB] flex flex-col items-center justify-start pt-12 md:pt-16 pb-[300px] md:pb-[420px] px-6 md:px-12 overflow-hidden border-y border-black/5 min-h-[500px] md:min-h-[700px]">
        <CursorProvider>
          <Cursor className="text-black size-8" />
          <CursorFollow className="bg-black">Let&#39;s Fika</CursorFollow>
        </CursorProvider>
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          <div className="relative z-40 transform scale-75 md:scale-100 origin-top">
            <InstantCamera />
          </div>
        </div>
        <FloatingScrapbook />
      </div>
    </div>
  );
}

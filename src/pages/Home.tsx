import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectCard } from "../components/ui/ProjectCard";
import { InstantCamera } from "../components/ui/InstantCamera";

export default function Home() {
  const featuredWorks = [
    {
      id: "ears",
      title: "EARS™ Ecosystem",
      category: "Enterprise SaaS",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "nexus",
      title: "NexusOS",
      category: "Spatial Computing",
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "ev365",
      title: "EV 365",
      category: "Consumer Mobile",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop",
    }
  ];

  return (
    <div className="w-full flex-1 flex flex-col">
      <HeroSection />

      {/* Selected Featured Works Carousel */}
      <div className="relative w-full z-10 bg-white py-24 px-6 md:px-12 object-contain">
        <section className="w-full max-w-[1400px] mx-auto flex flex-col justify-center">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-neutral-900 mb-3 uppercase">Featured Works</h2>
              <p className="text-lg text-neutral-700 max-w-md font-medium">Selected high-fidelity spatial interfaces and autonomous agent systems.</p>
            </div>
            <Link to="/projects" className="hidden sm:flex items-center gap-2 text-sm font-bold text-primary-700 uppercase tracking-widest group">
              View Archive
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard 
                  id={work.id}
                  title={work.title}
                  category={work.category}
                  image={work.image}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 sm:hidden flex justify-center">
            <Link to="/projects" className="flex items-center gap-2 text-sm font-bold text-primary-700 uppercase tracking-widest group">
              View Archive
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>

      {/* "Let's FIKA" Section */}
      <div className="relative w-full min-h-screen z-20 bg-[#FBFBFB] flex flex-col items-center justify-center py-24 px-6 md:px-12 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-neutral-200 mb-4 uppercase">
              Take a Photo
            </h2>
          </div>
          
          <InstantCamera />
        </div>
      </div>
    </div>
  );
}

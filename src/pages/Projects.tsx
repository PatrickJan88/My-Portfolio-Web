import { motion } from "motion/react";
import { useState } from "react";
import { ProjectCard } from "../components/ui/ProjectCard";

const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "enterprise", label: "Enterprise & B2B" },
  { id: "consumer", label: "Consumer & Mobile" },
  { id: "academic", label: "Academic & HCI" },
];

const projects = [
  {
    id: "ears",
    title: "EARS™ Ecosystem",
    category: "enterprise",
    client: "Essex Lake Group",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "essex-web",
    title: "Essex Official Website",
    category: "enterprise",
    client: "Essex Lake Group",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "ev365",
    title: "EV 365 & Hydra",
    category: "consumer",
    client: "Smart Charging Platform",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "yuanxin",
    title: "Yuanxin Health",
    category: "consumer",
    client: "Healthcare App",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "biotopia",
    title: "Biotopia Museum",
    category: "academic",
    client: "Field Observation UI",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "hri-research",
    title: "AI Companionship",
    category: "academic",
    client: "HRI Research",
    image: "https://images.unsplash.com/photo-1620712948343-008423671cd7?q=80&w=1000&auto=format&fit=crop",
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 mt-4"
      >
        <h1 className="text-6xl font-bold tracking-tighter text-neutral-900 uppercase mb-6 leading-none">
          Case Studies
        </h1>
        <p className="text-base text-neutral-700 max-w-2xl font-medium leading-relaxed font-mono">
          An archive of selected works spanning robust enterprise platforms, native mobile applications, and academic human-computer interaction research.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap items-center gap-2 md:gap-3 mb-12"
      >
        {projectCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              activeCategory === category.id 
                ? "bg-neutral-900 text-white shadow-lg shadow-neutral-900/10 scale-105" 
                : "bg-white/50 backdrop-blur-sm border border-black/5 text-neutral-700 hover:bg-white hover:text-neutral-900 shadow-sm"
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Project Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectCard 
              id={project.id}
              title={project.title}
              category={project.client}
              image={project.image}
            />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  className?: string;
}

export function ProjectCard({ id, title, category, image, className }: ProjectCardProps) {
  return (
    <Link to={`/projects/${id}`} className={cn("block group", className)}>
      <motion.div 
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full aspect-[4/3] relative rounded-2xl md:rounded-3xl overflow-hidden mb-4 bg-white shadow-sm ring-1 ring-black/5 hover:shadow-xl hover:shadow-primary-700/10"
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
        />
        
        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
        
        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6 z-[2] w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/20 transform translate-y-[25%] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:bg-white/30 group-hover:scale-110 group-hover:translate-y-0">
          <ArrowUpRight className="w-5 h-5 ml-[-1px] mt-[1px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </motion.div>
      
      <div className="px-1">
        <h3 className="font-bold text-xl text-neutral-900 group-hover:text-primary-700 transition-colors">{title}</h3>
        <p className="text-sm font-semibold text-neutral-700 tracking-widest mt-1 opacity-70">{category}</p>
      </div>
    </Link>
  );
}

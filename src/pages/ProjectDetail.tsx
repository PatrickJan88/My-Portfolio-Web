import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();
  
  // Dummy data representing the project detail
  const project = {
    title: "EARS™ Ecosystem",
    client: "Essex Lake Group",
    role: "Lead Product Designer",
    timeline: "2022 - 2023",
    description: "An enterprise-grade platform designed to streamline large-scale data analytics and provide actionable insights for B2B stakeholders.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  };

  const sections = [
    { id: "overview", label: "Executive Overview" },
    { id: "challenge", label: "The Challenge" },
    { id: "process", label: "The Process" },
    { id: "solution", label: "The Solution" },
    { id: "impact", label: "The Impact" },
  ];

  return (
    <div className="w-full bg-[#f8f8f8] min-h-screen">
      {/* Dynamic Hero Banner */}
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-[#373737] overflow-hidden">
        <motion.img 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={project.heroImage} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f8] via-transparent to-transparent opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-12 mix-blend-normal">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A4A4A] hover:text-[#373737] mb-6 transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to projects
              </Link>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#373737] uppercase leading-[0.9]">
                {project.title}
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-4 text-sm font-medium uppercase tracking-widest text-[#a0a0a0] max-w-sm"
            >
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span>Client</span>
                <span className="text-[#373737] font-bold text-right">{project.client}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span>Role</span>
                <span className="text-[#373737] font-bold text-right">{project.role}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span>Timeline</span>
                <span className="text-[#373737] font-bold text-right">{project.timeline}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content with Sticky Sidebar */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* Sticky Sidebar */}
        <aside className="hidden md:block w-48 shrink-0">
          <div className="sticky top-32 flex flex-col gap-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a0a0a0] mb-2">Content</p>
            {sections.map((section) => (
              <a 
                key={section.id} 
                href={`#${section.id}`}
                className="text-sm font-medium text-[#4a4a4a] hover:text-[#3480F9] transition-colors"
              >
                {section.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Content Flow */}
        <div className="flex-1 max-w-3xl flex flex-col gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="overview" 
            className="scroll-mt-32"
          >
            <h2 className="text-3xl font-bold tracking-tight text-[#373737] mb-6">Executive Overview</h2>
            <p className="text-lg text-[#4a4a4a] leading-relaxed">
              {project.description} We collaborated closely with core stakeholders to transition their legacy systems into a unified, spatial computing-ready interface.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="challenge" 
            className="scroll-mt-32"
          >
            <h2 className="text-3xl font-bold tracking-tight text-[#373737] mb-6">The Challenge</h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
              <p className="text-lg text-[#4a4a4a] leading-relaxed mb-4">
                The primary difficulty resided in managing thousands of concurrent data streams without overwhelming the user. Previously, operators relied on 15 separate dashboards.
              </p>
              <ul className="list-disc list-inside text-[#4a4a4a] space-y-2 mt-4 marker:text-[#3480F9]">
                <li>High cognitive load for end-users</li>
                <li>Inconsistent design system across web and mobile</li>
                <li>Lack of contextual AI affordances</li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="process" 
            className="scroll-mt-32"
          >
            <h2 className="text-3xl font-bold tracking-tight text-[#373737] mb-6">The Process</h2>
            <p className="text-lg text-[#4a4a4a] leading-relaxed mb-8">
              We conducted intensive qualitative user research, observing 40+ hours of platform usage. This guided our iterative prototyping phases.
            </p>
            <div className="w-full aspect-[16/9] bg-[#E5E5E5] rounded-2xl flex items-center justify-center text-[#a0a0a0] font-medium tracking-widest uppercase text-sm border border-black/5 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop" alt="Process" className="w-full h-full object-cover opacity-80" />
            </div>
          </motion.div>

          {/* Additional sections would follow similarly */}
          
          <div className="pt-12 border-t border-black/10 mt-12">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-[#3480F9] uppercase tracking-widest hover:text-[#373737] transition-colors">
              Next Case Study <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

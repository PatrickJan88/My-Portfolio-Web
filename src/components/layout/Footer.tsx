import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 z-20 flex flex-col items-center gap-8 border-t border-black/5 bg-transparent shrink-0">
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2 font-mono">
          <Link to="/" className="text-sm font-bold tracking-tight text-[#373737]">POFEI</Link>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#a0a0a0]">
            Product Designer
          </p>
        </div>

        <nav className="flex items-center gap-6 text-[11px] font-medium tracking-widest text-[#a0a0a0] uppercase font-mono">
          <Link to="/" className="hover:text-[#3E57FF] transition-colors">Home</Link>
          <Link to="/projects" className="hover:text-[#3E57FF] transition-colors">Projects</Link>
          <Link to="/contact" className="hover:text-[#3E57FF] transition-colors">Contact</Link>
        </nav>

      </div>
      
      <div className="w-full max-w-[1400px] flex justify-between items-center text-[10px] uppercase tracking-[0.15em] font-bold text-[#D2D2D2] font-mono">
        <span>© {new Date().getFullYear()} All Rights Reserved</span>
        <span className="hidden sm:inline">💻 Building + 💡 Thinking + 🎧 Chilling</span>
      </div>
    </footer>
  );
}

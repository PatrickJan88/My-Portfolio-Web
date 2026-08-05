import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ThinkingOrb } from "thinking-orbs";
import { useState, useEffect } from "react";
import LetterSwapForward from "../ui/text/letter-swap-forward-anim";
import BorderGradientButton from "../ui/BorderGradientButton";
import seekrLogoPath from "../../assets/seekr logo.webp";

const orbStates = ["working", "searching", "solving", "listening", "composing", "shaping"] as const;

export default function Footer() {
  const [orbState, setOrbState] = useState<typeof orbStates[number]>("working");

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbState(prev => {
        const nextIndex = (orbStates.indexOf(prev) + 1) % orbStates.length;
        return orbStates[nextIndex];
      });
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full z-20 flex flex-col items-center border-t border-black/5 bg-transparent shrink-0">
      <div className="w-full max-w-[1400px] pt-12 pb-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-6">
        
        {/* Desktop / Tablet version */}
        <div className="hidden md:flex items-start gap-4">
          <Link to="/" className="flex items-center justify-center w-[36px] h-[36px] hover:opacity-80 transition-opacity cursor-pointer mt-0.5">
            <div className="scale-[0.5625] origin-center flex items-center justify-center pointer-events-none">
              <ThinkingOrb state={orbState} size={64} theme="light" />
            </div>
          </Link>
          <div className="flex flex-col items-start gap-1 font-sans">
            <Link to="/" className="text-[18px] font-bold tracking-tight text-[#373737]">
              <LetterSwapForward label="POFEI" />
            </Link>
            <p className="text-[12px] tracking-[0.2em] font-bold text-[#a0a0a0] -mt-1">
              Product Designer
            </p>
            <span className="inline text-left text-[10px] tracking-[0.15em] font-bold text-[#333333] mt-[10px] -ml-[2px]">
              💡 Imagining &nbsp;&nbsp; 💻 Building &nbsp;&nbsp; 🚀 Beyond
            </span>
          </div>
        </div>

        {/* Mobile version */}
        <div className="flex md:hidden flex-col items-start font-sans">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center justify-center w-[36px] h-[36px] hover:opacity-80 transition-opacity cursor-pointer">
              <div className="scale-[0.5625] origin-center flex items-center justify-center pointer-events-none">
                <ThinkingOrb state={orbState} size={64} theme="light" />
              </div>
            </Link>
            <Link to="/" className="text-[18px] font-bold tracking-tight text-[#373737]">
              <LetterSwapForward label="POFEI" />
            </Link>
          </div>
          <p className="text-[12px] tracking-[0.2em] font-bold text-[#a0a0a0] pl-[48px] -mt-2">
            Product Designer
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
          <nav className="flex flex-wrap justify-center items-center gap-6 text-[13px] font-semibold tracking-widest text-[#171717] font-sans -translate-x-1">
            <Link to="/" className="hover:text-[#707070] transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-[#707070] transition-colors">Projects</Link>
            <Link to="/contact" className="hover:text-[#707070] transition-colors">Contact</Link>
            <a href="https://github.com/PatrickJan88/My-Portfolio-Web.git" target="_blank" rel="noreferrer" className="hover:text-[#707070] transition-colors">GitHub</a>
          </nav>
          
          <a href="https://seekr-37311.web.app/" target="_blank" rel="noreferrer" className="mt-1 translate-x-1">
            <BorderGradientButton className="cursor-pointer">
              Try my AI coding project
              <img src={seekrLogoPath} alt="Seekr Logo" className="h-4 object-contain" />
            </BorderGradientButton>
          </a>
        </div>
      </div>

      <div className="w-full border-t border-black/5 h-[32px] flex items-center justify-center">
        <div className="w-full max-w-[1400px] px-6 md:px-12 flex justify-center md:justify-start">
          <span className="text-center md:text-left text-[12px] tracking-[0.15em] font-semibold font-sans text-[#333333] pl-0 md:pl-[52px]">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}

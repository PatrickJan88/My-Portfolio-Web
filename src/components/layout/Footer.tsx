import { Link } from "react-router-dom";
import LetterSwapForward from "../ui/text/letter-swap-forward-anim";
import { cn } from "@/lib/utils";
import MorphButton from "../ui/morph-button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Linkedin02Icon, GithubIcon, Mail01Icon } from "@hugeicons/core-free-icons";

export default function Footer() {
  return (
    <footer 
      className={cn(
        "w-full relative z-20 flex flex-col items-center shrink-0 overflow-hidden transition-colors duration-500",
        "bg-black shadow-none border-none"
      )}
    >
      <div className="w-full relative z-10 max-w-[1400px] pt-6 pb-4 md:pt-6 md:pb-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-5 md:gap-0">
        
        {/* Left side: Brand & Social */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex flex-col items-center md:items-start font-sans">
            <Link to="/" className="text-[18px] font-bold tracking-tight text-white leading-none">
              <LetterSwapForward label="POFEI" />
            </Link>
            <p className="text-[12px] tracking-[0.2em] font-bold mt-1.5 text-neutral-400 leading-none">
              Product Designer
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/pofei-r-79586395/" target="_blank" rel="noreferrer">
              <MorphButton>
                <HugeiconsIcon icon={Linkedin02Icon} size={18} />
              </MorphButton>
            </a>
            <a href="https://github.com/PatrickJan88" target="_blank" rel="noreferrer">
              <MorphButton>
                <HugeiconsIcon icon={GithubIcon} size={18} />
              </MorphButton>
            </a>
            <a href="mailto:ranpofei@gmail.com" target="_blank" rel="noreferrer">
              <MorphButton>
                <HugeiconsIcon icon={Mail01Icon} size={18} />
              </MorphButton>
            </a>
          </div>
        </div>

        {/* Right side: Navigation */}
        <div className="flex items-center justify-center md:justify-end w-full md:w-auto h-full md:mt-1">
          <nav className="flex items-center gap-6 text-[13px] font-semibold tracking-widest font-sans text-white">
            <Link to="/" className="hover:text-neutral-400 transition-colors">Home</Link>
            <Link to="/projects" className="hover:text-neutral-400 transition-colors">Projects</Link>
            <Link to="/contact" className="hover:text-neutral-400 transition-colors">Contact</Link>
          </nav>
        </div>
      </div>

      <div className="w-full relative z-10 border-t border-neutral-900 py-2 flex items-center justify-center">
        <div className="w-full max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row justify-center md:justify-between items-center gap-1 md:gap-0">
          <span className="text-center md:text-left text-[12px] tracking-[0.15em] font-semibold font-sans text-neutral-500">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
          <span className="text-center md:text-right text-[10px] tracking-[0.15em] font-bold text-neutral-500">
            Imagining &nbsp;·&nbsp; Building &nbsp;·&nbsp; Beyond
          </span>
        </div>
      </div>
    </footer>
  );
}

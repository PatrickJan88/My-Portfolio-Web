import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import GooeyNav from "../ui/GooeyNav";
import avatarCatPath from "../../assets/avatar-cat.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-6 pointer-events-none flex justify-center mt-2">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "pointer-events-auto flex items-center gap-4 md:gap-8 px-4 md:px-6 rounded-full transition-all duration-300",
          isScrolled
            ? "glass-panel-light shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] py-2.5 bg-white/80"
            : "glass-panel-light bg-white/40 py-3",
        )}
      >
        <Link to="/" className="flex items-center justify-center min-w-[40px]">
          {isScrolled ? (
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              className="w-8 h-8 rounded-full border border-black/10 bg-[#fce5d4] object-cover"
              src={avatarCatPath}
              alt="Avatar"
            />
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold tracking-tight text-neutral-900"
            >
              Pofei.
            </motion.span>
          )}
        </Link>

        {/* Desktop Links (GooeyNav) */}
        <div className="hidden md:flex items-center">
          <GooeyNav items={links} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 text-neutral-900"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 flex-shrink-0" />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-neutral-50/90 backdrop-blur-md z-[60] pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-x-4 top-4 bg-white border border-neutral-200 rounded-[2rem] p-6 z-[70] shadow-2xl pointer-events-auto flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold tracking-tight text-neutral-900">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors bg-neutral-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        navigate(link.href);
                      }, 100);
                    }}
                    className={cn(
                      "px-6 py-4 rounded-2xl text-lg font-bold transition-colors uppercase tracking-widest text-center",
                      location.pathname === link.href
                        ? "bg-primary-50 text-primary-700"
                        : "text-neutral-700 hover:bg-neutral-50",
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

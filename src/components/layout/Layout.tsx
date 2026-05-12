import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isProjectDetail =
    location.pathname.startsWith("/projects/") &&
    location.pathname !== "/projects";

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900 flex flex-col relative overflow-clip">
      {/* Spatial Background Elements - Global */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-400 opacity-[0.05] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-primary-700 opacity-[0.03] rounded-full blur-[80px] pointer-events-none"></div>

      {/* UI Decorative Lines - Global */}
      <div className="absolute left-0 top-0 w-px h-full bg-black/[0.03] pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-px h-full bg-black/[0.03] pointer-events-none"></div>

      <Navbar />

      <main
        className={cn(
          "flex-1 flex flex-col relative w-full z-10 pb-0 mb-auto",
          isProjectDetail ? "pt-0" : "pt-24",
        )}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}

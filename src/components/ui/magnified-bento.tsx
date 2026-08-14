"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  UserGroupIcon,
  HierarchyIcon,
  UserIcon,
  RotateLeftIcon,
  Settings02Icon,
  CpuIcon,
  CodeIcon,
  Chart01Icon,
  FlashIcon,
  Link01Icon,
  SmartPhone01Icon,
  CloudIcon,
  DatabaseIcon,
  LockIcon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const TAG_ROWS = [
  [
    { id: "pm", icon: UserIcon, label: "Product Manager" },
    { id: "de", icon: CodeIcon, label: "Design Engineer" },
    { id: "ux", icon: Search01Icon, label: "UX/UI Designer" },
    { id: "fe", icon: FlashIcon, label: "Frontend Developer" },
    { id: "fs", icon: DatabaseIcon, label: "Full-stack Developer" },
    { id: "da", icon: Chart01Icon, label: "Data Analyst" },
  ],
  [
    { id: "fs-2", icon: DatabaseIcon, label: "Full-stack Developer" },
    { id: "da-2", icon: Chart01Icon, label: "Data Analyst" },
    { id: "pm-2", icon: UserIcon, label: "Product Manager" },
    { id: "de-2", icon: CodeIcon, label: "Design Engineer" },
    { id: "ux-2", icon: Search01Icon, label: "UX/UI Designer" },
    { id: "fe-2", icon: FlashIcon, label: "Frontend Developer" },
  ],
  [
    { id: "ux-3", icon: Search01Icon, label: "UX/UI Designer" },
    { id: "fe-3", icon: FlashIcon, label: "Frontend Developer" },
    { id: "fs-3", icon: DatabaseIcon, label: "Full-stack Developer" },
    { id: "da-3", icon: Chart01Icon, label: "Data Analyst" },
    { id: "pm-3", icon: UserIcon, label: "Product Manager" },
    { id: "de-3", icon: CodeIcon, label: "Design Engineer" },
  ],
];

const CONFIG = {
  containerHeight: "h-[200px] sm:h-[240px]",
};

export const BentoHoverContext = React.createContext(false);

export interface MagnifiedBentoProps {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const MagnifiedBento = ({
  title = "Intelligent Workflows",
  description = "Automatically categorize and search through your team's diverse skillsets and project phases with contextual awareness.",
  className,
  children,
}: MagnifiedBentoProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={cn("flex flex-col w-full h-full not-prose", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BentoHoverContext.Provider value={isHovered}>
        <div className="group relative h-full flex flex-col w-full overflow-hidden rounded-[2rem] border border-neutral-200 bg-white p-1.5 sm:p-2 shadow-xl shadow-neutral-200/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-[1.5rem] bg-neutral-50 shrink-0",
            CONFIG.containerHeight
          )}
        >
          <div className="relative h-full w-full flex flex-col items-center justify-center">
            {children ? (
              children
            ) : (
              <div className="flex flex-col gap-4 w-full h-full justify-center">
                <style>{`
                  @keyframes marquee-left {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-33.333%); }
                  }
                  @keyframes marquee-right {
                    0% { transform: translateX(-33.333%); }
                    100% { transform: translateX(0%); }
                  }
                  .animate-marquee-left {
                    animation: marquee-left 25s linear infinite;
                  }
                  .animate-marquee-right {
                    animation: marquee-right 25s linear infinite;
                  }
                `}</style>
                {TAG_ROWS.map((row, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className={cn(
                      "flex gap-4 w-max [animation-play-state:paused] group-hover:[animation-play-state:running]",
                      rowIndex % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"
                    )}
                  >
                    {[...row, ...row, ...row].map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="flex gap-2 bg-white/60 backdrop-blur-sm whitespace-nowrap w-fit text-neutral-500 p-2 px-3 items-center border border-neutral-200/50 rounded-full text-xs"
                      >
                        <HugeiconsIcon icon={item.icon} size={14} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-neutral-50 to-transparent z-20"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-neutral-50 to-transparent z-20"></div>
        </div>
        <div className="p-4 sm:p-6 px-4 pb-6 sm:pb-8 flex-grow">
          <h3 className="text-xl font-medium tracking-tight text-neutral-900">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            {description}
          </p>
        </div>
      </div>
      </BentoHoverContext.Provider>
    </div>
  );
};

export default MagnifiedBento;

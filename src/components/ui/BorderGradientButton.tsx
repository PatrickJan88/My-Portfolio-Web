import { cn } from "@/lib/utils";

interface BorderGradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colors?: [string, string, string, string, string];
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

const defaultColors: [string, string, string, string, string] = [
  "#FCAE0B", // --color-accent-yellow
  "#4DB440", // --color-accent-green
  "#979799", // --color-ash-gray
  "#777b86", // --color-slate-gray
  "#FCAE0B",
];

const BorderGradientButton = ({
  colors = defaultColors,
  className,
  contentClassName,
  children,
  ...props
}: BorderGradientButtonProps) => {
  return (
    <button
      className={cn(
        "relative rounded-full animate-rainbow bg-[length:200%] active:scale-[0.95] group p-[1.5px] transition-transform",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(45deg, ${colors.join(",")})`,
      }}
      {...props}
    >
      <div className="z-0 absolute inset-[1.5px] bg-white group-hover:bg-white/90 backdrop-blur-3xl rounded-full transition-all saturate-200" />
      <span
        className={cn(
          "z-10 text-ink-black pointer-events-none relative flex items-center gap-2 px-6 py-3.5 text-sm md:text-base font-bold tracking-wider",
          contentClassName,
        )}
      >
        {children ?? "Gradient Border"}
      </span>
    </button>
  );
};

export default BorderGradientButton;

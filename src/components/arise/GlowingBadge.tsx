import { cn } from "@/lib/utils";

interface GlowingBadgeProps {
  level: "safe" | "monitor" | "high";
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

export const GlowingBadge = ({ level, children, className, pulse = false }: GlowingBadgeProps) => {
  const classes = {
    safe: "risk-badge-safe",
    monitor: "risk-badge-monitor",
    high: "risk-badge-high glow-risk",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
      classes[level],
      className
    )}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            level === "safe" && "bg-risk-safe",
            level === "monitor" && "bg-risk-monitor",
            level === "high" && "bg-risk-high",
          )} />
          <span className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            level === "safe" && "bg-risk-safe",
            level === "monitor" && "bg-risk-monitor",
            level === "high" && "bg-risk-high",
          )} />
        </span>
      )}
      {children}
    </span>
  );
};

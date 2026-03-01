import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accent?: "primary" | "accent" | "risk" | "monitor" | "safe";
  delay?: number;
}

export const StatCard = ({ label, value, icon: Icon, trend, trendUp, accent = "primary", delay = 0 }: StatCardProps) => {
  const accentColors = {
    primary: "text-primary",
    accent: "text-accent",
    risk: "text-risk-high",
    monitor: "text-risk-monitor",
    safe: "text-risk-safe",
  };

  const iconBg = {
    primary: "bg-primary/10",
    accent: "bg-accent/10",
    risk: "bg-risk-high/10",
    monitor: "bg-risk-monitor/10",
    safe: "bg-risk-safe/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="stat-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl", iconBg[accent])}>
          <Icon className={cn("h-5 w-5", accentColors[accent])} />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-md",
            trendUp ? "bg-risk-safe/10 text-risk-safe" : "bg-risk-high/10 text-risk-high"
          )}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
};

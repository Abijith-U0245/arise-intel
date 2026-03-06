import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RiskScoreWidgetProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function RiskScoreWidget({ score, size = 'md', showLabel = true }: RiskScoreWidgetProps) {
  const level = score > 65 ? 'high' : score > 40 ? 'monitor' : 'safe';
  const color = level === 'high' ? 'hsl(var(--risk-high))' : level === 'monitor' ? 'hsl(var(--risk-monitor))' : 'hsl(var(--risk-safe))';
  const label = level === 'high' ? 'High Risk' : level === 'monitor' ? 'Monitor' : 'Safe';

  const dims = { sm: 80, md: 120, lg: 160 };
  const d = dims[size];
  const strokeWidth = size === 'sm' ? 6 : size === 'md' ? 8 : 10;
  const radius = (d - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: d, height: d }}>
        <svg width={d} height={d} className="-rotate-90">
          <circle
            cx={d / 2} cy={d / 2} r={radius}
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={d / 2} cy={d / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            "font-bold text-foreground",
            size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-4xl'
          )}>{score}</span>
        </div>
      </div>
      {showLabel && (
        <span className={cn(
          "text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full",
          level === 'high' && "bg-risk-high/15 text-risk-high",
          level === 'monitor' && "bg-risk-monitor/15 text-risk-monitor",
          level === 'safe' && "bg-risk-safe/15 text-risk-safe",
        )}>{label}</span>
      )}
    </div>
  );
}

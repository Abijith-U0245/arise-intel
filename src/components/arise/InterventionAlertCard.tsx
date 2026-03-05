import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InterventionAlertCardProps {
  interventions: string[];
  studentName?: string;
}

export function InterventionAlertCard({ interventions, studentName }: InterventionAlertCardProps) {
  if (interventions.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-risk-safe/10">
            <CheckCircle className="h-4 w-4 text-risk-safe" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">No Active Interventions</p>
            <p className="text-xs text-muted-foreground">{studentName ? `${studentName} is on track` : 'All clear'}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5 space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-4 w-4 text-risk-high" />
        <h4 className="text-sm font-semibold text-foreground">Active Interventions</h4>
      </div>
      {interventions.map((text, i) => (
        <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/60">
          <Clock className="h-3.5 w-3.5 text-risk-monitor shrink-0" />
          <span className="text-sm text-muted-foreground">{text}</span>
        </div>
      ))}
    </motion.div>
  );
}

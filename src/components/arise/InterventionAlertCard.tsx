import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface InterventionAlertCardProps {
  interventions: string[];
  studentName?: string;
  riskScore?: number;
}

export function InterventionAlertCard({ interventions, studentName, riskScore }: InterventionAlertCardProps) {
  // Show high priority styling if riskScore is high
  const isHighRisk = riskScore && riskScore > 65;
  
  if (interventions.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-5">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isHighRisk ? 'bg-risk-monitor/10' : 'bg-risk-safe/10'}`}>
            <CheckCircle className={`h-4 w-4 ${isHighRisk ? 'text-risk-monitor' : 'text-risk-safe'}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isHighRisk ? 'Monitor Recommended' : 'No Active Interventions'}
            </p>
            <p className="text-xs text-muted-foreground">
              {studentName ? `${studentName} ${isHighRisk ? 'may need additional support' : 'is on track'}` : 'All clear'}
            </p>
          </div>
        </div>
        {isHighRisk && (
          <div className="mt-3 p-3 rounded-lg bg-risk-high/5 border border-risk-high/10">
            <p className="text-xs text-muted-foreground">
              Risk score of {riskScore} suggests proactive monitoring is advised even without formal interventions.
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className={`glass-panel p-5 space-y-3 ${isHighRisk ? 'border-risk-high/20' : ''}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className={`h-4 w-4 ${isHighRisk ? 'text-risk-high' : 'text-risk-monitor'}`} />
        <h4 className="text-sm font-semibold text-foreground">Active Interventions</h4>
        {riskScore && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
            Risk: {riskScore}
          </span>
        )}
      </div>
      {interventions.map((text, i) => (
        <div 
          key={i} 
          className={`flex items-center gap-3 p-2.5 rounded-lg ${isHighRisk ? 'bg-risk-high/5' : 'bg-secondary/60'}`}
        >
          <Clock className={`h-3.5 w-3.5 shrink-0 ${isHighRisk ? 'text-risk-high' : 'text-risk-monitor'}`} />
          <span className="text-sm text-muted-foreground">{text}</span>
        </div>
      ))}
    </motion.div>
  );
}

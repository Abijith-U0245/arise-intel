import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, FileText, Frown, Activity, Trophy, TrendingUp, ArrowRight } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import type { RiskEventType, RiskLevel, RiskNotification } from '@/types';

const eventIcons: Record<RiskEventType, typeof AlertTriangle> = {
  attendance_drop: Calendar,
  low_ia_score: FileText,
  missed_assignment: AlertTriangle,
  negative_sentiment: Frown,
  low_engagement: Activity,
  missing_competition: Trophy,
  risk_level_increase: TrendingUp,
};

const eventLabels: Record<RiskEventType, string> = {
  attendance_drop: 'Attendance Drop',
  low_ia_score: 'Low IA Score',
  missed_assignment: 'Missed Assignment',
  negative_sentiment: 'Negative Sentiment',
  low_engagement: 'Low Engagement',
  missing_competition: 'Missing Competition',
  risk_level_increase: 'Risk Level Increase',
};

const levelColors: Record<RiskLevel, { bg: string; text: string; border: string }> = {
  safe: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  monitor: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  highRisk: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
};

const levelLabels: Record<RiskLevel, string> = {
  safe: 'Safe',
  monitor: 'Monitor',
  highRisk: 'High Risk',
  critical: 'Critical',
};

interface RiskAlertsWidgetProps {
  title?: string;
  limit?: number;
}

export function RiskAlertsWidget({ title = "Risk Alerts Today", limit = 5 }: RiskAlertsWidgetProps) {
  const { summary, recentAlerts, markNotificationAsRead } = useNotifications();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-panel p-5"
    >
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {summary.todayCount} new today • {summary.unreadCount} unread
          </p>
        </div>
        <div className="flex items-center gap-2">
          {summary.criticalCount > 0 && (
            <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
              {summary.criticalCount} Critical
            </span>
          )}
          {summary.highRiskCount > 0 && (
            <span className="px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">
              {summary.highRiskCount} High Risk
            </span>
          )}
        </div>
      </div>

      {/* Alert Cards */}
      {recentAlerts.length === 0 ? (
        <div className="text-center py-8">
          <div className="h-12 w-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-3">
            <Activity className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="text-sm text-muted-foreground">No risk alerts today</p>
          <p className="text-xs text-muted-foreground mt-1">
            System is monitoring all students
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentAlerts.slice(0, limit).map((alert) => (
            <AlertCard 
              key={alert.id} 
              alert={alert} 
              onClick={() => markNotificationAsRead(alert.id)}
            />
          ))}
        </div>
      )}

      {/* Summary by category */}
      {summary.totalAlerts > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Alerts by Category</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(summary.byCategory)
              .filter(([_, count]) => count > 0)
              .slice(0, 4)
              .map(([type, count]) => {
                const Icon = eventIcons[type as RiskEventType];
                return (
                  <span 
                    key={type}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-secondary/50 text-xs text-muted-foreground"
                  >
                    <Icon className="h-3 w-3" />
                    {eventLabels[type as RiskEventType]}: {count}
                  </span>
                );
              })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function AlertCard({ alert, onClick }: { alert: RiskNotification; onClick: () => void }) {
  const Icon = eventIcons[alert.type];
  const colors = levelColors[alert.riskLevel];
  const isUnread = !alert.read;

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`p-3 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] ${
        colors.bg
      } ${colors.border} ${isUnread ? 'ring-1 ring-primary/30' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`p-2 rounded-lg bg-background/50 shrink-0`}>
          <Icon className={`h-4 w-4 ${colors.text}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-foreground text-sm truncate">
              {alert.studentName}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-background/50 ${colors.text} shrink-0`}>
              {levelLabels[alert.riskLevel]}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {alert.message}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {eventLabels[alert.type]} • Risk: {alert.riskScore}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(alert.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return 'today';
}

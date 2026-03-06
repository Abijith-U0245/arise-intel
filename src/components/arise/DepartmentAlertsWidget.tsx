import { motion } from 'framer-motion';
import { AlertTriangle, Building2, Users, TrendingUp, Bell, ChevronRight } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import type { RiskLevel, NotificationSummary } from '@/types';

const levelColors: Record<RiskLevel, { bg: string; text: string }> = {
  safe: { bg: 'bg-green-500', text: 'text-green-400' },
  monitor: { bg: 'bg-yellow-500', text: 'text-yellow-400' },
  highRisk: { bg: 'bg-orange-500', text: 'text-orange-400' },
  critical: { bg: 'bg-red-500', text: 'text-red-400' },
};

interface DepartmentAlertsWidgetProps {
  title?: string;
  departmentName?: string;
}

export function DepartmentAlertsWidget({ title = "Department Alerts", departmentName }: DepartmentAlertsWidgetProps) {
  const { summary, recentAlerts } = useNotifications();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-panel p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h3 className="section-title">{title}</h3>
        </div>
        {departmentName && (
          <span className="text-xs text-muted-foreground">{departmentName}</span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard 
          icon={AlertTriangle} 
          label="High Risk Students" 
          value={summary.highRiskCount} 
          color="orange"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Critical Alerts" 
          value={summary.criticalCount} 
          color="red"
        />
        <StatCard 
          icon={Bell} 
          label="New Alerts Today" 
          value={summary.todayCount} 
          color="blue"
        />
        <StatCard 
          icon={Users} 
          label="Total Unread" 
          value={summary.unreadCount} 
          color="purple"
        />
      </div>

      {/* Recent Alerts */}
      {recentAlerts.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">Recent Alerts</p>
          <div className="space-y-2">
            {recentAlerts.slice(0, 3).map((alert) => (
              <div 
                key={alert.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`h-2 w-2 rounded-full ${levelColors[alert.riskLevel].bg} shrink-0`} />
                  <span className="text-sm text-foreground truncate">{alert.studentName}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs ${levelColors[alert.riskLevel].text}`}>
                    {alert.riskLevel.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Class-wise summary if available */}
      {Object.keys(summary.byDepartment).length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Alerts by Class</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(summary.byDepartment)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 4)
              .map(([dept, count]) => (
                <span 
                  key={dept}
                  className="inline-flex items-center px-2 py-1 rounded-lg bg-secondary/50 text-xs text-muted-foreground"
                >
                  {dept}: {count}
                </span>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: typeof AlertTriangle; 
  label: string; 
  value: number; 
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    orange: 'bg-orange-500/10 text-orange-400',
    red: 'bg-red-500/10 text-red-400',
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
  };

  return (
    <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4" />
        <span className="text-xs opacity-80">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

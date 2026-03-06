import { motion } from 'framer-motion';
import type { ActivityLog } from '@/types';
import { 
  LogIn, 
  FileText, 
  CheckCircle, 
  Trophy, 
  Calendar, 
  MessageSquare, 
  AlertTriangle, 
  CheckCheck,
  User,
  Lock
} from 'lucide-react';

interface ActivityTimelineProps {
  activities: ActivityLog[];
  title?: string;
}

const activityIcons: Record<string, React.ElementType> = {
  login: LogIn,
  assignment_submitted: FileText,
  quiz_completed: CheckCircle,
  competition_participated: Trophy,
  attendance_update: Calendar,
  faculty_feedback: MessageSquare,
  intervention_triggered: AlertTriangle,
  intervention_completed: CheckCheck,
  risk_alert: AlertTriangle,
  profile_update: User,
  password_changed: Lock,
  logout: LogIn,
};

const activityColors: Record<string, string> = {
  login: 'text-blue-400 bg-blue-400/10',
  assignment_submitted: 'text-green-400 bg-green-400/10',
  quiz_completed: 'text-purple-400 bg-purple-400/10',
  competition_participated: 'text-amber-400 bg-amber-400/10',
  attendance_update: 'text-cyan-400 bg-cyan-400/10',
  faculty_feedback: 'text-pink-400 bg-pink-400/10',
  intervention_triggered: 'text-red-400 bg-red-400/10',
  intervention_completed: 'text-emerald-400 bg-emerald-400/10',
  risk_alert: 'text-orange-400 bg-orange-400/10',
  profile_update: 'text-indigo-400 bg-indigo-400/10',
  password_changed: 'text-gray-400 bg-gray-400/10',
  logout: 'text-blue-400 bg-blue-400/10',
};

export function ActivityTimeline({ activities, title = 'Recent Activity' }: ActivityTimelineProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.5 }}
      className="glass-panel p-6"
    >
      <h3 className="section-title mb-4">{title}</h3>
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
        ) : (
          activities.map((activity, index) => {
            const Icon = activityIcons[activity.type] || LogIn;
            const colorClass = activityColors[activity.type] || 'text-muted-foreground bg-secondary';
            
            return (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className={`p-2 rounded-lg shrink-0 ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatDate(activity.timestamp)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}

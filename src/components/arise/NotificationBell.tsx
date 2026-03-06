import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, AlertTriangle, Calendar, FileText, Frown, Activity, Trophy, TrendingUp } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import type { RiskEventType, RiskLevel } from '@/types';
import { useEffect, useRef } from 'react';

const eventIcons: Record<RiskEventType, typeof Bell> = {
  attendance_drop: Calendar,
  low_ia_score: FileText,
  missed_assignment: AlertTriangle,
  negative_sentiment: Frown,
  low_engagement: Activity,
  missing_competition: Trophy,
  risk_level_increase: TrendingUp,
};

const levelColors: Record<RiskLevel, string> = {
  safe: 'bg-green-500',
  monitor: 'bg-yellow-500',
  highRisk: 'bg-orange-500',
  critical: 'bg-red-500',
};

const levelLabels: Record<RiskLevel, string> = {
  safe: 'Safe',
  monitor: 'Monitor',
  highRisk: 'High Risk',
  critical: 'Critical',
};

export function NotificationBell() {
  const { 
    unreadCount, 
    notifications, 
    isOpen, 
    togglePanel, 
    closePanel,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    acknowledgeNotificationById
  } = useNotifications();

  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        closePanel();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, closePanel]);

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell Button */}
      <button
        onClick={togglePanel}
        className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors"
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-96 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
              <div>
                <h3 className="font-semibold text-foreground">Risk Alerts</h3>
                <p className="text-xs text-muted-foreground">
                  {unreadCount} unread of {notifications.length} total
                </p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    Mark all read
                  </button>
                )}
                <button
                  onClick={closePanel}
                  className="p-1 rounded hover:bg-secondary transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No risk alerts yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Alerts will appear when students trigger risk events
                  </p>
                </div>
              ) : (
                notifications.map((notif, idx) => {
                  const Icon = eventIcons[notif.type];
                  const isUnread = !notif.read;
                  
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-4 border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer ${
                        isUnread ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => markNotificationAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon with level color */}
                        <div className={`p-2 rounded-lg ${levelColors[notif.riskLevel]}/10 shrink-0`}>
                          <Icon className={`h-4 w-4 ${levelColors[notif.riskLevel].replace('bg-', 'text-')}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {/* Student name and time */}
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-foreground truncate">
                              {notif.studentName}
                            </p>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {formatTimeAgo(notif.timestamp)}
                            </span>
                          </div>
                          
                          {/* Alert message */}
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {notif.message}
                          </p>
                          
                          {/* Risk level badge and actions */}
                          <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${levelColors[notif.riskLevel]}/10 ${levelColors[notif.riskLevel].replace('bg-', 'text-')}`}>
                              {levelLabels[notif.riskLevel]} • Risk: {notif.riskScore}
                            </span>
                            
                            {!notif.acknowledged && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  acknowledgeNotificationById(notif.id);
                                }}
                                className="text-xs text-primary hover:text-primary/80 transition-colors"
                              >
                                Acknowledge
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-border bg-secondary/30 text-center">
                <button 
                  onClick={() => {}} 
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all alerts in dashboard →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  return `${diffDays}d ago`;
}

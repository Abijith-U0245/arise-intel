import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { RiskNotification, NotificationSummary, RiskEventType, StudentData } from '@/types';
import { 
  getAllNotifications, 
  getUnreadCount, 
  getNotificationSummary,
  markAsRead,
  markAllAsRead,
  acknowledgeNotification,
  triggerRiskNotification,
  generateMockNotifications,
  getRecentAlerts
} from '@/services/notificationService';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: RiskNotification[];
  unreadCount: number;
  summary: NotificationSummary;
  recentAlerts: RiskNotification[];
  isOpen: boolean;
  togglePanel: () => void;
  closePanel: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  acknowledgeNotificationById: (id: string) => void;
  triggerNotification: (
    student: StudentData,
    previousRisk: number,
    currentRisk: number,
    eventType: RiskEventType,
    details?: string
  ) => void;
  generateMockAlerts: (students: StudentData[], count?: number) => void;
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<RiskNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [summary, setSummary] = useState<NotificationSummary>({
    totalAlerts: 0,
    unreadCount: 0,
    criticalCount: 0,
    highRiskCount: 0,
    monitorCount: 0,
    todayCount: 0,
    byDepartment: {},
    byCategory: {
      attendance_drop: 0,
      low_ia_score: 0,
      missed_assignment: 0,
      negative_sentiment: 0,
      low_engagement: 0,
      missing_competition: 0,
      risk_level_increase: 0,
    },
  });
  const [recentAlerts, setRecentAlerts] = useState<RiskNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const refreshNotifications = useCallback(() => {
    if (!user) return;
    
    const role = user.role as 'faculty' | 'hod' | 'admin';
    const allNotifs = getAllNotifications();
    setNotifications(allNotifs);
    
    const unread = getUnreadCount(role, user.department, user.classId);
    setUnreadCount(unread);
    
    const notifSummary = getNotificationSummary(role, user.department, user.classId);
    setSummary(notifSummary);
    
    const recent = getRecentAlerts(role, 5, user.department, user.classId);
    setRecentAlerts(recent);
  }, [user]);

  // Initial load and periodic refresh
  useEffect(() => {
    refreshNotifications();
    const interval = setInterval(refreshNotifications, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [refreshNotifications]);

  const togglePanel = useCallback(() => setIsOpen(prev => !prev), []);
  const closePanel = useCallback(() => setIsOpen(false), []);

  const markNotificationAsRead = useCallback((id: string) => {
    markAsRead(id);
    refreshNotifications();
  }, [refreshNotifications]);

  const markAllNotificationsAsRead = useCallback(() => {
    if (!user) return;
    const role = user.role as 'faculty' | 'hod' | 'admin';
    markAllAsRead(role, user.department, user.classId);
    refreshNotifications();
  }, [refreshNotifications, user]);

  const acknowledgeNotificationById = useCallback((id: string) => {
    acknowledgeNotification(id);
    refreshNotifications();
  }, [refreshNotifications]);

  const triggerNotification = useCallback((
    student: StudentData,
    previousRisk: number,
    currentRisk: number,
    eventType: RiskEventType,
    details: string = ''
  ) => {
    triggerRiskNotification(
      student,
      previousRisk,
      currentRisk,
      eventType,
      details,
      {},
      user?.classId || '',
      user?.department || ''
    );
    refreshNotifications();
  }, [refreshNotifications, user]);

  const generateMockAlerts = useCallback((students: StudentData[], count: number = 5) => {
    generateMockNotifications(students, count);
    refreshNotifications();
  }, [refreshNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        summary,
        recentAlerts,
        isOpen,
        togglePanel,
        closePanel,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        acknowledgeNotificationById,
        triggerNotification,
        generateMockAlerts,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

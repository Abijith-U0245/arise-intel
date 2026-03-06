import type { 
  RiskNotification, 
  RiskEvent, 
  RiskEventType, 
  NotificationSummary,
  RiskLevel,
  StudentData 
} from '@/types';
import { 
  getRiskLevel, 
  shouldTriggerNotification, 
  createRiskEvent,
  getEventDescription,
  generateEventId 
} from '@/utils/riskEngine';

// In-memory storage for notifications (would be replaced with API calls in production)
let notifications: RiskNotification[] = [];

/**
 * Generate a unique notification ID
 */
function generateNotificationId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a notification from a risk event
 */
export function createRiskNotification(
  event: RiskEvent,
  student: StudentData,
  className: string,
  department: string
): RiskNotification {
  const message = generateNotificationMessage(event, student);
  
  return {
    id: generateNotificationId(),
    eventId: event.id,
    studentId: student.id,
    studentName: student.name,
    classId: student.classId || '',
    className,
    department,
    type: event.type,
    message,
    riskLevel: event.currentLevel,
    riskScore: event.currentRisk,
    timestamp: new Date().toISOString(),
    read: false,
    acknowledged: false,
  };
}

/**
 * Generate human-readable notification message
 */
function generateNotificationMessage(event: RiskEvent, student: StudentData): string {
  const descriptions: Record<RiskEventType, string> = {
    attendance_drop: `Attendance dropped to ${Math.round(student.attendance as number)}%`,
    low_ia_score: `IA score below threshold in recent assessment`,
    missed_assignment: `Assignment not submitted - requires follow-up`,
    negative_sentiment: `Negative sentiment detected: "${event.details}"`,
    low_engagement: `Low LMS engagement activity detected`,
    missing_competition: `Missing participation in extracurricular activities`,
    risk_level_increase: `Risk level increased from ${event.previousLevel} to ${event.currentLevel}`,
  };
  
  return descriptions[event.type] || getEventDescription(event.type);
}

/**
 * Trigger a risk notification when risk score increases
 */
export function triggerRiskNotification(
  student: StudentData,
  previousRisk: number,
  currentRisk: number,
  eventType: RiskEventType,
  details: string = '',
  metadata?: Record<string, unknown>,
  className: string = '',
  department: string = ''
): RiskNotification | null {
  // Check if notification should be triggered
  if (!shouldTriggerNotification(previousRisk, currentRisk)) {
    return null;
  }
  
  // Create risk event
  const event = createRiskEvent(
    student.id,
    eventType,
    previousRisk,
    currentRisk,
    getEventDescription(eventType),
    details,
    metadata
  );
  
  // Create notification
  const notification = createRiskNotification(event, student, className, department);
  
  // Store notification
  notifications.unshift(notification);
  
  // Limit to last 100 notifications
  if (notifications.length > 100) {
    notifications = notifications.slice(0, 100);
  }
  
  return notification;
}

/**
 * Get all notifications
 */
export function getAllNotifications(): RiskNotification[] {
  return [...notifications];
}

/**
 * Get notifications for a specific faculty/student
 */
export function getNotificationsForUser(
  userId: string,
  role: 'faculty' | 'hod' | 'admin',
  department?: string,
  classId?: string
): RiskNotification[] {
  return notifications.filter(notif => {
    if (role === 'admin') return true;
    if (role === 'hod') return notif.department === department;
    if (role === 'faculty') return notif.classId === classId;
    return notif.studentId === userId;
  });
}

/**
 * Get unread notifications count
 */
export function getUnreadCount(
  role: 'faculty' | 'hod' | 'admin',
  department?: string,
  classId?: string
): number {
  return notifications.filter(notif => {
    if (notif.read) return false;
    if (role === 'admin') return true;
    if (role === 'hod') return notif.department === department;
    if (role === 'faculty') return notif.classId === classId;
    return false;
  }).length;
}

/**
 * Get notification summary statistics
 */
export function getNotificationSummary(
  role: 'faculty' | 'hod' | 'admin',
  department?: string,
  classId?: string
): NotificationSummary {
  const relevantNotifications = notifications.filter(notif => {
    if (role === 'admin') return true;
    if (role === 'hod') return notif.department === department;
    if (role === 'faculty') return notif.classId === classId;
    return false;
  });
  
  const unreadCount = relevantNotifications.filter(n => !n.read).length;
  const criticalCount = relevantNotifications.filter(n => n.riskLevel === 'critical').length;
  const highRiskCount = relevantNotifications.filter(n => n.riskLevel === 'highRisk').length;
  const monitorCount = relevantNotifications.filter(n => n.riskLevel === 'monitor').length;
  
  // Today's notifications
  const today = new Date().toISOString().split('T')[0];
  const todayCount = relevantNotifications.filter(n => n.timestamp.startsWith(today)).length;
  
  // By department
  const byDepartment: Record<string, number> = {};
  relevantNotifications.forEach(n => {
    byDepartment[n.department] = (byDepartment[n.department] || 0) + 1;
  });
  
  // By category
  const byCategory: Record<RiskEventType, number> = {
    attendance_drop: 0,
    low_ia_score: 0,
    missed_assignment: 0,
    negative_sentiment: 0,
    low_engagement: 0,
    missing_competition: 0,
    risk_level_increase: 0,
  };
  
  relevantNotifications.forEach(n => {
    byCategory[n.type] = (byCategory[n.type] || 0) + 1;
  });
  
  return {
    totalAlerts: relevantNotifications.length,
    unreadCount,
    criticalCount,
    highRiskCount,
    monitorCount,
    todayCount,
    byDepartment,
    byCategory,
  };
}

/**
 * Mark notification as read
 */
export function markAsRead(notificationId: string): boolean {
  const notif = notifications.find(n => n.id === notificationId);
  if (notif) {
    notif.read = true;
    return true;
  }
  return false;
}

/**
 * Mark all notifications as read
 */
export function markAllAsRead(
  role: 'faculty' | 'hod' | 'admin',
  department?: string,
  classId?: string
): void {
  notifications.forEach(notif => {
    if (role === 'admin') {
      notif.read = true;
    } else if (role === 'hod' && notif.department === department) {
      notif.read = true;
    } else if (role === 'faculty' && notif.classId === classId) {
      notif.read = true;
    }
  });
}

/**
 * Acknowledge notification
 */
export function acknowledgeNotification(notificationId: string): boolean {
  const notif = notifications.find(n => n.id === notificationId);
  if (notif) {
    notif.acknowledged = true;
    notif.read = true;
    return true;
  }
  return false;
}

/**
 * Clear all notifications (for testing/demo)
 */
export function clearAllNotifications(): void {
  notifications = [];
}

/**
 * Generate mock notifications for demo purposes
 */
export function generateMockNotifications(
  students: StudentData[],
  count: number = 10
): RiskNotification[] {
  const eventTypes: RiskEventType[] = [
    'attendance_drop',
    'low_ia_score',
    'missed_assignment',
    'negative_sentiment',
    'low_engagement',
    'missing_competition',
    'risk_level_increase',
  ];
  
  const newNotifications: RiskNotification[] = [];
  
  for (let i = 0; i < count; i++) {
    const student = students[Math.floor(Math.random() * students.length)];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const previousRisk = Math.floor(Math.random() * 40) + 20;
    const currentRisk = previousRisk + Math.floor(Math.random() * 20) + 10;
    
    const details = eventType === 'negative_sentiment' 
      ? 'Feeling overwhelmed with coursework'
      : eventType === 'attendance_drop'
      ? 'Multiple consecutive absences'
      : 'Performance degradation detected';
    
    const notif = triggerRiskNotification(
      student,
      previousRisk,
      currentRisk,
      eventType,
      details,
      {},
      'CSE-A',
      student.department || 'cse'
    );
    
    if (notif) {
      // Adjust timestamp to be within last 24 hours
      const hoursAgo = Math.floor(Math.random() * 24);
      const timestamp = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();
      notif.timestamp = timestamp;
      newNotifications.push(notif);
    }
  }
  
  return newNotifications;
}

/**
 * Get recent alerts for dashboard display
 */
export function getRecentAlerts(
  role: 'faculty' | 'hod' | 'admin',
  limit: number = 5,
  department?: string,
  classId?: string
): RiskNotification[] {
  const relevant = notifications.filter(notif => {
    if (role === 'admin') return true;
    if (role === 'hod') return notif.department === department;
    if (role === 'faculty') return notif.classId === classId;
    return false;
  });
  
  return relevant.slice(0, limit);
}

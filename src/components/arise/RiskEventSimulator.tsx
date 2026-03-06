import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, AlertTriangle, Calendar, FileText, Frown, Activity, Trophy, TrendingUp, Sparkles } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { allStudents } from '@/data/mockData';
import type { RiskEventType } from '@/types';

const eventTypes: { type: RiskEventType; label: string; icon: typeof AlertTriangle; description: string }[] = [
  { type: 'attendance_drop', label: 'Attendance Drop', icon: Calendar, description: 'Student attendance falls below 75%' },
  { type: 'low_ia_score', label: 'Low IA Score', icon: FileText, description: 'Internal assessment score below threshold' },
  { type: 'missed_assignment', label: 'Missed Assignment', icon: AlertTriangle, description: 'Assignment submission deadline missed' },
  { type: 'negative_sentiment', label: 'Negative Sentiment', icon: Frown, description: 'NLP detects negative sentiment in feedback' },
  { type: 'low_engagement', label: 'Low Engagement', icon: Activity, description: 'Low activity in learning management system' },
  { type: 'missing_competition', label: 'Missing Competition', icon: Trophy, description: 'No participation in extracurricular activities' },
  { type: 'risk_level_increase', label: 'Risk Level Increase', icon: TrendingUp, description: 'Overall risk crosses threshold' },
];

export function RiskEventSimulator() {
  const { generateMockAlerts, refreshNotifications } = useNotifications();
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastEvent, setLastEvent] = useState<string | null>(null);

  const simulateRandomEvent = () => {
    setIsSimulating(true);
    
    // Generate 1-3 random alerts
    const count = Math.floor(Math.random() * 3) + 1;
    generateMockAlerts(allStudents, count);
    
    // Pick a random event type for display
    const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    setLastEvent(randomEvent.label);
    
    setTimeout(() => {
      setIsSimulating(false);
      refreshNotifications();
    }, 800);
  };

  const simulateSpecificEvent = (eventType: RiskEventType) => {
    setIsSimulating(true);
    
    // Find a random student
    const student = allStudents[Math.floor(Math.random() * allStudents.length)];
    
    // Create previous and current risk scores
    const previousRisk = Math.floor(Math.random() * 40) + 20;
    const currentRisk = previousRisk + Math.floor(Math.random() * 25) + 10;
    
    // Generate details based on event type
    const detailsMap: Record<RiskEventType, string> = {
      attendance_drop: `Attendance dropped to ${Math.max(60, Math.floor(Math.random() * 30) + 50)}%`,
      low_ia_score: `IA score: ${Math.floor(Math.random() * 8) + 5}/20`,
      missed_assignment: 'Assignment deadline: 2025-03-05',
      negative_sentiment: '"Feeling overwhelmed with coursework"',
      low_engagement: 'Only 2 logins this week',
      missing_competition: 'No events participated in last 30 days',
      risk_level_increase: `Risk increased from ${previousRisk} to ${currentRisk}`,
    };
    
    // Trigger the notification
    const event = eventTypes.find(e => e.type === eventType);
    if (event) {
      setLastEvent(event.label);
    }
    
    // Use the notification service to trigger
    const { triggerRiskNotification } = useNotifications();
    triggerRiskNotification(
      student,
      previousRisk,
      currentRisk,
      eventType,
      detailsMap[eventType]
    );
    
    setTimeout(() => {
      setIsSimulating(false);
      refreshNotifications();
    }, 600);
  };

  const clearAllAlerts = () => {
    const { clearAllNotifications } = require('@/services/notificationService');
    clearAllNotifications();
    refreshNotifications();
    setLastEvent(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="section-title">Risk Event Simulator</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Simulate risk events to test the notification system. Click any button below to trigger an alert.
      </p>

      {/* Quick Simulate Button */}
      <button
        onClick={simulateRandomEvent}
        disabled={isSimulating}
        className="w-full mb-4 p-3 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all flex items-center justify-center gap-2 group"
      >
        <motion.div
          animate={isSimulating ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1, repeat: isSimulating ? Infinity : 0, ease: 'linear' }}
        >
          <Play className="h-5 w-5 text-primary" />
        </motion.div>
        <span className="font-medium text-primary">
          {isSimulating ? 'Simulating...' : 'Simulate Random Risk Event'}
        </span>
      </button>

      {/* Last Event Display */}
      {lastEvent && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-3 rounded-lg bg-secondary/50 text-center"
        >
          <p className="text-xs text-muted-foreground">Last triggered</p>
          <p className="text-sm font-medium text-foreground">{lastEvent}</p>
        </motion.div>
      )}

      {/* Specific Event Types */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {eventTypes.map((event) => (
          <button
            key={event.type}
            onClick={() => simulateSpecificEvent(event.type)}
            disabled={isSimulating}
            className="p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-left group"
          >
            <div className="flex items-center gap-2">
              <event.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-medium text-foreground">{event.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Clear Button */}
      <button
        onClick={clearAllAlerts}
        className="w-full p-2 rounded-lg border border-border hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2 text-xs text-muted-foreground"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Clear All Alerts
      </button>
    </motion.div>
  );
}

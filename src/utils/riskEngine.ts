import type { RiskLevel, RiskThreshold, RiskEventType, RiskEvent } from '@/types';
import { DEFAULT_RISK_THRESHOLDS } from '@/types';

/**
 * Risk Engine - Calculates risk scores and detects risk threshold crossings
 */

export function getRiskLevel(score: number, thresholds: RiskThreshold = DEFAULT_RISK_THRESHOLDS): RiskLevel {
  if (score <= thresholds.safe) return 'safe';
  if (score <= thresholds.monitor) return 'monitor';
  if (score <= thresholds.highRisk) return 'highRisk';
  return 'critical';
}

export function hasRiskLevelCrossed(
  previousScore: number,
  currentScore: number,
  thresholds: RiskThreshold = DEFAULT_RISK_THRESHOLDS
): { crossed: boolean; direction: 'up' | 'down' | 'none'; fromLevel: RiskLevel; toLevel: RiskLevel } {
  const fromLevel = getRiskLevel(previousScore, thresholds);
  const toLevel = getRiskLevel(currentScore, thresholds);
  
  if (fromLevel === toLevel) {
    return { crossed: false, direction: 'none', fromLevel, toLevel };
  }
  
  const levelValues: Record<RiskLevel, number> = {
    safe: 1,
    monitor: 2,
    highRisk: 3,
    critical: 4,
  };
  
  const direction = levelValues[toLevel] > levelValues[fromLevel] ? 'up' : 'down';
  
  return {
    crossed: true,
    direction,
    fromLevel,
    toLevel,
  };
}

export function shouldTriggerNotification(
  previousScore: number,
  currentScore: number,
  thresholds: RiskThreshold = DEFAULT_RISK_THRESHOLDS
): boolean {
  const { crossed, direction, fromLevel, toLevel } = hasRiskLevelCrossed(previousScore, currentScore, thresholds);
  
  // Only trigger on threshold crossings that increase risk
  if (!crossed || direction !== 'up') return false;
  
  // Trigger on: Safe → Monitor, Monitor → High Risk, High Risk → Critical
  const criticalCrossings = [
    { from: 'safe', to: 'monitor' },
    { from: 'monitor', to: 'highRisk' },
    { from: 'highRisk', to: 'critical' },
  ];
  
  return criticalCrossings.some(
    crossing => crossing.from === fromLevel && crossing.to === toLevel
  );
}

export function calculateRiskDelta(previousScore: number, currentScore: number): {
  delta: number;
  percentageChange: number;
  isSignificant: boolean;
} {
  const delta = currentScore - previousScore;
  const percentageChange = previousScore > 0 ? (delta / previousScore) * 100 : 0;
  
  // Significant if change is more than 10 points or 20%
  const isSignificant = Math.abs(delta) >= 10 || Math.abs(percentageChange) >= 20;
  
  return {
    delta,
    percentageChange,
    isSignificant,
  };
}

export function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createRiskEvent(
  studentId: string,
  type: RiskEventType,
  previousRisk: number,
  currentRisk: number,
  reason: string,
  details: string,
  metadata?: Record<string, unknown>
): RiskEvent {
  const previousLevel = getRiskLevel(previousRisk);
  const currentLevel = getRiskLevel(currentRisk);
  
  return {
    id: generateEventId(),
    studentId,
    type,
    previousRisk,
    currentRisk,
    previousLevel,
    currentLevel,
    reason,
    details,
    timestamp: new Date().toISOString(),
    metadata,
  };
}

// Risk calculation factors
export const RISK_FACTORS = {
  attendance: {
    weight: 0.25,
    thresholds: { excellent: 90, good: 75, poor: 60 },
  },
  academic: {
    weight: 0.30,
    thresholds: { excellent: 8.5, good: 7.0, poor: 6.0 },
  },
  engagement: {
    weight: 0.20,
    thresholds: { high: 80, medium: 50, low: 30 },
  },
  sentiment: {
    weight: 0.15,
    thresholds: { positive: 0.3, neutral: 0, negative: -0.3 },
  },
  competitions: {
    weight: 0.10,
    thresholds: { active: 3, moderate: 1, none: 0 },
  },
};

export function calculateComponentScore(
  value: number,
  factor: keyof typeof RISK_FACTORS,
  inverse: boolean = false
): number {
  const config = RISK_FACTORS[factor];
  const thresholds = Object.values(config.thresholds);
  const min = Math.min(...thresholds);
  const max = Math.max(...thresholds);
  
  let normalized: number;
  
  if (inverse) {
    // Lower values = higher risk (e.g., attendance)
    normalized = Math.max(0, Math.min(100, ((max - value) / (max - min)) * 100));
  } else {
    // Higher values = higher risk (already normalized 0-100)
    normalized = Math.max(0, Math.min(100, value));
  }
  
  return normalized * config.weight;
}

export function getEventDescription(type: RiskEventType): string {
  const descriptions: Record<RiskEventType, string> = {
    attendance_drop: 'Student attendance has dropped below the acceptable threshold',
    low_ia_score: 'Internal Assessment score is below expected performance level',
    missed_assignment: 'Assignment submission deadline has been missed',
    negative_sentiment: 'Negative sentiment detected in student feedback or communications',
    low_engagement: 'Low engagement activity detected in learning management system',
    missing_competition: 'Student has not participated in required competitions or activities',
    risk_level_increase: 'Overall risk level has increased across multiple factors',
  };
  
  return descriptions[type];
}

export function getEventIcon(type: RiskEventType): string {
  const icons: Record<RiskEventType, string> = {
    attendance_drop: 'calendar',
    low_ia_score: 'file-text',
    missed_assignment: 'alert-circle',
    negative_sentiment: 'frown',
    low_engagement: 'activity',
    missing_competition: 'trophy',
    risk_level_increase: 'trending-up',
  };
  
  return icons[type];
}

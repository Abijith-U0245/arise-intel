/**
 * Core domain types for A.R.I.S.E. - Academic Risk Intelligence & Success Engine
 * Enterprise-grade type definitions for academic risk prediction platform
 */

// ============================================================================
// RISK LEVELS
// ============================================================================

export type RiskLevel = 'safe' | 'monitor' | 'high' | 'critical';

export interface RiskThresholds {
  safe: number;      // 0-40
  monitor: number;   // 41-65
  high: number;      // 66-85
  critical: number;  // 86-100
}

// ============================================================================
// STUDENT PROFILE
// ============================================================================

export interface StudentProfile {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  major: string;
  year: number;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'withdrawn';
  riskScore: number;
  riskLevel: RiskLevel;
  lastUpdated: string;
}

export interface StudentAcademicRecord {
  studentId: string;
  gpa: number;
  creditsAttempted: number;
  creditsEarned: number;
  courses: CourseRecord[];
  semesterHistory: SemesterRecord[];
}

export interface CourseRecord {
  courseId: string;
  courseName: string;
  semester: string;
  grade: string;
  credits: number;
  instructor: string;
}

export interface SemesterRecord {
  semester: string;
  year: number;
  gpa: number;
  credits: number;
  standing: 'good' | 'warning' | 'probation';
}

// ============================================================================
// ACADEMIC RISK
// ============================================================================

export interface AcademicRisk {
  studentId: string;
  riskScore: number;
  riskLevel: RiskLevel;
  riskFactors: RiskFactor[];
  prediction: RiskPrediction;
  timestamp: string;
  modelVersion: string;
  confidence: number;
}

export interface RiskFactor {
  name: string;
  weight: number;
  score: number;
  trend: 'improving' | 'stable' | 'declining';
  details?: string;
}

export interface RiskPrediction {
  currentRisk: number;
  forecast4Week: number;
  forecast8Week: number;
  forecast12Week: number;
  dropoutProbability: number;
  keyTriggers: string[];
}

// ============================================================================
// INTERVENTION SYSTEM
// ============================================================================

export type InterventionStatus = 'pending' | 'active' | 'completed' | 'cancelled';
export type InterventionType = 'faculty_notification' | 'advisor_meeting' | 'counseling_referral' | 'academic_support' | 'financial_aid';

export interface Intervention {
  id: string;
  studentId: string;
  type: InterventionType;
  status: InterventionStatus;
  triggeredBy: string;
  triggeredAt: string;
  scheduledFor?: string;
  completedAt?: string;
  assignedTo: string;
  notes: string;
  outcome?: InterventionOutcome;
  workflow: InterventionStep[];
}

export interface InterventionStep {
  id: string;
  order: number;
  label: string;
  status: 'pending' | 'active' | 'done';
  assignedTo?: string;
  dueDate?: string;
  completedAt?: string;
}

export interface InterventionOutcome {
  success: boolean;
  riskScoreChange: number;
  followUpRequired: boolean;
  notes: string;
}

export interface InterventionMetrics {
  totalTriggered: number;
  activeCount: number;
  completedCount: number;
  successRate: number;
  avgResolutionTime: number; // hours
  dropoutReduction: number; // percentage
}

// ============================================================================
// BLOCKCHAIN INTEGRATION
// ============================================================================

export interface BlockchainRecord {
  transactionId: string;
  blockNumber: number;
  timestamp: number;
  recordType: 'risk_assessment' | 'intervention' | 'audit' | 'verification';
  studentId: string;
  dataHash: string;
  validatorNodes: string[];
  signatures: string[];
  metadata: RecordMetadata;
}

export interface RecordMetadata {
  action: string;
  performedBy: string;
  previousHash?: string;
  details: string;
}

export interface BlockchainAuditTrail {
  studentId: string;
  records: BlockchainRecord[];
  lastVerified: string;
  tamperProof: boolean;
}

// ============================================================================
// AI/ML MODELS
// ============================================================================

export interface ModelMetrics {
  modelId: string;
  modelName: string;
  modelVersion: string;
  algorithm: 'gradient_boosting' | 'random_forest' | 'neural_network' | 'logistic_regression' | 'nlp_sentiment';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  status: 'active' | 'training' | 'deprecated' | 'failed';
  lastTrained: string;
  trainingDataSize: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  category: 'academic' | 'behavioral' | 'engagement' | 'sentiment' | 'demographic';
}

export interface ConfusionMatrix {
  trueNegatives: number;
  falsePositives: number;
  falseNegatives: number;
  truePositives: number;
}

export interface ModelComparison {
  models: ModelMetrics[];
  comparisonDate: string;
  bestModel: string;
}

// ============================================================================
// DASHBOARD & ANALYTICS
// ============================================================================

export interface DashboardMetrics {
  totalStudents: number;
  highRiskCount: number;
  mediumRiskCount: number;
  safeCount: number;
  modelAccuracy: number;
  dropoutForecast4Week: number;
  activeInterventions: number;
  interventionsThisWeek: number;
  avgRiskScore: number;
}

export interface RiskDistribution {
  safe: number;
  monitor: number;
  highRisk: number;
  critical: number;
}

export interface TrendDataPoint {
  date: string;
  week: string;
  riskScore: number;
  predictedRisk: number;
  studentCount: number;
}

export interface Alert {
  id: string;
  studentId: string;
  studentName: string;
  riskLevel: RiskLevel;
  riskScore: number;
  trigger: string;
  timestamp: string;
  acknowledged: boolean;
}

// ============================================================================
// ATTENDANCE & ENGAGEMENT
// ============================================================================

export interface AttendanceRecord {
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export interface AttendanceTrend {
  studentId: string;
  weeklyData: {
    week: string;
    attendanceRate: number;
    sessionsAttended: number;
    totalSessions: number;
  }[];
  overallTrend: 'improving' | 'stable' | 'declining';
}

export interface EngagementMetrics {
  studentId: string;
  lmsLoginsPerWeek: number;
  assignmentSubmissionRate: number;
  discussionParticipation: number;
  resourceAccessCount: number;
  lastLogin: string;
}

// ============================================================================
// NLP SENTIMENT ANALYSIS
// ============================================================================

export interface SentimentAnalysis {
  studentId: string;
  overallSentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number; // -1 to 1
  keywords: SentimentKeyword[];
  analyzedTexts: AnalyzedText[];
  lastUpdated: string;
}

export interface SentimentKeyword {
  word: string;
  frequency: number;
  severity: RiskLevel;
  contexts: string[];
}

export interface AnalyzedText {
  source: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  keywords: string[];
  timestamp: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  requestId: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: string;
  timestamp: string;
  requestId: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// ENVIRONMENT CONFIGURATION
// ============================================================================

export interface AppConfig {
  apiBaseUrl: string;
  blockchainNetwork: string;
  awsRegion: string;
  features: {
    enableBlockchainAudit: boolean;
    enableRealTimeUpdates: boolean;
    enableMockData: boolean;
  };
}

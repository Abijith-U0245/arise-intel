/**
 * Core domain types for A.R.I.S.E. - Academic Risk Intelligence & Success Engine
 * Enterprise-grade type definitions for academic risk prediction platform
 */

// ============================================================================
// USER ROLES & AUTHENTICATION
// ============================================================================

export type UserRole = 'student' | 'faculty' | 'hod' | 'admin';

export interface MockUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  department?: string;
  classId?: string;
  erpId?: string;
  phone?: string;
  avatar?: string;
}

// ============================================================================
// DEPARTMENT & CLASS STRUCTURE
// ============================================================================

export interface DepartmentData {
  id: string;
  name: string;
  code: string;
  totalStudents: number;
  totalFaculty: number;
  hod: string;
  hodId: string;
  classes: string[];
  avgRisk: number;
  avgAttendance: number;
  avgPerformance: number;
}

export interface ClassData {
  id: string;
  name: string;
  department: string;
  departmentCode: string;
  studentCount: number;
  faculty: string[];
  facultyIds: string[];
  avgRisk: number;
  avgAttendance: number;
  avgPerformance: number;
  batchYear: number;
  semester: number;
}

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
// SUBJECT & ACADEMIC RECORDS
// ============================================================================

export interface Subject {
  id: string;
  name: string;
  code: string;
  faculty: string;
  facultyId: string;
  credits: number;
  type: 'theory' | 'lab' | 'project';
}

export interface SubjectScore {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  faculty: string;
  ia1: number;
  ia2: number;
  ia3: number;
  avgIA: number;
  assignmentScore: number;
  quizScore: number;
  labScore: number;
  attendance: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

export interface IAScores {
  ia1: number;
  ia2: number;
  ia3: number;
  avg: number;
}

export interface AttendanceRecord {
  subjectId: string;
  subjectName: string;
  attended: number;
  total: number;
  percentage: number;
}

// ============================================================================
// COMPETITIONS & ACTIVITIES
// ============================================================================

export type CompetitionType = 'hackathon' | 'coding' | 'symposium' | 'paper' | 'workshop' | 'project';
export type CompetitionStatus = 'participated' | 'won' | 'runner_up' | 'not_participated';
export type CertificateStatus = 'issued' | 'pending' | 'not_applicable';

export interface Competition {
  id: string;
  name: string;
  type: CompetitionType;
  organizer: string;
  date: string;
  status: CompetitionStatus;
  position?: string;
  score?: number;
  certificateStatus: CertificateStatus;
  certificateUrl?: string;
  teamSize: number;
  description: string;
}

// ============================================================================
// ACTIVITY TIMELINE
// ============================================================================

export type ActivityType = 
  | 'assignment_submitted'
  | 'quiz_completed'
  | 'competition_participated'
  | 'attendance_update'
  | 'faculty_feedback'
  | 'intervention_triggered'
  | 'intervention_completed'
  | 'risk_alert'
  | 'profile_update'
  | 'password_changed'
  | 'login'
  | 'logout';

export interface ActivityLog {
  id: string;
  userId: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
  icon?: string;
}

// ============================================================================
// AI RISK ANALYTICS
// ============================================================================

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

export interface AIRiskAnalytics {
  studentId: string;
  riskScore: number;
  riskLevel: RiskLevel;
  riskFactors: RiskFactor[];
  prediction: RiskPrediction;
  interventionSuggestions: string[];
  timestamp: string;
  modelVersion: string;
  confidence: number;
}

// ============================================================================
// STUDENT PROFILE (COMPREHENSIVE)
// ============================================================================

export interface StudentProfile {
  id: string;
  studentId: string;
  erpId: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  departmentCode: string;
  classId: string;
  className: string;
  facultyAdvisor: string;
  facultyAdvisorId: string;
  academicYear: number;
  semester: number;
  batchYear: number;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'withdrawn';
  avatar?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface StudentData {
  profile: StudentProfile;
  attendance: {
    overall: number;
    subjectWise: AttendanceRecord[];
    weeklyTrend: number[];
  };
  academics: {
    subjects: SubjectScore[];
    overallGrade: string;
    cgpa: number;
    sgpa: number;
  };
  competitions: Competition[];
  riskAnalytics: AIRiskAnalytics;
  activityLog: ActivityLog[];
  notifications: Notification[];
  // Legacy fields for backward compatibility
  id: string;
  name: string;
  erpId: string;
  classId: string;
  department: string;
  attendance_legacy: number;
  assignmentScore: number;
  gpa: number;
  riskScore: number;
  riskLevel: 'safe' | 'monitor' | 'high';
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentKeywords: string[];
  facultyFeedback: string;
  interventions: string[];
  weeklyAttendance: number[];
  weeklyPerformance: number[];
}

// ============================================================================
// FACULTY PROFILE
// ============================================================================

export interface FacultyProfile {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  departmentCode: string;
  designation: string;
  specialization: string;
  joinDate: string;
  assignedClasses: string[];
  assignedSubjects: string[];
  avatar?: string;
}

// ============================================================================
// HOD PROFILE
// ============================================================================

export interface HODProfile {
  id: string;
  hodId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  departmentCode: string;
  joinDate: string;
  facultyCount: number;
  studentCount: number;
  avatar?: string;
}

// ============================================================================
// ADMIN PROFILE
// ============================================================================

export interface AdminProfile {
  id: string;
  adminId: string;
  name: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'admin';
  joinDate: string;
  permissions: string[];
  avatar?: string;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export type NotificationType = 'risk_alert' | 'intervention' | 'academic' | 'system' | 'general';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
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
// RISK ALERT NOTIFICATION SYSTEM
// ============================================================================

export type RiskEventType = 
  | 'attendance_drop'
  | 'low_ia_score'
  | 'missed_assignment'
  | 'negative_sentiment'
  | 'low_engagement'
  | 'missing_competition'
  | 'risk_level_increase';

export interface RiskEvent {
  id: string;
  studentId: string;
  type: RiskEventType;
  previousRisk: number;
  currentRisk: number;
  previousLevel: RiskLevel;
  currentLevel: RiskLevel;
  reason: string;
  details: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface RiskNotification {
  id: string;
  eventId: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  department: string;
  type: RiskEventType;
  message: string;
  riskLevel: RiskLevel;
  riskScore: number;
  timestamp: string;
  read: boolean;
  acknowledged: boolean;
  assignedFaculty?: string;
}

export interface NotificationSummary {
  totalAlerts: number;
  unreadCount: number;
  criticalCount: number;
  highRiskCount: number;
  monitorCount: number;
  todayCount: number;
  byDepartment: Record<string, number>;
  byCategory: Record<RiskEventType, number>;
}

export type RiskThreshold = {
  safe: number;      // 0-40
  monitor: number;   // 41-65
  highRisk: number;  // 66-85
  critical: number;  // 86-100
};

export const DEFAULT_RISK_THRESHOLDS: RiskThreshold = {
  safe: 40,
  monitor: 65,
  highRisk: 85,
  critical: 100,
};

// ============================================================================
// ENGAGEMENT METRICS
// ============================================================================

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

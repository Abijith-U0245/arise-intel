const mongoose = require('mongoose');

const subjectScoreSchema = new mongoose.Schema({
  subjectId: String,
  subjectName: String,
  subjectCode: String,
  faculty: String,
  ia1: Number,
  ia2: Number,
  ia3: Number,
  avgIA: Number,
  assignmentScore: Number,
  quizScore: Number,
  labScore: Number,
  attendance: Number,
  grade: String
});

const attendanceRecordSchema = new mongoose.Schema({
  subjectId: String,
  subjectName: String,
  attended: Number,
  total: Number,
  percentage: Number
});

const competitionSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['hackathon', 'coding', 'paper', 'project', 'workshop', 'symposium'] },
  organizer: String,
  date: String,
  status: { type: String, enum: ['completed', 'ongoing', 'registered', 'not_participated', 'won', 'runner_up', 'participated'] },
  position: String,
  score: Number,
  certificateStatus: { type: String, enum: ['issued', 'pending', 'not_applicable', 'received'] },
  teamSize: Number,
  description: String
});

const riskFactorSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  score: Number,
  trend: { type: String, enum: ['stable', 'improving', 'declining'] },
  details: String
});

const riskAnalyticsSchema = new mongoose.Schema({
  riskScore: { type: Number, default: 0 },
  riskLevel: { type: String, enum: ['safe', 'monitor', 'high', 'critical'], default: 'safe' },
  riskFactors: [riskFactorSchema],
  dropoutProbability: { type: Number, default: 0 },
  keyTriggers: [String],
  interventionSuggestions: [String],
  modelVersion: { type: String, default: 'ARISE-v2.4.1' },
  confidence: { type: Number, default: 0.9 },
  timestamp: { type: Date, default: Date.now }
});

const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['academic', 'risk_alert', 'attendance', 'assignment', 'general'] },
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  title: String,
  message: String,
  read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

const studentProfileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  erpId: { type: String, required: true, unique: true },
  email: String,
  phone: String,
  department: String,
  departmentCode: String,
  classId: String,
  className: String,
  facultyAdvisor: String,
  facultyAdvisorId: String,
  academicYear: Number,
  semester: Number,
  batchYear: Number,
  enrollmentDate: String,
  status: { type: String, enum: ['active', 'inactive', 'suspended', 'graduated'], default: 'active' },
  address: String,
  dateOfBirth: String,
  gender: { type: String, enum: ['male', 'female', 'other'] }
});

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  profile: studentProfileSchema,
  attendance: {
    overall: { type: Number, default: 0 },
    subjectWise: [attendanceRecordSchema],
    weeklyTrend: [Number]
  },
  academics: {
    subjects: [subjectScoreSchema],
    overallGrade: String,
    cgpa: { type: Number, default: 0 },
    sgpa: { type: Number, default: 0 }
  },
  competitions: [competitionSchema],
  riskAnalytics: riskAnalyticsSchema,
  notifications: [notificationSchema],
  activities: [{
    type: { type: String },
    title: String,
    description: String,
    timestamp: { type: Date, default: Date.now }
  }],
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: 'neutral' },
  sentimentKeywords: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);

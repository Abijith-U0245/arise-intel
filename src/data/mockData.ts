/**
 * Mock data for A.R.I.S.E. Role-Based Demo
 * 4 Departments: CSE, AIDS, ECE, MECH
 * Total: 800 students, 32 faculty, 4 HODs, 1 Admin
 */

import type {
  MockUser,
  StudentData,
  StudentProfile,
  ClassData,
  DepartmentData,
  Subject,
  SubjectScore,
  AttendanceRecord,
  Competition,
  ActivityLog,
  AIRiskAnalytics,
  RiskFactor,
  RiskPrediction,
  Notification,
  FacultyProfile,
  HODProfile,
} from '@/types';

export type UserRole = 'student' | 'faculty' | 'hod' | 'admin';

// Re-export types from main types file
export type { 
  MockUser, 
  StudentData, 
  StudentProfile,
  ClassData, 
  DepartmentData,
  Subject,
  SubjectScore,
  AttendanceRecord,
  Competition,
  ActivityLog,
  AIRiskAnalytics,
  RiskFactor,
  RiskPrediction,
  Notification,
  FacultyProfile,
  HODProfile,
} from '@/types';

export const DEPARTMENTS: Record<string, { name: string; code: string; subjects: Subject[] }> = {
  CSE: {
    name: 'Computer Science & Engineering',
    code: 'CSE',
    subjects: [
      { id: 'CS301', name: 'Data Structures & Algorithms', code: 'CS301', faculty: '', facultyId: '', credits: 4, type: 'theory' },
      { id: 'CS302', name: 'Operating Systems', code: 'CS302', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'CS303', name: 'Database Management Systems', code: 'CS303', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'CS304', name: 'Computer Networks', code: 'CS304', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'CS305', name: 'Software Engineering', code: 'CS305', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'CS306', name: 'Web Technologies Lab', code: 'CS306', faculty: '', facultyId: '', credits: 2, type: 'lab' },
      { id: 'CS307', name: 'Data Structures Lab', code: 'CS307', faculty: '', facultyId: '', credits: 2, type: 'lab' },
      { id: 'HS301', name: 'Technical Communication', code: 'HS301', faculty: '', facultyId: '', credits: 2, type: 'theory' },
    ],
  },
  AIDS: {
    name: 'Artificial Intelligence & Data Science',
    code: 'AIDS',
    subjects: [
      { id: 'AI301', name: 'Machine Learning', code: 'AI301', faculty: '', facultyId: '', credits: 4, type: 'theory' },
      { id: 'AI302', name: 'Deep Learning', code: 'AI302', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'AI303', name: 'Data Science Fundamentals', code: 'AI303', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'AI304', name: 'Natural Language Processing', code: 'AI304', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'AI305', name: 'Computer Vision', code: 'AI305', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'AI306', name: 'ML Lab', code: 'AI306', faculty: '', facultyId: '', credits: 2, type: 'lab' },
      { id: 'AI307', name: 'Data Science Lab', code: 'AI307', faculty: '', facultyId: '', credits: 2, type: 'lab' },
      { id: 'HS301', name: 'Technical Communication', code: 'HS301', faculty: '', facultyId: '', credits: 2, type: 'theory' },
    ],
  },
  ECE: {
    name: 'Electronics & Communication Engineering',
    code: 'ECE',
    subjects: [
      { id: 'EC301', name: 'Digital Signal Processing', code: 'EC301', faculty: '', facultyId: '', credits: 4, type: 'theory' },
      { id: 'EC302', name: 'Microprocessors & Microcontrollers', code: 'EC302', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'EC303', name: 'Communication Systems', code: 'EC303', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'EC304', name: 'VLSI Design', code: 'EC304', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'EC305', name: 'Embedded Systems', code: 'EC305', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'EC306', name: 'DSP Lab', code: 'EC306', faculty: '', facultyId: '', credits: 2, type: 'lab' },
      { id: 'EC307', name: 'Microprocessor Lab', code: 'EC307', faculty: '', facultyId: '', credits: 2, type: 'lab' },
      { id: 'HS301', name: 'Technical Communication', code: 'HS301', faculty: '', facultyId: '', credits: 2, type: 'theory' },
    ],
  },
  MECH: {
    name: 'Mechanical Engineering',
    code: 'MECH',
    subjects: [
      { id: 'ME301', name: 'Thermodynamics', code: 'ME301', faculty: '', facultyId: '', credits: 4, type: 'theory' },
      { id: 'ME302', name: 'Fluid Mechanics', code: 'ME302', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'ME303', name: 'Manufacturing Processes', code: 'ME303', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'ME304', name: 'Machine Design', code: 'ME304', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'ME305', name: 'Heat Transfer', code: 'ME305', faculty: '', facultyId: '', credits: 3, type: 'theory' },
      { id: 'ME306', name: 'Manufacturing Lab', code: 'ME306', faculty: '', facultyId: '', credits: 2, type: 'lab' },
      { id: 'ME307', name: 'Thermal Lab', code: 'ME307', faculty: '', facultyId: '', credits: 2, type: 'lab' },
      { id: 'HS301', name: 'Technical Communication', code: 'HS301', faculty: '', facultyId: '', credits: 2, type: 'theory' },
    ],
  },
};

// Utility functions and name generators
const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Reyansh', 'Sai', 'Arnav',
  'Dhruv', 'Kabir', 'Ananya', 'Diya', 'Priya', 'Isha', 'Sara', 'Meera',
  'Riya', 'Nisha', 'Kavya', 'Tanvi', 'Rohan', 'Karan', 'Nikhil', 'Rahul',
  'Amit', 'Sneha', 'Pooja', 'Neha', 'Aisha', 'Zara', 'Dev', 'Raj',
  'Vikram', 'Siddharth', 'Manish', 'Akash', 'Deepak', 'Suresh', 'Ganesh', 'Harsh',
  'Lakshmi', 'Gayatri', 'Sanya', 'Tara', 'Nandini', 'Shruti', 'Pallavi', 'Jyoti',
  'Maya', 'Sonal',
];

const lastNames = [
  'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Mehta', 'Joshi', 'Verma',
  'Reddy', 'Nair', 'Iyer', 'Rao', 'Desai', 'Shah', 'Mishra', 'Pandey',
  'Chauhan', 'Thakur', 'Yadav', 'Tiwari', 'Sharma', 'Patel', 'Singh', 'Kumar',
  'Gupta', 'Mehta', 'Joshi', 'Verma', 'Reddy', 'Nair', 'Iyer', 'Rao',
  'Desai', 'Shah', 'Mishra', 'Pandey', 'Chauhan', 'Thakur', 'Yadav', 'Tiwari',
  'Malhotra', 'Bhatia', 'Ahuja', 'Khanna', 'Kapoor', 'Grover', 'Khurana', 'Sethi',
  'Arora', 'Bajaj', 'Chopra', 'Dhingra', 'Garg', 'Goel', 'Jain', 'Kohli',
  'Luthra', 'Mittal', 'Oberoi', 'Puri', 'Sahni', 'Suri', 'Talwar', 'Vohra',
];

const facultyTitles = ['Dr.', 'Prof.', 'Assoc. Prof.', 'Asst. Prof.'];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function generateERPId(dept: string, batch: number, index: number): string {
  const deptCode = dept.padStart(3, '0');
  const batchCode = String(batch).slice(-2);
  const seq = String(index + 1).padStart(4, '0');
  return `${batchCode}${deptCode}${seq}`;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  const val = Math.random() * (max - min) + min;
  return Number(val.toFixed(decimals));
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePhone(): string {
  return `+91 ${randomInt(7, 9)}${randomInt(0, 9)}${randomInt(0, 9)} ${randomInt(10, 99)} ${randomInt(10000, 99999)}`;
}

// ============================================================================
// COMPETITION GENERATOR
// ============================================================================

const competitionTemplates: Array<{ name: string; type: Competition['type']; organizer: string; description: string }> = [
  { name: 'Smart India Hackathon', type: 'hackathon', organizer: 'Govt. of India', description: 'National level hackathon for innovative solutions' },
  { name: 'ACM-ICPC Coding Contest', type: 'coding', organizer: 'ACM', description: 'International collegiate programming contest' },
  { name: 'TechFest Symposium', type: 'symposium', organizer: 'IIT Bombay', description: 'Technical paper presentation event' },
  { name: 'Research Paper Presentation', type: 'paper', organizer: 'IEEE', description: 'International conference paper presentation' },
  { name: 'AI/ML Workshop Series', type: 'workshop', organizer: 'Google Developers', description: 'Hands-on workshop on AI/ML fundamentals' },
  { name: 'RoboWars Competition', type: 'project', organizer: 'Robotics Club', description: 'Robot combat competition' },
  { name: 'CodeChef Challenge', type: 'coding', organizer: 'CodeChef', description: 'Monthly programming contest' },
  { name: 'DevFest Hackathon', type: 'hackathon', organizer: 'Google', description: 'Developer festival and hackathon' },
];

function generateCompetitions(count: number = 3): Competition[] {
  const competitions: Competition[] = [];
  const selected = competitionTemplates.slice(0, count);
  
  selected.forEach((template, i) => {
    const participated = Math.random() > 0.3;
    const status: Competition['status'] = participated ? (Math.random() > 0.6 ? 'won' : Math.random() > 0.5 ? 'runner_up' : 'participated') : 'not_participated';
    
    competitions.push({
      id: `COMP-${String(i + 1).padStart(3, '0')}`,
      name: template.name,
      type: template.type,
      organizer: template.organizer,
      date: `2024-${randomInt(1, 12)}-${randomInt(1, 28)}`,
      status,
      position: status === 'won' ? '1st Place' : status === 'runner_up' ? '2nd Place' : undefined,
      score: status === 'won' ? randomInt(85, 100) : status === 'runner_up' ? randomInt(70, 85) : status === 'participated' ? randomInt(50, 70) : undefined,
      certificateStatus: participated ? (Math.random() > 0.3 ? 'issued' : 'pending') : 'not_applicable',
      teamSize: randomInt(1, 4),
      description: template.description,
    });
  });
  
  return competitions;
}

// ============================================================================
// ACTIVITY LOG GENERATOR
// ============================================================================

function generateActivityLog(userId: string): ActivityLog[] {
  const activities: ActivityLog[] = [
    {
      id: `ACT-${randomInt(1000, 9999)}`,
      userId,
      type: 'login',
      title: 'Logged in to A.R.I.S.E.',
      description: 'User logged in to the system',
      timestamp: new Date(Date.now() - randomInt(1, 24) * 60 * 60 * 1000).toISOString(),
    },
    {
      id: `ACT-${randomInt(1000, 9999)}`,
      userId,
      type: 'assignment_submitted',
      title: 'Submitted Assignment',
      description: 'Submitted Database Management assignment',
      timestamp: new Date(Date.now() - randomInt(1, 7) * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: `ACT-${randomInt(1000, 9999)}`,
      userId,
      type: 'quiz_completed',
      title: 'Completed Quiz',
      description: 'Scored 85% on Data Structures quiz',
      timestamp: new Date(Date.now() - randomInt(2, 10) * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: `ACT-${randomInt(1000, 9999)}`,
      userId,
      type: 'attendance_update',
      title: 'Attendance Marked',
      description: 'Present in Operating Systems class',
      timestamp: new Date(Date.now() - randomInt(1, 5) * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  
  if (Math.random() > 0.7) {
    activities.push({
      id: `ACT-${randomInt(1000, 9999)}`,
      userId,
      type: 'competition_participated',
      title: 'Competition Participation',
      description: 'Participated in Smart India Hackathon',
      timestamp: new Date(Date.now() - randomInt(7, 30) * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// ============================================================================
// RISK ANALYTICS GENERATOR
// ============================================================================

function generateRiskAnalytics(studentId: string, attendance: number, avgIA: number, assignmentScore: number): AIRiskAnalytics {
  const attendanceFactor = (100 - attendance) * 0.4;
  const iaFactor = (100 - avgIA) * 0.3;
  const assignmentFactor = (100 - assignmentScore) * 0.2;
  const sentimentFactor = Math.random() * 10;
  
  let riskScore = Math.floor(attendanceFactor + iaFactor + assignmentFactor + sentimentFactor);
  riskScore = Math.min(100, Math.max(0, riskScore));
  
  const riskLevel: 'safe' | 'monitor' | 'high' | 'critical' = 
    riskScore > 85 ? 'critical' : riskScore > 65 ? 'high' : riskScore > 40 ? 'monitor' : 'safe';
  
  const riskFactors: RiskFactor[] = [
    {
      name: 'Attendance Drop',
      weight: 0.4,
      score: Math.floor((100 - attendance) * 0.8),
      trend: attendance > 80 ? 'stable' : attendance > 60 ? 'declining' : 'improving',
      details: attendance < 75 ? 'Below minimum required attendance' : 'Meeting attendance requirements',
    },
    {
      name: 'Low IA Scores',
      weight: 0.3,
      score: Math.floor((100 - avgIA) * 0.8),
      trend: avgIA > 70 ? 'stable' : avgIA > 50 ? 'declining' : 'improving',
      details: `Average IA score: ${avgIA.toFixed(1)}%`,
    },
    {
      name: 'Assignment Completion',
      weight: 0.2,
      score: Math.floor((100 - assignmentScore) * 0.8),
      trend: assignmentScore > 75 ? 'stable' : assignmentScore > 50 ? 'declining' : 'improving',
      details: `Assignment score: ${assignmentScore.toFixed(1)}%`,
    },
    {
      name: 'NLP Sentiment',
      weight: 0.1,
      score: Math.floor(Math.random() * 30),
      trend: Math.random() > 0.5 ? 'stable' : 'declining',
      details: 'Student sentiment analysis indicates concerns',
    },
  ];
  
  const dropoutProbability = riskScore > 70 ? randomFloat(0.3, 0.8) : riskScore > 50 ? randomFloat(0.1, 0.3) : randomFloat(0, 0.1);
  
  const prediction: RiskPrediction = {
    currentRisk: riskScore,
    forecast4Week: Math.min(100, riskScore + randomInt(-10, 15)),
    forecast8Week: Math.min(100, riskScore + randomInt(-15, 25)),
    forecast12Week: Math.min(100, riskScore + randomInt(-20, 35)),
    dropoutProbability,
    keyTriggers: riskScore > 65 ? 
      ['Consistently low attendance', 'Poor academic performance', 'Negative sentiment detected'] :
      riskScore > 40 ? 
      ['Occasional attendance issues', 'Average performance'] :
      ['Good academic standing'],
  };
  
  const interventionSuggestions: string[] = [];
  if (riskScore > 85) {
    interventionSuggestions.push('Immediate counseling referral required', 'Schedule faculty advisor meeting', 'Academic support plan needed');
  } else if (riskScore > 65) {
    interventionSuggestions.push('Schedule advisor meeting', 'Monitor attendance closely', 'Additional tutoring recommended');
  } else if (riskScore > 40) {
    interventionSuggestions.push('Periodic check-ins', 'Monitor progress');
  }
  
  return {
    studentId,
    riskScore,
    riskLevel,
    riskFactors,
    prediction,
    interventionSuggestions,
    timestamp: new Date().toISOString(),
    modelVersion: 'ARISE-v2.4.1',
    confidence: randomFloat(0.85, 0.98),
  };
}

// ============================================================================
// STUDENT GENERATOR
// ============================================================================

function generateSubjectScores(subjects: Subject[]): SubjectScore[] {
  return subjects.map(subject => {
    const ia1 = randomInt(10, 30);
    const ia2 = randomInt(10, 30);
    const ia3 = randomInt(10, 30);
    const avgIA = Number(((ia1 + ia2 + ia3) / 3).toFixed(1));
    
    const assignmentScore = randomInt(60, 100);
    const quizScore = randomInt(50, 100);
    const labScore = subject.type === 'lab' ? randomInt(60, 100) : 0;
    const attendance = randomInt(70, 100);
    
    const totalScore = (avgIA * 0.3) + (assignmentScore * 0.2) + (quizScore * 0.2) + (labScore > 0 ? labScore * 0.1 : 0) + (attendance * 0.2);
    
    let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
    if (totalScore >= 90) grade = 'A';
    else if (totalScore >= 80) grade = 'B';
    else if (totalScore >= 70) grade = 'C';
    else if (totalScore >= 60) grade = 'D';
    
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      faculty: subject.faculty,
      ia1,
      ia2,
      ia3,
      avgIA,
      assignmentScore,
      quizScore,
      labScore,
      attendance,
      grade,
    };
  });
}

function generateStudent(
  index: number,
  classId: string,
  departmentCode: string,
  facultyAdvisor: string,
  facultyAdvisorId: string,
  batchYear: number = 2022
): StudentData {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[index % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const erpId = generateERPId(departmentCode, batchYear, index);
  
  const subjects = DEPARTMENTS[departmentCode].subjects.map(s => ({
    ...s,
    faculty: facultyAdvisor,
    facultyId: facultyAdvisorId,
  }));
  
  const subjectScores = generateSubjectScores(subjects);
  const avgIA = subjectScores.reduce((sum, s) => sum + s.avgIA, 0) / subjectScores.length;
  const assignmentScore = subjectScores.reduce((sum, s) => sum + s.assignmentScore, 0) / subjectScores.length;
  
  const attendanceRecords: AttendanceRecord[] = subjects.map(s => ({
    subjectId: s.id,
    subjectName: s.name,
    attended: randomInt(15, 35),
    total: 40,
    percentage: randomInt(65, 95),
  }));
  
  const overallAttendance = Math.floor(attendanceRecords.reduce((sum, a) => sum + a.percentage, 0) / attendanceRecords.length);
  
  const cgpa = randomFloat(6.0, 9.5);
  const sgpa = randomFloat(6.0, 9.5);
  
  const overallGrade = cgpa >= 9 ? 'A+' : cgpa >= 8 ? 'A' : cgpa >= 7 ? 'B' : cgpa >= 6 ? 'C' : 'D';
  
  const riskAnalytics = generateRiskAnalytics(erpId, overallAttendance, avgIA, assignmentScore);
  
  const sentiment = riskAnalytics.riskScore > 65 ? 'negative' : riskAnalytics.riskScore > 40 ? 'neutral' : 'positive';
  const sentimentKeywords = sentiment === 'negative' 
    ? ['stressed', 'overwhelmed', 'struggling', 'anxious']
    : sentiment === 'positive'
    ? ['motivated', 'confident', 'engaged', 'focused']
    : ['neutral', 'steady'];
  
  const profile: StudentProfile = {
    id: `STU-${erpId}`,
    studentId: erpId,
    erpId,
    firstName,
    lastName,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${departmentCode.toLowerCase()}@arise.edu`,
    phone: generatePhone(),
    department: DEPARTMENTS[departmentCode].name,
    departmentCode,
    classId,
    className: classId,
    facultyAdvisor,
    facultyAdvisorId,
    academicYear: 3,
    semester: 5,
    batchYear,
    enrollmentDate: '2022-08-01',
    status: 'active',
    address: `${randomInt(1, 999)} Main Street, City`,
    dateOfBirth: `2002-${randomInt(1, 12)}-${randomInt(1, 28)}`,
    gender: Math.random() > 0.5 ? 'male' : 'female',
  };
  
  const competitions = generateCompetitions(randomInt(2, 5));
  const activityLog = generateActivityLog(erpId);
  
  const notifications: Notification[] = [
    {
      id: `NOTIF-${randomInt(1000, 9999)}`,
      userId: erpId,
      type: 'academic',
      priority: 'medium',
      title: 'Assignment Due',
      message: 'Database Management Systems assignment due in 2 days',
      timestamp: new Date().toISOString(),
      read: false,
    },
  ];
  
  if (riskAnalytics.riskScore > 65) {
    notifications.push({
      id: `NOTIF-${randomInt(1000, 9999)}`,
      userId: erpId,
      type: 'risk_alert',
      priority: 'high',
      title: 'Risk Alert',
      message: 'Your risk score indicates you may need academic support',
      timestamp: new Date().toISOString(),
      read: false,
    });
  }
  
  // Return comprehensive StudentData with both new structure and legacy fields
  return {
    profile,
    attendance: {
      overall: overallAttendance,
      subjectWise: attendanceRecords,
      weeklyTrend: Array.from({ length: 12 }, () => randomInt(70, 95)),
    },
    academics: {
      subjects: subjectScores,
      overallGrade,
      cgpa,
      sgpa,
    },
    competitions,
    riskAnalytics,
    activityLog,
    notifications,
    // Legacy fields for backward compatibility
    id: `STU-${erpId}`,
    name,
    erpId,
    classId,
    department: departmentCode,
    attendance_legacy: overallAttendance,
    assignmentScore: Math.floor(assignmentScore),
    gpa: cgpa,
    riskScore: riskAnalytics.riskScore,
    riskLevel: riskAnalytics.riskLevel === 'critical' ? 'high' : riskAnalytics.riskLevel,
    sentiment,
    sentimentKeywords,
    facultyFeedback: riskAnalytics.riskScore > 65 
      ? 'Student showing signs of academic stress. Counseling recommended.' 
      : riskAnalytics.riskScore > 40 
      ? 'Progress is steady but needs monitoring.' 
      : 'Student is performing well. Keep up the good work!',
    interventions: riskAnalytics.interventionSuggestions,
    weeklyAttendance: Array.from({ length: 8 }, () => randomInt(70, 95)),
    weeklyPerformance: Array.from({ length: 8 }, () => randomInt(60, 95)),
  };
}

// ============================================================================
// FACULTY GENERATOR
// ============================================================================

function generateFaculty(index: number, departmentCode: string, assignedClasses: string[]): FacultyProfile {
  const firstName = firstNames[(index + 50) % firstNames.length];
  const lastName = lastNames[(index + 20) % lastNames.length];
  const name = `${pickRandom(facultyTitles)} ${firstName} ${lastName}`;
  const facultyId = `FAC-${departmentCode}-${String(index + 1).padStart(3, '0')}`;
  
  const specializations: Record<string, string[]> = {
    CSE: ['Algorithms', 'AI/ML', 'Cybersecurity', 'Cloud Computing', 'Software Engineering', 'Data Science', 'Networks', 'Database Systems'],
    AIDS: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Mining', 'Big Data', 'Reinforcement Learning', 'Neural Networks'],
    ECE: ['Signal Processing', 'VLSI', 'Embedded Systems', 'Communication', 'RF Engineering', 'IoT', 'Robotics', 'Control Systems'],
    MECH: ['Thermodynamics', 'Fluid Mechanics', 'Manufacturing', 'CAD/CAM', 'Robotics', 'Automotive', 'Aerospace', 'Materials Science'],
  };
  
  return {
    id: facultyId,
    facultyId,
    name,
    email: `faculty${index + 1}.${departmentCode.toLowerCase()}@arise.edu`,
    phone: generatePhone(),
    department: DEPARTMENTS[departmentCode].name,
    departmentCode,
    designation: index === 0 ? 'Professor & HOD' : index < 3 ? 'Associate Professor' : 'Assistant Professor',
    specialization: pickRandom(specializations[departmentCode]),
    joinDate: `20${randomInt(10, 22)}-06-01`,
    assignedClasses,
    assignedSubjects: DEPARTMENTS[departmentCode].subjects.slice(0, 2).map(s => s.name),
  };
}

// ============================================================================
// HOD GENERATOR
// ============================================================================

function generateHOD(departmentCode: string): HODProfile {
  const firstName = firstNames[randomInt(0, firstNames.length - 1)];
  const lastName = lastNames[randomInt(0, lastNames.length - 1)];
  const name = `Dr. ${firstName} ${lastName}`;
  const hodId = `HOD-${departmentCode}`;
  
  return {
    id: hodId,
    hodId,
    name,
    email: `hod.${departmentCode.toLowerCase()}@arise.edu`,
    phone: generatePhone(),
    department: DEPARTMENTS[departmentCode].name,
    departmentCode,
    joinDate: '2015-06-01',
    facultyCount: 8,
    studentCount: 200,
  };
}

// ============================================================================
// GENERATE ALL DATA
// ============================================================================

export const allStudents: StudentData[] = [];
export const allFaculty: FacultyProfile[] = [];
export const allHODs: HODProfile[] = [];
export const classes: ClassData[] = [];
export const departments: DepartmentData[] = [];

// Generate data for each department
Object.keys(DEPARTMENTS).forEach((deptCode, deptIndex) => {
  const dept = DEPARTMENTS[deptCode];
  const classNames = [`${deptCode}-A`, `${deptCode}-B`, `${deptCode}-C`, `${deptCode}-D`];
  const hod = generateHOD(deptCode);
  allHODs.push(hod);
  
  // Generate faculty (2 per class = 8 per department)
  const deptFaculty: FacultyProfile[] = [];
  classNames.forEach((classId, classIdx) => {
    const faculty1 = generateFaculty(classIdx * 2, deptCode, [classId]);
    const faculty2 = generateFaculty(classIdx * 2 + 1, deptCode, [classId]);
    deptFaculty.push(faculty1, faculty2);
    allFaculty.push(faculty1, faculty2);
  });
  
  // Generate students (50 per class = 200 per department)
  let studentIndex = 0;
  classNames.forEach((classId, classIdx) => {
    const facultyAdvisor = deptFaculty[classIdx * 2].name;
    const facultyAdvisorId = deptFaculty[classIdx * 2].facultyId;
    
    const classStudents: StudentData[] = [];
    for (let i = 0; i < 50; i++) {
      const student = generateStudent(
        deptIndex * 200 + studentIndex,
        classId,
        deptCode,
        facultyAdvisor,
        facultyAdvisorId,
        2022
      );
      allStudents.push(student);
      classStudents.push(student);
      studentIndex++;
    }
    
    // Create class data
    const avgRisk = Math.floor(classStudents.reduce((sum, s) => sum + s.riskScore, 0) / 50);
    const avgAttendance = Math.floor(classStudents.reduce((sum, s) => sum + s.attendance.overall, 0) / 50);
    const avgPerformance = Math.floor(classStudents.reduce((sum, s) => sum + s.academics.cgpa, 0) / 50 * 10);
    
    classes.push({
      id: classId,
      name: `${deptCode} Class ${String.fromCharCode(65 + classIdx)}`,
      department: dept.name,
      departmentCode: deptCode,
      studentCount: 50,
      faculty: [deptFaculty[classIdx * 2].name, deptFaculty[classIdx * 2 + 1].name],
      facultyIds: [deptFaculty[classIdx * 2].facultyId, deptFaculty[classIdx * 2 + 1].facultyId],
      avgRisk,
      avgAttendance,
      avgPerformance,
      batchYear: 2022,
      semester: 5,
    });
  });
  
  // Create department data
  const deptStudents = allStudents.filter(s => s.department === deptCode);
  const avgRisk = Math.floor(deptStudents.reduce((sum, s) => sum + s.riskScore, 0) / 200);
  const avgAttendance = Math.floor(deptStudents.reduce((sum, s) => sum + s.attendance.overall, 0) / 200);
  const avgPerformance = Math.floor(deptStudents.reduce((sum, s) => sum + s.academics.cgpa, 0) / 200 * 10);
  
  departments.push({
    id: deptCode,
    name: dept.name,
    code: deptCode,
    totalStudents: 200,
    totalFaculty: 8,
    hod: hod.name,
    hodId: hod.hodId,
    classes: classNames,
    avgRisk,
    avgAttendance,
    avgPerformance,
  });
});

// ============================================================================
// MOCK USERS (LOGIN ACCOUNTS)
// ============================================================================

export const mockUsers: MockUser[] = [
  // Admin
  {
    id: 'admin-1',
    email: 'admin@arise.edu',
    password: 'demo123',
    role: 'admin',
    name: 'System Administrator',
    phone: '+91 98765 43210',
  },
  // HODs
  ...allHODs.map(hod => ({
    id: hod.id,
    email: hod.email,
    password: 'demo123',
    role: 'hod' as UserRole,
    name: hod.name,
    department: hod.departmentCode,
    phone: hod.phone,
  })),
  // Faculty
  ...allFaculty.map(fac => ({
    id: fac.id,
    email: fac.email,
    password: 'demo123',
    role: 'faculty' as UserRole,
    name: fac.name,
    department: fac.departmentCode,
    classId: fac.assignedClasses[0],
    phone: fac.phone,
  })),
  // Sample Students (4 - one from each department first class)
  ...departments.map((dept) => {
    const student = allStudents.find(s => s.department === dept.id && s.classId === `${dept.id}-A`);
    if (!student) return null;
    return {
      id: student.profile.id,
      email: `student.${dept.id.toLowerCase()}1@arise.edu`,
      password: 'demo123',
      role: 'student' as UserRole,
      name: student.name,
      department: dept.id,
      classId: student.classId,
      erpId: student.erpId,
      phone: student.profile.phone,
    };
  }).filter(Boolean) as MockUser[],
];

// Add a few more sample students
const additionalStudents = [
  { dept: 'CSE', classId: 'CSE-A' },
  { dept: 'AIDS', classId: 'AIDS-B' },
  { dept: 'ECE', classId: 'ECE-C' },
  { dept: 'MECH', classId: 'MECH-D' },
];

additionalStudents.forEach(({ dept, classId }) => {
  const student = allStudents.find(s => s.department === dept && s.classId === classId);
  if (student) {
    mockUsers.push({
      id: student.profile.id,
      email: `student.${dept.toLowerCase()}2@arise.edu`,
      password: 'demo123',
      role: 'student',
      name: student.name,
      department: dept,
      classId: student.classId,
      erpId: student.erpId,
      phone: student.profile.phone,
    });
  }
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getStudentData(erpId: string): StudentData | undefined {
  return allStudents.find(s => s.erpId === erpId);
}

export function getStudentByEmail(email: string): StudentData | undefined {
  const user = mockUsers.find(u => u.email === email && u.role === 'student');
  if (user?.erpId) {
    return getStudentData(user.erpId);
  }
  return undefined;
}

export function getClassStudents(classId: string): StudentData[] {
  return allStudents.filter(s => s.classId === classId);
}

export function getDepartmentStudents(department: string): StudentData[] {
  return allStudents.filter(s => s.department === department);
}

export function getFacultyByEmail(email: string): FacultyProfile | undefined {
  return allFaculty.find(f => f.email === email);
}

export function getHODByEmail(email: string): HODProfile | undefined {
  return allHODs.find(h => h.email === email);
}

export function getFacultyStudents(facultyId: string): StudentData[] {
  const faculty = allFaculty.find(f => f.facultyId === facultyId);
  if (!faculty) return [];
  return allStudents.filter(s => faculty.assignedClasses.includes(s.classId));
}

export function getRiskDistribution(students: StudentData[]) {
  return {
    safe: students.filter(s => s.riskLevel === 'safe').length,
    monitor: students.filter(s => s.riskLevel === 'monitor').length,
    high: students.filter(s => s.riskLevel === 'high').length,
    critical: students.filter(s => s.riskAnalytics?.riskLevel === 'critical').length,
  };
}

export function getGradeDistribution(students: StudentData[]) {
  const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  students.forEach(s => {
    grades[s.academics?.overallGrade as keyof typeof grades || 'D']++;
  });
  return grades;
}

export function getAttendanceDistribution(students: StudentData[]) {
  return {
    excellent: students.filter(s => (s.attendance?.overall || s.attendance_legacy) >= 90).length,
    good: students.filter(s => {
      const att = s.attendance?.overall || s.attendance_legacy;
      return att >= 75 && att < 90;
    }).length,
    average: students.filter(s => {
      const att = s.attendance?.overall || s.attendance_legacy;
      return att >= 60 && att < 75;
    }).length,
    poor: students.filter(s => (s.attendance?.overall || s.attendance_legacy) < 60).length,
  };
}

export function getCollegeStats() {
  return {
    totalStudents: allStudents.length,
    totalFaculty: allFaculty.length,
    totalHODs: allHODs.length,
    totalAdmins: 1,
    totalDepartments: departments.length,
    totalClasses: classes.length,
    avgRiskScore: Math.floor(allStudents.reduce((sum, s) => sum + s.riskScore, 0) / allStudents.length),
    avgAttendance: Math.floor(allStudents.reduce((sum, s) => sum + (s.attendance?.overall || s.attendance_legacy), 0) / allStudents.length),
    avgCGPA: Number((allStudents.reduce((sum, s) => sum + (s.academics?.cgpa || s.gpa), 0) / allStudents.length).toFixed(2)),
  };
}

export function getStudentById(studentId: string) {
  return allStudents.find(s => s.id === studentId || s.erpId === studentId);
}

export function getStudentAcademicProfile(studentId: string) {
  const student = allStudents.find(s => s.id === studentId || s.erpId === studentId);
  if (!student) return null;
  return {
    subjects: student.academics?.subjects || [],
    overallGrade: student.academics?.overallGrade || 'N/A',
    cgpa: student.academics?.cgpa || student.gpa || 0,
    sgpa: student.academics?.sgpa || 0,
    semesters: [],
    iaScores: student.academics?.subjects?.map((s: any) => ({
      subject: s.subject || s.name || 'Unknown',
      score: s.iaScore || 0,
      maxScore: 20,
    })) || [],
  };
}

export function getStudentAttendance(studentId: string) {
  const student = allStudents.find(s => s.id === studentId || s.erpId === studentId);
  if (!student) return null;
  return {
    overall: student.attendance?.overall || student.attendance_legacy || 0,
    monthly: [],
    subjects: student.attendance?.subjectWise?.map((s: any) => ({
      subject: s.subjectName || s.subject || 'Unknown',
      percentage: s.percentage || 0,
    })) || [],
  };
}

export function getStudentAssignments(studentId: string) {
  const student = allStudents.find(s => s.id === studentId || s.erpId === studentId);
  if (!student) return [];
  
  return student.academics?.subjects?.map((subj: any) => ({
    title: `${subj.subject || subj.name || 'Unknown'} Assignment`,
    subject: subj.subject || subj.name || 'Unknown',
    status: subj.assignmentScore > 80 ? 'submitted' : subj.assignmentScore > 60 ? 'pending' : 'late',
    score: subj.assignmentScore,
    dueDate: new Date().toISOString().split('T')[0],
  })) || [];
}

export function getStudentCompetitions(_studentId: string) {
  // Return mock competitions for any student
  return [
    { name: 'Hackathon 2024', organizer: 'Codefest', status: 'completed', date: '2024-03-15', teamSize: 4, description: '24-hour coding competition', certificateStatus: 'received' },
    { name: 'Paper Presentation', organizer: 'IEEE', status: 'completed', date: '2024-02-20', teamSize: 2, description: 'Technical paper on AI', certificateStatus: 'received' },
    { name: 'Robotics Challenge', organizer: 'RoboTech', status: 'ongoing', date: '2024-05-10', teamSize: 5, description: 'Autonomous robot design', certificateStatus: 'pending' },
  ];
}

export function getRiskAnalytics(studentId: string) {
  const student = allStudents.find(s => s.id === studentId || s.erpId === studentId);
  if (!student) return null;
  return student.riskAnalytics;
}

// Demo accounts summary for login page
export const demoAccounts = [
  { label: 'Admin', email: 'admin@arise.edu', password: 'demo123', role: 'System Administrator' },
  { label: 'HOD CSE', email: 'hod.cse@arise.edu', password: 'demo123', role: 'Head of Department' },
  { label: 'HOD AIDS', email: 'hod.aids@arise.edu', password: 'demo123', role: 'Head of Department' },
  { label: 'HOD ECE', email: 'hod.ece@arise.edu', password: 'demo123', role: 'Head of Department' },
  { label: 'HOD MECH', email: 'hod.mech@arise.edu', password: 'demo123', role: 'Head of Department' },
  { label: 'Faculty CSE', email: 'faculty1.cse@arise.edu', password: 'demo123', role: 'Faculty' },
  { label: 'Faculty AIDS', email: 'faculty1.aids@arise.edu', password: 'demo123', role: 'Faculty' },
  { label: 'Student CSE', email: 'student.cse1@arise.edu', password: 'demo123', role: 'Student' },
  { label: 'Student AIDS', email: 'student.aids1@arise.edu', password: 'demo123', role: 'Student' },
];

export { firstNames, lastNames };

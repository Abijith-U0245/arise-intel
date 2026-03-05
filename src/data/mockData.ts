/**
 * Mock data for A.R.I.S.E. Role-Based Demo
 * CSE Department: 200 students, 4 classes, 8 faculty, 1 HOD
 */

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
}

export interface StudentData {
  id: string;
  name: string;
  erpId: string;
  classId: string;
  department: string;
  attendance: number;
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

export interface ClassData {
  id: string;
  name: string;
  department: string;
  studentCount: number;
  faculty: string[];
  avgRisk: number;
  avgAttendance: number;
  avgPerformance: number;
}

export interface DepartmentData {
  id: string;
  name: string;
  totalStudents: number;
  totalFaculty: number;
  hod: string;
  classes: string[];
  avgRisk: number;
}

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
  'Chauhan', 'Thakur', 'Yadav', 'Tiwari',
];

function generateStudents(classId: string, classIndex: number): StudentData[] {
  const students: StudentData[] = [];
  for (let i = 0; i < 50; i++) {
    const idx = classIndex * 50 + i;
    const firstName = firstNames[idx % firstNames.length];
    const lastName = lastNames[idx % lastNames.length];
    const attendance = Math.floor(Math.random() * 40) + 60;
    const assignmentScore = Math.floor(Math.random() * 50) + 50;
    const gpa = +(Math.random() * 3 + 1).toFixed(2);
    const riskScore = Math.floor(Math.random() * 100);
    const riskLevel: StudentData['riskLevel'] = riskScore > 65 ? 'high' : riskScore > 40 ? 'monitor' : 'safe';
    const sentiments: StudentData['sentiment'][] = ['positive', 'neutral', 'negative'];
    const sentiment = riskScore > 65 ? 'negative' : riskScore > 40 ? 'neutral' : sentiments[Math.floor(Math.random() * 2)];
    const negKeywords = ['overwhelmed', 'struggling', 'anxious', 'stressed', 'confused'];
    const posKeywords = ['motivated', 'confident', 'engaged', 'focused'];
    const sentimentKeywords = sentiment === 'negative'
      ? negKeywords.slice(0, Math.floor(Math.random() * 3) + 1)
      : sentiment === 'positive'
        ? posKeywords.slice(0, Math.floor(Math.random() * 2) + 1)
        : ['neutral'];

    students.push({
      id: `STU-${classId}-${String(i + 1).padStart(3, '0')}`,
      name: `${firstName} ${lastName}`,
      erpId: `ERP${String(2024000 + idx).padStart(7, '0')}`,
      classId,
      department: 'CSE',
      attendance,
      assignmentScore,
      gpa,
      riskScore,
      riskLevel,
      sentiment,
      sentimentKeywords,
      facultyFeedback: riskLevel === 'high'
        ? 'Needs immediate academic support and mentoring.'
        : riskLevel === 'monitor'
          ? 'Showing some decline, monitor closely.'
          : 'Performing well, keep up the good work.',
      interventions: riskLevel === 'high'
        ? ['Counseling referral triggered', 'Faculty meeting scheduled']
        : riskLevel === 'monitor'
          ? ['Academic support recommended']
          : [],
      weeklyAttendance: Array.from({ length: 8 }, () => Math.floor(Math.random() * 30) + 70),
      weeklyPerformance: Array.from({ length: 8 }, () => Math.floor(Math.random() * 40) + 55),
    });
  }
  return students;
}

const classNames = ['CSE-A', 'CSE-B', 'CSE-C', 'CSE-D'];

export const allStudents: StudentData[] = classNames.flatMap((cn, i) => generateStudents(cn, i));

export const classes: ClassData[] = classNames.map((cn, i) => {
  const classStudents = allStudents.filter(s => s.classId === cn);
  return {
    id: cn,
    name: `Class ${String.fromCharCode(65 + i)}`,
    department: 'CSE',
    studentCount: 50,
    faculty: [`Dr. Faculty ${i * 2 + 1}`, `Dr. Faculty ${i * 2 + 2}`],
    avgRisk: Math.round(classStudents.reduce((a, s) => a + s.riskScore, 0) / 50),
    avgAttendance: Math.round(classStudents.reduce((a, s) => a + s.attendance, 0) / 50),
    avgPerformance: Math.round(classStudents.reduce((a, s) => a + s.assignmentScore, 0) / 50),
  };
});

export const departments: DepartmentData[] = [{
  id: 'CSE',
  name: 'Computer Science & Engineering',
  totalStudents: 200,
  totalFaculty: 8,
  hod: 'Dr. Rajesh Krishnan',
  classes: classNames,
  avgRisk: Math.round(allStudents.reduce((a, s) => a + s.riskScore, 0) / 200),
}];

export const mockUsers: MockUser[] = [
  // Admin
  { id: 'admin-1', email: 'admin@arise.edu', password: 'admin123', role: 'admin', name: 'System Admin' },
  // HOD
  { id: 'hod-1', email: 'hod@arise.edu', password: 'hod123', role: 'hod', name: 'Dr. Rajesh Krishnan', department: 'CSE' },
  // Faculty (one per class for demo)
  { id: 'fac-1', email: 'faculty1@arise.edu', password: 'faculty123', role: 'faculty', name: 'Dr. Faculty 1', department: 'CSE', classId: 'CSE-A' },
  { id: 'fac-2', email: 'faculty2@arise.edu', password: 'faculty123', role: 'faculty', name: 'Dr. Faculty 3', department: 'CSE', classId: 'CSE-B' },
  { id: 'fac-3', email: 'faculty3@arise.edu', password: 'faculty123', role: 'faculty', name: 'Dr. Faculty 5', department: 'CSE', classId: 'CSE-C' },
  { id: 'fac-4', email: 'faculty4@arise.edu', password: 'faculty123', role: 'faculty', name: 'Dr. Faculty 7', department: 'CSE', classId: 'CSE-D' },
  // Student (demo)
  { id: 'stu-1', email: 'student@arise.edu', password: 'student123', role: 'student', name: allStudents[0].name, department: 'CSE', classId: 'CSE-A', erpId: allStudents[0].erpId },
];

export function getStudentData(erpId: string): StudentData | undefined {
  return allStudents.find(s => s.erpId === erpId);
}

export function getClassStudents(classId: string): StudentData[] {
  return allStudents.filter(s => s.classId === classId);
}

export function getDepartmentStudents(department: string): StudentData[] {
  return allStudents.filter(s => s.department === department);
}

export function getRiskDistribution(students: StudentData[]) {
  return {
    safe: students.filter(s => s.riskLevel === 'safe').length,
    monitor: students.filter(s => s.riskLevel === 'monitor').length,
    high: students.filter(s => s.riskLevel === 'high').length,
  };
}

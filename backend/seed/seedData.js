const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

// Models
const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');
const Class = require('../models/Class');

// Department data
const DEPARTMENTS = {
  CSE: {
    name: 'Computer Science Engineering',
    subjects: [
      { id: 'CS301', name: 'Data Structures', code: 'CS301', credits: 4, type: 'theory' },
      { id: 'CS302', name: 'Algorithms', code: 'CS302', credits: 4, type: 'theory' },
      { id: 'CS303', name: 'Database Systems', code: 'CS303', credits: 4, type: 'theory' },
      { id: 'CS304', name: 'Operating Systems', code: 'CS304', credits: 4, type: 'theory' },
      { id: 'CS305', name: 'Computer Networks', code: 'CS305', credits: 3, type: 'theory' },
      { id: 'CS306', name: 'Software Engineering', code: 'CS306', credits: 3, type: 'theory' },
      { id: 'CS307', name: 'Web Technologies Lab', code: 'CS307', credits: 2, type: 'lab' },
      { id: 'CS308', name: 'DBMS Lab', code: 'CS308', credits: 2, type: 'lab' }
    ]
  },
  AIDS: {
    name: 'Artificial Intelligence & Data Science',
    subjects: [
      { id: 'AI301', name: 'Machine Learning', code: 'AI301', credits: 4, type: 'theory' },
      { id: 'AI302', name: 'Deep Learning', code: 'AI302', credits: 4, type: 'theory' },
      { id: 'AI303', name: 'Data Mining', code: 'AI303', credits: 4, type: 'theory' },
      { id: 'AI304', name: 'Natural Language Processing', code: 'AI304', credits: 3, type: 'theory' },
      { id: 'AI305', name: 'Computer Vision', code: 'AI305', credits: 3, type: 'theory' },
      { id: 'AI306', name: 'Big Data Analytics', code: 'AI306', credits: 3, type: 'theory' },
      { id: 'AI307', name: 'ML Lab', code: 'AI307', credits: 2, type: 'lab' },
      { id: 'AI308', name: 'Data Science Lab', code: 'AI308', credits: 2, type: 'lab' }
    ]
  },
  ECE: {
    name: 'Electronics & Communication Engineering',
    subjects: [
      { id: 'EC301', name: 'Digital Signal Processing', code: 'EC301', credits: 4, type: 'theory' },
      { id: 'EC302', name: 'VLSI Design', code: 'EC302', credits: 4, type: 'theory' },
      { id: 'EC303', name: 'Embedded Systems', code: 'EC303', credits: 4, type: 'theory' },
      { id: 'EC304', name: 'Communication Theory', code: 'EC304', credits: 3, type: 'theory' },
      { id: 'EC305', name: 'Microprocessors', code: 'EC305', credits: 3, type: 'theory' },
      { id: 'EC306', name: 'Control Systems', code: 'EC306', credits: 3, type: 'theory' },
      { id: 'EC307', name: 'Embedded Lab', code: 'EC307', credits: 2, type: 'lab' },
      { id: 'EC308', name: 'DSP Lab', code: 'EC308', credits: 2, type: 'lab' }
    ]
  },
  MECH: {
    name: 'Mechanical Engineering',
    subjects: [
      { id: 'ME301', name: 'Thermodynamics', code: 'ME301', credits: 4, type: 'theory' },
      { id: 'ME302', name: 'Fluid Mechanics', code: 'ME302', credits: 4, type: 'theory' },
      { id: 'ME303', name: 'Manufacturing Processes', code: 'ME303', credits: 4, type: 'theory' },
      { id: 'ME304', name: 'Machine Design', code: 'ME304', credits: 3, type: 'theory' },
      { id: 'ME305', name: 'Heat Transfer', code: 'ME305', credits: 3, type: 'theory' },
      { id: 'ME306', name: 'CAD/CAM', code: 'ME306', credits: 3, type: 'theory' },
      { id: 'ME307', name: 'Manufacturing Lab', code: 'ME307', credits: 2, type: 'lab' },
      { id: 'ME308', name: 'CAD Lab', code: 'ME308', credits: 2, type: 'lab' }
    ]
  }
};

// Helper functions
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max) => Number((Math.random() * (max - min) + min).toFixed(2));
const generateERPId = (dept, year, index) => `${year}${dept}${String(index + 1).padStart(3, '0')}`;
const generatePhone = () => `+91 ${randomInt(70000, 99999)} ${randomInt(10000, 99999)}`;

const firstNames = ['Aarav', 'Aditi', 'Arjun', 'Ananya', 'Aryan', 'Bhavya', 'Chetan', 'Diya', 'Esha', 'Farhan',
  'Gaurav', 'Harini', 'Ishaan', 'Jhanvi', 'Kabir', 'Lakshmi', 'Manav', 'Neha', 'Omkar', 'Prisha',
  'Rahul', 'Saanvi', 'Tanish', 'Urvi', 'Vedant', 'Yashvi', 'Zara', 'Amit', 'Bella', 'Dev'];

const lastNames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Reddy', 'Nair', 'Iyer', 'Desai', 'Shah',
  'Mehta', 'Joshi', 'Pandey', 'Rao', 'Malhotra', 'Banerjee', 'Chatterjee', 'Aggarwal', 'Verma', 'Jain'];

const facultyTitles = ['Prof.', 'Dr.', 'Mr.', 'Ms.'];
const specializations = {
  CSE: ['Algorithms', 'AI/ML', 'Cybersecurity', 'Cloud Computing', 'Software Engineering'],
  AIDS: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Big Data'],
  ECE: ['Signal Processing', 'VLSI', 'Embedded Systems', 'IoT', 'Robotics'],
  MECH: ['Thermodynamics', 'Fluid Mechanics', 'Manufacturing', 'CAD/CAM', 'Robotics']
};

// Generate risk analytics
const generateRiskAnalytics = (attendance, avgIA, assignmentScore) => {
  const attendanceFactor = (100 - attendance) * 0.4;
  const iaFactor = (100 - avgIA) * 0.3;
  const assignmentFactor = (100 - assignmentScore) * 0.2;
  const sentimentFactor = Math.random() * 10;
  
  let riskScore = Math.floor(attendanceFactor + iaFactor + assignmentFactor + sentimentFactor);
  riskScore = Math.min(100, Math.max(0, riskScore));
  
  const riskLevel = riskScore > 85 ? 'critical' : riskScore > 65 ? 'high' : riskScore > 40 ? 'monitor' : 'safe';
  
  return {
    riskScore,
    riskLevel,
    riskFactors: [
      { name: 'Attendance', weight: 0.4, score: Math.floor((100 - attendance) * 0.8), trend: attendance > 80 ? 'stable' : 'declining', details: 'Attendance analysis' },
      { name: 'Academic', weight: 0.3, score: Math.floor((100 - avgIA) * 0.8), trend: avgIA > 70 ? 'stable' : 'declining', details: 'Academic performance' },
      { name: 'Engagement', weight: 0.2, score: Math.floor((100 - assignmentScore) * 0.8), trend: 'stable', details: 'Engagement metrics' },
      { name: 'Sentiment', weight: 0.1, score: Math.floor(Math.random() * 30), trend: 'stable', details: 'Sentiment analysis' }
    ],
    dropoutProbability: riskScore > 70 ? randomFloat(0.3, 0.8) : riskScore > 50 ? randomFloat(0.1, 0.3) : randomFloat(0, 0.1),
    keyTriggers: riskScore > 65 ? ['Low attendance', 'Poor academic performance'] : ['Good standing'],
    interventionSuggestions: riskScore > 85 ? ['Immediate counseling', 'Advisor meeting'] : riskScore > 65 ? ['Monitor closely', 'Tutoring'] : ['Continue good work'],
    modelVersion: 'ARISE-v2.4.1',
    confidence: randomFloat(0.85, 0.98)
  };
};

// Seed data
const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Student.deleteMany({});
    await Faculty.deleteMany({});
    await Department.deleteMany({});
    await Class.deleteMany({});

    // Create Admin
    console.log('Creating admin...');
    await User.create({
      name: 'System Administrator',
      email: 'admin@arise.edu',
      password: 'demo123',
      role: 'admin',
      phone: generatePhone()
    });

    // Create departments
    console.log('Creating departments...');
    for (const [code, data] of Object.entries(DEPARTMENTS)) {
      await Department.create({
        name: data.name,
        code: code,
        subjects: data.subjects,
        classes: [`${code}-A`, `${code}-B`, `${code}-C`, `${code}-D`],
        totalStudents: 0,
        totalFaculty: 0
      });
    }

    // Create data for each department
    for (const deptCode of Object.keys(DEPARTMENTS)) {
      console.log(`Creating data for ${deptCode}...`);
      const dept = DEPARTMENTS[deptCode];
      const classNames = [`${deptCode}-A`, `${deptCode}-B`, `${deptCode}-C`, `${deptCode}-D`];

      // Create HOD
      const hodName = `Dr. ${firstNames[randomInt(0, firstNames.length - 1)]} ${lastNames[randomInt(0, lastNames.length - 1)]}`;
      const hodEmail = `hod.${deptCode.toLowerCase()}@arise.edu`;
      
      const hodUser = await User.create({
        name: hodName,
        email: hodEmail,
        password: 'demo123',
        role: 'hod',
        phone: generatePhone(),
        department: deptCode
      });

      await Department.findOneAndUpdate(
        { code: deptCode },
        { hod: { name: hodName, hodId: `HOD-${deptCode}` } }
      );

      // Create faculty (2 per class = 8 per department)
      const deptFaculty = [];
      for (let i = 0; i < 8; i++) {
        const classIdx = Math.floor(i / 2);
        const firstName = firstNames[(i + 50) % firstNames.length];
        const lastName = lastNames[(i + 20) % lastNames.length];
        const name = `${facultyTitles[randomInt(0, 1)]} ${firstName} ${lastName}`;
        const email = `faculty${i + 1}.${deptCode.toLowerCase()}@arise.edu`;
        
        const user = await User.create({
          name,
          email,
          password: 'demo123',
          role: 'faculty',
          phone: generatePhone(),
          department: deptCode
        });

        const faculty = await Faculty.create({
          user: user._id,
          facultyId: `FAC-${deptCode}-${String(i + 1).padStart(3, '0')}`,
          name,
          email,
          phone: generatePhone(),
          department: dept.name,
          departmentCode: deptCode,
          designation: i === 0 ? 'Professor & HOD' : i < 3 ? 'Associate Professor' : 'Assistant Professor',
          specialization: specializations[deptCode][i % specializations[deptCode].length],
          joinDate: `20${randomInt(10, 22)}-06-01`,
          assignedClasses: [classNames[classIdx]],
          assignedSubjects: dept.subjects.slice(0, 2).map(s => s.name),
          isHOD: false
        });

        deptFaculty.push(faculty);
      }

      // Create classes
      for (let i = 0; i < 4; i++) {
        await Class.create({
          name: `${deptCode} Class ${String.fromCharCode(65 + i)}`,
          classId: classNames[i],
          department: dept.name,
          departmentCode: deptCode,
          studentCount: 0,
          faculty: [deptFaculty[i * 2].name, deptFaculty[i * 2 + 1].name],
          facultyIds: [deptFaculty[i * 2].facultyId, deptFaculty[i * 2 + 1].facultyId],
          batchYear: 2022,
          semester: 5,
          students: []
        });
      }

      // Create students (50 per class = 200 per department)
      let studentIndex = 0;
      for (const classId of classNames) {
        const facultyAdvisor = deptFaculty[studentIndex % 8].name;
        const facultyAdvisorId = deptFaculty[studentIndex % 8].facultyId;
        const classInfo = await Class.findOne({ classId });

        for (let i = 0; i < 50; i++) {
          const firstName = firstNames[studentIndex % firstNames.length];
          const lastName = lastNames[studentIndex % lastNames.length];
          const name = `${firstName} ${lastName}`;
          const erpId = generateERPId(deptCode, 22, studentIndex);
          const email = `student.${deptCode.toLowerCase()}${(studentIndex % 4) + 1}@arise.edu`;

          const user = await User.create({
            name,
            email: studentIndex < 4 ? email : `${erpId.toLowerCase()}@arise.edu`,
            password: 'demo123',
            role: 'student',
            phone: generatePhone(),
            department: deptCode
          });

          const attendance = randomInt(65, 95);
          const cgpa = randomFloat(6.0, 9.5);
          const avgIA = cgpa * 10;

          const student = await Student.create({
            user: user._id,
            profile: {
              firstName,
              lastName,
              erpId,
              email: user.email,
              phone: generatePhone(),
              department: dept.name,
              departmentCode: deptCode,
              classId,
              className: classId,
              facultyAdvisor,
              facultyAdvisorId,
              academicYear: 3,
              semester: 5,
              batchYear: 2022,
              enrollmentDate: '2022-08-01',
              status: 'active'
            },
            attendance: {
              overall: attendance,
              subjectWise: dept.subjects.map((s, idx) => ({
                subjectId: s.id,
                subjectName: s.name,
                attended: randomInt(20, 35),
                total: 40,
                percentage: randomInt(65, 95)
              })),
              weeklyTrend: Array.from({ length: 12 }, () => randomInt(70, 95))
            },
            academics: {
              subjects: dept.subjects.map((s, idx) => {
                const ia1 = randomInt(15, 30);
                const ia2 = randomInt(15, 30);
                const ia3 = randomInt(15, 30);
                const avgIA = Number(((ia1 + ia2 + ia3) / 3).toFixed(1));
                const assignmentScore = randomInt(60, 100);
                const quizScore = randomInt(50, 100);
                const totalScore = (avgIA * 0.3) + (assignmentScore * 0.2) + (quizScore * 0.2) + (attendance * 0.2);
                const grade = totalScore >= 90 ? 'A' : totalScore >= 80 ? 'B' : totalScore >= 70 ? 'C' : totalScore >= 60 ? 'D' : 'F';

                return {
                  subjectId: s.id,
                  subjectName: s.name,
                  subjectCode: s.code,
                  faculty: facultyAdvisor,
                  ia1, ia2, ia3, avgIA,
                  assignmentScore,
                  quizScore,
                  labScore: s.type === 'lab' ? randomInt(60, 100) : 0,
                  attendance: randomInt(70, 100),
                  grade
                };
              }),
              overallGrade: cgpa >= 9 ? 'A+' : cgpa >= 8 ? 'A' : cgpa >= 7 ? 'B' : cgpa >= 6 ? 'C' : 'D',
              cgpa,
              sgpa: cgpa
            },
            competitions: [
              { name: 'Hackathon 2024', type: 'hackathon', organizer: 'Codefest', date: '2024-03-15', status: Math.random() > 0.7 ? 'won' : 'participated', teamSize: 4, description: 'Coding competition' },
              { name: 'Paper Presentation', type: 'paper', organizer: 'IEEE', date: '2024-02-20', status: 'participated', teamSize: 2, description: 'Technical paper' }
            ],
            riskAnalytics: generateRiskAnalytics(attendance, avgIA, 75),
            sentiment: 'neutral',
            sentimentKeywords: ['neutral', 'steady'],
            activities: [
              { type: 'login', title: 'Logged in', description: 'User login', timestamp: new Date() }
            ],
            notifications: []
          });

          classInfo.students.push(student._id);
          studentIndex++;
        }

        classInfo.studentCount = classInfo.students.length;
        await classInfo.save();
      }

      // Update department stats
      const deptStudents = await Student.find({ 'profile.departmentCode': deptCode });
      const avgRisk = Math.floor(deptStudents.reduce((sum, s) => sum + (s.riskAnalytics?.riskScore || 0), 0) / deptStudents.length);
      const avgAttendance = Math.floor(deptStudents.reduce((sum, s) => sum + (s.attendance?.overall || 0), 0) / deptStudents.length);
      const avgCGPA = Number((deptStudents.reduce((sum, s) => sum + (s.academics?.cgpa || 0), 0) / deptStudents.length).toFixed(2));

      await Department.findOneAndUpdate(
        { code: deptCode },
        {
          totalStudents: deptStudents.length,
          totalFaculty: 8,
          avgRisk,
          avgAttendance,
          avgPerformance: avgCGPA * 10
        }
      );
    }

    console.log('\n✅ Data seeded successfully!');
    console.log('\nDemo Accounts:');
    console.log('Admin: admin@arise.edu / demo123');
    console.log('HOD CSE: hod.cse@arise.edu / demo123');
    console.log('HOD AIDS: hod.aids@arise.edu / demo123');
    console.log('Faculty: faculty1.cse@arise.edu / demo123');
    console.log('Student: student.cse1@arise.edu / demo123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

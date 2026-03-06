const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');
const Class = require('../models/Class');
const Notification = require('../models/Notification');

// Helper function to calculate risk score
const calculateRiskScore = (attendance, avgIA, assignmentScore, activityLevel = 50) => {
  const attendanceFactor = (100 - attendance) * 0.4;
  const iaFactor = (100 - avgIA) * 0.3;
  const assignmentFactor = (100 - assignmentScore) * 0.2;
  const activityFactor = (100 - activityLevel) * 0.1;
  
  let riskScore = Math.floor(attendanceFactor + iaFactor + assignmentFactor + activityFactor);
  return Math.min(100, Math.max(0, riskScore));
};

// @desc    Add Department
// @route   POST /api/admin/add-department
// @access  Admin
const addDepartment = async (req, res) => {
  try {
    const { name, code, subjects } = req.body;

    const existingDept = await Department.findOne({ code });
    if (existingDept) {
      return res.status(400).json({ message: 'Department code already exists' });
    }

    const department = await Department.create({
      name,
      code,
      subjects: subjects || [],
      classes: [],
      totalStudents: 0,
      totalFaculty: 0
    });

    res.status(201).json({
      message: 'Department created successfully',
      department
    });
  } catch (error) {
    console.error('Add department error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add HOD
// @route   POST /api/admin/add-hod
// @access  Admin
const addHOD = async (req, res) => {
  try {
    const { name, email, phone, departmentCode, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if department exists
    const department = await Department.findOne({ code: departmentCode });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: password || 'demo123',
      role: 'hod',
      phone,
      department: departmentCode
    });

    // Update department with HOD
    department.hod = {
      name,
      hodId: `HOD-${departmentCode}`
    };
    await department.save();

    res.status(201).json({
      message: 'HOD added successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (error) {
    console.error('Add HOD error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add Faculty
// @route   POST /api/admin/add-faculty
// @access  Admin
const addFaculty = async (req, res) => {
  try {
    const { name, email, phone, departmentCode, designation, specialization, assignedClasses, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: password || 'demo123',
      role: 'faculty',
      phone,
      department: departmentCode
    });

    // Create faculty profile
    const facultyCount = await Faculty.countDocuments({ departmentCode });
    const faculty = await Faculty.create({
      user: user._id,
      facultyId: `FAC-${departmentCode}-${String(facultyCount + 1).padStart(3, '0')}`,
      name,
      email,
      phone,
      department: (await Department.findOne({ code: departmentCode }))?.name || departmentCode,
      departmentCode,
      designation: designation || 'Assistant Professor',
      specialization: specialization || '',
      assignedClasses: assignedClasses || [],
      assignedSubjects: []
    });

    // Update department faculty count
    await Department.findOneAndUpdate(
      { code: departmentCode },
      { $inc: { totalFaculty: 1 } }
    );

    res.status(201).json({
      message: 'Faculty added successfully',
      faculty
    });
  } catch (error) {
    console.error('Add faculty error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add Student
// @route   POST /api/admin/add-student
// @access  Admin
const addStudent = async (req, res) => {
  try {
    const { 
      firstName, lastName, email, phone, departmentCode, classId, 
      batchYear, erpId, password, attendance, cgpa 
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if ERP ID exists
    const existingStudent = await Student.findOne({ 'profile.erpId': erpId });
    if (existingStudent) {
      return res.status(400).json({ message: 'ERP ID already exists' });
    }

    // Get department and class info
    const department = await Department.findOne({ code: departmentCode });
    const classInfo = await Class.findOne({ classId });

    // Create user
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: password || 'demo123',
      role: 'student',
      phone,
      department: departmentCode
    });

    // Calculate risk score
    const riskScore = calculateRiskScore(
      attendance || 85,
      cgpa ? cgpa * 10 : 75,
      70,
      60
    );

    const riskLevel = riskScore > 85 ? 'critical' : riskScore > 65 ? 'high' : riskScore > 40 ? 'monitor' : 'safe';

    // Create student profile
    const student = await Student.create({
      user: user._id,
      profile: {
        firstName,
        lastName,
        erpId,
        email,
        phone: phone || '',
        department: department?.name || departmentCode,
        departmentCode,
        classId,
        className: classId,
        academicYear: 3,
        semester: 5,
        batchYear: batchYear || 2022,
        facultyAdvisor: classInfo?.faculty?.[0] || '',
        facultyAdvisorId: classInfo?.facultyIds?.[0] || ''
      },
      attendance: {
        overall: attendance || 85,
        subjectWise: [],
        weeklyTrend: []
      },
      academics: {
        subjects: [],
        overallGrade: cgpa >= 9 ? 'A+' : cgpa >= 8 ? 'A' : cgpa >= 7 ? 'B' : cgpa >= 6 ? 'C' : 'D',
        cgpa: cgpa || 7.5,
        sgpa: cgpa || 7.5
      },
      riskAnalytics: {
        riskScore,
        riskLevel,
        riskFactors: [
          { name: 'Attendance', weight: 0.4, score: Math.floor((100 - (attendance || 85)) * 0.8), trend: 'stable', details: 'Attendance factor' },
          { name: 'Academic', weight: 0.3, score: Math.floor((100 - (cgpa || 7.5) * 10) * 0.8), trend: 'stable', details: 'Academic factor' },
          { name: 'Engagement', weight: 0.2, score: 20, trend: 'stable', details: 'Engagement factor' },
          { name: 'Sentiment', weight: 0.1, score: 15, trend: 'stable', details: 'Sentiment factor' }
        ],
        dropoutProbability: riskScore > 70 ? 0.5 : riskScore > 50 ? 0.2 : 0.05,
        keyTriggers: riskScore > 65 ? ['Attendance issues', 'Academic performance'] : ['Good standing'],
        interventionSuggestions: riskScore > 85 ? ['Immediate counseling', 'Advisor meeting'] : riskScore > 65 ? ['Monitor closely'] : ['Continue good work']
      },
      sentiment: 'neutral',
      sentimentKeywords: ['neutral', 'steady']
    });

    // Update class student count and add student to class
    if (classInfo) {
      classInfo.students.push(student._id);
      classInfo.studentCount = classInfo.students.length;
      await classInfo.save();
    }

    // Update department student count
    await Department.findOneAndUpdate(
      { code: departmentCode },
      { $inc: { totalStudents: 1 } }
    );

    res.status(201).json({
      message: 'Student added successfully',
      student
    });
  } catch (error) {
    console.error('Add student error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all departments
// @route   GET /api/admin/departments
// @access  Admin
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ code: 1 });
    res.json(departments);
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all faculty
// @route   GET /api/admin/faculty
// @access  Admin
const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().populate('user', 'email phone isActive').sort({ createdAt: -1 });
    res.json(faculty);
  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Admin
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('user', 'email phone isActive')
      .select('-activities -notifications')
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get global analytics
// @route   GET /api/admin/analytics
// @access  Admin
const getAnalytics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalFaculty = await Faculty.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalClasses = await Class.countDocuments();

    // Risk distribution
    const riskDistribution = await Student.aggregate([
      {
        $group: {
          _id: '$riskAnalytics.riskLevel',
          count: { $sum: 1 }
        }
      }
    ]);

    // Average metrics
    const avgMetrics = await Student.aggregate([
      {
        $group: {
          _id: null,
          avgRiskScore: { $avg: '$riskAnalytics.riskScore' },
          avgAttendance: { $avg: '$attendance.overall' },
          avgCGPA: { $avg: '$academics.cgpa' }
        }
      }
    ]);

    // Department-wise stats
    const departmentStats = await Department.find().select('name code totalStudents totalFaculty avgRisk avgAttendance avgPerformance');

    res.json({
      overview: {
        totalStudents,
        totalFaculty,
        totalDepartments,
        totalClasses,
        avgRiskScore: Math.round(avgMetrics[0]?.avgRiskScore || 0),
        avgAttendance: Math.round(avgMetrics[0]?.avgAttendance || 0),
        avgCGPA: Number((avgMetrics[0]?.avgCGPA || 0).toFixed(2))
      },
      riskDistribution: riskDistribution.reduce((acc, item) => {
        acc[item._id || 'unknown'] = item.count;
        return acc;
      }, {}),
      departmentStats
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addDepartment,
  addHOD,
  addFaculty,
  addStudent,
  getDepartments,
  getAllFaculty,
  getAllStudents,
  getAnalytics
};

const Department = require('../models/Department');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Class = require('../models/Class');
const Notification = require('../models/Notification');

// @desc    Get department overview
// @route   GET /api/hod/department-overview
// @access  HOD
const getDepartmentOverview = async (req, res) => {
  try {
    const department = await Department.findOne({ code: req.user.department });
    
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Get all classes in department
    const classes = await Class.find({ departmentCode: department.code });
    
    // Get all students in department
    const students = await Student.find({ 'profile.departmentCode': department.code })
      .select('profile riskAnalytics attendance.overall academics.cgpa');

    // Get all faculty in department
    const faculty = await Faculty.find({ departmentCode: department.code });

    // Calculate department stats
    const avgRisk = students.length > 0 
      ? students.reduce((sum, s) => sum + (s.riskAnalytics?.riskScore || 0), 0) / students.length 
      : 0;
    
    const avgAttendance = students.length > 0
      ? students.reduce((sum, s) => sum + (s.attendance?.overall || 0), 0) / students.length
      : 0;
    
    const avgCGPA = students.length > 0
      ? students.reduce((sum, s) => sum + (s.academics?.cgpa || 0), 0) / students.length
      : 0;

    // Risk distribution
    const riskDistribution = {
      safe: students.filter(s => s.riskAnalytics?.riskLevel === 'safe').length,
      monitor: students.filter(s => s.riskAnalytics?.riskLevel === 'monitor').length,
      high: students.filter(s => s.riskAnalytics?.riskLevel === 'high').length,
      critical: students.filter(s => s.riskAnalytics?.riskLevel === 'critical').length
    };

    res.json({
      department: {
        name: department.name,
        code: department.code,
        totalStudents: students.length,
        totalFaculty: faculty.length,
        hod: department.hod
      },
      stats: {
        avgRisk: Math.round(avgRisk),
        avgAttendance: Math.round(avgAttendance),
        avgCGPA: Number(avgCGPA.toFixed(2)),
        riskDistribution
      },
      classes: classes.map(c => ({
        id: c.classId,
        name: c.name,
        studentCount: c.studentCount,
        avgRisk: c.avgRisk,
        avgAttendance: c.avgAttendance,
        faculty: c.faculty
      })),
      faculty: faculty.map(f => ({
        id: f.facultyId,
        name: f.name,
        designation: f.designation,
        specialization: f.specialization,
        assignedClasses: f.assignedClasses
      }))
    });
  } catch (error) {
    console.error('Department overview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get class analytics
// @route   GET /api/hod/class-analytics
// @access  HOD
const getClassAnalytics = async (req, res) => {
  try {
    const { classId } = req.query;
    
    const query = { 'profile.departmentCode': req.user.department };
    if (classId) {
      query['profile.classId'] = classId;
    }

    const students = await Student.find(query)
      .select('profile riskAnalytics attendance academics');

    const classStats = await Class.find({ departmentCode: req.user.department });

    // Calculate analytics per class
    const analytics = classStats.map(cls => {
      const classStudents = students.filter(s => s.profile?.classId === cls.classId);
      
      return {
        classId: cls.classId,
        name: cls.name,
        studentCount: classStudents.length,
        avgAttendance: classStudents.length > 0
          ? Math.round(classStudents.reduce((sum, s) => sum + (s.attendance?.overall || 0), 0) / classStudents.length)
          : 0,
        avgCGPA: classStudents.length > 0
          ? Number((classStudents.reduce((sum, s) => sum + (s.academics?.cgpa || 0), 0) / classStudents.length).toFixed(2))
          : 0,
        avgRiskScore: classStudents.length > 0
          ? Math.round(classStudents.reduce((sum, s) => sum + (s.riskAnalytics?.riskScore || 0), 0) / classStudents.length)
          : 0,
        highRiskCount: classStudents.filter(s => s.riskAnalytics?.riskScore > 65).length
      };
    });

    res.json(analytics);
  } catch (error) {
    console.error('Class analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get faculty list
// @route   GET /api/hod/faculty
// @access  HOD
const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({ departmentCode: req.user.department })
      .populate('user', 'email phone isActive lastLogin');

    const formattedFaculty = faculty.map(f => ({
      id: f.facultyId,
      name: f.name,
      email: f.email,
      phone: f.phone,
      designation: f.designation,
      specialization: f.specialization,
      assignedClasses: f.assignedClasses,
      assignedSubjects: f.assignedSubjects,
      joinDate: f.joinDate,
      isActive: f.user?.isActive,
      lastLogin: f.user?.lastLogin
    }));

    res.json(formattedFaculty);
  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get risk insights
// @route   GET /api/hod/risk-insights
// @access  HOD
const getRiskInsights = async (req, res) => {
  try {
    const students = await Student.find({ 'profile.departmentCode': req.user.department })
      .select('profile.name profile.erpId profile.classId riskAnalytics attendance.overall academics.cgpa');

    // High risk students
    const highRiskStudents = students
      .filter(s => s.riskAnalytics?.riskScore > 65)
      .map(s => ({
        id: s._id,
        name: s.profile?.name,
        erpId: s.profile?.erpId,
        classId: s.profile?.classId,
        riskScore: s.riskAnalytics?.riskScore,
        riskLevel: s.riskAnalytics?.riskLevel,
        attendance: s.attendance?.overall,
        cgpa: s.academics?.cgpa,
        keyTriggers: s.riskAnalytics?.keyTriggers || []
      }))
      .sort((a, b) => b.riskScore - a.riskScore);

    // Risk trends by class
    const classes = await Class.find({ departmentCode: req.user.department });
    const classRiskTrends = classes.map(c => {
      const classStudents = students.filter(s => s.profile?.classId === c.classId);
      const avgRisk = classStudents.length > 0
        ? classStudents.reduce((sum, s) => sum + (s.riskAnalytics?.riskScore || 0), 0) / classStudents.length
        : 0;
      
      return {
        classId: c.classId,
        name: c.name,
        avgRiskScore: Math.round(avgRisk),
        highRiskCount: classStudents.filter(s => s.riskAnalytics?.riskScore > 65).length
      };
    });

    // Recent risk alerts (notifications)
    const recentAlerts = await Notification.find({
      recipientRole: 'hod',
      type: { $in: ['risk_alert', 'attendance_drop', 'low_ia_score'] }
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('type priority title message studentName studentErpId riskScore createdAt read');

    res.json({
      summary: {
        totalStudents: students.length,
        highRiskCount: highRiskStudents.length,
        criticalCount: highRiskStudents.filter(s => s.riskLevel === 'critical').length,
        avgDepartmentRisk: Math.round(
          students.reduce((sum, s) => sum + (s.riskAnalytics?.riskScore || 0), 0) / students.length
        )
      },
      highRiskStudents,
      classRiskTrends,
      recentAlerts
    });
  } catch (error) {
    console.error('Risk insights error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDepartmentOverview,
  getClassAnalytics,
  getFaculty,
  getRiskInsights
};

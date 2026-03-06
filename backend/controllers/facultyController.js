const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Class = require('../models/Class');
const Notification = require('../models/Notification');
const Department = require('../models/Department');

// @desc    Get my class students
// @route   GET /api/faculty/my-class
// @access  Faculty
const getMyClass = async (req, res) => {
  try {
    // Get faculty info
    const faculty = await Faculty.findOne({ user: req.user.id });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty profile not found' });
    }

    // Get assigned classes
    const assignedClassIds = faculty.assignedClasses;
    
    // Get students from assigned classes
    const students = await Student.find({
      'profile.classId': { $in: assignedClassIds }
    }).select('profile riskAnalytics attendance.overall academics.cgpa competitions');

    // Get class details
    const classes = await Class.find({ classId: { $in: assignedClassIds } });

    // Calculate class stats
    const classStats = classes.map(cls => {
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
        highRiskCount: classStudents.filter(s => s.riskAnalytics?.riskScore > 65).length
      };
    });

    const formattedStudents = students.map(s => ({
      id: s._id,
      erpId: s.profile?.erpId,
      name: s.profile?.name,
      classId: s.profile?.classId,
      riskScore: s.riskAnalytics?.riskScore || 0,
      riskLevel: s.riskAnalytics?.riskLevel || 'safe',
      attendance: s.attendance?.overall || 0,
      cgpa: s.academics?.cgpa || 0,
      competitions: s.competitions?.length || 0
    }));

    res.json({
      faculty: {
        id: faculty.facultyId,
        name: faculty.name,
        department: faculty.department,
        assignedClasses: faculty.assignedClasses,
        assignedSubjects: faculty.assignedSubjects
      },
      classes: classStats,
      students: formattedStudents
    });
  } catch (error) {
    console.error('Get my class error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student details
// @route   GET /api/faculty/student/:id
// @access  Faculty
const getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get faculty info to verify access
    const faculty = await Faculty.findOne({ user: req.user.id });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty profile not found' });
    }

    // Get student
    const student = await Student.findById(id)
      .populate('user', 'email phone');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Verify faculty has access to this student
    if (!faculty.assignedClasses.includes(student.profile?.classId)) {
      return res.status(403).json({ message: 'Access denied. Student not in your assigned class' });
    }

    // Get class info
    const classInfo = await Class.findOne({ classId: student.profile?.classId });

    // Get department info
    const department = await Department.findOne({ code: student.profile?.departmentCode });

    res.json({
      id: student._id,
      profile: student.profile,
      contact: {
        email: student.user?.email,
        phone: student.user?.phone
      },
      classInfo: {
        name: classInfo?.name,
        faculty: classInfo?.faculty
      },
      department: department?.name,
      attendance: student.attendance,
      academics: student.academics,
      riskAnalytics: student.riskAnalytics,
      competitions: student.competitions,
      activities: student.activities?.slice(0, 10) || [],
      sentiment: student.sentiment,
      sentimentKeywords: student.sentimentKeywords
    });
  } catch (error) {
    console.error('Get student details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update attendance
// @route   POST /api/faculty/update-attendance
// @access  Faculty
const updateAttendance = async (req, res) => {
  try {
    const { studentId, subjectId, attended, total, date } = req.body;
    
    // Get faculty info
    const faculty = await Faculty.findOne({ user: req.user.id });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty profile not found' });
    }

    // Get student
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Verify access
    if (!faculty.assignedClasses.includes(student.profile?.classId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update subject-wise attendance
    const subjectIndex = student.attendance.subjectWise.findIndex(
      s => s.subjectId === subjectId
    );

    if (subjectIndex >= 0) {
      student.attendance.subjectWise[subjectIndex].attended = attended;
      student.attendance.subjectWise[subjectIndex].total = total;
      student.attendance.subjectWise[subjectIndex].percentage = Math.round((attended / total) * 100);
    }

    // Recalculate overall attendance
    const totalPercentage = student.attendance.subjectWise.reduce(
      (sum, s) => sum + (s.percentage || 0), 0
    );
    student.attendance.overall = Math.round(totalPercentage / student.attendance.subjectWise.length);

    await student.save();

    // Check for attendance drop and create notification
    if (student.attendance.overall < 75) {
      await Notification.create({
        recipient: faculty._id,
        recipientRole: 'faculty',
        type: 'attendance_drop',
        priority: 'high',
        title: 'Attendance Alert',
        message: `${student.profile?.name} (${student.profile?.erpId}) has attendance below 75%`,
        student: student._id,
        studentName: student.profile?.name,
        studentErpId: student.profile?.erpId,
        triggeredBy: 'system'
      });
    }

    res.json({
      message: 'Attendance updated successfully',
      attendance: student.attendance
    });
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add/update marks
// @route   POST /api/faculty/add-marks
// @access  Faculty
const addMarks = async (req, res) => {
  try {
    const { studentId, subjectId, ia1, ia2, ia3, assignmentScore, quizScore } = req.body;
    
    // Get faculty info
    const faculty = await Faculty.findOne({ user: req.user.id });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty profile not found' });
    }

    // Get student
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Verify access
    if (!faculty.assignedClasses.includes(student.profile?.classId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Find or create subject score
    const subjectIndex = student.academics.subjects.findIndex(
      s => s.subjectId === subjectId
    );

    const avgIA = ia1 !== undefined && ia2 !== undefined && ia3 !== undefined
      ? Number(((ia1 + ia2 + ia3) / 3).toFixed(1))
      : undefined;

    if (subjectIndex >= 0) {
      // Update existing
      if (ia1 !== undefined) student.academics.subjects[subjectIndex].ia1 = ia1;
      if (ia2 !== undefined) student.academics.subjects[subjectIndex].ia2 = ia2;
      if (ia3 !== undefined) student.academics.subjects[subjectIndex].ia3 = ia3;
      if (avgIA !== undefined) student.academics.subjects[subjectIndex].avgIA = avgIA;
      if (assignmentScore !== undefined) student.academics.subjects[subjectIndex].assignmentScore = assignmentScore;
      if (quizScore !== undefined) student.academics.subjects[subjectIndex].quizScore = quizScore;
    } else {
      // Add new subject score
      const subjectInfo = await Department.findOne(
        { code: student.profile?.departmentCode, 'subjects.id': subjectId },
        { 'subjects.$': 1 }
      );

      student.academics.subjects.push({
        subjectId,
        subjectName: subjectInfo?.subjects?.[0]?.name || 'Unknown',
        subjectCode: subjectInfo?.subjects?.[0]?.code || subjectId,
        faculty: faculty.name,
        ia1: ia1 || 0,
        ia2: ia2 || 0,
        ia3: ia3 || 0,
        avgIA: avgIA || 0,
        assignmentScore: assignmentScore || 0,
        quizScore: quizScore || 0,
        grade: avgIA >= 90 ? 'A' : avgIA >= 80 ? 'B' : avgIA >= 70 ? 'C' : avgIA >= 60 ? 'D' : 'F'
      });
    }

    // Recalculate CGPA
    const totalScore = student.academics.subjects.reduce((sum, s) => {
      const subjectTotal = (s.avgIA * 0.3) + (s.assignmentScore * 0.2) + (s.quizScore * 0.2) + (s.attendance * 0.2 || 0);
      return sum + subjectTotal;
    }, 0);
    
    student.academics.cgpa = Number((totalScore / student.academics.subjects.length / 10).toFixed(2));

    await student.save();

    // Check for low IA and create notification
    if (avgIA !== undefined && avgIA < 50) {
      await Notification.create({
        recipient: faculty._id,
        recipientRole: 'faculty',
        type: 'low_ia_score',
        priority: 'high',
        title: 'Low IA Score Alert',
        message: `${student.profile?.name} (${student.profile?.erpId}) has IA score below 50%`,
        student: student._id,
        studentName: student.profile?.name,
        studentErpId: student.profile?.erpId,
        triggeredBy: 'system'
      });
    }

    res.json({
      message: 'Marks updated successfully',
      academics: student.academics
    });
  } catch (error) {
    console.error('Add marks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add feedback
// @route   POST /api/faculty/add-feedback
// @access  Faculty
const addFeedback = async (req, res) => {
  try {
    const { studentId, feedback, sentiment, keywords } = req.body;
    
    // Get faculty info
    const faculty = await Faculty.findOne({ user: req.user.id });
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty profile not found' });
    }

    // Get student
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Verify access
    if (!faculty.assignedClasses.includes(student.profile?.classId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update student sentiment
    if (sentiment) {
      student.sentiment = sentiment;
    }
    if (keywords && keywords.length > 0) {
      student.sentimentKeywords = keywords;
    }

    // Add activity
    student.activities.push({
      type: 'feedback',
      title: 'Faculty Feedback',
      description: feedback,
      timestamp: new Date()
    });

    await student.save();

    // Check for negative sentiment and create notification
    if (sentiment === 'negative') {
      await Notification.create({
        recipient: faculty._id,
        recipientRole: 'faculty',
        type: 'negative_sentiment',
        priority: 'medium',
        title: 'Negative Sentiment Detected',
        message: `${student.profile?.name} (${student.profile?.erpId}) shows negative sentiment: ${keywords?.join(', ')}`,
        student: student._id,
        studentName: student.profile?.name,
        studentErpId: student.profile?.erpId,
        triggeredBy: 'system'
      });
    }

    res.json({
      message: 'Feedback added successfully',
      sentiment: student.sentiment,
      keywords: student.sentimentKeywords
    });
  } catch (error) {
    console.error('Add feedback error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get faculty notifications
// @route   GET /api/faculty/notifications
// @access  Faculty
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMyClass,
  getStudentDetails,
  updateAttendance,
  addMarks,
  addFeedback,
  getNotifications
};

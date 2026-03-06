const Student = require('../models/Student');
const Notification = require('../models/Notification');
const Class = require('../models/Class');
const Department = require('../models/Department');

// @desc    Get student dashboard
// @route   GET /api/student/dashboard
// @access  Student
const getDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id })
      .select('profile riskAnalytics attendance.overall academics.cgpa competitions activities notifications');

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Get unread notifications count
    const unreadCount = student.notifications?.filter(n => !n.read).length || 0;

    // Get recent activities
    const recentActivities = student.activities?.slice(0, 5) || [];

    res.json({
      profile: student.profile,
      riskScore: student.riskAnalytics?.riskScore || 0,
      riskLevel: student.riskAnalytics?.riskLevel || 'safe',
      attendance: student.attendance?.overall || 0,
      cgpa: student.academics?.cgpa || 0,
      competitionsCount: student.competitions?.length || 0,
      unreadNotifications: unreadCount,
      recentActivities
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student academics
// @route   GET /api/student/academics
// @access  Student
const getAcademics = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id })
      .select('academics profile');

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Calculate IA scores summary
    const iaScores = student.academics?.subjects?.map(s => ({
      subject: s.subjectName,
      ia1: s.ia1,
      ia2: s.ia2,
      ia3: s.ia3,
      avgIA: s.avgIA,
      assignmentScore: s.assignmentScore,
      quizScore: s.quizScore,
      grade: s.grade
    })) || [];

    res.json({
      erpId: student.profile?.erpId,
      department: student.profile?.department,
      classId: student.profile?.classId,
      overallGrade: student.academics?.overallGrade,
      cgpa: student.academics?.cgpa,
      sgpa: student.academics?.sgpa,
      subjects: student.academics?.subjects || [],
      iaScores
    });
  } catch (error) {
    console.error('Get academics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student attendance
// @route   GET /api/student/attendance
// @access  Student
const getAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id })
      .select('attendance profile');

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.json({
      erpId: student.profile?.erpId,
      overall: student.attendance?.overall || 0,
      subjectWise: student.attendance?.subjectWise || [],
      weeklyTrend: student.attendance?.weeklyTrend || []
    });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student activities
// @route   GET /api/student/activities
// @access  Student
const getActivities = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id })
      .select('activities competitions profile');

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Get competitions
    const competitions = student.competitions?.map(c => ({
      name: c.name,
      type: c.type,
      organizer: c.organizer,
      date: c.date,
      status: c.status,
      position: c.position,
      certificateStatus: c.certificateStatus
    })) || [];

    // Calculate activity score (mock calculation)
    const participationScore = competitions.filter(c => c.status === 'completed' || c.status === 'won').length * 10;
    const activityScore = Math.min(100, participationScore + 50);

    res.json({
      erpId: student.profile?.erpId,
      activityScore,
      competitions,
      recentActivities: student.activities?.slice(0, 10) || []
    });
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get AI insights
// @route   GET /api/student/ai-insights
// @access  Student
const getAIInsights = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id })
      .select('riskAnalytics sentiment sentimentKeywords profile academics attendance');

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const risk = student.riskAnalytics;

    // Generate personalized recommendations
    const recommendations = [];
    
    if (student.attendance?.overall < 75) {
      recommendations.push('Improve attendance to meet minimum 75% requirement');
    }
    
    if (student.academics?.cgpa < 6) {
      recommendations.push('Focus on academic improvement - consider tutoring');
    }
    
    if (student.sentiment === 'negative') {
      recommendations.push('Consider speaking with counselor or faculty advisor');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Continue maintaining good academic standing');
    }

    res.json({
      erpId: student.profile?.erpId,
      riskScore: risk?.riskScore || 0,
      riskLevel: risk?.riskLevel || 'safe',
      dropoutProbability: risk?.dropoutProbability || 0,
      confidence: risk?.confidence || 0,
      keyTriggers: risk?.keyTriggers || [],
      interventionSuggestions: risk?.interventionSuggestions || [],
      riskFactors: risk?.riskFactors || [],
      sentiment: student.sentiment,
      sentimentKeywords: student.sentimentKeywords,
      recommendations
    });
  } catch (error) {
    console.error('Get AI insights error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student notifications
// @route   GET /api/student/notifications
// @access  Student
const getNotifications = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id })
      .select('notifications');

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Sort by date, newest first
    const notifications = (student.notifications || [])
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/student/notifications/:id/read
// @access  Student
const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    const student = await Student.findOne({ user: req.user.id });

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const notification = student.notifications?.find(n => n._id.toString() === id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await student.save();

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboard,
  getAcademics,
  getAttendance,
  getActivities,
  getAIInsights,
  getNotifications,
  markNotificationRead
};

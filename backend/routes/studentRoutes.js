const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getAcademics,
  getAttendance,
  getActivities,
  getAIInsights,
  getNotifications,
  markNotificationRead
} = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes are protected and require student role
router.use(authMiddleware);
router.use(roleMiddleware('student'));

router.get('/dashboard', getDashboard);
router.get('/academics', getAcademics);
router.get('/attendance', getAttendance);
router.get('/activities', getActivities);
router.get('/ai-insights', getAIInsights);
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationRead);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getDepartmentOverview,
  getClassAnalytics,
  getFaculty,
  getRiskInsights
} = require('../controllers/hodController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes are protected and require HOD role
router.use(authMiddleware);
router.use(roleMiddleware('hod'));

router.get('/department-overview', getDepartmentOverview);
router.get('/class-analytics', getClassAnalytics);
router.get('/faculty', getFaculty);
router.get('/risk-insights', getRiskInsights);

module.exports = router;

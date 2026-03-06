const express = require('express');
const router = express.Router();
const {
  getMyClass,
  getStudentDetails,
  updateAttendance,
  addMarks,
  addFeedback,
  getNotifications
} = require('../controllers/facultyController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes are protected and require faculty role
router.use(authMiddleware);
router.use(roleMiddleware('faculty'));

router.get('/my-class', getMyClass);
router.get('/student/:id', getStudentDetails);
router.post('/update-attendance', updateAttendance);
router.post('/add-marks', addMarks);
router.post('/add-feedback', addFeedback);
router.get('/notifications', getNotifications);

module.exports = router;

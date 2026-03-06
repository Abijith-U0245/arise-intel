const express = require('express');
const router = express.Router();
const {
  addDepartment,
  addHOD,
  addFaculty,
  addStudent,
  getDepartments,
  getAllFaculty,
  getAllStudents,
  getAnalytics
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes are protected and require admin role
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// Department routes
router.post('/add-department', addDepartment);
router.get('/departments', getDepartments);

// HOD routes
router.post('/add-hod', addHOD);

// Faculty routes
router.post('/add-faculty', addFaculty);
router.get('/faculty', getAllFaculty);

// Student routes
router.post('/add-student', addStudent);
router.get('/students', getAllStudents);

// Analytics
router.get('/analytics', getAnalytics);

module.exports = router;

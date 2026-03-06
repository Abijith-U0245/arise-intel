const express = require('express');
const router = express.Router();
const { login, getProfile, changePassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/login', login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;

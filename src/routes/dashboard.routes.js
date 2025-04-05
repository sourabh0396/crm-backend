const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth.middleware');
const { getDashboardMetrics } = require('../controllers/dashboard.controller');

// All routes require authentication and admin role
router.use(auth);
router.use(checkRole(['admin']));

// Get dashboard metrics
router.get('/metrics', getDashboardMetrics);

module.exports = router; 
const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth.middleware');
const {
  createLead,
  getLeads,
  updateLeadAddress,
  deleteLead,
  updateLeadStatus
} = require('../controllers/lead.controller');

// All routes require authentication
router.use(auth);

// Create new lead (telecaller only)
router.post('/', checkRole(['telecaller']), createLead);

// Get all leads
router.get('/', getLeads);

// Update lead address (telecaller only)
router.patch('/:id/address', checkRole(['telecaller']), updateLeadAddress);

// Delete lead (telecaller only)
router.delete('/:id', checkRole(['telecaller']), deleteLead);

// Update lead status (telecaller only)
router.patch('/:id/status', checkRole(['telecaller']), updateLeadStatus);

module.exports = router; 
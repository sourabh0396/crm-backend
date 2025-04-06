const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth.middleware');
const {
  createLead,
  getLeads,
  updateLeadAddress,
  deleteLead,
  updateLeadStatus,
  getConnectedCalls
} = require('../controllers/lead.controller');

// All routes require authentication
router.use(auth);

// Get connected calls (admin only)
router.get('/connected', checkRole(['admin']), getConnectedCalls);

// Create new lead (telecaller only)
router.post('/', checkRole(['telecaller']), createLead);

// Get all leads
router.get('/', getLeads);

// Update lead address (telecaller only)
router.patch('/address/:id', checkRole(['telecaller']), updateLeadAddress);

// Delete lead (telecaller only)
router.delete('/:id', checkRole(['telecaller']), deleteLead);

// Update lead status (telecaller only)
router.patch('/status/:id', checkRole(['telecaller']), updateLeadStatus);

module.exports = router; 
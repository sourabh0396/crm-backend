const Lead = require('../models/lead.model');

// Create new lead
const createLead = async (req, res) => {
  try {
    const { name, email, phoneNumber, address } = req.body;
    
    const lead = new Lead({
      name,
      email,
      phoneNumber,
      address,
      assignedTo: req.user._id
    });

    await lead.save();
    res.status(201).json({ message: 'Lead created successfully', lead });
  } catch (error) {
    res.status(500).json({ message: 'Error creating lead', error: error.message });
  }
};

// Get all leads (for telecaller, only their leads)
const getLeads = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { assignedTo: req.user._id };
    const leads = await Lead.find(query).populate('assignedTo', 'name email');
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};

// Update lead address
const updateLeadAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const lead = await Lead.findOne({
      _id: req.params.id,
      assignedTo: req.user._id
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.address = address;
    await lead.save();
    res.json({ message: 'Lead address updated successfully', lead });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lead', error: error.message });
  }
};

// Delete lead
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      assignedTo: req.user._id
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead', error: error.message });
  }
};

// Update lead status
const updateLeadStatus = async (req, res) => {
  try {
    const { status, callResponse } = req.body;
    const lead = await Lead.findOne({
      _id: req.params.id,
      assignedTo: req.user._id
    });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.status = status;
    lead.callResponse = callResponse;
    lead.lastCallDate = Date.now();
    await lead.save();

    res.json({ message: 'Lead status updated successfully', lead });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lead status', error: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLeadAddress,
  deleteLead,
  updateLeadStatus
}; 
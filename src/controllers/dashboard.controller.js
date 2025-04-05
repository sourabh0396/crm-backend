const User = require('../models/user.model');
const Lead = require('../models/lead.model');

// Get dashboard metrics
const getDashboardMetrics = async (req, res) => {
  try {
    // Only admin can access dashboard metrics
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get total telecallers
    const totalTelecallers = await User.countDocuments({ role: 'telecaller' });

    // Get total calls made (leads with lastCallDate)
    const totalCalls = await Lead.countDocuments({ lastCallDate: { $exists: true } });

    // Get total customers contacted (leads with status 'connected')
    const totalCustomersContacted = await Lead.countDocuments({ status: 'connected' });

    // Get call trends for the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const callTrends = await Lead.aggregate([
      {
        $match: {
          lastCallDate: { $gte: oneWeekAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$lastCallDate' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Get recent connected calls
    const recentCalls = await Lead.find({ status: 'connected' })
      .populate('assignedTo', 'name email')
      .sort({ lastCallDate: -1 })
      .limit(10);

    res.json({
      metrics: {
        totalTelecallers,
        totalCalls,
        totalCustomersContacted
      },
      callTrends,
      recentCalls
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard metrics', error: error.message });
  }
};

module.exports = { getDashboardMetrics }; 
const User = require('../models/user.model');

/**
 * Middleware to check if user has required role
 * @param {Array} roles - Array of allowed roles
 */
const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      // Get user from database
      const user = await User.findById(req.user.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Check if user has required role
      if (!roles.includes(user.role)) {
        return res.status(403).json({ 
          message: 'Access denied. You do not have permission to perform this action.' 
        });
      }
      
      // Add user to request object
      req.userRole = user.role;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error checking user role', error: error.message });
    }
  };
};

module.exports = roleMiddleware; 
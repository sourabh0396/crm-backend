const { validationResult, check } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User validation rules
const userValidationRules = {
  register: [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    check('role').isIn(['admin', 'telecaller']).withMessage('Invalid role'),
    validate
  ],
  login: [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').notEmpty().withMessage('Password is required'),
    validate
  ]
};

// Lead validation rules
const leadValidationRules = {
  create: [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('phoneNumber')
      .matches(/^[0-9]{10}$/)
      .withMessage('Phone number must be 10 digits'),
    check('address').trim().notEmpty().withMessage('Address is required'),
    validate
  ],
  updateAddress: [
    check('address').trim().notEmpty().withMessage('Address is required'),
    validate
  ],
  updateStatus: [
    check('status')
      .isIn(['connected', 'not_connected'])
      .withMessage('Invalid status'),
    check('callResponse')
      .isIn(['discussed', 'callback', 'interested', 'busy', 'RNR', 'switched_off', null])
      .withMessage('Invalid call response'),
    validate
  ]
};

module.exports = {
  userValidationRules,
  leadValidationRules
}; 
import express from 'express';
const router = express.Router();
// adding the express validator check
import { check, validationResult } from 'express-validator';
//adding the User MOdel
import User from '../models/User.js';

// @route   POST api/users
// @desc    Register a user
// @access Public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('passed');
  }
);

export default router;

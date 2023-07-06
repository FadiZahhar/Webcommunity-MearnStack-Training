import express from 'express';
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access Public
router.post('/', (req, res) => {
  res.send('Register a user');
});

export default router;

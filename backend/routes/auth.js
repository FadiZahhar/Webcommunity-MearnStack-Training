import express from 'express';
const router = express.Router();

// @route   GET api/auth
// @desc    GET logged in user
// @access Private
router.get('/', (req, res) => {
  res.send('GET logged in user');
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access Public
router.post('/', (req, res) => {
  res.send('Log in user');
});

export default router;

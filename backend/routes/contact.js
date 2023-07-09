import express from 'express';
import auth from '../middleware/auth.js';
import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access Private
router.post('/', (req, res) => {
  res.send('Add new contact');
});

// @route   PUT api/contacts:id
// @desc    Update contact
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route   DELETE api/contacts:id
// @desc    Delete contact
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

export default router;

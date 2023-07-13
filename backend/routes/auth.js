const express = require('express');
const router = express.Router();
// add the following required libraries
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// to add the middleware auth
const auth = require('../middleware/auth');
// code to be added ended
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

router.get('/',auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        // creating the payload
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),{
            expiresIn: 360000
        },
        (err,token) => {
            if(err) throw err;
            res.json({token});
        }
        );
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
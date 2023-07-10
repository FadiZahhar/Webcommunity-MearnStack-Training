const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');

//@route    POST api/users
//@desc register a user
//@access   public
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'valid email').isEmail(),
    check('password', 'enter a password with 6 characters or more').isLength({min:6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({msg:'user already exits'});
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        },
        (err, token) => {
            if(err) throw err;
            res.json({token});
        }
        );

    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route   GET api/auth
// @desc    GET logged in user
// @access Private
router.get('/',auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
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

/* 

Let's break down the code:

const express = require('express');: This line imports the Express.js library into your file.

const router = express.Router();: This creates a new Router object. 
This object can be used to define routes that will be handled separately from your main application.

router.get('/', (req,res) => { res.send('GET logged in user'); });: 
This creates a new GET route at the path '/'. 
When your server receives a GET request at this path (which, when used in your application, 
would be appended after the endpoint you mount this router on, likely /api/auth), 
it will respond by sending the string 'GET logged in user'. 
In a full application, this would likely involve retrieving some data about the currently logged-in user 
from a database or other data source.

router.post('/', (req,res) => { res.send('Log in user'); });: This creates a new POST route at the path '/'. 
When your server receives a POST request at this path (again, likely /api/auth), 
it will respond by sending the string 'Log in user'. 
In a full application, this would likely involve authenticating provided credentials, 
and if they're valid, issuing some sort of access token and sending it back in the response.

module.exports = router;: This exports the router object, 
so it can be imported in another file. 
This allows you to separate your routes into different modules, 
making your code more organized and maintainable.

The comments above each route (// @route, // @desc, // @access) are just giving additional 
information about each route, and don't affect the execution of the code. 
They indicate the method and path of the route, 
a description of what the route does, and whether it should be accessible publicly or only to authenticated users.

In a full application, you'd likely see this router imported in your main server file, 
and used with something like app.use('/api/auth', router); to mount it at the /api/auth endpoint.

*/
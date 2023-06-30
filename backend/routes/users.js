const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access Public
router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    res.send('passed');
});

module.exports = router;

/* explination line by line of the code above */
/*
This code is using the Express.js framework in Node.js to create an HTTP POST route which allows 
for the registration of a user.

Here's what each part of the code is doing:

const express = require('express');: This line imports the Express.js library, 
which is used to create the server and define HTTP routes and middleware.

const router = express.Router();: This line creates a new router object. 
This object can have middleware and HTTP method routes (like GET, PUT, POST, etc.) attached to it. 
It's a way of dividing your route handling into modular, mountable route handlers.

The comments in the code are giving additional information about the route:

// @route POST api/users: This indicates the HTTP method (POST) and the URL endpoint (api/users) of the route.

// @desc Register a user: This describes what the route is doing - in this case, registering a user.

// @access Public: This denotes the access level of the route. In this case, 
the route is accessible to the public - you don't need to be authenticated to access it.

router.post('/', (req,res) => { res.send('Register a user'); });: 
This line sets up an HTTP POST route handler at the root of the router. 
When a POST request is made to the path that this router is mounted at (in this case, 
it's suggesting the router will be mounted at api/users), this function is triggered. 
The req and res parameters represent the HTTP request and response objects, respectively. 
Right now, this function simply sends back a string response 'Register a user'. 
In a complete implementation, this would contain logic to register a new user, 
such as validating the request data and saving a new user to the database.
Please note that in a real-world application, you'd typically see this route performing actions 
such as validating input data, hashing passwords for security, and storing user information in a database. 
This code is a simplified representation and only sends a static text response.
*/
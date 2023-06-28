const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    GET logged in user
// @access Private
router.get('/', (req,res) => {
    res.send('GET logged in user');
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access Public
router.post('/', (req,res) => {
    res.send('Log in user');
});


module.exports = router;

/*
This code defines two API endpoints for an Express.js application using the Express Router. Here's what each part of the code does:

const express = require('express');: This line uses Node.js's require function to import the Express.js module. 
Express.js is a web application framework for Node.js that simplifies various aspects of creating a web server, including handling HTTP requests and responses.

const router = express.Router();: This line creates a new instance of an Express Router. 
Routers in Express.js are used to define groups of routes (endpoints) in your application.

// @route GET api/auth...: These are comments describing the purpose of the following route handler. 
This is not standard across all JavaScript or Express applications, but it is a common practice to document your API endpoints. 
Here, @route shows the HTTP method (GET or POST) and the route's path, 
@desc provides a short description of the route's purpose, and @access specifies who can access this route (Public or Private).

router.get('/', (req, res) => {...: This defines a route handler for HTTP GET requests. 
When the server receives a GET request at the path associated with this router (in your previous code snippet, 
this path would be /api/auth), it executes the provided function, which takes the request and response objects as arguments. 
The function simply responds with the string 'GET logged in user'.

router.post('/', (req, res) => {...: This defines a route handler for HTTP POST requests. 
When the server receives a POST request at the path associated with this router, 
it executes the provided function, which responds with the string 'Log in user'.

module.exports = router;: This line makes the router object available to other files in the Node.js application. 
When another file requires this one, they get this exported router object. 
This is how the routes defined here get connected to the main Express application in another file.

In summary, this code defines two endpoints for an API: one for getting the logged-in user 
(which will likely be expanded to include more logic in a real-world application) and another 
for authenticating a user and getting a token (which, again, would have more logic in an actual application).

*/

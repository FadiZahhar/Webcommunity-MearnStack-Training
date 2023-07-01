const router = require('express').Router();



// @route   GET api/auth
// @desc    GET the logged in user 
// @access  Private
router.get("/", (request, response) => {
  response.send("<h1>{{ user }}</h1>");
});


// @route   POST api/auth
// @desc    POST authentication token for security of info 
// @access  Public
router.post("/", (request, response) => {
  response.send("<h1>User shall pass</h1>");
});


module.exports = router;

/*
this code defines two endpoints for an API: one for getting the logged-in user and another 
for authenticating a user and getting a token.
*/
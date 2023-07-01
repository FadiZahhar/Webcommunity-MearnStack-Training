const router = require('express').Router();

// @route POST api/user
// @desc  CREATE a new user
// @access Public
router.post("/", (request, response) =>{
  response.send("<h1>Register a user</h1>")
});


module.exports = router;
const router = require('express').Router();

// import the mongo User model
const UserModel = require("../models/User.js");

// import data validators from express
const { check, validationResult } = require("express-validator");

let validInputs = [
  check("name", "Name is required to create an account").not().isEmpty().isLength({ max: 30 }),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please include a password with minimum 8 chars").isLength({ min: 8 })
];

// @route POST api/user
// @desc  REGISTER a new user
// @access Public
router.post("/", validInputs, (req, response) =>{
  // now, get the input validation results and store them in a variable
  const errors = validationResult(req);

  // check if there are any errors
  if(!errors.isEmpty()) 
    return response.status(400).json({ errors: errors.array() });

  // you can send status code to the client using status() function along with data
  response.status(200).json({ msg: "User registered successfully!"})
});


/*
 * to use the validators of express:
 * the check is used inside an array given as argument to the router
 * method handler function. depending on how you named the input fields,
 * 
 * you validate them using pre-built functions like not(), isEmpty(),
 * isEmail(), isLength({ min: a }). 
 * 
**/

module.exports = router;
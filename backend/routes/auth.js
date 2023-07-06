// import all required packages
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User.js");

// @route   GET api/auth
// @desc    GET the logged in user
// @access  Private
router.get("/", (request, response) => {
  response.send("<h1>{{ user }}</h1>");
});

// @route   POST api/auth
// @desc    authenticate user access, get token for security of info
// @access  Public
router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, response) => {
    // eval validation result
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    // take inputs from request body
    const { email, password } = req.body;

    try {
      // retrieve user info from db and check for its existence
      let user = await User.findOne({ email });
      if (!user) return response.status(400).json({ msg: "Invalid credentials" });

      // check if the password matches the one from db
      let passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch)
        return response.status(400).json({ msg: "Invalid credentials" });

      // create jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          response.status(200).json({ msg: "login successfully", token });
        }
      );
    } catch (err) {
      console.error("something went wrong: ", err);
      response.status(500).json({ msg: "Server error"});
    }
  }
);

module.exports = router;

/*
this code defines two endpoints for an API: one for getting the logged-in user and another 
for authenticating a user and getting a token.
*/

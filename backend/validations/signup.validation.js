const { body } = require("express-validator/check");

const signupValidation = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name should be between 3 and 20 characters"),

  body("email").trim().isEmail().withMessage("Invalid email"),

  body("password")
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long and contain at least one letter and one number"
    ),
];

module.exports = signupValidation;

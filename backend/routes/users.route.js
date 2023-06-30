const signupValidation = require("../validations/signup.validation");
const { signup } = require("../controllers/users.controller");

const express = require("express");
const router = express.Router();

router.post("/", signupValidation, signup);

module.exports = router;

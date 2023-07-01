const express = require("express");
const signinValidation = require("../validations/signin.validation");
const { signin } = require("../controllers/users.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "GET logged in user",
  });
});

router.post("/", signinValidation, signin);

module.exports = router;

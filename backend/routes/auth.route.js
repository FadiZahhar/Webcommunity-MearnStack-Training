const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "GET logged in user",
  });
});

router.post("/", (req, res) => {
  res.json({ message: "Log in user" });
});

module.exports = router;

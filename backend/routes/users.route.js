const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "Register a user" });
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all users contacts" });
});

router.post("/", (req, res) => {
  res.json({ message: "Add new contact" });
});

router.put("/:id", (req, res) => {
  res.json({ message: "Update contact" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Delete contact" });
});

module.exports = router;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowerCase: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

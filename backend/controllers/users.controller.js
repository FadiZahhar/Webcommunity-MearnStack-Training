const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");

const User = require("../models/users.model");

const signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(409).json({
        status: "conflict",
        message: "Email is taken",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error occurred",
      error,
    });
  }
};

module.exports = { signup };

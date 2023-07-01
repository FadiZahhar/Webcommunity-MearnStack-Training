const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const access_token = signToken(user.id);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        user,
        access_token,
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

const signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: "unauthorized",
        message: "Incorrect credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "unauthorized",
        message: "Incorrect credentials",
      });
    }

    const access_token = signToken(user.id);

    res.status(201).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        user,
        access_token,
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

const signToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    throw new Error("Unable to sign token");
  }
};

module.exports = { signup, signin };

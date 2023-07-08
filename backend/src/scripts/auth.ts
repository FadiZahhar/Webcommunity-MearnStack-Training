import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator/check";
import User from "../models/User";
import bcrypt from "bcrypt";
import {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
} from "../Utils/constants";

export const issueToken = (user: JwtPayload) => {
  dotenv.config({ path: __dirname + "./../.env" });

  if (!process.env.SECRET_TOKEN) return;

  const payload = {
    user: { id: user.id, role: user.role },
  };

  var token = jwt.sign(
    { payload, iss: "Node-Auth" },
    process.env.SECRET_TOKEN,
    {
      expiresIn: process.env.TOKEN_EXPIRY_TIME,
    }
  );
  return token;
};

export const handleSignUp = async (req: Request) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        status: STATUS_CODE_BAD_REQUEST,
        message: errors,
      };
    }

    const { email, password, role, name } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return {
        status: STATUS_CODE_BAD_REQUEST,
        message: "Email Already Exists",
      };
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPass,
      role,
      isActive: true,
    });

    await user.save();

    const token = issueToken(user.model);

    const userInDB = await User.findOne({ email: email });

    return {
      status: STATUS_CODE_OK,
      message: {
        id: userInDB.id,
        role: userInDB.role,
        name: userInDB.name,
        email: userInDB.name,
        token,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: STATUS_CODE_BAD_REQUEST,
      message: "Unable to add User",
    };
  }
};

export const handleSignIn = async (req: Request) => {
  try {
    const { email, password } = req.body;

    const userInDB = await User.findOne({ email });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        status: STATUS_CODE_BAD_REQUEST,
        message: errors,
      };
    }

    if (!userInDB) {
      return {
        status: STATUS_CODE_BAD_REQUEST,
        message: "User does not exist. Kindly ensure the email is correct.",
      };
    }

    const hashedPassword = userInDB.password;
    let isPasswordCorrect;

    isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      return {
        status: STATUS_CODE_BAD_REQUEST,
        message: "Incorrect Password.",
      };
    }

    const token = issueToken(userInDB);

    return {
      status: STATUS_CODE_OK,
      message: {
        email: email,
        name: userInDB.name,
        id: userInDB.id,
        role: userInDB.role,
        token,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: "Sorry! Unable to Sign In User.",
    };
  }
};

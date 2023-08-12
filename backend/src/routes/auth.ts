import express, { Request, Response } from "express";
import { check } from "express-validator/check";
import * as auth from "../scripts/auth";
import User from "../models/User";
import { isAuth } from "../middleware/auth";
import { sendResponse } from "../Utils/GlobalFunctions";
import {
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
} from "../Utils/constants";

const authRouter = express.Router();

/**
 * @route Sign Up user
 * @description Add new user
 * @access Public
 */
authRouter.post(
  "/signup",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Invalid Email").isEmail(),
    check("password", "Password should be between 8 and 20 characters")
      .escape()
      .isLength({ min: 8, max: 20 }),
  ],
  async (req: Request, res: Response) => {
    const { status, message } = await auth.handleSignUp(req);

    sendResponse(res, status, message);
  }
);

/**
 * @route Sign In User
 * @description Login to account
 * @access Public
 */
authRouter.post(
  "/signin",
  [check("email", "Invalid Email").isEmail()],
  async (req: Request, res: Response) => {
    const { status, message } = await auth.handleSignIn(req);

    sendResponse(res, status, message);
  }
);

authRouter.get("/", isAuth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    sendResponse(res, STATUS_CODE_OK, user);
  } catch (err) {
    console.log(err);
    sendResponse(res, STATUS_CODE_INTERNAL_SERVER_ERROR, "Server Error");
  }
});

export default authRouter;

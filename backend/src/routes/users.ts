import { sendResponse } from "../Utils/GlobalFunctions";
import {
  Roles,
  STATUS_CODE_AUTHORIZATION,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_OK,
} from "../Utils/constants";
import express, { Request, Response } from "express";
import { isAdmin, isAuth } from "../middleware/auth";
import User from "../models/User";
import { isValidObjectId } from "mongoose";

const usersRouter = express.Router();

/**
 * @route GET ALL USERS
 * @description Get All Users
 * @access Private
 * @role admin
 */
usersRouter.get("/", isAdmin, async (req: Request, res: Response) => {
  try {
    let usersArray = await User.find({}, (err, users) => {
      return users;
    });

    sendResponse(res, STATUS_CODE_OK, usersArray);
  } catch (err) {
    sendResponse(res, STATUS_CODE_INTERNAL_SERVER_ERROR, "Server Error");
  }
});

/**
 * @route EDIT USER
 * @description Edit User
 * @access Private
 * @role user
 */
usersRouter.put("/:id", isAuth, async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      //Invalid ObjectId
      sendResponse(res, STATUS_CODE_BAD_REQUEST, "Invalid Id");
      return;
    }

    let accessGranted = false;

    //auth user
    const authUser = await User.findById(req.user.id);

    //if auth user is admin --> access granted
    if (authUser.role.find((r: string) => r === Roles.Admin)) {
      //if user is not trying to update role
      if (!req.body.role) accessGranted = true;
    } else {
      //condition1: if auth user has regular user role
      //condition2: check if signed in user has the same id as the auth user
      //if both conditions {1,2} are true --> access granted
      const authUserId = req.user.id;
      const toEditUserId = req.params.id;
      if (
        authUserId === toEditUserId &&
        authUser.role.find((r: string) => r === Roles.User)
      ) {
        accessGranted = true;
      }
    }

    if (!accessGranted) {
      sendResponse(res, STATUS_CODE_AUTHORIZATION, "Unauthorized Action");
      return;
    }

    const { email, password, name, role } = req.body;
    let newFields: {
      email?: string;
      password?: string;
      name?: string;
      role?: string[];
    } = {};
    if (email) newFields.email = email;
    if (password) newFields.password = password;
    if (name) newFields.name = name;
    if (role) newFields.role = role;

    let updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newFields },
      { new: true }
    );

    delete updatedUser.password;

    sendResponse(res, STATUS_CODE_OK, updatedUser);
  } catch (err) {
    console.log("error:");
    console.log(err);
    sendResponse(res, STATUS_CODE_BAD_REQUEST, err);
    return;
  }
});

/**
 * @route DELETE USER
 * @description Delete User
 * @access Private
 * @role admin
 */
usersRouter.delete("/:id", isAdmin, async (req: Request, res: Response) => {
  try {
    const toDeleteUserId = req.params.id;

    if (!isValidObjectId(toDeleteUserId)) {
      //Invalid ObjectId
      sendResponse(res, STATUS_CODE_BAD_REQUEST, "Invalid Id");
      return;
    }

    const result = await User.findByIdAndRemove(toDeleteUserId);

    if (!result) {
      sendResponse(res, STATUS_CODE_NOT_FOUND, "User Does Not Exist");
      return;
    }

    sendResponse(res, STATUS_CODE_OK, result);
  } catch (err) {
    console.log("Error");
    console.log(err);
    sendResponse(res, STATUS_CODE_INTERNAL_SERVER_ERROR, "Server Error");
  }
});

export default usersRouter;

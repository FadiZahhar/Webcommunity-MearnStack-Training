import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import {
  Roles,
  STATUS_CODE_AUTHORIZATION,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
} from "../Utils/constants";
import { sendResponse } from "../Utils/GlobalFunctions";

const handleAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | string[] | undefined =
      req.headers["Authorization"] || req.headers["authorization"];

    dotenv.config({ path: __dirname + "./../.env" });

    if (!token || typeof token !== "string" || token.indexOf("Bearer") !== 0) {
      sendResponse(res, STATUS_CODE_AUTHORIZATION, "Invalid Token Format");
      return false;
    }

    if (!process.env.SECRET_TOKEN) {
      sendResponse(res, STATUS_CODE_AUTHORIZATION, "Token Key Error");
      return false;
    }

    const tokenString = token.split(" ")[1];

    if (!token) {
      sendResponse(
        res,
        STATUS_CODE_AUTHORIZATION,
        "No Token, Denied Authorization"
      );
      return false;
    }

    const decoded = jwt.verify(tokenString, process.env.SECRET_TOKEN);

    if (typeof decoded === "string") {
      sendResponse(res, STATUS_CODE_AUTHORIZATION, "Decodation Fail.");
      return false;
    }

    return decoded.payload.user;
  } catch (err) {
    sendResponse(res, STATUS_CODE_AUTHORIZATION, "Invalid Token");
    return false;
  }
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = handleAuth(req, res, next);
    if (!user) return;

    req.user = user;
    next();
  } catch (err) {
    sendResponse(res, STATUS_CODE_AUTHORIZATION, "Invalid Token");
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = handleAuth(req, res, next);
    if (!user) return;

    if (!user) {
      sendResponse(res, STATUS_CODE_AUTHORIZATION, "Unauthorized User");
      return;
    }

    const roles = user.role;
    if (!roles) {
      sendResponse(res, STATUS_CODE_AUTHORIZATION, "Unathorized User");
      return;
    }
    if (!Array.isArray(roles)) return [roles];
    if (!roles.find((role) => role === Roles.Admin)) {
      //User is Not an admin
      sendResponse(res, STATUS_CODE_AUTHORIZATION, "Unauthorized User");
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("error ----------");
    console.log(err);
    sendResponse(res, STATUS_CODE_INTERNAL_SERVER_ERROR, "Server Error");
    return;
  }
};

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}

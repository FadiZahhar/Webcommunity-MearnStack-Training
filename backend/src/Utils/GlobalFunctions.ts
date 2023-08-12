import { Response } from "express";
import { STATUS_CODE_OK } from "./constants";
import { ObjectId } from "mongoose";

const buildResponseError = (message: string) => {
  //all error responses will have the same structure
  //error: 'whatever'
  return { error: message };
};

const buildResponseData = (data: any) => {
  return { data: data };
};

export const sendResponse = (res: Response, status: number, message: any) => {
  res.statusCode = status;

  if (!status || status === STATUS_CODE_OK) {
    //default status is ok
    res.json(buildResponseData(message));
    return;
  }

  //the rest are errors
  res.json(buildResponseError(message));
};

import express, { Request, Response } from "express";
import { isAuth } from "../middleware/auth";
import Contact from "../models/Contact";
import { sendResponse } from "../Utils/GlobalFunctions";
import {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_OK,
} from "../Utils/constants";
import { isValidObjectId } from "mongoose";
import { check, validationResult } from "express-validator/check";

export interface IContact {
  user?: string;
  name?: string;
  email?: string;
  phone?: string | number;
  type?: string;
}

const contactsRouter = express.Router();

/**
 * @route GET ALL CONTACTS
 * @description Get All Contacts
 * @access Private
 * @role user
 */
contactsRouter.get("/", isAuth, async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      name: 1,
    });

    sendResponse(res, STATUS_CODE_OK, contacts);
  } catch (err) {
    console.log("error");
    console.log(err);
    sendResponse(res, STATUS_CODE_INTERNAL_SERVER_ERROR, "Server Error");
  }
});

/**
 * @route ADD CONTACT
 * @description Add Contact To User Contacts
 * @access Private
 * @role user
 */
contactsRouter.post(
  "/",
  isAuth,
  [
    check("email", "Invalid Email").isEmail(),
    check("name", "Name is Required").not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        sendResponse(res, STATUS_CODE_BAD_REQUEST, errors);
        return;
      }

      const { name, email, phone, type } = req.body;

      let newContact: IContact = {
        user: req.user.id,
        name: name,
        email: email,
      };

      if (phone) newContact.phone = phone;
      if (type) newContact.type = type;

      const contact = new Contact({ ...newContact });

      contact.save((err, data) => {
        sendResponse(res, STATUS_CODE_OK, {
          id: data.id,
          ...newContact,
        });
      });
    } catch (err) {
      console.log("err");
      console.log(err);
      sendResponse(res, STATUS_CODE_INTERNAL_SERVER_ERROR, "Server Error");
    }
  }
);

/**
 * @route EDIT CONTACT
 * @description Edit Contact in User Contacts
 * @access Private
 * @role user
 */
contactsRouter.put("/:id", isAuth, async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      //Invalid ObjectId
      sendResponse(res, STATUS_CODE_BAD_REQUEST, "Invalid Id");
      return;
    }

    const { name, email, phone, type } = req.body;

    let editContact: IContact = {};
    if (name) editContact.name = name;
    if (email) editContact.email = email;
    if (phone) editContact.phone = phone;
    if (type) editContact.type = type;

    let updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: editContact },
      { new: true }
    );

    sendResponse(res, STATUS_CODE_OK, updatedContact);
  } catch (err) {
    console.log("error");
    console.log(err);
    sendResponse(res, STATUS_CODE_INTERNAL_SERVER_ERROR, "Server Error");
  }
});

/**
 * @route DELETE CONTACT
 * @description Delete Contact in User Contacts
 * @access Private
 * @role user
 */
contactsRouter.delete("/:id", isAuth, async (req: Request, res: Response) => {
  try {
    const toDeleteId = req.params.id;

    if (!isValidObjectId(toDeleteId)) {
      //Invalid ObjectId
      sendResponse(res, STATUS_CODE_BAD_REQUEST, "Invalid Id");
      return;
    }

    const result = await Contact.findByIdAndRemove(toDeleteId);

    if (!result) {
      sendResponse(res, STATUS_CODE_NOT_FOUND, "Contact does not Exist");
      return;
    }

    sendResponse(res, STATUS_CODE_NOT_FOUND, result);
  } catch (error) {
    console.log("error");
    console.log(error);
    sendResponse(res, STATUS_CODE_INTERNAL_SERVER_ERROR, error);
  }
});

export default contactsRouter;

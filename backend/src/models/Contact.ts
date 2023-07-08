import { ContactTypes, Roles } from "../Utils/constants";
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String || Number,
    },
    type: {
      type: String,
      default: ContactTypes.Personal,
    },
  },
  { timestamps: true }
);

export default mongoose.model("contact", ContactSchema);

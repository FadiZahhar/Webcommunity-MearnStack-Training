import { Roles } from "../Utils/constants";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
    role: {
      type: [String],
      required: true,
      default: [Roles.User],
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);

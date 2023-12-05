import { Schema, model } from "mongoose";
import { TAdmin } from "./admin.interface";
import { userNameSchema } from "../user/user.model";

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Name Field is required"],
    },
    designation: {
      type: String,
      required: [true, "Designation field is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "other"],
        message: "{VALUE} is not valid",
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, "Email Field is required"],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact Field is required"],
    },
    emergencyContact: {
      type: String,
      required: [true, "Emergency Contact Field is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Admin = model<TAdmin>("Admin", adminSchema);
export default Admin;

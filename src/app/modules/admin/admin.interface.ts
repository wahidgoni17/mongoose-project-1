import { Types } from "mongoose";
import { TUserName } from "../user/user.interface";
import { TBloodGroup } from "../student/student.interface";

export type TAdmin = {
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    designation: string;
    gender: "Male" | "Female" | "other";
    dateOfBirth: Date;
    email: string;
    bloodGroup?: TBloodGroup;
    contactNo: string;
    emergencyContact: string;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    isDeleted: boolean;
  };
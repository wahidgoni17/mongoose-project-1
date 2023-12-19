/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    textPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangeTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

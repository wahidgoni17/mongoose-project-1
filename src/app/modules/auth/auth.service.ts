import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;
  //checking if the user is exists
  const user = await User.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user  is not found");
  }

  //check if the user is deleted earlier
  const isUserDeleted = user?.isDeleted;

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user  is deleted");
  }

  //check if the user is blocked earlier
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user  is blocked");
  }

  //checking if password is correct
  const isUserPasswordMatched = await User.isPasswordMatched(
    password,
    user?.password,
  );
  if (!isUserPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "password do not matched");
  }
  //create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  console.log(userData);
  //checking if the user is exists
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user  is not found");
  }

  //check if the user is deleted earlier
  const isUserDeleted = user?.isDeleted;

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user  is deleted");
  }

  //check if the user is blocked earlier
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user  is blocked");
  }

  //checking if password is correct
  const isUserPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    user?.password,
  );
  if (!isUserPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "password do not matched");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );
  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date()
    },
  );
  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};

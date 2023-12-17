import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TLoginUser } from "./auth.interface";

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
  return {};
};

export const AuthServices = {
  loginUser,
};

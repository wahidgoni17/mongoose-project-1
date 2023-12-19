import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, ...restData } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "PROD",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is loged succesfully",
    data: restData,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password is changed succesfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access Token is retrieved succesfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
};

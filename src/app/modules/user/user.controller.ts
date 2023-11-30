/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendresponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createAStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentintoDb(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student data is created successfully",
    data: result,
  });
});


export const UserController = {
  createAStudent,
};

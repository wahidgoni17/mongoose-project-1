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

const createAFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFacultyintoDb(password, facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty data is created successfully",
    data: result,
  });
});

const createAnAdmin = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminintoDb(password, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin data is created successfully",
    data: result,
  });
});

export const UserController = {
  createAStudent,
  createAFaculty,
  createAnAdmin,
};

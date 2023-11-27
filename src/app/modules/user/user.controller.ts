import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendRespose from "../../utils/sendresponse";
import httpStatus from "http-status";

const createAStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    //data validation using zod
    //   const zodParsedData = studentZodValidationSchema.parse(studentData);

    const result = await UserServices.createStudentintoDb(
      password,
      studentData,
    );
    sendRespose(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student data is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createAStudent,
};

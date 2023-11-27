import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import httpStatus from "http-status";
import sendRespose from "../../utils/sendresponse";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    sendRespose(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students are retrive successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);
    sendRespose(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is retrive successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { updateInfo: updateData } = req.body;
    const { id } = req.params;
    const result = await StudentServices.updateStudentFromDb(id, updateData);
    sendRespose(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student Data Updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDb(studentId);
    sendRespose(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student data is Deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

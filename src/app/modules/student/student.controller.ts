import { StudentServices } from "./student.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendresponse";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrive successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrive successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDb(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Data Updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student data is Deleted successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};

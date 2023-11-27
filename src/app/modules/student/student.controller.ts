import { StudentServices } from "./student.service";
import httpStatus from "http-status";
import sendRespose from "../../utils/sendresponse";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb();
  sendRespose(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrive successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(studentId);
  sendRespose(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrive successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { updateInfo: updateData } = req.body;
  const { id } = req.params;
  const result = await StudentServices.updateStudentFromDb(id, updateData);
  sendRespose(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Data Updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDb(studentId);
  sendRespose(res, {
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

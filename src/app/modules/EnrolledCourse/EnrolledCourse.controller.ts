import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { EnrolledCourseServices } from "./EnrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDb(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrolled Course is Created Successfully",
    data: result,
  });
});

const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.getAllEnrolledCoursesFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrolled Courses are retived successfully",
    data: result,
  });
});

const getSingleEnrolledCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EnrolledCourseServices.getSingleEnrolledCourseFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrolled Course is retived successfully",
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  console.log(req.user);
  // const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDb(
  //   req.body,
  // );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course marks is updated successfully",
    data: null,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getAllEnrolledCourses,
  getSingleEnrolledCourse,
  updateEnrolledCourseMarks,
};

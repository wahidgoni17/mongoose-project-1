/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { OfferedCourse } from "../OfferedCourse/OfferedCourse.model";
import { TEnrolledCourse } from "./EnrolledCourse.interface";
import EnrolledCourse from "./EnrolledCourse.model";
import Student from "../student/student.model";

const createEnrolledCourseIntoDb = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course is not exists");
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Room is full");
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student is not found");
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: payload?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, "student is already enrolled");
  }

  const inputData = {
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    academicSemester: isOfferedCourseExists.academicSemester,
    academicFaculty: isOfferedCourseExists.academicFaculty,
    academicDepartment: isOfferedCourseExists.academicDepartment,
    offeredCourse,
    course: isOfferedCourseExists.course,
    student: student._id,
    faculty: isOfferedCourseExists.faculty,
    isEnrolled: true,
  };

  const result = await EnrolledCourse.create(inputData);

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to enroll in this course",
    );
  }

  const { maxCapacity } = isOfferedCourseExists;
  await OfferedCourse.findByIdAndUpdate(offeredCourse, {
    maxCapacity: maxCapacity - 1,
  });

  return result;
};

const getAllEnrolledCoursesFromDb = async () => {
  const result = await EnrolledCourse.find();
  return result;
};

const getSingleEnrolledCourseFromDb = async (id: string) => {
  const result = await EnrolledCourse.findById(id);
  return result;
};

const updateEnrolledCourseIntoDb = async (
  id: string,
  payload: TEnrolledCourse,
) => {
  const result = await EnrolledCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDb,
  getAllEnrolledCoursesFromDb,
  getSingleEnrolledCourseFromDb,
  updateEnrolledCourseIntoDb,
};

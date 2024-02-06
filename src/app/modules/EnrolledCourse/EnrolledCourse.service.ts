/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { OfferedCourse } from "../OfferedCourse/OfferedCourse.model";
import { TEnrolledCourse } from "./EnrolledCourse.interface";
import EnrolledCourse from "./EnrolledCourse.model";
import Student from "../student/student.model";
import SemesterRegistration from "../semesterRegistration/semesterRegistration.model";
import Course from "../course/course.model";
import { startSession } from "mongoose";

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
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, "student is already enrolled");
  }

  const course = await Course.findById(isOfferedCourseExists?.course);

  const semesterRegistration = await SemesterRegistration.findOne(
    isOfferedCourseExists.semesterRegistration,
  ).select("maxCredit");
  console.log(semesterRegistration);

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourseData",
      },
    },
    {
      $unwind: "$enrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  console.log(enrolledCourses);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

  if (
    totalCredits &&
    semesterRegistration?.maxCredit &&
    totalCredits + course?.credits > semesterRegistration?.maxCredit
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have exceeded maximum number of credits",
    );
  }

  const session = await startSession();

  try {
    session.startTransaction();

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

    const result = await EnrolledCourse.create([inputData], { session });

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

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllEnrolledCoursesFromDb = async () => {
  const result = await EnrolledCourse.find();
  return result;
};

const getSingleEnrolledCourseFromDb = async (id: string) => {
  const result = await EnrolledCourse.findById(id);
  return result;
};

const updateEnrolledCourseMarksIntoDb = async (
  payload: Partial<TEnrolledCourse>,
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
  updateEnrolledCourseMarksIntoDb,
};

import config from "../../config";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";
import { generateStudentId } from "./user.utils";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentintoDb = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {};
  // if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    //create a user(transection - 1)
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed To create new user");
    }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    //create a student (transection - 2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create new student",
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student")
  }
};

export const UserServices = {
  createStudentintoDb,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import Faculty from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interface";
import Admin from "../admin/admin.model";
import AcademicDepartment from "../academicDepartment/academicDepartment.model";

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
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFacultyintoDb = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await startSession();

  try {
    session.startTransaction();

    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed To create new user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create new faculty",
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminintoDb = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "admin";

  const session = await startSession();

  try {
    session.startTransaction();

    userData.id = await generateAdminId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed To create new user");
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const UserServices = {
  createStudentintoDb,
  createFacultyintoDb,
  createAdminintoDb,
};

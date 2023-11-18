import { Student } from "./student.interface";
import StudentModel from "./student.model";

const createStudentintoDb = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentsFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentintoDb,
  getAllStudentsFromDb,
  getSingleStudentsFromDb,
};

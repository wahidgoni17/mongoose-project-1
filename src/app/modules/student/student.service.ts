import { TStudent } from "./student.interface";
import Student from "./student.model";

const createStudentintoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User is already Exits");
  }

  const result = await Student.create(studentData);

  // const student = new Student(studentData); // create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User is already Exits");
  // }

  // const result = await student.save(); //builtIn instance method
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentsFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentintoDb,
  getAllStudentsFromDb,
  getSingleStudentsFromDb,
};

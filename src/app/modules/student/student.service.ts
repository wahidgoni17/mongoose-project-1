import { TStudent } from "./student.interface";
import Student from "./student.model";

const getAllStudentsFromDb = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findOne({ id: id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentFromDb = async (id: string, updateData: TStudent) => {
  const result = await Student.updateOne({ id }, updateData);
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  updateStudentFromDb,
  deleteStudentFromDb,
};

import { TFaculty } from "./faculty.interface";
import Faculty from "./faculty.model";

const getAllFacultiesFromDb = async () => {
  const result = await Faculty.find().populate("academicDepartment");
  return result;
};

const getSingleFacultyFromDb = async (id: string) => {
  const result = await Faculty.findOne({ id }).populate("academicDepartment");
  return result;
};

const updateFacultyIntoDb = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
  });
  return result;
};

export const FacultyServices = {
  getAllFacultiesFromDb,
  getSingleFacultyFromDb,
  updateFacultyIntoDb,
};

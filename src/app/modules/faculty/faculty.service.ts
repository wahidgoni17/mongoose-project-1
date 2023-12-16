import QueryBuilder from "../../handlers/QueryBuilder";
import { FacultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import Faculty from "./faculty.model";

const getAllFacultiesFromDb = async (query: Record<string, unknown>) => {
  const faculyQuery = new QueryBuilder(
    Faculty.find().populate("academicDepartment"),
    query,
  )
    .search(FacultySearchableFields)
    .sort()
    .paginate()
    .filter()
    .fields();
  const result = await faculyQuery.modelQuery;
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

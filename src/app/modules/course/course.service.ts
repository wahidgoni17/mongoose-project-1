import QueryBuilder from "../../handlers/QueryBuilder";
import { CourseSearchableField } from "./course.constant";
import { TCourse } from "./course.interface";
import Course from "./course.model";

const createCourseintoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query,
  )
    .search(CourseSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course",
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );

  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
  });
  
  return updatedBasicCourseInfo;
};

const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseintoDb,
  getAllCoursesFromDb,
  getSingleCourseFromDb,
  updateCourseIntoDB,
  deleteCourseFromDb,
};

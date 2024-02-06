import { Schema, model } from "mongoose";
import { TCourseMarks, TEnrolledCourse } from "./EnrolledCourse.interface";
import { Grade } from "./EnrolledCourse.constant";

const courseMarksSchema = new Schema<TCourseMarks>({
  classTest1: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  midTerm: {
    type: Number,
    min: 0,
    max: 30,
    default: 0,
  },
  classTest2: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  finalTerm: {
    type: Number,
    min: 0,
    max: 50,
    default: 0,
  },
});

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: "SemesterRegistration",
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: "OfferedCourse",
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: "SemesterRegistration",
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepartment",
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  courseMarks: {
    type: courseMarksSchema,
    default: {},
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  grade: {
    type: String,
    enum: Grade,
    default: "NA",
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
});

const EnrolledCourse = model<TEnrolledCourse>(
  "EnrolledCourse",
  enrolledCourseSchema,
);

export default EnrolledCourse;

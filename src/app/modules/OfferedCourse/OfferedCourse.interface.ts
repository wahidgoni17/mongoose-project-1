import { Types } from "mongoose";

export type TDays = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type TOfferedCourse = {
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  maxCapacity: number;
  section: number;
  capacity: number;
  days: TDays[];
  startTime: string;
  endTime: string;
};

export type TSchedule = {
  days: TDays[];
  startTime: string;
  endTime: string;
};

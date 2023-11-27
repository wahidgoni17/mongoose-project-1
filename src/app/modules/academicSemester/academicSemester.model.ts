import { Schema, model } from "mongoose";
import { TAcademicSemester, TMonths } from "./academicSemester.interface";

const month: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ["Autumn", "Summer", "Fall"],
      required: true,
    },
    code: {
      type: String,
      enum: ["01", "02", "03"],
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: month,
    },
    endMonth: {
      type: String,
      enum: month,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);

export default AcademicSemester;

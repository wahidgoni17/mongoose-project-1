import { Request, Response } from "express";
import { StudentServices } from "./student.service";
// import { z } from "zod";
import studentZodValidationSchema from "./student.zod.validation";
// import studentValidationSchema from "./student.validation";

const createAStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //data validation using zod
    const zodParsedData = studentZodValidationSchema.parse(studentData);

    // data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "error is detected with joi",
    //     error: error.details,
    //   });
    // }

    const result = await StudentServices.createStudentintoDb(zodParsedData);

    res.status(200).json({
      success: true,
      message: "Student data is created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "things just got out off hand",
      err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: "Students are retrive successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDb(studentId);
    res.status(200).json({
      success: true,
      message: "Student is retrive successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createAStudent,
  getAllStudents,
  getSingleStudent,
};

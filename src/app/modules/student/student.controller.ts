import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createAStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const result = await StudentServices.createStudentintoDb(student);
    res.status(200).json({
      success: true,
      message: "Student data is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createAStudent,
};

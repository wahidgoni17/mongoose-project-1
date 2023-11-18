import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createAStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudentintoDb(studentData);
    res.status(200).json({
      success: true,
      message: "Student data is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
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

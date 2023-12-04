import express from "express";
import { UserController } from "./user.controller";
import { studentValidations } from "../student/student.zod.validation";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyValidationSchemas } from "../faculty/faculty.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createAStudent,
);

router.post(
  "/create-faculty",
  validateRequest(FacultyValidationSchemas.createFacultyValidationSchema),
  UserController.createAFaculty,
);

export const UserRoutes = router;

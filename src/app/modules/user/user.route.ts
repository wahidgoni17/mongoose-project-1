import express from "express";
import { UserController } from "./user.controller";
import { studentZodValidations } from "../student/student.zod.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentZodValidations.createStudentValidationSchema),
  UserController.createAStudent,
);

export const UserRoutes = router;

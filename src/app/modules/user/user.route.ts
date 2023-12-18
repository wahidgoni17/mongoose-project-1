import express from "express";
import { UserController } from "./user.controller";
import { studentValidations } from "../student/student.zod.validation";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyValidationSchemas } from "../faculty/faculty.validation";
import { AdminValidationSchemas } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createAStudent,
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(FacultyValidationSchemas.createFacultyValidationSchema),
  UserController.createAFaculty,
);

router.post(
  "/create-admin",
  validateRequest(AdminValidationSchemas.createAdminValidationSchema),
  UserController.createAnAdmin,
);

export const UserRoutes = router;

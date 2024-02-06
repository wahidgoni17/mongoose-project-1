import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { studentValidations } from "../student/student.zod.validation";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyValidationSchemas } from "../faculty/faculty.validation";
import { AdminValidationSchemas } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { UserValidations } from "./user.validation";
import { upload } from "../../utils/SendImagetoCloudinary";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createAStudent,
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(FacultyValidationSchemas.createFacultyValidationSchema),
  UserController.createAFaculty,
);

router.post(
  "/create-admin",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidationSchemas.createAdminValidationSchema),
  UserController.createAnAdmin,
);

router.post(
  "/change-status/:id",
  validateRequest(UserValidations.changeStatusValidationSchema),
  UserController.createAnAdmin,
);

router.get("/me", auth("admin", "student", "faculty"), UserController.getMe);

export const UserRoutes = router;

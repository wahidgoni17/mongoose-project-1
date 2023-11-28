import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

// router.post("/create-student", StudentControllers.createAStudent);

// router.get("/", StudentControllers.getAllStudents);

// router.get("/:studentId", StudentControllers.getSingleStudent);

// router.patch("/update-student/:id", StudentControllers.updateStudent);

// router.delete("/:studentId", StudentControllers.deleteStudent);

export const AcademicSemesterRoutes = router;

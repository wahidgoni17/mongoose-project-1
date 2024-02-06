import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EnrolledCourseValidations } from "./EnrolledCourse.validation";
import { EnrolledCourseControllers } from "./EnrolledCourse.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-enrolled-course",
  auth("student"),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.get("/", EnrolledCourseControllers.getAllEnrolledCourses);

router.get("/:id", EnrolledCourseControllers.getSingleEnrolledCourse);

router.patch(
  "/update-enrolled-course-marks",
  auth("faculty"),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;

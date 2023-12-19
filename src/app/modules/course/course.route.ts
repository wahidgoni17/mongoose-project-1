import { Router } from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidation } from "./course.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-course",
  auth("admin"),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  "/",
  auth("admin", "faculty", "student"),
  CourseControllers.getAllCourses,
);

router.get("/:id", CourseControllers.getSingleCourse);

router.patch(
  "/:id",
  auth("admin"),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  "/:courseId/remove-faculties",
  auth("admin"),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.delete("/:id", CourseControllers.deleteCourse);

export const CourseRouters = router;

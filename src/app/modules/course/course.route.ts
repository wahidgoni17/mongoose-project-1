import { Router } from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidation } from "./course.validation";

const router = Router();

router.post(
  "/create-course",
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get("/", CourseControllers.getAllCourses);

router.get("/:id", CourseControllers.getSingleCourse);

router.patch(
  "/:id",
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
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.delete("/:id", CourseControllers.deleteCourse);

export const CourseRouters = router;

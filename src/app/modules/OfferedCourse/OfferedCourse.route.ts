import express from "express";
import { OfferedCourseControllers } from "./OfferedCourse.controller";
import { OfferedCourseValidations } from "./OfferedCourse.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", OfferedCourseControllers.getAllOfferedCourses);

router.get("/:id", OfferedCourseControllers.getSingleOfferedCourse);

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete("/:id", OfferedCourseControllers.deleteOfferedCourseFromDB);

export const OfferedCourseRoutes = router;

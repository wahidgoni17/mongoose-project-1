import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  "/",
  auth(),
  SemesterRegistrationControllers.getAllSemesterRegistrations,
);

router.get(
  "/:id",
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  "/:id",
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;

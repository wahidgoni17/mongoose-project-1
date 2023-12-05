import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AdminControllers } from "./admin.controller";
import { AdminValidationSchemas } from "./admin.validation";

const router = Router();

router.get("/", AdminControllers.getAllAdmins);

router.get("/:adminId", AdminControllers.getSingleAdmin);

router.patch(
  "/:adminId",
  validateRequest(AdminValidationSchemas.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

export const AdminRoutes = router;

import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

router.post("/create-student", StudentControllers.createAStudent);

router.get("/", StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.patch("/update-student/:id", StudentControllers.updateStudent);

router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;

import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router()

router.post("/create_student", StudentController.createAStudent)
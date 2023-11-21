import { z } from "zod";

// Define zod schema for validation
const userNameZodValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Z][a-z]*$/),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const guardianZodValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const localGuardianZodValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const studentZodValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().max(20),
  name: userNameZodValidationSchema,
  gender: z.enum(["Male", "Female", "other"]),
  dateOfBirth: z.string().min(1),
  email: z.string().email(),
  contactNo: z.string().min(1),
  emergencyContact: z.string().min(1),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianZodValidationSchema,
  localGuardian: localGuardianZodValidationSchema,
  profileImg: z.string().min(1).optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().default(false)
});

export default studentZodValidationSchema
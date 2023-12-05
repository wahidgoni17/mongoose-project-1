import { z } from "zod";

const createNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Z][a-z]*$/),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      name: createNameValidationSchema,
      designation: z.string(),
      gender: z.enum(["Male", "Female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContact: z.string().min(1),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      isDeleted: z.boolean(),
      profileImg: z.string().min(1).optional(),
    }),
  }),
});

const updateNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).optional(),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: updateNameValidationSchema.optional(),
      designation: z.string().optional(),
      gender: z.enum(["Male", "Female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContact: z.string().min(1).optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      isDeleted: z.boolean().optional(),
      profileImg: z.string().min(1).optional(),
    }),
  }),
});

export const AdminValidationSchemas = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};

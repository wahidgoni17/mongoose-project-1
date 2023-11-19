import Joi from "joi";
// create a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .trim()
    .pattern(/^[A-Z][a-z]*$/, { name: "uppercase" })
    .messages({
      "string.base": "First Name must be a string",
      "string.empty": "First Name is required",
      "string.max": "First Name length cannot be more than 20 characters",
      "string.pattern.name":
        "First Name must start with an uppercase letter and contain only letters",
    }),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.base": "Last Name must be a string",
      "string.empty": "Last Name is required",
      "string.pattern.base": "Last Name must contain only letters",
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required().trim(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required().trim(),
  motherContactNo: Joi.string().required().trim(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required().messages({
    "any.required": "Name Field is required",
  }),
  gender: Joi.string().valid("Male", "Female", "other").required().messages({
    "any.only": "Gender should be Male, Female, or other",
    "any.required": "Gender is required",
  }),
  dateOfBirth: Joi.string().required().messages({
    "string.empty": "Date of Birth Field is required",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim()
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "string.empty": "Email Field is required",
    }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact Field is required",
  }),
  emergencyContact: Joi.string().required().messages({
    "string.empty": "Emergency Contact Field is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only":
        "Blood Group should be one of A+, A-, B+, B-, AB+, AB-, O+, O-",
    }),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().required(),
  isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidationSchema
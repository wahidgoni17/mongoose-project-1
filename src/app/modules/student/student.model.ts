import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  //StudentMethods,
  StudentModel,
  TUserName,
} from "./student.interface";
import bcrypt from "bcrypt";
import config from "../../config";
// import validator from "validator";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    // trim: true,
    // maxlength: [20, "first name length can not be more than 20 characters"],
    // validate: {
    //   validator: function (value: string) {
    //     const firstnameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstnameStr === value;
    //   },
    //   message: "{VALUE} is not in capitalize format",
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    // trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE} is not valid",
    // },
    required: [true, "Last Name is required"],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
    // trim: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
    // trim: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
    // trim: true,
  },
  motherName: {
    type: String,
    required: true,
    // trim: true,
  },
  motherOccupation: {
    type: String,
    required: true,
    // trim: true,
  },
  motherContactNo: {
    type: String,
    required: true,
    // trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// for instance methods

// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
// for static methods

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxlength: [20, "password cannot be more than 20 characters"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Name Field is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "other"],
        message: "{VALUE} is not valid",
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of Birth Field is required"],
    },
    email: {
      type: String,
      required: [true, "Email Field is required"],
      unique: true,
      // trim: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      // message: "{VALUE} is not a valid email"
      // }
    },
    contactNo: {
      type: String,
      required: [true, "Contact Field is required"],
    },
    emergencyContact: {
      type: String,
      required: [true, "Emergency Contact Field is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    isActive: {
      type: String,
      enum: ["active", "blocked"],
      //default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtuals
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name?.middleName || ""} ${
    this.name.lastName
  }`;
});

// pre save middleware / hook (will work on create() or save())

studentSchema.pre("save", async function (next) {
  // hashing password and save into db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// post save middleware / hook
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

studentSchema.post("updateOne", function (doc, next) {
  doc.password = "";
  next();
});

// query middlewares
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

const Student = model<TStudent, StudentModel>("Student", studentSchema);

export default Student;

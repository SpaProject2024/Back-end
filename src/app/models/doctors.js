import mongoose from "mongoose";

// Định nghĩa schema cho TestApi (Doctors)
const doctorsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    doctorID: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    numberPhone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    experience: {
      type: Number, 
      required: true,
    },
    description: {
      type: String,
    },
    roleID: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    workingtime: {
      type: Number, 
      required: true,
    },
  },
  { timestamps: true } 
);

// Pre-save validation for required fields
doctorsSchema.pre("save", function (next) {
  if (!this.fullName || !this.email || !this.password) {
    const err = new Error("Full Name, Email, and Password are required");
    return next(err);
  }
  next();
});

// Post-save hook for logging
doctorsSchema.post("save", function (doc) {
  console.log("Doctor saved successfully:", doc);
});

const doctors = mongoose.model("doctors", doctorsSchema);

export default doctors;

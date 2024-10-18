// Import mongoose
import mongoose from "mongoose";

// Define schema for Doctors
const doctorsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    numberPhone: {
      type: Number, // Giữ kiểu Number cho số điện thoại
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Giới hạn các giá trị hợp lệ cho giới tính
      required: true,
    },
    avatar: {
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
      default: '', // Thêm giá trị mặc định nếu không có mô tả
    },
    workingtime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Tự động thêm trường createdAt và updatedAt
);

// Export Doctors model
const Doctors = mongoose.model("Doctors", doctorsSchema);
export default Doctors;

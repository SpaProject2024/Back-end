import mongoose from "mongoose";

// Định nghĩa schema cho bác sĩ
const doctorsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    numberPhone: {
      type: Number, // Giữ kiểu Number cho số điện thoại
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    experience: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    workingtime: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true } // Tự động thêm trường createdAt và updatedAt
);

// Xuất mô hình bác sĩ
const Doctor = mongoose.model("Doctor", doctorsSchema);
export default Doctor;
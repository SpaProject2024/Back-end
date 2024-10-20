import mongoose from "mongoose";

// Định nghĩa schema cho nhân viên
const staffSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    numberPhone: {
      type: Number, // Số điện thoại
      required: false,
    },
    position: {
      type: String, // Chức vụ
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
    salary: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true } // Tự động thêm trường createdAt và updatedAt
);

// Xuất mô hình nhân viên
const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
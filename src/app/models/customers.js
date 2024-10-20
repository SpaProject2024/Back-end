import mongoose from "mongoose";

// Định nghĩa schema cho khách hàng
const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    numberPhone: {
      type: Number, // Số điện thoại
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
    membershipLevel: {
      type: String, // Hạng thành viên (ví dụ: Bronze, Silver, Gold)
      required: false,
    },
  },
  { timestamps: true } // Tự động thêm trường createdAt và updatedAt
);

// Xuất mô hình khách hàng
const Customer = mongoose.model("Customer", customerSchema);
export default Customer;

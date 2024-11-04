import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true, // Đảm bảo userID là duy nhất
    default: uuidv4, // Tạo ID duy nhất cho mỗi tài khoản
  },
  // address: {
  //   type: String,
  //   required: false,
  // },
  // birthday: {
  //   type: Date,
  //   required: false,
  // },
  created_at: {
    type: Date,
    default: Date.now, // Gán thời gian hiện tại khi tạo người dùng
  },
  email: {
    type: String,
    required: true,
    unique: true, // Đảm bảo email là duy nhất
  },
  // fullName: {
  //   type: String,
  //   required: false, // Bắt buộc trường này
  // },
  // gender: {
  //   type: String,
  //   // enum: ['Male', 'Female', 'Other', null],
  //   required: false,
  // },
  // numberPhone: {
  //   type: String,
  //   required: false, // k Bắt buộc trường này
  // },
  password: {
    type: String,
    required: true, //  Bắt buộc trường này
  },
  // avatar: {
  //   type: String,
  //   required: false,
  // },
  pin: {
    type: Number,
    required: true, // Bắt buộc trường này
  },
  pinSecondary: {
    type: String,
    required: false, // k Bắt buộc trư��ng này
  }, // Lưu trữ mã PIN phụ đã mã hóa
  pinCreatedAt: {
    type: Date,
    default: Date.now,
  },
  // roleID: {
  //   type: Number,
  //   required: false,
  //   default: 1, // Gán giá trị mặc định cho roleID
  // },
  updated_at: {
    type: Date,
    default: Date.now, // Cập nhật thời gian hiện tại khi thay đổi người dùng
  },

  isActive: {
    type: Boolean,
    default: false, // Tài khoản chưa được kích hoạt
  },
  role: {
    type: String,
    enum: ["admin", "customer", "doctor", "staff", "manager"],
    default: "customer",
  }, // Thêm trường role
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "manager",
  },
});

// Middleware trước khi lưu để kiểm tra trường email và password
userSchema.pre("save", function (next) {
  if (!this.email || !this.password) {
    const err = new Error("Email and Password are required");
    return next(err);
  }
  next();
});

// Middleware sau khi lưu để ghi log
userSchema.post("save", function (doc) {
  console.log("User saved successfully:", doc);
});

// Tạo model từ schema
const User = mongoose.model("User", userSchema);

export default User;
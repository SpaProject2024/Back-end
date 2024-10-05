// Trong models/accounts.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true, // Đảm bảo userID là duy nhất
    default: uuidv4, // Tạo ID duy nhất cho mỗi tài khoản
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
  pin: {
    type: Number,
    required: true,
  },
  resetToken: {
    type: String,
    required: false, // Trường này có thể không có
  },
  isActive: {
    type: Boolean,
    default: false, // Tài khoản chưa được kích hoạt
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", userSchema);
export default User;

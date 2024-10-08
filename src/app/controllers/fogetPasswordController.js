import bcrypt from "bcrypt"; // Đảm bảo bạn đã import bcrypt
import nodemailer from "nodemailer";
import User from "../models/users.js";
import dotenv from "dotenv";
import validator from "validator"; // Thêm thư viện để kiểm tra email

dotenv.config();

// Tạo transporter cho nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Hàm quên mật khẩu
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Kiểm tra định dạng email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is invalid" });
  }

  // Kiểm tra xem email có tồn tại không
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // Tạo mã PIN mới (nếu cần)
  const resetPin = Math.floor(100000 + Math.random() * 900000); // Tạo mã 6 chữ số

  // Cập nhật mã PIN vào cơ sở dữ liệu
  user.pin = resetPin; // Hoặc có thể tạo một trường mới cho mã PIN
  await user.save();

  // Gửi email chứa mã PIN
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sử dụng email người gửi
    to: email,
    subject: "Password Reset Code",
    text: `Hello,\n\nYour password reset code is: ${resetPin}\n\nBest regards,\nSupport Team.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset code has been sent to your email" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ message: "Error sending email" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword, pin } = req.body;

  // Kiểm tra định dạng email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  // Tìm người dùng theo email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // Kiểm tra mã PIN
  if (user.pin.toString() !== pin.toString()) {
    return res.status(400).json({ message: "Invalid PIN" });
  }

  // Băm mật khẩu mới
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Cập nhật mật khẩu và xóa mã PIN
  user.password = hashedPassword;
  // user.pin = undefined; // Xóa mã PIN
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
};

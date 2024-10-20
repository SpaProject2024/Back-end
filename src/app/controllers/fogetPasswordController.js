import bcrypt from "bcrypt"; // Import thư viện bcrypt để mã hóa mật khẩu
import nodemailer from "nodemailer"; // Import thư viện nodemailer để gửi email
import User from "../models/users.js"; // Import model người dùng từ cơ sở dữ liệu
import dotenv from "dotenv"; // Import dotenv để truy xuất các biến môi trường
import validator from "validator"; // Import validator để kiểm tra định dạng email

dotenv.config(); // Load các biến môi trường từ file .env

// Tạo transporter cho nodemailer để gửi email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email dùng để gửi
    pass: process.env.EMAIL_PASS, // Mật khẩu email
  },
});

// Tạo một class chứa các phương thức xử lý quên và đặt lại mật khẩu
class PasswordController {
  // Hàm quên mật khẩu
  static forgotPassword(req, res) {
    const { email } = req.body;

    // Kiểm tra định dạng email hợp lệ
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    // Kiểm tra xem email có tồn tại trong hệ thống không
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User does not exist" });
        }

        // Tạo mã PIN reset mật khẩu ngẫu nhiên (6 chữ số)
        const resetPin = Math.floor(100000 + Math.random() * 900000);

        // Cập nhật mã PIN vào cơ sở dữ liệu của người dùng
        user.pin = resetPin; // Lưu mã PIN vào trường của user
        return user.save();
      })
      .then((user) => {
        // Thiết lập nội dung email chứa mã PIN
        const mailOptions = {
          from: process.env.EMAIL_USER, // Địa chỉ email người gửi
          to: email, // Địa chỉ email của người nhận
          subject: "Password Reset Code", // Tiêu đề email
          text: `Hello,\n\nYour password reset code is: ${user.pin}\n\nBest regards,\nSupport Team.`, // Nội dung email
        };

        // Gửi email chứa mã PIN
        return transporter.sendMail(mailOptions);
      })
      .then(() => {
        res.status(200).json({ message: "Password reset code has been sent to your email" });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Error sending email or processing request" });
      });
  }

  // Hàm đặt lại mật khẩu
  static resetPassword(req, res) {
    const { email, newPassword, pin } = req.body;

    // Kiểm tra định dạng email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Tìm người dùng theo email
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User does not exist" });
        }

        // Kiểm tra mã PIN
        if (user.pin.toString() !== pin.toString()) {
          return res.status(400).json({ message: "Invalid PIN" });
        }

        // Mã hóa mật khẩu mới
        return bcrypt.hash(newPassword, 10).then((hashedPassword) => {
          // Cập nhật mật khẩu và xóa mã PIN
          user.password = hashedPassword;
          return user.save();
        });
      })
      .then(() => {
        res.status(200).json({ message: "Password changed successfully" });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Error processing request" });
      });
  }
}

// Xuất khẩu class PasswordController
export default PasswordController;

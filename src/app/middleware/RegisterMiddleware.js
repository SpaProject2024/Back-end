import User from "../models/users.js"; // Mô hình User từ MongoDB
import nodemailer from "nodemailer"; // Để gửi email
import dotenv from "dotenv"; // Để quản lý biến môi trường

dotenv.config(); // Tải biến môi trường

// Tạo transporter cho nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Địa chỉ email từ biến môi trường
    pass: process.env.EMAIL_PASS, // Mật khẩu hoặc mật khẩu ứng dụng từ biến môi trường
  },
});

class RegisterMiddleware {
  // Kiểm tra xem các trường yêu cầu có đầy đủ không
  validateRegistrationFields(req, res, next) {
    const { email, password, role } = req.body;
    let missingFields = [];

    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!role) missingFields.push("role");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields: " + missingFields.join(", "),
      });
    }

    next();
  }

  // Kiểm tra xem người dùng đã tồn tại chưa
  checkUserExists(req, res, next) {
    const { email } = req.body;

    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(409).json({ message: "User already exists" });
        }
        next();
      })
      .catch(error => {
        return res.status(500).json({ message: "Error checking user", error: error.message });
      });
  }

  // Kiểm tra mã PIN phụ
  validateSecondaryPin(req, res, next) {
    const { pinSecondary } = req.body; // Nhận mã PIN phụ từ yêu cầu

    // Kiểm tra mã PIN phụ có đúng định dạng 4 chữ số không
    if (!/^\d{4}$/.test(pinSecondary)) {
      return res.status(400).json({ message: "Secondary PIN must be 4 digits" });
    }

    next();
  }

  // Kiểm tra xem người dùng có tồn tại không
  checkUserByEmail(req, res, next) {
    const email = req.session.email; // Lấy email từ phiên

    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.user = user; // Gán người dùng vào request để sử dụng sau
        next();
      })
      .catch(error => {
        return res.status(500).json({ message: "Error finding user", error: error.message });
      });
  }
}

const registerMiddleware = new RegisterMiddleware();

export default registerMiddleware;

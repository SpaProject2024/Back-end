import nodemailer from "nodemailer"; // Để gửi email
import bcrypt from "bcrypt"; // Thư viện để mã hóa mật khẩu
import dotenv from "dotenv"; // Để quản lý biến môi trường
import User from "../models/users.js"; // Mô hình User từ MongoDB

dotenv.config(); // Tải biến môi trường

// Tạo transporter cho nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Địa chỉ email từ biến môi trường
    pass: process.env.EMAIL_PASS, // Mật khẩu hoặc mật khẩu ứng dụng từ biến môi trường
  },
});

// Hàm tạo mã PIN chính
function generateMainPinCode() {
  return Math.floor(100000 + Math.random() * 900000); // Tạo mã PIN chính 6 chữ số
}

// Hàm tạo mã PIN phụ 4 chữ số
function generateSecondaryPinCode() {
  return Math.floor(1000 + Math.random() * 9000); // Tạo mã PIN phụ 4 chữ số
}

// Hàm xử lý đăng ký người dùng
export const registerUser = async (req, res) => {
  const { email, password, role } = req.body; // Nhận vai trò từ yêu cầu đăng ký

  // Kiểm tra xem các trường cần thiết đã được cung cấp chưa
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password, and role are required" });
  }

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Tạo mã PIN chính
    const pin = generateMainPinCode(); // Tạo mã PIN chính 6 chữ số
    
    // Tạo người dùng mới
    const newUser = new User({
      email,
      password: hashedPassword,
      pin,
      pinSecondary: "", // Mã PIN phụ sẽ được thêm sau
      pinCreatedAt: Date.now(), // Thời gian tạo mã PIN
      isActive: false, // Tài khoản chưa được kích hoạt
      address: "",
      birthday: "",
      fullName: "",
      avatar: "",
      gender: "",
      numberPhone: "",
      role // Lưu vai trò người dùng
    });

    // Lưu người dùng mới vào cơ sở dữ liệu
    await newUser.save();
    req.session.email = email; // Lưu email vào phiên
    req.session.save(); // Lưu phiên
    console.log("email session: " + email);

    // Thiết lập tùy chọn email để thông báo mã PIN
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sử dụng địa chỉ email từ biến môi trường
      to: email,
      subject: "Your Registration PIN",
      text: `Hello ${email},\n\nThank you for signing up! Your main PIN is: ${pin}.\n\nBest regards,\nSupport Team.`,
    };

    // Gửi email chứa mã PIN
    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: "Registration successful, PIN has been sent to email", data: newUser });

  } catch (error) {
    // Xử lý lỗi trong quá trình đăng ký
    res.status(500).json({ message: "Error while registering", error: error.message });
  }
};

// Hàm cho phép người dùng đặt mã PIN phụ
export const setSecondaryPin = async (req, res) => {
  const { pinSecondary } = req.body; // Nhận email và mã PIN phụ từ yêu cầu
  // Kiểm tra xem email có trong phiên không
  if (!req.session.email) {
    return res.status(400).json({ message: "Email không tồn tại trong phiên. Vui lòng đăng ký lại." });
  }

  const email = req.session.email;
  // Kiểm tra xem các trường cần thiết đã được cung cấp chưa
  if (!email || !pinSecondary) {
    return res.status(400).json({ message: "Email and secondary PIN are required" });
  }

  // Kiểm tra mã PIN phụ có đúng định dạng 4 chữ số không
  if (!/^\d{4}$/.test(pinSecondary)) {
    return res.status(400).json({ message: "Secondary PIN must be 4 digits" });
  }

  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mã hóa mã PIN phụ trước khi lưu
    const hashedPin = await bcrypt.hash(pinSecondary, 10); // 10 là số lần băm

    // Cập nhật mã PIN phụ
    user.pinSecondary = hashedPin; // Lưu mã PIN phụ đã được mã hóa vào người dùng
    await user.save(); // Lưu thay đổi vào cơ sở dữ liệu

    // Không gửi email thông báo mã PIN phụ
    res.status(200).json({ message: "Secondary PIN has been set successfully." });

  } catch (error) {
    res.status(500).json({ message: "Error while setting secondary PIN", error: error.message });
  }
};

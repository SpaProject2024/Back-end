

import User from "../models/users.js"; // Mô hình User từ MongoDB
import bcrypt from "bcrypt"; // Thư viện mã hóa mật khẩu
import jwt from "jsonwebtoken"; // Thư viện tạo token JWT

// Hàm đăng nhập
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra xem email và mật khẩu có được cung cấp không
  if (!email || !password) {
    return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
  }

  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });

    // Nếu người dùng không tồn tại, trả về lỗi
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // // Kiểm tra xem tài khoản có đang hoạt động (isActive) không
    // if (!user.isActive) {
    //   return res.status(403).json({ message: "Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên." });
    // }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }

    // Tạo token JWT cho người dùng
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    // Tạo refresh token
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Thời gian sống dài hơn cho refresh token
    });

    // Lưu refresh token vào cơ sở dữ liệu
    user.refreshToken = refreshToken; // Thêm thuộc tính refreshToken vào người dùng
    await user.save(); // Lưu thay đổi vào cơ sở dữ liệu
    res.setHeader("x-expires-in", "5m");

    // Trả về thông báo thành công và token
    res.status(200).json({
      message: "Đăng nhập thành công",
      data: { userId: user._id, email: user.email, token, refreshToken, isActive: user.isActive },
    });
  } catch (error) {
    // Bắt lỗi và trả về thông báo lỗi
    res.status(500).json({ message: "Lỗi khi đăng nhập", error: error.message });
  }
};


// Hàm lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả người dùng
    if (users.length === 0) {
      return res.status(404).json({ message: "Không có người dùng nào được tìm thấy." });
    }
    res.status(200).json({ message: "Success", data: users });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu", error: error.message });
  }
};

// Hàm làm mới token
export const refreshToken = async (req, res) => {
  const { pinSecondary } = req.body; // Nhận mã PIN phụ từ yêu cầu

  // Kiểm tra xem người dùng có đang đăng nhập không
  if (!req.session.email) {
    return res.status(400).json({ message: "Email không tồn tại trong phiên. Vui lòng đăng ký lại." });
  }

  const email = req.session.email;

  // Tìm người dùng theo email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Người dùng không tồn tại" });
  }

  // Kiểm tra mã PIN phụ
  if (!pinSecondary || pinSecondary !== user.pinSecondary) {
    return res.status(401).json({ message: "Mã PIN phụ không chính xác" });
  }

  // Tạo token mới
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  // Trả về token mới
  res.status(200).json({ message: "Token đã được làm mới thành công", token });
};

// Hàm lấy thông tin người dùng theo ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng", error: error.message });
  }
};


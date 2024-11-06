import User from "../models/users.js"; // Mô hình User từ MongoDB
import bcrypt from "bcrypt"; // Thư viện mã hóa mật khẩu
import jwt from "jsonwebtoken"; // Thư viện tạo token JWT

// Hàm đăng nhập
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra xem email và mật khẩu có được cung cấp không
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });

    // Nếu người dùng không tồn tại, trả về lỗi
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // // Kiểm tra xem tài khoản có đang hoạt động (isActive) không
    if (!user.isActive) {
      return res.status(403).json({ message: "Your account has been disabled. Please contact the administrator." });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    // Tạo token JWT cho người dùng
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email, password: user.password }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    // Tạo refresh token
    const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Thời gian sống dài hơn cho refresh token
    });

    // Lưu refresh token vào cơ sở dữ liệu
    user.refreshToken = refreshToken; // Thêm thuộc tính refreshToken vào người dùng
    await user.save(); // Lưu thay đổi vào cơ sở dữ liệu
    res.setHeader("x-expires-in", "5d");

    // Trả về thông báo thành công và token
    res.status(200).json({
      message: "Login successful",
      data: { userId: user._id, email: user.email, role: user.role, token, refreshToken, isActive: user.isActive },
    });
  } catch (error) {
    // Bắt lỗi và trả về thông báo lỗi
    res.status(500).json({ message: "Error while logging in", error: error.message });
  }
};


// Hàm lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả người dùng
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json({ message: "Success", data: users });
  } catch (error) {
    res.status(500).json({ message: "Error while retrieving data", error: error.message });
  }
};

// Hàm làm mới token
export const refreshToken = async (req, res) => {
  const { pinSecondary } = req.body; // Nhận mã PIN phụ từ yêu cầu

  // Kiểm tra xem người dùng có đang đăng nhập không
  if (!req.session.email) {
    return res.status(400).json({ message: "Email does not exist in session. Please register again." });
  }

  const email = req.session.email;

  // Tìm người dùng theo email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // Kiểm tra mã PIN phụ
  if (!pinSecondary || pinSecondary !== user.pinSecondary) {
    return res.status(401).json({ message: "Incorrect secondary PIN" });
  }

  // Tạo token mới
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  // Trả về token mới
  res.status(200).json({ message: "Token has been successfully renewed", token });
};

// Hàm lấy thông tin người dùng theo ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error getting user information", error: error.message });
  }
};
// Hàm cập nhật mật khẩu
export const updatePassword = async (req, res) => {
  const { id } = req.params; // Lấy user ID từ tham số URL
  const { oldPassword, newPassword } = req.body; // Lấy oldPassword và newPassword từ request body
  try {
    // Tìm người dùng theo ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Mật khẩu cũ không chính xác" });
    // }

    // Kiểm tra xem mật khẩu mới có khác mật khẩu cũ không
    if (oldPassword === newPassword) {
      return res.status(400).json({ message: "The new password cannot be the same as the old password." });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while updating password", error: error.message });
  }
};

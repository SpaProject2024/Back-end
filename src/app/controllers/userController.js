// controllers/userController.js
import User from '../models/users.js'; // Đảm bảo đường dẫn đúng tới model

// Thêm user
export const addUser = async (req, res) => {
  const { email, password, pin ,fullName  } = req.body;
  
  if (!email || !password || !pin || !fullName ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = new User({ email, password, pin, fullName });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

// Lấy danh sách tất cả users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Success", data: users });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
  }
};

// Lấy user theo ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Success", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};

// Cập nhật user theo ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, pin } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, password, pin },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Xóa user theo ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

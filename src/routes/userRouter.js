// routes/userRouter.js
import express from 'express';
import {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../app/controllers/userController.js'

const router = express.Router();

router.post('/', addUser); // Thêm user
router.get('/', getUsers); // Lấy danh sách tất cả users
router.get('/:id', getUserById); // Lấy thông tin user theo ID
router.put('/:id', updateUser); // Cập nhật thông tin user
router.delete('/:id', deleteUser); // Xóa user

export default router;

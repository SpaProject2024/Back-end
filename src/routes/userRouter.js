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

router.post('/', addUser); 
router.get('/', getUsers); 
router.get('/:id', getUserById); 
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser); 

export default router;

// routes/userRouter.js
import express from 'express';
import { addUser, getUsers, getUserById, updateUser, deleteUser } from '../app/controllers/userController.js'
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', verifyToken, authorizeRole(["manager", "customer"]), addUser);
router.put('/:id', verifyToken, authorizeRole(["manager", "customer"]), updateUser);
router.delete('/:id', verifyToken, authorizeRole(["manager", "customer"]), deleteUser);

export default router;

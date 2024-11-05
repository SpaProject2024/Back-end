import express from "express";
import { loginUser, getUserById, refreshToken, updatePassword } from "../app/controllers/loginController.js";

const router = express.Router();
router.post("/", loginUser);
router.put("/:id", updatePassword);
router.get("/:id", getUserById);
router.post('/refreshtoken', refreshToken);
export default router;

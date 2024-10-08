import express from "express";
import { loginUser, getUserById, refreshToken } from "../app/controllers/loginController.js";

const router = express.Router();
router.post("/", loginUser);
router.get("/:id", getUserById);
router.post('/refreshtoken', refreshToken);
export default router;

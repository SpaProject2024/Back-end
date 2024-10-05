import express from "express";
import { forgotPassword , resetPassword } from "../app/controllers/fogetPasswordController.js"
const router = express.Router();
router.post("/", forgotPassword);
router.put("/reset", resetPassword);
export default router;

import express from "express";
import PasswordController  from "../app/controllers/fogetPasswordController.js"
const router = express.Router();
router.post("/", PasswordController.forgotPassword);
router.put("/reset", PasswordController.resetPassword);
export default router;
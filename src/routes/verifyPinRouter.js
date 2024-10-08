import express from "express";
import {  verifyPin, resendPin } from "../app/controllers/verifyPinController.js";
const router = express.Router();

router.post("/", verifyPin);
router.put("/resend", resendPin);
export default router;

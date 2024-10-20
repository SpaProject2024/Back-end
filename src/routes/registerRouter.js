import express from "express";
import {
  registerUser,
  setSecondaryPin,
} from "../app/controllers/registerController.js";
import { authorizeRole } from "../app/middleware/authorize.js";
const router = express.Router();
router.post("/", registerUser);
router.post("/secondaryPin", setSecondaryPin);
export default router;

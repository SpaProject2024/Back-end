import express from "express";

import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../app/controllers/doctorsController.js"
import { authorizeRole } from "../middleware/authorize.js";
const router = express.Router();
router.get("/", getDoctors);
router.post("/", createDoctor);
router.get("/:id", authorizeRole(["customer", "staff", "doctor"]), getDoctorById);
router.put("/:id", authorizeRole(["doctor", "admin", "manager"]), updateDoctor);
router.delete("/:id",authorizeRole(["admin", "manager"]), deleteDoctor);

export default router;


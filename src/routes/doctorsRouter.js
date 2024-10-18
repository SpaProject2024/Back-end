import express from "express";

import doctorController from "../app/controllers/doctorsController.js";
import { authorizeRole } from "../app/middleware/authorize.js";
import doctorMiddleware from "../app/middleware/DoctorMiddleware.js";
const router = express.Router();
router.get("/", doctorController.getAll);
router.post(
  "/",
  // authorizeRole(["manager"]),
  doctorMiddleware.isBadRequest,
  doctorController.create
);
router.get("/:id", doctorMiddleware.isNotFound, doctorController.get);
router.put(
  "/:id",
  // authorizeRole(["doctor", "admin", "manager"]),
  doctorMiddleware.isBadRequest,
  doctorMiddleware.isNotFound,
  doctorController.update
);
router.delete(
  "/:id",
  // authorizeRole(["admin", "manager"]),
  doctorMiddleware.isNotFound,
  doctorController.delete
);
export default router;

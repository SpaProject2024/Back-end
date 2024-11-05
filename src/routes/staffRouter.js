import express from "express";

import staffController from "../app/controllers/staffController.js";
import doctorMiddleware from "../app/middleware/DoctorMiddleware.js";
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();
router.get("/", staffController.getAll);
router.post("/", verifyToken, authorizeRole(["manager", "staff"]), staffController.create);
router.get("/:id", staffController.get);
router.put("/:id", verifyToken, authorizeRole(["manager", "staff"]), staffController.update);
router.delete("/:id", verifyToken, authorizeRole(["manager", "staff"]), staffController.delete);
export default router;
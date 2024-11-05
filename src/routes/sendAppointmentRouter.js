import express from "express";
import sendController from "../app/controllers/sendappointmentController.js"
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();
router.get("/", sendController.getAll);
router.get("/:id", sendController.get);
router.post("/", verifyToken, authorizeRole(["manager", "staff", "doctor", "customer"]), sendController.create);
router.put("/:id", verifyToken, authorizeRole(["manager", "staff", "doctor", "customer"]), sendController.update);
router.delete("/:id", verifyToken, authorizeRole(["manager", "staff", "doctor", "customer"]), sendController.delete);

export default router;

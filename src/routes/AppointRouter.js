import express from "express";
import appointController from "../app/controllers/AppointController.js";
import appointMiddleware from "../app/middleware/AppointMiddleware.js";
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();

// router.get("/", appointController.getAll);
// router.get("/:id", appointMiddleware.notFoundAppoint, appointController.get);
// router.get("/GetStatus/:status", appointMiddleware.notFoundStatus, appointController.getByStatus);
// router.post("/", verifyToken, authorizeRole(["customer", "staff", "manager"]), appointMiddleware.badRequestAppoint, appointController.create);
// router.put("/:id", verifyToken, authorizeRole(["customer", "staff", "manager"]), appointMiddleware.notFoundAppoint, appointMiddleware.badRequestAppoint, appointController.update);
// router.put("/UpdateStatus/:id", verifyToken, authorizeRole(["customer", "staff", "manager"]), appointMiddleware.notFoundAppoint, appointMiddleware.badRequestStatus, appointController.updateStatus);
// router.delete("/:id", verifyToken, authorizeRole(["customer", "staff", "manager"]), appointMiddleware.notFoundAppoint, appointController.delete);


router.get("/", appointController.getAll);
router.get("/status/:text", appointController.getByStatus);
router.get("/:id", appointMiddleware.notFoundAppoint, appointController.get);
router.post("/", verifyToken, authorizeRole(["customer", "staff", "manager"]), appointMiddleware.badRequestAppoint, appointController.create);
router.put("/:id", verifyToken, authorizeRole(["customer", "staff", "manager"]), appointMiddleware.notFoundAppoint, appointMiddleware.badRequestAppoint, appointController.update);
router.put("/UpdateStatus/:id", verifyToken, authorizeRole(["customer", "staff", "manager"]), appointMiddleware.notFoundAppoint, appointMiddleware.badRequestStatus, appointController.updateStatus);
router.delete("/:id", verifyToken, authorizeRole(["customer", "staff", "manager"]), appointMiddleware.notFoundAppoint, appointController.delete);

export default router;

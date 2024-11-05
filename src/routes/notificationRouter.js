import express from "express";
//abc
import NotificationController from "../app/controllers/NotificationController.js"
// import { authorizeRole } from "../middleware/authorize.js";
const router = express.Router();
router.get("/", NotificationController.getAll);
router.post("/", NotificationController.create);
router.get("/:id", NotificationController.get);
router.put("/:id", NotificationController.update);
router.delete("/:id", NotificationController.delete);

export default router;

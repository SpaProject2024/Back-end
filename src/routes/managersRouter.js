import express from "express";
import managersController from "../app/controllers/managersController.js";
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
// import { authorizeRole } from "../middlewar.js";
const router = express.Router();
router.get("/", managersController.getAll);
router.get("/:id", managersController.get);
router.post("/", verifyToken, authorizeRole(["admin", "manager"]), managersController.create);
router.put("/:id", verifyToken, authorizeRole(["admin", "manager"]), managersController.update);
router.delete("/:id", verifyToken, authorizeRole(["admin", "manager"]), managersController.delete);
export default router;


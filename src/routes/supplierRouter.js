import express from "express";
import SuppliersController from "../app/controllers/suppilerControler.js"
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();
router.get("/", SuppliersController.getAll);
router.get("/:id", SuppliersController.get);
router.post("/", verifyToken, authorizeRole(["manager"]), SuppliersController.create);
router.put("/:id", verifyToken, authorizeRole(["manager"]), SuppliersController.update);
router.delete("/:id", verifyToken, authorizeRole(["manager"]), SuppliersController.delete);

export default router;

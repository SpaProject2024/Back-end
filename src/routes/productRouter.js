import express from "express";

import productController from "../app/controllers/productController.js";
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();
router.get("/", productController.getAll);
router.post("/", verifyToken, authorizeRole(["manager"]), productController.create);
router.get("/:id", productController.get);
router.put("/:id", verifyToken, authorizeRole(["manager"]), productController.update);
router.delete("/:id", verifyToken, authorizeRole(["manager"]), productController.delete);
export default router;

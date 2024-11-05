import express from "express";
import CategoriesController from "../app/controllers/categoriesController.js"
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();

router.get("/", CategoriesController.getAll);
router.get("/:id", CategoriesController.get);
router.post("/", verifyToken, authorizeRole(["manager"]), CategoriesController.create);
router.put("/:id", verifyToken, authorizeRole(["manager"]), CategoriesController.update);
router.delete("/:id", verifyToken, authorizeRole(["manager"]), CategoriesController.delete);

export default router;

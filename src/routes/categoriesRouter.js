import express from "express";
import {
    createCategories,
    getCategories,
    getCategoriesByID,
    updateCategories,
    deleteCategories,
} from "../app/controllers/categoriesController.js"
import { authorizeRole } from "../app/middleware/authorize.js";
const router = express.Router();
router.get("/", getCategories);
router.post("/", authorizeRole(["manager"]), createCategories);
router.get("/:id", getCategoriesByID);
router.put("/:id", authorizeRole(["manager"]), updateCategories);
router.delete("/:id", authorizeRole(["manager"]), deleteCategories);

export default router;

import express from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../app/controllers/productController.js"
import { authorizeRole } from "../app/middleware/authorize.js";
const router = express.Router();
router.get("/", getAllProducts);
router.post("/", authorizeRole(["manager"]), createProduct);
router.get("/:id", getProductById);
router.put("/:id", authorizeRole(["manager"]), updateProduct);
router.delete("/:id", authorizeRole(["manager"]), deleteProduct);

export default router;

import express from "express";
import {
    createSupplier,
    getSupplier,
    getSuppierByID,
    updateSupplier,
    deleteSupplier,
} from "../app/controllers/suppilerControler.js"
import { authorizeRole } from "../app/middleware/authorize.js";
const router = express.Router();
router.get("/", getSupplier);
router.post("/", authorizeRole(["manager"]), createSupplier);
router.get("/:id", getSuppierByID);
router.put("/:id", authorizeRole(["manager"]), updateSupplier);
router.delete("/:id", authorizeRole(["manager"]), deleteSupplier);

export default router;

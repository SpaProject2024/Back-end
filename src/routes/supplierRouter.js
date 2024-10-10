import express from "express";
import {
    createSupplier,
    getSupplier,
    getSuppierByID,
    updateSupplier,
    deleteSupplier,
} from "../app/controllers/suppilerControler.js"

const router = express.Router();
router.get("/", getSupplier);
router.post("/", createSupplier);
router.get("/:id", getSuppierByID);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;

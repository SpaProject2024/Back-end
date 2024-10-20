import express from "express";
import {
    createManager,
    getManagers,
    getManagerById,
    updateManager,
    deletedManager,
} from "../app/controllers/managersController.js"
// import { authorizeRole } from "../middleware/authorize.js";
const router = express.Router();
router.get("/", getManagers);
router.post("/", createManager);
router.get("/:id", getManagerById);
router.put("/:id", updateManager);
router.delete("/:id", deletedManager);

export default router;


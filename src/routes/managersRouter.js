import express from "express";
import {
    createManager,
    getManagers,
    getManagerById,
    updateManager,
    deleteManagerr,
} from "../app/controllers/managersController.js"
import { authorizeRole } from "../middleware/authorize.js";
const router = express.Router();
router.get("/", getManagers);
router.post("/", createManager);
router.get("/:id", authorizeRole(["manager"]), getManagerById);
router.put("/:id", authorizeRole(["manager"]), updateManager);
router.delete("/:id", authorizeRole(["manager"]), deleteManagerr);

export default router;

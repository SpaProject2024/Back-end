import express from "express";
//abc
import {
    createSend,
    getSend,
    getSendID,
    deletedSend,
} from "../app/controllers/sendappointmentController.js"
import { authorizeRole } from "../middleware/authorize.js";
const router = express.Router();
router.get("/", getSend);
router.post("/", createSend);
router.get("/:id",  getSendID);
router.delete("/:id", deletedSend);

export default router;

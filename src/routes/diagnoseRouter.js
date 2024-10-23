import express from 'express';
import {
    createDiagnose,
    updateDiagnose,
    deleteDiagnose,
    getAllDiagnoses,
    getDiagnoseById
} from '../app/controllers/diagnoseController.js';
import { authorizeRole } from "../app/middleware/authorize.js";
const router = express.Router();
// Routes cho Diagose
router.get("/", getAllDiagnoses);                                    // Lấy tất cả diagose
router.post("/", createDiagnose);         // Tạo diagose mới
router.get("/:id", getDiagnoseById);                                 // Lấy diagose theo id
router.put("/:id", updateDiagnose);       // Cập nhật diagose theo id
router.delete("/:id", deleteDiagnose);    // Xóa diagose theo id


export default router;

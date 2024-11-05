import express from 'express';
import DiagnoseController from '../app/controllers/diagnoseController.js';
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();
// Routes cho Diagose
router.get("/", DiagnoseController.getAll);                                    // Lấy tất cả diagose
router.get("/:id", DiagnoseController.get);                                 // Lấy diagose theo id
router.post("/", verifyToken, authorizeRole(["doctor"]), DiagnoseController.create);         // Tạo diagose mới
router.put("/:id", verifyToken, authorizeRole(["doctor"]), DiagnoseController.update);       // Cập nhật diagose theo id
router.delete("/:id", verifyToken, authorizeRole(["doctor"]), DiagnoseController.delete);    // Xóa diagose theo id


export default router;

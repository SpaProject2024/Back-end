import express from 'express';
const router = express.Router();
import warehouseController from '../app/controllers/warehouseController.js';
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";

router.get('/list', warehouseController.getAllWarehouses);
router.get('/detail/:id', warehouseController.getWarehouseById);
router.post('/add', verifyToken, authorizeRole(["manager"]), warehouseController.addWarehouse);
router.put('/update/:id', verifyToken, authorizeRole(["manager"]), warehouseController.updateWarehouse);
router.delete('/delete/:id', verifyToken, authorizeRole(["manager"]), warehouseController.deleteWarehouse);


export default router;
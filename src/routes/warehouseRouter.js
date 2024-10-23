import express from 'express';
const router = express.Router();
import warehouseController from '../app/controllers/warehouseController.js';

router.post('/add', warehouseController.addWarehouse);
router.put('/update/:id', warehouseController.updateWarehouse);
router.delete('/delete/:id', warehouseController.deleteWarehouse);
router.get('/list', warehouseController.getAllWarehouses);
router.get('/detail/:id', warehouseController.getWarehouseById);

export default router;
const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

router.post('/add', warehouseController.addWarehouse);
router.put('/update/:id', warehouseController.updateWarehouse);
router.delete('/delete/:id', warehouseController.deleteWarehouse);
router.get('/list', warehouseController.getAllWarehouses);
router.get('/detail/:id', warehouseController.getWarehouseById);

module.exports = router;

import express from "express";
import serviceController from "../app/controllers/ServiceController.js";
import serviceMiddleware from "../app/middleware/ServiceMiddleware.js"; 
const router = express.Router()

router.get('/', serviceController.getAll)
router.get('/:id', serviceMiddleware.isNotFound, serviceController.get)
router.post('/', serviceMiddleware.isBadRequest, serviceController.create)
router.put('/:id', serviceMiddleware.isNotFound, serviceMiddleware.isBadRequest, serviceController.update)
router.delete('/:id', serviceMiddleware.isNotFound, serviceController.delete)

export default router;
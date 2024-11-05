import express from "express";
import serviceController from "../app/controllers/ServiceController.js";
import serviceMiddleware from "../app/middleware/ServiceMiddleware.js";
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router()

router.get('/', serviceController.getAll)
router.get('/search/:text', serviceController.getAll)
router.get('/:id', serviceMiddleware.isNotFound, serviceController.get)
router.post('/', verifyToken, authorizeRole(["manager"]), serviceController.create)
router.put('/:id', verifyToken, authorizeRole(["manager"]), serviceMiddleware.isNotFound, serviceMiddleware.isBadRequest, serviceController.update)
router.delete('/:id', verifyToken, authorizeRole(["manager"]), serviceMiddleware.isNotFound, serviceController.delete)

export default router;
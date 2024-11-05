import express from 'express';
import { addWorkSchedule, updateWorkSchedule, deleteWorkSchedule, getAllWorkSchedules, getWorkScheduleById } from '../app/controllers/workController.js';
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();

router.get('/', getAllWorkSchedules);
router.get('/:id', getWorkScheduleById);
router.post('/', verifyToken, authorizeRole(["manager"]), addWorkSchedule);
router.put('/:id', verifyToken, authorizeRole(["manager"]), updateWorkSchedule);
router.delete('/:id', verifyToken, authorizeRole(["manager"]), deleteWorkSchedule);

export default router;

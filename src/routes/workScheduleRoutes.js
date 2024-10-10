import express from 'express';
import { addWorkSchedule, updateWorkSchedule, deleteWorkSchedule,getAllWorkSchedules,getWorkScheduleById } from '../app/controllers/workController.js';

const router = express.Router();

router.post('/', addWorkSchedule);

router.put('/:id', updateWorkSchedule);

router.delete('/:id', deleteWorkSchedule);
router.get('/', getAllWorkSchedules);
router.get('/:id', getWorkScheduleById);
export default router;

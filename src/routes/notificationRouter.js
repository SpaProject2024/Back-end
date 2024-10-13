import express from 'express';
import { getNotifications } from '../app/controllers/notificationController.js';

const router = express.Router();

// Định nghĩa route cho notification
router.get('/notifications/:userId', getNotifications);

export default router;

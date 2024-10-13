import express from 'express';
import { getChatHistory, sendMessage } from '../app/controllers/chatController.js';

const router = express.Router();

// Định nghĩa route cho chat
router.get('/chat-history/:conversationId', getChatHistory);
router.post('/send-message', sendMessage);

export default router;

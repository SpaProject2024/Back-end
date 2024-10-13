import Chat from '../models/chat.js';

// Lấy lịch sử tin nhắn
export const getChatHistory = async (req, res) => {
  try {
    const chatHistory = await Chat.find({ conversationId: req.params.conversationId }).sort({ timestamp: -1 });
    res.status(200).json(chatHistory);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching chat history' });
  }
};

// Gửi tin nhắn
export const sendMessage = async (req, res) => {
  try {
    const newMessage = new Chat(req.body);
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Error sending message' });
  }
};

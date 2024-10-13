import Notification from '../models/notification.js';

// Lấy thông báo
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};

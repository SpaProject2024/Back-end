import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  userId: String,
  type: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

export default mongoose.model('Notification', NotificationSchema);

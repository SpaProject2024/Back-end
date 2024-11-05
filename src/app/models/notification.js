import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    content: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    notification_type: {
        type: String,
        default: "Appointment",
        required: true,
    },
    receiverID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    senderID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Export the model
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;

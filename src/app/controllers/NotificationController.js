import Notification from '../models/notification.js'; // Ensure the path to the Notification model is correct

class NotificationController {
    // Get all notifications
    getAll(req, res, next) {
        Notification.find()
            .then((notifications) => res.status(200).json({ data: notifications }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Get notification by ID
    get(req, res, next) {
        Notification.findById(req.params.id)
            .then((notification) => {
                if (!notification) {
                    return res.status(404).json({ message: "Notification not found" });
                }
                res.status(200).json({ data: notification });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Create a new notification
    create(req, res, next) {
        const notification = new Notification(req.body);
        notification
            .save()
            .then((newNotification) => res.status(201).json({ data: newNotification }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Update notification by ID
    update(req, res, next) {
        Notification.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedNotification) => {
                if (!updatedNotification) {
                    return res.status(404).json({ message: "Notification not found" });
                }
                res.status(200).json({ data: updatedNotification });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Delete notification by ID
    delete(req, res, next) {
        Notification.findByIdAndDelete(req.params.id)
            .then((deletedNotification) => {
                if (!deletedNotification) {
                    return res.status(404).json({ message: "Notification not found" });
                }
                res.status(200).json({ message: "Delete notification successfully!" });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }
}

const notificationController = new NotificationController();
export default notificationController;

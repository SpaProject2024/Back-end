import Manager from "../models/managers.js"; // Import the doctors model
class ManagerController {
    // Get all managers
    getAll(req, res, next) {
        Manager.find()
            .then((managers) => res.status(200).json({ data: managers }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Get a manager by ID
    get(req, res, next) {
        Manager.findById(req.params.id)
            .then((manager) => {
                if (!manager) {
                    return res.status(404).json({ message: "Manager not found" });
                }
                res.status(200).json({ data: manager });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Create a new manager
    create(req, res, next) {
        const manager = new Manager(req.body);
        manager
            .save()
            .then((newManager) => res.status(201).json({ data: newManager }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Update a manager by ID
    update(req, res, next) {
        Manager.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedManager) => {
                if (!updatedManager) {
                    return res.status(404).json({ message: "Manager not found" });
                }
                res.status(200).json({ data: updatedManager });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Delete a manager by ID
    delete(req, res, next) {
        Manager.findByIdAndDelete(req.params.id)
            .then((deletedManager) => {
                if (!deletedManager) {
                    return res.status(404).json({ message: "Manager not found" });
                }
                res.status(200).json({ message: "Delete manager successfully!" });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }
}

const managerController = new ManagerController();
export default managerController;

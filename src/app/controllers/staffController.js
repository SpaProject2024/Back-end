import Staff from "../models/staffs.js";

class StaffController {
  // Get all staff members
  getAll(req, res, next) {
    Staff.find()
      .then((staffs) => res.status(200).json({ data: staffs }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Get a staff member by ID
  get(req, res, next) {
    Staff.findById(req.params.id)
      .then((staff) => {
        if (!staff) {
          return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ data: staff });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Create a new staff member
  create(req, res, next) {
    const staff = new Staff(req.body);
    staff
      .save()
      .then((newStaff) => res.status(201).json({ data: newStaff }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Update a staff member by ID
  update(req, res, next) {
    Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedStaff) => {
        if (!updatedStaff) {
          return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ data: updatedStaff });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Delete a staff member by ID
  delete(req, res, next) {
    Staff.findByIdAndDelete(req.params.id)
      .then((deletedStaff) => {
        if (!deletedStaff) {
          return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ message: "Delete staff successfully!" });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }
}

const staffController = new StaffController();
export default staffController;

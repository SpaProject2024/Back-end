import Doctors from "../models/users.js";
import Doctor from "../models/doctors.js";
class DoctorController {
  // Get all Doctors
  getAll(req, res, next) {
    Doctors.find({ role: "doctor" })
      .populate("doctorId")
      .then((doctors) => res.status(200).json({ data: doctors }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Get a Doctor by ID
  get(req, res, next) {
    Doctors.findById(req.params.id)
      .populate("doctorId") // Populate doctorId để lấy thông tin bác sĩ
      .then((doctor) => {
        if (!doctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ data: doctor });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Create a new Doctor
  create(req, res, next) {
    const doctor = new Doctors(req.body);
    doctor
      .save()
      .then((newDoctor) => res.status(201).json({ data: newDoctor }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Update a Doctor by ID
  update(req, res, next) {
    Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedDoctor) => {
        if (!updatedDoctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ data: updatedDoctor });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Delete a Doctor by ID
  delete(req, res, next) {
    Doctors.findByIdAndDelete(req.params.id)
      .then((deletedDoctor) => {
        if (!deletedDoctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Delete Doctor successfully!" });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }
}

const doctorController = new DoctorController();
export default doctorController;

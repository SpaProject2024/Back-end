import Appointment from "../models/Appointment.js";

class AppointController {
  // List of Appointments
  getAll(req, res, next) {
    Appointment.find()
      // .populate("services")
      // .populate("doctor")
      // .populate("user")
      .exec()
      .then((appointments) => res.status(200).json({ data: appointments }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Get Appointments Except Cancel
  getExceptCancel(req, res, next) {
    Appointment.find( {status: { $nin: 'Canceled' }} )
      .populate("services")
      .populate("doctor")
      .populate("user")
      .exec()
      .then((appointments) => res.status(200).json({ data: appointments }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Get Appointment
  get(req, res, next) {
    Appointment.findOne({ _id: req.params.id })
      .populate("services")
      .populate("doctor")
      .populate("user")
      .exec()
      .then((appoint) => res.status(200).json({ data: appoint }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Get Appointments by Status
  getByStatus(req, res, next) {
    Appointment.find( {status: { $in: req.params.status }} )
      .populate("services")
      .populate("doctor")
      .populate("user")
      .exec()
      .then((appointments) => res.status(200).json({ data: appointments }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }  

  // Create Appointment
  create(req, res, next) {
    const appoint = new Appointment(req.body);
    appoint
      .save()
      .then((newAppointment) => {
        res.status(201).json({ data: newAppointment });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Update Appointment
  update(req, res, next) {
    Appointment.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.status(200).json({ message: "Update Appointment Succesfully!" }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Update Status
  updateStatus(req, res, next) {
    Appointment.updateOne({ _id: req.params.id }, {status: req.body.status})
      .then(() => res.status(200).json({ message: "Update Status Succesfully!" }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Delete Appointment
  delete(req, res, next) {
    Appointment.deleteOne({ _id: req.params.id })
      .then(() =>
        res.status(200).json({ message: "Delete Appointment Succesfully!" })
      )
      .catch((error) => res.status(500).json({ message: error.message }));
  }
}

const appointController = new AppointController();

export default appointController;

import Appointment from "../models/Appointment.js";

class AppointMiddleware {
  // Bad Request Appointment
  badRequestAppoint(req, res, next) {
    const { appointmentDate, status, user } = req.body;

    let missingFields = [];
    if (!appointmentDate) missingFields.push("appointment date");
    if (!status) missingFields.push("status");
    if (!user) missingFields.push("user");

    if (!appointmentDate || !status || !user) {
      return res.status(400).json({
        message: "Missing required fields: " + missingFields.join(", "),
      });
    }

    next();
  }

  // Bad Request Status
  badRequestStatus(req, res, next) {
    if (!req.body.status) {
      return res.status(400).json({ message: "Status field is required!" });
    }

    next();
  }

  // Not Found Appointment
  notFoundAppoint(req, res, next) {
    Appointment.findOne({ _id: req.params.id }).then((findAppointment) => {
      if (!findAppointment)
        return res.status(404).json({ message: "Appointment not found!" });
      next();
    });
  }

  // Not Found Status
  notFoundStatus(req, res, next) {
    Appointment.findOne({ status: req.params.status }).then((findStatus) => {
      if (!findStatus)
        return res.status(404).json({ message: "Status not found!" });
      next();
    });
  }
}

const appointMiddleware = new AppointMiddleware();

export default appointMiddleware;

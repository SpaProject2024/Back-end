import Doctor from "../models/doctors.js";

class DoctorMiddleware {
  // Kiểm tra xem có thiếu trường bắt buộc nào không
  isBadRequest(req, res, next) {
    const { fullName, experience, numberPhone } = req.body; // Thay đổi từ phoneNumber sang numberPhone

    let missingFields = [];
    if (!fullName) missingFields.push("fullName");
    if (experience === undefined || experience === null) missingFields.push("experience");
    if (!numberPhone) missingFields.push("numberPhone"); // Cập nhật ở đây

    // Kiểm tra nếu có trường nào bị thiếu
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields: " + missingFields.join(", "),
      });
    }

    // Kiểm tra định dạng của experience
    if (typeof experience !== "number" || experience < 0) {
      return res.status(400).json({
        message: "Experience must be a positive number.",
      });
    }

    // Kiểm tra định dạng của numberPhone
    const phoneRegex = /^\d{10}$/; // Giả định rằng số điện thoại phải có 10 chữ số
    if (!phoneRegex.test(numberPhone)) {
      return res.status(400).json({
        message: "Number phone must be a valid 10-digit phone number.",
      });
    }

    next();
  }

  // Kiểm tra xem bác sĩ có tồn tại hay không
  isNotFound(req, res, next) {
    Doctor.findOne({ _id: req.params.id })
      .then((findDoctor) => {
        if (!findDoctor) {
          return res.status(404).json({ message: "Doctor not found!" });
        }
        next();
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }
}

const doctorMiddleware = new DoctorMiddleware();

export default doctorMiddleware;

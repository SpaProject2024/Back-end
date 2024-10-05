import Service from "./../models/Service.js";

class ServiceMiddleware {
  // is Bad Request function
  isBadRequest(req, res, next) {
    const { name, description, price, duration } = req.body;

    // Kiểm tra xem có thiếu trường nào không
    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!price) missingFields.push("price");
    if (!duration) missingFields.push("duration");

    // Kiểm tra xem có thiếu trường nào không
    if (!name || !description || !price || !duration) {
      return res.status(400).json({
        message: "Missing required fields: " + missingFields.join(", "),
      });
    }

    // Nếu tất cả các trường đã đủ, gọi hàm next để chuyển đến controller
    next();
  }

  isNotFound(req, res, next) {
    Service.findOne({ _id: req.params.id }).then((findService) => {
      if (!findService)
        return res.status(404).json({ message: "Service not found!" });
      next();
    });
  }
}

const serviceMiddleware = new ServiceMiddleware();

export default serviceMiddleware;

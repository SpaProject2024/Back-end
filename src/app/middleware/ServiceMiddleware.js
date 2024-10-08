import Service from "../models/Service.js";

class ServiceMiddleware {
  // Bad Request (400)
  isBadRequest(req, res, next) {
    const { name, description, price, duration } = req.body;

    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!price) missingFields.push("price");
    if (!duration) missingFields.push("duration");

    if (!name || !description || !price || !duration) {
      return res.status(400).json({
        message: "Missing required fields: " + missingFields.join(", "),
      });
    }

    next();
  }

  // Not Found (404)
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

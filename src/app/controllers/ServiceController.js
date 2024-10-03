import Service from "./../models/Service.js";

class ServiceController {
  // List of Services
  getAll(req, res, next) {
    Service.find()
      .then((services) => res.status(200).json({ data: services }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Get Service
  get(req, res, next) {
    Service.findOne({ _id: req.params.id })
      .then((service) => res.status(200).json({ data: service }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Create Service
  create(req, res, next) {
    const service = new Service(req.body);
    service
      .save()
      .then((newService) => res.status(201).json({ data: newService }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Update Service
  update(req, res, next) {
    Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .then((updatedService) => res.status(200).json({ data: updatedService }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Delete Service
  delete(req, res, next) {
    Service.deleteOne({ _id: req.params.id })
      .then(() =>
        res.status(200).json({ message: "Delete Service Succesfully!" })
      )
      .catch((error) => res.status(500).json({ message: error.message }));
  }
}

const serviceController = new ServiceController();

export default serviceController;

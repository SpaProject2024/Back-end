import Suppliers from "../models/supplier.js";

class SuppliersController {
    // Get all Suppliers
    getAll(req, res, next) {
        Suppliers.find({})
            .then((suppliers) => res.status(200).json({ data: suppliers }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Get a Supplier by ID
    get(req, res, next) {
        Suppliers.findById(req.params.id)
            .then((supplier) => {
                if (!supplier) {
                    return res.status(404).json({ message: "Supplier not found" });
                }
                res.status(200).json({ data: supplier });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Create a new Supplier
    create(req, res, next) {
        const supplier = new Suppliers(req.body);
        supplier
            .save()
            .then((newSupplier) => res.status(201).json({ data: newSupplier }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Update a Supplier by ID
    update(req, res, next) {
        Suppliers.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedSupplier) => {
                if (!updatedSupplier) {
                    return res.status(404).json({ message: "Supplier not found" });
                }
                res.status(200).json({ data: updatedSupplier });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Delete a Supplier by ID
    delete(req, res, next) {
        Suppliers.findByIdAndDelete(req.params.id)
            .then((deletedSupplier) => {
                if (!deletedSupplier) {
                    return res.status(404).json({ message: "Supplier not found" });
                }
                res.status(200).json({ message: "Supplier deleted successfully!" });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }
}

const suppliersController = new SuppliersController();
export default suppliersController;

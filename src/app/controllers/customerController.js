import Customer from "../models/customers.js";

class CustomerController {
    // Get all customers
    getAll(req, res, next) {
        Customer.find()
            .then((customers) => res.status(200).json({ data: customers }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Get a customer by ID
    get(req, res, next) {
        Customer.findById(req.params.id)
            .then((customer) => {
                if (!customer) {
                    return res.status(404).json({ message: "Customer not found" });
                }
                res.status(200).json({ data: customer });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Create a new customer
    create(req, res, next) {
        const customer = new Customer(req.body);
        customer
            .save()
            .then((newCustomer) => res.status(201).json({ data: newCustomer }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Update a customer by ID
    update(req, res, next) {
        Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedCustomer) => {
                if (!updatedCustomer) {
                    return res.status(404).json({ message: "Customer not found" });
                }
                res.status(200).json({ data: updatedCustomer });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Delete a customer by ID
    delete(req, res, next) {
        Customer.findByIdAndDelete(req.params.id)
            .then((deletedCustomer) => {
                if (!deletedCustomer) {
                    return res.status(404).json({ message: "Customer not found" });
                }
                res.status(200).json({ message: "Delete customer successfully!" });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }
}

const customerController = new CustomerController();
export default customerController;

import suppliers from "../models/supplier.js";

export const createSupplier = async (req, res) => {
    const { address, name, supplyID, numberphone } = req.body;
    if (!address || !name || !supplyID || !numberphone) {
        return res.status(400).json({ message: "All required fileds must be provide" });
    }
    try {
        const newSuppliler = new suppliers({
            address,
            name,
            supplyID,
            numberphone,
        });
        await newSuppliler.save();
        res.status(201).json({ message: "Supplier created successfully", data: newSuppliler });
    } catch (error) {
        res.status(500).json({ message: "Failed to create supplier", error: error.message });
    }
};

export const getSupplier = async (req, res) => {
    try {
        const allSuppliers = await suppliers.find();
        res.status(200).json({ message: "Success", data: allSuppliers });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving supplier", error: error.message });
    }
};

export const getSuppierByID = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await suppliers.findById(id);
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Success", data: supplier });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving supplier", error: message });
    }
};
export const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { supplyID, address, name, numberphone } = req.body;
    try {
        const updateSupplier = await suppliers.findByIdAndUpdate(
            id,
            { supplyID, address, name, numberphone },
            { new: true }
        );
        if (!updateSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Supplier update successfully", data: updateSupplier });
    } catch (error) {
        res.status(500).json({ message: "Error updating supplier", error: error.message });
    }
};

export const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteSupplier = await suppliers.findByIdAndDelete(id);
        if (!deleteSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting supplier", error: error.message })
    }
};
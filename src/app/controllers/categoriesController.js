import categories from "../models/categories.js";

export const createCategories = async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: "All required fileds must be provide" });
    }
    try {
        const newCategories = new categories({
            name,
            description,
        });
        await newCategories.save();
        res.status(201).json({ message: "Categories created successfully", data: newCategories });
    } catch (error) {
        res.status(500).json({ message: "Failed to create categories", error: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const allCategories = await categories.find();
        res.status(200).json({ message: "Success", data: allCategories });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error: error.message });
    }
};

export const getCategoriesByID = async (req, res) => {
    try {
        const { id } = req.params;
        const categorie = await categories.findById(id);
        if (!categorie) {
            return res.status(404).json({ message: "Categories not found" });
        }
        res.status(200).json({ message: "Success", data: categorie });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error: message });
    }
};
export const updateCategories = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updateCategorie = await categories.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!updateCategorie) {
            return res.status(404).json({ message: "Categories not found" });
        }
        res.status(200).json({ message: "Categories update successfully", data: updateCategorie });
    } catch (error) {
        res.status(500).json({ message: "Error updating categories", error: error.message });
    }
};

export const deleteCategories = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategorie = await categories.findByIdAndDelete(id);
        if (!deleteCategorie) {
            return res.status(404).json({ message: "Categories not found" });
        }
        res.status(200).json({ message: "Categories deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting categories", error: error.message })
    }
};
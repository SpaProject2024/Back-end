import Categories from "../models/categories.js";

class CategoriesController {
    // Get all Categories
    getAll(req, res, next) {
        Categories.find({})
            .then((categories) => res.status(200).json({ data: categories }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Get a Category by ID
    get(req, res, next) {
        Categories.findById(req.params.id)
            .then((category) => {
                if (!category) {
                    return res.status(404).json({ message: "Category not found" });
                }
                res.status(200).json({ data: category });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Create a new Category
    create(req, res, next) {
        const category = new Categories(req.body);
        category
            .save()
            .then((newCategory) => res.status(201).json({ data: newCategory }))
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Update a Category by ID
    update(req, res, next) {
        Categories.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedCategory) => {
                if (!updatedCategory) {
                    return res.status(404).json({ message: "Category not found" });
                }
                res.status(200).json({ data: updatedCategory });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }

    // Delete a Category by ID
    delete(req, res, next) {
        Categories.findByIdAndDelete(req.params.id)
            .then((deletedCategory) => {
                if (!deletedCategory) {
                    return res.status(404).json({ message: "Category not found" });
                }
                res.status(200).json({ message: "Category deleted successfully!" });
            })
            .catch((error) => res.status(500).json({ message: error.message }));
    }
}

const categoriesController = new CategoriesController();
export default categoriesController;

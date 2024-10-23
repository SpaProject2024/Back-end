import Product from '../models/product.js';

// Lấy tất cả các sản phẩm
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('categorieID supplyID'); // Populate để lấy chi tiết categories và suppliers
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// Lấy sản phẩm theo id
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('categorieID supplyID'); // Populate nếu cần chi tiết

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

// Thêm sản phẩm mới
export const createProduct = async (req, res) => {
    try {
        const { description, name, price, categorieID, supplyID = null } = req.body; // supplyID mặc định null nếu không có

        const newProduct = new Product({
            description,
            name,
            price,
            categorieID,
            supplyID,
        });

        await newProduct.save();

        return res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

// Cập nhật sản phẩm theo id
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, name, price, categorieID, supplyID = null } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { description, name, price, categorieID, supplyID },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Xóa sản phẩm theo id
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

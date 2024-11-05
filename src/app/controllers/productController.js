import Product from "../models/product.js";

class ProductController {
  // Get all products
  getAll(req, res, next) {
    Product.find()
      .populate("categorieID")
      .populate("supplyID")
      .then((products) => res.status(200).json({ data: products }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Get a product by ID
  get(req, res, next) {
    Product.findById(req.params.id)
      .populate("categorieID")
      .populate("supplyID")
      .then((product) => {
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ data: product });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Create a new product
  create(req, res, next) {
    const product = new Product(req.body);
    product
      .save()
      .then((newProduct) => res.status(201).json({ data: newProduct }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Update a product by ID
  update(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedProduct) => {
        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ data: updatedProduct });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  // Delete a product by ID
  delete(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
      .then((deletedProduct) => {
        if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Delete Product successfully!" });
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }
}

const productController = new ProductController();
export default productController;

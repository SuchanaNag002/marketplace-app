import productService from "../services/productService.js";
import { productValidator, updateProductValidator } from "../validators/productValidator.js";
import cloudinary from "../cloudinary_config/cloudinary.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const productData = { ...req.body, image: req.file ? req.file.originalname : undefined };
    const { error, value } = productValidator.validate(productData, { allowUnknown: true });
    if (error) return res.status(400).json({ error: error.details[0].message });
    const userId = req.user.id;
    let validatedData = { ...value, userId };
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
        stream.end(req.file.buffer);
      });
      validatedData.image = [{ url: uploadResult.secure_url, filename: req.file.originalname }];
    }
    const product = await productService.addProduct(validatedData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message || "Error adding product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let productData = { ...req.body };
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
        stream.end(req.file.buffer);
      });
      productData.image = [{ url: uploadResult.secure_url, filename: req.file.originalname }];
    }
    const { error, value } = updateProductValidator.validate(productData, { allowUnknown: true });
    if (error) return res.status(400).json({ error: error.details[0].message });
    const updatedProduct = await productService.updateProduct(req.params.id, value);
    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

import productService from "../services/productService.js";
import { productValidator, updateProductValidator } from "../validators/productValidator.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsBaseDir = path.join(__dirname, "..");

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
    let productData = req.file ? req.body : req.body;
    const { error, value } = productValidator.validate(productData, { allowUnknown: true });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const userId = req.user.id;
    productData = { ...value, userId };

    if (req.file) {
      productData.image = {
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
      };
    }

    const product = await productService.addProduct(productData, assetsBaseDir);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message || "Error adding product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let productData = { ...req.body };
    if (req.file) {
      productData.image = {
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
      };
    }
    const { error, value } = updateProductValidator.validate(productData, { allowUnknown: true });
    if (error) return res.status(400).json({ error: error.details[0].message });
    const updatedProduct = await productService.updateProduct(req.params.id, value, assetsBaseDir);
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
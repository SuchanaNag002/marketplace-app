import productService from '../services/productService.js';
import productValidator from '../validators/productValidator.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsBaseDir = __dirname;

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    // If req.file exists, it's a FormData request; otherwise, it's JSON
    let productData = req.file ? req.body : req.body;

    // Validate the product data (excluding the image field for FormData)
    const { error, value } = productValidator.validate(productData, { allowUnknown: true });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Get authenticated user's id from req.user (set by authMiddleware)
    const userId = req.user.id;
    productData = { ...value, userId }; // Changed from Owner to userId

    // If an image is uploaded, add it to productData
    if (req.file) {
      productData.image = {
        buffer: req.file.buffer, // File content
        originalname: req.file.originalname, // Original file name with extension
        mimetype: req.file.mimetype, // MIME type for validation
      };
    }

    const product = await productService.addProduct(productData, assetsBaseDir);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error adding product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { error, value } = productValidator.validate(req.body, { allowUnknown: true });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedProduct = await productService.updateProduct(req.params.id, value, assetsBaseDir);
    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
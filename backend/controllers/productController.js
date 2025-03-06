import productService from '../services/productService.js';
import productValidator from '../validators/productValidator.js';

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
    const { error, value } = productValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Get authenticated user's id from req.user (set by authMiddleware)
    const ownerId = req.user.id;
    const productData = { ...value, Owner: [ownerId] };

    const product = await productService.addProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { error, value } = productValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedProduct = await productService.updateProduct(req.params.id, value);
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

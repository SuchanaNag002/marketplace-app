import productService from '../services/productService.js';

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
    const product = await productService.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    res.json({ message: 'Product updated successfully' });
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
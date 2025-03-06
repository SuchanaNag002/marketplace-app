import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
const router = express.Router();

router.get('/', authenticate, getProducts);
router.post('/', authenticate, addProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', authenticate, getProducts);
router.post('/', authenticate, upload.single('image'), addProduct); 
router.put('/:id', authenticate, upload.single('image'), updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
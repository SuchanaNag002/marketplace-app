import express from 'express';
import { getOrdersByUserId, addOrderByProductIdAndUserId, updateOrderByOrderId } from '../controllers/orderController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getOrdersByUserId); 
router.post('/', authenticate, addOrderByProductIdAndUserId);  
router.put('/:id', authenticate, updateOrderByOrderId);  

export default router;

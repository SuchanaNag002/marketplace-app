import express from 'express';
import { getOrders, placeOrder } from '../controllers/orderController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getOrders);
router.post('/', authenticate, placeOrder);

export default router;

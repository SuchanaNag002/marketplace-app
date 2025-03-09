import express from "express";
import {
  getOrdersByUserId,
  addOrderByProductIdAndUserId,
  updateOrderByOrderId,
  deleteOrderByOrderId,
  fetchRequestedOrders, 
} from "../controllers/orderController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getOrdersByUserId);
router.post("/", authenticate, addOrderByProductIdAndUserId);
router.put("/:id", authenticate, updateOrderByOrderId);
router.delete("/:id", authenticate, deleteOrderByOrderId);
router.get("/requested", authenticate, fetchRequestedOrders); 

export default router;
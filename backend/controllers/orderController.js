import orderService from "../services/orderService.js";
import {
  orderValidator,
  updateOrderValidator,
} from "../validators/orderValidator.js";

export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUserId(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const addOrderByProductIdAndUserId = async (req, res) => {
  try {
    const { error, value } = orderValidator.validate(req.body, {});
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const order = await orderService.addOrderByProductIdAndUserId(
      value.productId,
      req.user.id,
      {
        quantity: value.quantity,
        orderDate: value.orderDate,
      }
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message || "Error placing order" });
  }
};

export const updateOrderByOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateOrderValidator.validate(req.body, {});
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedOrder = await orderService.updateOrderByOrderId(id, value);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error updating order" });
  }
};

export const deleteOrderByOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await orderService.deleteOrderByOrderId(id);
    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
};

export const fetchRequestedOrders = async (req, res) => {
  try {
    const orders = await orderService.fetchRequestedOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch requested orders" });
  }
};

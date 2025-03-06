import orderService from '../services/orderService.js';
import orderValidator from '../validators/orderValidator.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const addOrder = async (req, res) => {
  try {
    const { error, value } = orderValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Use authenticated user's id as Buyer
    const buyerId = req.user.id;
    const orderData = {
      Product: [value.productId],
      Buyer: [buyerId],
      OrderStatus: value.orderStatus || 'Pending',
      OrderDate: value.orderDate || new Date().toISOString()
    };
    const order = await orderService.addOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error adding order' });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
    res.json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
};

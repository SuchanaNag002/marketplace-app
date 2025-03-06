import orderService from '../services/orderService.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const order = await orderService.placeOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error placing order' });
  }
};
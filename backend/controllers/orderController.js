import orderService from '../services/orderService.js';
import orderValidator from '../validators/orderValidator.js';

export const getOrders = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const orders = await orderService.getOrders(buyerId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const addOrder = async (req, res) => {
  try {
    const { error, value } = orderValidator.validate(req.body, {});
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
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
    res.status(500).json({ error: 'Error placing order' });
  }
};

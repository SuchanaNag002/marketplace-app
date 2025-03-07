import orderService from '../services/orderService.js';
import orderValidator from '../validators/orderValidator.js';

export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUserId(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
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
        arrivalDate: value.arrivalDate
      }
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error placing order' });
  }
};

export const updateOrderByOrderId = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { error, value } = orderValidator.validate(req.body, {});
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const order = await orderService.updateOrderByOrderId(orderId, value);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
};

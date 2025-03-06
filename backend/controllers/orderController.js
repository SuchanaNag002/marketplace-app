import orderService from '../services/orderService.js';
import orderValidator from '../validators/orderValidator.js';

// Get orders based on query parameter ?type=placed or ?type=received
export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const type = req.query.type || 'placed';
    let orders;
    
    if (type === 'placed') {
      orders = await orderService.getOrdersByBuyer(userId);
    } else if (type === 'received') {
      orders = await orderService.getOrdersBySeller(userId);
    } else {
      return res.status(400).json({ error: 'Invalid order type specified' });
    }
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Place a new order for a product
export const placeOrder = async (req, res) => {
  try {
    const { error, value } = orderValidator.validate(req.body);
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

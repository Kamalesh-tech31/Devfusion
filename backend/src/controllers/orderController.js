const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper to generate orderId
const generateOrderId = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 9000) + 1000}`;

// Create order
exports.createOrder = async (req, res, next) => {
  try {
    const { userId, items } = req.body;
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'userId and items are required' });
    }

    // Validate products and calculate total
    let total = 0;
    const orderItems = [];

    for (const it of items) {
      const { productId, quantity } = it;
      if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ success: false, message: 'Invalid item in order' });
      }
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      if (product.stock < quantity) return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });

      // reduce stock
      product.stock -= quantity;
      await product.save();

      const price = product.price;
      total += price * quantity;
      orderItems.push({ product: product._id, quantity, price });
    }

    const order = new Order({
      orderId: generateOrderId(),
      customerName: userId,
      items: orderItems,
      totalPrice: total,
    });
    await order.save();

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

// Get all orders
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('items.product', 'name price images');

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

// Get order by id
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name price images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

// Update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    // Basic state transition enforcement
    const transitions = {
      pending: ['processing', 'cancelled'],
      processing: ['shipped', 'cancelled'],
      shipped: ['delivered'],
      delivered: [],
      cancelled: [],
    };

    if (!transitions[order.status].includes(status) && order.status !== status) {
      return res.status(400).json({ success: false, message: `Cannot change status from ${order.status} to ${status}` });
    }

    order.status = status;
    if (status === 'shipped') order.shippedAt = new Date();
    if (status === 'delivered') order.deliveredAt = new Date();
    await order.save();

    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

// Delete order (and optionally restock if not delivered)
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    // If order not delivered, return stock
    if (order.status !== 'delivered') {
      for (const it of order.items) {
        await Product.findByIdAndUpdate(it.product, { $inc: { stock: it.quantity } });
      }
    }

    await order.remove();
    res.json({ success: true, message: 'Order deleted' });
  } catch (err) {
    next(err);
  }
};

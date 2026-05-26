const Delivery = require('../models/Delivery');
const DeliveryAgent = require('../models/DeliveryAgent');
const Order = require('../models/Order');

// Create delivery record for an order (unassigned)
exports.createDelivery = async (req, res, next) => {
  try {
    const { orderId } = req.body; // this should be Order._id
    if (!orderId) return res.status(400).json({ success: false, message: 'orderId required' });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    const existing = await Delivery.findOne({ order: order._id });
    if (existing) return res.status(400).json({ success: false, message: 'Delivery already exists for this order' });

    const delivery = new Delivery({ order: order._id, status: 'pending' });
    await delivery.save();
    res.status(201).json({ success: true, data: delivery });
  } catch (err) {
    next(err);
  }
};

// Assign an available delivery agent to a delivery
exports.assignDelivery = async (req, res, next) => {
  try {
    const { deliveryId } = req.params;
    const { agentId } = req.body; // optional explicit agent

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) return res.status(404).json({ success: false, message: 'Delivery not found' });
    if (delivery.agent) return res.status(400).json({ success: false, message: 'Agent already assigned' });

    let agent;
    if (agentId) {
      agent = await DeliveryAgent.findById(agentId);
      if (!agent || !agent.isAvailable) return res.status(400).json({ success: false, message: 'Agent not available' });
    } else {
      agent = await DeliveryAgent.findOne({ isAvailable: true });
      if (!agent) return res.status(400).json({ success: false, message: 'No available agents' });
    }

    delivery.agent = agent._id;
    delivery.status = 'assigned';
    delivery.tracking.push({ status: 'assigned', message: `Assigned to agent ${agent.name}` });
    await delivery.save();

    agent.isAvailable = false;
    await agent.save();

    res.json({ success: true, data: delivery });
  } catch (err) {
    next(err);
  }
};

// Update delivery status and add tracking info
exports.updateDeliveryStatus = async (req, res, next) => {
  try {
    const { deliveryId } = req.params;
    const { status, location, message } = req.body;
    const allowed = ['pending', 'assigned', 'in_transit', 'delivered', 'failed'];
    if (!allowed.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) return res.status(404).json({ success: false, message: 'Delivery not found' });

    delivery.status = status;
    delivery.tracking.push({ status, location, message });
    if (status === 'delivered') {
      // free up agent
      if (delivery.agent) {
        await DeliveryAgent.findByIdAndUpdate(delivery.agent, { isAvailable: true });
      }
    }

    await delivery.save();
    res.json({ success: true, data: delivery });
  } catch (err) {
    next(err);
  }
};

// Get deliveries (optionally by order or agent)
exports.getDeliveries = async (req, res, next) => {
  try {
    const { orderId, agentId } = req.query;
    const filter = {};
    if (orderId) filter.order = orderId;
    if (agentId) filter.agent = agentId;

    const deliveries = await Delivery.find(filter).populate('order').populate('agent');
    res.json({ success: true, count: deliveries.length, data: deliveries });
  } catch (err) {
    next(err);
  }
};

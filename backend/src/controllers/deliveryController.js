const Delivery = require('../models/Delivery');
const LocationUpdate = require('../models/LocationUpdate');
const { VALID_STATUSES, ERROR_MESSAGES } = require('../utils/constants');

// Get all deliveries
const getAllDeliveries = async (req, res, next) => {
  try {
    console.log('API: GET /api/deliveries - fetching all deliveries');
    const deliveries = await Delivery.find().sort({ id: 1 }).lean();
    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

// Get active deliveries (not delivered or returned)
const getActiveDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find({
      status: { $nin: ['Delivered', 'Returned'] },
    })
      .sort({ id: 1 })
      .lean();
    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

// Get history deliveries (delivered or returned)
const getHistoryDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find({
      status: { $in: ['Delivered', 'Returned'] },
    })
      .sort({ id: 1 })
      .lean();
    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

// Get dashboard response
const getDashboard = async (req, res, next) => {
  try {
    console.log('API: GET /api/deliveries/dashboard - generating dashboard');
    const deliveries = await Delivery.find().lean();
    const activeDeliveries = await Delivery.find({
      status: { $nin: ['Delivered', 'Returned'] },
    })
      .sort({ id: 1 })
      .lean();

    const completedDeliveries = deliveries.filter(
      (item) => item.status === 'Delivered'
    ).length;
    const followUps = deliveries.filter(
      (item) => item.status === 'Failed Attempt'
    ).length;
    const avgEta = activeDeliveries[0]?.eta || 'N/A';

    res.json({
      activeDeliveries: activeDeliveries.length,
      completedDeliveries,
      followUps,
      avgEta,
      routeUpdates: activeDeliveries.length,
      activeRoutes: activeDeliveries,
    });
  } catch (error) {
    next(error);
  }
};

// Get earnings response
const getEarnings = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find().lean();
    const deliveredCount = deliveries.filter(
      (item) => item.status === 'Delivered'
    ).length;

    res.json({
      highlights: [
        {
          title: "Today's Earnings",
          value: `₹${(deliveredCount * 450).toLocaleString('en-IN')}`,
          description:
            deliveredCount >= 2
              ? '+12% from yesterday'
              : 'Keep the route pace steady',
        },
        {
          title: 'Weekly Earnings',
          value: `₹${(deliveredCount * 1800).toLocaleString('en-IN')}`,
          description: `${deliveredCount} deliveries completed`,
        },
        {
          title: 'Monthly Earnings',
          value: `₹${(deliveredCount * 6200).toLocaleString('en-IN')}`,
          description:
            deliveredCount === 0
              ? 'No premium routes yet'
              : `${deliveredCount} premium routes`,
        },
      ],
      incentives: [],
    });
  } catch (error) {
    next(error);
  }
};

// Update delivery status
const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!VALID_STATUSES.includes(status)) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.INVALID_STATUS });
    }

    const updated = await Delivery.findOneAndUpdate(
      { id },
      { status, lastUpdated: 'Just now' },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ error: ERROR_MESSAGES.DELIVERY_NOT_FOUND });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Create a new delivery
const createDelivery = async (req, res, next) => {
  try {
    console.log('API: POST /api/deliveries - create delivery');
    const payload = req.body;

    // basic validation
    if (!payload || !payload.id || !payload.customer) {
      return res.status(400).json({ error: 'Missing required delivery fields (id, customer)' });
    }

    const exists = await Delivery.findOne({ id: payload.id });
    if (exists) {
      return res.status(409).json({ error: 'Delivery with this id already exists' });
    }

    const created = await Delivery.create(payload);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

// Full update (replace fields) for a delivery
const updateDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`API: PUT /api/deliveries/${id} - update delivery`);

    const payload = req.body;
    const updated = await Delivery.findOneAndUpdate({ id }, payload, { new: true });
    if (!updated) {
      return res.status(404).json({ error: ERROR_MESSAGES.DELIVERY_NOT_FOUND });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete delivery
const deleteDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`API: DELETE /api/deliveries/${id} - delete delivery`);
    const removed = await Delivery.findOneAndDelete({ id });
    if (!removed) {
      return res.status(404).json({ error: ERROR_MESSAGES.DELIVERY_NOT_FOUND });
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDeliveries,
  getActiveDeliveries,
  getHistoryDeliveries,
  getDashboard,
  getEarnings,
  updateDeliveryStatus,
  createDelivery,
  updateDelivery,
  deleteDelivery,
};

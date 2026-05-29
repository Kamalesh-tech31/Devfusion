const Delivery = require("../models/Delivery");
const DeliveryAgent = require("../models/DeliveryAgent");
const Order = require("../models/Order");
const { VALID_STATUSES, ERROR_MESSAGES } = require("../utils/constants");

const getDeliveryFilter = (req) => {
  if (req.params.deliveryId) return { _id: req.params.deliveryId };
  if (req.params.id) return { id: req.params.id };
  return null;
};

const getAllDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find().sort({ id: 1 }).lean();
    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

const getActiveDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find({
      status: { $nin: ["Delivered", "Returned"] },
    })
      .sort({ id: 1 })
      .lean();
    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

const getHistoryDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find({
      status: { $in: ["Delivered", "Returned"] },
    })
      .sort({ id: 1 })
      .lean();
    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find().lean();
    const activeDeliveries = deliveries.filter(
      (item) => item.status !== "Delivered" && item.status !== "Returned",
    );

    const completedDeliveries = deliveries.filter(
      (item) => item.status === "Delivered",
    ).length;
    const followUps = deliveries.filter(
      (item) => item.status === "Failed Attempt",
    ).length;
    const avgEta = activeDeliveries[0]?.eta || "N/A";

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

const getEarnings = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find().lean();
    const deliveredCount = deliveries.filter(
      (item) => item.status === "Delivered",
    ).length;

    res.json({
      highlights: [
        {
          title: "Today's Earnings",
          value: `₹${(deliveredCount * 450).toLocaleString("en-IN")}`,
          description:
            deliveredCount >= 2
              ? "+12% from yesterday"
              : "Keep the route pace steady",
        },
        {
          title: "Weekly Earnings",
          value: `₹${(deliveredCount * 1800).toLocaleString("en-IN")}`,
          description: `${deliveredCount} deliveries completed`,
        },
        {
          title: "Monthly Earnings",
          value: `₹${(deliveredCount * 6200).toLocaleString("en-IN")}`,
          description:
            deliveredCount === 0
              ? "No premium routes yet"
              : `${deliveredCount} premium routes`,
        },
      ],
      incentives: [],
    });
  } catch (error) {
    next(error);
  }
};

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const status = req.body.status;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_STATUS });
    }

    const filter = getDeliveryFilter(req);
    if (!filter) {
      return res.status(400).json({ error: "Delivery identifier required" });
    }

    const updated = await Delivery.findOneAndUpdate(
      filter,
      { status, lastUpdated: "Just now" },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ error: ERROR_MESSAGES.DELIVERY_NOT_FOUND });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const createDelivery = async (req, res, next) => {
  try {
    const payload = req.body;

    if (payload.orderId) {
      const order = await Order.findById(payload.orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const existing = await Delivery.findOne({ order: order._id });
      if (existing) {
        return res
          .status(400)
          .json({ error: "Delivery already exists for this order" });
      }

      const delivery = new Delivery({ order: order._id, status: "pending" });
      await delivery.save();
      return res.status(201).json(delivery);
    }

    if (!payload || !payload.id || !payload.customer) {
      return res
        .status(400)
        .json({ error: "Missing required delivery fields (id, customer)" });
    }

    const exists = await Delivery.findOne({ id: payload.id });
    if (exists) {
      return res
        .status(409)
        .json({ error: "Delivery with this id already exists" });
    }

    const created = await Delivery.create(payload);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

const updateDelivery = async (req, res, next) => {
  try {
    const filter = getDeliveryFilter(req);
    if (!filter) {
      return res.status(400).json({ error: "Delivery identifier required" });
    }

    const updated = await Delivery.findOneAndUpdate(filter, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: ERROR_MESSAGES.DELIVERY_NOT_FOUND });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteDelivery = async (req, res, next) => {
  try {
    const filter = getDeliveryFilter(req);
    if (!filter) {
      return res.status(400).json({ error: "Delivery identifier required" });
    }

    const removed = await Delivery.findOneAndDelete(filter);
    if (!removed) {
      return res.status(404).json({ error: ERROR_MESSAGES.DELIVERY_NOT_FOUND });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const assignDelivery = async (req, res, next) => {
  try {
    const { deliveryId } = req.params;
    const { agentId } = req.body;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res
        .status(404)
        .json({ success: false, message: "Delivery not found" });
    }
    if (delivery.agent) {
      return res
        .status(400)
        .json({ success: false, message: "Agent already assigned" });
    }

    let agent;
    if (agentId) {
      agent = await DeliveryAgent.findById(agentId);
      if (!agent || !agent.isAvailable) {
        return res
          .status(400)
          .json({ success: false, message: "Agent not available" });
      }
    } else {
      agent = await DeliveryAgent.findOne({ isAvailable: true });
      if (!agent) {
        return res
          .status(400)
          .json({ success: false, message: "No available agents" });
      }
    }

    delivery.agent = agent._id;
    delivery.status = "assigned";
    delivery.tracking.push({
      status: "assigned",
      message: `Assigned to agent ${agent.name}`,
    });
    await delivery.save();

    agent.isAvailable = false;
    await agent.save();

    res.json({ success: true, data: delivery });
  } catch (err) {
    next(err);
  }
};

const getDeliveries = async (req, res, next) => {
  try {
    const { orderId, agentId } = req.query;
    const filter = {};
    if (orderId) filter.order = orderId;
    if (agentId) filter.agent = agentId;

    const deliveries = await Delivery.find(filter)
      .populate("order")
      .populate("agent");
    res.json({ success: true, count: deliveries.length, data: deliveries });
  } catch (err) {
    next(err);
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
  assignDelivery,
  getDeliveries,
};

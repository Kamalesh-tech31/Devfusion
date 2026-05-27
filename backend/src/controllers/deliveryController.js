const Delivery = require("../models/Delivery");
const DeliveryAgent = require("../models/DeliveryAgent");
const Order = require("../models/Order");
const LocationUpdate = require("../models/LocationUpdate");
const { VALID_STATUSES, ERROR_MESSAGES } = require("../utils/constants");

// Get all deliveries
const getAllDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find()
      .populate("order")
      .populate("agent")
      .sort({ createdAt: -1 });

    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

// Get active deliveries
const getActiveDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find({
      status: {
        $nin: ["Delivered", "Returned"],
      },
    })
      .populate("order")
      .populate("agent")
      .sort({ createdAt: -1 });

    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

// Get history deliveries
const getHistoryDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find({
      status: {
        $in: ["Delivered", "Returned"],
      },
    })
      .populate("order")
      .populate("agent")
      .sort({ createdAt: -1 });

    res.json(deliveries);
  } catch (error) {
    next(error);
  }
};

// Dashboard
const getDashboard = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();

    const activeDeliveries = deliveries.filter(
      (d) => d.status !== "Delivered" && d.status !== "Returned",
    );

    const completedDeliveries = deliveries.filter(
      (d) => d.status === "Delivered",
    ).length;

    const followUps = deliveries.filter(
      (d) => d.status === "Failed Attempt",
    ).length;

    res.json({
      activeDeliveries: activeDeliveries.length,
      completedDeliveries,
      followUps,
      avgEta: activeDeliveries[0]?.eta || "N/A",
      routeUpdates: activeDeliveries.length,
      activeRoutes: activeDeliveries,
    });
  } catch (error) {
    next(error);
  }
};

// Earnings
const getEarnings = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();

    const deliveredCount = deliveries.filter(
      (d) => d.status === "Delivered",
    ).length;

    res.json({
      highlights: [
        {
          title: "Today's Earnings",
          value: `₹${(deliveredCount * 450).toLocaleString("en-IN")}`,
          description: "+12% from yesterday",
        },
        {
          title: "Weekly Earnings",
          value: `₹${(deliveredCount * 1800).toLocaleString("en-IN")}`,
          description: `${deliveredCount} deliveries completed`,
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};

// Create delivery
const createDelivery = async (req, res, next) => {
  try {
    const payload = req.body;

    if (!payload.id || !payload.customer) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existing = await Delivery.findOne({
      id: payload.id,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Delivery already exists",
      });
    }

    const delivery = await Delivery.create(payload);

    res.status(201).json({
      success: true,
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};

// Assign delivery agent
const assignDelivery = async (req, res, next) => {
  try {
    const { deliveryId } = req.params;
    const { agentId } = req.body;

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found",
      });
    }

    let agent;

    if (agentId) {
      agent = await DeliveryAgent.findById(agentId);
    } else {
      agent = await DeliveryAgent.findOne({
        isAvailable: true,
      });
    }

    if (!agent) {
      return res.status(400).json({
        success: false,
        message: "No available agent",
      });
    }

    delivery.agent = agent._id;
    delivery.status = "Assigned";

    delivery.tracking.push({
      status: "Assigned",
      message: `Assigned to ${agent.name}`,
    });

    await delivery.save();

    agent.isAvailable = false;
    await agent.save();

    res.json({
      success: true,
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};

// Update delivery status
const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { deliveryId } = req.params;
    const { status, location, message } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: ERROR_MESSAGES.INVALID_STATUS,
      });
    }

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return res.status(404).json({
        error: ERROR_MESSAGES.DELIVERY_NOT_FOUND,
      });
    }

    delivery.status = status;
    delivery.lastUpdated = "Just now";

    delivery.tracking.push({
      status,
      location,
      message,
    });

    if (status === "Delivered" && delivery.agent) {
      await DeliveryAgent.findByIdAndUpdate(delivery.agent, {
        isAvailable: true,
      });
    }

    await delivery.save();

    res.json({
      success: true,
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};

// Update delivery
const updateDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updated = await Delivery.findOneAndUpdate({ id }, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        error: ERROR_MESSAGES.DELIVERY_NOT_FOUND,
      });
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

    const removed = await Delivery.findOneAndDelete({ id });

    if (!removed) {
      return res.status(404).json({
        error: ERROR_MESSAGES.DELIVERY_NOT_FOUND,
      });
    }

    res.json({
      success: true,
    });
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
  createDelivery,
  assignDelivery,
  updateDeliveryStatus,
  updateDelivery,
  deleteDelivery,
};

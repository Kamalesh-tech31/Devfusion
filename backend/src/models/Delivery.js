const mongoose = require("mongoose");

const TrackingSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const DeliverySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customer: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    eta: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "Out for Delivery",
        "Delivered",
        "Failed Attempt",
        "Returned",
      ],
      default: "Pending",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    lastUpdated: {
      type: String,
      default: "Just now",
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryAgent",
    },

    tracking: {
      type: [TrackingSchema],
      default: [],
    },

    estimatedDelivery: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Delivery", DeliverySchema);

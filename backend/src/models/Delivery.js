const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
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
      required: true,
      enum: [
        "Pending",
        "Out for Delivery",
        "Delivered",
        "Failed Attempt",
        "Returned",
      ],
      default: "Pending",
    },
    priority: {
      type: String,
      required: true,
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
  },
  { timestamps: true },
);

module.exports = mongoose.model("Delivery", deliverySchema, "delivery");

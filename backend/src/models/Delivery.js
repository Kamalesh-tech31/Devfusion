const mongoose = require('mongoose');

const TrackingSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    location: { type: String },
    message: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const DeliverySchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryAgent' },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'in_transit', 'delivered', 'failed'],
      default: 'pending',
    },
    tracking: { type: [TrackingSchema], default: [] },
    estimatedDelivery: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Delivery', DeliverySchema);

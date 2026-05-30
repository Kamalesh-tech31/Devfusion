const mongoose = require("mongoose")
const OrderTracking = require("../models/OrderTracking")
const CustomerOrder = require("../models/CustomerOrder")

const resolveOrderObjectId = async (orderIdParam) => {
  if (mongoose.Types.ObjectId.isValid(orderIdParam)) {
    const order = await CustomerOrder.findById(orderIdParam)
    if (order) {
      return order._id
    }
  }

  const order = await CustomerOrder.findOne({ orderId: orderIdParam })
  return order ? order._id : null
}

exports.getAllTrackings = async (req, res) => {
  try {
    const trackings = await OrderTracking.find().populate("order")
    res.status(200).json(trackings)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tracking records", error: error.message })
  }
}

exports.getTrackingByOrderId = async (req, res) => {
  try {
    const orderObjectId = await resolveOrderObjectId(req.params.orderId)
    if (!orderObjectId) {
      return res.status(404).json({ message: "Order not found" })
    }

    const tracking = await OrderTracking.findOne({ order: orderObjectId }).populate("order")
    if (!tracking) {
      return res.status(404).json({ message: "Tracking record not found" })
    }

    res.status(200).json(tracking)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tracking record", error: error.message })
  }
}

exports.createTracking = async (req, res) => {
  try {
    const { order, steps } = req.body
    const newTracking = new OrderTracking({ order, steps })
    const savedTracking = await newTracking.save()
    res.status(201).json(savedTracking)
  } catch (error) {
    res.status(500).json({ message: "Failed to create tracking record", error: error.message })
  }
}

exports.updateTracking = async (req, res) => {
  try {
    const updatedTracking = await OrderTracking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedTracking) {
      return res.status(404).json({ message: "Tracking record not found" })
    }

    res.status(200).json(updatedTracking)
  } catch (error) {
    res.status(500).json({ message: "Failed to update tracking record", error: error.message })
  }
}

exports.deleteTracking = async (req, res) => {
  try {
    const deletedTracking = await OrderTracking.findByIdAndDelete(req.params.id)
    if (!deletedTracking) {
      return res.status(404).json({ message: "Tracking record not found" })
    }
    res.status(200).json({ message: "Tracking record deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tracking record", error: error.message })
  }
}

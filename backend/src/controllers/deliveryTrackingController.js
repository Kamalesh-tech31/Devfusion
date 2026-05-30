const mongoose = require("mongoose")
const DeliveryTracking = require("../models/DeliveryTracking")
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

exports.getAllDeliveryTracks = async (req, res) => {
  try {
    const deliveries = await DeliveryTracking.find().populate("order")
    res.status(200).json(deliveries)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch delivery records", error: error.message })
  }
}

exports.getDeliveryByOrderId = async (req, res) => {
  try {
    const orderObjectId = await resolveOrderObjectId(req.params.orderId)
    if (!orderObjectId) {
      return res.status(404).json({ message: "Order not found" })
    }

    const delivery = await DeliveryTracking.findOne({ order: orderObjectId }).populate("order")
    if (!delivery) {
      return res.status(404).json({ message: "Delivery record not found" })
    }
    res.status(200).json(delivery)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch delivery record", error: error.message })
  }
}

exports.createDeliveryTrack = async (req, res) => {
  try {
    const { order, origin, destination, currentPosition, waypoints, status, estimatedDelivery } = req.body
    const newDeliveryTrack = new DeliveryTracking({
      order,
      origin,
      destination,
      currentPosition,
      waypoints,
      status,
      estimatedDelivery,
    })
    const savedDeliveryTrack = await newDeliveryTrack.save()
    res.status(201).json(savedDeliveryTrack)
  } catch (error) {
    res.status(500).json({ message: "Failed to create delivery record", error: error.message })
  }
}

exports.updateDeliveryTrack = async (req, res) => {
  try {
    const updatedDelivery = await DeliveryTracking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedDelivery) {
      return res.status(404).json({ message: "Delivery record not found" })
    }

    res.status(200).json(updatedDelivery)
  } catch (error) {
    res.status(500).json({ message: "Failed to update delivery record", error: error.message })
  }
}

exports.deleteDeliveryTrack = async (req, res) => {
  try {
    const deletedDelivery = await DeliveryTracking.findByIdAndDelete(req.params.id)
    if (!deletedDelivery) {
      return res.status(404).json({ message: "Delivery record not found" })
    }
    res.status(200).json({ message: "Delivery record deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete delivery record", error: error.message })
  }
}

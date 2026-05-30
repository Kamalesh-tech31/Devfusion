const CustomerOrder = require("../models/CustomerOrder")

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find().sort({ createdAt: -1 })
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message })
  }
}

exports.getOrderById = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id).populate("items.product")
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message })
  }
}

exports.createOrder = async (req, res) => {
  try {
    const { orderId, customerName, status, amount, date, items, shippingAddress } = req.body

    const newOrder = new CustomerOrder({
      orderId,
      customerName,
      status,
      amount,
      date,
      items,
      shippingAddress,
    })

    const savedOrder = await newOrder.save()
    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message })
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await CustomerOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message })
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await CustomerOrder.findByIdAndDelete(req.params.id)
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.status(200).json({ message: "Order deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error: error.message })
  }
}

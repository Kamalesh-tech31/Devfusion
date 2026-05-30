const CustomerAnalytics = require("../models/CustomerAnalytics")

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await CustomerAnalytics.find().sort({ createdAt: -1 })
    res.status(200).json(analytics)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analytics", error: error.message })
  }
}

exports.getAnalyticsById = async (req, res) => {
  try {
    const analytics = await CustomerAnalytics.findById(req.params.id)
    if (!analytics) {
      return res.status(404).json({ message: "Analytics record not found" })
    }
    res.status(200).json(analytics)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analytics record", error: error.message })
  }
}

exports.createAnalytics = async (req, res) => {
  try {
    const analytics = new CustomerAnalytics(req.body)
    const savedAnalytics = await analytics.save()
    res.status(201).json(savedAnalytics)
  } catch (error) {
    res.status(500).json({ message: "Failed to create analytics record", error: error.message })
  }
}

exports.updateAnalytics = async (req, res) => {
  try {
    const updatedAnalytics = await CustomerAnalytics.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedAnalytics) {
      return res.status(404).json({ message: "Analytics record not found" })
    }
    res.status(200).json(updatedAnalytics)
  } catch (error) {
    res.status(500).json({ message: "Failed to update analytics record", error: error.message })
  }
}

exports.deleteAnalytics = async (req, res) => {
  try {
    const deletedAnalytics = await CustomerAnalytics.findByIdAndDelete(req.params.id)
    if (!deletedAnalytics) {
      return res.status(404).json({ message: "Analytics record not found" })
    }
    res.status(200).json({ message: "Analytics record deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete analytics record", error: error.message })
  }
}

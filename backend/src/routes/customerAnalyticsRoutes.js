const express = require("express")
const router = express.Router()
const {
  getAnalytics,
  getAnalyticsById,
  createAnalytics,
  updateAnalytics,
  deleteAnalytics,
} = require("../controllers/customerAnalyticsController")

router.get("/", getAnalytics)
router.get("/:id", getAnalyticsById)
router.post("/", createAnalytics)
router.put("/:id", updateAnalytics)
router.delete("/:id", deleteAnalytics)

module.exports = router

const express = require("express")
const router = express.Router()
const {
  getDashboardStats,
  getDashboardStatsById,
  createDashboardStats,
  updateDashboardStats,
  deleteDashboardStats,
} = require("../controllers/dashboardStatsController")

router.get("/", getDashboardStats)
router.get("/:id", getDashboardStatsById)
router.post("/", createDashboardStats)
router.put("/:id", updateDashboardStats)
router.delete("/:id", deleteDashboardStats)

module.exports = router

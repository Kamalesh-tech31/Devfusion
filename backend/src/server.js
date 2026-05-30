const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

// Middleware imports
const corsConfig = require("./middleware/corsConfig")
const errorHandler = require("./middleware/errorHandler")
const requestLogger = require("./middleware/requestLogger")
const authenticateToken = require("./middleware/authenticateToken")

// Route imports
const customerProductRoutes = require("./routes/customerProductRoutes")
const customerOrderRoutes = require("./routes/customerOrderRoutes")
const orderTrackingRoutes = require("./routes/orderTrackingRoutes")
const deliveryTrackingRoutes = require("./routes/deliveryTrackingRoutes")
const customerAnalyticsRoutes = require("./routes/customerAnalyticsRoutes")
const dashboardStatsRoutes = require("./routes/dashboardStatsRoutes")

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Connect to MongoDB
connectDB()

// Global Middleware
app.use(corsConfig)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

// API Routes
app.use("/api/products", customerProductRoutes)
app.use("/api/orders", customerOrderRoutes)
app.use("/api/tracking", orderTrackingRoutes)
app.use("/api/delivery", deliveryTrackingRoutes)
app.use("/api/analytics", customerAnalyticsRoutes)
app.use("/api/stats", dashboardStatsRoutes)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running", timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Error handling middleware (must be last)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app

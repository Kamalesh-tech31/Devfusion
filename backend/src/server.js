require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");

const errorHandler = require("./middleware/errorHandler");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locations");

const app = express();

const PORT = Number(process.env.PORT || 4000);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health routes
app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    database: "MongoDB",
    uptime: process.uptime(),
  });
});

app.get("/", (req, res) => {
  res.send("Devfusion Backend Running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/location-updates", locationRoutes);

// Error handler middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Devfusion backend listening on port ${PORT}`);

      console.log(`Frontend URL: ${FRONTEND_URL}`);

      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);

    process.exit(1);
  }
};

startServer();

module.exports = app;

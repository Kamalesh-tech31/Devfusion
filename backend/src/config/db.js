const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/devfusion";

const connectDB = async () => {
  try {
    // Use unified topology and new URL parser by default in modern mongoose
    await mongoose.connect(MONGO_URI, {
      autoIndex: true,
    });
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Exit process if cannot connect — in production you might retry
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };

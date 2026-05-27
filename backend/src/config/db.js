const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/devfusion";

    console.log("Connecting to MongoDB...");

    await mongoose.connect(mongoURI, {
      autoIndex: true,
    });

    console.log("MongoDB connected successfully");

    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    process.exit(1);
  }
};

module.exports = {
  connectDB,
  mongoose,
};

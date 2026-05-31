const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  "https://devfusion-8d3h.vercel.app",
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS policy: origin not allowed"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);

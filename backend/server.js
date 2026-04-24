require("dns").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS Configuration for Development & Production
const allowedOrigins = [
  // Production URLs
  "https://notivo-adminlog.vercel.app",
  process.env.CLIENT_URL,
  // Development URLs
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow no origin (like mobile apps or Postman)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Check if origin is in whitelist
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    // Allow all Vercel preview deployments (*.vercel.app)
    if (origin.endsWith(".vercel.app")) {
      callback(null, true);
      return;
    }

    // Allow localhost for development
    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
      callback(null, true);
      return;
    }

    // Block everything else
    console.error(`CORS blocked request from: ${origin}`);
    callback(new Error("CORS policy: Origin not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.use("/api/auth", require("./routes/authroutes"));

app.get("/", (req, res) => res.send("Admin API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
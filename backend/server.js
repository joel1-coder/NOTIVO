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

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    const isAllowed = 
      allowedOrigins.includes(origin) || 
      origin.endsWith(".vercel.app") || 
      origin.includes("localhost") || 
      origin.includes("127.0.0.1");

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`CORS blocked request from: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Handle all preflight OPTIONS requests globally
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", require("./routes/authroutes"));

app.get("/", (req, res) => res.send("Admin API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
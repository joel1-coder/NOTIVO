const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();

const mongoose = require("mongoose");
const Admin = require("./models/Admin");

const ADMIN_EMAIL = "admin@notivo.com";
const ADMIN_PASSWORD = "Admin@1234";
const ADMIN_NAME = "Super Admin";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existing = await Admin.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      console.log("Admin already exists:", ADMIN_EMAIL);
      process.exit(0);
    }

    const admin = new Admin({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
      isVerified: true,
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    console.log("   Email   :", ADMIN_EMAIL);
    console.log("   Password:", ADMIN_PASSWORD);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();

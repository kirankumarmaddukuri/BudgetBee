const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const db = process.env.MONGO_URL;
    const { connection } = await mongoose.connect(db);
    console.log(`MongoDB Connected to ${connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };

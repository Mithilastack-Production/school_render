const mongoose = require("mongoose");

async function DbConnect() {
  try {
    const DB_URL = process.env.DB_URL_ATLAS;
    
    await mongoose.connect(DB_URL);
    console.log("Database Connected on", DB_URL);
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}

module.exports = DbConnect;

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Sensor = require("./Sensor");

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/trafficDB";

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB for seeding");

    const filePath = path.join(__dirname, "sensors.json");
    console.log("📂 Reading file:", filePath);

    const rawData = fs.readFileSync(filePath, "utf-8");
    const sensors = JSON.parse(rawData);

    await Sensor.deleteMany({});
    console.log("🗑️ Old sensors removed");

    await Sensor.insertMany(sensors);
    console.log(`✅ Inserted ${sensors.length} sensors`);

    await mongoose.disconnect();
    console.log("✅ Seed complete");
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
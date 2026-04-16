const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Sensor = require("./Sensor");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/trafficDB";

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log("📦 Mongo URL:", MONGO_URL);
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/api/sensors", async (req, res) => {
  try {
    const sensors = await Sensor.find();
    console.log(`📍 Sensors found: ${sensors.length}`);
    res.json(sensors);
  } catch (error) {
    console.error("❌ Error in /api/sensors:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sensors/:sensorId", async (req, res) => {
  try {
    const sensorId = Number(req.params.sensorId);
    const sensor = await Sensor.findOne({ sensor_id: sensorId });

    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }

    res.json(sensor);
  } catch (error) {
    console.error("❌ Error in /api/sensors/:sensorId:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
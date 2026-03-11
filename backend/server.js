const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Sensor = require("./Sensor");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/trafficDB")
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Health route
app.get("/api/health", (req, res) => {
  res.json({ message: "API is working" });
});

// Get all sensors
app.get("/api/sensors", async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.json(sensors);
  } catch (error) {
    console.error("Error in /api/sensors:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get one sensor by sensor_id
app.get("/api/sensors/:sensorId", async (req, res) => {
  try {
    const sensorId = Number(req.params.sensorId);
    const sensor = await Sensor.findOne({ sensor_id: sensorId });

    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }

    res.json(sensor);
  } catch (error) {
    console.error("Error in /api/sensors/:sensorId:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
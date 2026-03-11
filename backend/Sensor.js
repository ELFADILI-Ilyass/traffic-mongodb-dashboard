const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    sensor_id: Number,
    latitude: Number,
    longitude: Number,
    lanes: Number,
    name: String,
    freeway: Number,
    city_code: Number
  },
  {
    collection: "sensors"
  }
);

module.exports = mongoose.model("Sensor", sensorSchema);
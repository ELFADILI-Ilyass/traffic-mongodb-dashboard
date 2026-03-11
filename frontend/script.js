const map = L.map("map").setView([37.45, -122.15], 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

let markerMap = {};

// Load all sensors
fetch("http://localhost:5000/api/sensors")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch sensors");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("totalSensors").textContent = data.length;

    data.forEach((sensor) => {
      if (
        typeof sensor.latitude === "number" &&
        typeof sensor.longitude === "number"
      ) {
        const marker = L.circleMarker([sensor.latitude, sensor.longitude], {
          radius: 5,
          color: "#1d4ed8",
          fillColor: "#3b82f6",
          fillOpacity: 0.7,
          weight: 1
        }).addTo(map);

        marker.bindPopup(`
          <b>Sensor ID:</b> ${sensor.sensor_id}<br>
          <b>Freeway:</b> ${sensor.freeway}<br>
          <b>Lanes:</b> ${sensor.lanes}<br>
          <b>Name:</b> ${sensor.name}<br>
          <b>City Code:</b> ${sensor.city_code}<br>
          <b>Latitude:</b> ${sensor.latitude}<br>
          <b>Longitude:</b> ${sensor.longitude}
        `);

        markerMap[sensor.sensor_id] = { marker, sensor };
      }
    });
  })
  .catch((error) => {
    console.error("Error loading sensors:", error);
    document.getElementById("resultBox").innerHTML =
      "<span style='color:red;'>Failed to load data from backend.</span>";
  });

// Search one sensor by ID
document.getElementById("searchBtn").addEventListener("click", async () => {
  const sensorId = document.getElementById("sensorSearch").value.trim();
  const resultBox = document.getElementById("resultBox");

  if (!sensorId) {
    resultBox.innerHTML =
      "<span style='color:red;'>Please enter a sensor ID.</span>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/sensors/${sensorId}`);

    if (!res.ok) {
      resultBox.innerHTML =
        `<span style="color:red;">Sensor ${sensorId} not found.</span>`;
      return;
    }

    const sensor = await res.json();

    resultBox.innerHTML = `
      <b>Sensor ID:</b> ${sensor.sensor_id}<br>
      <b>Freeway:</b> ${sensor.freeway}<br>
      <b>Lanes:</b> ${sensor.lanes}<br>
      <b>Name:</b> ${sensor.name}<br>
      <b>City Code:</b> ${sensor.city_code}<br>
      <b>Latitude:</b> ${sensor.latitude}<br>
      <b>Longitude:</b> ${sensor.longitude}
    `;

    if (markerMap[sensor.sensor_id]) {
      const { marker } = markerMap[sensor.sensor_id];
      map.setView([sensor.latitude, sensor.longitude], 13);
      marker.openPopup();
    }
  } catch (error) {
    console.error("Search error:", error);
    resultBox.innerHTML =
      "<span style='color:red;'>Error while searching sensor.</span>";
  }
});
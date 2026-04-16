# Traffic Sensors Dashboard (PeMS-Bay)

Interactive dashboard for visualizing traffic sensors from the PeMS-Bay dataset using MongoDB, Node.js, and Leaflet.

## 📌 Overview

This project is part of a complementary TP focused on:

- Storing sensor metadata in MongoDB
- Exposing data via a Node.js / Express API
- Visualizing sensors on an interactive map using Leaflet
- Searching sensors by Sensor ID
- Deploying the system using Docker and Docker Compose

The dataset contains **325 traffic sensors** with geographic coordinates and metadata.

---

## 🧱 Architecture

The application is composed of two main services:

- **MongoDB container** → stores sensor data  
- **Backend (Node.js / Express)** → exposes REST API  

The frontend (Leaflet) consumes the API to display sensors on a map.

---

## 🚀 Running the project (Docker)

```bash
docker compose up --build -d

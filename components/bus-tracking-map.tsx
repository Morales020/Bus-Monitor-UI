"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix default marker icon issue in Leaflet with Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function BusTrackingMap() {
  // Optionally, you can fetch route/bus data here and render markers/polylines

  // Prevent map rendering issues on SSR
  useEffect(() => {
    // This is just to ensure leaflet CSS is loaded
  }, []);

  return (
    <div className="w-full h-[350px] rounded-lg overflow-hidden">
      <MapContainer
        center={[40.7128, -74.006]} // Example: New York City
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[40.7128, -74.006]} icon={icon}>
          <Popup>
            Bus Location (Demo)
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

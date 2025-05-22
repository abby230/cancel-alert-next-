// src/components/MapWidget.tsx
"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ★ 여기에만 타입 단언 한 곳만 남깁니다.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapWidgetProps {
  properties: { title: string; lat: number; lng: number }[];
}

export default function MapWidget({ properties }: MapWidgetProps) {
  const center: [number, number] = properties.length
    ? [properties[0].lat, properties[0].lng]
    : [0, 0];

  return (
    <div className="h-64 w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
      <MapContainer center={center} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>{p.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

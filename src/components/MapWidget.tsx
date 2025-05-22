// src/components/MapWidget.tsx
"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet 기본 아이콘 설정 보정
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapWidgetProps {
  properties: { title: string; lat: number; lng: number }[];
}

export default function MapWidget({ properties }: MapWidgetProps) {
  // 첫 번째 마커를 중심으로
  const center: [number, number] = properties.length
    ? [properties[0].lat, properties[0].lng]
    : [0, 0];

  return (
    <div className="h-64 w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
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

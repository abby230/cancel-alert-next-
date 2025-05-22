// src/app/page.tsx
"use client";

import React, { useState } from "react";
import HeroSearch from "../components/HeroSearch";
import FilterSidebar from "../components/FilterSidebar";
import PropertyCard from "../components/PropertyCard";
import MapWidget from "../components/MapWidget";

export default function HomePage() {
  const allProperties = [
    { title: "Cozy Inn",    location: "New York",    lat: 40.7128, lng: -74.0060, imageUrl: "https://picsum.photos/id/1011/400/300" },
    { title: "Beachfront Hotel", location: "Miami Beach", lat: 25.7907, lng: -80.1300, imageUrl: "https://picsum.photos/id/1015/400/300" },
    { title: "Mountain Retreat", location: "Aspen",       lat: 39.1911, lng: -106.8175, imageUrl: "https://picsum.photos/id/1003/400/300" },
  ];

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn]       = useState("");
  const [checkOut, setCheckOut]     = useState("");
  const [priceRange, setPriceRange] = useState<number>(250);
  const [types, setTypes]           = useState<string[]>([]);
  const [results, setResults]       = useState(allProperties);

  const handleSearch = () => {
    let filtered = allProperties;
    if (destination.trim()) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(destination.trim().toLowerCase())
      );
    }
    setResults(filtered);
  };

  return (
    <>
      <HeroSearch
        destination={destination}
        onDestChange={setDestination}
        checkIn={checkIn}
        onCheckInChange={setCheckIn}
        checkOut={checkOut}
        onCheckOutChange={setCheckOut}
        onSearch={handleSearch}
      />

      <div className="flex flex-col md:flex-row">
        <FilterSidebar
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          selectedTypes={types}
          onTypeChange={setTypes}
        />

        <div className="flex-1 md:ml-8">
          {/* 지도 위젯 */}
          <MapWidget properties={results.map(p => ({
            title: p.title,
            location: p.location,
            lat: (p as any).lat,
            lng: (p as any).lng,
          }))} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((p, i) => (
              <PropertyCard
                key={i}
                title={p.title}
                location={p.location}
                imageUrl={p.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

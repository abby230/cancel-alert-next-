// src/app/page.tsx
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import HeroSearch from "../components/HeroSearch";
import FilterSidebar from "../components/FilterSidebar";
import PropertyCard from "../components/PropertyCard";

// MapWidget을 SSR 없이 동적 로드
const MapWidget = dynamic(() => import("../components/MapWidget"), { ssr: false });

interface Property {
  title: string;
  location: string;
  imageUrl: string;
  lat: number;
  lng: number;
}

export default function HomePage() {
  const allProperties: Property[] = [
    {
      title: "Cozy Inn",
      location: "New York",
      lat: 40.7128,
      lng: -74.0060,
      imageUrl: "https://picsum.photos/id/1011/400/300",
    },
    {
      title: "Beachfront Hotel",
      location: "Miami Beach",
      lat: 25.7907,
      lng: -80.1300,
      imageUrl: "https://picsum.photos/id/1015/400/300",
    },
    {
      title: "Mountain Retreat",
      location: "Aspen",
      lat: 39.1911,
      lng: -106.8175,
      imageUrl: "https://picsum.photos/id/1003/400/300",
    },
  ];

  // HeroSearch 상태
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");

  // FilterSidebar 상태
  const [priceRange, setPriceRange] = useState<number>(250);
  const [types, setTypes] = useState<string[]>([]);

  // 검색 결과 상태
  const [results, setResults] = useState<Property[]>(allProperties);

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
          {/* 지도 (SSR 꺼진 동적 컴포넌트) */}
          <MapWidget properties={results} />

          {/* 결과 카드 그리드 */}
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

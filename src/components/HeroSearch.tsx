// src/components/HeroSearch.tsx
"use client";

import React from "react";

interface HeroSearchProps {
  destination: string;
  onDestChange: (v: string) => void;
  checkIn: string;
  onCheckInChange: (v: string) => void;
  checkOut: string;
  onCheckOutChange: (v: string) => void;
  onSearch: () => void;
}

export default function HeroSearch({
  destination,
  onDestChange,
  checkIn,
  onCheckInChange,
  checkOut,
  onCheckOutChange,
  onSearch,
}: HeroSearchProps) {
  return (
    <section className="mb-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Find cancellation alerts
      </h1>
      <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => onDestChange(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          type="date"
          value={checkIn}
          onChange={(e) => onCheckInChange(e.target.value)}
          className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => onCheckOutChange(e.target.value)}
          className="p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          onClick={onSearch}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Search
        </button>
      </div>
    </section>
  );
}

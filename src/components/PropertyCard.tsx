// src/components/PropertyCard.tsx
import React from "react";

interface PropertyCardProps {
  title: string;
  location: string;
  imageUrl: string;
}

export default function PropertyCard({
  title,
  location,
  imageUrl,
}: PropertyCardProps) {
  return (
    <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-lg flex flex-col">
      <img
        src={imageUrl}
        alt={title}
        className="h-40 w-full object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{location}</p>
      <button className="mt-auto bg-red-400 text-white py-2 rounded-lg hover:bg-red-500">
        Cancellation Alert
      </button>
    </div>
  );
}

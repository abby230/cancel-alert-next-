// src/components/FilterSidebar.tsx
import React from "react";

interface FilterSidebarProps {
  priceRange: number;
  onPriceChange: (val: number) => void;
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
}

const ALL_TYPES = ["Hotel", "Apartment", "Resort"];

export default function FilterSidebar({
  priceRange,
  onPriceChange,
  selectedTypes,
  onTypeChange,
}: FilterSidebarProps) {
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  return (
    <aside className="w-full md:w-1/4 mb-8 md:mb-0">
      <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Price range: {priceRange}
          </label>
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Property type
          </label>
          <div className="space-y-2">
            {ALL_TYPES.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="form-checkbox h-4 w-4 text-teal-600"
                />
                <span className="ml-2">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

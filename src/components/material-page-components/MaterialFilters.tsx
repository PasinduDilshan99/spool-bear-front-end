// components/materials/MaterialFilters.tsx
"use client";
import React from "react";
import { Material } from "@/types/material-types";
import { FilterState } from "@/pages/MaterialsPage";

interface MaterialFiltersProps {
  filterOptions: {
    strengths: string[];
    flexibilities: string[];
    materialTypes: string[];
  };
  filters: FilterState;
  materials: Material[];
  onFilterChange: (
    type: keyof Pick<
      FilterState,
      "strengths" | "flexibilities" | "materialTypes"
    >,
    value: string,
  ) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onClearFilters: () => void;
}

export const MaterialFilters: React.FC<MaterialFiltersProps> = ({
  filterOptions,
  filters,
  materials,
  onFilterChange,
  onPriceRangeChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-[#FF5000] hover:text-[#ff6b2c]"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Strength Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Strength
          </label>
          <div className="space-y-2">
            {filterOptions.strengths.map((strength) => (
              <label key={strength} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.strengths.includes(strength)}
                  onChange={() => onFilterChange("strengths", strength)}
                  className="rounded text-[#FF5000] focus:ring-[#FF5000]"
                />
                <span className="text-sm text-gray-600">{strength}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Flexibility Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Flexibility
          </label>
          <div className="space-y-2">
            {filterOptions.flexibilities.map((flexibility) => (
              <label key={flexibility} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.flexibilities.includes(flexibility)}
                  onChange={() => onFilterChange("flexibilities", flexibility)}
                  className="rounded text-[#FF5000] focus:ring-[#FF5000]"
                />
                <span className="text-sm text-gray-600">{flexibility}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Material Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Material Type
          </label>
          <div className="space-y-2">
            {filterOptions.materialTypes.map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.materialTypes.includes(type)}
                  onChange={() => onFilterChange("materialTypes", type)}
                  className="rounded text-[#FF5000] focus:ring-[#FF5000]"
                />
                <span className="text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (per gram)
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min={Math.min(...materials.map((m) => m.pricePerGram))}
              max={Math.max(...materials.map((m) => m.pricePerGram))}
              step={0.001}
              value={filters.priceRange[1]}
              onChange={(e) =>
                onPriceRangeChange([
                  filters.priceRange[0],
                  parseFloat(e.target.value),
                ])
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0].toFixed(3)}</span>
              <span>${filters.priceRange[1].toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

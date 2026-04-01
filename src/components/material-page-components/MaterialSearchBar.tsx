// components/materials/MaterialSearchBar.tsx
"use client";
import { SortByType, ViewModeType } from "@/pages/MaterialsPage";
import React from "react";

interface MaterialSearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortBy: SortByType;
  onSortChange: (value: SortByType) => void;
  viewMode: ViewModeType;
  onViewModeChange: (mode: ViewModeType) => void;
}

export const MaterialSearchBar: React.FC<MaterialSearchBarProps> = ({
  searchValue,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search materials by name, type, or description..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5000] focus:border-transparent transition-all"
        />
        <svg
          className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex gap-3">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortByType)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5000]"
        >
          <option value="popularity">Most Popular</option>
          <option value="name">Name A-Z</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>

        <div className="flex bg-white border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-[#FF5000] text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "list"
                ? "bg-[#FF5000] text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

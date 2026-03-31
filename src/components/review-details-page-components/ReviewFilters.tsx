// components/reviews/ReviewFilters.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

interface ReviewFiltersProps {
  activeFilter: "all" | "recent" | "top-rated";
  orderTypeFilter: "all" | "PRODUCT" | "PRINTING";
  onFilterChange: (filter: "all" | "recent" | "top-rated") => void;
  onOrderTypeChange: (type: "all" | "PRODUCT" | "PRINTING") => void;
  totalReviews: number;
  filteredCount: number;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  activeFilter,
  orderTypeFilter,
  onFilterChange,
  onOrderTypeChange,
  totalReviews,
  filteredCount,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            activeFilter === "all"
              ? "bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:border-[#FF5000] hover:shadow-sm"
          }`}
        >
          All Reviews
        </button>
        <button
          onClick={() => onFilterChange("recent")}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            activeFilter === "recent"
              ? "bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:border-[#FF5000] hover:shadow-sm"
          }`}
        >
          Recent (30d)
        </button>
        <button
          onClick={() => onFilterChange("top-rated")}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            activeFilter === "top-rated"
              ? "bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:border-[#FF5000] hover:shadow-sm"
          }`}
        >
          Top Rated ⭐
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => onOrderTypeChange("all")}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
            orderTypeFilter === "all"
              ? "text-[#FF5000]"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          All Types
          {orderTypeFilter === "all" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5000]"
            />
          )}
        </button>
        <button
          onClick={() => onOrderTypeChange("PRODUCT")}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 relative ${
            orderTypeFilter === "PRODUCT"
              ? "text-[#FF5000]"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <span>📦</span>
          Products
          {orderTypeFilter === "PRODUCT" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5000]"
            />
          )}
        </button>
        <button
          onClick={() => onOrderTypeChange("PRINTING")}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 relative ${
            orderTypeFilter === "PRINTING"
              ? "text-[#FF5000]"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <span>🖨️</span>
          3D Printing
          {orderTypeFilter === "PRINTING" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5000]"
            />
          )}
        </button>
      </div>

      <div className="text-sm text-gray-500">
        Showing {filteredCount} of {totalReviews} reviews
      </div>
    </div>
  );
};
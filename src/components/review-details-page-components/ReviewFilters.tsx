// components/review-details-page-components/ReviewFilters.tsx
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
          className={`group relative overflow-hidden inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 ${
            activeFilter === "all"
              ? "text-white"
              : "text-[#101113] bg-white border border-black/18"
          }`}
          style={{
            fontSize: "clamp(11px, 1.1vw, 14px)",
            padding: "clamp(10px, 1.2vw, 12px) clamp(18px, 2vw, 24px)",
            borderRadius: "clamp(10px, 1.2vw, 14px)",
            background:
              activeFilter === "all"
                ? "linear-gradient(145deg, #FF5000 0%, #e34800 100%)"
                : "rgba(255,255,255,0.55)",
            boxShadow:
              activeFilter === "all"
                ? "0 6px 24px rgba(255,80,0,0.36)"
                : "none",
          }}
        >
          {activeFilter === "all" && (
            <span
              className="absolute top-0 bottom-0 w-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                animation: "reviewShimmer 2.5s 1s ease-in-out infinite",
                left: "-100%",
              }}
            />
          )}
          <span className="relative z-10">All Reviews</span>
        </button>

        <button
          onClick={() => onFilterChange("recent")}
          className={`group relative overflow-hidden inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 ${
            activeFilter === "recent"
              ? "text-white"
              : "text-[#101113] bg-white border border-black/18"
          }`}
          style={{
            fontSize: "clamp(11px, 1.1vw, 14px)",
            padding: "clamp(10px, 1.2vw, 12px) clamp(18px, 2vw, 24px)",
            borderRadius: "clamp(10px, 1.2vw, 14px)",
            background:
              activeFilter === "recent"
                ? "linear-gradient(145deg, #FF5000 0%, #e34800 100%)"
                : "rgba(255,255,255,0.55)",
            boxShadow:
              activeFilter === "recent"
                ? "0 6px 24px rgba(255,80,0,0.36)"
                : "none",
          }}
        >
          {activeFilter === "recent" && (
            <span
              className="absolute top-0 bottom-0 w-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                animation: "reviewShimmer 2.5s 1s ease-in-out infinite",
                left: "-100%",
              }}
            />
          )}
          <span className="relative z-10">Recent (30d)</span>
        </button>

        <button
          onClick={() => onFilterChange("top-rated")}
          className={`group relative overflow-hidden inline-flex items-center justify-center gap-2 font-black uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 ${
            activeFilter === "top-rated"
              ? "text-white"
              : "text-[#101113] bg-white border border-black/18"
          }`}
          style={{
            fontSize: "clamp(11px, 1.1vw, 14px)",
            padding: "clamp(10px, 1.2vw, 12px) clamp(18px, 2vw, 24px)",
            borderRadius: "clamp(10px, 1.2vw, 14px)",
            background:
              activeFilter === "top-rated"
                ? "linear-gradient(145deg, #FF5000 0%, #e34800 100%)"
                : "rgba(255,255,255,0.55)",
            boxShadow:
              activeFilter === "top-rated"
                ? "0 6px 24px rgba(255,80,0,0.36)"
                : "none",
          }}
        >
          {activeFilter === "top-rated" && (
            <span
              className="absolute top-0 bottom-0 w-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                animation: "reviewShimmer 2.5s 1s ease-in-out infinite",
                left: "-100%",
              }}
            />
          )}
          <span className="relative z-10">Top Rated ⭐</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 pb-2">
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
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3 }}
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
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3 }}
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
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3 }}
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

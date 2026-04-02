"use client";
import React from "react";
import { Grid3x3, List } from "lucide-react";
import { ProductToolbarProps } from "@/types/product-types";

export const ProductToolbar: React.FC<ProductToolbarProps> = ({
  totalProducts,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-5 py-3 mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3 sm:gap-4">
        <p className="text-sm text-gray-500 font-medium">
          <span className="font-black text-[#101113]">{totalProducts}</span>{" "}
          product{totalProducts !== 1 ? "s" : ""} found
        </p>

        <div className="flex items-center gap-1 pl-3 sm:pl-4 border-l border-gray-200">
          {(["grid", "list"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
              style={{
                background:
                  viewMode === mode ? "rgba(255,80,0,0.10)" : "transparent",
                color: viewMode === mode ? "#FF5000" : "#9ca3af",
              }}
              title={mode === "grid" ? "Grid view" : "List view"}
            >
              {mode === "grid" ? <Grid3x3 size={16} /> : <List size={16} />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 hidden sm:block">
          Sort
        </span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none cursor-pointer pl-3 pr-8 py-2 text-sm font-medium text-[#101113] bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#FF5000] focus:ring-2 focus:ring-[#FF5000]/10 transition-all duration-200"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
          <svg
            className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 4l4 4 4-4"
              stroke="#9ca3af"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

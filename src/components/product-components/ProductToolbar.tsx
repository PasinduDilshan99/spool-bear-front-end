// components/products/ProductToolbar.tsx
"use client";

import React from "react";
import { Grid3x3, List } from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface ProductToolbarProps {
  totalProducts: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const ProductToolbar: React.FC<ProductToolbarProps> = ({
  totalProducts,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-6 border flex flex-wrap items-center justify-between gap-4"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      <div className="flex items-center gap-4">
        <span
          className="text-sm"
          style={{ color: spoolbearTheme.colors.muted }}
        >
          <span
            className="font-semibold"
            style={{ color: spoolbearTheme.colors.text }}
          >
            {totalProducts}
          </span>{" "}
          products found
        </span>

        <div
          className="flex items-center gap-1 border-l pl-4"
          style={{ borderColor: `${spoolbearTheme.colors.muted}30` }}
        >
          <button
            onClick={() => onViewModeChange("grid")}
            className={`cursor-pointer p-2 rounded-lg transition-colors ${
              viewMode === "grid" ? "bg-[#ff5000]/10" : ""
            }`}
            style={{
              color:
                viewMode === "grid"
                  ? spoolbearTheme.colors.accent
                  : spoolbearTheme.colors.muted,
            }}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`cursor-pointer p-2 rounded-lg transition-colors ${
              viewMode === "list" ? "bg-[#ff5000]/10" : ""
            }`}
            style={{
              color:
                viewMode === "list"
                  ? spoolbearTheme.colors.accent
                  : spoolbearTheme.colors.muted,
            }}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="text-sm"
          style={{ color: spoolbearTheme.colors.muted }}
        >
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="cursor-pointer px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5000] focus:border-transparent bg-white min-w-[160px]"
          style={{
            borderColor: `${spoolbearTheme.colors.muted}30`,
            color: spoolbearTheme.colors.text,
          }}
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
};

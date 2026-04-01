// components/products/EmptyState.tsx
"use client";

import React from "react";
import { Package } from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      <Package
        className="w-16 h-16 mx-auto mb-4"
        style={{ color: spoolbearTheme.colors.muted }}
      />
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: spoolbearTheme.colors.text }}
      >
        No products found
      </h3>
      <p className="mb-6" style={{ color: spoolbearTheme.colors.muted }}>
        Try adjusting your filters or search criteria
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-3 text-white rounded-lg transition-colors"
        style={{ backgroundColor: spoolbearTheme.colors.accent }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#e64800")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = spoolbearTheme.colors.accent)
        }
      >
        Clear Filters
      </button>
    </div>
  );
};

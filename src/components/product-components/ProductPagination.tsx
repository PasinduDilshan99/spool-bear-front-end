"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { spoolbearTheme } from "@/theme/spoolbear-theme";
import { ProductPaginationProps } from "@/types/product-types";

export const ProductPagination: React.FC<ProductPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff5000]/10 transition-colors"
        style={{
          borderColor: `${spoolbearTheme.colors.muted}30`,
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum;
        if (totalPages <= 5) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }

        return (
          <button
            key={i}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded-lg transition-colors ${
              currentPage === pageNum ? "text-white" : "hover:bg-[#ff5000]/10"
            }`}
            style={{
              backgroundColor:
                currentPage === pageNum
                  ? spoolbearTheme.colors.accent
                  : "transparent",
              color:
                currentPage === pageNum ? "white" : spoolbearTheme.colors.text,
            }}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff5000]/10 transition-colors"
        style={{
          borderColor: `${spoolbearTheme.colors.muted}30`,
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

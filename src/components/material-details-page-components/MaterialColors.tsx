// components/material-details/MaterialColors.tsx
"use client";
import React from "react";
import { MaterialColor } from "@/types/material-types";

interface MaterialColorsProps {
  colors: MaterialColor[];
  selectedColor: string | null;
  onColorSelect: (colorName: string) => void;
}

export const MaterialColors: React.FC<MaterialColorsProps> = ({
  colors,
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        Available Colors
      </h2>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.colorName}
            onClick={() => onColorSelect(color.colorName)}
            className="group relative"
          >
            <div
              className={`w-12 h-12 rounded-full border-2 transition-all ${
                selectedColor === color.colorName
                  ? "border-[#FF5000] ring-2 ring-[#FF5000]/20 scale-110"
                  : "border-gray-300 hover:scale-105"
              }`}
              style={{ backgroundColor: color.hexCode }}
            />
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {color.colorName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// components/products/ColorSelectionModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { X, Palette, Loader2 } from "lucide-react";
import { Product } from "@/types/product-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface ColorSelectionModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (color: string, colorCode: string) => void;
  isLoading: boolean;
}

const parseColor = (colorStr: string): { name: string; code: string } => {
  if (colorStr.includes("|")) {
    const [name, code] = colorStr.split("|");
    return { name: name.trim(), code: code.trim() };
  }
  const defaultCodes: { [key: string]: string } = {
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#00FF00",
    Black: "#000000",
    White: "#FFFFFF",
    Yellow: "#FFFF00",
    Purple: "#800080",
    Orange: "#FFA500",
    Pink: "#FFC0CB",
    Gray: "#808080",
    Brown: "#A52A2A",
  };
  return { name: colorStr, code: defaultCodes[colorStr] || "#000000" };
};

export const ColorSelectionModal: React.FC<ColorSelectionModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] || "Default",
  );
  const [selectedColorCode, setSelectedColorCode] = useState<string>("#000000");

  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      const firstColor = parseColor(product.colors[0]);
      setSelectedColor(firstColor.name);
      setSelectedColorCode(firstColor.code);
    }
  }, [product]);

  if (!isOpen) return null;

  const handleColorSelect = (colorStr: string) => {
    const { name, code } = parseColor(colorStr);
    setSelectedColor(name);
    setSelectedColorCode(code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-6 border-b"
          style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette
                className="w-6 h-6"
                style={{ color: spoolbearTheme.colors.accent }}
              />
              <h3
                className="text-xl font-bold"
                style={{ color: spoolbearTheme.colors.text }}
              >
                Select Color
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X
                className="w-5 h-5"
                style={{ color: spoolbearTheme.colors.muted }}
              />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div
            className="flex gap-4 mb-6 pb-4 border-b"
            style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={product.images?.[0]?.imageUrl || PLACE_HOLDER_IMAGE}
                alt={product.productName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACE_HOLDER_IMAGE;
                }}
              />
            </div>
            <div>
              <h4
                className="font-semibold mb-1"
                style={{ color: spoolbearTheme.colors.text }}
              >
                {product.productName}
              </h4>
              <p
                className="text-sm"
                style={{ color: spoolbearTheme.colors.muted }}
              >
                {product.categoryName}
              </p>
              <p
                className="text-lg font-bold mt-1"
                style={{ color: spoolbearTheme.colors.accent }}
              >
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-3"
              style={{ color: spoolbearTheme.colors.text }}
            >
              Choose Color
            </label>
            <div className="flex flex-wrap gap-3">
              {product.colors?.map((colorStr, index) => {
                const { name, code } = parseColor(colorStr);
                const isSelected = selectedColor === name;
                return (
                  <button
                    key={index}
                    onClick={() => handleColorSelect(colorStr)}
                    className="relative group"
                  >
                    <div
                      className={`w-12 h-12 rounded-full transition-all duration-200 ${
                        isSelected ? "ring-2 ring-offset-2" : "hover:scale-110"
                      }`}
                      style={{
                        backgroundColor: code,
                        ringColor: spoolbearTheme.colors.accent,
                        boxShadow: isSelected
                          ? `0 0 0 2px white, 0 0 0 4px ${spoolbearTheme.colors.accent}`
                          : "none",
                      }}
                    />
                    <span
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: spoolbearTheme.colors.muted }}
                    >
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="p-3 rounded-lg mb-6"
            style={{
              backgroundColor: `${spoolbearTheme.colors.accent}10`,
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedColorCode }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: spoolbearTheme.colors.text }}
              >
                Selected: {selectedColor}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors border"
              style={{
                borderColor: `${spoolbearTheme.colors.muted}30`,
                color: spoolbearTheme.colors.text,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(selectedColor, selectedColorCode)}
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: spoolbearTheme.colors.accent }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#e64800";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor =
                    spoolbearTheme.colors.accent;
                }
              }}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

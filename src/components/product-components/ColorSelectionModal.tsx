// components/product-components/ColorSelectionModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Palette, Loader2, ShoppingCart, CheckCircle } from "lucide-react";
import { Product } from "@/types/product-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";

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
  const defaults: Record<string, string> = {
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#00FF00",
    Black: "#000000",
    White: "#F5F5F5",
    Yellow: "#FFFF00",
    Purple: "#800080",
    Orange: "#FFA500",
    Pink: "#FFC0CB",
    Gray: "#808080",
    Brown: "#A52A2A",
  };
  return { name: colorStr, code: defaults[colorStr] || "#888888" };
};

const isLight = (hex: string): boolean => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
};

export const ColorSelectionModal: React.FC<ColorSelectionModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCode, setSelectedCode] = useState("#888888");
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (product.colors?.length) {
      const first = parseColor(product.colors[0]);
      setSelectedColor(first.name);
      setSelectedCode(first.code);
    }
  }, [product]);

  if (!isOpen) return null;

  const primaryImg =
    product.images?.find((i) => i.isPrimary)?.imageUrl ||
    product.images?.[0]?.imageUrl ||
    PLACE_HOLDER_IMAGE;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ animation: "modalBackdropIn 0.2s ease-out both" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet / Modal */}
      <div
        className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
        style={{
          animation: "modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Orange top bar */}
        <div className="h-1 bg-[#FF5000]" />

        {/* Handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
              <Palette size={16} className="text-[#FF5000]" />
            </div>
            <h3 className="font-black text-[#101113] text-base">
              Select Color
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-150"
          >
            <X size={18} />
          </button>
        </div>

        {/* Product summary */}
        <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
            <Image
              src={imgError ? PLACE_HOLDER_IMAGE : primaryImg}
              alt={product.productName}
              fill
              className="object-cover"
              sizes="56px"
              onError={() => setImgError(true)}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-black text-[#101113] text-sm truncate">
              {product.productName}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {product.categoryName}
            </p>
            <p className="font-black text-[#FF5000] text-base mt-0.5">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </p>
          </div>
        </div>

        {/* Color picker */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">
              Choose Color
            </p>
            {/* Selected preview */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100">
              <div
                className="w-3.5 h-3.5 rounded-full border border-black/10"
                style={{ background: selectedCode }}
              />
              <span className="text-xs font-bold text-[#101113]">
                {selectedColor}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {product.colors?.map((colorStr, i) => {
              const { name, code } = parseColor(colorStr);
              const isSelected = selectedColor === name;
              const light = isLight(code);

              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedColor(name);
                    setSelectedCode(code);
                  }}
                  className="group relative flex flex-col items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div
                    className="rounded-full transition-all duration-200 flex items-center justify-center"
                    style={{
                      width: "clamp(36px, 5vw, 44px)",
                      height: "clamp(36px, 5vw, 44px)",
                      background: code,
                      border: isSelected
                        ? "none"
                        : "2px solid rgba(0,0,0,0.10)",
                      boxShadow: isSelected
                        ? `0 0 0 2px white, 0 0 0 4px #FF5000, 0 4px 12px rgba(255,80,0,0.3)`
                        : "0 2px 6px rgba(0,0,0,0.10)",
                    }}
                  >
                    {isSelected && (
                      <CheckCircle
                        size={16}
                        className="transition-transform duration-200"
                        style={{ color: light ? "#101113" : "#fff" }}
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-medium text-gray-500 max-w-[48px] truncate text-center">
                    {name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 font-bold text-[#101113] border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(selectedColor, selectedCode)}
              disabled={isLoading || !selectedColor}
              className="flex-1 flex items-center justify-center gap-2 py-3 font-bold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 text-sm"
              style={{
                background: "linear-gradient(145deg, #FF5000, #e34800)",
                boxShadow: "0 4px 16px rgba(255,80,0,0.32)",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Adding…
                </>
              ) : (
                <>
                  <ShoppingCart size={15} /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalBackdropIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// components/product/ColorSelectionModal.tsx
import { useState } from "react";
import { X } from "lucide-react";

interface ColorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  colors: string[]; // Now expecting string array
  productName: string;
  productPrice: number;
  productId: number;
  onConfirm: (selectedColor: string) => void; // Returns string instead of Color object
}

// Helper function to get a consistent color code for each color name
const getColorCode = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#eab308",
    purple: "#a855f7",
    pink: "#ec489a",
    orange: "#f97316",
    black: "#000000",
    white: "#ffffff",
    gray: "#6b7280",
    brown: "#92400e",
    cyan: "#06b6d4",
    indigo: "#6366f1",
    lime: "#84cc16",
    rose: "#f43f5e",
    sky: "#0ea5e9",
    slate: "#64748b",
    teal: "#14b8a6",
    violet: "#8b5cf6",
    amber: "#f59e0b",
    emerald: "#10b981",
    fuchsia: "#d946ef",
  };

  return colorMap[colorName.toLowerCase()] || "#cbd5e1";
};

export function ColorSelectionModal({
  isOpen,
  onClose,
  colors,
  productName,
  productPrice,
  productId,
  onConfirm,
}: ColorSelectionModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-[#101113]">Select Color</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-semibold text-[#2b2e33] mb-3">{productName}</h4>
            <p className="text-2xl font-bold text-[#FF5000]">
              ${productPrice.toFixed(2)}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2b2e33] mb-3">
              Choose a color:
            </label>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? "border-[#FF5000] scale-110"
                      : "border-gray-200 hover:scale-105"
                  }`}
                  style={{ backgroundColor: getColorCode(color) }}
                  title={color}
                >
                  {selectedColor === color && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF5000] rounded-full border-2 border-white" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Selected: {selectedColor}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-semibold text-[#2b2e33] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(selectedColor);
                onClose();
              }}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#FF5000] to-[#e34800] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

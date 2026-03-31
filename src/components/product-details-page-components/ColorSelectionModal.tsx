// components/product/ColorSelectionModal.tsx
import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";

interface ColorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  colors: string[];
  productName: string;
  productPrice: number;
  productId: number;
  stockQuantity: number; // Add stock quantity prop
  onConfirm: (selectedColor: string, quantity: number) => void;
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
  stockQuantity,
  onConfirm,
}: ColorSelectionModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen) return null;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedColor, quantity);
    onClose();
  };

  const totalPrice = productPrice * quantity;

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
          <h3 className="text-xl font-bold text-[#101113]">Select Options</h3>
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
            <h4 className="font-semibold text-[#2b2e33] mb-2">{productName}</h4>
            <p className="text-sm text-gray-500 mb-2">
              {stockQuantity} units available
            </p>
            <p className="text-2xl font-bold text-[#FF5000]">
              ${productPrice.toFixed(2)}
              <span className="text-sm font-normal text-gray-500 ml-1">
                per item
              </span>
            </p>
          </div>

          {/* Color Selection */}
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

          {/* Quantity Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2b2e33] mb-3">
              Quantity:
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-10 text-red-700 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    handleQuantityChange(val);
                  }
                }}
                min={1}
                max={stockQuantity}
                className="w-20 h-10 text-center text-black border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF5000] focus:ring-1 focus:ring-[#FF5000]"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= stockQuantity}
                className="w-10 text-green-700 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={16} />
              </button>
              <span className="text-sm text-gray-500 ml-2">
                max {stockQuantity}
              </span>
            </div>
          </div>

          {/* Total Price */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#2b2e33]">Total:</span>
              <span className="text-2xl font-bold text-[#FF5000]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
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
              onClick={handleConfirm}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#FF5000] to-[#e34800] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Add {quantity > 1 ? `${quantity} items` : "to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
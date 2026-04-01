// components/product-details-page-components/ColorSelectionModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingCart, Palette } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

interface ColorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  colors: string[];
  productName: string;
  productPrice: number;
  productId: number;
  stockQuantity: number;
  onConfirm: (selectedColor: string, quantity: number) => void;
}

const getColorCode = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#eab308",
    purple: "#a855f7",
    pink: "#ec4899",
    orange: "#f97316",
    black: "#1a1a1a",
    white: "#f5f5f5",
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
  const { formatPrice, currentCurrency } = useCurrency();
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (val: number) => {
    if (val >= 1 && val <= stockQuantity) setQuantity(val);
  };

  const handleConfirm = () => {
    onConfirm(selectedColor, quantity);
    onClose();
  };

  const totalPrice = productPrice * quantity;
  const showOriginalPrice = currentCurrency.code !== "LKR";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(15,10,8,0.65)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-md rounded-3xl bg-white overflow-hidden"
            style={{
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent */}
            <div
              className="h-1"
              style={{
                background:
                  "linear-gradient(90deg,#FF5000,#FF8C42,transparent)",
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0EBE5]">
              <div>
                <h3
                  className="text-[17px] font-black text-[#1C1714]"
                  style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                >
                  Select Options
                </h3>
                <p className="text-[11px] text-[#B8ADA4] font-semibold mt-0.5 line-clamp-1">
                  {productName}
                </p>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ backgroundColor: "#F5F0EA" }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-2xl flex items-center justify-center transition-colors duration-150"
              >
                <X size={17} className="text-[#6B5F56]" strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-6">
              {/* Price display */}
              <div
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg,#FDF8F5,#F7F5F2)",
                  border: "1px solid #EAE4DC",
                }}
              >
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#B8ADA4]">
                    Unit Price
                  </div>
                  <div
                    className="text-[22px] font-black text-[#FF5000] leading-none mt-1"
                    style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                  >
                    {formatPrice(productPrice)}
                  </div>
                  {showOriginalPrice && (
                    <div className="text-[10px] text-[#B8ADA4] font-semibold mt-0.5">
                      LKR {productPrice.toFixed(2)}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#B8ADA4]">
                    Stock
                  </div>
                  <div className="text-[15px] font-black text-[#10b981] mt-1">
                    {stockQuantity} available
                  </div>
                </div>
              </div>

              {/* Color selection */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Palette
                    size={12}
                    strokeWidth={2.5}
                    className="text-[#B8ADA4]"
                  />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B8ADA4]">
                    Color —{" "}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={selectedColor}
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 3 }}
                        transition={{ duration: 0.15 }}
                        className="text-[#FF5000]"
                      >
                        {selectedColor}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 p-3.5 rounded-2xl bg-[#F7F5F2] border border-[#EAE4DC]">
                  {colors.map((color, i) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.88 }}
                      title={color}
                      className="relative"
                    >
                      <div
                        className="w-9 h-9 rounded-2xl transition-all duration-200"
                        style={{
                          backgroundColor: getColorCode(color),
                          border:
                            selectedColor === color
                              ? "3px solid #FF5000"
                              : "2.5px solid rgba(255,255,255,0.9)",
                          boxShadow:
                            selectedColor === color
                              ? "0 0 0 2px rgba(255,80,0,0.25), 0 4px 10px rgba(0,0,0,0.15)"
                              : "0 2px 8px rgba(0,0,0,0.12)",
                        }}
                      />
                      {selectedColor === color && (
                        <motion.div
                          layoutId="modal-color-ring"
                          className="absolute -inset-1 rounded-2xl pointer-events-none"
                          style={{ border: "2px solid rgba(255,80,0,0.25)" }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B8ADA4] mb-3">
                  Quantity
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: "#F7F5F2",
                      border: "1px solid #EAE4DC",
                      color: "#6B5F56",
                    }}
                  >
                    <Minus size={14} strokeWidth={2.5} />
                  </motion.button>

                  <div
                    className="flex-1 h-11 rounded-2xl flex items-center justify-center font-black text-[18px] text-[#1C1714]"
                    style={{
                      fontFamily: "'Fraunces','Georgia',serif",
                      background: "#F7F5F2",
                      border: "1px solid #EAE4DC",
                    }}
                  >
                    {quantity}
                  </div>

                  <motion.button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= stockQuantity}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: "#F7F5F2",
                      border: "1px solid #EAE4DC",
                      color: "#6B5F56",
                    }}
                  >
                    <Plus size={14} strokeWidth={2.5} />
                  </motion.button>

                  <span className="text-[11px] text-[#B8ADA4] font-semibold whitespace-nowrap">
                    max {stockQuantity}
                  </span>
                </div>
              </div>

              {/* Total */}
              <motion.div
                layout
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg,#FF5000,#FF7A40)",
                }}
              >
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/70">
                    Total
                  </div>
                  {quantity > 1 && (
                    <div className="text-[10px] text-white/60 font-semibold mt-0.5">
                      {quantity} × {formatPrice(productPrice)}
                    </div>
                  )}
                </div>
                <motion.div
                  key={quantity}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22 }}
                  className="text-[26px] font-black text-white leading-none"
                  style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                >
                  {formatPrice(totalPrice)}
                </motion.div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <motion.button
                onClick={onClose}
                whileHover={{ backgroundColor: "#EAE4DC" }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3.5 rounded-2xl text-[13px] font-bold text-[#6B5F56] transition-colors duration-150"
                style={{ background: "#F5F0EA", border: "1px solid #EAE4DC" }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleConfirm}
                whileHover={{
                  y: -2,
                  boxShadow: "0 12px 32px rgba(255,80,0,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[13px] font-black text-white"
                style={{
                  background: "linear-gradient(145deg,#FF5000,#e34800)",
                  boxShadow: "0 6px 20px rgba(255,80,0,0.28)",
                }}
              >
                <ShoppingCart size={14} strokeWidth={2.5} />
                Add {quantity > 1 ? `${quantity} Items` : "to Cart"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// components/product-details-page-components/ProductActions.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { WishListService } from "@/service/wishListService";
import { ColorSelectionModal } from "./ColorSelectionModal";
import { useCart } from "@/context/CartContext";

interface ProductActionsProps {
  inStock: boolean;
  isWished: boolean;
  onWishlistToggle: () => void;
  productId: number;
  productName: string;
  productPrice: number;
  stockQuantity: number;
  colors: string[];
  material?: string;
  materialId?: number;
  type?: string;
  typeId?: number;
  colorCode?: string;
}

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

export function ProductActions({
  inStock,
  isWished,
  onWishlistToggle,
  productId,
  productName,
  productPrice,
  stockQuantity,
  colors,
  material,
  materialId,
  type,
  typeId,
  colorCode,
}: ProductActionsProps) {
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);

  const { addToCart } = useCart();
  const wishListService = new WishListService();

  const handleWishlistClick = async () => {
    if (isWishlistLoading) return;
    setIsWishlistLoading(true);
    try {
      await wishListService.addWishList({ productId });
      onWishlistToggle();
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!inStock || isCartLoading) return;
    if (colors?.length > 0) {
      setShowColorModal(true);
    } else {
      addToCartWithColor(undefined, 1);
    }
  };

  const addToCartWithColor = async (selectedColor?: string, quantity = 1) => {
    setIsCartLoading(true);
    try {
      await addToCart({
        productId,
        name: productName,
        quantity,
        price: productPrice,
        color: selectedColor || colors?.[0] || "Default",
        colorCode:
          colorCode || getColorCode(selectedColor || colors?.[0] || "Default"),
        material: material || "",
        materialId: materialId || 0,
        type: type || "",
        typeId: typeId || 0,
      });
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2200);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsCartLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Add to Cart */}
        <motion.button
          disabled={!inStock || isCartLoading}
          onClick={handleAddToCart}
          whileHover={
            inStock
              ? { y: -2, boxShadow: "0 12px 32px rgba(255,80,0,0.38)" }
              : {}
          }
          whileTap={inStock ? { scale: 0.97 } : {}}
          className="group relative overflow-hidden flex-1 flex items-center justify-center gap-2.5 font-black uppercase tracking-[0.08em] text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            fontSize: "clamp(11px, 1.1vw, 13px)",
            padding: "clamp(15px, 1.7vw, 19px)",
            background: cartAdded
              ? "linear-gradient(145deg,#10b981,#059669)"
              : inStock
                ? "linear-gradient(145deg,#FF5000,#e34800)"
                : "#ccc",
            borderRadius: "clamp(14px, 1.5vw, 18px)",
            boxShadow:
              inStock && !cartAdded ? "0 6px 24px rgba(255,80,0,0.28)" : "none",
            transition: "background 0.35s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Shimmer sweep */}
          {inStock && !cartAdded && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%)",
              }}
            />
          )}

          <AnimatePresence mode="wait">
            {isCartLoading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Loader2 size={15} className="animate-spin" /> Adding...
              </motion.span>
            ) : cartAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 size={15} strokeWidth={2.5} /> Added to Cart!
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={15} strokeWidth={2.5} />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Wishlist */}
        <motion.button
          onClick={handleWishlistClick}
          disabled={isWishlistLoading}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontSize: "clamp(11px, 1.1vw, 13px)",
            padding: "clamp(15px, 1.7vw, 19px) clamp(20px, 2.4vw, 30px)",
            borderRadius: "clamp(14px, 1.5vw, 18px)",
            border: isWished ? "2px solid #FF5000" : "2px solid #EAE4DC",
            background: isWished ? "rgba(255,80,0,0.06)" : "#FFFFFF",
            color: isWished ? "#FF5000" : "#6B5F56",
            boxShadow: isWished
              ? "0 4px 16px rgba(255,80,0,0.12)"
              : "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {isWishlistLoading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <motion.div
              animate={isWished ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={15}
                fill={isWished ? "#FF5000" : "none"}
                stroke={isWished ? "#FF5000" : "currentColor"}
                strokeWidth={2.2}
              />
            </motion.div>
          )}
          {isWishlistLoading
            ? "Updating..."
            : isWished
              ? "Wishlisted"
              : "Wishlist"}
        </motion.button>
      </div>

      <ColorSelectionModal
        isOpen={showColorModal}
        onClose={() => setShowColorModal(false)}
        colors={colors}
        productName={productName}
        productPrice={productPrice}
        productId={productId}
        stockQuantity={stockQuantity}
        onConfirm={addToCartWithColor}
      />
    </>
  );
}

// components/product/ProductActions.tsx
import { ShoppingCart, Heart, Loader2 } from "lucide-react";
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
  stockQuantity: number; // Add stock quantity
  colors: string[];
  material?: string;
  materialId?: number;
  type?: string;
  typeId?: number;
  colorCode?: string;
}

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

    if (colors && colors.length > 0) {
      setShowColorModal(true);
    } else {
      addToCartWithColor(undefined, 1);
    }
  };

  const addToCartWithColor = async (selectedColor?: string, quantity: number = 1) => {
    setIsCartLoading(true);
    try {
      const cartItem = {
        productId,
        name: productName,
        quantity: quantity,
        price: productPrice,
        color: selectedColor || (colors && colors[0]) || "Default",
        colorCode:
          colorCode ||
          getColorCode(selectedColor || (colors && colors[0]) || "Default"),
        material: material || "",
        materialId: materialId || 0,
        type: type || "",
        typeId: typeId || 0,
      };

      await addToCart(cartItem);

      console.log("Added to cart successfully");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsCartLoading(false);
    }
  };

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

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          disabled={!inStock || isCartLoading}
          onClick={handleAddToCart}
          className="group relative overflow-hidden flex-1 flex items-center justify-center gap-2.5 font-black uppercase tracking-[0.08em] text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
          style={{
            fontSize: "clamp(11px, 1.1vw, 14px)",
            padding: "clamp(14px, 1.6vw, 18px)",
            background: inStock
              ? "linear-gradient(145deg, #FF5000 0%, #e34800 100%)"
              : "#ccc",
            borderRadius: "clamp(12px, 1.4vw, 16px)",
            boxShadow: inStock ? "0 6px 24px rgba(255,80,0,0.34)" : "none",
          }}
        >
          {isCartLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ShoppingCart size={16} className="relative z-10" />
          )}
          <span className="relative z-10">
            {isCartLoading
              ? "Adding..."
              : inStock
                ? "Add to Cart"
                : "Out of Stock"}
          </span>
        </button>

        <button
          onClick={handleWishlistClick}
          disabled={isWishlistLoading}
          className="flex items-center justify-center gap-2 font-bold transition-all duration-200 hover:-translate-y-0.5 border disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontSize: "clamp(11px, 1.1vw, 14px)",
            padding: "clamp(14px, 1.6vw, 18px) clamp(18px, 2.2vw, 28px)",
            borderRadius: "clamp(12px, 1.4vw, 16px)",
            borderColor: isWished ? "#FF5000" : "rgba(0,0,0,0.15)",
            background: isWished
              ? "rgba(255,80,0,0.08)"
              : "rgba(255,255,255,0.7)",
            color: isWished ? "#FF5000" : "#2b2e33",
          }}
        >
          {isWishlistLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Heart
              size={16}
              className="transition-all duration-200"
              fill={isWished ? "#FF5000" : "none"}
              stroke={isWished ? "#FF5000" : "currentColor"}
            />
          )}
          {isWishlistLoading
            ? "Updating..."
            : isWished
              ? "Wishlisted"
              : "Wishlist"}
        </button>
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
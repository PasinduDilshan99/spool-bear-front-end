// components/products/ProductCard.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, Loader2, Box, Palette } from "lucide-react";
import { Product } from "@/types/product-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { spoolbearTheme } from "@/theme/spoolbear-theme";
import { SHOP_PAGE_PATH } from "@/utils/urls";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
  getProductImage: (product: Product) => string;
  onAddToCart: (product: Product) => void;
  onWishlistToggle: (product: Product) => void;
  isAddingToCart: boolean;
  isTogglingWishlist: boolean;
}

const parseColorCode = (colorStr: string): string => {
  if (colorStr.includes("|")) {
    return colorStr.split("|")[1];
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
  return defaultCodes[colorStr] || "#000000";
};

const parseColorName = (colorStr: string): string => {
  if (colorStr.includes("|")) {
    return colorStr.split("|")[0];
  }
  return colorStr;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  formatPrice,
  getProductImage,
  onAddToCart,
  onWishlistToggle,
  isAddingToCart,
  isTogglingWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={getProductImage(product)}
          alt={product.productName}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          width={2000}
          height={2000}
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACE_HOLDER_IMAGE;
          }}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#101113]/80 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 text-white text-xs font-semibold rounded-full shadow-lg"
            style={{ backgroundColor: spoolbearTheme.colors.accent }}
          >
            {product.categoryName}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(product);
          }}
          disabled={isTogglingWishlist}
          className="absolute cursor-pointer top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            color: product.isWish ? "#ff0000" : spoolbearTheme.colors.muted,
          }}
        >
          {isTogglingWishlist ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Heart
              className="w-4 h-4"
              fill={product.isWish ? "#ff0000" : "none"}
            />
          )}
        </button>

        <div className="absolute top-4 right-16">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full shadow-lg ${
              product.stockQuantity > 0
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 transition-all duration-500 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Link href={`${SHOP_PAGE_PATH}/${product.productId}`}>
            <button
              className="cursor-pointer w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#ff5000] hover:text-white transition-colors shadow-lg"
              style={{ color: spoolbearTheme.colors.text }}
            >
              <Eye className="w-5 h-5" />
            </button>
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isAddingToCart || product.stockQuantity === 0}
            className="cursor-pointer w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#ff5000] hover:text-white transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: spoolbearTheme.colors.text }}
          >
            {isAddingToCart ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="p-6">
        <Link href={`${SHOP_PAGE_PATH}/${product.productId}`} className="block">
          <h3
            className="text-xl font-bold mb-2 hover:text-[#ff5000] transition-colors line-clamp-1"
            style={{ color: spoolbearTheme.colors.text }}
          >
            {product.productName}
          </h3>
        </Link>
        <p
          className="text-sm mb-4 line-clamp-2"
          style={{ color: spoolbearTheme.colors.muted }}
        >
          {product.productDescription}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-2xl font-black"
              style={{ color: spoolbearTheme.colors.accent }}
            >
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isAddingToCart || product.stockQuantity === 0}
            className="cursor-pointer px-4 py-2 bg-[#ff5000] text-white rounded-lg hover:bg-[#e64800] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div
            className="mt-4 pt-4 border-t flex items-center gap-2"
            style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
          >
            <Palette
              className="w-4 h-4"
              style={{ color: spoolbearTheme.colors.accent }}
            />
            <div className="flex gap-1.5">
              {product.colors.slice(0, 3).map((colorStr, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: parseColorCode(colorStr) }}
                  title={parseColorName(colorStr)}
                />
              ))}
              {product.colors.length > 3 && (
                <span
                  className="text-xs"
                  style={{ color: spoolbearTheme.colors.muted }}
                >
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {product.materialName && (
          <div
            className="mt-2 flex items-center gap-2"
            style={{ color: spoolbearTheme.colors.muted }}
          >
            <Box className="w-3 h-3" />
            <span className="text-xs">{product.materialName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

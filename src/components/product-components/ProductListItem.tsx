// components/products/ProductListItem.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Loader2, Box, Palette } from "lucide-react";
import { Product } from "@/types/product-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { SHOP_PAGE_PATH } from "@/utils/urls";
import { spoolbearTheme } from "@/theme/spoolbear-theme";

interface ProductListItemProps {
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

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  formatPrice,
  getProductImage,
  onAddToCart,
  onWishlistToggle,
  isAddingToCart,
  isTogglingWishlist,
}) => {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border hover:shadow-2xl transition-all duration-300"
      style={{ borderColor: `${spoolbearTheme.colors.accent}20` }}
    >
      <div className="flex flex-col md:flex-row">
        <Link
          href={`${SHOP_PAGE_PATH}/${product.productId}?name=${product.productName}`}
          className="md:w-48 h-48 relative overflow-hidden block"
        >
          <Image
            src={getProductImage(product)}
            alt={product.productName}
            width={2000}
            height={2000}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACE_HOLDER_IMAGE;
            }}
          />
        </Link>

        <div className="flex-1 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
            <div>
              <Link
                href={`${SHOP_PAGE_PATH}/${product.productId}?name=${product.productName}`}
              >
                <h3
                  className="text-xl font-bold hover:text-[#ff5000] transition-colors"
                  style={{ color: spoolbearTheme.colors.text }}
                >
                  {product.productName}
                </h3>
              </Link>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: `${spoolbearTheme.colors.accent}10`,
                    color: spoolbearTheme.colors.accent,
                  }}
                >
                  {product.categoryName}
                </span>
                {product.typeName && (
                  <span
                    className="text-sm"
                    style={{ color: spoolbearTheme.colors.muted }}
                  >
                    {product.typeName}
                  </span>
                )}
                {product.materialName && (
                  <span
                    className="text-sm"
                    style={{ color: spoolbearTheme.colors.muted }}
                  >
                    • {product.materialName}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onWishlistToggle(product)}
                disabled={isTogglingWishlist}
                className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  borderColor: `${spoolbearTheme.colors.muted}30`,
                  color: product.isWish
                    ? "#ff0000"
                    : spoolbearTheme.colors.muted,
                }}
                onMouseEnter={(e) => {
                  if (!product.isWish && !isTogglingWishlist) {
                    e.currentTarget.style.backgroundColor = `${spoolbearTheme.colors.accent}10`;
                    e.currentTarget.style.color = spoolbearTheme.colors.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!product.isWish && !isTogglingWishlist) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = spoolbearTheme.colors.muted;
                  }
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
              <span
                className="text-2xl font-black"
                style={{ color: spoolbearTheme.colors.accent }}
              >
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          <p
            className="mb-4 line-clamp-2"
            style={{ color: spoolbearTheme.colors.muted }}
          >
            {product.productDescription}
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <Palette
                className="w-4 h-4"
                style={{ color: spoolbearTheme.colors.accent }}
              />
              <div className="flex gap-2">
                {product.colors.map((colorStr, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: parseColorCode(colorStr) }}
                    title={parseColorName(colorStr)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.stockQuantity > 0 ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span
                  className="text-sm"
                  style={{ color: spoolbearTheme.colors.muted }}
                >
                  {product.stockQuantity > 0
                    ? `${product.stockQuantity} in stock`
                    : "Out of stock"}
                </span>
              </div>
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
        </div>
      </div>
    </div>
  );
};

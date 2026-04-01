// components/product-components/ProductCard.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Eye,
  Loader2,
  Box,
  Palette,
  CheckCircle,
} from "lucide-react";
import { Product } from "@/types/product-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { SHOP_PAGE_PATH } from "@/utils/urls";

interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
  getProductImage: (product: Product) => string;
  onAddToCart: (product: Product) => void;
  onWishlistToggle: (product: Product) => void;
  handleDetailsPageNavgation: (product: Product) => void;
  isAddingToCart: boolean;
  isTogglingWishlist: boolean;
}

const parseColorCode = (colorStr: string): string => {
  if (colorStr.includes("|")) return colorStr.split("|")[1].trim();
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
  return defaults[colorStr] || "#888";
};

const parseColorName = (colorStr: string): string =>
  colorStr.includes("|") ? colorStr.split("|")[0].trim() : colorStr;

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  formatPrice,
  getProductImage,
  onAddToCart,
  onWishlistToggle,
  isAddingToCart,
  isTogglingWishlist,
  handleDetailsPageNavgation,
}) => {
  const [imgError, setImgError] = useState(false);
  const inStock = product.stockQuantity > 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      {/* ── Image ── */}
      <div
        className="relative overflow-hidden bg-gray-100"
        style={{ aspectRatio: "4/3" }}
      >
        <Image
          src={imgError ? PLACE_HOLDER_IMAGE : getProductImage(product)}
          alt={product.productName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-108"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Orange corner tag */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[48px] border-l-[#FF5000] border-b-[48px] border-b-transparent" />

        {/* Category label */}
        <div className="absolute top-1 left-1.5">
          <span
            className="text-[9px] font-black text-white uppercase tracking-wider"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
          >
            {product.materialType}
          </span>
        </div>

        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          <span
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold text-white"
            style={{
              background: inStock
                ? "rgba(34,197,94,0.85)"
                : "rgba(107,114,128,0.85)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: inStock ? "#fff" : "#ddd" }}
            />
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(product);
          }}
          disabled={isTogglingWishlist}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-50 opacity-0 group-hover:opacity-100"
          style={{ color: product.isWish ? "#FF5000" : "#9ca3af" }}
        >
          {isTogglingWishlist ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Heart
              size={15}
              fill={product.isWish ? "#FF5000" : "none"}
              stroke={product.isWish ? "#FF5000" : "currentColor"}
            />
          )}
        </button>

        {/* Quick action bar */}
        <div className="cursor-pointer absolute bottom-3 left-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDetailsPageNavgation(product);
            }}
          >
            <div className="cursor-pointer w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FF5000] hover:text-white transition-colors duration-200 text-gray-700">
              <Eye size={15} />
            </div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={isAddingToCart || !inStock}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FF5000] hover:text-white transition-colors duration-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <ShoppingCart size={15} />
            )}
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Type + material */}
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5000]">
            {product.typeName}
          </span>
          {product.materialName && (
            <>
              <span className="text-gray-300">·</span>
              <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                <Box size={10} />
                {product.materialName}
              </span>
            </>
          )}
        </div>

        {/* Name */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDetailsPageNavgation(product);
          }}
        >
          <h3
            className="font-black text-[#101113] leading-snug mb-1.5 line-clamp-2 hover:text-[#FF5000] transition-colors duration-200"
            style={{ fontSize: "clamp(14px, 1.5vw, 16px)" }}
          >
            {product.productName}
          </h3>
        </button>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed flex-1">
          {product.productDescription}
        </p>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <Palette size={11} className="text-[#FF5000] flex-shrink-0" />
            <div className="flex gap-1.5 flex-wrap">
              {product.colors.slice(0, 5).map((c, i) => (
                <div
                  key={i}
                  title={parseColorName(c)}
                  className="w-3.5 h-3.5 rounded-full border border-black/10 hover:scale-125 transition-transform duration-150 cursor-default"
                  style={{ background: parseColorCode(c) }}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-[10px] text-gray-400 font-bold">
                  +{product.colors.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-100">
          <span
            className="font-black text-[#FF5000]"
            style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
          >
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isAddingToCart || !inStock}
            className="flex items-center gap-1.5 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{
              fontSize: "clamp(10px, 1.1vw, 12px)",
              padding: "clamp(7px, 0.9vw, 9px) clamp(10px, 1.4vw, 16px)",
              background: inStock
                ? "linear-gradient(145deg, #FF5000, #e34800)"
                : "#ccc",
              borderRadius: "clamp(8px, 1vw, 10px)",
              boxShadow: inStock ? "0 4px 12px rgba(255,80,0,0.3)" : "none",
            }}
          >
            {isAddingToCart ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <ShoppingCart size={12} />
            )}
            {isAddingToCart ? "Adding…" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

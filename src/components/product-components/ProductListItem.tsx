// components/product-components/ProductListItem.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Loader2, Box, Palette, Eye } from "lucide-react";
import { Product } from "@/types/product-types";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { SHOP_PAGE_PATH } from "@/utils/urls";

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
  if (colorStr.includes("|")) return colorStr.split("|")[1].trim();
  const defaults: Record<string, string> = {
    Red: "#FF0000", Blue: "#0000FF", Green: "#00FF00",
    Black: "#000000", White: "#F5F5F5", Yellow: "#FFFF00",
    Purple: "#800080", Orange: "#FFA500", Pink: "#FFC0CB",
    Gray: "#808080", Brown: "#A52A2A",
  };
  return defaults[colorStr] || "#888";
};

const parseColorName = (colorStr: string): string =>
  colorStr.includes("|") ? colorStr.split("|")[0].trim() : colorStr;

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  formatPrice,
  getProductImage,
  onAddToCart,
  onWishlistToggle,
  isAddingToCart,
  isTogglingWishlist,
}) => {
  const [imgError, setImgError] = useState(false);
  const inStock = product.stockQuantity > 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row">

        {/* ── Image ── */}
        <Link
          href={`${SHOP_PAGE_PATH}/${product.productId}`}
          className="relative flex-shrink-0 overflow-hidden bg-gray-100"
          style={{ width: "clamp(120px, 16vw, 200px)", minHeight: "clamp(120px, 16vw, 200px)" }}
        >
          <Image
            src={imgError ? PLACE_HOLDER_IMAGE : getProductImage(product)}
            alt={product.productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="200px"
            onError={() => setImgError(true)}
          />
          {/* Orange corner */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[36px] border-l-[#FF5000] border-b-[36px] border-b-transparent" />

          {/* View overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <Eye size={16} className="text-[#FF5000]" />
            </div>
          </div>
        </Link>

        {/* ── Info ── */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col">
          {/* Top row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0 flex-1">
              {/* Category + type */}
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5000]">
                  {product.categoryName}
                </span>
                {product.typeName && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span className="text-[10px] font-medium text-gray-400">{product.typeName}</span>
                  </>
                )}
                {product.materialName && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span className="text-[10px] font-medium text-gray-400 flex items-center gap-0.5">
                      <Box size={9} />{product.materialName}
                    </span>
                  </>
                )}
              </div>

              {/* Name */}
              <Link href={`${SHOP_PAGE_PATH}/${product.productId}`}>
                <h3
                  className="font-black text-[#101113] leading-snug hover:text-[#FF5000] transition-colors duration-200 truncate"
                  style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
                >
                  {product.productName}
                </h3>
              </Link>
            </div>

            {/* Price + wishlist */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className="font-black text-[#FF5000]"
                style={{ fontSize: "clamp(16px, 2vw, 22px)" }}
              >
                {formatPrice(product.price)}
              </span>
              <button
                onClick={() => onWishlistToggle(product)}
                disabled={isTogglingWishlist}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 disabled:opacity-50"
                style={{ color: product.isWish ? "#FF5000" : "#9ca3af" }}
              >
                {isTogglingWishlist
                  ? <Loader2 size={13} className="animate-spin" />
                  : <Heart size={13} fill={product.isWish ? "#FF5000" : "none"} stroke={product.isWish ? "#FF5000" : "currentColor"} />
                }
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3 flex-1">
            {product.productDescription}
          </p>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <Palette size={11} className="text-[#FF5000] flex-shrink-0" />
              <div className="flex gap-1.5 flex-wrap">
                {product.colors.map((c, i) => (
                  <div
                    key={i}
                    title={parseColorName(c)}
                    className="w-4 h-4 rounded-full border border-black/10 hover:scale-125 transition-transform duration-150 cursor-default"
                    style={{ background: parseColorCode(c) }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stock + CTA */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: inStock ? "#22c55e" : "#9ca3af" }} />
              <span className="text-xs font-medium" style={{ color: inStock ? "#22c55e" : "#9ca3af" }}>
                {inStock ? `${product.stockQuantity} in stock` : "Out of stock"}
              </span>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              disabled={isAddingToCart || !inStock}
              className="flex items-center gap-1.5 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{
                fontSize: "clamp(10px, 1.1vw, 13px)",
                padding: "clamp(7px, 0.9vw, 10px) clamp(12px, 1.6vw, 20px)",
                background: inStock ? "linear-gradient(145deg, #FF5000, #e34800)" : "#ccc",
                borderRadius: "clamp(8px, 1vw, 12px)",
                boxShadow: inStock ? "0 4px 12px rgba(255,80,0,0.28)" : "none",
              }}
            >
              {isAddingToCart ? <Loader2 size={13} className="animate-spin" /> : <ShoppingCart size={13} />}
              {isAddingToCart ? "Adding…" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
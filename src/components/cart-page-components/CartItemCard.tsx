// components/cart/CartItemCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CartItem } from "@/types/cart-types";
import { Trash2, Minus, Plus, Package, Layers, Palette } from "lucide-react";
import { DECREASE_BY_ONE, INCREASE_BY_ONE } from "@/utils/constant";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (
    cartItemId: number,
    newQuantity: number,
    whatToDo: string,
  ) => Promise<void>;
  onRemove: (cartItemId: number, productId: number) => Promise<void>;
}

export function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleIncrement = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await onQuantityChange(item.cartItemId, 1, INCREASE_BY_ONE);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrement = async () => {
    if (isUpdating || item.quantity <= 1) return;
    setIsUpdating(true);
    try {
      await onQuantityChange(item.cartItemId, 1, DECREASE_BY_ONE);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (isRemoving) return;
    setIsRemoving(true);
    try {
      await onRemove(item.cartItemId, item.productId);
    } finally {
      setIsRemoving(false);
    }
  };

  const primaryImage = item.images?.[0]?.url;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Product Image */}
        <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            {primaryImage && !imageError ? (
              <Image
                src={primaryImage}
                alt={item.name}
                fill
                className="object-cover"
                sizes="128px"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={32} className="text-gray-300" />
              </div>
            )}
          </div>
          {/* Orange accent */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-l-[#FF5000] border-b-[20px] border-b-transparent" />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="font-bold text-[#101113] text-lg leading-tight mb-1">
                {item.name}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                  {item.type}
                </span>
                {item.material && (
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                    {item.material}
                  </span>
                )}
                {item.color && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.colorCode || item.color }}
                    />
                    {item.color}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-[#FF5000] text-xl">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">
                ${item.price.toFixed(2)} each
              </p>
            </div>
          </div>

          {/* Quantity Controls and Actions */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                disabled={isUpdating || item.quantity <= 1}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#FF5000] hover:bg-orange-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Minus size={14} className="text-gray-600" />
              </button>
              <span className="w-10 text-center font-semibold text-[#101113]">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrement}
                disabled={isUpdating}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#FF5000] hover:bg-orange-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={14} className="text-gray-600" />
              </button>
              {isUpdating && (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#FF5000] rounded-full animate-spin" />
              )}
            </div>

            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 size={14} />
              <span className="text-sm font-medium">
                {isRemoving ? "Removing..." : "Remove"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

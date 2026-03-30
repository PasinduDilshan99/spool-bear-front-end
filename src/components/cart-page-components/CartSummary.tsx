// components/cart/CartSummary.tsx
"use client";

import React from "react";
import { CartItem } from "@/types/cart-types";
import { ShoppingCart, Truck, Shield, CreditCard, ArrowRight } from "lucide-react";

interface CartSummaryProps {
  items: CartItem[];
  total: number;
  itemCount: number;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartSummary({
  items,
  total,
  itemCount,
  onCheckout,
  onContinueShopping,
}: CartSummaryProps) {
  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-8">
      <div className="h-1 bg-[#FF5000]" />
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
            <ShoppingCart size={16} className="text-[#FF5000]" />
          </div>
          <h3 className="font-black text-[#101113] text-lg">
            Order Summary
          </h3>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
            <span className="font-semibold text-[#101113]">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold text-[#101113]">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estimated Tax</span>
            <span className="font-semibold text-[#101113]">${tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-100 my-3" />
          
          <div className="flex justify-between text-lg font-black">
            <span className="text-[#101113]">Total</span>
            <span className="text-[#FF5000]">${grandTotal.toFixed(2)}</span>
          </div>
          
          {shipping === 0 && (
            <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
              <Truck size={12} />
              Free shipping on orders over $100!
            </p>
          )}
        </div>

        <button
          onClick={onCheckout}
          className="w-full bg-[#FF5000] text-white rounded-xl font-bold py-3 px-4 mb-3 hover:bg-[#CC4000] transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span>Proceed to Order</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onContinueShopping}
          className="w-full border border-gray-200 text-[#2b2e33] rounded-xl font-medium py-3 px-4 hover:bg-gray-50 transition-all duration-200"
        >
          Continue Shopping
        </button>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield size={12} className="text-green-600" />
            <span>Secure checkout with SSL encryption</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CreditCard size={12} className="text-blue-600" />
            <span>Pay with credit card, PayPal, or Apple Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
}
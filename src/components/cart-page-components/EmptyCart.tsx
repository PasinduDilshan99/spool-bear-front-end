// components/cart/EmptyCart.tsx
"use client";

import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface EmptyCartProps {
  onContinueShopping: () => void;
}

export function EmptyCart({ onContinueShopping }: EmptyCartProps) {
  return (
    <div className="min-h-screen bg-[#e4e7ec] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
        
        <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-6 border border-orange-100">
          <ShoppingBag size={40} className="text-[#FF5000]" />
        </div>
        
        <h2 className="font-black text-2xl text-[#101113] mb-2">
          Your cart is empty
        </h2>
        
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added any items to your cart yet. Start exploring our products and find something you&apos;ll love!
        </p>
        
        <button
          onClick={onContinueShopping}
          className="w-full bg-[#FF5000] text-white rounded-xl font-bold py-3 px-4 hover:bg-[#CC4000] transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span>Start Shopping</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        <div className="mt-6 text-sm text-gray-400">
          <p>Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  );
}
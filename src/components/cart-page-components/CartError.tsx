// components/cart/CartError.tsx
"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface CartErrorProps {
  error: string;
  onRetry: () => void;
}

export function CartError({ error, onRetry }: CartErrorProps) {
  return (
    <div className="min-h-screen bg-[#e4e7ec] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5000]" />
        
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6 border border-red-100">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        
        <h2 className="font-black text-xl text-[#101113] mb-2">
          Unable to Load Cart
        </h2>
        
        <p className="text-gray-500 mb-6">
          {error || "There was an error loading your cart. Please try again."}
        </p>
        
        <button
          onClick={onRetry}
          className="w-full bg-[#FF5000] text-white rounded-xl font-bold py-3 px-4 hover:bg-[#CC4000] transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          <span>Try Again</span>
        </button>
        
        <button
          onClick={() => window.location.href = "/products"}
          className="w-full mt-3 border border-gray-200 text-[#2b2e33] rounded-xl font-medium py-3 px-4 hover:bg-gray-50 transition-all duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
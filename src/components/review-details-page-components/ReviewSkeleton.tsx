// components/reviews/ReviewSkeleton.tsx
"use client";
import React from "react";

export const ReviewSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded-full" />
            ))}
          </div>
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
        
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
        
        <div className="h-7 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
        
        <div className="flex gap-2 mt-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg" />
          <div className="w-16 h-16 bg-gray-200 rounded-lg" />
          <div className="w-16 h-16 bg-gray-200 rounded-lg" />
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="h-8 w-24 bg-gray-200 rounded" />
          <div className="flex gap-3">
            <div className="h-5 w-12 bg-gray-200 rounded" />
            <div className="h-5 w-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
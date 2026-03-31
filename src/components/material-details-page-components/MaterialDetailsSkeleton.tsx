// components/material-details/MaterialDetailsSkeleton.tsx
"use client";
import React from "react";

export const MaterialDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-6">
          <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
              <div className="h-96 bg-gray-200"></div>
            </div>
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

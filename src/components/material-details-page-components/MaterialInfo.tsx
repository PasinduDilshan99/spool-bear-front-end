// components/material-details/MaterialInfo.tsx
"use client";
import React from "react";

interface MaterialInfoProps {
  name: string;
  type: string;
  price: number;
  description: string;
}

export const MaterialInfo: React.FC<MaterialInfoProps> = ({
  name,
  type,
  price,
  description,
}) => {
  const formatPrice = (price: number) => `$${price.toFixed(3)}`;

  return (
    <div>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            {name}
          </h1>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl lg:text-4xl font-bold text-[#FF5000]">
            {formatPrice(price)}
          </div>
          <div className="text-sm text-gray-500">per gram</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

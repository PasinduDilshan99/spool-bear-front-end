// components/materials/MaterialCard.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Material } from "@/types/material-types";
import { MATERIAL_PAGE_PATH } from "@/utils/urls";

interface MaterialCardProps {
  material: Material;
  onQuickView: (material: Material) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  onQuickView,
}) => {
  const getStrengthBadgeClass = (strength: string) => {
    const classes = {
      High: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Medium: "bg-amber-50 text-amber-700 border-amber-200",
      Low: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return (
      classes[strength as keyof typeof classes] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

  const getFlexibilityBadgeClass = (flexibility: string) => {
    const classes = {
      High: "bg-indigo-50 text-indigo-700 border-indigo-200",
      Medium: "bg-sky-50 text-sky-700 border-sky-200",
      Low: "bg-gray-50 text-gray-700 border-gray-200",
    };
    return (
      classes[flexibility as keyof typeof classes] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {material.images?.[0] ? (
          <Image
            src={material.images[0]}
            alt={material.materialName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg
              className="w-20 h-20 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {material.isPopular && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-lg shadow-lg">
              Popular
            </span>
          )}
          {!material.isAvailable && (
            <span className="px-2.5 py-1 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onQuickView(material)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF5000] transition-colors line-clamp-1">
              {material.materialName}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {material.materialType?.name}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#FF5000]">
              ${material.pricePerGram.toFixed(3)}
            </div>
            <div className="text-xs text-gray-500">per gram</div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {material.materialDescription}
        </p>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <span>Density: {material.density} g/cm³</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span>Temp: {material.temperatureResistance}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getStrengthBadgeClass(material.strength)}`}
          >
            💪 {material.strength}
          </span>
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getFlexibilityBadgeClass(material.flexibility)}`}
          >
            🔄 {material.flexibility}
          </span>
          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
            🎨 {material.finish}
          </span>
        </div>

        {/* Colors */}
        {material.colors && material.colors.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-1">
              {material.colors.slice(0, 4).map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200"
                  style={{ backgroundColor: color.hexCode }}
                  title={color.colorName}
                />
              ))}
            </div>
            {material.colors.length > 4 && (
              <span className="text-xs text-gray-500">
                +{material.colors.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`${MATERIAL_PAGE_PATH}/${material.materialId}`}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-xl hover:shadow-lg transition-all duration-300 text-center text-sm font-medium"
          >
            View Details
          </Link>
          <button
            className="p-2 border border-gray-200 rounded-xl hover:border-[#FF5000] hover:text-[#FF5000] transition-all"
            title="Add to favorites"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

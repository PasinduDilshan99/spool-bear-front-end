// components/materials/MaterialListView.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Material } from "@/types/material-types";
import { MATERIAL_PAGE_PATH } from "@/utils/urls";

interface MaterialListViewProps {
  materials: Material[];
  onQuickView: (material: Material) => void;
}

export const MaterialListView: React.FC<MaterialListViewProps> = ({
  materials,
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
    <div className="space-y-3">
      {materials.map((material) => (
        <motion.div
          key={material.materialId}
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4"
        >
          <div className="flex gap-4">
            {/* Image */}
            <div
              className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => onQuickView(material)}
            >
              {material.images?.[0] ? (
                <Image
                  src={material.images[0]}
                  alt={material.materialName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg
                    className="w-8 h-8 text-gray-300"
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
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {material.materialName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {material.materialType?.name}
                  </p>
                </div>
                {/* <div className="text-right">
                  <div className="text-xl font-bold text-[#FF5000]">
                    ${material.pricePerGram.toFixed(3)}
                  </div>
                  <div className="text-xs text-gray-500">per gram</div>
                </div> */}
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {material.materialDescription}
              </p>

              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getStrengthBadgeClass(material.strength)}`}
                  >
                    {material.strength}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getFlexibilityBadgeClass(material.flexibility)}`}
                  >
                    {material.flexibility}
                  </span>
                </div>
                <Link
                  href={`${MATERIAL_PAGE_PATH}/${material.materialId}`}
                  className="text-sm text-[#FF5000] hover:text-[#ff6b2c] font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

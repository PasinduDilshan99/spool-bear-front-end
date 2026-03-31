// components/materials/MaterialQuickViewModal.tsx
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Material } from "@/types/material-types";

interface MaterialQuickViewModalProps {
  material: Material | null;
  onClose: () => void;
}

export const MaterialQuickViewModal: React.FC<MaterialQuickViewModalProps> = ({
  material,
  onClose,
}) => {
  if (!material) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Material Details</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="relative h-64 bg-gray-100 rounded-xl mb-6">
            {material.images?.[0] && (
              <Image
                src={material.images[0]}
                alt={material.materialName}
                fill
                className="object-cover rounded-xl"
              />
            )}
          </div>
          <h4 className="text-2xl font-bold text-gray-900 mb-2">
            {material.materialName}
          </h4>
          <p className="text-gray-600 mb-4">{material.materialDescription}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500">Price</div>
              <div className="text-xl font-bold text-[#FF5000]">
                ${material.pricePerGram.toFixed(3)}/g
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500">Density</div>
              <div className="text-lg font-semibold text-gray-900">
                {material.density} g/cm³
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Properties</h5>
              <div className="grid grid-cols-2 gap-2">
                {material.properties.map((prop, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-2">
                    <div className="text-xs text-gray-500">
                      {prop.propertyName}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {prop.propertyValue}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Pros & Cons</h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-green-600 mb-2">
                    ✓ Pros
                  </div>
                  <ul className="space-y-1">
                    {material.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        • {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-medium text-red-600 mb-2">
                    ✗ Cons
                  </div>
                  <ul className="space-y-1">
                    {material.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        • {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

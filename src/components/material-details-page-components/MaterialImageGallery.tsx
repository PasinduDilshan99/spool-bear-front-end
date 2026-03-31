// components/material-details/MaterialImageGallery.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MaterialImageGalleryProps {
  images: string[];
  materialName: string;
  isPopular: boolean;
  isAvailable: boolean;
  selectedImage: string | null;
  onImageSelect: (image: string) => void;
}

export const MaterialImageGallery: React.FC<MaterialImageGalleryProps> = ({
  images,
  materialName,
  isPopular,
  isAvailable,
  selectedImage,
  onImageSelect,
}) => {
  const hasImages = images && images.length > 0;
  const mainImage = selectedImage || (hasImages ? images[0] : null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Main Image */}
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden aspect-square">
        {hasImages ? (
          <Image
            src={mainImage!}
            alt={materialName}
            fill
            className="object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
            onClick={() => onImageSelect(images[0])}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
            <svg
              className="w-32 h-32 text-gray-400"
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
        <div className="absolute top-4 left-4 flex gap-2">
          {isPopular && (
            <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-lg shadow-lg">
              Popular
            </span>
          )}
          {!isAvailable && (
            <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(image)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === image || (!selectedImage && index === 0)
                  ? "border-[#FF5000] shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={`${materialName} - ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

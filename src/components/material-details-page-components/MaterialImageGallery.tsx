// components/material-details-page-components/MaterialImageGallery.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Star,
  CheckCircle2,
  Layers,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  const [activeIdx, setActiveIdx] = useState(0);
  const mainImage = hasImages ? images[activeIdx] : null;

  const handleThumb = (img: string, idx: number) => {
    setActiveIdx(idx);
    onImageSelect(img);
  };

  const prev = () => {
    const next = (activeIdx - 1 + images.length) % images.length;
    setActiveIdx(next);
    onImageSelect(images[next]);
  };

  const next = () => {
    const n = (activeIdx + 1) % images.length;
    setActiveIdx(n);
    onImageSelect(images[n]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-4"
    >
      {/* Main image */}
      <div
        className="relative overflow-hidden rounded-3xl bg-[#F7F5F2] aspect-square group"
        style={{
          boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Decorative corner accent */}
        <div
          className="absolute bottom-0 left-0 w-40 h-40 rounded-tr-full opacity-15 pointer-events-none z-10"
          style={{ background: "linear-gradient(135deg,#FF5000,#FF8C42)" }}
        />
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-8 pointer-events-none z-10"
          style={{ background: "linear-gradient(225deg,#FF5000,transparent)" }}
        />

        {hasImages && mainImage ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={mainImage}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={mainImage}
                alt={materialName}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Layers size={56} className="text-[#D6CEC6]" strokeWidth={1} />
            <span className="text-sm text-[#B8ADA4] font-medium">
              No preview available
            </span>
          </div>
        )}

        {/* Zoom hint overlay */}
        {hasImages && (
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={() => onImageSelect(mainImage!)}
            className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(28,23,20,0.18)" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg">
              <ZoomIn size={16} className="text-[#FF5000]" strokeWidth={2.5} />
              <span className="text-[12px] font-bold text-[#3D3530]">
                View Full Size
              </span>
            </div>
          </motion.button>
        )}

        {/* Arrow navigation */}
        {hasImages && images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white hover:shadow-lg transition-all duration-150 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft
                size={18}
                className="text-[#3D3530]"
                strokeWidth={2.5}
              />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white hover:shadow-lg transition-all duration-150 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight
                size={18}
                className="text-[#3D3530]"
                strokeWidth={2.5}
              />
            </button>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {isPopular && (
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black text-white shadow-lg"
              style={{ background: "linear-gradient(135deg,#FF5000,#FF8C42)" }}
            >
              <Star size={10} fill="white" />
              Popular Choice
            </motion.span>
          )}
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-white shadow-md backdrop-blur-sm ${
              isAvailable ? "bg-emerald-500/90" : "bg-gray-800/80"
            }`}
          >
            <CheckCircle2 size={10} />
            {isAvailable ? "In Stock" : "Out of Stock"}
          </motion.span>
        </div>

        {/* Dot indicators */}
        {hasImages && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleThumb(images[idx], idx)}
                className="transition-all duration-200"
              >
                <div
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeIdx === idx ? "20px" : "6px",
                    background:
                      activeIdx === idx ? "#FF5000" : "rgba(255,255,255,0.6)",
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {hasImages && images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex gap-3 overflow-x-auto pb-1"
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => handleThumb(image, index)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                border:
                  activeIdx === index
                    ? "2.5px solid #FF5000"
                    : "2.5px solid transparent",
                boxShadow:
                  activeIdx === index
                    ? "0 4px 16px rgba(255,80,0,0.25)"
                    : "0 2px 8px rgba(0,0,0,0.06)",
                opacity: activeIdx === index ? 1 : 0.55,
              }}
            >
              <Image
                src={image}
                alt={`${materialName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

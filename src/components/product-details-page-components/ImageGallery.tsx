// components/product/ImageGallery.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { ProductImage } from "@/types/product-types";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const activeImages = useMemo(
    () => images.filter((img) => img.status === 1),
    [images]
  );

  // Initialize selected state based on primary image
  const [selected, setSelected] = useState(() => {
    const primaryIndex = activeImages.findIndex((img) => img.isPrimary);
    return primaryIndex >= 0 ? primaryIndex : 0;
  });

  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const prev = useCallback(
    () =>
      setSelected((s) => (s - 1 + activeImages.length) % activeImages.length),
    [activeImages.length]
  );
  
  const next = useCallback(
    () =>
      setSelected((s) => (s + 1) % activeImages.length),
    [activeImages.length]
  );

  const handleImageError = useCallback((imageId: number) => {
    setImageError((prev) => ({ ...prev, [imageId]: true }));
  }, []);

  if (!activeImages.length) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center">
        <Layers size={48} className="text-gray-300 mb-3" />
        <p className="text-sm font-medium text-gray-400">No images available</p>
      </div>
    );
  }

  // Ensure selected index is valid (in case activeImages changes)
  const validSelected = selected >= activeImages.length ? 0 : selected;
  const current = activeImages[validSelected];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 group">
        {!imageError[current.imageId] ? (
          <Image
            src={current.imageUrl}
            alt={productName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => handleImageError(current.imageId)}
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Layers size={56} className="text-gray-300" />
          </div>
        )}

        {/* Orange accent corner */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] border-l-[#FF5000] border-b-[40px] border-b-transparent" />

        {/* Nav arrows — only when multiple images */}
        {activeImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="text-[#101113]" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="text-[#101113]" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {activeImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === validSelected ? "20px" : "6px",
                    height: "6px",
                    background:
                      i === validSelected ? "#FF5000" : "rgba(255,255,255,0.7)",
                  }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {activeImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300">
          {activeImages.map((img, i) => (
            <button
              key={img.imageId}
              onClick={() => setSelected(i)}
              className="flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-200"
              style={{
                width: "clamp(52px, 7vw, 72px)",
                height: "clamp(52px, 7vw, 72px)",
                border:
                  i === validSelected
                    ? "2px solid #FF5000"
                    : "2px solid transparent",
                boxShadow:
                  i === validSelected ? "0 0 0 1px rgba(255,80,0,0.3)" : "none",
                opacity: i === validSelected ? 1 : 0.65,
              }}
              aria-label={`Thumbnail ${i + 1}`}
            >
              {!imageError[img.imageId] ? (
                <Image
                  src={img.imageUrl}
                  alt={`${productName} view ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                  onError={() => handleImageError(img.imageId)}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Layers size={16} className="text-gray-300" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
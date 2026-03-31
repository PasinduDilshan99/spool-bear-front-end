// components/review-details-page-components/ImageGallery.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ReviewImage } from "@/types/review-types";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageGalleryProps {
  images: ReviewImage[];
  isExpanded: boolean;
  maxPreview?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isExpanded,
  maxPreview = 3,
}) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const displayImages = isExpanded ? images : images.slice(0, maxPreview);
  const remaining = images.length - maxPreview;

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImg = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + images.length) % images.length);
  }, [lightboxIdx, images.length]);
  const nextImg = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % images.length);
  }, [lightboxIdx, images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, prevImg, nextImg]);

  return (
    <>
      <div
        className={`grid gap-2.5 ${
          isExpanded ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-3"
        }`}
      >
        {displayImages.map((image, i) => {
          const isPlaceholder =
            !isExpanded && i === maxPreview - 1 && remaining > 0;

          return (
            <div
              key={image.imageId ?? i}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              style={{
                opacity: 0,
                animation: `imgReveal 0.45s ${i * 60}ms cubic-bezier(0.34,1.56,0.64,1) both`,
              }}
              onClick={() => !isPlaceholder && openLightbox(i)}
            >
              {imgErrors[image.imageId] ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <ZoomIn size={24} className="text-gray-400" />
                </div>
              ) : (
                <Image
                  src={image.imageUrl}
                  alt={`Review image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-400 group-hover:scale-110"
                  sizes="(max-width: 640px) 33vw, 200px"
                  onError={() =>
                    setImgErrors((prev) => ({ ...prev, [image.imageId]: true }))
                  }
                />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                {!isPlaceholder && (
                  <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-75 group-hover:scale-100">
                    <ZoomIn size={16} className="text-[#FF5000]" />
                  </div>
                )}
              </div>

              {/* Remaining count overlay */}
              {isPlaceholder && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-2xl font-black">+{remaining + 1}</p>
                    <p className="text-xs font-bold opacity-80">more</p>
                  </div>
                </div>
              )}

              {/* Primary badge */}
              {image.isPrimary && (
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-[#FF5000] text-[9px] font-black text-white uppercase tracking-wider">
                  Main
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ animation: "lightboxIn 0.25s ease-out both" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          />

          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] px-4">
            {/* Counter */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-white/60 text-sm font-bold">
              {lightboxIdx + 1} / {images.length}
            </div>

            {/* Main image */}
            <div
              className="relative w-full"
              style={{
                height: "clamp(300px, 70vh, 700px)",
                animation:
                  "lightboxImgIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <Image
                src={images[lightboxIdx].imageUrl}
                alt={`Review image ${lightboxIdx + 1}`}
                fill
                className="object-contain rounded-xl"
                sizes="90vw"
                priority
              />
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-150 hover:scale-110"
            >
              <X size={18} />
            </button>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImg();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-[#FF5000] flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImg();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-[#FF5000] flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Dot nav */}
            {images.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-4">
                {images.map((_, di) => (
                  <button
                    key={di}
                    onClick={() => setLightboxIdx(di)}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: di === lightboxIdx ? "20px" : "6px",
                      height: "6px",
                      background:
                        di === lightboxIdx
                          ? "#FF5000"
                          : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes imgReveal {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes lightboxIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes lightboxImgIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

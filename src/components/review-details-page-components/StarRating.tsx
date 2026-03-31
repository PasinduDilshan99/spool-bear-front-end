// components/review-details-page-components/StarRating.tsx
"use client";
import React from "react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = "md" }) => {
  const starSize = { sm: 13, md: 16, lg: 20 }[size];
  const textSize = { sm: "text-xs", md: "text-sm", lg: "text-base" }[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star, i) => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star === Math.ceil(rating) && rating % 1 !== 0;
          const pct = partial ? Math.round((rating % 1) * 100) : 0;

          return (
            <span
              key={star}
              className="relative inline-block"
              style={{
                width: starSize,
                height: starSize,
                animation: `starPop 0.4s ${i * 70}ms cubic-bezier(0.34,1.56,0.64,1) both`,
              }}
            >
              {/* Empty star */}
              <svg width={starSize} height={starSize} viewBox="0 0 20 20"
                className="absolute inset-0" style={{ color: "#e5e7eb", fill: "currentColor" }}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {/* Filled star (or partial) */}
              <svg width={starSize} height={starSize} viewBox="0 0 20 20"
                className="absolute inset-0"
                style={{
                  color: "#FF5000",
                  fill: "currentColor",
                  clipPath: partial ? `inset(0 ${100 - pct}% 0 0)` : undefined,
                  opacity: filled || partial ? 1 : 0,
                }}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          );
        })}
      </div>

      <span className={`font-black text-[#FF5000] ${textSize}`}>
        {rating.toFixed(1)}
      </span>

      <style jsx>{`
        @keyframes starPop {
          from { opacity: 0; transform: scale(0) rotate(-30deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};
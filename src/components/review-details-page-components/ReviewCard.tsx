// components/reviews/ReviewCard.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Review, ReviewImage } from "@/types/review-types";
import { StarRating } from "./StarRating";
import { formatDate, getOrderTypeIcon, getOrderTypeLabel } from "@/utils/reviewUtils";
import Image from "next/image";

interface ReviewCardProps {
  review: Review;
  isClickable?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, isClickable = true }) => {
  const previewImages = review.images?.slice(0, 3) || [];

  return (
    <motion.div
      layout
      whileHover={isClickable ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${
        isClickable ? "cursor-pointer" : ""
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <StarRating rating={review.rating} />
            <span className="text-xs text-gray-400">{formatDate(review.reviewCreatedAt)}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              review.orderType === "PRINTING"
                ? "bg-purple-50 text-purple-700 border border-purple-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}>
              <span>{getOrderTypeIcon(review.orderType)}</span>
              <span>{getOrderTypeLabel(review.orderType)}</span>
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">Order #{review.orderId}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">
            {review.productName}
          </h3>
        </div>

        {/* Review Preview */}
        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {review.reviewComment}
        </p>

        {/* Images Preview */}
        {previewImages.length > 0 && (
          <div className="flex gap-2 mb-4">
            {previewImages.map((image: ReviewImage, index: number) => (
              <div
                key={image.imageId}
                className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden"
              >
                <Image
                  src={image.imageUrl}
                  alt={`Review image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {review.images.length > 3 && (
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500">
                +{review.images.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="text-base">❤️</span>
            <span>{review.reactions?.length || 0}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-base">💬</span>
            <span>{review.comments?.length || 0}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
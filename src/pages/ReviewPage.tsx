// app/reviews/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ReviewService } from "@/service/reviewService";
import { Review } from "@/types/review-types";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewSkeleton } from "@/components/review-details-page-components/ReviewSkeleton";
import { ReviewFilters } from "@/components/review-details-page-components/ReviewFilters";
import { EmptyState } from "@/components/review-details-page-components/EmptyState";
import { ReviewCard } from "@/components/review-details-page-components/ReviewCard";

const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "recent" | "top-rated"
  >("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState<
    "all" | "PRODUCT" | "PRINTING"
  >("all");

  const reviewService = new ReviewService();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadAllReviews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reviews, activeFilter, orderTypeFilter]);

  const loadAllReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reviewService.getAllReviews();
      if (response.code === 200) {
        setReviews(response.data);
      } else {
        setError(response.message || "Failed to load reviews");
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reviews];

    if (orderTypeFilter !== "all") {
      filtered = filtered.filter(
        (review) => review.orderType === orderTypeFilter,
      );
    }

    if (activeFilter === "recent") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(
        (review) => new Date(review.reviewCreatedAt) >= thirtyDaysAgo,
      );
    } else if (activeFilter === "top-rated") {
      filtered = filtered.filter((review) => review.rating >= 4);
    }

    setFilteredReviews(filtered);
  };

  const handleCardClick = (reviewId: number) => {
    router.push(`/reviews/${reviewId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8">
            <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
            <div className="h-5 w-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-20 h-20 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Unable to Load Reviews
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadAllReviews}
              className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-lg hover:shadow-lg transition-all duration-300 w-full font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Community Reviews
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Discover what others are saying about 3D printing products and
            services
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <ReviewFilters
            activeFilter={activeFilter}
            orderTypeFilter={orderTypeFilter}
            onFilterChange={setActiveFilter}
            onOrderTypeChange={setOrderTypeFilter}
            totalReviews={reviews.length}
            filteredCount={filteredReviews.length}
          />
        </motion.div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EmptyState
              activeFilter={activeFilter}
              orderTypeFilter={orderTypeFilter}
              onReset={() => {
                setActiveFilter("all");
                setOrderTypeFilter("all");
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.reviewId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                  onClick={() => handleCardClick(review.reviewId)}
                  className="cursor-pointer"
                >
                  <ReviewCard review={review} isClickable={true} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stats Section */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-[#FF5000]">
                  {reviews.length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Reviews</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-[#FF5000]">
                  {(
                    reviews.reduce((acc, r) => acc + r.rating, 0) /
                    reviews.length
                  ).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Average Rating</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-[#FF5000]">
                  {reviews.reduce((acc, r) => acc + r.reactions.length, 0)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Total Reactions
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-[#FF5000]">
                  {reviews.reduce((acc, r) => acc + r.comments.length, 0)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Comments</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;

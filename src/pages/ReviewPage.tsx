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
      <div className="bg-[#e4e7ec] relative overflow-x-hidden min-h-screen">
        {/* Global grid texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
      <div className="bg-[#e4e7ec] relative overflow-x-hidden min-h-screen">
        {/* Global grid texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
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
                className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#e34800] text-white rounded-lg hover:shadow-lg transition-all duration-300 w-full font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style global jsx>{`
        @keyframes reviewReveal {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes reviewSlideLeft {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes reviewPulse {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
        @keyframes reviewShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
        @keyframes reviewBadgePop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-15deg);
          }
          70% {
            transform: scale(1.12) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes reviewFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>

      <div
        className="bg-[#e4e7ec] relative overflow-x-hidden min-h-screen"
        style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}
      >
        {/* Global grid texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="mb-8 md:mb-12"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-5">
                <div
                  className="h-0.5 rounded-full bg-[#FF5000]"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
                <span
                  className="font-black uppercase tracking-[0.2em] text-[#FF5000]"
                  style={{ fontSize: "clamp(9px, 1vw, 12px)" }}
                >
                  Customer Voices
                </span>
                <div
                  className="h-0.5 rounded-full bg-[#FF5000]"
                  style={{ width: "clamp(20px, 3vw, 36px)" }}
                />
              </div>

              <h1
                className="font-black text-[#101113] tracking-tight leading-[1.3] mb-3"
                style={{
                  fontSize: "clamp(30px, 4.8vw, 48px)",
                  letterSpacing: "-0.03em",
                }}
              >
                Community{" "}
                <span className="relative inline-block text-[#FF5000]">
                  Reviews
                  <span
                    className="absolute bottom-0 left-0 h-0.75 sm:h-1 rounded-full"
                    style={{
                      background: "rgba(255,80,0,0.28)",
                      animation: "reviewReveal 0.9s 0.65s ease-out both",
                      width: 0,
                    }}
                  />
                </span>
              </h1>
              <p
                className="text-[#2b2e33] font-medium"
                style={{ fontSize: "clamp(13px, 1.5vw, 18px)" }}
              >
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
                className="mt-12 pt-8"
              >
                {/* Dot divider above stats */}
                <div className="flex items-center gap-3 mx-auto mb-8">
                  <div className="flex-1 h-px bg-black/6" />
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="rounded-full bg-[#FF5000] animate-pulse"
                        style={{
                          width: "5px",
                          height: "5px",
                          opacity: 0.35,
                          animationDelay: `${i * 200}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex-1 h-px bg-black/6" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 p-5">
                    <div className="text-2xl font-black text-[#FF5000]">
                      {reviews.length}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#2b2e33]">
                      Total Reviews
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 p-5">
                    <div className="text-2xl font-black text-[#FF5000]">
                      {(
                        reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#2b2e33]">
                      Average Rating
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 p-5">
                    <div className="text-2xl font-black text-[#FF5000]">
                      {reviews.reduce((acc, r) => acc + r.reactions.length, 0)}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#2b2e33]">
                      Total Reactions
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 p-5">
                    <div className="text-2xl font-black text-[#FF5000]">
                      {reviews.reduce((acc, r) => acc + r.comments.length, 0)}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#2b2e33]">
                      Total Comments
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;

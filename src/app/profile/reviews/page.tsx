// app/profile/my-reviews/page.tsx
"use client";
import {
  Review,
  ReviewImage,
  ReviewReaction,
  ReviewComment,
} from "@/types/review-types";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PLACE_HOLDER_IMAGE } from "@/utils/constant";
import { ReviewService } from "@/service/reviewService";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "recent" | "top-rated"
  >("all");
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set(),
  );

  const reviewService = new ReviewService();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    loadUserReviews();
  }, []);

  const loadUserReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reviewService.getUserReviews();
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

  const toggleComments = (reviewId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const filteredReviews = reviews.filter((review) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "recent") {
      const reviewDate = new Date(review.reviewCreatedAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return reviewDate >= thirtyDaysAgo;
    }
    if (activeFilter === "top-rated") return review.rating >= 4;
    return true;
  });

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 md:w-5 md:h-5 ${
                star <= rating ? "text-[#FF5000] fill-current" : "text-gray-300"
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-semibold text-[#FF5000]">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReactionIcon = (reactionType: string) => {
    switch (reactionType.toLowerCase()) {
      case "like":
        return "👍";
      case "funny":
        return "😂";
      case "helpful":
        return "💡";
      default:
        return "❤️";
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
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
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Unable to Load Reviews
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadUserReviews}
              className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-lg hover:shadow-lg transition-all duration-300 w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            My Reviews
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Your reviews for 3D printing products and accessories
          </p>
        </div>

        {/* Stats and Filter */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-gray-800">
                  {reviews.length}
                </span>
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-[#FF5000]">★</span>
                    <span className="font-semibold">
                      {reviews.length > 0
                        ? (
                            reviews.reduce((acc, r) => acc + r.rating, 0) /
                            reviews.length
                          ).toFixed(1)
                        : "0.0"}
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    {reviews.reduce((acc, r) => acc + r.comments.length, 0)}{" "}
                    total comments
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Product reviews across your purchase history
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#FF5000]"
                }`}
              >
                All Reviews
              </button>
              <button
                onClick={() => setActiveFilter("recent")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === "recent"
                    ? "bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#FF5000]"
                }`}
              >
                Recent (30d)
              </button>
              <button
                onClick={() => setActiveFilter("top-rated")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeFilter === "top-rated"
                    ? "bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#FF5000]"
                }`}
              >
                Top Rated
              </button>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="md:hidden flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200 mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <span className="text-[#FF5000]">★</span>
                <span className="font-semibold">
                  {reviews.length > 0
                    ? (
                        reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">
                {reviews.reduce((acc, r) => acc + r.comments.length, 0)}{" "}
                comments
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 text-center">
            <div className="text-[#FF5000] text-5xl md:text-6xl mb-4">📝</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              {activeFilter === "all"
                ? "No Reviews Yet"
                : "No Reviews Match Filter"}
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 max-w-md mx-auto">
              {activeFilter === "all"
                ? "You haven't reviewed any products yet. Share your 3D printing experiences!"
                : `No ${activeFilter === "recent" ? "recent" : "top-rated"} reviews found.`}
            </p>
            <button
              onClick={() => router.push("/products")}
              className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {filteredReviews.map((review) => (
                <div
                  key={review.reviewId}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-[#FFE0C2] transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-5 md:p-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={review.rating} />
                          <span className="text-xs text-gray-500">
                            {formatDate(review.reviewCreatedAt)}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                          {review.productName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Product ID: #{review.productId}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                          review.reviewStatus === "ACTIVE"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                        }`}
                      >
                        {review.reviewStatus}
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 mb-4 text-sm md:text-base">
                      {review.reviewComment}
                    </p>

                    {/* Images Gallery */}
                    {review.images && review.images.length > 0 && (
                      <div className="mt-4">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#FF5000] scrollbar-track-gray-100">
                          {review.images.map((image: ReviewImage) => (
                            <div
                              key={image.imageId}
                              className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group-hover:border-[#FFE0C2] transition-colors"
                            >
                              <Image
                                src={image.imageUrl}
                                alt="Review image"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reactions */}
                    {review.reactions && review.reactions.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {review.reactions.map((reaction: ReviewReaction) => (
                          <span
                            key={reaction.reviewReactionId}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                          >
                            {getReactionIcon(reaction.reactionType)}
                            <span>{reaction.userName}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Comments Section */}
                    {review.comments && review.comments.length > 0 && (
                      <div className="mt-4">
                        <button
                          onClick={() => toggleComments(review.reviewId)}
                          className="text-[#FF5000] hover:text-[#ff6b2c] text-sm font-medium flex items-center space-x-1 transition-colors"
                        >
                          <span>{review.comments.length} Comments</span>
                          <svg
                            className={`w-4 h-4 transform transition-transform ${
                              expandedComments.has(review.reviewId)
                                ? "rotate-180"
                                : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {expandedComments.has(review.reviewId) && (
                          <div className="mt-3 space-y-3">
                            {review.comments.map((comment: ReviewComment) => (
                              <div
                                key={comment.commentId}
                                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm text-gray-800">
                                      {comment.userName}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatDate(comment.commentCreatedAt)}
                                    </span>
                                  </div>
                                  {comment.commentReactions &&
                                    comment.commentReactions.length > 0 && (
                                      <div className="flex gap-1">
                                        {comment.commentReactions.map(
                                          (reaction) => (
                                            <span
                                              key={reaction.commentReactionId}
                                              className="text-xs"
                                            >
                                              {getReactionIcon(
                                                reaction.commentReactionType,
                                              )}
                                            </span>
                                          ),
                                        )}
                                      </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-700">
                                  {comment.comment}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <button
                        onClick={() =>
                          router.push(
                            `/products/${review.productId}?name=${encodeURIComponent(review.productName)}`,
                          )
                        }
                        className="text-[#FF5000] hover:text-[#ff6b2c] text-sm font-medium flex items-center space-x-1 transition-colors"
                      >
                        <span>View Product</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <span className="w-4 h-4 text-[#FF5000]">❤️</span>
                          <span>{review.reactions?.length || 0}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-4 h-4 text-[#FF5000]">💬</span>
                          <span>{review.comments?.length || 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredReviews.length > 8 && (
              <div className="mt-8 md:mt-12 text-center">
                <button className="px-6 py-3 bg-white text-[#FF5000] font-medium rounded-lg border border-gray-300 hover:border-[#FF5000] hover:shadow-md transition-all duration-300">
                  Load More Reviews
                </button>
              </div>
            )}
          </>
        )}

        {/* Stats Summary */}
        {reviews.length > 0 && (
          <div className="mt-8 md:mt-12 bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
              Review Insights
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="text-2xl md:text-3xl font-bold text-[#FF5000]">
                  {reviews.length}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Total Reviews
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="text-2xl md:text-3xl font-bold text-[#FF5000]">
                  {reviews.length > 0
                    ? (
                        reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Avg Rating
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="text-2xl md:text-3xl font-bold text-[#FF5000]">
                  {reviews.reduce((acc, r) => acc + r.reactions.length, 0)}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Reactions
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="text-2xl md:text-3xl font-bold text-[#FF5000]">
                  {reviews.reduce((acc, r) => acc + r.comments.length, 0)}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Comments
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

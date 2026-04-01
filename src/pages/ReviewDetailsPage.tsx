// app/reviews/[reviewId]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ReviewService } from "@/service/reviewService";
import {
  Review,
  ReviewImage,
  ReviewReaction,
  ReviewComment,
} from "@/types/review-types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  formatDate,
  getOrderTypeIcon,
  getOrderTypeLabel,
} from "@/utils/reviewUtils";
import { StarRating } from "@/components/review-details-page-components/StarRating";
import { ImageGallery } from "@/components/review-details-page-components/ImageGallery";
import { ReactionButtons } from "@/components/review-details-page-components/ReactionButtons";
import { CommentSection } from "@/components/review-details-page-components/CommentSection";

const ReviewDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  // Convert reviewId to number properly
  const reviewId = params?.reviewsId ? Number(params.reviewsId) : null;

  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviewService = new ReviewService();
  const { user } = useAuth();

  useEffect(() => {
    if (reviewId && !isNaN(reviewId)) {
      loadReviewDetails();
    } else if (reviewId === null || isNaN(reviewId)) {
      setError("Invalid review ID");
      setLoading(false);
    }
  }, [reviewId]);

  const loadReviewDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the dedicated API to fetch review by ID
      const response = await reviewService.getReviewById(reviewId!);

      if (response.code === 200 && response.data) {
        setReview(response.data);
      } else {
        setError(response.message || "Failed to load review");
      }
    } catch (err) {
      console.error("Failed to load review:", err);
      setError("Failed to load review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReaction = async (reactType: string) => {
    if (!user) {
      alert("Please login to react");
      router.push("/login");
      return;
    }

    if (!review) return;

    try {
      setIsSubmitting(true);
      const response = await reviewService.addReviewReaction({
        reviewId: review.reviewId,
        reactType,
      });
      if (response.code === 200) {
        await loadReviewDetails();
      } else {
        alert(response.message || "Failed to add reaction");
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
      alert("Failed to add reaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddComment = async (parentId: number | null = null) => {
    if (!user) {
      alert("Please login to comment");
      router.push("/login");
      return;
    }

    if (!review) return;

    if (!commentText.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await reviewService.addCommentToReview({
        reviewId: review.reviewId,
        parentId,
        comment: commentText,
      });
      if (response.code === 200) {
        setCommentText("");
        await loadReviewDetails();
      } else {
        alert(response.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCommentReaction = async (
    commentId: number,
    reactType: string,
  ) => {
    if (!user) {
      alert("Please login to react");
      router.push("/login");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await reviewService.addCommentReaction({
        commentId,
        reactType,
      });
      if (response.code === 200) {
        await loadReviewDetails();
      } else {
        alert(response.message || "Failed to add reaction");
      }
    } catch (error) {
      console.error("Error adding comment reaction:", error);
      alert("Failed to add reaction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-6">
            <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !review) {
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
              {error || "Review not found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {error?.includes("not found")
                ? `The review you're looking for doesn't exist or has been removed.`
                : "Something went wrong while loading the review."}
            </p>
            <button
              onClick={() => router.push("/reviews")}
              className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-lg hover:shadow-lg transition-all duration-300 w-full font-medium"
            >
              Back to Reviews
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[#e4e7ec] relative overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}
    >
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,80,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,80,0,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#FF5000] transition-colors group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to all reviews</span>
        </motion.button>

        {/* Main Review Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <StarRating rating={review.rating} size="lg" />
                <span className="text-sm text-gray-400">
                  {formatDate(review.reviewCreatedAt)}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                    review.orderType === "PRINTING"
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  <span>{getOrderTypeIcon(review.orderType)}</span>
                  <span>{getOrderTypeLabel(review.orderType)}</span>
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">
                  Order #{review.orderId}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {review.productName}
              </h1>

              <p className="text-sm text-gray-500">
                Reviewed by User #{review.reviewCreatedBy}
              </p>
            </div>

            {/* Review Content */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Review
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {review.reviewComment}
              </p>
            </div>

            {/* Images */}
            {review.images && review.images.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Images
                </h2>
                <ImageGallery images={review.images} isExpanded={true} />
              </div>
            )}

            {/* Reactions Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Reactions
              </h2>
              <ReactionButtons
                reactions={review.reactions}
                onReact={handleAddReaction}
                currentUser={user}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Add Comment Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Add a Comment
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts about this review..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5000] focus:border-transparent transition-all"
                  onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                />
                <button
                  onClick={() => handleAddComment()}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF5000] to-[#ff6b2c] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Comments Section */}
            {review.comments && review.comments.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Comments ({review.comments.length})
                </h2>
                <CommentSection
                  comments={review.comments}
                  reviewId={review.reviewId}
                  currentUser={user}
                  onReviewUpdate={loadReviewDetails}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewDetailPage;

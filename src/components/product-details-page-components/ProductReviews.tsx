// components/product-details-page-components/ProductReviews.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  Star, 
  MessageCircle, 
  ThumbsUp, 
  Smile, 
  Heart, 
  Eye,
  ChevronDown,
  ChevronUp,
  Reply,
  User,
  Calendar,
  Image as ImageIcon,
  TrendingUp,
  Award,
  ThumbsDown,
  Activity
} from "lucide-react";
import { Review, ReviewComment } from "@/types/review-types";
import { ReviewService } from "@/service/reviewService";

interface ProductReviewsProps {
  productId: number;
}

// Type for comment tree node
interface CommentNode extends ReviewComment {
  replies: CommentNode[];
  depth: number;
}

// Reaction icons mapping
const reactionIcons: Record<string, React.ReactNode> = {
  Like: <ThumbsUp size={14} />,
  Funny: <Smile size={14} />,
  Helpful: <ThumbsUp size={14} />,
  Love: <Heart size={14} />,
  Dislike: <ThumbsDown size={14} />,
};

// Reaction colors mapping
const reactionColors: Record<string, string> = {
  Like: "bg-blue-50 text-blue-600 border-blue-200",
  Love: "bg-red-50 text-red-600 border-red-200",
  Funny: "bg-yellow-50 text-yellow-600 border-yellow-200",
  Helpful: "bg-green-50 text-green-600 border-green-200",
  Dislike: "bg-gray-50 text-gray-600 border-gray-200",
};

const ReactionBadge = ({ type, count }: { type: string; count: number }) => {
  if (count === 0) return null;
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${reactionColors[type] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
      {reactionIcons[type] || <ThumbsUp size={12} />}
      <span>{count}</span>
    </div>
  );
};

// Helper function to calculate total reactions in a comment tree
const calculateCommentTreeReactions = (comment: CommentNode): number => {
  let total = comment.commentReactions?.length || 0;
  if (comment.replies) {
    total += comment.replies.reduce((sum, reply) => sum + calculateCommentTreeReactions(reply), 0);
  }
  return total;
};

// Helper function to build comment tree
const buildCommentTree = (comments: ReviewComment[]): CommentNode[] => {
  const commentMap = new Map<number, CommentNode>();
  const rootComments: CommentNode[] = [];

  // First pass: create map of comments
  comments.forEach(comment => {
    commentMap.set(comment.commentId, {
      ...comment,
      replies: [],
      depth: 0
    });
  });

  // Second pass: build tree structure
  comments.forEach(comment => {
    const commentNode = commentMap.get(comment.commentId);
    if (commentNode) {
      if (comment.parentCommentId === null) {
        rootComments.push(commentNode);
      } else {
        const parent = commentMap.get(comment.parentCommentId);
        if (parent) {
          commentNode.depth = parent.depth + 1;
          parent.replies.push(commentNode);
        } else {
          rootComments.push(commentNode);
        }
      }
    }
  });

  return rootComments;
};

const CommentItem = ({ comment }: { comment: CommentNode }) => {
  const [showReplies, setShowReplies] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const commentReactionCounts = comment.commentReactions?.reduce((acc, reaction) => {
    acc[reaction.commentReactionType] = (acc[reaction.commentReactionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="group">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {comment.userImageUrl && !imageError ? (
            <img
              src={comment.userImageUrl}
              alt={comment.userName}
              className="w-8 h-8 rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-semibold">
              {comment.userName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-2xl p-3 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-semibold text-gray-900">
                {comment.userName || "Anonymous"}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={10} />
                {formatDate(comment.commentCreatedAt)}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{comment.comment}</p>
            {Object.keys(commentReactionCounts).length > 0 && (
              <div className="flex gap-1.5 mt-2">
                {Object.entries(commentReactionCounts).map(([type, count]) => (
                  <ReactionBadge key={type} type={type} count={count as number} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-2">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#FF5000] transition-colors mb-2 font-medium"
          >
            <Reply size={12} />
            {showReplies ? (
              <>
                <ChevronUp size={12} />
                <span>Hide {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
              </>
            ) : (
              <>
                <ChevronDown size={12} />
                <span>Show {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
              </>
            )}
          </button>
          {showReplies && (
            <div className="space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.commentId} comment={reply} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ReviewCard = ({ review, index }: { review: Review; index: number }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [reviewImageError, setReviewImageError] = useState(false);
  
  // Build comment tree
  const commentTree = useMemo(() => buildCommentTree(review.comments || []), [review.comments]);
  const totalComments = review.comments?.length || 0;
  
  // Calculate reaction counts
  const reactionCounts = review.reactions.reduce((acc, reaction) => {
    acc[reaction.reactionType] = (acc[reaction.reactionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate total review reactions count
  const totalReviewReactions = review.reactions?.length || 0;

  // Calculate total comment reactions (including all replies)
  const totalCommentReactions = useMemo(() => {
    let total = 0;
    const calculateReactions = (comments: CommentNode[]) => {
      comments.forEach(comment => {
        total += comment.commentReactions?.length || 0;
        if (comment.replies && comment.replies.length > 0) {
          calculateReactions(comment.replies);
        }
      });
    };
    calculateReactions(commentTree);
    return total;
  }, [commentTree]);

  // Calculate total all reactions (review + comments + replies)
  const totalAllReactions = totalReviewReactions + totalCommentReactions;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating 
                ? "fill-[#FF5000] text-[#FF5000]" 
                : "fill-gray-200 text-gray-200"
            } transition-colors`}
          />
        ))}
      </div>
    );
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  return (
    <>
      <div 
        className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fadeInUp"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Card Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                {review.reviewCreatedImageUrl && !reviewImageError ? (
                  <img
                    src={review.reviewCreatedImageUrl}
                    alt={review.reviewCreatedBy}
                    className="w-12 h-12 rounded-full object-cover shadow-md"
                    onError={() => setReviewImageError(true)}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                    {review.reviewCreatedBy?.charAt(0).toUpperCase() || <User size={20} />}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{review.reviewCreatedBy || "Anonymous"}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(review.reviewCreatedAt)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Reaction badges */}
            <div className="flex gap-1.5 flex-wrap justify-end">
              {Object.entries(reactionCounts).map(([type, count]) => (
                <ReactionBadge key={type} type={type} count={count} />
              ))}
            </div>
          </div>
        </div>

        {/* Review Content */}
        <div className="p-6">
          <p className={`text-gray-700 leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
            {review.reviewComment}
          </p>

          {/* Images */}
          {review.images && review.images.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  {review.images.length} {review.images.length === 1 ? 'photo' : 'photos'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(expanded ? review.images : review.images.slice(0, 3)).map((image) => (
                  <div
                    key={image.imageId}
                    onClick={() => openImageModal(image.imageUrl)}
                    className="relative group/image cursor-pointer overflow-hidden rounded-lg aspect-square"
                  >
                    <img
                      src={image.imageUrl}
                      alt={`Review image`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye size={20} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
              {!expanded && review.images.length > 3 && (
                <button
                  onClick={() => setExpanded(true)}
                  className="mt-2 text-xs text-[#FF5000] hover:text-orange-600 font-medium"
                >
                  +{review.images.length - 3} more photos
                </button>
              )}
            </div>
          )}

          {/* Stats Bar - Updated to show total all reactions */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
            {totalComments > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <MessageCircle size={16} className="text-gray-400" />
                <span className="font-medium">{totalComments}</span>
                <span className="text-gray-500">{totalComments === 1 ? 'comment' : 'comments'}</span>
              </div>
            )}
            {totalAllReactions > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Activity size={16} className="text-gray-400" />
                <span className="font-medium">{totalAllReactions}</span>
                <span className="text-gray-500">total reactions</span>
              </div>
            )}
            {totalReviewReactions > 0 && totalCommentReactions > 0 && (
              <div className="text-xs text-gray-400">
                ({totalReviewReactions} on review, {totalCommentReactions} on comments)
              </div>
            )}
          </div>
        </div>

        {/* Expand/Collapse Section */}
        {expanded && (
          <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white p-6">
            {/* Full Review */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-[#FF5000]" />
                Full Review
              </h4>
              <p className="text-gray-700 leading-relaxed">{review.reviewComment}</p>
            </div>

            {/* All Images */}
            {review.images && review.images.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ImageIcon size={16} className="text-[#FF5000]" />
                  All Photos ({review.images.length})
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {review.images.map((image) => (
                    <div
                      key={image.imageId}
                      onClick={() => openImageModal(image.imageUrl)}
                      className="cursor-pointer overflow-hidden rounded-lg aspect-square group/image"
                    >
                      <img
                        src={image.imageUrl}
                        alt={`Review image`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            {totalComments > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageCircle size={16} className="text-[#FF5000]" />
                  Discussion ({totalComments})
                </h4>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {commentTree.map((comment) => (
                    <CommentItem key={comment.commentId} comment={comment} />
                  ))}
                </div>
              </div>
            )}

            {/* Reactions Summary - Updated to show breakdown */}
            {(Object.keys(reactionCounts).length > 0 || totalCommentReactions > 0) && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#FF5000]" />
                  Reactions Summary
                </h4>
                
                {/* Review Reactions */}
                {Object.keys(reactionCounts).length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Review Reactions</p>
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(reactionCounts).map(([type, count]) => (
                        <div key={type} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${reactionColors[type] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                          {reactionIcons[type] || <ThumbsUp size={14} />}
                          <span className="text-sm font-medium">{type}</span>
                          <span className="text-xs font-semibold">({count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Comments Reactions */}
                {totalCommentReactions > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">Comments & Replies Reactions</p>
                    <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                      <span className="font-semibold">{totalCommentReactions}</span> total reactions across all comments and replies
                    </div>
                  </div>
                )}
                
                {/* Total Reactions */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Total All Reactions</span>
                    <span className="text-lg font-bold text-[#FF5000]">{totalAllReactions}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Card Actions */}
        <div className="p-6 pt-0 flex gap-3">
          {((totalComments > 0 || (review.images?.length || 0) > 3) && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-all duration-200 border border-gray-200"
            >
              {expanded ? (
                <>
                  <ChevronUp size={18} />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={18} />
                  Show More Details
                </>
              )}
            </button>
          ))}
          <button
            onClick={() => router.push(`/reviews/${review.reviewId}`)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF5000] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Eye size={18} />
            View Full Review
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {imageModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setImageModalOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

type SortOption = 'recent' | 'rating' | 'helpful';

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) return;
      
      setLoading(true);
      setError(null);
      try {
        const reviewService = new ReviewService();
        const response = await reviewService.getReviewsByProductId(productId);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // Sort reviews
  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'helpful':
        return sorted.sort((a, b) => {
          const aTotalReactions = (a.reactions?.length || 0) + (a.comments?.reduce((sum, comment) => sum + (comment.commentReactions?.length || 0), 0) || 0);
          const bTotalReactions = (b.reactions?.length || 0) + (b.comments?.reduce((sum, comment) => sum + (comment.commentReactions?.length || 0), 0) || 0);
          return bTotalReactions - aTotalReactions;
        });
      case 'recent':
      default:
        return sorted.sort((a, b) => new Date(b.reviewCreatedAt).getTime() - new Date(a.reviewCreatedAt).getTime());
    }
  }, [reviews, sortBy]);

  // Calculate statistics
  const statistics = useMemo(() => {
    if (reviews.length === 0) return null;
    
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
      stars,
      count: reviews.filter(r => Math.floor(r.rating) === stars).length,
      percentage: (reviews.filter(r => Math.floor(r.rating) === stars).length / reviews.length) * 100
    }));
    
    // Calculate total reactions including all comments and replies
    const totalReactions = reviews.reduce((sum, review) => {
      const reviewReactions = review.reactions?.length || 0;
      const commentReactions = review.comments?.reduce((commentSum, comment) => {
        return commentSum + (comment.commentReactions?.length || 0);
      }, 0) || 0;
      return sum + reviewReactions + commentReactions;
    }, 0);
    
    const totalComments = reviews.reduce((sum, review) => sum + (review.comments?.length || 0), 0);
    const totalReviewReactions = reviews.reduce((sum, review) => sum + (review.reactions?.length || 0), 0);
    const totalCommentReactions = totalReactions - totalReviewReactions;
    
    return { 
      averageRating, 
      ratingCounts, 
      totalReactions, 
      totalComments,
      totalReviewReactions,
      totalCommentReactions
    };
  }, [reviews]);

  if (loading) {
    return (
      <div className="mt-16">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
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
      <div className="mt-16 bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <div className="text-red-600 font-medium mb-2">Unable to load reviews</div>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="mt-16 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star size={32} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
        <p className="text-gray-500">Be the first to share your experience with this product!</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
            <p className="text-gray-500">What our customers are saying</p>
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 bg-[#da5b21] border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5000] focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards - Updated to show reaction breakdown */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-5 border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-orange-600">Average Rating</span>
                <Star size={20} className="text-orange-500 fill-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{statistics.averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-500 mt-1">out of 5.0</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-5 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600">Total Reviews</span>
                <MessageCircle size={20} className="text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{reviews.length}</div>
              <div className="text-sm text-gray-500 mt-1">customer reviews</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-5 border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-600">Total Reactions</span>
                <Activity size={20} className="text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{statistics.totalReactions}</div>
              <div className="text-sm text-gray-500 mt-1">across all content</div>
              <div className="text-xs text-gray-400 mt-1">
                {statistics.totalReviewReactions} on reviews, {statistics.totalCommentReactions} on comments
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-5 border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-600">Total Comments</span>
                <MessageCircle size={20} className="text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{statistics.totalComments}</div>
              <div className="text-sm text-gray-500 mt-1">discussion points</div>
            </div>
          </div>
        )}

        {/* Rating Distribution */}
        {statistics && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award size={18} className="text-[#FF5000]" />
              Rating Distribution
            </h3>
            <div className="space-y-3">
              {statistics.ratingCounts.map(({ stars, percentage }) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="w-12 text-sm font-medium text-gray-600">{stars} ★</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FF5000] to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-sm text-gray-500">{percentage.toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedReviews.map((review, index) => (
          <ReviewCard key={review.reviewId} review={review} index={index} />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FF5000;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff6a2c;
        }
      `}</style>
    </div>
  );
};
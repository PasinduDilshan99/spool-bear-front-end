// types/review-types.ts
export interface ReviewImage {
  imageId: number;
  imageUrl: string;
  imageCreatedBy: number;
  imageCreatedAt: string;
}

export interface ReviewReaction {
  reviewReactionId: number;
  reactionReviewId: number;
  userId: number;
  userName: string;
  reactionType: string; // "Like", "Funny", "Helpful", etc.
  reviewReactionStatus: string;
  reactionCreatedAt: string;
}

export interface CommentReaction {
  commentReactionId: number;
  commentReactionCommentId: number;
  userId: number;
  userName: string;
  commentReactionType: string; // "Like", "Funny", "Helpful", etc.
  commentReactionStatus: string;
  commentReactionCreatedBy: number;
  commentReactionCreatedAt: string;
}

export interface ReviewComment {
  commentId: number;
  commentReviewId: number;
  userId: number;
  userName: string;
  parentCommentId: number | null;
  comment: string;
  commentStatus: string;
  commentCreatedAt: string;
  commentCreatedBy: number;
  commentReactions: CommentReaction[];
}

export interface Review {
  reviewId: number;
  productId: number;
  productName: string;
  reviewComment: string;
  rating: number;
  reviewStatus: string;
  reviewCreatedBy: number;
  reviewCreatedAt: string;
  reviewUpdatedBy: number | null;
  reviewUpdatedAt: string | null;
  images: ReviewImage[];
  reactions: ReviewReaction[];
  comments: ReviewComment[];
}

export interface UserReviewsResponse {
  code: number;
  status: string;
  message: string;
  data: Review[];
  timestamp: string;
}
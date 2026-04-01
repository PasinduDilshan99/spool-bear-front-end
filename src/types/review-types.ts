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
  userImageUrl:string;
  parentCommentId: number | null;
  comment: string;
  commentStatus: string;
  commentCreatedAt: string;
  commentCreatedBy: number;
  commentReactions: CommentReaction[];
}

export interface Review {
  reviewId: number;
  orderId: number;
  orderType: string;
  productId: number;
  productName: string;
  reviewComment: string;
  rating: number;
  reviewStatus: string;
  reviewCreatedBy: string;
  reviewCreatedImageUrl:string;
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

// Request/Response types
export interface AddReviewRequest {
  productOrPrintingId: number;
  rating: number;
  comment: string;
  orderId: number;
  orderType: string; // "PRODUCT" or "PRINTING"
  images?: { imageUrl: string }[];
}

export interface AddReviewReactionRequest {
  reviewId: number;
  reactType: string; // "Like", "Funny", "Helpful", etc.
}

export interface AddCommentReactionRequest {
  commentId: number;
  reactType: string; // "Like", "Funny", "Helpful", etc.
}

export interface AddCommentToReviewRequest {
  reviewId: number;
  parentId: number | null;
  comment: string;
}

export interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
  };
  timestamp: string;
}

export interface GetReviewByIdResponse {
  code: number;
  status: string;
  message: string;
  data: Review;
  timestamp: string;
}

export interface GetReviewsByProductIdRequest {
  productId: number;
}

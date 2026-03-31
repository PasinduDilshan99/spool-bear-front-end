// services/reviewService.ts
import {
  AddCommentReactionRequest,
  AddCommentToReviewRequest,
  AddReviewReactionRequest,
  AddReviewRequest,
  ApiResponse,
  GetReviewByIdResponse,
  GetReviewsByProductIdRequest,
  UserReviewsResponse,
} from "@/types/review-types";
import {
  ADD_REVIEW_COMMENT_DATA_FE,
  ADD_REVIEW_COMMENT_REACTION_DATA_FE,
  ADD_REVIEW_DATA_FE,
  ADD_REVIEW_REACTION_DATA_FE,
  GET_ALL_REVIEWS_DATA_FE,
  GET_REVIEW_BY_PRODUCT_ID_DATA_FE,
  GET_REVIEW_BY_REVIEW_ID_DATA_FE,
  GET_USER_REVIEWS_DATA_FE,
} from "@/utils/frontEndConstant";

export class ReviewService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
  }

  async getReviewById(reviewId: number): Promise<GetReviewByIdResponse> {
    try {
      const response = await fetch(GET_REVIEW_BY_REVIEW_ID_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ reviewId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GetReviewByIdResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to fetch review");
      }

      return data;
    } catch (error) {
      console.error("Error fetching review by ID:", error);
      throw error;
    }
  }

  async getUserReviews(): Promise<UserReviewsResponse> {
    try {
      const response = await fetch(GET_USER_REVIEWS_DATA_FE, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UserReviewsResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      throw error;
    }
  }

  async getAllReviews(): Promise<UserReviewsResponse> {
    try {
      const response = await fetch(GET_ALL_REVIEWS_DATA_FE, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UserReviewsResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      throw error;
    }
  }

  async addReview(reviewData: AddReviewRequest): Promise<ApiResponse> {
    try {
      const response = await fetch(ADD_REVIEW_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to add review");
      }

      return data;
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  }

  /**
   * Add or remove reaction to a review (toggles reaction)
   * @param reactionData - The reaction data
   * @returns Promise with API response
   */
  async addReviewReaction(
    reactionData: AddReviewReactionRequest,
  ): Promise<ApiResponse> {
    try {
      const response = await fetch(ADD_REVIEW_REACTION_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(reactionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to add/remove review reaction");
      }

      return data;
    } catch (error) {
      console.error("Error adding review reaction:", error);
      throw error;
    }
  }

  async addCommentReaction(
    reactionData: AddCommentReactionRequest,
  ): Promise<ApiResponse> {
    try {
      const response = await fetch(ADD_REVIEW_COMMENT_REACTION_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(reactionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(
          data.message || "Failed to add/remove comment reaction",
        );
      }

      return data;
    } catch (error) {
      console.error("Error adding comment reaction:", error);
      throw error;
    }
  }

  async addCommentToReview(
    commentData: AddCommentToReviewRequest,
  ): Promise<ApiResponse> {
    try {
      const response = await fetch(ADD_REVIEW_COMMENT_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to add comment to review");
      }

      return data;
    } catch (error) {
      console.error("Error adding comment to review:", error);
      throw error;
    }
  }

  async getReviewsByProductId(productId: number): Promise<UserReviewsResponse> {
    try {
      const response = await fetch(GET_REVIEW_BY_PRODUCT_ID_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ productId }), // ✅ This is correct - sends { productId: 5 }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UserReviewsResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(
          data.message || "Failed to fetch reviews by product ID",
        );
      }

      return data;
    } catch (error) {
      console.error("Error fetching reviews by product ID:", error);
      throw error;
    }
  }
}

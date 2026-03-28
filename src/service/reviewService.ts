// services/reviewService.ts
import { UserReviewsResponse } from "@/types/review-types";
import { GET_USER_REVIEWS_DATA_FE } from "@/utils/frontEndConstant";

export class ReviewService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
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
}

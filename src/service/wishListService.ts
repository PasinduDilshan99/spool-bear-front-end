import {
  InsertWishListRequest,
  WishListInsertApiResponse,
  WishListResponse,
} from "@/types/wish-list-types";
import {
  ADD_WISH_LIST_DATA_FE,
  GET_WIS_LIST_DETAILS_DATA_FE,
} from "@/utils/frontEndConstant";

export class WishListService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
  }

  async getWishListDetails(): Promise<WishListResponse> {
    try {
      const response = await fetch(GET_WIS_LIST_DETAILS_DATA_FE, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching wish list details:", error);
      throw error;
    }
  }

  async addWishList(
    body: InsertWishListRequest,
  ): Promise<WishListInsertApiResponse> {
    try {
      const response = await fetch(ADD_WISH_LIST_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      return response.json();
    } catch (err) {
      console.error("Error", err);
      throw err;
    }
  }
}

import {
  AddBrowserHistoryRequest,
  AddBrowserHistoryResponse,
  ApiResponse,
  BrowsingHistoryRequest,
  HistoryResponse,
  RemoveBrowserHistoryRequest,
  RemoveBrowserHistoryResponse,
  RemoveListBrowserHistoryRequest,
  RemoveListBrowserHistoryResponse,
} from "@/types/browser-history-types";
import {
  ADD_BROWSER_HISTORY_REQUEST_DATA_FE,
  GET_BROWSER_HISTORY_DATA_FE,
  REMOVE_ALL_BROWSER_HISTORY_DATA_FE,
  REMOVE_BROWSER_HISTORY_BY_ID_DATA_FE,
  REMOVE_LIST_OF_BROWSER_HISTORY_DATA_FE,
} from "@/utils/frontEndConstant";

export class BrowserHistoryService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
  }

  async getBrowsingHistory(
    request?: BrowsingHistoryRequest,
  ): Promise<HistoryResponse> {
    try {
      const body = {
        from: request?.from ?? null,
        to: request?.to ?? null,
        noOfLastDays: request?.noOfLastDays ?? null,
        pageSize: request?.pageSize ?? 10,
        pageNumber: request?.pageNumber ?? 0,
      };

      const response = await fetch(GET_BROWSER_HISTORY_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HistoryResponse = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching browsing history:", error);
      throw error;
    }
  }

  async addBrowserHistory(
    requestBody: AddBrowserHistoryRequest,
  ): Promise<ApiResponse<AddBrowserHistoryResponse>> {
    try {
      const response = await fetch(ADD_BROWSER_HISTORY_REQUEST_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data: ApiResponse<AddBrowserHistoryResponse> =
        await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add browser history");
      }

      return data;
    } catch (error) {
      console.error("Error adding browser history:", error);
      throw new Error("Something went wrong while adding browser history");
    }
  }

  async removeBrowserHistory(
    requestBody: RemoveBrowserHistoryRequest,
  ): Promise<ApiResponse<RemoveBrowserHistoryResponse>> {
    try {
      const response = await fetch(REMOVE_BROWSER_HISTORY_BY_ID_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data: ApiResponse<RemoveBrowserHistoryResponse> =
        await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove browser history");
      }

      return data;
    } catch (error) {
      console.error("Error removing browser history:", error);
      throw new Error("Something went wrong while removing browser history");
    }
  }

  async removeAllBrowserHistory(): Promise<
    ApiResponse<RemoveBrowserHistoryResponse>
  > {
    try {
      const response = await fetch(REMOVE_ALL_BROWSER_HISTORY_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
        credentials: "include",
      });

      const data: ApiResponse<RemoveBrowserHistoryResponse> =
        await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove all browser history");
      }

      return data;
    } catch (error) {
      console.error("Error removing all browser history:", error);
      throw new Error(
        "Something went wrong while removing all browser history",
      );
    }
  }

  async removeListBrowserHistory(
    requestBody: RemoveListBrowserHistoryRequest,
  ): Promise<ApiResponse<RemoveListBrowserHistoryResponse>> {
    try {
      const response = await fetch(REMOVE_LIST_OF_BROWSER_HISTORY_DATA_FE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data: ApiResponse<RemoveListBrowserHistoryResponse> =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to remove browser history list",
        );
      }

      return data;
    } catch (error) {
      console.error("Error removing browser history list:", error);
      throw new Error(
        "Something went wrong while removing browser history list",
      );
    }
  }
}

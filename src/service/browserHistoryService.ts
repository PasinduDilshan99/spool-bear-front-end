import {
  AddBrowserHistoryRequest,
  AddBrowserHistoryResponse,
  ApiResponse,
  BrowsingHistoryRequest,
  HistoryResponse,
} from "@/types/browser-history-types";
import {
  ADD_BROWSER_HISTORY_REQUEST_DATA_FE,
  GET_BROWSER_HISTORY_DATA_FE,
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
}

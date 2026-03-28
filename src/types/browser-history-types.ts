export interface HistoryItem {
  id: number;
  productId: number;
  name: string;
  userId: number;
  createdAt: string;
  statusName: string;
}

export interface HistoryData {
  totalCount: number;
  history: HistoryItem[];
}

export interface HistoryResponse {
  code: number;
  status: string;
  message: string;
  data: HistoryData;
  timestamp: string;
}

export interface BrowsingHistoryRequest {
  from?: string; // ISO date string
  to?: string; // ISO date string
  noOfLastDays?: number;
  pageSize?: number;
  pageNumber?: number;
}

export interface AddBrowserHistoryRequest {
  productId: number;
  name: string;
}

// Backend response structure
export interface ApiResponse<AddBrowserHistoryResponse> {
  code: number;
  status: string;
  message: string;
  data: AddBrowserHistoryResponse;
  timestamp: string;
}

// Specific response for browser history insertion
export interface AddBrowserHistoryResponse {
  message: string;
}

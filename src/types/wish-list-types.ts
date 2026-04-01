// types/wishlist.ts
export interface WishItem {
  productId: number;
  productName: string;
  productDescription: string;
  productDate: string;
  productImages: string[];
  productPrice: number;
  productColor: string;
  productUrl: string;
  discount: number;
  status: string;
  createdAt: string;
}

export interface WishListResponse {
  code: number;
  status: string;
  message: string;
  data: WishItem[];
  timestamp: string;
}

export interface InsertWishListRequest {
  productId?: number;
}

export interface InsertResponseData {
  message: string;
}

export interface WishListInsertApiResponse {
  code: number;
  status: string;
  message: string;
  data: InsertResponseData;
  timestamp: string;
}

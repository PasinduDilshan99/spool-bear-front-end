// services/cartService.ts
import {
  CartItem,
  ApiResponse,
  CreateCartRequest,
  AddProductRequest,
  RemoveProductRequest,
  ClearCartRequest,
  FetchCartRequest,
  FetchCartIdResponse,
} from "@/types/cart-types";

const API_BASE_URL = "http://localhost:8080/spool-bear/api/v0/cart";

class CartService {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const defaultOptions: RequestInit = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async fetchCart(request: FetchCartRequest): Promise<ApiResponse<CartItem[]>> {
    return this.fetchWithAuth(`${API_BASE_URL}/fetch`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async createCart(
    request: CreateCartRequest,
  ): Promise<ApiResponse<{ cardId: number; productsCartResponse: CartItem }>> {
    return this.fetchWithAuth(`${API_BASE_URL}/create`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async addProduct(
    request: AddProductRequest,
  ): Promise<ApiResponse<CartItem[]>> {
    return this.fetchWithAuth(`${API_BASE_URL}/add-product`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async removeProduct(
    request: RemoveProductRequest,
  ): Promise<ApiResponse<CartItem[]>> {
    return this.fetchWithAuth(`${API_BASE_URL}/remove-product`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async clearCart(
    request: ClearCartRequest,
  ): Promise<ApiResponse<{ message: string }>> {
    return this.fetchWithAuth(`${API_BASE_URL}/remove-all-product`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async fetchCartId(): Promise<ApiResponse<FetchCartIdResponse>> {
    return this.fetchWithAuth(`${API_BASE_URL}/fetch-cart-id`, {
      method: "GET",
    });
  }

  async removeProductAllItems(
    request: RemoveProductRequest,
  ): Promise<ApiResponse<CartItem[]>> {
    return this.fetchWithAuth(`${API_BASE_URL}/remove-product-all-items`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  }
}

export const cartService = new CartService();

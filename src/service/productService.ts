// services/productService.ts

import { ApiResponse } from "@/types/common-types";
import {
  Product,
  ProductDetailsRequest,
  ProductsFilterRequest,
} from "@/types/product-types";
import {
  GET_ACTIVE_PRODUCTS_BY_GIVEN_FILTER_PARAMS_FE,
  GET_PRODUCT_DETAILS_BY_ID_DATA_FE,
} from "@/utils/frontEndConstant";

export class ProductService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
  }

  async fetchProducts(
    filters: ProductsFilterRequest,
  ): Promise<ApiResponse<Product[]>> {
    try {
      const response = await fetch(
        GET_ACTIVE_PRODUCTS_BY_GIVEN_FILTER_PARAMS_FE,
        {
          method: "POST",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(filters),
          cache: "no-store",
          credentials: "include", // optional, if backend needs cookies
        },
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Backend returned error:", text);
        throw new Error("Failed to fetch products");
      }

      const data: ApiResponse<Product[]> = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async getProductDetails(
    request: ProductDetailsRequest,
  ): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(GET_PRODUCT_DETAILS_BY_ID_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(request),
        cache: "no-store",
        credentials: "include",
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Backend returned error:", text);
        throw new Error("Failed to fetch product details");
      }

      const data: ApiResponse<Product> = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }
}

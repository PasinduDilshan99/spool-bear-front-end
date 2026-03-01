// services/productService.ts

import { ApiResponse } from "@/types/common-types";
import { Product, ProductsFilterRequest } from "@/types/product-types";
import { GET_ACTIVE_PRODUCTS_BY_GIVEN_FILTER_PARAMS_FE } from "@/utils/frontEndConstant";

/**
 * Fetch products from backend with filters
 * @param filters ProductsFilterRequest
 * @returns ApiResponse<Product[]>
 */
export const fetchProducts = async (
  filters: ProductsFilterRequest,
): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await fetch(
      GET_ACTIVE_PRODUCTS_BY_GIVEN_FILTER_PARAMS_FE,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
        cache: "no-store",
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
};
